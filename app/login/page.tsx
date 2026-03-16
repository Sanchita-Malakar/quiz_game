"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Fraunces, DM_Sans } from "next/font/google";

// ─── Fonts (Fixed Loading) ───────────────────────────────────────────────────
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
  preload: false, // ✅ Fix: Disable preload
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: false, // ✅ Fix: Disable preload
});

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  // States
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ 1. HANDLE EMAIL VERIFICATION (Priority #1)
  const handleEmailVerification = useCallback(async () => {
    try {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      
      if (code && !verifying) {
        setVerifying(true);
        setError(null);
        
        const { data, error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );

        if (error) throw error;

        if (data?.session) {
          // Clear URL params and redirect
          url.searchParams.delete('code');
          window.history.replaceState({}, '', url.toString());
          router.push("/create");
          router.refresh();
          return true;
        }
      }
      return false;
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(`Verification failed: ${err.message}`);
      return false;
    } finally {
      setVerifying(false);
    }
  }, [supabase, verifying, router]);

  // ✅ 2. Hydration + Auto-verification
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setMounted(true);
    
    // Auto-verify if code present
    const code = searchParams.get('code');
    if (code) {
      handleEmailVerification();
    }
  }, [handleEmailVerification, searchParams]);

  // ✅ 3. Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = isSignUp
        ? await supabase.auth.signUp({
            email: email.toLowerCase().trim(),
            password,
            options: {
              emailRedirectTo: "https://quizgame19.vercel.app/login",
            },
          })
        : await supabase.auth.signInWithPassword({
            email: email.toLowerCase().trim(),
            password,
          });

      if (error) throw error;

      // Sign-up success → show verification message
      if (isSignUp && data.user) {
        setError(
          "✅ Check your email for verification link! " +
          "Click it, then return here to continue."
        );
        return;
      }

      // Sign-in success or already verified → redirect
      router.push("/create");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 4. Loading state (fixes React hydration errors)
  if (!mounted) {
    return (
      <div 
        style={{
          minHeight: '100vh',
          background: '#070711',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div 
          style={{
            width: 48,
            height: 48,
            border: '4px solid rgba(99, 102, 241, 0.2)',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --font-fraunces: ${fraunces.style.fontFamily};
          --font-dm-sans: ${dmSans.style.fontFamily};
        }
        
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          width: 100%;
          min-height: 100vh;
          background: #070711;
          font-family: var(--font-dm-sans, system-ui, -apple-system, sans-serif);
          color: #f1f5f9;
          overflow-x: hidden;
          line-height: 1.5;
        }

        /* Rest of your existing CSS (unchanged) */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: rgba(99,102,241,0.3); 
          border-radius: 99px; 
        }

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
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .header { text-align: center; margin-bottom: 32px; }
        .logo {
          font-family: var(--font-fraunces, serif);
          font-size: clamp(2rem, 5vw, 2.5rem);
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

        .form-group { margin-bottom: 24px; }
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
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
          font-family: inherit;
        }
        .input::placeholder { color: #334155; }
        .input:focus {
          border-color: rgba(129,140,248,0.5);
          background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .input:disabled { opacity: 0.5; cursor: not-allowed; }

        .message {
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 0.88rem;
          margin-bottom: 24px;
          animation: slideIn 0.3s ease;
        }
        .error-message {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #f87171;
        }
        .success-message {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          color: #86efac;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
          font-family: inherit;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(99,102,241,0.4);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .divider {
          display: flex; align-items: center;
          margin: 24px 0;
          color: #475569;
          font-size: 0.88rem;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06);
        }
        .divider span { padding: 0 12px; }

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
        .toggle-link span:hover { color: #a5b4fc; }

        @media (max-width: 600px) {
          .card { padding: 36px 24px; }
          .logo { font-size: 2rem !important; }
        }
      `}</style>

      {/* Background */}
      <div className="bg-wrap">
        <div className="bg-mesh" />
        <div className="bg-grid" />
      </div>

      {/* Main Content */}
      <div className="page">
        <div className="card">
          <div className="header">
            <div className="logo">KnowMe?</div>
            <p className="subtitle">
              {isSignUp ? "Create your account" : "Welcome back"}
            </p>
          </div>

          {/* Messages */}
          {searchParams.get('code') && !error && !verifying && (
            <div className="message success-message">
              ✅ Email verified successfully!
            </div>
          )}
          {error && (
            <div className="message error-message">{error}</div>
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
                disabled={loading || verifying}
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
                disabled={loading || verifying}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading || verifying}
              className="submit-btn"
            >
              {verifying ? "Verifying..." : loading ? "Processing..." : 
               isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="toggle-link">
            {isSignUp ? "Already have an account?" : "Don't have one?"}{" "}
            <span onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}