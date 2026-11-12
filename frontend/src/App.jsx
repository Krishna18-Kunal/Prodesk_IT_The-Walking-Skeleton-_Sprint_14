
import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";

import { apiRequest } from "./api";

// ==============================
// Authentication Form
// ==============================

function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();

    setError("");
    setBusy(true);

    try {
      const data = await apiRequest(`/api/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(form)
      });

      // Check API response
      if (!data.token || !data.user) {
        throw new Error(
          "Authentication response is missing token or user."
        );
      }

      // Save authentication details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to dashboard
      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="panel">
      <h1>{isRegister ? "Create account" : "Login"}</h1>

      <p>
        {isRegister
          ? "Register to access your dashboard."
          : "Sign in to continue."}
      </p>

      <form onSubmit={submit}>
        {isRegister && (
          <label>
            Full name

            <input
              type="text"
              required
              maxLength="80"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </label>
        )}

        <label>
          Email

          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </label>

        <label>
          Password

          <input
            type="password"
            required
            minLength="8"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </label>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy}>
          {busy
            ? "Please wait..."
            : isRegister
            ? "Register"
            : "Login"}
        </button>
      </form>

      <p>
        {isRegister ? "Already registered?" : "New here?"}{" "}

        <Link to={isRegister ? "/login" : "/register"}>
          {isRegister ? "Login" : "Create account"}
        </Link>
      </p>
    </main>
  );
}

// ==============================
// Protected Dashboard
// ==============================

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function verifySession() {
      try {
        const data = await apiRequest("/api/auth/me");

        if (!data.user) {
          throw new Error("User verification failed.");
        }

        if (active) {
          setUser(data.user);

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

      } catch (err) {
        if (active) {
          setError(err.message || "Session expired.");

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", { replace: true });
        }
      }
    }

    verifySession();

    return () => {
      active = false;
    };
  }, [navigate]);

  // Logout
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }

  if (error) {
    return (
      <main className="panel">
        <p>Session expired. Redirecting to login...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="panel">
        <p>Verifying session...</p>
      </main>
    );
  }

  return (
    <main className="panel">
      <h1>Dashboard</h1>

      <p>
        Authentication successful.
        Protected route is working.
      </p>

      <dl>
        <dt>Name</dt>
        <dd>{user.name}</dd>

        <dt>Email</dt>
        <dd>{user.email}</dd>

        <dt>UID</dt>
        <dd className="uid">{user.uid}</dd>
      </dl>

      <button onClick={logout}>
        Logout
      </button>
    </main>
  );
}

// ==============================
// Main Application
// ==============================

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="app">

      <header>
        <strong>Sprint 14 MVP</strong>
        <span>Walking Skeleton · Track B</span>
      </header>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to={token ? "/dashboard" : "/login"}
              replace
            />
          }
        />

        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/dashboard" replace />
              : <AuthForm mode="login" />
          }
        />

        <Route
          path="/register"
          element={
            token
              ? <Navigate to="/dashboard" replace />
              : <AuthForm mode="register" />
          }
        />

        <Route
          path="/dashboard"
          element={
            token
              ? <Dashboard />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </div>
  );
}

export default App;
