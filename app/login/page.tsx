// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Fraunces, DM_Sans } from "next/font/google";

// ─── Font Configuration ───────────────────────────────────────────────────────

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = isSignUp
        ? await supabase.auth.signUp({
            email,
            password,
          })
        : await supabase.auth.signInWithPassword({
            email,
            password,
          });

      if (error) throw error;

      // ✅ Success - redirect to create page
      router.push("/create");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${fraunces.className} ${dmSans.className}`}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          width: 100%;
          min-height: 100vh;
          background: #070711;
          font-family: var(--font-dm-sans), sans-serif;
          overflow-x: hidden;
          color: #f1f5f9;
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 99px; }

        /* ── Background ── */
        .bg-wrap {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .bg-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 10% 10%, rgba(99,102,241,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 90%, rgba(139,92,246,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(236,72,153,0.06) 0%, transparent 60%),
            linear-gradient(160deg, #07091a 0%, #0d0f24 50%, #070711 100%);
        }
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* ── Page ── */
        .page {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        /* ── Card ── */
        .card {
          width: 100%;
          max-width: 420px;
          background: rgba(15,17,35,0.85);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 24px;
          padding: 48px 40px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.08),
            0 40px 80px rgba(0,0,0,0.5),
            0 0 60px rgba(99,102,241,0.08);
          animation: cardIn 0.5s ease both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Header ── */
        .header {
          text-align: center;
          margin-bottom: 32px;
        }
        .logo {
          font-family: var(--font-fraunces), serif;
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(120deg, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        .subtitle {
          font-size: 0.95rem;
          color: #475569;
          font-weight: 300;
        }

        /* ── Form ── */
        .form-group {
          margin-bottom: 24px;
        }
        .label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          color: #f1f5f9;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input::placeholder { color: #334155; font-weight: 300; }
        .input:focus {
          border-color: rgba(129,140,248,0.5);
          background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 0 20px rgba(99,102,241,0.1);
        }

        /* ── Error Message ── */
        .error-message {
          padding: 12px 16px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 10px;
          color: #f87171;
          font-size: 0.88rem;
          margin-bottom: 24px;
          animation: shake 0.5s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* ── Submit Button ── */
        .submit-btn {
          width: 100%;
          padding: 16px 24px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #9333ea);
          color: #fff;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          position: relative;
          overflow: hidden;
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
        .submit-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(99,102,241,0.55);
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #6366f1, #a855f7, #c084fc);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .submit-btn:not(:disabled):hover::before { opacity: 1; }
        .submit-btn span { position: relative; z-index: 1; }

        /* ── Divider ── */
        .divider {
          display: flex;
          align-items: center;
          margin: 24px 0;
          color: #475569;
          font-size: 0.88rem;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }
        .divider span {
          padding: 0 12px;
        }

        /* ── Toggle Link ── */
        .toggle-link {
          text-align: center;
          color: #475569;
          font-size: 0.88rem;
          margin-top: 24px;
        }
        .toggle-link span {
          color: #818cf8;
          cursor: pointer;
          font-weight: 500;
          transition: color 0.2s;
        }
        .toggle-link span:hover {
          color: #a5b4fc;
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .card { padding: 36px 24px; border-radius: 20px; }
          .logo { font-size: 2rem; }
        }
      `}</style>

      {/* Background */}
      <div className="bg-wrap">
        <div className="bg-mesh" />
        <div className="bg-grid" />
      </div>

      <div className="page">
        <div className="card">
          {/* Header */}
          <div className="header">
            <div className="logo">KnowMe?</div>
            <p className="subtitle">
              {isSignUp ? "Create your account" : "Welcome back"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              <span>{loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Toggle Link */}
          <div className="toggle-link">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}