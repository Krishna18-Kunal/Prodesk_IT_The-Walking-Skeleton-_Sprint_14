# Sprint 14 – The Walking Skeleton
## Track B: Full-Stack Authentication MVP

A full-stack authentication application built using React, Node.js, Express.js, MongoDB, Mongoose, bcryptjs, and JSON Web Tokens (JWT).

This project implements secure user registration, login, password hashing, JWT-based authentication, protected routes, and user session management.

---

## Project Overview

The main objective of this project is to develop a working authentication system where users can register, log in, and access protected resources only after successful authentication.

The application uses a React frontend and an Express.js backend connected to MongoDB Atlas.

---

## Features

- User Registration
- User Login
- Secure Password Hashing using bcryptjs
- JWT Token Generation
- JWT-Based Authentication Middleware
- Protected Dashboard
- Protected API Routes
- User Identity Verification
- Logout Functionality
- Automatic Redirect for Unauthenticated Users
- MongoDB Database Integration
- Duplicate Email Validation
- Password Length Validation

---

## Technology Stack

### Frontend
- React.js
- Vite
- React Router DOM
- JavaScript
- CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- CORS

### Development Tools
- Visual Studio Code
- Git & GitHub
- MongoDB Atlas
- Postman / Browser Developer Tools

---

## Project Structure

```text
Sprint14-Authentication-MVP/
│
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── requireAuth.js
│   │   │
│   │   ├── models/
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── task.routes.js
│   │   │
│   │   └── server.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── style.css
│   │
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── README.md
└── Prompts.md
```

---

## Created

### 1. Open Project Directory

```bash
cd Prodesk_IT_The-Walking-Skeleton-_Sprint_14
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory.

Add the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_at_least_32_characters
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

Replace the MongoDB URI and JWT secret with your own values.

**Never upload your `.env` file to GitHub.**

Start the backend server:

```bash
npm run dev
```

Backend URL:

http://localhost:5000

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

http://localhost:5173

---

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | /api/health | Check API status | Public |
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login user | Public |
| GET | /api/auth/me | Get authenticated user | Protected |
| GET | /api/tasks | Access protected task data | Protected |

### Registration Example

POST `/api/auth/register`

```json
{
  "name": "Krishna",
  "email": "krishna123@gmail.com",
  "password": "your_password"
}
```

### Login Example

POST `/api/auth/login`

```json
{
  "email": "krishna123@gmail.com",
  "password": "your_password"
}
```

### Protected API Request

Include the JWT token in the Authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Authentication Workflow

1. User enters registration details.
2. Backend validates the user information.
3. Password is hashed using bcryptjs.
4. User data is stored in MongoDB.
5. User logs in with registered credentials.
6. Backend verifies the password.
7. JWT token is generated.
8. Frontend stores the authentication token.
9. Protected routes verify the JWT.
10. Authenticated users can access protected resources.

---

## Security Implementation

- Passwords are stored as bcrypt hashes.
- JWT tokens are used for authentication.
- Protected APIs require a valid Bearer token.
- Invalid or expired tokens are rejected.
- Duplicate email registrations are prevented.
- Environment variables are used for sensitive configuration.

Note: This MVP uses browser localStorage for JWT persistence. HTTP-only cookie-based authentication is a possible future enhancement.

---

## Testing

The following functionality has been tested locally:

| Test Case | Result |
|---|---|
| User Registration | Passed |
| User Login | Passed |
| New User Registration | Passed |
| Password Hashing | Verified |
| JWT Token Generation | Passed |
| Protected Dashboard | Passed |
| Logout | Passed |
| Missing Token Request | 401 Unauthorized |
| Valid Token Request | 200 OK |

---

## Future Enhancements

- Forgot Password and Reset Password
- User Profile Management
- Refresh Token Mechanism
- Role-Based Access Control
- Email Verification
- HTTP-Only Cookie Authentication
- Production Deployment

---

## Repository Information

**Project:** Sprint 14 – The Walking Skeleton

**Track:** Track B – Full-Stack Authentication MVP


**Developer:** Krishna Kunal

---

## License

This project is developed for educational and learning purposes as part of Sprint 14 – The Walking Skeleton.
