"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect,useRef, Suspense, use } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Player {
  id: string;
  name: string;
  score: number;
  total: number;
  timeTaken: number;
  avatar: string;
  isYou?: boolean;
}

interface LeaderboardData {
  quizTitle: string;
  author: string;
  totalQuestions: number;
  players: Player[];
}

// ─── Rank helpers ─────────────────────────────────────────────────────────────

const sorted = (players: Player[]) =>
  [...players].sort((a, b) =>
    b.score !== a.score ? b.score - a.score : a.timeTaken - b.timeTaken
  );

const getMedal = (rank: number) => {
  if (rank === 1) return { icon: "🥇", color: "#fbbf24", glow: "rgba(251,191,36,0.45)", label: "Gold" };
  if (rank === 2) return { icon: "🥈", color: "#94a3b8", glow: "rgba(148,163,184,0.35)", label: "Silver" };
  if (rank === 3) return { icon: "🥉", color: "#fb923c", glow: "rgba(251,146,60,0.35)", label: "Bronze" };
  return null;
};

const getScoreColor = (pct: number) => {
  if (pct === 1) return "#fbbf24";
  if (pct >= 0.75) return "#34d399";
  if (pct >= 0.5) return "#818cf8";
  if (pct >= 0.25) return "#fb923c";
  return "#f87171";
};

const AVATAR_BG: Record<string, string> = {
  "🧑‍💻": "#6366f122", "🌸": "#f472b622", "🎧": "#34d39922",
  "⭐": "#fbbf2422", "✨": "#a78bfa22", "🎉": "#fb923c22", "💀": "#f8717122",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = use(params);
    const router = useRouter();
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"board" | "stats">("board");
  const [confetti, setConfetti] = useState<{ x: number; color: string; delay: number; size: number }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchLeaderboard();
  }, [id]);

  const fetchLeaderboard = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const res = await fetch(`${baseUrl}/api/quiz/${id}/leaderboard`, {
        cache: "no-store",
      });
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const rankedPlayers = data ? sorted(data.players) : [];
  const top3 = rankedPlayers.slice(0, 3);
  const youEntry = rankedPlayers.find((p) => p.isYou);
  const yourRank = youEntry ? rankedPlayers.indexOf(youEntry) + 1 : null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/game/${id}`
      : `https://knowme.app/game/${id}`;

  useEffect(() => {
    if (mounted && yourRank && yourRank <= 3) {
      setConfetti(
        Array.from({ length: 50 }, (_, i) => ({
          x: Math.random() * 100,
          color: ["#818cf8","#f472b6","#34d399","#fbbf24","#fb923c"][i % 5],
          delay: Math.random() * 1,
          size: 6 + Math.random() * 6,
        }))
      );
    }
  }, [yourRank, mounted]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareNative = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: data?.quizTitle || "Quiz",
        text: `Can you beat my score on ${data?.author}'s quiz? 🧠`,
        url: shareUrl,
      });
    } else {
      copyLink();
    }
  };

  const maxScore = Math.max(...rankedPlayers.map((p) => p.score), 1);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#06070f",
        color: "#475569",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        Loading leaderboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#06070f",
        color: "#f87171",
        fontFamily: "'DM Sans', sans-serif",
        padding: "24px",
        textAlign: "center",
      }}>
        <div>
          <div style={{ fontSize: "2.5rem", marginBottom: "14px" }}>😵</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>Quiz Not Found</div>
          <div style={{ fontSize: "0.88rem", color: "#475569", marginBottom: "28px" }}>This quiz doesn't exist or has been removed.</div>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "13px 28px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "#94a3b8",
              cursor: "pointer",
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          width: 100%;
          min-height: 100vh;
          background: #06070f;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          color: #f1f5f9;
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 99px; }

        /* ── BG ── */
        .bg {
          position: fixed; inset: 0;
          z-index: 0; pointer-events: none; overflow: hidden;
        }
        .bg-base {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 20% 10%, rgba(99,102,241,0.2) 0%, transparent 55%),
            radial-gradient(ellipse 55% 45% at 80% 90%, rgba(168,85,247,0.14) 0%, transparent 50%),
            radial-gradient(ellipse 40% 35% at 60% 40%, rgba(251,191,36,0.06) 0%, transparent 55%),
            linear-gradient(160deg, #060818 0%, #0c0e20 60%, #06070f 100%);
        }
        .bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        /* ── Confetti ── */
        .confetti-wrap {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 999; overflow: hidden;
        }
        .confetti-piece {
          position: absolute; top: -20px;
          border-radius: 2px;
          animation: fall linear both;
        }
        @keyframes fall {
          from { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          to   { transform: translateY(110vh) rotate(540deg); opacity: 0; }
        }

        /* ── Page ── */
                .page {
          position: relative; z-index: 1;
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center;
          padding: 24px 16px 80px;
        }

        /* ── Nav ── */
        .nav {
          width: 100%; max-width: 700px;
          display: flex; justify-content: space-between; align-items: center;
          padding: 28px 0 0; margin-bottom: 40px;
        }
        .nav-logo {
          font-family: 'Fraunces', serif;
          font-size: 1.05rem; color: #a78bfa;
          cursor: pointer; transition: opacity 0.2s;
        }
        .nav-logo:hover { opacity: 0.7; }
        .nav-badge {
          font-size: 0.72rem; color: #475569;
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* ── Main Card ── */
        .card {
          width: 100%; max-width: 700px;
          background: rgba(10,12,28,0.88);
          border: 1px solid rgba(99,102,241,0.14);
          border-radius: 28px;
          padding: 40px 36px;
          backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.06),
            0 40px 100px rgba(0,0,0,0.55),
            0 0 80px rgba(99,102,241,0.07);
          animation: cardIn 0.55s cubic-bezier(.22,.68,0,1.2) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Header ── */
        .header {
          text-align: center;
          margin-bottom: 28px;
          animation: fadeUp 0.5s ease 0.1s both;
        }
        .trophy-wrap {
          font-size: 2.4rem;
          margin-bottom: 10px;
          display: block;
          animation: trophyBounce 0.7s cubic-bezier(.22,.68,0,1.5) 0.3s both;
        }
        @keyframes trophyBounce {
          from { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .header-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.4rem, 4vw, 2rem);
          font-weight: 900; color: #f8fafc;
          line-height: 1.1; margin-bottom: 6px;
        }
        .header-sub {
          font-size: 0.85rem; color: #475569;
          font-weight: 300;
        }
        .header-sub strong { color: #a5b4fc; font-weight: 500; }

        /* ── Your Rank Banner ── */
        .your-rank-banner {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px;
          border-radius: 14px;
          margin-bottom: 24px;
          animation: fadeUp 0.5s ease 0.2s both;
        }
        .yr-left { flex: 1; }
        .yr-label { font-size: 0.68rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; }
        .yr-value {
          font-family: 'Fraunces', serif;
          font-size: 1.6rem; font-weight: 900;
          line-height: 1;
        }
        .yr-score { font-size: 0.82rem; color: #64748b; margin-top: 2px; }

        /* ── Share Box ── */
        .share-box {
          display: flex; gap: 8px; align-items: center;
          padding: 14px 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          margin-bottom: 28px;
          animation: fadeUp 0.5s ease 0.25s both;
        }
        .share-url {
          flex: 1; font-size: 0.78rem; color: #475569;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'DM Mono', monospace;
        }
        .share-btns { display: flex; gap: 6px; flex-shrink: 0; }
        .copy-btn {
          padding: 8px 14px; border-radius: 9px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          color: #a5b4fc; font-size: 0.78rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .copy-btn:hover { background: rgba(99,102,241,0.25); }
        .copy-btn.done { background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.3); color: #34d399; }
        .share-native-btn {
          padding: 8px 14px; border-radius: 9px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #64748b; font-size: 0.78rem;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .share-native-btn:hover { border-color: rgba(255,255,255,0.16); color: #94a3b8; }

        /* ── Tabs ── */
        .tabs {
          display: flex; gap: 6px;
          margin-bottom: 24px;
          animation: fadeUp 0.5s ease 0.3s both;
        }
        .tab-btn {
          flex: 1; padding: 10px 16px;
          border-radius: 11px;
          border: 1px solid rgba(255,255,255,0.07);
          background: transparent;
          color: #475569; font-size: 0.85rem; font-weight: 500;
          cursor: pointer; transition: all 0.18s;
          font-family: 'DM Sans', sans-serif;
        }
        .tab-btn.active {
          background: rgba(99,102,241,0.18);
          border-color: rgba(99,102,241,0.4);
          color: #a5b4fc;
        }

        /* ── TOP 3 PODIUM ── */
        .podium {
          display: flex; align-items: flex-end; justify-content: center;
          gap: 12px; margin-bottom: 28px;
          animation: fadeUp 0.5s ease 0.35s both;
        }
        .podium-slot {
          flex: 1; max-width: 180px;
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
        }
        .podium-avatar {
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          border: 2px solid transparent;
          position: relative;
          flex-shrink: 0;
        }
        .podium-avatar.rank-1 {
          width: 64px; height: 64px;
          font-size: 1.7rem;
          box-shadow: 0 0 24px var(--medal-glow);
        }
        .podium-medal { font-size: 1.4rem; }
        .podium-name {
          font-size: 0.82rem; font-weight: 600;
          color: #e2e8f0; text-align: center;
          white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; max-width: 100%;
        }
        .podium-score {
          font-family: 'Fraunces', serif;
          font-size: 1rem; font-weight: 700;
        }
        .podium-bar-wrap {
          width: 100%;
          border-radius: 10px 10px 0 0;
          overflow: hidden;
          position: relative;
        }
        .podium-bar {
          width: 100%;
          border-radius: 10px 10px 0 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif;
          font-size: 1.1rem; font-weight: 900;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          border-bottom: none;
        }

        /* ── LEADERBOARD TABLE ── */
        .lb-table {
          display: flex; flex-direction: column;
          gap: 6px; margin-bottom: 28px;
          animation: fadeUp 0.5s ease 0.4s both;
        }
        .lb-row {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 16px;
          border-radius: 13px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.025);
          transition: all 0.18s;
          animation: rowIn 0.4s ease both;
        }
        .lb-row:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
        .lb-row.is-you {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.35);
          box-shadow: 0 0 20px rgba(99,102,241,0.12);
        }
        .lb-row.top-1 { border-color: rgba(251,191,36,0.3); background: rgba(251,191,36,0.05); }
        .lb-row.top-2 { border-color: rgba(148,163,184,0.25); background: rgba(148,163,184,0.04); }
        .lb-row.top-3 { border-color: rgba(251,146,60,0.25); background: rgba(251,146,60,0.04); }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .lb-rank {
          font-family: 'Fraunces', serif;
          font-size: 1rem; font-weight: 900;
          min-width: 28px; text-align: center;
          color: #475569;
        }
        .lb-rank.top { color: var(--medal-color); }
        .lb-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .lb-name {
          flex: 1; font-size: 0.92rem; font-weight: 500;
          color: #cbd5e1; display: flex; align-items: center; gap: 8px;
        }
        .you-tag {
          font-size: 0.65rem; font-weight: 600;
          padding: 2px 8px; border-radius: 999px;
          background: rgba(99,102,241,0.2);
          color: #818cf8; letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .lb-score {
          font-family: 'Fraunces', serif;
          font-size: 1rem; font-weight: 700;
          min-width: 40px; text-align: right;
        }
        .lb-time {
          font-size: 0.72rem; color: #334155;
          min-width: 36px; text-align: right;
        }
        .lb-bar-wrap {
          width: 80px; height: 5px;
          background: rgba(255,255,255,0.06);
          border-radius: 99px; overflow: hidden;
          flex-shrink: 0;
        }
        .lb-bar {
          height: 100%; border-radius: 99px;
          transition: width 0.6s ease;
        }

        /* ── STATS TAB ── */
        .stats-section {
          animation: fadeUp 0.4s ease both;
        }
        .stats-title {
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #475569; margin-bottom: 14px;
        }
        .bar-chart {
          display: flex; flex-direction: column; gap: 10px;
          margin-bottom: 28px;
        }
        .chart-row {
          display: flex; align-items: center; gap: 10px;
        }
        .chart-name {
          width: 80px; font-size: 0.78rem; color: #64748b;
          text-align: right; flex-shrink: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
                .chart-track {
          flex: 1; height: 28px;
          background: rgba(255,255,255,0.04);
          border-radius: 8px; overflow: hidden; position: relative;
        }
        .chart-fill {
          height: 100%; border-radius: 8px;
          display: flex; align-items: center;
          padding-left: 10px;
          font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.8);
          min-width: 20px;
          animation: fillIn 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fillIn {
          from { width: 0% !important; }
        }
        .chart-label {
          font-size: 0.72rem; color: #475569;
          flex-shrink: 0; width: 32px; text-align: right;
        }

        .stat-cards {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 10px; margin-bottom: 28px;
        }
        .stat-card {
          padding: 16px 12px; text-align: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
        }
        .sc-val {
          font-family: 'Fraunces', serif;
          font-size: 1.5rem; font-weight: 900;
        }
        .sc-label {
          font-size: 0.65rem; color: #475569;
          text-transform: uppercase; letter-spacing: 0.08em;
          margin-top: 4px;
        }

        /* ── Divider ── */
        .divider {
          height: 1px; background: rgba(255,255,255,0.06); margin: 24px 0;
        }

        /* ── CTA ── */
        .cta-section {
          animation: fadeUp 0.5s ease 0.7s both;
        }
        .cta-label {
          font-size: 0.72rem; color: #475569;
          text-align: center; margin-bottom: 14px;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .create-btn {
          width: 100%; padding: 16px 24px;
          border-radius: 14px; border: none;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #9333ea);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 1rem; font-weight: 600;
          cursor: pointer; letter-spacing: 0.02em;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 28px rgba(99,102,241,0.35);
          position: relative; overflow: hidden;
          margin-bottom: 10px;
        }
        .create-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #6366f1, #a855f7, #c084fc);
          opacity: 0; transition: opacity 0.2s;
        }
        .create-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(99,102,241,0.5); }
        .create-btn:hover::before { opacity: 1; }
        .create-btn span { position: relative; z-index: 1; }
        .play-again-btn {
          width: 100%; padding: 13px 24px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          color: #64748b; font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; cursor: pointer; transition: all 0.2s;
        }
        .play-again-btn:hover { border-color: rgba(255,255,255,0.18); color: #94a3b8; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Mobile ── */
        @media (max-width: 540px) {
          .card { padding: 28px 18px; border-radius: 20px; }
          .share-box { flex-direction: column; align-items: stretch; }
          .share-url { display: none; }
          .share-btns { justify-content: stretch; }
          .copy-btn, .share-native-btn { flex: 1; text-align: center; }
          .podium { gap: 8px; }
          .lb-bar-wrap { display: none; }
          .lb-time { display: none; }
          .stat-cards { grid-template-columns: repeat(3,1fr); }
          .chart-name { width: 60px; }
        }
      `}</style>

      {/* Background */}
      <div className="bg">
        <div className="bg-base" />
        <div className="bg-grid" />
      </div>

      {/* Confetti */}
      {confetti.length > 0 && (
        <div className="confetti-wrap">
          {confetti.map((p, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${p.x}%`,
                width: p.size, height: p.size,
                background: p.color,
                animationDuration: `${2 + Math.random() * 1.5}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="page">

        {/* Nav */}
        <nav className="nav">
          <span className="nav-logo" onClick={() => router.push("/")}>KnowMe?</span>
          <span className="nav-badge">Quiz #{id}</span>
        </nav>

        <div className="card">

          {/* Header */}
          <div className="header">
            <span className="trophy-wrap">🏆</span>
            <h1 className="header-title">{data.quizTitle}</h1>
            <p className="header-sub">by <strong>{data.author}</strong> · {rankedPlayers.length} players competed</p>
          </div>

          {/* Your Rank Banner */}
          {youEntry && yourRank && (
            <div
              className="your-rank-banner"
              style={{
                background: `rgba(${yourRank === 1 ? "251,191,36" : yourRank === 2 ? "148,163,184" : yourRank === 3 ? "251,146,60" : "99,102,241"},0.08)`,
                border: `1px solid rgba(${yourRank === 1 ? "251,191,36" : yourRank === 2 ? "148,163,184" : yourRank === 3 ? "251,146,60" : "99,102,241"},0.3)`,
              }}
            >
              <div className="yr-left">
                <div className="yr-label">Your Rank</div>
                <div
                  className="yr-value"
                  style={{ color: yourRank === 1 ? "#fbbf24" : yourRank <= 3 ? "#fb923c" : "#818cf8" }}
                >
                  #{yourRank}
                </div>
                <div className="yr-score">
                  {youEntry.score}/{youEntry.total} correct · avg {youEntry.timeTaken}s/question
                </div>
              </div>
              <div style={{ fontSize: "2.2rem" }}>{youEntry.avatar}</div>
              <div
                style={{
                  textAlign: "right",
                  fontSize: "0.78rem",
                  color: getScoreColor(youEntry.score / youEntry.total),
                  fontWeight: 600,
                }}
              >
                {Math.round((youEntry.score / youEntry.total) * 100)}%
              </div>
            </div>
          )}

          {/* Share Box */}
          <div className="share-box">
            <div className="share-url">{shareUrl}</div>
            <div className="share-btns">
              <button className={`copy-btn${copied ? " done" : ""}`} onClick={copyLink}>
                {copied ? "Copied ✓" : "🔗 Copy Link"}
              </button>
              <button className="share-native-btn" onClick={shareNative}>
                ↗ Share
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab-btn${activeTab === "board" ? " active" : ""}`}
              onClick={() => setActiveTab("board")}
            >
              🏅 Leaderboard
            </button>
            <button
              className={`tab-btn${activeTab === "stats" ? " active" : ""}`}
              onClick={() => setActiveTab("stats")}
            >
              📊 Stats
            </button>
          </div>

          {/* ─── LEADERBOARD TAB ─── */}
          {activeTab === "board" && (
            <>
              {/* Podium */}
              <div className="podium">
                {/* 2nd place */}
                {top3[1] && (() => {
                  const p = top3[1];
                  const medal = getMedal(2)!;
                  const pct = p.score / p.total;
                  return (
                    <div className="podium-slot" style={{ marginBottom: 0 }}>
                      <div
                        className="podium-avatar"
                        style={{
                          background: AVATAR_BG[p.avatar] || "rgba(255,255,255,0.06)",
                          borderColor: `${medal.color}44`,
                          "--medal-glow": medal.glow,
                        } as React.CSSProperties}
                      >
                        {p.avatar}
                        {p.isYou && (
                          <div style={{ position: "absolute", bottom: -4, right: -4, fontSize: "0.55rem", background: "#818cf8", borderRadius: "999px", padding: "1px 5px", color: "#fff", fontWeight: 700 }}>YOU</div>
                        )}
                      </div>
                      <div className="podium-medal">{medal.icon}</div>
                      <div className="podium-name">{p.name}</div>
                      <div className="podium-score" style={{ color: medal.color }}>{p.score}/{p.total}</div>
                      <div className="podium-bar-wrap" style={{ height: 70 }}>
                        <div
                          className="podium-bar"
                          style={{
                            height: "100%",
                            background: `linear-gradient(180deg, ${medal.color}22, ${medal.color}11)`,
                            borderColor: `${medal.color}30`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* 1st place */}
                {top3[0] && (() => {
                  const p = top3[0];
                  const medal = getMedal(1)!;
                  return (
                    <div className="podium-slot">
                      <div
                        className="podium-avatar rank-1"
                        style={{
                          background: AVATAR_BG[p.avatar] || "rgba(255,255,255,0.06)",
                          borderColor: `${medal.color}66`,
                          "--medal-glow": medal.glow,
                        } as React.CSSProperties}
                      >
                        {p.avatar}
                        {p.isYou && (
                          <div style={{ position: "absolute", bottom: -4, right: -4, fontSize: "0.55rem", background: "#818cf8", borderRadius: "999px", padding: "1px 5px", color: "#fff", fontWeight: 700 }}>YOU</div>
                        )}
                      </div>
                      <div className="podium-medal" style={{ fontSize: "1.8rem" }}>{medal.icon}</div>
                      <div className="podium-name" style={{ color: medal.color, fontSize: "0.9rem" }}>{p.name}</div>
                      <div className="podium-score" style={{ color: medal.color, fontSize: "1.2rem" }}>{p.score}/{p.total}</div>
                      <div className="podium-bar-wrap" style={{ height: 100 }}>
                        <div
                          className="podium-bar"
                          style={{
                            height: "100%",
                            background: `linear-gradient(180deg, ${medal.color}33, ${medal.color}11)`,
                            borderColor: `${medal.color}44`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* 3rd place */}
                {top3[2] && (() => {
                  const p = top3[2];
                  const medal = getMedal(3)!;
                  return (
                    <div className="podium-slot" style={{ marginBottom: 0 }}>
                      <div
                        className="podium-avatar"
                        style={{
                          background: AVATAR_BG[p.avatar] || "rgba(255,255,255,0.06)",
                          borderColor: `${medal.color}44`,
                          "--medal-glow": medal.glow,
                        } as React.CSSProperties}
                      >
                        {p.avatar}
                        {p.isYou && (
                          <div style={{ position: "absolute", bottom: -4, right: -4, fontSize: "0.55rem", background: "#818cf8", borderRadius: "999px", padding: "1px 5px", color: "#fff", fontWeight: 700 }}>YOU</div>
                        )}
                      </div>
                      <div className="podium-medal">{medal.icon}</div>
                      <div className="podium-name">{p.name}</div>
                      <div className="podium-score" style={{ color: medal.color }}>{p.score}/{p.total}</div>
                      <div className="podium-bar-wrap" style={{ height: 50 }}>
                        <div
                          className="podium-bar"
                          style={{
                            height: "100%",
                            background: `linear-gradient(180deg, ${medal.color}22, ${medal.color}0a)`,
                            borderColor: `${medal.color}30`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Full Table */}
              <div className="lb-table">
                {rankedPlayers.map((p, i) => {
                  const rank = i + 1;
                  const medal = getMedal(rank);
                  const pct = p.score / p.total;
                  const scoreColor = getScoreColor(pct);
                  const barWidth = Math.round((p.score / maxScore) * 100);

                  return (
                    <div
                      key={p.id}
                      className={`lb-row${p.isYou ? " is-you" : ""}${rank === 1 ? " top-1" : rank === 2 ? " top-2" : rank === 3 ? " top-3" : ""}`}
                      style={{ animationDelay: `${0.05 * i}s`, "--medal-color": medal?.color || "#475569" } as React.CSSProperties}
                    >
                      <div className={`lb-rank${medal ? " top" : ""}`}>
                        {medal ? medal.icon : rank}
                      </div>
                      <div
                                                className="lb-avatar"
                        style={{ background: AVATAR_BG[p.avatar] || "rgba(255,255,255,0.05)" }}
                      >
                        {p.avatar}
                      </div>
                      <div className="lb-name">
                        {p.name}
                        {p.isYou && <span className="you-tag">You</span>}
                      </div>
                      <div className="lb-bar-wrap">
                        <div
                          className="lb-bar"
                          style={{
                            width: `${barWidth}%`,
                            background: `linear-gradient(90deg, ${scoreColor}99, ${scoreColor})`,
                          }}
                        />
                      </div>
                      <div className="lb-time">{p.timeTaken}s</div>
                      <div className="lb-score" style={{ color: scoreColor }}>
                        {p.score}/{p.total}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ─── STATS TAB ─── */}
          {activeTab === "stats" && (
            <div className="stats-section">
              {/* Summary cards */}
              <div className="stat-cards">
                <div className="stat-card">
                  <div className="sc-val" style={{ color: "#818cf8" }}>{rankedPlayers.length}</div>
                  <div className="sc-label">Players</div>
                </div>
                <div className="stat-card">
                  <div className="sc-val" style={{ color: "#34d399" }}>
                    {Math.round((rankedPlayers.reduce((s, p) => s + p.score, 0) / (rankedPlayers.length * rankedPlayers[0].total)) * 100)}%
                  </div>
                  <div className="sc-label">Avg Score</div>
                </div>
                <div className="stat-card">
                  <div className="sc-val" style={{ color: "#fbbf24" }}>
                    {rankedPlayers.filter(p => p.score === rankedPlayers[0].total).length}
                  </div>
                  <div className="sc-label">Perfect</div>
                </div>
              </div>

              {/* Bar chart */}
              <div className="stats-title">Score Distribution</div>
              <div className="bar-chart">
                {rankedPlayers.map((p, i) => {
                  const pct = p.score / p.total;
                  const color = getScoreColor(pct);
                  const barPct = Math.round((p.score / maxScore) * 100);
                  return (
                    <div key={p.id} className="chart-row" style={{ animationDelay: `${0.06 * i}s` }}>
                      <div className="chart-name">{p.name}</div>
                      <div className="chart-track">
                        <div
                          className="chart-fill"
                          style={{
                            width: `${barPct}%`,
                            background: `linear-gradient(90deg, ${color}55, ${color}99)`,
                            animationDelay: `${0.1 * i}s`,
                          }}
                        >
                          {p.score}/{p.total}
                        </div>
                      </div>
                      <div className="chart-label" style={{ color }}>{Math.round(pct * 100)}%</div>
                    </div>
                  );
                })}
              </div>

              {/* Fastest / slowest */}
              <div className="stats-title">Speed Ranking (avg time/question)</div>
              <div className="bar-chart">
                {[...rankedPlayers]
                  .sort((a, b) => a.timeTaken - b.timeTaken)
                  .map((p, i) => {
                    const maxTime = Math.max(...rankedPlayers.map(x => x.timeTaken));
                    const barPct = Math.round(((maxTime - p.timeTaken) / maxTime) * 100 + 10);
                    return (
                      <div key={p.id} className="chart-row">
                        <div className="chart-name">{p.name}</div>
                        <div className="chart-track">
                          <div
                            className="chart-fill"
                            style={{
                              width: `${barPct}%`,
                              background: i === 0
                                ? "linear-gradient(90deg, #34d39955, #34d399aa)"
                                : "linear-gradient(90deg, #47556955, #47556988)",
                              animationDelay: `${0.1 * i}s`,
                            }}
                          >
                            {p.timeTaken}s
                          </div>
                        </div>
                        <div className="chart-label" style={{ color: i === 0 ? "#34d399" : "#475569" }}>
                          {i === 0 ? "⚡" : ""}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <div className="divider" />

          {/* CTA */}
          <div className="cta-section">
            <div className="cta-label">Inspired? Make your own quiz.</div>
            <button className="create-btn" onClick={() => router.push("/create")}>
              <span>✦ Create Your Own Quiz</span>
            </button>
            <button
              className="play-again-btn"
              onClick={() => router.push(`/game/${id}`)}
            >
              ↩ Play Again
            </button>
          </div>

        </div>
      </div>
    </>
  );
}