'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { db, getSetting, getSettings, normalizeMac } = require('../db');
const { getActiveProvider } = require('../services/payment');

const router = express.Router();

// GET /api/portal/plans — list active plans for the customer
router.get('/plans', (req, res) => {
  const plans = db.prepare(`
    SELECT id, name, price_tzs, duration_min, data_mb, description
    FROM plans
    WHERE active = 1
    ORDER BY sort_order, price_tzs
  `).all();
  res.json(plans);
});

// GET /api/portal/info — public business info shown on the portal page
router.get('/info', (req, res) => {
  const cfg = getSettings([
    'business_name',
    'mobile_money_number',
    'mobile_money_name',
    'mobile_money_provider',
    'currency',
    'portal_instructions',
  ]);
  res.json(cfg);
});

// POST /api/portal/sessions — create a new purchase session
router.post('/sessions', async (req, res) => {
  const { phone, planId, clientMac, apMac, ssid, radioId, redirectUrl } = req.body;

  if (!phone || !planId || !clientMac || !apMac || !ssid) {
    return res.status(400).json({ error: 'Missing required fields: phone, planId, clientMac, apMac, ssid' });
  }

  const plan = db.prepare('SELECT * FROM plans WHERE id = ? AND active = 1').get(planId);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });

  const id = uuidv4();
  const provider = getActiveProvider();

  try {
    const extra = await provider.initiate({ id, phone, plan });

    db.prepare(`
      INSERT INTO portal_sessions
        (id, phone, plan_id, client_mac, ap_mac, ssid, radio_id, redirect_url, amount_paid, payment_method, status)
      VALUES
        (@id, @phone, @planId, @clientMac, @apMac, @ssid, @radioId, @redirectUrl, @amountPaid, @paymentMethod, 'pending')
    `).run({
      id,
      phone,
      planId: plan.id,
      clientMac: normalizeMac(clientMac),
      apMac:     normalizeMac(apMac),
      ssid,
      radioId:   parseInt(radioId, 10) || 0,
      redirectUrl: redirectUrl || null,
      amountPaid: plan.price_tzs,
      paymentMethod: extra.payment_method || 'manual',
    });

    res.json({ id, amountPaid: plan.price_tzs });
  } catch (err) {
    console.error('[portal] session create error:', err.message);
    res.status(500).json({ error: 'Failed to create session. Please try again.' });
  }
});

// POST /api/portal/sessions/:id/notify — customer taps "I've paid"
router.post('/sessions/:id/notify', (req, res) => {
  const session = db.prepare('SELECT * FROM portal_sessions WHERE id = ?').get(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.status !== 'pending') {
    return res.json({ status: session.status }); // already handled
  }

  db.prepare(`
    UPDATE portal_sessions
    SET customer_paid_at = datetime('now')
    WHERE id = ? AND customer_paid_at IS NULL
  `).run(req.params.id);

  res.json({ ok: true });
});

// GET /api/portal/sessions/:id/status — customer polls for confirmation
router.get('/sessions/:id/status', (req, res) => {
  const row = db.prepare(`
    SELECT s.id, s.status, s.redirect_url, s.expires_at, s.omada_error,
           p.name AS plan_name, p.duration_min
    FROM portal_sessions s
    JOIN plans p ON p.id = s.plan_id
    WHERE s.id = ?
  `).get(req.params.id);

  if (!row) return res.status(404).json({ error: 'Session not found' });
  res.json(row);
});

module.exports = router;
