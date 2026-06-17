'use strict';

/**
 * PaymentProvider interface.
 *
 * Phase 1: ManualPaymentProvider — admin manually confirms payments.
 * Phase 2: swap in GatewayPaymentProvider (ClickPesa / Selcom) with the
 *           same interface; the Omada integration and admin dashboard are
 *           untouched.
 */
class PaymentProvider {
  /**
   * Called when a session is first created.
   * Returns any extra data to merge into the session record (e.g. gateway tx ID).
   */
  // eslint-disable-next-line no-unused-vars
  async initiate(session) { return {}; }

  /**
   * Called when admin manually confirms a payment (manual flow only).
   * Phase 2 providers receive confirmation via handleWebhook instead.
   */
  // eslint-disable-next-line no-unused-vars
  async confirm(sessionId, adminId) { return {}; }

  /**
   * Phase 2 hook — called by the /api/webhooks/payment endpoint when the
   * payment gateway posts a payment notification.
   * Should resolve the matching session and trigger Omada auth.
   */
  // eslint-disable-next-line no-unused-vars
  async handleWebhook(req, res) {
    res.status(501).json({ error: 'Webhook not implemented for this provider' });
  }
}

class ManualPaymentProvider extends PaymentProvider {
  async initiate(session) {
    // Nothing extra to do for manual payments — the portal just shows
    // the bank/mobile-money transfer instructions.
    return {};
  }

  async confirm(sessionId, adminId) {
    // Actual Omada call + DB update happens in the admin route handler
    // so it has access to the DB transaction. This hook is a no-op for manual.
    return {};
  }

  async handleWebhook(req, res) {
    res.status(404).json({ error: 'Manual payment provider does not accept webhooks' });
  }
}

// ── Phase 2 stub ──────────────────────────────────────────────────────────────
// Uncomment and fill in to replace manual confirmation with a real gateway.
//
// class ClickPesaProvider extends PaymentProvider {
//   async initiate(session) {
//     // POST to ClickPesa to create a push-payment request
//     // Return { gateway_tx_id: '...' } to store on the session
//   }
//   async handleWebhook(req, res) {
//     // Verify signature, find session by gateway_tx_id, call authorizeClient
//   }
// }

function getActiveProvider() {
  // Swap this line to switch providers in Phase 2
  return new ManualPaymentProvider();
}

module.exports = { PaymentProvider, ManualPaymentProvider, getActiveProvider };
