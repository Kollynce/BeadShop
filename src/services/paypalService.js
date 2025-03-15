import { loadScript } from "@paypal/paypal-js";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID';

export const paypalService = {
  async initializePayPal() {
    try {
      return await loadScript({
        "client-id": PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture"
      });
    } catch (error) {
      console.error("Failed to load PayPal JS SDK:", error);
      throw error;
    }
  },

  createOrder(total, items) {
    return {
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: total.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total.toFixed(2)
            }
          }
        },
        items: items.map(item => ({
          name: item.name,
          unit_amount: {
            currency_code: "USD",
            value: item.price.toFixed(2)
          },
          quantity: item.quantity.toString()
        }))
      }]
    };
  },

  async handlePayPalError(error) {
    console.error("PayPal Error:", error);
    // Add any custom error handling here
    throw error;
  }
}