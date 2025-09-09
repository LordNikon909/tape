import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Home from "./pages/Home";
import Trades from "./pages/Trades";
import Tapes from "./pages/Tapes";

export default function App() {
  // Initialize user from localStorage safely
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <main style={{ padding: "2rem" }}>
        <Routes>
          {/* Public home page */}
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/home" element={<Home user={user} setUser={setUser} />} />

          {/* Protected Tapes page */}
          <Route
            path="/tapes"
            element={user ? <Tapes user={user} setUser={setUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/trades"
            element={user ? <Trades user={user} /> : <Navigate to="/login" />}
          />

          {/* Login / Signup routes */}
          <Route
            path="/login"
            element={!user ? <LoginForm setUser={setUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignupForm setUser={setUser} /> : <Navigate to="/" />}
          />

          {/* Catch-all: redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}
