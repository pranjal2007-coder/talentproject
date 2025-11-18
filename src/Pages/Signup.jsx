import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [phone, setPhone] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await signup({ name, email, password, role, phone });
      alert('Account created. Please verify your email. Redirecting...');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold">Create Account</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" required />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-2 border rounded" required />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" required minLength={6} />
          <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 border rounded">
            <option value="customer">Customer</option>
            <option value="organizer">Event Organizer</option>
          </select>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone (optional)" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-accent text-white py-2 rounded">Create Account</button>
        </form>
      </div>
    </div>
  );
}