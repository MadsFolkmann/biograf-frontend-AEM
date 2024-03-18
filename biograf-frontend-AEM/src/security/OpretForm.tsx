import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { User } from "../services/authFacade";

const EMPTY_USER: User = { username: "", password: "" };

export default function OpretForm() {
  const [user, setUser] = useState(EMPTY_USER);
  const navigate = useNavigate();
  const auth = useAuth();
  const [err, setErr] = useState(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErr(null);
    try {
      await auth.signUp(user);
      navigate("/login"); // Redirect to login page after successful sign up
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
        </div>
        <div className="signup-form-group">
          <button type="submit">Sign Up</button>
        </div>
        {err && <div className="signup-form-group error">{err}</div>}
      </form>
    </div>
  );
}
