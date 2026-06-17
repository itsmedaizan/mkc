'use strict';

// ── State ─────────────────────────────────────────────────────────────────────

const state = {
  clientMac:   null,
  apMac:       null,
  ssid:        null,
  radioId:     0,
  redirectUrl: null,
  selectedPlan:    null,
  sessionId:       null,
  pollTimer:       null,
  currentScreen:   0,
  screenHistory:   [],
  info:            {},
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

function showToast(msg, type = '') {
  const t = $('toast');
  t.textContent = msg;
  t.className = type ? `show ${type}` : 'show';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = ''; }, 3500);
}

function fmt(tzs) {
  return 'TZS ' + Number(tzs).toLocaleString();
}

function fmtDuration(min) {
  if (min < 60) return `${min} min`;
  if (min < 1440) return `${min / 60} hr${min / 60 !== 1 ? 's' : ''}`;
  if (min < 10080) return `${min / 1440} day${min / 1440 !== 1 ? 's' : ''}`;
  return `${Math.round(min / 10080)} week${Math.round(min / 10080) !== 1 ? 's' : ''}`;
}

function fmtExpiry(isoString) {
  if (!isoString) return '—';
  const d = new Date(isoString);
  return d.toLocaleString('en-TZ', { dateStyle: 'medium', timeStyle: 'short' });
}

function setScreen(index, back = false) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => { s.classList.remove('active', 'slide-back'); });
  const next = $(`screen-${index}`);
  next.classList.add('active');
  if (back) next.classList.add('slide-back');

  // Update dots (only first 4 steps have dots)
  const dots = document.querySelectorAll('.step-dot');
  dots.forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i < index) d.classList.add('done');
    else if (i === index) d.classList.add('active');
  });

  $('step-dots').style.display = (index >= 4) ? 'none' : 'flex';
  state.currentScreen = index;
}

function goBack() {
  const prev = state.screenHistory.pop();
  if (prev !== undefined) setScreen(prev, true);
}

function navigate(index) {
  state.screenHistory.push(state.currentScreen);
  setScreen(index);
}

// ── Boot ──────────────────────────────────────────────────────────────────────

async function boot() {
  // Parse Omada redirect parameters
  const params = new URLSearchParams(window.location.search);
  state.clientMac  = params.get('clientMac') || params.get('client_mac') || sessionStorage.getItem('clientMac');
  state.apMac      = params.get('apMac')     || params.get('ap_mac')     || sessionStorage.getItem('apMac');
  state.ssid       = params.get('ssid')      || sessionStorage.getItem('ssid');
  state.radioId    = parseInt(params.get('radioId') || sessionStorage.getItem('radioId') || '0', 10);
  state.redirectUrl = params.get('url') || params.get('redirectUrl') || sessionStorage.getItem('redirectUrl') || 'http://www.google.com';

  // Persist params so they survive page refreshes
  if (state.clientMac) sessionStorage.setItem('clientMac', state.clientMac);
  if (state.apMac)     sessionStorage.setItem('apMac', state.apMac);
  if (state.ssid)      sessionStorage.setItem('ssid', state.ssid);
  sessionStorage.setItem('radioId', state.radioId);
  if (state.redirectUrl) sessionStorage.setItem('redirectUrl', state.redirectUrl);

  if (!state.clientMac) {
    $('no-mac-warning').style.display = 'block';
  }

  // Load business info and plans in parallel
  try {
    const [info, plans] = await Promise.all([
      fetch('/api/portal/info').then(r => r.json()),
      fetch('/api/portal/plans').then(r => r.json()),
    ]);
    state.info = info;
    applyInfo(info);
    renderPlans(plans);
  } catch (e) {
    showToast('Failed to load. Please refresh.', 'error');
  }

  // Restore in-progress session
  const savedSession = sessionStorage.getItem('sessionId');
  if (savedSession) {
    state.sessionId = savedSession;
    checkAndResume(savedSession);
  }
}

function applyInfo(info) {
  if (info.business_name) {
    $('business-name').textContent = info.business_name;
    document.title = `${info.business_name} — WiFi Access`;
  }
  $('pay-provider').textContent = info.mobile_money_provider || 'Mobile Money';
  $('pay-number').textContent   = info.mobile_money_number  || '—';
  $('pay-name').textContent     = info.mobile_money_name    || '—';
  $('portal-instructions').textContent = info.portal_instructions || '';
}

// ── Plan selection ────────────────────────────────────────────────────────────

function renderPlans(plans) {
  const grid = $('plan-grid');
  if (!plans.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted)">No plans available right now.</p>';
    return;
  }

  grid.innerHTML = plans.map(p => `
    <div class="plan-card" onclick="selectPlan(${p.id})" data-plan-id="${p.id}">
      <div class="plan-name">${escHtml(p.name)}</div>
      <div class="plan-price">
        ${fmt(p.price_tzs).replace('TZS ', '')}
        <span>TZS</span>
      </div>
      ${p.data_mb ? `<div class="plan-data-badge">${p.data_mb >= 1024 ? (p.data_mb/1024).toFixed(1)+'GB' : p.data_mb+'MB'}</div>` : ''}
      ${p.description ? `<div class="plan-desc">${escHtml(p.description)}</div>` : ''}
    </div>
  `).join('');
}

function selectPlan(id) {
  const cards = document.querySelectorAll('.plan-card');
  cards.forEach(c => c.classList.remove('selected'));

  const card = document.querySelector(`[data-plan-id="${id}"]`);
  if (card) card.classList.add('selected');

  // Find plan data from DOM (we re-fetch from API on session create)
  const allPlans = [...cards].map(c => ({
    id: parseInt(c.dataset.planId, 10),
    name: c.querySelector('.plan-name').textContent,
    price: c.querySelector('.plan-price').textContent.trim(),
  }));

  state.selectedPlan = allPlans.find(p => p.id === id);

  // Short delay for tap feedback, then advance
  setTimeout(() => navigate(1), 200);

  // Populate summary
  $('selected-plan-summary').innerHTML = `
    <div class="summary-row">
      <span>Plan</span>
      <strong>${escHtml(state.selectedPlan.name)}</strong>
    </div>
    <div class="summary-row">
      <span>Price</span>
      <strong>${state.selectedPlan.price}</strong>
    </div>
  `;
}

// ── Payment flow ──────────────────────────────────────────────────────────────

function goToPayment() {
  const phone = $('phone-input').value.trim();
  if (!phone || phone.length < 9) {
    showToast('Please enter a valid phone number', 'error');
    $('phone-input').focus();
    return;
  }
  state.phone = phone;

  // Save phone for convenience on return visits
  localStorage.setItem('lastPhone', phone);

  // Populate payment screen
  $('pay-plan-name').textContent = state.selectedPlan.name;
  $('pay-amount').textContent    = state.selectedPlan.price;

  // Use last 4 digits of phone as reference
  const ref = phone.replace(/\D/g, '').slice(-4).padStart(4, '0');
  $('pay-reference').textContent = `MKC-${ref}`;

  navigate(2);
}

async function markPaid() {
  const btn = $('paid-btn');
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Creating session…';

  if (!state.clientMac) {
    showToast('Device MAC not found. Please reconnect to WiFi.', 'error');
    btn.disabled = false;
    btn.textContent = "I've paid — confirm my access";
    return;
  }

  try {
    // Create session
    const res = await fetch('/api/portal/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone:       state.phone,
        planId:      state.selectedPlan.id,
        clientMac:   state.clientMac,
        apMac:       state.apMac,
        ssid:        state.ssid,
        radioId:     state.radioId,
        redirectUrl: state.redirectUrl,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create session');

    state.sessionId = data.id;
    sessionStorage.setItem('sessionId', data.id);

    // Notify server that customer says they paid
    await fetch(`/api/portal/sessions/${data.id}/notify`, { method: 'POST' });

    // Show waiting screen
    $('wait-session-id').textContent = data.id.slice(0, 8).toUpperCase();
    $('wait-plan').textContent       = state.selectedPlan.name;

    navigate(3);
    startPolling(data.id);
  } catch (err) {
    showToast(err.message, 'error');
    btn.disabled = false;
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> I\'ve paid — confirm my access';
  }
}

// ── Polling ───────────────────────────────────────────────────────────────────

function startPolling(sessionId) {
  clearInterval(state.pollTimer);
  state.pollTimer = setInterval(() => pollStatus(sessionId), 8000);
  pollStatus(sessionId); // immediate first check
}

async function pollStatus(sessionId) {
  try {
    const res = await fetch(`/api/portal/sessions/${sessionId}/status`);
    if (!res.ok) return;
    const data = await res.json();

    if (data.status === 'active') {
      clearInterval(state.pollTimer);
      sessionStorage.removeItem('sessionId');
      showConnected(data);
    } else if (data.status === 'failed') {
      clearInterval(state.pollTimer);
      $('wait-status-badge').textContent = 'Failed';
      $('wait-status-badge').className = 'badge badge-failed';
      showToast('Payment confirmed but WiFi auth failed. Please speak to our staff.', 'error');
    }
  } catch (e) {
    // Network hiccup — keep polling
  }
}

async function checkAndResume(sessionId) {
  try {
    const res = await fetch(`/api/portal/sessions/${sessionId}/status`);
    if (!res.ok) { sessionStorage.removeItem('sessionId'); return; }
    const data = await res.json();

    if (data.status === 'active') {
      showConnected(data);
    } else if (data.status === 'pending' || data.status === 'awaiting') {
      $('wait-session-id').textContent = sessionId.slice(0, 8).toUpperCase();
      $('wait-plan').textContent       = data.plan_name || '—';
      navigate(3);
      startPolling(sessionId);
    } else {
      sessionStorage.removeItem('sessionId');
    }
  } catch (e) {
    sessionStorage.removeItem('sessionId');
  }
}

// ── Connected screen ──────────────────────────────────────────────────────────

function showConnected(data) {
  $('done-plan').textContent    = data.plan_name || '—';
  $('done-expires').textContent = fmtExpiry(data.expires_at);

  navigate(4);
  $('step-dots').style.display = 'none';
}

function startBrowsing() {
  const url = state.redirectUrl || sessionStorage.getItem('redirectUrl') || 'http://www.google.com';
  window.location.href = url;
}

// ── Utility ───────────────────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Init ──────────────────────────────────────────────────────────────────────

// Pre-fill phone from localStorage
const lastPhone = localStorage.getItem('lastPhone');
if (lastPhone) document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('phone-input');
  if (inp) inp.value = lastPhone;
});

boot();
