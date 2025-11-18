import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrowseEvents from './pages/BrowseEvents';
import BookEvent from './pages/BookEvent';
import BookingPage from './pages/BookingPage';
import Host from './pages/Host';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Payment from './pages/Payment';
import OrganizerDashboard from './pages/OrganizerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Profile from './pages/Profile';
import Policy from './pages/Policy';
import PrivatePolicy from './pages/PrivatePolicy';
import PrivateRoute from './components/PrivateRoute';

/**
 * NOTE: Per your instruction, the original Index.html is the customer dashboard.
 * The root route ("/") now renders the CustomerDashboard component so behavior
 * matches the original Index.html being the customer landing/dashboard.
 *
 * The previous Home component remains available if you want a separate marketing
 * landing page — it can be mounted at /home or reused later.
 */

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Routes>
          {/* Root now serves the Customer Dashboard to match original Index.html */}
          <Route path="/" element={<CustomerDashboard />} />

          {/* Keep Home available if you want a separate marketing landing */}
          <Route path="/home" element={<Home />} />

          <Route path="/browse" element={<BrowseEvents />} />
          <Route path="/book" element={<BookEvent />} />
          <Route path="/book/:eventId" element={<BookingPage />} />
          <Route path="/host" element={<Host />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/private-policy" element={<PrivatePolicy />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/customer-dashboard" element={
            <PrivateRoute role="customer">
              <CustomerDashboard />
            </PrivateRoute>
          } />

          <Route path="/organizer-dashboard" element={
            <PrivateRoute role="organizer">
              <OrganizerDashboard />
            </PrivateRoute>
          } />

          <Route path="*" element={<div className="p-8">404 - Page not found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
