import { useState } from "react";

function mockRegister(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.email && payload.password && payload.username) {
        resolve({ id: Date.now(), token: "mock-token-123", ...payload });
      } else {
        reject(new Error("Missing fields"));
      }
    }, 900);
  });
}

export default function RegistrationForm() {
  // separate states for each field
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverState, setServerState] = useState({
    loading: false,
    success: null,
    message: "",
  });

  const validate = () => {
    const next = {};
    if (!username.trim()) next.username = "Username is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Min 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setServerState({ loading: true, success: null, message: "" });
    try {
      const result = await mockRegister({ username, email, password });
      setServerState({
        loading: false,
        success: true,
        message: `Registered! User ID: ${result.id}`,
      });
      // reset fields
      setUsername("");
      setEmail("");
      setPassword("");
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
            value={username}   {/* ✅ explicit controlled binding */}
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}   {/* ✅ explicit controlled binding */}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}   {/* ✅ explicit controlled binding */}
            onChange={(e) => setPassword(e.target.value)}
