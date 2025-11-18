import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PrivateRoute wraps protected pages.
 * - role: optional, 'customer' or 'organizer'
 */
export default function PrivateRoute({ children, role }) {
  const { user, profile, initializing } = useAuth();

  if (initializing) return <div className="p-6">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && profile?.role !== role) {
    // unauthorized
    return <Navigate to="/" replace />;
  }

  // For organizers require phoneVerified true to access creation pages — you can extend here
  return children;
}