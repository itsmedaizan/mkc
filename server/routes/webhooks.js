'use strict';

const express = require('express');
const { getActiveProvider } = require('../services/payment');

const router = express.Router();

// Phase 2: payment gateway will POST here when a payment is confirmed.
// ManualPaymentProvider returns 404; swap in GatewayPaymentProvider to go live.
router.post('/payment', (req, res) => {
  const provider = getActiveProvider();
  provider.handleWebhook(req, res);
});

module.exports = router;
