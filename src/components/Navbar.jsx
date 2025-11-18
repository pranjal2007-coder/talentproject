import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate('/');
  }

  return (
    <header className="w-full bg-white shadow-md fixed z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="TalentConnect" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-primary">Talent <span className="text-black">Connect</span></span>
        </div>

        <nav className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-primary font-semibold' : 'text-gray-700'}>Home</NavLink>
          <NavLink to="/browse" className={({isActive}) => isActive ? 'text-primary font-semibold' : 'text-gray-700'}>Browse Events</NavLink>
          <NavLink to="/book" className={({isActive}) => isActive ? 'text-primary font-semibold' : 'text-gray-700'}>Book Event</NavLink>
          <NavLink to="/host" className={({isActive}) => isActive ? 'text-primary font-semibold' : 'text-gray-700'}>Host</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'text-primary font-semibold' : 'text-gray-700'}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'text-primary font-semibold' : 'text-gray-700'}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button className="hidden md:inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full" onClick={() => navigate(profile?.role === 'organizer' ? '/organizer-dashboard' : '/customer-dashboard')}>
                {profile?.name || 'Dashboard'}
              </button>
              <button onClick={handleLogout} className="hidden md:inline bg-gray-100 px-3 py-2 rounded-full">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="hidden md:inline bg-transparent border-2 border-primary text-primary px-4 py-2 rounded-full">Login</button>
              <button onClick={() => navigate('/signup')} className="hidden md:inline bg-accent text-white px-4 py-2 rounded-full">Sign Up</button>
            </>
          )}

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 flex flex-col gap-3">
            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/browse" onClick={() => setOpen(false)}>Browse Events</NavLink>
            <NavLink to="/book" onClick={() => setOpen(false)}>Book Event</NavLink>
            <NavLink to="/host" onClick={() => setOpen(false)}>Host</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

            <div className="pt-2 border-t">
              {user ? (
                <>
                  <button className="w-full text-left py-2" onClick={() => { navigate(profile?.role === 'organizer' ? '/organizer-dashboard' : '/customer-dashboard'); setOpen(false); }}>Dashboard</button>
                  <button className="w-full text-left py-2" onClick={() => { handleLogout(); setOpen(false); }}>Logout</button>
                </>
              ) : (
                <>
                  <button className="w-full text-left py-2" onClick={() => { navigate('/login'); setOpen(false); }}>Login</button>
                  <button className="w-full text-left py-2" onClick={() => { navigate('/signup'); setOpen(false); }}>Sign Up</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}