'use strict';

require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'mkc.db');
const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── Schema ────────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS plans (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT    NOT NULL,
    price_tzs     INTEGER NOT NULL,
    duration_min  INTEGER NOT NULL,
    data_mb       INTEGER,
    description   TEXT,
    active        INTEGER NOT NULL DEFAULT 1,
    sort_order    INTEGER NOT NULL DEFAULT 0,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS portal_sessions (
    id              TEXT    PRIMARY KEY,
    phone           TEXT    NOT NULL,
    plan_id         INTEGER NOT NULL REFERENCES plans(id),
    client_mac      TEXT    NOT NULL,
    ap_mac          TEXT    NOT NULL,
    ssid            TEXT    NOT NULL,
    radio_id        INTEGER NOT NULL DEFAULT 0,
    redirect_url    TEXT,
    amount_paid     INTEGER NOT NULL,
    payment_method  TEXT    NOT NULL DEFAULT 'manual',
    status          TEXT    NOT NULL DEFAULT 'pending',
    customer_paid_at TEXT,
    confirmed_by    INTEGER REFERENCES admin_users(id),
    confirmed_at    TEXT,
    omada_auth_at   TEXT,
    omada_error     TEXT,
    expires_at      TEXT,
    created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS settings (
    key        TEXT PRIMARY KEY,
    value      TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_status     ON portal_sessions(status);
  CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON portal_sessions(created_at);
  CREATE INDEX IF NOT EXISTS idx_sessions_phone      ON portal_sessions(phone);
`);

// ── Default plans (only on first run) ────────────────────────────────────────

const planCount = db.prepare('SELECT COUNT(*) AS n FROM plans').get();
if (planCount.n === 0) {
  const insertPlan = db.prepare(`
    INSERT INTO plans (name, price_tzs, duration_min, data_mb, description, sort_order)
    VALUES (@name, @price_tzs, @duration_min, @data_mb, @description, @sort_order)
  `);
  [
    { name: '1 Hour',  price_tzs: 500,   duration_min: 60,    data_mb: null, description: 'Perfect for quick browsing', sort_order: 1 },
    { name: '3 Hours', price_tzs: 1000,  duration_min: 180,   data_mb: null, description: 'Great for streaming & calls', sort_order: 2 },
    { name: '1 Day',   price_tzs: 2000,  duration_min: 1440,  data_mb: null, description: 'Unlimited for 24 hours',      sort_order: 3 },
    { name: '1 Week',  price_tzs: 10000, duration_min: 10080, data_mb: null, description: 'Best value — 7 full days',    sort_order: 4 },
  ].forEach(p => insertPlan.run(p));
}

// ── Default settings ──────────────────────────────────────────────────────────

const defaultSettings = {
  omada_controller_url:      process.env.OMADA_CONTROLLER_URL      || '',
  omada_controller_id:       process.env.OMADA_CONTROLLER_ID       || '',
  omada_site_id:             process.env.OMADA_SITE_ID             || '',
  omada_operator_username:   process.env.OMADA_OPERATOR_USERNAME   || '',
  omada_operator_password:   process.env.OMADA_OPERATOR_PASSWORD   || '',
  business_name:             'MK Connect',
  mobile_money_number:       '',
  mobile_money_name:         '',
  mobile_money_provider:     'M-Pesa',
  currency:                  'TZS',
  portal_instructions:       'Send the exact amount to the number below, then tap "I\'ve Paid".',
};

const upsertSetting = db.prepare(`
  INSERT INTO settings (key, value) VALUES (@key, @value)
  ON CONFLICT(key) DO NOTHING
`);
for (const [key, value] of Object.entries(defaultSettings)) {
  upsertSetting.run({ key, value });
}

// ── Admin bootstrap ───────────────────────────────────────────────────────────

const adminCount = db.prepare('SELECT COUNT(*) AS n FROM admin_users').get();
if (adminCount.n === 0) {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'changeme123';
  const hash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run(username, hash);
  console.log(`[db] Created admin user: ${username}`);
  if (password === 'changeme123') {
    console.warn('[db] WARNING: Using default admin password. Set ADMIN_PASSWORD in .env before going live!');
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getSetting(key) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row ? row.value : null;
}

function getSettings(keys) {
  const result = {};
  for (const key of keys) result[key] = getSetting(key);
  return result;
}

function setSetting(key, value) {
  db.prepare(`
    INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `).run(key, value ?? '');
}

function normalizeMac(mac) {
  if (!mac) return mac;
  return mac.toLowerCase().replace(/-/g, ':');
}

module.exports = { db, getSetting, getSettings, setSetting, normalizeMac };
