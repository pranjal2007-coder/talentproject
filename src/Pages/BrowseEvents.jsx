import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../utils/api';
import { Link } from 'react-router-dom';
import { getUserLocation, distanceBetween } from '../utils/geo';

export default function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ category: '', location: '', price: '' });
  const [loc, setLoc] = useState(null);

  useEffect(() => {
    (async () => {
      const e = await fetchEvents({ limitCount: 100 });
      setEvents(e);
    })();
  }, []);

  async function detect() {
    try {
      const p = await getUserLocation();
      setLoc(p);
    } catch (e) {
      console.warn(e);
    }
  }

  const filtered = events.filter(ev => {
    if (filters.category && ev.category !== filters.category) return false;
    if (filters.location && ev.location?.address && !ev.location.address.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.price) {
      if (filters.price === 'free' && ev.price !== 0) return false;
      if (filters.price === 'paid' && ev.price === 0) return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Discover Amazing Events</h1>
          <div className="flex gap-2">
            <button onClick={detect} className="btn-accent">Detect My Location</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 bg-white rounded p-4 shadow">
            <label className="block mb-2">Category</label>
            <select className="w-full p-2 border rounded" value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
              <option value="">All Categories</option>
              <option value="music">Music</option>
              <option value="workshop">Workshop</option>
              <option value="conference">Conference</option>
            </select>

            <label className="block mt-4 mb-2">Location</label>
            <input className="w-full p-2 border rounded" value={filters.location} onChange={e => setFilters(f => ({ ...f, location: e.target.value }))} placeholder="City or venue" />

            <label className="block mt-4 mb-2">Price</label>
            <select className="w-full p-2 border rounded" value={filters.price} onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}>
              <option value="">Any Price</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map(ev => (
                <div key={ev.id} className="bg-white rounded shadow p-4">
                  <img src={ev.imageURL || ev.image} className="w-full h-44 object-cover rounded" alt={ev.title} />
                  <h3 className="mt-3 text-lg font-semibold">{ev.title}</h3>
                  <p className="text-sm text-gray-600">{ev.date} • {ev.time}</p>
                  <p className="text-sm mt-2">{ev.location?.address}</p>
                  <div className="mt-3 flex gap-2">
                    <Link className="bg-primary text-white px-3 py-2 rounded" to={`/book/${ev.id}`}>Book</Link>
                    <Link className="border px-3 py-2 rounded" to={`/book/${ev.id}`}>Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}