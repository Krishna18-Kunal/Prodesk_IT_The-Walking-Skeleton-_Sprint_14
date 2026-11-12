# Sprint 14 — Walking Skeleton (Track B: Full Stack)

A minimal React + Express + MongoDB authentication MVP:
- Register with name, email, password
- Passwords hashed with `bcryptjs` before saving
- Login returns a signed JWT
- Protected `/api/auth/me` and `/api/tasks` endpoints
- React login/register/dashboard routes; dashboard redirects to login without a valid token

## Requirements
- Node.js 18+ (20 LTS recommended)
- MongoDB local installation OR MongoDB Atlas connection string

## 1. Configure the backend

Open CMD in this folder:

```bat
cd backend
copy .env.example .env
notepad .env
```

Set `MONGO_URI` to your MongoDB connection string and replace `JWT_SECRET` with a long random secret. Example local MongoDB URI:

`mongodb://127.0.0.1:27017/sprint14_auth`

Save the file. Do not upload `.env` to GitHub.

## 2. Start backend

```bat
cd backend
npm install
npm run dev
```

Expected message: `MongoDB connected` and `API running on http://localhost:5000`.

Test in browser: `http://localhost:5000/api/health`

## 3. Start frontend (a second CMD window)

From the project root:

```bat
cd frontend
copy .env.example .env
npm install
npm run dev
```

Open the Vite URL shown, normally `http://localhost:5173`.

## 4. Test the MVP

1. Open `http://localhost:5173/register`.
2. Register with a name, email and password (at least 8 characters).
3. You should reach `/dashboard`, which displays your name, email and MongoDB user ID.
4. Click Logout.
5. Try opening `http://localhost:5173/dashboard` directly. It should redirect to `/login`.
6. Log in using the same email and password. You should return to the dashboard.
7. Optional API test: use Postman to send `GET http://localhost:5000/api/tasks` with header:
   `Authorization: Bearer YOUR_TOKEN`

## 5. Prove password hashing (QA demo)

In MongoDB Compass or Atlas:
- Open database `sprint14_auth`
- Open collection `users`
- Find the registered user by email
- The `password` field must look like a bcrypt hash (starts with `$2a$` or `$2b$`), not the password you typed.

Never show or share your JWT secret or real passwords in your demo.

## What you must change
1. `backend/.env`: set your own `MONGO_URI` and a strong unique `JWT_SECRET`.
2. Optional: change `frontend/.env` only if backend is not running at `http://localhost:5000`.
3. For deployment, set the same variables in Render (backend) and `VITE_API_URL` in Vercel (frontend). Update backend `CLIENT_URL` to your deployed frontend URL.

## Important
This starter intentionally stores the JWT in `localStorage` because Sprint 14's brief explicitly requests it. For a production system, prefer secure, HttpOnly, SameSite cookies and add rate limiting, email verification, password reset and HTTPS.
