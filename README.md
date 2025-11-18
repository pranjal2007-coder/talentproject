# TalentConnect — React + Vite + Tailwind + Firebase + Razorpay

This repository is a Vite + React conversion of the original static Talent Connect platform. It includes Tailwind CSS, Firebase (Auth, Firestore, Storage), role-based routes (Customer / Organizer) and a client-side Razorpay integration.

Important: This scaffold provides the frontend application. For production-grade Razorpay order creation (recommended), you should implement a small server endpoint to securely create Razorpay orders using your secret key.

Quickstart
1. Clone
   git clone <this-repo>
   cd talent-connect-react

2. Install
   npm install

3. Environment
   - Copy `.env.example` to `.env`
   - Fill values:
     VITE_RAZORPAY_KEY=rzp_test_xxxxx
     VITE_FIREBASE_API_KEY=AIza...
     VITE_FIREBASE_AUTH_DOMAIN=...
     VITE_FIREBASE_PROJECT_ID=...
     VITE_FIREBASE_DATABASE_URL=...
     VITE_FIREBASE_STORAGE_BUCKET=...
     (You can keep the provided Firebase config in code for testing; recommended: move secrets to env.)

4. Assets
   - Place the site logo in: `src/assets/logo.png`
     (The original static project referenced logo.png/logo.jpg — copy your project logo here.)

5. Dev server
   npm run dev
   Opens at http://localhost:5173

6. Build
   npm run build
   npm run preview

Firebase Setup (short)
- Create a Firebase project
- Enable Authentication (Email/Password and Phone for organizer verification)
- Enable Firestore (rules as needed)
- Enable Storage (for event images)
- Add your app and copy config values (or use the config embedded in src/firebase.js)

Razorpay Notes
- For production, create a server endpoint that creates orders via Razorpay server SDK using your secret key.
- Frontend should call your server to get an order_id and then open the Razorpay Checkout.
- If no backend is available, a client-side test flow is implemented (read Payment.jsx comments).

Project structure (key files)
- src/
  - assets/logo.png
  - components/Navbar.jsx, Footer.jsx, PrivateRoute.jsx
  - contexts/AuthContext.jsx
  - pages/* (Home, BrowseEvents, BookEvent, BookingPage, Login, Signup, Payment, OrganizerDashboard, CustomerDashboard, Profile, Host, About, Contact, Policy, PrivatePolicy)
  - firebase.js
  - utils/geo.js, api.js
  - index.css (Tailwind)

Preview host
`vite.config.js` includes allowedHosts for `eventbridge-25.preview.emergentagent.com` as requested.

Security notice
- Do NOT commit your real Razorpay secret key to the frontend or to public repos.
- Use a serverless function or backend to create Razorpay orders.

If you want, I can:
- Provide example server code (Node/Express) to create Razorpay orders and verify webhooks.
- Expand pages to include fuller UI parity for each original HTML page.

Happy hacking 🎉