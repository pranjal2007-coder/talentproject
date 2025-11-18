import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../utils/api';
import { getUserLocation, distanceBetween } from '../utils/geo';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState('');
  const [loc, setLoc] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const e = await fetchEvents({ limitCount: 10 });
        setEvents(e);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  async function detectLocation() {
    try {
      const pos = await getUserLocation();
      setLoc(pos);
      // crude city placeholder
      setCity('Your Location');
    } catch (err) {
      console.warn('geo failed', err);
    }
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary to-purple-700 text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Discover, Book & Experience Events Effortlessly</h1>
          <p className="mt-4 max-w-2xl mx-auto opacity-90">Join thousands who trust TalentConnect to find and host incredible experiences.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/browse" className="bg-white text-primary px-5 py-3 rounded-full font-semibold">Browse Events</Link>
            <Link to="/host" className="border border-white text-white px-5 py-3 rounded-full">Host an Event</Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Events Near You</h2>
            <div>
              <button className="btn-accent" onClick={detectLocation}>📍 Detect Location</button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map(ev => {
              const dist = (loc && ev.location?.lat) ? distanceBetween(loc, [ev.location.lat, ev.location.lng]).toFixed(1) : null;
              return (
                <div key={ev.id} className="bg-white rounded-lg shadow p-4">
                  <img src={ev.imageURL || ev.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'} className="w-full h-40 object-cover rounded" alt={ev.title} />
                  <h3 className="text-lg font-semibold mt-3">{ev.title}</h3>
                  <p className="text-sm text-gray-600">{ev.date} • {ev.time}</p>
                  <p className="mt-2 text-sm text-gray-700">{ev.location?.address || ev.venueName}</p>
                  {dist && <p className="mt-1 text-xs text-gray-500">{dist} km away</p>}
                  <div className="mt-3">
                    <Link to={`/book/${ev.id}`} className="bg-primary text-white px-3 py-2 rounded">Book Tickets</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}