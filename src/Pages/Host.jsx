import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createEvent, uploadImage } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Host() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', date: '', time: '', price: 0, capacity: 100, category: '', image: null, venueAddress: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!profile || profile.role !== 'organizer') {
      alert('Only organizers can create events. Please sign up as organizer and verify phone.');
      return;
    }
    setLoading(true);
    try {
      let imageURL = '';
      if (form.image) imageURL = await uploadImage(form.image, 'events');

      const eventId = await createEvent({
        title: form.title,
        date: form.date,
        time: form.time,
        price: Number(form.price),
        capacity: Number(form.capacity),
        category: form.category,
        imageURL,
        location: { address: form.venueAddress },
        organizerId: profile?.uid || null,
      });
      alert('Event created: ' + eventId);
      navigate('/organizer-dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed creating event');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold">Host Your Event</h1>
      <p className="mt-2 text-gray-600">Create and publish events to reach attendees.</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mt-6 space-y-3">
        <input required placeholder="Event title" className="w-full p-2 border rounded" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
        <input required type="date" className="p-2 border rounded" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} />
        <input required type="time" className="p-2 border rounded" value={form.time} onChange={e => setForm(f => ({...f, time: e.target.value}))} />
        <input type="number" placeholder="Price (INR)" className="p-2 border rounded" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} />
        <input type="number" placeholder="Total tickets" className="p-2 border rounded" value={form.capacity} onChange={e => setForm(f => ({...f, capacity: e.target.value}))} />
        <input placeholder="Category" className="p-2 border rounded" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} />
        <input placeholder="Venue Address" className="p-2 border rounded" value={form.venueAddress} onChange={e => setForm(f => ({...f, venueAddress: e.target.value}))} />
        <input type="file" accept="image/*" onChange={e => setForm(f => ({...f, image: e.target.files[0]}))} />
        <button type="submit" disabled={loading} className="btn-accent">{loading ? 'Saving...' : 'Create Event'}</button>
      </form>
    </div>
  );
}