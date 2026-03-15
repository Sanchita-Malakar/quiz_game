"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams(); // ✅ Get URL params
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [mounted, setMounted] = useState(false); // ✅ Hydration fix

  // ✅ 1. HANDLE EMAIL VERIFICATION (Main Fix!)
  useEffect(() => {
    if (!mounted) return; // Wait for hydration

    const handleVerification = async () => {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code'); // Get verification code

        if (code) {
          setLoading(true);
          const { data, error } = await supabase.auth.exchangeCodeForSession(
            window.location.href
          );

          if (error) throw error;

          if (data?.session) {
            // ✅ Success! Redirect to create page
            router.push("/create");
            router.refresh(); // Force refresh
          }
        }
      } catch (err: any) {
        console.error('Verification failed:', err);
        setError('Verification failed. Please try signing in again.');
      } finally {
        setLoading(false);
      }
    };

    handleVerification();
  }, [mounted, router, supabase]);

  // ✅ 2. Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ 3. Updated form handler with email verification
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      
      if (isSignUp) {
        // Sign up with email verification
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`, // ✅ Redirect back here after verification
          },
        });
      } else {
        // Sign in
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (result.error) throw result.error;

      // ✅ Check if user needs verification
      if (isSignUp && result.data.user?.identities?.length === 0) {
        setError(
          "Check your email for verification link! " +
          "Click the link, then return here to continue."
        );
        return;
      }

      // ✅ Success - redirect
      router.push("/create");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 4. Don't render until mounted (fixes React errors #418/#423)
  if (!mounted) {
    return (
      <div className={`${fraunces.className} ${dmSans.className}`}>
        <style>{`html, body { background: #070711; min-height: 100vh; }`}</style>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid rgba(99,102,241,0.3)', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ✅ Your existing JSX (unchanged)
  return (
    <div className={`${fraunces.className} ${dmSans.className}`}>
      {/* Your existing styles unchanged */}
      <style>{`
        /* ... your existing CSS ... */
        .success-message {
          padding: 12px 16px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          border-radius: 10px;
          color: #86efac;
          font-size: 0.88rem;
          margin-bottom: 24px;
          text-align: center;
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

          {/* Success Message for Verification */}
          {searchParams.get('code') && !error && (
            <div className="success-message">
              ✅ Email verified! Redirecting...
            </div>
          )}

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
                disabled={loading}
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
                disabled={loading}
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