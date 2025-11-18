import React, { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    // For demo, simply wait
    setTimeout(() => setStatus('sent'), 1000);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-primary text-white p-12 rounded">
        <h1 className="text-3xl font-bold">Get In Touch</h1>
        <p className="mt-2">We'd love to hear from you. Let us know how we can help.</p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-primary">Contact Information</h3>
          <p className="mt-3">Sector 17 Plaza, Chandigarh, India</p>
          <p className="mt-1">+91 9876543210</p>
          <p className="mt-1">piyush919r@gmail.com</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-primary">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="mt-4">
            <input required placeholder="Name" className="w-full p-2 border rounded" />
            <input required placeholder="Email" className="w-full p-2 border rounded mt-3" />
            <input placeholder="Subject" className="w-full p-2 border rounded mt-3" />
            <textarea required placeholder="Message" className="w-full p-2 border rounded mt-3" rows="5" />
            <button type="submit" className="mt-3 btn-accent">{status === 'sending' ? 'Sending...' : 'Send Message'}</button>
            {status === 'sent' && <div className="mt-2 text-green-600">Message sent!</div>}
          </form>
        </div>
      </div>
    </div>
  );
}