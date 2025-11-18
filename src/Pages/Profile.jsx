import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { profile } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold">My Profile</h2>
        <div className="mt-4">
          <div><strong>Name:</strong> {profile?.name}</div>
          <div><strong>Email:</strong> {profile?.email}</div>
          <div><strong>Role:</strong> {profile?.role}</div>
        </div>
      </div>
    </div>
  );
}