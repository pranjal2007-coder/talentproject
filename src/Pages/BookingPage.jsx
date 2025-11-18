import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, saveBooking } from '../utils/api';
import Payment from './Payment';
import { useAuth } from '../contexts/AuthContext';

export default function BookingPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const e = await getEventById(eventId);
        setEvent(e);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [eventId]);

  async function handlePaymentSuccess(paymentResult) {
    // Save booking record
    const bookingData = {
      userId: user.uid,
      eventId: event.id,
      organizerId: event.organizerId || null,
      amount: paymentResult.amount || event.price * ticketCount,
      paymentId: paymentResult.razorpay_payment_id || paymentResult.paymentId,
      status: 'confirmed'
    };
    try {
      await saveBooking(bookingData);
      navigate('/customer-dashboard');
    } catch (err) {
      console.error('Failed saving booking', err);
    }
  }

  if (!event) return <div className="p-6">Loading event...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={event.imageURL || event.image} alt={event.title} className="w-full h-64 object-cover rounded" />
          <h2 className="text-2xl font-bold mt-4">{event.title}</h2>
          <p className="text-gray-600 mt-2">{event.date} • {event.time}</p>
          <p className="mt-4">{event.description}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Tickets</h3>
          <div className="mt-3 flex items-center gap-3">
            <button className="px-3 py-1 border rounded" onClick={() => setTicketCount(c => Math.max(1, c - 1))}>-</button>
            <div className="text-xl font-bold">{ticketCount}</div>
            <button className="px-3 py-1 border rounded" onClick={() => setTicketCount(c => Math.min(10, c + 1))}>+</button>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600">Price per ticket</div>
            <div className="text-2xl font-bold">₹ {event.price || 0}</div>
          </div>

          <div className="mt-6">
            <Payment
              amount={(event.price || 0) * ticketCount + 50} // include simple booking fee
              description={`Booking for ${event.title} x${ticketCount}`}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
}