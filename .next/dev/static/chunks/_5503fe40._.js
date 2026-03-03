(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/leaderboard/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeaderboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// ─── Rank helpers ─────────────────────────────────────────────────────────────
const sorted = (players)=>[
        ...players
    ].sort((a, b)=>b.score !== a.score ? b.score - a.score : a.timeTaken - b.timeTaken);
const getMedal = (rank)=>{
    if (rank === 1) return {
        icon: "🥇",
        color: "#fbbf24",
        glow: "rgba(251,191,36,0.45)",
        label: "Gold"
    };
    if (rank === 2) return {
        icon: "🥈",
        color: "#94a3b8",
        glow: "rgba(148,163,184,0.35)",
        label: "Silver"
    };
    if (rank === 3) return {
        icon: "🥉",
        color: "#fb923c",
        glow: "rgba(251,146,60,0.35)",
        label: "Bronze"
    };
    return null;
};
const getScoreColor = (pct)=>{
    if (pct === 1) return "#fbbf24";
    if (pct >= 0.75) return "#34d399";
    if (pct >= 0.5) return "#818cf8";
    if (pct >= 0.25) return "#fb923c";
    return "#f87171";
};
const AVATAR_BG = {
    "🧑‍💻": "#6366f122",
    "🌸": "#f472b622",
    "🎧": "#34d39922",
    "⭐": "#fbbf2422",
    "✨": "#a78bfa22",
    "🎉": "#fb923c22",
    "💀": "#f8717122"
};
function LeaderboardPage({ params }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("board");
    const [confetti, setConfetti] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeaderboardPage.useEffect": ()=>{
            setMounted(true);
            fetchLeaderboard();
        }
    }["LeaderboardPage.useEffect"], [
        params.id
    ]);
    const fetchLeaderboard = async ()=>{
        try {
            const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BASE_URL || "";
            const res = await fetch(`${baseUrl}/api/quiz/${params.id}/leaderboard`, {
                cache: "no-store"
            });
            if (res.ok) {
                const result = await res.json();
                setData(result);
            }
        } catch (error) {
            console.error("Failed to fetch leaderboard:", error);
        } finally{
            setLoading(false);
        }
    };
    const rankedPlayers = data ? sorted(data.players) : [];
    const top3 = rankedPlayers.slice(0, 3);
    const youEntry = rankedPlayers.find((p)=>p.isYou);
    const yourRank = youEntry ? rankedPlayers.indexOf(youEntry) + 1 : null;
    const shareUrl = ("TURBOPACK compile-time truthy", 1) ? `${window.location.origin}/game/${params.id}` : "TURBOPACK unreachable";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeaderboardPage.useEffect": ()=>{
            if (mounted && yourRank && yourRank <= 3) {
                setConfetti(Array.from({
                    length: 50
                }, {
                    "LeaderboardPage.useEffect": (_, i)=>({
                            x: Math.random() * 100,
                            color: [
                                "#818cf8",
                                "#f472b6",
                                "#34d399",
                                "#fbbf24",
                                "#fb923c"
                            ][i % 5],
                            delay: Math.random() * 1,
                            size: 6 + Math.random() * 6
                        })
                }["LeaderboardPage.useEffect"]));
            }
        }
    }["LeaderboardPage.useEffect"], [
        yourRank,
        mounted
    ]);
    const copyLink = async ()=>{
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(()=>setCopied(false), 2500);
    };
    const shareNative = ()=>{
        if (typeof navigator !== "undefined" && navigator.share) {
            navigator.share({
                title: data?.quizTitle || "Quiz",
                text: `Can you beat my score on ${data?.author}'s quiz? 🧠`,
                url: shareUrl
            });
        } else {
            copyLink();
        }
    };
    const maxScore = Math.max(...rankedPlayers.map((p)=>p.score), 1);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                background: "#06070f",
                color: "#475569",
                fontFamily: "'DM Sans', sans-serif"
            },
            children: "Loading leaderboard..."
        }, void 0, false, {
            fileName: "[project]/app/leaderboard/[id]/page.tsx",
            lineNumber: 130,
            columnNumber: 7
        }, this);
    }
    if (!data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                background: "#06070f",
                color: "#f87171",
                fontFamily: "'DM Sans', sans-serif",
                padding: "24px",
                textAlign: "center"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: "2.5rem",
                            marginBottom: "14px"
                        },
                        children: "😵"
                    }, void 0, false, {
                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            marginBottom: "8px"
                        },
                        children: "Quiz Not Found"
                    }, void 0, false, {
                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: "0.88rem",
                            color: "#475569",
                            marginBottom: "28px"
                        },
                        children: "This quiz doesn't exist or has been removed."
                    }, void 0, false, {
                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/"),
                        style: {
                            padding: "13px 28px",
                            borderRadius: "12px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.05)",
                            color: "#94a3b8",
                            cursor: "pointer"
                        },
                        children: "← Back to Home"
                    }, void 0, false, {
                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/leaderboard/[id]/page.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
      `
            }, void 0, false, {
                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-base"
                    }, void 0, false, {
                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                        lineNumber: 638,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-grid"
                    }, void 0, false, {
                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                        lineNumber: 639,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                lineNumber: 637,
                columnNumber: 7
            }, this),
            confetti.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "confetti-wrap",
                children: confetti.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "confetti-piece",
                        style: {
                            left: `${p.x}%`,
                            width: p.size,
                            height: p.size,
                            background: p.color,
                            animationDuration: `${2 + Math.random() * 1.5}s`,
                            animationDelay: `${p.delay}s`
                        }
                    }, i, false, {
                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                        lineNumber: 646,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                lineNumber: 644,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "nav",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "nav-logo",
                                onClick: ()=>router.push("/"),
                                children: "KnowMe?"
                            }, void 0, false, {
                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                lineNumber: 665,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "nav-badge",
                                children: [
                                    "Quiz #",
                                    params.id
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                lineNumber: 666,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                        lineNumber: 664,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "trophy-wrap",
                                        children: "🏆"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 673,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "header-title",
                                        children: data.quizTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 674,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "header-sub",
                                        children: [
                                            "by ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: data.author
                                            }, void 0, false, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 675,
                                                columnNumber: 42
                                            }, this),
                                            " · ",
                                            rankedPlayers.length,
                                            " players competed"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 675,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                lineNumber: 672,
                                columnNumber: 11
                            }, this),
                            youEntry && yourRank && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "your-rank-banner",
                                style: {
                                    background: `rgba(${yourRank === 1 ? "251,191,36" : yourRank === 2 ? "148,163,184" : yourRank === 3 ? "251,146,60" : "99,102,241"},0.08)`,
                                    border: `1px solid rgba(${yourRank === 1 ? "251,191,36" : yourRank === 2 ? "148,163,184" : yourRank === 3 ? "251,146,60" : "99,102,241"},0.3)`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "yr-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "yr-label",
                                                children: "Your Rank"
                                            }, void 0, false, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 688,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "yr-value",
                                                style: {
                                                    color: yourRank === 1 ? "#fbbf24" : yourRank <= 3 ? "#fb923c" : "#818cf8"
                                                },
                                                children: [
                                                    "#",
                                                    yourRank
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 689,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "yr-score",
                                                children: [
                                                    youEntry.score,
                                                    "/",
                                                    youEntry.total,
                                                    " correct · avg ",
                                                    youEntry.timeTaken,
                                                    "s/question"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 695,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 687,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "2.2rem"
                                        },
                                        children: youEntry.avatar
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 699,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "right",
                                            fontSize: "0.78rem",
                                            color: getScoreColor(youEntry.score / youEntry.total),
                                            fontWeight: 600
                                        },
                                        children: [
                                            Math.round(youEntry.score / youEntry.total * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 700,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                lineNumber: 680,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "share-box",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "share-url",
                                        children: shareUrl
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 715,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "share-btns",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `copy-btn${copied ? " done" : ""}`,
                                                onClick: copyLink,
                                                children: copied ? "Copied ✓" : "🔗 Copy Link"
                                            }, void 0, false, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 717,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "share-native-btn",
                                                onClick: shareNative,
                                                children: "↗ Share"
                                            }, void 0, false, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 720,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 716,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                lineNumber: 714,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tabs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `tab-btn${activeTab === "board" ? " active" : ""}`,
                                        onClick: ()=>setActiveTab("board"),
                                        children: "🏅 Leaderboard"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 728,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `tab-btn${activeTab === "stats" ? " active" : ""}`,
                                        onClick: ()=>setActiveTab("stats"),
                                        children: "📊 Stats"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 734,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                lineNumber: 727,
                                columnNumber: 11
                            }, this),
                            activeTab === "board" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "podium",
                                        children: [
                                            top3[1] && (()=>{
                                                const p = top3[1];
                                                const medal = getMedal(2);
                                                const pct = p.score / p.total;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "podium-slot",
                                                    style: {
                                                        marginBottom: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-avatar",
                                                            style: {
                                                                background: AVATAR_BG[p.avatar] || "rgba(255,255,255,0.06)",
                                                                borderColor: `${medal.color}44`,
                                                                "--medal-glow": medal.glow
                                                            },
                                                            children: [
                                                                p.avatar,
                                                                p.isYou && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: "absolute",
                                                                        bottom: -4,
                                                                        right: -4,
                                                                        fontSize: "0.55rem",
                                                                        background: "#818cf8",
                                                                        borderRadius: "999px",
                                                                        padding: "1px 5px",
                                                                        color: "#fff",
                                                                        fontWeight: 700
                                                                    },
                                                                    children: "YOU"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                                    lineNumber: 764,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 754,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-medal",
                                                            children: medal.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 767,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-name",
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 768,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-score",
                                                            style: {
                                                                color: medal.color
                                                            },
                                                            children: [
                                                                p.score,
                                                                "/",
                                                                p.total
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 769,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-bar-wrap",
                                                            style: {
                                                                height: 70
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "podium-bar",
                                                                style: {
                                                                    height: "100%",
                                                                    background: `linear-gradient(180deg, ${medal.color}22, ${medal.color}11)`,
                                                                    borderColor: `${medal.color}30`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                                lineNumber: 771,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 770,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                    lineNumber: 753,
                                                    columnNumber: 21
                                                }, this);
                                            })(),
                                            top3[0] && (()=>{
                                                const p = top3[0];
                                                const medal = getMedal(1);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "podium-slot",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-avatar rank-1",
                                                            style: {
                                                                background: AVATAR_BG[p.avatar] || "rgba(255,255,255,0.06)",
                                                                borderColor: `${medal.color}66`,
                                                                "--medal-glow": medal.glow
                                                            },
                                                            children: [
                                                                p.avatar,
                                                                p.isYou && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: "absolute",
                                                                        bottom: -4,
                                                                        right: -4,
                                                                        fontSize: "0.55rem",
                                                                        background: "#818cf8",
                                                                        borderRadius: "999px",
                                                                        padding: "1px 5px",
                                                                        color: "#fff",
                                                                        fontWeight: 700
                                                                    },
                                                                    children: "YOU"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                                    lineNumber: 800,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 790,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-medal",
                                                            style: {
                                                                fontSize: "1.8rem"
                                                            },
                                                            children: medal.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 803,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-name",
                                                            style: {
                                                                color: medal.color,
                                                                fontSize: "0.9rem"
                                                            },
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 804,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-score",
                                                            style: {
                                                                color: medal.color,
                                                                fontSize: "1.2rem"
                                                            },
                                                            children: [
                                                                p.score,
                                                                "/",
                                                                p.total
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 805,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-bar-wrap",
                                                            style: {
                                                                height: 100
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "podium-bar",
                                                                style: {
                                                                    height: "100%",
                                                                    background: `linear-gradient(180deg, ${medal.color}33, ${medal.color}11)`,
                                                                    borderColor: `${medal.color}44`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                                lineNumber: 807,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 806,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                    lineNumber: 789,
                                                    columnNumber: 21
                                                }, this);
                                            })(),
                                            top3[2] && (()=>{
                                                const p = top3[2];
                                                const medal = getMedal(3);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "podium-slot",
                                                    style: {
                                                        marginBottom: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-avatar",
                                                            style: {
                                                                background: AVATAR_BG[p.avatar] || "rgba(255,255,255,0.06)",
                                                                borderColor: `${medal.color}44`,
                                                                "--medal-glow": medal.glow
                                                            },
                                                            children: [
                                                                p.avatar,
                                                                p.isYou && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        position: "absolute",
                                                                        bottom: -4,
                                                                        right: -4,
                                                                        fontSize: "0.55rem",
                                                                        background: "#818cf8",
                                                                        borderRadius: "999px",
                                                                        padding: "1px 5px",
                                                                        color: "#fff",
                                                                        fontWeight: 700
                                                                    },
                                                                    children: "YOU"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                                    lineNumber: 836,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 826,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-medal",
                                                            children: medal.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 839,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-name",
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-score",
                                                            style: {
                                                                color: medal.color
                                                            },
                                                            children: [
                                                                p.score,
                                                                "/",
                                                                p.total
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 841,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "podium-bar-wrap",
                                                            style: {
                                                                height: 50
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "podium-bar",
                                                                style: {
                                                                    height: "100%",
                                                                    background: `linear-gradient(180deg, ${medal.color}22, ${medal.color}0a)`,
                                                                    borderColor: `${medal.color}30`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                                lineNumber: 843,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 842,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                    lineNumber: 825,
                                                    columnNumber: 21
                                                }, this);
                                            })()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 746,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lb-table",
                                        children: rankedPlayers.map((p, i)=>{
                                            const rank = i + 1;
                                            const medal = getMedal(rank);
                                            const pct = p.score / p.total;
                                            const scoreColor = getScoreColor(pct);
                                            const barWidth = Math.round(p.score / maxScore * 100);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `lb-row${p.isYou ? " is-you" : ""}${rank === 1 ? " top-1" : rank === 2 ? " top-2" : rank === 3 ? " top-3" : ""}`,
                                                style: {
                                                    animationDelay: `${0.05 * i}s`,
                                                    "--medal-color": medal?.color || "#475569"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `lb-rank${medal ? " top" : ""}`,
                                                        children: medal ? medal.icon : rank
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 872,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lb-avatar",
                                                        style: {
                                                            background: AVATAR_BG[p.avatar] || "rgba(255,255,255,0.05)"
                                                        },
                                                        children: p.avatar
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 875,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lb-name",
                                                        children: [
                                                            p.name,
                                                            p.isYou && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "you-tag",
                                                                children: "You"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                                lineNumber: 883,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 881,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lb-bar-wrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "lb-bar",
                                                            style: {
                                                                width: `${barWidth}%`,
                                                                background: `linear-gradient(90deg, ${scoreColor}99, ${scoreColor})`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 886,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 885,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lb-time",
                                                        children: [
                                                            p.timeTaken,
                                                            "s"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 894,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "lb-score",
                                                        style: {
                                                            color: scoreColor
                                                        },
                                                        children: [
                                                            p.score,
                                                            "/",
                                                            p.total
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 895,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 867,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 858,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            activeTab === "stats" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stats-section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-cards",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-card",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sc-val",
                                                        style: {
                                                            color: "#818cf8"
                                                        },
                                                        children: rankedPlayers.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 911,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sc-label",
                                                        children: "Players"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 912,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 910,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-card",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sc-val",
                                                        style: {
                                                            color: "#34d399"
                                                        },
                                                        children: [
                                                            Math.round(rankedPlayers.reduce((s, p)=>s + p.score, 0) / (rankedPlayers.length * rankedPlayers[0].total) * 100),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 915,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sc-label",
                                                        children: "Avg Score"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 918,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 914,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-card",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sc-val",
                                                        style: {
                                                            color: "#fbbf24"
                                                        },
                                                        children: rankedPlayers.filter((p)=>p.score === rankedPlayers[0].total).length
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 921,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sc-label",
                                                        children: "Perfect"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 924,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 920,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 909,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stats-title",
                                        children: "Score Distribution"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 929,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bar-chart",
                                        children: rankedPlayers.map((p, i)=>{
                                            const pct = p.score / p.total;
                                            const color = getScoreColor(pct);
                                            const barPct = Math.round(p.score / maxScore * 100);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "chart-row",
                                                style: {
                                                    animationDelay: `${0.06 * i}s`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-name",
                                                        children: p.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 937,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-track",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "chart-fill",
                                                            style: {
                                                                width: `${barPct}%`,
                                                                background: `linear-gradient(90deg, ${color}55, ${color}99)`,
                                                                animationDelay: `${0.1 * i}s`
                                                            },
                                                            children: [
                                                                p.score,
                                                                "/",
                                                                p.total
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 939,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 938,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-label",
                                                        style: {
                                                            color
                                                        },
                                                        children: [
                                                            Math.round(pct * 100),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 950,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 936,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 930,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stats-title",
                                        children: "Speed Ranking (avg time/question)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 957,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bar-chart",
                                        children: [
                                            ...rankedPlayers
                                        ].sort((a, b)=>a.timeTaken - b.timeTaken).map((p, i)=>{
                                            const maxTime = Math.max(...rankedPlayers.map((x)=>x.timeTaken));
                                            const barPct = Math.round((maxTime - p.timeTaken) / maxTime * 100 + 10);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "chart-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-name",
                                                        children: p.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 966,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-track",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "chart-fill",
                                                            style: {
                                                                width: `${barPct}%`,
                                                                background: i === 0 ? "linear-gradient(90deg, #34d39955, #34d399aa)" : "linear-gradient(90deg, #47556955, #47556988)",
                                                                animationDelay: `${0.1 * i}s`
                                                            },
                                                            children: [
                                                                p.timeTaken,
                                                                "s"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                            lineNumber: 968,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "chart-label",
                                                        style: {
                                                            color: i === 0 ? "#34d399" : "#475569"
                                                        },
                                                        children: i === 0 ? "⚡" : ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                        lineNumber: 981,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                                lineNumber: 965,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 958,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                lineNumber: 907,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divider"
                            }, void 0, false, {
                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                lineNumber: 991,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cta-section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "cta-label",
                                        children: "Inspired? Make your own quiz."
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 995,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "create-btn",
                                        onClick: ()=>router.push("/create"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "✦ Create Your Own Quiz"
                                        }, void 0, false, {
                                            fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                            lineNumber: 997,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 996,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "play-again-btn",
                                        onClick: ()=>router.push(`/game/${params.id}`),
                                        children: "↩ Play Again"
                                    }, void 0, false, {
                                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                        lineNumber: 999,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                                lineNumber: 994,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/leaderboard/[id]/page.tsx",
                        lineNumber: 669,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/leaderboard/[id]/page.tsx",
                lineNumber: 661,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(LeaderboardPage, "QsIHQXa3mEvENDCjHfZwNdQ0wpU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LeaderboardPage;
var _c;
__turbopack_context__.k.register(_c, "LeaderboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_5503fe40._.js.map