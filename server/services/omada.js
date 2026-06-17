'use strict';

const axios = require('axios');
const https = require('https');
const { getSettings } = require('../db');

// Omada controllers commonly use self-signed TLS certificates
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

function buildClient(baseURL) {
  return axios.create({
    baseURL,
    httpsAgent,
    timeout: 15000,
    maxRedirects: 0,
  });
}

async function loadConfig() {
  const cfg = getSettings([
    'omada_controller_url',
    'omada_controller_id',
    'omada_operator_username',
    'omada_operator_password',
  ]);

  const missing = Object.entries(cfg)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length > 0) {
    throw new Error(`Omada not fully configured. Missing: ${missing.join(', ')}. Go to Admin → Settings.`);
  }

  return cfg;
}

async function operatorLogin(cfg) {
  const client = buildClient(cfg.omada_controller_url);

  const res = await client.post(
    `/${cfg.omada_controller_id}/api/v2/hotspot/login`,
    {
      username: cfg.omada_operator_username,
      password: cfg.omada_operator_password,
    }
  );

  if (res.data.errorCode !== 0) {
    throw new Error(`Omada operator login failed: ${res.data.msg || 'unknown error'} (code ${res.data.errorCode})`);
  }

  // Handle both pre-5.11 (TPEAP_SESSIONID) and 5.11+ (TPOMADA_SESSIONID) controllers
  const setCookie = [].concat(res.headers['set-cookie'] || []);
  let sessionCookie = null;

  for (const c of setCookie) {
    const match = c.match(/(TPOMADA_SESSIONID|TPEAP_SESSIONID)=([^;]+)/);
    if (match) {
      sessionCookie = `${match[1]}=${match[2]}`;
      break;
    }
  }

  if (!sessionCookie) {
    throw new Error('Omada login succeeded but no session cookie was returned. Check controller version/credentials.');
  }

  return { client, sessionCookie };
}

/**
 * Authenticate a client device on the Omada controller.
 *
 * @param {object} params
 * @param {string} params.clientMac   - Client MAC address
 * @param {string} params.apMac       - AP MAC address
 * @param {string} params.ssid        - SSID name
 * @param {number} params.radioId     - Radio ID (0=2.4GHz, 1=5GHz)
 * @param {number} params.durationMin - Session duration in minutes
 * @param {number} [params.dataMb]    - Data cap in MB (null/0 = unlimited)
 */
async function authorizeClient({ clientMac, apMac, ssid, radioId, durationMin, dataMb }) {
  const cfg = await loadConfig();
  const { client, sessionCookie } = await operatorLogin(cfg);

  const durationSec = durationMin * 60;
  const authType = (dataMb && dataMb > 0) ? 3 : 1; // 1=time only, 3=time+traffic

  const body = {
    clientMac,
    apMac,
    ssidName: ssid,
    radioId:  parseInt(radioId, 10) || 0,
    time:     durationSec,
    authType,
  };

  if (authType === 3) body.flow = dataMb;

  const res = await client.post(
    `/${cfg.omada_controller_id}/api/v2/hotspot/extPortal/auth`,
    body,
    { headers: { Cookie: sessionCookie } }
  );

  if (res.data.errorCode !== 0) {
    throw new Error(`Omada auth failed: ${res.data.msg || 'unknown error'} (code ${res.data.errorCode})`);
  }

  return res.data;
}

/**
 * Verify that the controller is reachable and credentials are valid.
 * Returns { ok: true } or throws with a descriptive message.
 */
async function testConnection() {
  const cfg = await loadConfig();
  await operatorLogin(cfg);
  return { ok: true };
}

module.exports = { authorizeClient, testConnection };
