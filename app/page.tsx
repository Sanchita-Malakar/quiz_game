"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense, use } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  alpha: number;
}

interface Stat {
  value: string;
  label: string;
}

interface Feature {
  id: string;
  icon: string;
  title: string;
  desc: string;
  action: string | null;
  route: string | null;
  accent: string;
}

interface Testimonial {
  text: string;
  name: string;
  handle: string;
  emoji: string;
  bg: string;
  c: string;
}

// Separate component that uses useSearchParams
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [gameId, setGameId] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [recentGames, setRecentGames] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ✅ FIX: Load recent games from localStorage in useEffect
  useEffect(() => {
    const saved = localStorage.getItem("recentGames");
    if (saved) {
      try {
        setRecentGames(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent games:", e);
      }
    }
  }, []);

  // Save recent game to localStorage
  const saveRecentGame = (gameId: string) => {
    const updated = [gameId, ...recentGames.filter(g => g !== gameId)].slice(0, 5);
    setRecentGames(updated);
    localStorage.setItem("recentGames", JSON.stringify(updated));
  };

  // Remove game from recent list
  const removeRecentGame = (gameId: string) => {
    const updated = recentGames.filter(g => g !== gameId);
    setRecentGames(updated);
    localStorage.setItem("recentGames", JSON.stringify(updated));
  };

  useEffect(() => {
    setMounted(true);

    // Pre-fill gameId from URL search params
    const urlGameId = searchParams.get("gameId") || searchParams.get("game") || searchParams.get("id");
    if (urlGameId) {
      setGameId(urlGameId.toUpperCase());
    }

    // ✅ FIX: Initialize canvas in useEffect (client-side only)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [searchParams]);

  // Determine if a gameId was provided via URL
  const urlGameId = searchParams.get("gameId") || searchParams.get("game") || searchParams.get("id");
  const isPreFilled = !!urlGameId;

  // Game ID validation
  const validateGameId = (id: string): boolean => {
    return /^[A-Z0-9-]{3,20}$/.test(id);
  };

  const stats: Stat[] = [
    { value: "Aiming...2M+", label: "Quizzes to be Played" },
    { value: "wishing...500K", label: "..to be Creators" },
    { value: "98%", label: "Fun Guaranteed" },
  ];

  const features: Feature[] = [
    {
      id: "create",
      icon: "✦",
      title: "Build Your Quiz",
      desc: "Craft questions as your wish. Add your personality, your stories, your quirks.",
      action: "Start Creating →",
      route: "/create",
      accent: "#a78bfa",
    },
    {
      id: "play",
      icon: "◈",
      title: "Challenge Your Friends",
      desc: "Share your Game ID and watch the magic unfold. Who knows you best? Time to find out.",
      action: null,
      route: null,
      accent: "#f472b6",
    },
    {
      id: "discover",
      icon: "◉",
      title: "Discover Results",
      desc: "Get a ranked leaderboard of who knows you best. The scores don't lie.",
      action: null,
      route: null,
      accent: "#34d399",
    },
  ];

  const testimonials: Testimonial[] = [
    { text: "My best friend scored 9/10. I cried happy tears. Highly recommend.", name: "Priya S.", handle: "@priya_creates", emoji: "🌸", bg: "#7c3aed22", c: "#a78bfa" },
    { text: "Found out my brother knows nothing about me. Now I have proof.", name: "Arjun M.", handle: "@arjunm_dev", emoji: "🧑‍💻", bg: "#ec489922", c: "#f472b6" },
    { text: "Used this at my birthday party. The chaos was immaculate. 10/10.", name: "Tanisha K.", handle: "@tanisha.jpg", emoji: "🎉", bg: "#34d39922", c: "#34d399" },
    { text: "The leaderboard feature is SO satisfying. Friendship confirmed.", name: "Rohan B.", handle: "@rohanbeats", emoji: "🎧", bg: "#fb923c22", c: "#fb923c" },
    { text: "I made my whole office do this. HR wasn't mad. Results were funny.", name: "Neha P.", handle: "@nehadesigns", emoji: "✨", bg: "#7c3aed22", c: "#a78bfa" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          width: 100%;
          background: #060612;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        #__next, main {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page {
          min-height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #f8f8ff;
        }

        canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* Radial glow blobs */
        .blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(109,40,217,0.25), transparent 70%);
          top: -100px; left: -100px;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%);
          bottom: 0; right: -80px;
        }
        .blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(52,211,153,0.12), transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }

        .content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* NAV */
        .nav {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 0 0;
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #a78bfa;
        }
        .nav-badge {
          background: rgba(167,139,250,0.12);
          border: 1px solid rgba(167,139,250,0.25);
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.75rem;
          color: #c4b5fd;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* HERO */
        .hero {
          margin-top: 64px;
          text-align: center;
          max-width: 720px;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(167,139,250,0.1);
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 0.78rem;
          color: #c4b5fd;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 28px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards;
        }
        .hero-eyebrow .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 7vw, 5.2rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.1s forwards;
        }
        .hero-title .gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #fb923c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 1.05rem;
          color: #94a3b8;
          font-weight: 300;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 48px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.2s forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* CTA BOX */
                .cta-box {
          width: 100%;
          max-width: 480px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.3s forwards;
        }
        .cta-create {
          width: 100%;
          padding: 16px 24px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          border: none;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.02em;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 30px rgba(124,58,237,0.35);
          margin-bottom: 16px;
          margin-left: 27%;
        }
        .cta-create::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cta-create:hover { transform: translateY(-2px); box-shadow: 0 8px 40px rgba(124,58,237,0.5); }
        .cta-create:hover::before { opacity: 1; }
        .cta-create span { position: relative; z-index: 1; }

        .divider {
          margin-left: 50%;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }
        .divider-text {
          font-size: 0.75rem;
          color: #475569;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .play-row {
          display: flex;
          gap: 10px;
        }
        .play-input {
          margin-left: 45%;
          flex: 1;
          padding: 14px 18px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #f8f8ff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .play-input::placeholder { color: #475569; }
        .play-input:focus {
          border-color: rgba(167,139,250,0.5);
          background: rgba(167,139,250,0.06);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.1);
        }
        .play-input.prefilled {
          border-color: rgba(52,211,153,0.4);
          background: rgba(52,211,153,0.06);
          color: #34d399;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: default;
        }
        .play-btn {
          padding: 14px 22px;
          border-radius: 12px;
          background: rgba(52,211,153,0.15);
          border: 1px solid rgba(52,211,153,0.3);
          color: #34d399;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .play-btn:hover {
          background: rgba(52,211,153,0.25);
          border-color: rgba(52,211,153,0.6);
          transform: translateY(-1px);
        }
        .play-btn.prefilled {
          background: rgba(52,211,153,0.2);
          border-color: rgba(52,211,153,0.5);
          box-shadow: 0 0 20px rgba(52,211,153,0.2);
        }
        .play-btn.prefilled:hover {
          background: rgba(52,211,153,0.35);
          border-color: rgba(52,211,153,0.8);
          box-shadow: 0 0 30px rgba(52,211,153,0.35);
          transform: translateY(-2px);
        }
        .prefill-hint {
          margin-top: 8px;
          font-size: 0.75rem;
          color: #34d399;
          opacity: 0.7;
          text-align: center;
          letter-spacing: 0.03em;
        }
        .recent-games {
          margin-top: 16px;
          text-align: center;
          opacity: 0;
          animation: fadeUp 0.4s ease 0.4s forwards;
        }
        .recent-games-title {
          font-size: 0.75rem;
          color: #475569;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }
        .recent-games-list {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .recent-game-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(167,139,250,0.1);
          border: 1px solid rgba(167,139,250,0.2);
          color: #a78bfa;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .recent-game-item:hover {
          background: rgba(167,139,250,0.2);
          border-color: rgba(167,139,250,0.4);
        }
        .remove-recent {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          font-size: 0.7rem;
          padding: 0;
          line-height: 1;
        }
        .remove-recent:hover {
          color: #f87171;
        }

        /* STATS */
        .stats-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          margin-top: 64px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.4s forwards;
        }
        .stat {
          text-align: center;
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #e2e8f0;
        }
        .stat-label {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }
        .stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.07);
          align-self: stretch;
        }

        /* HOW IT WORKS */
        .section {
          width: 100%;
          margin-top: 100px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.5s forwards;
        }
        .section-label {
          font-size: 0.72rem;
          color: #64748b;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: 48px;
          color: #e2e8f0;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .cards-grid { grid-template-columns: 1fr; }
          .stats-row { gap: 16px; }
          .hero-title { font-size: 2.4rem; }
          .hero { margin-top: 40px; }
          .play-row { flex-direction: column; }
          .play-btn { width: 100%; padding: 14px; }
          .cta-box { max-width: 100%; }
          .section { margin-top: 60px; }
          .testimonials { margin-top: 50px; margin-bottom: 50px; }
          .nav { padding: 20px 0 0; }
          .cta-create { margin-left: 0; }
          .play-input { margin-left: 0; }
          .divider { margin-left: 0; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 2rem; }
          .hero-sub { font-size: 0.95rem; }
          .stat-value { font-size: 1.5rem; }
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 32px 28px;
          cursor: default;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent-glow);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .feature-card:hover {
          border-color: var(--accent-border);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .feature-card:hover::before { opacity: 1; }

        .card-icon {
          font-size: 1.6rem;
          margin-bottom: 20px;
          display: block;
        }
        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: #e2e8f0;
        }
        .card-desc {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.65;
        }
        .card-action {
          margin-top: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: gap 0.2s;
          display: inline-flex;
          align-items: center;
        }

        /* TESTIMONIAL STRIP */
        .testimonials {
          width: 100%;
          margin-top: 80px;
          margin-bottom: 80px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.6s forwards;
        }
        .testimonial-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 4px;
        }
        .testimonial-track::-webkit-scrollbar { display: none; }
        .testimonial-item {
          flex-shrink: 0;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 20px 22px;
          width: 260px;
        }
        .testimonial-text {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 14px;
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .author-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: #cbd5e1;
        }
        .author-handle {
          font-size: 0.72rem;
          color: #475569;
        }
        .stars {
          color: #fbbf24;
          font-size: 0.7rem;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        /* FOOTER */
        .footer {
          width: 100%;
          text-align: center;
          padding: 32px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 0.78rem;
          color: #334155;
        }
      `}</style>

      {/* ✅ FIX: Add suppressHydrationWarning to canvas */}
      <canvas ref={canvasRef} suppressHydrationWarning />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="page">
        <div className="content">
          {/* NAV */}
          <nav className="nav">
            <span className="nav-logo">Do-u-Know?</span>
            <span className="nav-badge">✦ Free Forever</span>
          </nav>

          {/* HERO */}
          <section className="hero">
            <div className="hero-eyebrow">
                            <span className="dot" />
              It is the ultimate quiz created by SANCHITA MALAKAR ꨄ 
            </div>

            <h1 className="hero-title">
              How well do they
              <br />
              really <span className="gradient-text">know</span> about it ?
            </h1>

            <p className="hero-sub">
              Build a personalized quiz, share your Game ID, and find out who truly gets it — and who&apos;s been showing up.
            </p>

            {/* CTA */}
            <div className="cta-box">
              <button className="cta-create" onClick={() => router.push("/create")}>
                <span>✦ Create Your Quiz</span>
              </button>

              <div className="divider">
                <span className="divider-text">or jump into a game</span>
              </div>

              <div className="play-row">
                <input
                  className={`play-input${isPreFilled ? " prefilled" : ""}`}
                  type="text"
                  placeholder="Enter Game ID (e.g. ABC-123)"
                  value={gameId}
                  readOnly={isPreFilled}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!isPreFilled) setGameId(e.target.value);
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    e.key === "Enter" && gameId && router.push(`/game/${gameId}`)
                  }
                />
                <button
                  className={`play-btn${isPreFilled ? " prefilled" : ""}`}
                  onClick={() => {
                    if (gameId && validateGameId(gameId)) {
                      saveRecentGame(gameId);
                      router.push(`/game/${gameId}`);
                    } else if (gameId) {
                      alert("Please enter a valid Game ID (letters, numbers, and hyphens only)");
                    }
                  }}
                >
                  Play →
                </button>
              </div>

              {/* Hint shown only when game ID is pre-loaded from URL */}
              {isPreFilled && (
                <div className="prefill-hint">
                  ◉ Game ready — tap Play to start!
                </div>
              )}

              {/* Recent Games */}
              {recentGames.length > 0 && (
                <div className="recent-games">
                  <div className="recent-games-title">Recent Games</div>
                  <div className="recent-games-list">
                    {recentGames.map((id, i) => (
                      <div key={i} className="recent-game-item">
                        <span onClick={() => router.push(`/game/${id}`)}>{id}</span>
                        <button
                          className="remove-recent"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRecentGame(id);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* STATS */}
          <div className="stats-row">
            {stats.map((s: Stat, i: number) => (
              <div key={i} style={{ display: "flex", gap: 40, alignItems: "center" }}>
                {i > 0 && <div className="stat-divider" />}
                <div className="stat">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <section className="section">
            <div className="section-label">How it works</div>
            <h2 className="section-title">Three steps to find out who&apos;s real</h2>

            <div className="cards-grid">
              {features.map((f: Feature) => (
                <div
                  key={f.id}
                  className="feature-card"
                  style={
                    {
                      "--accent-glow": `radial-gradient(circle at 0% 0%, ${f.accent}12, transparent 70%)`,
                      "--accent-border": `${f.accent}40`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setHoveredCard(f.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span className="card-icon" style={{ color: f.accent }}>{f.icon}</span>
                  <div className="card-title">{f.title}</div>
                  <div className="card-desc">{f.desc}</div>
                  {f.action && f.route && (
                    <button
                      className="card-action"
                      style={{ color: f.accent }}
                      onClick={() => router.push(f.route!)}
                    >
                      {f.action}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="testimonials">
            <div className="section-label" style={{ marginBottom: 24 }}>What people are saying</div>
            <div className="testimonial-track">
              {testimonials.map((t: Testimonial, i: number) => (
                <div key={i} className="testimonial-item">
                  <div className="stars">★★★★★</div>
                  <div className="testimonial-text">&ldquo;{t.text}&rdquo;</div>
                  <div className="testimonial-author">
                    <div className="avatar" style={{ background: t.bg, color: t.c }}>{t.emoji}</div>
                    <div>
                      <div className="author-name">{t.name}</div>
                      <div className="author-handle">{t.handle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="footer" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          Made with ♥ — Do-u-Know? © {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
}

// Root export wraps in Suspense (required by Next.js for useSearchParams)
export default function Home() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#060612",
        color: "#a78bfa",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(167,139,250,0.2)",
            borderTop: "3px solid #a78bfa",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }} />
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>Loading...</div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}