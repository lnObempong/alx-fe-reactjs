import { useState } from "react";

// A tiny fake API to simulate a server request (no internet needed)
function mockRegister(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Super simple "success" condition; tweak as you like
      if (payload.email && payload.password && payload.username) {
        resolve({ id: Date.now(), token: "mock-token-123", ...payload });
      } else {
        reject(new Error("Missing fields"));
      }
    }, 900);
  });
}

export default function RegistrationForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverState, setServerState] = useState({
    loading: false,
    success: null,
    message: "",
  });

  const validate = () => {
    const next = {};
    if (!form.username.trim()) next.username = "Username is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 6) next.password = "Min 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // clear a field’s error when user edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setServerState({ loading: true, success: null, message: "" });
    try {
      const result = await mockRegister(form);
      setServerState({
        loading: false,
        success: true,
        message: `Registered! User ID: ${result.id}`,
      });
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setServerState({
        loading: false,
        success: false,
        message: err.message || "Registration failed",
      });
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
      <h2>Registration (Controlled Components)</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="username">Username</label><br />
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="e.g. leocode"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.username && <small style={{ color: "crimson" }}>{errors.username}</small>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. you@example.com"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.email && <small style={{ color: "crimson" }}>{errors.email}</small>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="password">Password</label><br />
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Min 6 characters"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.password && <small style={{ color: "crimson" }}>{errors.password}</small>}
        </div>

        <button
          type="submit"
          disabled={serverState.loading}
          style={{ padding: "10px 14px", cursor: "pointer" }}
        >
          {serverState.loading ? "Submitting..." : "Register"}
        </button>
      </form>

      {serverState.message && (
        <p style={{ marginTop: 12, color: serverState.success ? "green" : "crimson" }}>
          {serverState.message}
        </p>
      )}
    </div>
  );
}
