import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookEvent() {
  const navigate = useNavigate();

  // This page can act as a search or a shortcut to booking flow
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold">Book an Event</h2>
      <p className="mt-2 text-gray-600">Use the browse page to find events, then click "Book" to start the checkout.</p>

      <div className="mt-6">
        <button className="btn-accent" onClick={() => navigate('/browse')}>Browse Events</button>
      </div>
    </div>
  );
}