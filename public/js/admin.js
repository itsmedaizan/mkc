'use strict';

// ── State ─────────────────────────────────────────────────────────────────────

const state = {
  currentFilter: 'all',
  autoRefreshTimer: null,
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

async function api(method, path, body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`/api/admin${path}`, opts);
  const data = await res.json();
  if (!res.ok && res.status === 401) {
    showLoginView();
    throw new Error('Session expired');
  }
  return { res, data };
}

function fmt(n) { return Number(n || 0).toLocaleString(); }

function fmtDuration(min) {
  if (!min) return '—';
  if (min < 60)    return `${min}min`;
  if (min < 1440)  return `${min/60}hr`;
  if (min < 10080) return `${min/1440}day${min/1440!==1?'s':''}`;
  return `${Math.round(min/10080)}wk`;
}

function relativeTime(isoStr) {
  if (!isoStr) return '';
  const diff = Date.now() - new Date(isoStr).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60)  return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  return `${Math.floor(s/86400)}d ago`;
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Auth ──────────────────────────────────────────────────────────────────────

async function boot() {
  try {
    const { res, data } = await api('GET', '/me');
    if (res.ok) {
      showAppView(data.username);
    } else {
      showLoginView();
    }
  } catch (e) {
    showLoginView();
  }
}

function showLoginView() {
  $('login-view').style.display = 'block';
  $('app-view').style.display = 'none';
  clearInterval(state.autoRefreshTimer);
}

function showAppView(username) {
  $('login-view').style.display = 'none';
  $('app-view').style.display = 'block';
  $('admin-username-label').textContent = username;
  loadRevenue();
  loadSessions();
  loadPlans();
  loadSettings();
  // Auto-refresh every 30 seconds
  state.autoRefreshTimer = setInterval(() => loadSessions(), 30000);
}

async function login(e) {
  e.preventDefault();
  const btn = $('login-btn');
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div>';

  try {
    const { res, data } = await api('POST', '/login', {
      username: $('login-username').value.trim(),
      password: $('login-password').value,
    });
    if (res.ok) {
      $('login-password').value = '';
      showAppView(data.username);
    } else {
      showToast(data.error || 'Login failed', 'error');
    }
  } catch (e) {
    showToast('Network error', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign in';
  }
}

async function logout() {
  await api('POST', '/logout');
  showLoginView();
}

// ── Revenue ───────────────────────────────────────────────────────────────────

async function loadRevenue() {
  try {
    const { data } = await api('GET', '/revenue');
    $('rev-today').textContent   = fmt(data.today);
    $('rev-week').textContent    = fmt(data.week);
    $('rev-month').textContent   = fmt(data.month);
    $('rev-pending').textContent = data.pending_count || 0;
  } catch (e) { /* silent */ }
}

// ── Sessions ──────────────────────────────────────────────────────────────────

async function loadSessions(showSpinner = false) {
  if (showSpinner) {
    $('session-list').innerHTML = '<div class="empty-state"><div class="spinner spinner-primary" style="margin:0 auto 1rem"></div><p>Loading…</p></div>';
  }

  try {
    const statusParam = state.currentFilter === 'all' ? '' : `?status=${state.currentFilter}`;
    const { data } = await api('GET', `/sessions${statusParam}`);
    renderSessions(data.sessions || []);
    loadRevenue(); // refresh counts too
  } catch (e) {
    if (!showSpinner) return; // silent background refresh
    $('session-list').innerHTML = '<div class="empty-state"><p>Failed to load sessions.</p></div>';
  }
}

function renderSessions(sessions) {
  if (!sessions.length) {
    $('session-list').innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        <p>No sessions found.</p>
      </div>`;
    return;
  }

  $('session-list').innerHTML = sessions.map(s => {
    const statusClass = { pending: 'badge-pending', active: 'badge-active', failed: 'badge-failed', expired: 'badge-expired' }[s.status] || 'badge-pending';

    const actionBtns = [];
    if (s.status === 'pending') {
      actionBtns.push(`<button class="btn btn-accent btn-sm" onclick="confirmSession('${s.id}', this)">Confirm payment</button>`);
    }
    if (s.status === 'failed') {
      actionBtns.push(`<button class="btn btn-warn btn-sm" onclick="retrySession('${s.id}', this)">Retry Omada auth</button>`);
    }

    const notified = s.customer_paid_at
      ? `<span style="color:var(--accent);font-size:.78rem;margin-left:.5rem">● Customer notified ${relativeTime(s.customer_paid_at)}</span>`
      : '';

    return `
      <div class="session-card" data-status="${s.status}" id="card-${s.id}">
        <div class="session-meta">
          <span class="session-phone">${escHtml(s.phone)}</span>
          <span class="session-time">${relativeTime(s.created_at)}</span>
        </div>
        <div class="session-details">
          ${escHtml(s.plan_name)} · <strong>${fmt(s.amount_paid)} TZS</strong> · ${escHtml(s.ssid || '—')}
          ${notified}
        </div>
        <div style="margin-bottom:.5rem">
          <span class="badge ${statusClass}">${s.status}</span>
          <span style="font-size:.78rem;color:var(--text-muted);margin-left:.5rem;font-family:monospace">${s.id.slice(0,8).toUpperCase()}</span>
        </div>
        ${s.omada_error ? `<div class="session-error">${escHtml(s.omada_error)}</div>` : ''}
        ${actionBtns.length ? `<div class="session-actions">${actionBtns.join('')}</div>` : ''}
      </div>`;
  }).join('');
}

function filterSessions(status, btn) {
  state.currentFilter = status;
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  loadSessions(true);
}

async function confirmSession(id, btn) {
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div>';

  try {
    const { data } = await api('POST', `/sessions/${id}/confirm`);
    if (data.ok) {
      showToast('Access activated!', 'success');
      loadSessions();
      loadRevenue();
    } else {
      showToast(data.message || data.error || 'Auth failed', 'error');
      loadSessions(); // reload to show error state + retry btn
    }
  } catch (e) {
    showToast('Network error', 'error');
    btn.disabled = false;
    btn.textContent = 'Confirm payment';
  }
}

async function retrySession(id, btn) {
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div>';

  try {
    const { data } = await api('POST', `/sessions/${id}/retry`);
    if (data.ok) {
      showToast('Retry succeeded — customer is connected!', 'success');
    } else {
      showToast('Retry failed: ' + data.error, 'error');
    }
    loadSessions();
  } catch (e) {
    showToast('Network error', 'error');
    btn.disabled = false;
    btn.textContent = 'Retry Omada auth';
  }
}

// ── Plans ─────────────────────────────────────────────────────────────────────

async function loadPlans() {
  try {
    const { data } = await api('GET', '/plans');
    renderPlans(data);
  } catch (e) { /* silent */ }
}

function renderPlans(plans) {
  if (!plans.length) {
    $('plan-list').innerHTML = '<div class="empty-state"><p>No plans yet.</p></div>';
    return;
  }

  $('plan-list').innerHTML = plans.map(p => `
    <div class="plan-row" style="opacity:${p.active ? 1 : 0.5}">
      <div class="plan-row-info">
        <div class="plan-row-name">${escHtml(p.name)} ${!p.active ? '<span class="badge badge-expired">inactive</span>' : ''}</div>
        <div class="plan-row-sub">${fmtDuration(p.duration_min)}${p.data_mb ? ' · '+p.data_mb+'MB' : ' · Unlimited'}</div>
      </div>
      <div class="plan-row-price">${fmt(p.price_tzs)} TZS</div>
      <div style="display:flex;flex-direction:column;gap:.4rem">
        <button class="btn btn-ghost btn-sm" onclick="openPlanModal(${JSON.stringify(p).replace(/"/g,'&quot;')})">Edit</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--danger)" onclick="deletePlan(${p.id})">${p.active ? 'Disable' : 'Delete'}</button>
      </div>
    </div>
  `).join('');
}

function openPlanModal(plan) {
  $('plan-modal-title').textContent = plan ? 'Edit plan' : 'Add plan';
  $('plan-edit-id').value = plan ? plan.id : '';
  $('plan-name').value     = plan ? plan.name : '';
  $('plan-price').value    = plan ? plan.price_tzs : '';
  $('plan-duration').value = plan ? plan.duration_min : '';
  $('plan-data').value     = plan ? (plan.data_mb || '') : '';
  $('plan-desc').value     = plan ? (plan.description || '') : '';
  $('plan-sort').value     = plan ? plan.sort_order : 0;
  $('plan-modal').style.display = 'flex';
}

function closePlanModal(e) {
  if (e && e.target !== $('plan-modal')) return;
  $('plan-modal').style.display = 'none';
}

async function savePlan(e) {
  e.preventDefault();
  const id = $('plan-edit-id').value;
  const payload = {
    name:         $('plan-name').value.trim(),
    price_tzs:    parseInt($('plan-price').value, 10),
    duration_min: parseInt($('plan-duration').value, 10),
    data_mb:      $('plan-data').value ? parseInt($('plan-data').value, 10) : null,
    description:  $('plan-desc').value.trim() || null,
    sort_order:   parseInt($('plan-sort').value, 10) || 0,
  };

  try {
    if (id) {
      await api('PUT', `/plans/${id}`, payload);
      showToast('Plan updated', 'success');
    } else {
      await api('POST', '/plans', payload);
      showToast('Plan created', 'success');
    }
    closePlanModal();
    loadPlans();
  } catch (e) {
    showToast('Failed to save plan', 'error');
  }
}

async function deletePlan(id) {
  if (!confirm('Disable or delete this plan?')) return;
  try {
    await api('DELETE', `/plans/${id}`);
    showToast('Plan removed', 'success');
    loadPlans();
  } catch (e) {
    showToast('Failed to remove plan', 'error');
  }
}

// ── Settings ──────────────────────────────────────────────────────────────────

async function loadSettings() {
  try {
    const { data } = await api('GET', '/settings');
    $('s-business-name').value     = data.business_name || '';
    $('s-currency').value          = data.currency || 'TZS';
    $('s-portal-instructions').value = data.portal_instructions || '';
    $('s-mm-provider').value       = data.mobile_money_provider || '';
    $('s-mm-number').value         = data.mobile_money_number || '';
    $('s-mm-name').value           = data.mobile_money_name || '';
    $('s-omada-url').value         = data.omada_controller_url || '';
    $('s-omada-cid').value         = data.omada_controller_id || '';
    $('s-omada-site').value        = data.omada_site_id || '';
    $('s-omada-user').value        = data.omada_operator_username || '';
    // password: never pre-fill
  } catch (e) { /* silent */ }
}

async function saveSettings() {
  const btn = $('save-settings-btn');
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Saving…';

  const payload = {
    business_name:           $('s-business-name').value.trim(),
    currency:                $('s-currency').value.trim(),
    portal_instructions:     $('s-portal-instructions').value.trim(),
    mobile_money_provider:   $('s-mm-provider').value.trim(),
    mobile_money_number:     $('s-mm-number').value.trim(),
    mobile_money_name:       $('s-mm-name').value.trim(),
    omada_controller_url:    $('s-omada-url').value.trim(),
    omada_controller_id:     $('s-omada-cid').value.trim(),
    omada_site_id:           $('s-omada-site').value.trim(),
    omada_operator_username: $('s-omada-user').value.trim(),
  };

  const pass = $('s-omada-pass').value;
  if (pass) payload.omada_operator_password = pass;

  try {
    await api('PUT', '/settings', payload);
    showToast('Settings saved', 'success');
    $('s-omada-pass').value = ''; // clear password field
  } catch (e) {
    showToast('Failed to save settings', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save settings';
  }
}

async function testOmada() {
  const el = $('omada-test-result');
  el.textContent = 'Testing…';
  el.style.color = 'var(--text-muted)';

  try {
    const { data } = await api('POST', '/settings/test-omada');
    if (data.ok) {
      el.textContent = '✓ ' + data.message;
      el.style.color = 'var(--accent)';
    } else {
      el.textContent = '✗ ' + data.error;
      el.style.color = 'var(--danger)';
    }
  } catch (e) {
    el.textContent = '✗ Network error';
    el.style.color = 'var(--danger)';
  }
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

function switchTab(name, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  $(`tab-${name}`).classList.add('active');
}

// ── Init ──────────────────────────────────────────────────────────────────────

boot();
