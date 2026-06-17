'use strict';

require('dotenv').config();

const express  = require('express');
const session  = require('express-session');
const SqliteStore = require('connect-sqlite3')(session);
const path     = require('path');

// Initialise DB (runs schema + seeds) before anything else
require('./db');

const portalRoutes   = require('./routes/portal');
const adminRoutes    = require('./routes/admin');
const webhookRoutes  = require('./routes/webhooks');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store:             new SqliteStore({ db: 'sessions.db', dir: path.join(__dirname, '..') }),
  secret:            process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  resave:            false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    maxAge:   8 * 60 * 60 * 1000, // 8 hours
  },
}));

// ── API routes ────────────────────────────────────────────────────────────────

app.use('/api/portal',   portalRoutes);
app.use('/api/admin',    adminRoutes);
app.use('/api/webhooks', webhookRoutes);

// ── Static files ──────────────────────────────────────────────────────────────

const PUBLIC = path.join(__dirname, '..', 'public');
app.use(express.static(PUBLIC));

// SPA fallback: admin routes → admin.html, everything else → index.html
app.get('/admin', (req, res) => res.sendFile(path.join(PUBLIC, 'admin.html')));
app.get('*', (req, res) => res.sendFile(path.join(PUBLIC, 'index.html')));

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\nMK Connect running on http://localhost:${PORT}`);
  console.log(`  Customer portal: http://localhost:${PORT}/`);
  console.log(`  Admin dashboard: http://localhost:${PORT}/admin\n`);
});

module.exports = app;
