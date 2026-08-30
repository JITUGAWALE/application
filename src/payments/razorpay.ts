export const RAZORPAY_KEY_ID = 'rzp_test_TQUqk4akFmuac2';

export type RazorpayCheckoutOptions = {
  amountInRupees: number;
  orderId: string;
  restaurantName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
};

export function buildRazorpayCheckoutHtml(options: RazorpayCheckoutOptions): string {
  const { amountInRupees, orderId, restaurantName, customerName, customerEmail, customerPhone } = options;

  const checkoutOptions = {
    key: RAZORPAY_KEY_ID,
    amount: Math.round(amountInRupees * 100),
    currency: 'INR',
    name: 'Foodie',
    description: `Order from ${restaurantName}`,
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone,
    },
    notes: { orderId },
    theme: { color: '#E23744' },
  };

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; height: 100%; background: #F7F7F7; font-family: -apple-system, Roboto, sans-serif; }
    </style>
  </head>
  <body>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script>
      function post(message) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        }
      }

      var options = ${JSON.stringify(checkoutOptions)};

      options.handler = function (response) {
        post({ type: 'success', paymentId: response.razorpay_payment_id });
      };
      options.modal = {
        ondismiss: function () {
          post({ type: 'dismiss' });
        },
      };

      try {
        var rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response) {
          post({ type: 'failure', reason: response.error && response.error.description });
        });
        rzp.open();
      } catch (e) {
        post({ type: 'failure', reason: e && e.message });
      }
    </script>
  </body>
</html>`;
}

export type RazorpayWebMessage =
  | { type: 'success'; paymentId: string }
  | { type: 'failure'; reason?: string }
  | { type: 'dismiss' };
