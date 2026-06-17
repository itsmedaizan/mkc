'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { db, getSetting, getSettings, setSetting } = require('../db');
const { requireAdmin } = require('../middleware/auth');
const { authorizeClient, testConnection } = require('../services/omada');

const router = express.Router();

// ── Auth ──────────────────────────────────────────────────────────────────────

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  req.session.adminId = user.id;
  req.session.adminUsername = user.username;
  res.json({ ok: true, username: user.username });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ id: req.session.adminId, username: req.session.adminUsername });
});

// ── Sessions ──────────────────────────────────────────────────────────────────

router.get('/sessions', requireAdmin, (req, res) => {
  const { status, limit = 100, offset = 0 } = req.query;

  let where = '';
  const params = [];

  if (status && status !== 'all') {
    where = 'WHERE s.status = ?';
    params.push(status);
  }

  const rows = db.prepare(`
    SELECT s.id, s.phone, s.status, s.amount_paid, s.payment_method,
           s.client_mac, s.ssid, s.created_at, s.customer_paid_at,
           s.confirmed_at, s.omada_auth_at, s.omada_error, s.expires_at,
           p.name AS plan_name, p.duration_min,
           a.username AS confirmed_by_username
    FROM portal_sessions s
    JOIN plans p ON p.id = s.plan_id
    LEFT JOIN admin_users a ON a.id = s.confirmed_by
    ${where}
    ORDER BY
      CASE s.status WHEN 'pending' THEN 0 WHEN 'failed' THEN 1 ELSE 2 END,
      s.created_at DESC
    LIMIT ? OFFSET ?
  `).all(...params, parseInt(limit), parseInt(offset));

  const total = db.prepare(`
    SELECT COUNT(*) AS n FROM portal_sessions s ${where}
  `).get(...params).n;

  res.json({ sessions: rows, total });
});

// Confirm payment + trigger Omada auth
router.post('/sessions/:id/confirm', requireAdmin, async (req, res) => {
  const session = db.prepare(`
    SELECT s.*, p.duration_min, p.data_mb
    FROM portal_sessions s
    JOIN plans p ON p.id = s.plan_id
    WHERE s.id = ?
  `).get(req.params.id);

  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.status === 'active') return res.json({ ok: true, status: 'active', message: 'Already active' });

  // Mark confirmed immediately so the payment is never lost even if Omada fails
  db.prepare(`
    UPDATE portal_sessions
    SET confirmed_by = ?, confirmed_at = datetime('now')
    WHERE id = ?
  `).run(req.session.adminId, session.id);

  try {
    await authorizeClient({
      clientMac:   session.client_mac,
      apMac:       session.ap_mac,
      ssid:        session.ssid,
      radioId:     session.radio_id,
      durationMin: session.duration_min,
      dataMb:      session.data_mb,
    });

    const expiresAt = new Date(Date.now() + session.duration_min * 60 * 1000).toISOString();

    db.prepare(`
      UPDATE portal_sessions
      SET status = 'active', omada_auth_at = datetime('now'), expires_at = ?, omada_error = NULL
      WHERE id = ?
    `).run(expiresAt, session.id);

    res.json({ ok: true, status: 'active' });
  } catch (err) {
    console.error('[admin] Omada auth error for session', session.id, ':', err.message);

    db.prepare(`
      UPDATE portal_sessions
      SET status = 'failed', omada_error = ?
      WHERE id = ?
    `).run(err.message, session.id);

    // Return error but 200 — the sale IS recorded, just Omada failed
    res.json({
      ok: false,
      status: 'failed',
      error: err.message,
      message: 'Payment recorded but Omada authentication failed. Use the retry button.',
    });
  }
});

// Retry Omada auth for a failed session
router.post('/sessions/:id/retry', requireAdmin, async (req, res) => {
  const session = db.prepare(`
    SELECT s.*, p.duration_min, p.data_mb
    FROM portal_sessions s
    JOIN plans p ON p.id = s.plan_id
    WHERE s.id = ?
  `).get(req.params.id);

  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.status !== 'failed' && session.status !== 'pending') {
    return res.status(400).json({ error: `Cannot retry a session with status: ${session.status}` });
  }

  try {
    await authorizeClient({
      clientMac:   session.client_mac,
      apMac:       session.ap_mac,
      ssid:        session.ssid,
      radioId:     session.radio_id,
      durationMin: session.duration_min,
      dataMb:      session.data_mb,
    });

    const expiresAt = new Date(Date.now() + session.duration_min * 60 * 1000).toISOString();

    db.prepare(`
      UPDATE portal_sessions
      SET status = 'active', omada_auth_at = datetime('now'), expires_at = ?, omada_error = NULL
      WHERE id = ?
    `).run(expiresAt, session.id);

    res.json({ ok: true, status: 'active' });
  } catch (err) {
    db.prepare(`
      UPDATE portal_sessions SET omada_error = ? WHERE id = ?
    `).run(err.message, session.id);

    res.json({ ok: false, status: 'failed', error: err.message });
  }
});

// ── Revenue ───────────────────────────────────────────────────────────────────

router.get('/revenue', requireAdmin, (req, res) => {
  const row = db.prepare(`
    SELECT
      COALESCE(SUM(CASE WHEN date(created_at) = date('now')           AND status != 'pending' THEN amount_paid ELSE 0 END), 0) AS today,
      COALESCE(SUM(CASE WHEN created_at >= datetime('now', '-7 days')  AND status != 'pending' THEN amount_paid ELSE 0 END), 0) AS week,
      COALESCE(SUM(CASE WHEN created_at >= datetime('now', '-30 days') AND status != 'pending' THEN amount_paid ELSE 0 END), 0) AS month,
      COALESCE(SUM(CASE WHEN status != 'pending' THEN amount_paid ELSE 0 END), 0) AS total,
      COUNT(*) AS total_sessions,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_count,
      SUM(CASE WHEN status = 'failed'  THEN 1 ELSE 0 END) AS failed_count
    FROM portal_sessions
  `).get();
  res.json(row);
});

// ── Plans ─────────────────────────────────────────────────────────────────────

router.get('/plans', requireAdmin, (req, res) => {
  const plans = db.prepare('SELECT * FROM plans ORDER BY sort_order, price_tzs').all();
  res.json(plans);
});

router.post('/plans', requireAdmin, (req, res) => {
  const { name, price_tzs, duration_min, data_mb, description, sort_order } = req.body;
  if (!name || !price_tzs || !duration_min) {
    return res.status(400).json({ error: 'name, price_tzs, and duration_min are required' });
  }

  const result = db.prepare(`
    INSERT INTO plans (name, price_tzs, duration_min, data_mb, description, sort_order, active)
    VALUES (?, ?, ?, ?, ?, ?, 1)
  `).run(name, price_tzs, duration_min, data_mb || null, description || null, sort_order || 0);

  const plan = db.prepare('SELECT * FROM plans WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(plan);
});

router.put('/plans/:id', requireAdmin, (req, res) => {
  const { name, price_tzs, duration_min, data_mb, description, sort_order, active } = req.body;

  db.prepare(`
    UPDATE plans
    SET name = COALESCE(?, name),
        price_tzs = COALESCE(?, price_tzs),
        duration_min = COALESCE(?, duration_min),
        data_mb = ?,
        description = COALESCE(?, description),
        sort_order = COALESCE(?, sort_order),
        active = COALESCE(?, active)
    WHERE id = ?
  `).run(
    name || null, price_tzs || null, duration_min || null,
    data_mb !== undefined ? (data_mb || null) : undefined,
    description || null, sort_order !== undefined ? sort_order : null,
    active !== undefined ? (active ? 1 : 0) : null,
    req.params.id
  );

  const plan = db.prepare('SELECT * FROM plans WHERE id = ?').get(req.params.id);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  res.json(plan);
});

router.delete('/plans/:id', requireAdmin, (req, res) => {
  const used = db.prepare('SELECT COUNT(*) AS n FROM portal_sessions WHERE plan_id = ?').get(req.params.id);
  if (used.n > 0) {
    // Soft-delete: deactivate instead of removing (preserve historical records)
    db.prepare('UPDATE plans SET active = 0 WHERE id = ?').run(req.params.id);
    return res.json({ ok: true, deactivated: true });
  }
  db.prepare('DELETE FROM plans WHERE id = ?').run(req.params.id);
  res.json({ ok: true, deleted: true });
});

// ── Settings ──────────────────────────────────────────────────────────────────

const EXPOSED_SETTINGS = [
  'business_name', 'mobile_money_number', 'mobile_money_name',
  'mobile_money_provider', 'currency', 'portal_instructions',
  'omada_controller_url', 'omada_controller_id', 'omada_site_id',
  'omada_operator_username',
  // omada_operator_password intentionally omitted from GET — write-only
];

router.get('/settings', requireAdmin, (req, res) => {
  const rows = db.prepare('SELECT key, value FROM settings WHERE key IN (' +
    EXPOSED_SETTINGS.map(() => '?').join(',') + ')'
  ).all(...EXPOSED_SETTINGS);

  const result = {};
  for (const row of rows) result[row.key] = row.value;
  res.json(result);
});

router.put('/settings', requireAdmin, (req, res) => {
  const allowed = new Set([...EXPOSED_SETTINGS, 'omada_operator_password']);
  const updates = Object.entries(req.body).filter(([k]) => allowed.has(k));

  for (const [key, value] of updates) {
    setSetting(key, value);
  }

  res.json({ ok: true, updated: updates.map(([k]) => k) });
});

router.post('/settings/test-omada', requireAdmin, async (req, res) => {
  try {
    await testConnection();
    res.json({ ok: true, message: 'Connected to Omada controller successfully.' });
  } catch (err) {
    res.json({ ok: false, error: err.message });
  }
});

module.exports = router;
