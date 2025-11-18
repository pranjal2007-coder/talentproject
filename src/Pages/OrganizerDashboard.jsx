import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchEvents } from '../utils/api';

/**
 * Basic Organizer dashboard skeleton:
 * - lists events by organizer
 * - link to host/create event
 * - shows stats
 */
export default function OrganizerDashboard() {
  const { profile } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const all = await fetchEvents();
      // filter organizer events (demo)
      const mine = all.filter(e => e.organizerId === profile?.uid || profile?.role === 'organizer' && e.email === profile?.email);
      setEvents(mine);
    })();
  }, [profile]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold">Organizer Dashboard</h1>
      <p className="mt-2 text-gray-600">Manage your events, bookings and earnings</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold">Active Events</h3>
          <div className="text-3xl mt-2">{events.length}</div>
        </div>
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold">Total Bookings</h3>
          <div className="text-3xl mt-2">—</div>
        </div>
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold">Total Revenue</h3>
          <div className="text-3xl mt-2">₹ 0</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">My Events</h2>
          <a href="/host" className="btn-accent">Create Event</a>
        </div>

        <div className="mt-4 space-y-4">
          {events.map(ev => (
            <div key={ev.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{ev.title}</h3>
                <p className="text-sm text-gray-600">{ev.date} • {ev.time}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded">Edit</button>
                <button className="px-3 py-1 border rounded">Bookings</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}