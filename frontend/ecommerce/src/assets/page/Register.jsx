import { useState } from "react";
import "./Register.css";

const API = "http://localhost:3000/api";

export default function Register({ onSwitch }) {
  const [form, setForm]       = useState({ username: "", email: "", password: "" });
  const [msg, setMsg]         = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep]       = useState(0);

  const handle = async () => {
    if (!form.username || !form.email || !form.password) {
      setMsg({ type: "error", text: "Please fill in all fields." });
      return;
    }
    setLoading(true); setMsg(null);
    try {
      const res  = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStep(1);
    } catch (e) {
      setMsg({ type: "error", text: e.message || "Registration failed" });
    }
    setLoading(false);
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8)           s++;
    if (/[A-Z]/.test(p))         s++;
    if (/[0-9]/.test(p))         s++;
    if (/[^A-Za-z0-9]/.test(p))  s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"][strength];

  if (step === 1) return (
    <div className="success-wrap">
      <div className="success-box">
        <div className="success-icon">✓</div>
        <h2>Account Created!</h2>
        <p>Welcome aboard, {form.username}. You're all set.</p>
        <button className="go-login" onClick={onSwitch}>Go to Login</button>
      </div>
    </div>
  );

  return (
    <div className="reg-wrap">
      <div className="reg-form-side">
        <div className="form-inner">
          <div className="reg-title">Create account</div>
          <div className="reg-sub">Join thousands of happy shoppers today</div>

          {msg && <div className="alert err">{msg.text}</div>}

          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="khushi kabra"
              value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Min. 8 characters"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handle()} />
            {form.password && (
              <>
                <div className="strength-bar">
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ background: i <= strength ? strengthColor : "#e8e0d8" }} />
                  ))}
                </div>
                <div className="strength-label" style={{ color: strengthColor }}>{strengthLabel}</div>
              </>
            )}
          </div>

          <button className="reg-btn" onClick={handle} disabled={loading}>
            {loading ? "Creating account..." : "Create Account →"}
          </button>

          <div className="switch-row">
            Already have an account? <a onClick={onSwitch}>Sign in</a>
          </div>
        </div>
      </div>

      <div className="reg-deco-side">
        <div className="deco-circle dc1" />
        <div className="deco-circle dc2" />
        <div className="deco-circle dc3" />
        <div className="deco-content">
          <div className="deco-brand">◈ LUX<span>E</span></div>
          <ul className="deco-steps">
            <li className="done"><span>✓</span> Choose your username</li>
            <li className="done"><span>✓</span> Add your email</li>
            <li className="done"><span>✓</span> Set a strong password</li>
            <li><span>4</span> Start shopping</li>
          </ul>
        </div>
      </div>
    </div>
  );
}