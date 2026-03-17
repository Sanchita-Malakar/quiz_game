"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Fraunces, DM_Sans } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: false,
});

type PageState =
  | "idle"
  | "loading"
  | "verifying"
  | "verified"
  | "awaiting_email"
  | "error";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [pageState, setPageState] = useState<PageState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ─── CASE 1: Handle ?code= (PKCE flow) ─────────────────────────────────
  const handleCodeExchange = useCallback(async (code: string) => {
    setPageState("verifying");
    setErrorMsg(null);
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;
      if (data?.session) {
        setPageState("verified");
        // Small delay so user sees the success message
        setTimeout(() => router.push("/create"), 1500);
      } else {
        throw new Error("No session returned after code exchange.");
      }
    } catch (err: any) {
      setPageState("error");
      setErrorMsg(`Verification failed: ${err.message}`);
    }
  }, [supabase, router]);

  // ─── CASE 2: Handle #access_token= (implicit flow) ──────────────────────
  const handleHashTokens = useCallback(async () => {
    // Hash is only available in the browser
    const hash = window.location.hash;
    if (!hash) return false;

    const params = new URLSearchParams(hash.replace("#", ""));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type"); // "signup" or "recovery"

    if (!accessToken || !refreshToken) return false;

    setPageState("verifying");
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      if (error) throw error;
      if (data?.session) {
        // Clear the hash from the URL so it's not re-processed on refresh
        window.history.replaceState(null, "", window.location.pathname);
        setPageState("verified");
        setTimeout(() => router.push("/create"), 1500);
        return true;
      }
    } catch (err: any) {
      setPageState("error");
      setErrorMsg(`Verification failed: ${err.message}`);
    }
    return false;
  }, [supabase, router]);

  // ─── CASE 3: Already logged in — skip login entirely ────────────────────
  const checkExistingSession = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push("/create");
      return true;
    }
    return false;
  }, [supabase, router]);

  // ─── Mount: run all checks in order ─────────────────────────────────────
  useEffect(() => {
    setMounted(true);

    const run = async () => {
      // Priority 1: ?code= in URL (PKCE)
      const code = searchParams.get("code");
      if (code) {
        await handleCodeExchange(code);
        return;
      }

      // Priority 2: #access_token= in hash (implicit)
      const handledHash = await handleHashTokens();
      if (handledHash) return;

      // Priority 3: Already has a valid session
      await checkExistingSession();
    };

    run();
  }, []); // ✅ intentionally empty — runs once on mount

  // ─── Form submit ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPageState("loading");
    setErrorMsg(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.toLowerCase().trim(),
          password,
          options: {
            // ✅ Must match an "allowed redirect URL" in your Supabase dashboard
            emailRedirectTo: `${window.location.origin}/login`,
          },
        });
        if (error) throw error;

        // If session exists immediately → email confirmation is DISABLED in dashboard
        if (data.session) {
          setPageState("verified");
          setTimeout(() => router.push("/create"), 1500);
          return;
        }

        // Normal case: email confirmation required
        setPageState("awaiting_email");
        return;
      }

      // Sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });
      if (error) throw error;
      if (data.session) {
        router.push("/create");
      }
    } catch (err: any) {
      setPageState("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  // ─── Loading skeleton ────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div style={{
        minHeight: "100vh", background: "#070711",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 48, height: 48,
          border: "4px solid rgba(99,102,241,0.2)",
          borderTop: "4px solid #6366f1",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const isLoading = pageState === "loading" || pageState === "verifying";

  return (
    <>
      <style jsx global>{`
        :root {
          --font-fraunces: ${fraunces.style.fontFamily};
          --font-dm-sans: ${dmSans.style.fontFamily};
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          width: 100%; min-height: 100vh; background: #070711;
          font-family: var(--font-dm-sans, system-ui, -apple-system, sans-serif);
          color: #f1f5f9; overflow-x: hidden; line-height: 1.5;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 99px; }

        .bg-wrap { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .bg-mesh {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 10% 10%, rgba(99,102,241,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 90%, rgba(139,92,246,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(236,72,153,0.06) 0%, transparent 60%),
            linear-gradient(160deg, #07091a 0%, #0d0f24 50%, #070711 100%);
        }
        .bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .page {
          position: relative; z-index: 1; min-height: 100vh;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 24px;
        }
        .card {
          width: 100%; max-width: 420px;
          background: rgba(15,17,35,0.85);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 24px; padding: 48px 40px;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 0 1px rgba(99,102,241,0.08), 0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.08);
          animation: cardIn 0.5s ease both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .header { text-align: center; margin-bottom: 32px; }
        .logo {
          font-family: var(--font-fraunces, serif); font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 900;
          background: linear-gradient(120deg, #818cf8, #c084fc);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 8px;
        }
        .subtitle { font-size: 0.95rem; color: #475569; font-weight: 300; }

        /* ── Status banner ── */
        .banner {
          padding: 16px 18px; border-radius: 14px; font-size: 0.9rem;
          margin-bottom: 24px; animation: slideIn 0.3s ease; line-height: 1.5;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .banner-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #f87171; }
        .banner-success { background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #6ee7b7; }
        .banner-info { background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); color: #a5b4fc; }
        .banner-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; }

        /* ── Verifying overlay ── */
        .verifying-state {
          text-align: center; padding: 20px 0;
        }
        .spinner-lg {
          width: 52px; height: 52px; margin: 0 auto 20px;
          border: 4px solid rgba(99,102,241,0.2);
          border-top-color: #818cf8; border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .verifying-title {
          font-family: var(--font-fraunces, serif); font-size: 1.3rem;
          font-weight: 700; color: #f1f5f9; margin-bottom: 8px;
        }
        .verifying-sub { font-size: 0.85rem; color: #475569; }

        /* ── Verified state ── */
        .verified-state { text-align: center; padding: 20px 0; }
        .check-circle {
          width: 64px; height: 64px; margin: 0 auto 20px;
          background: rgba(52,211,153,0.15); border: 2px solid rgba(52,211,153,0.4);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; animation: popIn 0.4s ease;
        }
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .verified-title {
          font-family: var(--font-fraunces, serif); font-size: 1.4rem;
          font-weight: 900; color: #6ee7b7; margin-bottom: 8px;
        }
        .verified-sub { font-size: 0.85rem; color: #475569; }

        /* ── Awaiting email state ── */
        .email-state { text-align: center; padding: 10px 0; }
        .email-icon { font-size: 3rem; margin-bottom: 16px; }
        .email-title {
          font-family: var(--font-fraunces, serif); font-size: 1.3rem;
          font-weight: 900; color: #f1f5f9; margin-bottom: 10px;
        }
        .email-sub { font-size: 0.85rem; color: #64748b; line-height: 1.6; }
        .email-sub strong { color: #a5b4fc; }
        .resend-btn {
          margin-top: 20px; padding: 10px 20px; border-radius: 10px;
          border: 1px solid rgba(99,102,241,0.3); background: transparent;
          color: #818cf8; font-family: inherit; font-size: 0.85rem;
          cursor: pointer; transition: all 0.2s;
        }
        .resend-btn:hover { background: rgba(99,102,241,0.1); }

        /* ── Form ── */
        .form-group { margin-bottom: 24px; }
        .label {
          display: block; font-size: 0.72rem; font-weight: 600; color: #64748b;
          margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;
        }
        .input {
          width: 100%; padding: 14px 18px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09); border-radius: 14px;
          color: #f1f5f9; font-size: 1rem; outline: none; transition: all 0.2s; font-family: inherit;
        }
        .input::placeholder { color: #334155; }
        .input:focus {
          border-color: rgba(129,140,248,0.5); background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .input:disabled { opacity: 0.5; cursor: not-allowed; }
        .submit-btn {
          width: 100%; padding: 16px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white; font-size: 1rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(99,102,241,0.4); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .divider {
          display: flex; align-items: center; margin: 24px 0;
          color: #475569; font-size: 0.88rem;
        }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
        .divider span { padding: 0 12px; }
        .toggle-link { text-align: center; color: #475569; font-size: 0.88rem; margin-top: 24px; }
        .toggle-link span { color: #818cf8; cursor: pointer; font-weight: 500; transition: color 0.2s; }
        .toggle-link span:hover { color: #a5b4fc; }
        @media (max-width: 600px) {
          .card { padding: 36px 24px; }
          .logo { font-size: 2rem !important; }
        }
      `}</style>

      <div className="bg-wrap">
        <div className="bg-mesh" />
        <div className="bg-grid" />
      </div>

      <div className="page">
        <div className="card">
          <div className="header">
            <div className="logo">KnowMe?</div>
            <p className="subtitle">
              {pageState === "awaiting_email"
                ? "Check your inbox"
                : isSignUp ? "Create your account" : "Welcome back"}
            </p>
          </div>

          {/* ── VERIFYING state ── */}
          {pageState === "verifying" && (
            <div className="verifying-state">
              <div className="spinner-lg" />
              <div className="verifying-title">Verifying your email…</div>
              <div className="verifying-sub">Just a moment, setting up your account.</div>
            </div>
          )}

          {/* ── VERIFIED state ── */}
          {pageState === "verified" && (
            <div className="verified-state">
              <div className="check-circle">✓</div>
              <div className="verified-title">Email Verified!</div>
              <div className="verified-sub">Redirecting you to the app…</div>
            </div>
          )}

          {/* ── AWAITING EMAIL state ── */}
          {pageState === "awaiting_email" && (
            <div className="email-state">
              <div className="email-icon">📬</div>
              <div className="email-title">Verify your email</div>
              <div className="email-sub">
                We sent a confirmation link to<br />
                <strong>{email}</strong><br /><br />
                Click the link in that email — it'll bring you right back here
                and log you in automatically.
              </div>
              <button
                className="resend-btn"
                onClick={async () => {
                  await supabase.auth.resend({ type: "signup", email });
                  alert("Verification email resent!");
                }}
              >
                Resend email
              </button>
            </div>
          )}

          {/* ── ERROR banner ── */}
          {pageState === "error" && errorMsg && (
            <div className="banner banner-error">
              <div className="banner-title">⚠ Something went wrong</div>
              {errorMsg}
            </div>
          )}

          {/* ── FORM (hide during verifying / verified / awaiting_email) ── */}
          {pageState !== "verifying" &&
           pageState !== "verified" &&
           pageState !== "awaiting_email" && (
            <>
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
                <button type="submit" disabled={isLoading} className="submit-btn">
                  {isLoading
                    ? "Processing…"
                    : isSignUp ? "Create Account" : "Sign In"}
                </button>
              </form>

              <div className="divider"><span>or</span></div>

              <div className="toggle-link">
                {isSignUp ? "Already have an account?" : "Don't have one?"}{" "}
                <span onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(null); setPageState("idle"); }}>
                  {isSignUp ? "Sign In" : "Sign Up"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}