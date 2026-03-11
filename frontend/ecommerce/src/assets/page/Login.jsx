import { useState } from "react";
import "./Login.css";

const API = "http://localhost:3000/api";

export default function Login({ onLogin, onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const handle = async () => {
    setLoading(true); setMsg(null);
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMsg({ type: "success", text: "✓ Welcome back!" });
      setTimeout(() => onLogin({ email: form.email }), 900);
    } catch (e) {
      setMsg({ type: "error", text: e.message || "Login failed" });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="login-wrap">
      
        <div className="login-left">
          <div className="brand-tag">◈ LUX<span>E</span></div>
          <div className="orb1 login-orb" />
          <div className="orb2 login-orb" />
          <div className="left-quote">
            <h2>Discover<br /><span>extraordinary</span><br />products.</h2>
            <p>Premium shopping experience, curated just for you.</p>
          </div>
        </div>

        <div className="login-right">
          <div className="form-box">
            <div className="form-title">Sign in</div>
            <div className="form-sub">Enter your credentials to access your account</div>

            {msg && <div className={`alert ${msg.type === "error" ? "err" : "ok"}`}>{msg.text}</div>}

            <div className={`field ${focused === "email" ? "active" : ""}`}>
              <label>Email Address</label>
              <input
                type="email" placeholder="you@example.com" value={form.email}
                onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <div className="field-line" />
            </div>

            <div className={`field ${focused === "password" ? "active" : ""}`}>
              <label>Password</label>
              <input
                type="password" placeholder="••••••••" value={form.password}
                onFocus={() => setFocused("password")} onBlur={() => setFocused("")}
                onChange={e => setForm({ ...form, password: e.target.value })}
                onKeyDown={e => e.key === "Enter" && handle()}
              />
              <div className="field-line" />
            </div>

            <button className="submit-btn" onClick={handle} disabled={loading}>
              {loading ? "Authenticating..." : "Sign In →"}
            </button>

            <div className="switch-text">
              New here? <a onClick={onSwitch}>Create an account</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}