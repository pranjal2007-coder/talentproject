import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="text-xl font-semibold">TalentConnect</h3>
          <p className="opacity-90">Where talent meets opportunity</p>
        </div>
        <div>
          <h4 className="font-semibold">For Event Hosts</h4>
          <a className="block">Create an Event</a>
          <a className="block">Getting Started Guide</a>
          <a className="block">Pricing</a>
        </div>
        <div>
          <h4 className="font-semibold">For Attendees</h4>
          <a className="block">Browse Events</a>
          <a className="block">My Tickets</a>
          <a className="block">Event Calendar</a>
        </div>
        <div>
          <h4 className="font-semibold">Support</h4>
          <a className="block">Contact Us</a>
          <a className="block">Privacy Policy</a>
          <a className="block">Terms of Service</a>
        </div>
      </div>
      <div className="text-center py-6 opacity-90">© 2025 TalentConnect. All rights reserved.</div>
    </footer>
  );
}
