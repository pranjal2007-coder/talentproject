import React from 'react';

export default function CustomerDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <p className="mt-2 text-gray-600">View and manage your event bookings here.</p>

      <div className="mt-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600">No bookings yet. Explore events and book your first ticket!</p>
        </div>
      </div>
    </div>
  );
}