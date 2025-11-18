import React, { useEffect, useState } from 'react';
import { saveBooking } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

/**
 * Payment.jsx - lightweight Razorpay integration.
 *
 * Props:
 * - amount (number) in INR
 * - description (string)
 * - onSuccess(callback)
 *
 * NOTE: For production, create a backend endpoint that creates a Razorpay order
 * using your secret key and returns order_id. The frontend should then call
 * Razorpay checkout with that order_id. The sample below uses a direct checkout
 * (client-side test flow) if no backend is configured.
 */
export default function Payment({ amount = 100, description = '', onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // load Razorpay script
    if (!document.getElementById('razorpay-script')) {
      const s = document.createElement('script');
      s.id = 'razorpay-script';
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(s);
    }
  }, []);

  async function handlePay() {
    if (!user) {
      alert('Please login to pay');
      return;
    }

    setLoading(true);
    try {
      // Preferred: call your backend to create order and return order_id
      // Example (pseudo):
      // const order = await axios.post('/api/create-order', { amount });
      // const options = { key: process.env.VITE_RAZORPAY_KEY, order_id: order.data.id, ... };

      // Fallback client-side test flow (Razorpay will create a payment but for production you need server-side)
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_xxxxx', // PUBLIC KEY only
        amount: Math.round(amount * 100), // paise
        currency: 'INR',
        name: 'TalentConnect',
        description: description,
        handler: function (response) {
          // response={ razorpay_payment_id, razorpay_order_id, razorpay_signature }
          onSuccess && onSuccess({ ...response, amount });
        },
        prefill: {
          email: user.email,
          name: user.displayName || ''
        },
        theme: { color: '#5b21b6' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment failed', err);
      alert('Payment failed. See console.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-gray-50 p-4 rounded">
        <div className="text-sm text-gray-600">Total payable</div>
        <div className="text-2xl font-bold">₹ {amount}</div>
      </div>

      <button onClick={handlePay} disabled={loading} className="mt-4 w-full bg-accent text-white px-4 py-3 rounded">
        {loading ? 'Processing...' : `Pay ₹ ${amount}`}
      </button>
    </div>
  );
}