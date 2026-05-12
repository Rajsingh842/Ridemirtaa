# Ridemitraa

Peer-to-peer ride sharing for **fuel cost sharing** (not profit), aimed at students and commuters in India. Built with **Next.js**, **Tailwind CSS**, **Firebase** (Auth + Firestore), and **Leaflet** + **OpenStreetMap**.

## Run locally (working app)

1. `npm install`
2. Copy `.env.local.example` → `.env.local` and paste **all** Firebase web keys from the Firebase Console (same project for Auth + Firestore).
3. `npm run dev` → open **http://localhost:3000**

**Hindi + step-by-step:** see **`QUICKSTART.txt`**. On Windows you can double-click **`dev-open.bat`** (starts the dev server and opens the browser after a short delay).

**Health check:** [http://localhost:3000/api/health](http://localhost:3000/api/health) returns JSON (`firebaseConfigured` tells you if env vars loaded).

## Tech stack

| Area | Choice |
|------|--------|
| Frontend | Next.js (Pages Router), React, Tailwind CSS |
| Auth & DB | Firebase Authentication (email/password), Cloud Firestore |
| Real-time | Firestore `onSnapshot` listeners |
| Maps | Leaflet + OSM tiles (no Google Maps) |
| Geocoding | OSM Nominatim (free; respect [usage policy](https://operations.osmfoundation.org/policies/nominatim/)) |
| Hosting | Vercel (free tier) |

## Project structure

```
/pages          — App routes (home, auth, dashboard, rides, …)
/components     — UI (layout, map, SOS, …)
/lib            — Firebase config, Firestore helpers, fare/geo helpers
/styles         — Global CSS + Tailwind
firestore.rules — Example security rules (dev-oriented)
firestore.indexes.json — Composite indexes for queries
```

## 1. Firebase project setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and **Create a project** (disable Google Analytics if you want it minimal).
2. Under **Project settings** (gear icon) → **Your apps** → add a **Web** app. Register the app and copy the `firebaseConfig` values.

## 2. Firestore database

1. In Firebase Console: **Build** → **Firestore Database** → **Create database**.
2. Start in **test mode** for quick local dev, then deploy the rules from `firestore.rules` (**Rules** tab) when you are ready.
3. Deploy indexes (optional, from project folder with Firebase CLI):

   ```bash
   firebase deploy --only firestore:indexes
   ```

   Or open the **link in the browser error** when a query fails — Firebase suggests the exact composite index (status + date, riderId + createdAt, etc.).

## 3. Authentication

1. **Build** → **Authentication** → **Get started**.
2. Enable **Email/Password** sign-in.

## 4. Environment variables

1. Copy `.env.local.example` to `.env.local` in the project root.
2. Paste your web app keys from Firebase **Project settings** → **General** → **Your apps**.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 5. Run locally

```bash
cd "path/to/Ridemitraa cur"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- Use **HTTPS or localhost** for geolocation; allow location when the browser asks (live tracking & SOS).
- Create one account as **rider** and one as **passenger** to test booking and map markers.

## 6. Deploy on Vercel

1. Push the project to **GitHub** (or GitLab/Bitbucket).
2. Import the repo in [Vercel](https://vercel.com/) → **New Project**.
3. Add the same `NEXT_PUBLIC_FIREBASE_*` variables in **Settings** → **Environment Variables** (Production & Preview).
4. Deploy. Vercel runs `npm run build` automatically.

## Features (checklist)

- Email/password auth; user profile in `users` (name, email, phone, role, rating, `location`, `createdAt`).
- Riders create rides in `rides` (route text, date/time, seats, vehicle info, suggested per-seat fuel share).
- Passengers search/filter rides; bookings in `bookings` with transactional seat updates.
- Rider can **Share live location** on the ride page; position stored on the ride (`riderLocation`) and in `users/{uid}.location`; map updates via `onSnapshot`.
- **SOS** button: 10s countdown → writes to `sos_alerts` with GPS coordinates.
- **Fare helper**: `Price ≈ (distance × fuelPrice / mileage) × 0.5` per seat — see `lib/fare.ts`.

## Security note

`firestore.rules` in this repo is **simplified for learning**. Before a public launch, restrict writes (only owners, validated fields, booking rules) and review Firebase docs on security.

## License

Use and modify freely for learning and non-commercial demos.
