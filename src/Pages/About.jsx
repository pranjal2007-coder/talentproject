import React from 'react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="bg-primary text-white rounded p-12">
        <h1 className="text-3xl font-bold">About TalentConnect</h1>
        <p className="mt-3 max-w-2xl">Your Gateway to Amazing Events & Effortless Event Organization</p>
      </section>

      <section className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-primary">Event Booking Made Simple</h3>
          <p className="mt-2">Browse and book tickets for amazing local events — everything a few clicks away.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-primary">Event Organization Made Easy</h3>
          <p className="mt-2">Create your event, set price, manage sales — simple tools.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-primary">No Marketing Headaches</h3>
          <p className="mt-2">Platform promotion helps reach thousands of attendees.</p>
        </div>
      </section>
    </div>
  );
}
