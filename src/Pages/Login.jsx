import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await login(email, password);
      // redirect handled by AuthContext observer inside App
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block">Email</label>
          <input className="w-full p-2 border rounded mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label className="block mt-3">Password</label>
          <input type="password" className="w-full p-2 border rounded mt-1" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label className="block mt-3">Login As</label>
          <select className="w-full p-2 border rounded mt-1" value={userType} onChange={e => setUserType(e.target.value)} required>
            <option value="">Select user type</option>
            <option value="customer">Customer</option>
            <option value="organizer">Event Organizer</option>
          </select>

          <button type="submit" className="mt-6 w-full bg-primary text-white py-2 rounded">Sign In</button>
        </form>
      </div>
    </div>
  );
}