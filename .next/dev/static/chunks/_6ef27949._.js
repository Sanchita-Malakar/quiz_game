(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/game/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GamePage
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
const OPTION_META = [
    {
        label: "A",
        color: "#818cf8",
        glow: "rgba(129,140,248,0.4)"
    },
    {
        label: "B",
        color: "#f472b6",
        glow: "rgba(244,114,182,0.4)"
    },
    {
        label: "C",
        color: "#34d399",
        glow: "rgba(52,211,153,0.4)"
    },
    {
        label: "D",
        color: "#fb923c",
        glow: "rgba(251,146,60,0.4)"
    }
];
function GamePage({ params }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // ── Quiz Fetch State ───────────────────────────────────────────────────────
    const [quiz, setQuiz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fetchError, setFetchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            async function loadQuiz() {
                try {
                    const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BASE_URL || "";
                    const res = await fetch(`${baseUrl}/api/quiz/${params.id}`, {
                        cache: "no-store"
                    });
                    if (!res.ok) {
                        throw new Error(`Failed to fetch quiz (status ${res.status})`);
                    }
                    const data = await res.json();
                    setQuiz(data);
                } catch (err) {
                    setFetchError(err instanceof Error ? err.message : "Failed to load quiz.");
                } finally{
                    setLoading(false);
                }
            }
            loadQuiz();
        }
    }["GamePage.useEffect"], [
        params.id
    ]);
    // ── State ──────────────────────────────────────────────────────────────────
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("name");
    const [playerName, setPlayerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [nameError, setNameError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [currentQ, setCurrentQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [locked, setLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [timerActive, setTimerActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCorrect, setShowCorrect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [questionStart, setQuestionStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Date.now());
    const [animating, setAnimating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confettiPieces, setConfettiPieces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const totalQuestions = quiz?.questions?.length ?? 0;
    const question = quiz?.questions?.[currentQ];
    // ── Timer ──────────────────────────────────────────────────────────────────
    const stopTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GamePage.useCallback[stopTimer]": ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
            setTimerActive(false);
        }
    }["GamePage.useCallback[stopTimer]"], []);
    const startTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GamePage.useCallback[startTimer]": ()=>{
            if (!quiz) return;
            setTimeLeft(quiz.totalTime);
            setQuestionStart(Date.now());
            setTimerActive(true);
        }
    }["GamePage.useCallback[startTimer]"], [
        quiz
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            if (!timerActive) return;
            timerRef.current = setInterval({
                "GamePage.useEffect": ()=>{
                    setTimeLeft({
                        "GamePage.useEffect": (t)=>{
                            if (t <= 1) {
                                stopTimer();
                                handleTimeout();
                                return 0;
                            }
                            return t - 1;
                        }
                    }["GamePage.useEffect"]);
                }
            }["GamePage.useEffect"], 1000);
            return ({
                "GamePage.useEffect": ()=>{
                    if (timerRef.current) clearInterval(timerRef.current);
                }
            })["GamePage.useEffect"];
        }
    }["GamePage.useEffect"], [
        timerActive,
        stopTimer
    ]);
    const handleTimeout = ()=>{
        if (locked || !quiz || !question) return;
        setLocked(true);
        setShowCorrect(true);
        const record = {
            questionId: question.id,
            selected: "",
            correct: false,
            timeTaken: quiz.totalTime
        };
        setAnswers((prev)=>{
            const newAnswers = [
                ...prev,
                record
            ];
            setTimeout(()=>advanceQuestion(newAnswers), 1800);
            return newAnswers;
        });
    };
    // ── Game Flow ──────────────────────────────────────────────────────────────
    const startGame = ()=>{
        if (!playerName.trim()) {
            setNameError("Please enter your name to play!");
            return;
        }
        if (playerName.trim().length < 2) {
            setNameError("Name must be at least 2 characters.");
            return;
        }
        setNameError("");
        setPhase("playing");
        startTimer();
    };
    const selectOption = (idx)=>{
        if (locked) return;
        setSelected(idx);
    };
    const submitAnswer = ()=>{
        if (selected === null || locked || !quiz || !question) return;
        stopTimer();
        setLocked(true);
        setShowCorrect(true);
        const timeTaken = Math.round((Date.now() - questionStart) / 1000);
        const correct = selected === question.correctIndex;
        const record = {
            questionId: question.id,
            selected: question.options[selected],
            correct,
            timeTaken
        };
        const newAnswers = [
            ...answers,
            record
        ];
        setAnswers(newAnswers);
        setTimeout(()=>advanceQuestion(newAnswers), 1800);
    };
    const advanceQuestion = (currentAnswers)=>{
        if (currentQ < totalQuestions - 1) {
            setAnimating(true);
            setTimeout(()=>{
                setCurrentQ((q)=>q + 1);
                setSelected(null);
                setLocked(false);
                setShowCorrect(false);
                setAnimating(false);
                startTimer();
            }, 350);
        } else {
            finishGame(currentAnswers);
        }
    };
    const finishGame = (finalAnswers)=>{
        setConfettiPieces(Array.from({
            length: 40
        }, (_, i)=>({
                x: Math.random() * 100,
                color: [
                    "#818cf8",
                    "#f472b6",
                    "#34d399",
                    "#fb923c",
                    "#fbbf24"
                ][i % 5],
                delay: Math.random() * 0.8,
                rot: Math.random() * 360
            })));
        setPhase("result");
    };
    // ── Score Calculation ──────────────────────────────────────────────────────
    const score = answers.filter((a)=>a.correct).length;
    const pct = totalQuestions > 0 ? Math.round(score / totalQuestions * 100) : 0;
    const avgTime = answers.length ? Math.round(answers.reduce((s, a)=>s + a.timeTaken, 0) / answers.length) : 0;
    const getResultTier = ()=>{
        if (pct === 100) return {
            emoji: "🏆",
            label: "PERFECT SCORE!",
            color: "#fbbf24",
            sub: "You know them better than they know themselves."
        };
        if (pct >= 75) return {
            emoji: "🔥",
            label: "Best Friend Material",
            color: "#34d399",
            sub: "You genuinely pay attention. Rare."
        };
        if (pct >= 50) return {
            emoji: "😌",
            label: "Decent Friend",
            color: "#818cf8",
            sub: "You know the highlights. The details? Not so much."
        };
        if (pct >= 25) return {
            emoji: "😅",
            label: "Acquaintance Energy",
            color: "#fb923c",
            sub: "You've definitely met them before, at least."
        };
        return {
            emoji: "💀",
            label: "Total Stranger",
            color: "#f472b6",
            sub: "Did you even try?"
        };
    };
    const tier = getResultTier();
    const timerPct = quiz ? timeLeft / quiz.totalTime * 100 : 100;
    const timerColor = timeLeft > 10 ? "#34d399" : timeLeft > 5 ? "#fb923c" : "#f87171";
    // Add this to your GamePage component
    const saveResult = async ()=>{
        if (!quiz || phase !== "result") return;
        try {
            const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BASE_URL || "";
            await fetch(`${baseUrl}/api/quiz/${params.id}/results`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playerName,
                    score,
                    total: totalQuestions,
                    timeTaken: avgTime,
                    avatar: "⭐"
                })
            });
        } catch (error) {
            console.error("Failed to save result:", error);
        }
    };
    // Call saveResult when phase changes to result
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            if (phase === "result") {
                saveResult();
            }
        }
    }["GamePage.useEffect"], [
        phase
    ]);
    // ── Loading / Error States ─────────────────────────────────────────────────
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { width: 100%; min-height: 100vh; background: #06070f; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; }
          .loader-wrap { display: flex; flex-direction: column; align-items: center; gap: 18px; }
          .spinner { width: 44px; height: 44px; border: 3px solid rgba(129,140,248,0.15); border-top-color: #818cf8; border-radius: 50%; animation: spin 0.8s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
          .loader-text { color: #475569; font-size: 0.9rem; letter-spacing: 0.04em; }
        `
                }, void 0, false, {
                    fileName: "[project]/app/game/[id]/page.tsx",
                    lineNumber: 251,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "loader-wrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "spinner"
                        }, void 0, false, {
                            fileName: "[project]/app/game/[id]/page.tsx",
                            lineNumber: 260,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "loader-text",
                            children: "Loading quiz…"
                        }, void 0, false, {
                            fileName: "[project]/app/game/[id]/page.tsx",
                            lineNumber: 261,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/game/[id]/page.tsx",
                    lineNumber: 259,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    if (fetchError || !quiz) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { width: 100%; min-height: 100vh; background: #06070f; font-family: 'DM Sans', sans-serif; color: #f1f5f9; display: flex; align-items: center; justify-content: center; padding: 24px; }
          .err-card { background: rgba(10,12,28,0.88); border: 1px solid rgba(248,113,113,0.2); border-radius: 24px; padding: 40px 32px; text-align: center; max-width: 440px; width: 100%; backdrop-filter: blur(20px); }
          .err-emoji { font-size: 2.5rem; margin-bottom: 14px; display: block; }
          .err-title { font-size: 1.3rem; font-weight: 700; color: #f87171; margin-bottom: 8px; }
          .err-msg { font-size: 0.88rem; color: #475569; margin-bottom: 28px; }
          .err-btn { padding: 13px 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #94a3b8; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; font-family: inherit; }
          .err-btn:hover { border-color: rgba(255,255,255,0.2); color: #f1f5f9; }
        `
                }, void 0, false, {
                    fileName: "[project]/app/game/[id]/page.tsx",
                    lineNumber: 270,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "err-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "err-emoji",
                            children: "😵"
                        }, void 0, false, {
                            fileName: "[project]/app/game/[id]/page.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "err-title",
                            children: "Quiz Not Found"
                        }, void 0, false, {
                            fileName: "[project]/app/game/[id]/page.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "err-msg",
                            children: fetchError || "This quiz doesn't exist or has been removed."
                        }, void 0, false, {
                            fileName: "[project]/app/game/[id]/page.tsx",
                            lineNumber: 283,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "err-btn",
                            onClick: ()=>router.push("/"),
                            children: "← Back to Home"
                        }, void 0, false, {
                            fileName: "[project]/app/game/[id]/page.tsx",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/game/[id]/page.tsx",
                    lineNumber: 280,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
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

        /* ── Background ── */
                .bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .bg-base {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 55% at 15% 15%, rgba(99,102,241,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 50% 45% at 85% 85%, rgba(168,85,247,0.16) 0%, transparent 50%),
            radial-gradient(ellipse 35% 35% at 50% 50%, rgba(244,114,182,0.06) 0%, transparent 55%),
            linear-gradient(160deg, #060818 0%, #0c0e20 60%, #06070f 100%);
        }
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        .bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%);
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
          padding: 24px 16px 60px;
        }

        /* ── Card ── */
        .card {
          width: 100%;
          max-width: 600px;
          background: rgba(10,12,28,0.88);
          border: 1px solid rgba(99,102,241,0.16);
          border-radius: 28px;
          padding: 40px 36px;
          backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.07),
            0 40px 100px rgba(0,0,0,0.6),
            0 0 80px rgba(99,102,241,0.09);
          animation: cardIn 0.55s cubic-bezier(.22,.68,0,1.2) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── NAME PHASE ── */
        .name-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 0.72rem;
          color: #a5b4fc;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .name-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #818cf8;
          animation: blink 2s ease infinite;
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50% { opacity: 0.3; }
        }

        .name-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.6rem, 5vw, 2.2rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 8px;
          color: #f8fafc;
        }
        .name-title .hi { font-style: italic; }
        .grad {
          background: linear-gradient(120deg, #818cf8 0%, #c084fc 60%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .name-sub {
          font-size: 0.9rem;
          color: #475569;
          font-weight: 300;
          margin-bottom: 36px;
          line-height: 1.6;
        }

        .name-field-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 8px;
          display: block;
        }
        .name-input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px;
          color: #f1f5f9;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
          margin-bottom: 6px;
        }
        .name-input::placeholder { color: #334155; }
        .name-input:focus {
          border-color: rgba(129,140,248,0.5);
          background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .name-input.error {
          border-color: rgba(248,113,113,0.5);
          box-shadow: 0 0 0 3px rgba(248,113,113,0.1);
        }
        .error-msg {
          font-size: 0.78rem;
          color: #f87171;
          margin-bottom: 20px;
          height: 18px;
        }

        .start-btn {
          width: 100%;
          padding: 16px 24px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #9333ea);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 30px rgba(99,102,241,0.35);
          position: relative;
          overflow: hidden;
        }
        .start-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #6366f1, #a855f7, #c084fc);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .start-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 40px rgba(99,102,241,0.55); }
        .start-btn:hover::before { opacity: 1; }
        .start-btn span { position: relative; z-index: 1; }

        .name-stats {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .name-stat { text-align: center; }
        .name-stat-val {
          font-family: 'Fraunces', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #e2e8f0;
        }
        .name-stat-label {
          font-size: 0.7rem;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        /* ── PLAYING PHASE ── */
        .play-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .play-author { font-size: 0.78rem; color: #64748b; font-weight: 400; }
        .play-author strong { color: #a5b4fc; font-weight: 600; }
        .q-counter { font-size: 0.72rem; color: #475569; font-weight: 500; letter-spacing: 0.06em; }

        .timer-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .timer-ring-wrap {
          position: relative;
          width: 44px; height: 44px;
          flex-shrink: 0;
        }
        .timer-ring-svg { transform: rotate(-90deg); }
        .timer-ring-bg { fill: none; stroke: rgba(255,255,255,0.07); stroke-width: 3; }
        .timer-ring-fill { fill: none; stroke-width: 3; stroke-linecap: round; transition: stroke-dashoffset 0.9s linear, stroke 0.4s; }
        .timer-number {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fraunces', serif;
          font-size: 0.9rem;
          font-weight: 700;
          transition: color 0.4s;
        }
        .timer-bar-wrap { flex: 1; height: 5px; background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; }
        .timer-bar { height: 100%; border-radius: 99px; transition: width 0.9s linear, background 0.4s; }

        .progress-dots { display: flex; gap: 6px; margin-bottom: 28px; }
        .progress-dot {
          height: 4px;
          flex: 1;
          border-radius: 99px;
          background: rgba(255,255,255,0.08);
          transition: background 0.35s;
        }
        .progress-dot.done { background: #818cf8; }
        .progress-dot.correct { background: #34d399; }
        .progress-dot.wrong { background: #f87171; }
        .progress-dot.active { background: rgba(129,140,248,0.4); animation: dotPulse 1.2s ease infinite; }
        @keyframes dotPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

        .question-text {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.15rem, 3.5vw, 1.55rem);
          font-weight: 700;
          color: #f8fafc;
          line-height: 1.35;
          margin-bottom: 24px;
          text-align: center;
        }

        .q-image {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          border-radius: 16px;
          margin-bottom: 24px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .options-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .option-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.18s;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          animation: optIn 0.35s ease both;
        }
        .option-btn:nth-child(1) { animation-delay: 0.05s; }
        .option-btn:nth-child(2) { animation-delay: 0.1s; }
        .option-btn:nth-child(3) { animation-delay: 0.15s; }
        .option-btn:nth-child(4) { animation-delay: 0.2s; }
        @keyframes optIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .option-btn:not(.locked):hover {
          border-color: var(--opt-color);
          background: var(--opt-glow-bg);
          transform: translateX(4px);
        }
        .option-btn.selected {
          border-color: var(--opt-color);
          background: var(--opt-glow-bg);
          box-shadow: 0 0 20px var(--opt-glow);
        }
        .option-btn.reveal-correct {
          border-color: #34d399 !important;
          background: rgba(52,211,153,0.1) !important;
          box-shadow: 0 0 20px rgba(52,211,153,0.3) !important;
        }
        .option-btn.reveal-wrong {
          border-color: #f87171 !important;
          background: rgba(248,113,113,0.08) !important;
          opacity: 0.7;
        }
        .option-btn.locked { cursor: default; }

        .opt-label {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
          background: var(--opt-label-bg);
          color: var(--opt-color);
          transition: all 0.18s;
        }
                .opt-text { font-size: 0.95rem; color: #cbd5e1; font-weight: 400; flex: 1; }
        .opt-icon { font-size: 1rem; flex-shrink: 0; }

        .submit-btn {
          width: 100%;
          padding: 15px 24px;
          border-radius: 14px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          position: relative;
          overflow: hidden;
        }
        .submit-btn:not(:disabled) {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff;
          box-shadow: 0 0 28px rgba(99,102,241,0.35);
        }
        .submit-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(99,102,241,0.5);
        }
        .submit-btn:disabled {
          background: rgba(255,255,255,0.06);
          color: #334155;
          cursor: not-allowed;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .submit-btn:not(:disabled):hover::before { opacity: 1; }
        .submit-btn span { position: relative; z-index: 1; }

        .timeout-msg {
          text-align: center;
          font-size: 0.8rem;
          color: #f87171;
          margin-top: 10px;
          animation: fadeUp 0.3s ease;
        }

        .q-wrap { transition: opacity 0.3s, transform 0.3s; }
        .q-wrap.animating { opacity: 0; transform: translateX(30px); }

        /* ── RESULT PHASE ── */
        .result-card { text-align: center; }
        .confetti-wrap {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999;
          overflow: hidden;
        }
        .confetti-piece {
          position: absolute;
          top: -20px;
          width: 8px; height: 8px;
          border-radius: 2px;
          animation: confettiFall linear both;
        }
        @keyframes confettiFall {
          from { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          to   { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }

        .result-emoji {
          font-size: 3.5rem;
          margin-bottom: 12px;
          display: block;
          animation: popIn 0.5s cubic-bezier(.22,.68,0,1.5) 0.2s both;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }

        .result-tier {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.5rem, 5vw, 2rem);
          font-weight: 900;
          margin-bottom: 6px;
          animation: fadeUp 0.5s ease 0.35s both;
        }
        .result-sub {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 300;
          margin-bottom: 32px;
          animation: fadeUp 0.5s ease 0.45s both;
        }

        .score-ring-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
          animation: fadeUp 0.5s ease 0.3s both;
        }
        .score-ring-inner { position: relative; width: 140px; height: 140px; }
        .score-ring-svg { transform: rotate(-90deg); }
        .score-ring-bg { fill: none; stroke: rgba(255,255,255,0.06); stroke-width: 8; }
        .score-ring-fill {
          fill: none;
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1) 0.5s;
        }
        .score-ring-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .score-big { font-family: 'Fraunces', serif; font-size: 2.6rem; font-weight: 900; line-height: 1; }
        .score-denom { font-size: 0.8rem; color: #475569; margin-top: 2px; }

        .result-stats {
          display: flex;
          gap: 0;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 28px;
          animation: fadeUp 0.5s ease 0.55s both;
        }
        .result-stat {
          flex: 1;
          padding: 16px 12px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
        }
        .result-stat:last-child { border-right: none; }
        .result-stat-val { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 700; }
        .result-stat-label { font-size: 0.68rem; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; }

        .breakdown {
          text-align: left;
          margin-bottom: 28px;
          animation: fadeUp 0.5s ease 0.65s both;
        }
        .breakdown-title {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 12px;
        }
        .breakdown-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .breakdown-row:last-child { border-bottom: none; }
        .bd-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
        .bd-question { flex: 1; }
        .bd-q-text { font-size: 0.82rem; color: #94a3b8; margin-bottom: 3px; line-height: 1.4; }
        .bd-answer { font-size: 0.78rem; font-weight: 500; }
        .bd-time { font-size: 0.7rem; color: #334155; flex-shrink: 0; margin-top: 2px; }

        .result-btns {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeUp 0.5s ease 0.75s both;
        }
        .lb-btn {
          width: 100%;
          padding: 15px 24px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 0 28px rgba(99,102,241,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lb-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(99,102,241,0.5); }
        .home-btn {
          width: 100%;
          padding: 13px 24px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          color: #64748b;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .home-btn:hover { border-color: rgba(255,255,255,0.18); color: #94a3b8; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 540px) {
          .card { padding: 28px 20px; border-radius: 20px; }
          .result-stats { flex-wrap: wrap; }
          .result-stat { min-width: 50%; }
          .result-stat:nth-child(2) { border-right: none; }
          .result-stat:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.07); border-right: none; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/game/[id]/page.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-base"
                    }, void 0, false, {
                        fileName: "[project]/app/game/[id]/page.tsx",
                        lineNumber: 864,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-grid"
                    }, void 0, false, {
                        fileName: "[project]/app/game/[id]/page.tsx",
                        lineNumber: 865,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-vignette"
                    }, void 0, false, {
                        fileName: "[project]/app/game/[id]/page.tsx",
                        lineNumber: 866,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/game/[id]/page.tsx",
                lineNumber: 863,
                columnNumber: 7
            }, this),
            phase === "result" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "confetti-wrap",
                children: confettiPieces.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "confetti-piece",
                        style: {
                            left: `${p.x}%`,
                            background: p.color,
                            animationDuration: `${1.8 + Math.random() * 1.5}s`,
                            animationDelay: `${p.delay}s`,
                            transform: `rotate(${p.rot}deg)`
                        }
                    }, i, false, {
                        fileName: "[project]/app/game/[id]/page.tsx",
                        lineNumber: 873,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/game/[id]/page.tsx",
                lineNumber: 871,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card",
                    children: [
                        phase === "name" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "name-eyebrow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "name-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 895,
                                            columnNumber: 17
                                        }, this),
                                        "Live Quiz"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 894,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "name-title",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hi",
                                            children: "Hey!"
                                        }, void 0, false, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 900,
                                            columnNumber: 17
                                        }, this),
                                        " Ready to Explore....!!",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "grad",
                                            children: quiz.author
                                        }, void 0, false, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 901,
                                            columnNumber: 17
                                        }, this),
                                        "?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 899,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "name-sub",
                                    children: [
                                        totalQuestions,
                                        " questions · ",
                                        quiz.totalTime,
                                        "s per question · No second chances."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 903,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "name-field-label",
                                    children: "Your Name"
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 907,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: `name-input${nameError ? " error" : ""}`,
                                    type: "text",
                                    placeholder: "Enter your name…",
                                    value: playerName,
                                    maxLength: 24,
                                    onChange: (e)=>{
                                        setPlayerName(e.target.value);
                                        if (nameError) setNameError("");
                                    },
                                    onKeyDown: (e)=>e.key === "Enter" && startGame(),
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 908,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "error-msg",
                                    children: nameError
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 921,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "start-btn",
                                    onClick: startGame,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "▶ Start the Quiz"
                                    }, void 0, false, {
                                        fileName: "[project]/app/game/[id]/page.tsx",
                                        lineNumber: 924,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 923,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "name-stats",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "name-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "name-stat-val",
                                                    children: totalQuestions
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 929,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "name-stat-label",
                                                    children: "Questions"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 930,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 928,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "name-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "name-stat-val",
                                                    children: [
                                                        quiz.totalTime,
                                                        "s"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 933,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "name-stat-label",
                                                    children: "Per Question"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 934,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 932,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "name-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "name-stat-val",
                                                    children: "1×"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 937,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "name-stat-label",
                                                    children: "Attempt"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 938,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 936,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 927,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/game/[id]/page.tsx",
                            lineNumber: 893,
                            columnNumber: 13
                        }, this),
                        phase === "playing" && question && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `q-wrap${animating ? " animating" : ""}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "play-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "play-author",
                                            children: [
                                                "Quiz by ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: quiz.author
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 950,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 949,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "q-counter",
                                            children: [
                                                currentQ + 1,
                                                " / ",
                                                totalQuestions
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 952,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 948,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "timer-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "timer-ring-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "timer-ring-svg",
                                                    width: "44",
                                                    height: "44",
                                                    viewBox: "0 0 44 44",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "timer-ring-bg",
                                                            cx: "22",
                                                            cy: "22",
                                                            r: "18"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/game/[id]/page.tsx",
                                                            lineNumber: 960,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "timer-ring-fill",
                                                            cx: "22",
                                                            cy: "22",
                                                            r: "18",
                                                            stroke: timerColor,
                                                            strokeDasharray: `${2 * Math.PI * 18}`,
                                                            strokeDashoffset: `${2 * Math.PI * 18 * (1 - timerPct / 100)}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/game/[id]/page.tsx",
                                                            lineNumber: 961,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 959,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "timer-number",
                                                    style: {
                                                        color: timerColor
                                                    },
                                                    children: timeLeft
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 969,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 958,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "timer-bar-wrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "timer-bar",
                                                style: {
                                                    width: `${timerPct}%`,
                                                    background: timeLeft > 10 ? "linear-gradient(90deg, #34d399, #6ee7b7)" : timeLeft > 5 ? "linear-gradient(90deg, #fb923c, #fbbf24)" : "linear-gradient(90deg, #f87171, #fb923c)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/game/[id]/page.tsx",
                                                lineNumber: 974,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 973,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 957,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "progress-dots",
                                    children: quiz.questions.map((q, i)=>{
                                        const ans = answers.find((a)=>a.questionId === q.id);
                                        let cls = "progress-dot";
                                        if (ans) cls += ans.correct ? " correct" : " wrong";
                                        else if (i === currentQ) cls += " active";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: cls
                                        }, i, false, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 994,
                                            columnNumber: 26
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 988,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "question-text",
                                    children: question.text
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 998,
                                    columnNumber: 15
                                }, this),
                                question.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    className: "q-image",
                                    src: question.image,
                                    alt: "Question"
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1001,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "options-list",
                                    children: question.options.map((opt, j)=>{
                                        const meta = OPTION_META[j];
                                        const isSelected = selected === j;
                                        const isCorrect = question.correctIndex === j;
                                        let extraClass = "";
                                        if (showCorrect) {
                                            if (isCorrect) extraClass = " reveal-correct";
                                            else if (isSelected && !isCorrect) extraClass = " reveal-wrong";
                                        } else if (isSelected) {
                                            extraClass = " selected";
                                        }
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `option-btn${locked ? " locked" : ""}${extraClass}`,
                                            style: {
                                                "--opt-color": meta.color,
                                                "--opt-glow": meta.glow,
                                                "--opt-glow-bg": `${meta.color}12`,
                                                "--opt-label-bg": isSelected || showCorrect && isCorrect ? `${meta.color}22` : "rgba(255,255,255,0.05)"
                                            },
                                            onClick: ()=>selectOption(j),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "opt-label",
                                                    children: meta.label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1032,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "opt-text",
                                                    children: opt
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1033,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "opt-icon",
                                                    children: showCorrect && isCorrect ? "✓" : showCorrect && isSelected && !isCorrect ? "✕" : ""
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1034,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, j, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 1019,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1004,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "submit-btn",
                                    disabled: selected === null || locked,
                                    onClick: submitAnswer,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: locked ? showCorrect ? answers[answers.length - 1]?.correct ? "✓ Correct! Moving on…" : "✕ Wrong. Moving on…" : "…" : "Lock In Answer →"
                                    }, void 0, false, {
                                        fileName: "[project]/app/game/[id]/page.tsx",
                                        lineNumber: 1047,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1042,
                                    columnNumber: 15
                                }, this),
                                timeLeft === 0 && locked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "timeout-msg",
                                    children: "⏱ Time's up!"
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1059,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/game/[id]/page.tsx",
                            lineNumber: 946,
                            columnNumber: 13
                        }, this),
                        phase === "result" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "result-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "result-emoji",
                                    children: tier.emoji
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1068,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "result-tier",
                                    style: {
                                        color: tier.color
                                    },
                                    children: tier.label
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1069,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "result-sub",
                                    children: tier.sub
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1070,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "score-ring-wrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "score-ring-inner",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "score-ring-svg",
                                                width: "140",
                                                height: "140",
                                                viewBox: "0 0 140 140",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        className: "score-ring-bg",
                                                        cx: "70",
                                                        cy: "70",
                                                        r: "58"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/game/[id]/page.tsx",
                                                        lineNumber: 1075,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        className: "score-ring-fill",
                                                        cx: "70",
                                                        cy: "70",
                                                        r: "58",
                                                        stroke: tier.color,
                                                        strokeDasharray: `${2 * Math.PI * 58}`,
                                                        strokeDashoffset: `${2 * Math.PI * 58 * (1 - pct / 100)}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/game/[id]/page.tsx",
                                                        lineNumber: 1076,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/game/[id]/page.tsx",
                                                lineNumber: 1074,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "score-ring-text",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "score-big",
                                                        style: {
                                                            color: tier.color
                                                        },
                                                        children: score
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/game/[id]/page.tsx",
                                                        lineNumber: 1085,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "score-denom",
                                                        children: [
                                                            "of ",
                                                            totalQuestions
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/game/[id]/page.tsx",
                                                        lineNumber: 1086,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/game/[id]/page.tsx",
                                                lineNumber: 1084,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/game/[id]/page.tsx",
                                        lineNumber: 1073,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1072,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "result-stats",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "result-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "result-stat-val",
                                                    style: {
                                                        color: "#818cf8"
                                                    },
                                                    children: [
                                                        pct,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1093,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "result-stat-label",
                                                    children: "Accuracy"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1094,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 1092,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "result-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "result-stat-val",
                                                    style: {
                                                        color: "#34d399"
                                                    },
                                                    children: [
                                                        avgTime,
                                                        "s"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1097,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "result-stat-label",
                                                    children: "Avg Time"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1098,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 1096,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "result-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "result-stat-val",
                                                    style: {
                                                        color: "#f472b6"
                                                    },
                                                    children: answers.filter((a)=>a.correct).length
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1101,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "result-stat-label",
                                                    children: "Correct"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1104,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 1100,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "result-stat",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "result-stat-val",
                                                    style: {
                                                        color: "#fb923c"
                                                    },
                                                    children: answers.filter((a)=>!a.correct).length
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1107,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "result-stat-label",
                                                    children: "Wrong"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/game/[id]/page.tsx",
                                                    lineNumber: 1110,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 1106,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1091,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "breakdown",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "breakdown-title",
                                            children: "Your Answers"
                                        }, void 0, false, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 1115,
                                            columnNumber: 17
                                        }, this),
                                        quiz.questions.map((q, i)=>{
                                            const ans = answers[i];
                                            if (!ans) return null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "breakdown-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bd-icon",
                                                        children: ans.correct ? "✅" : "❌"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/game/[id]/page.tsx",
                                                        lineNumber: 1121,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bd-question",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bd-q-text",
                                                                children: q.text
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/game/[id]/page.tsx",
                                                                lineNumber: 1123,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bd-answer",
                                                                style: {
                                                                    color: ans.correct ? "#34d399" : "#f87171"
                                                                },
                                                                children: [
                                                                    ans.selected || "No answer",
                                                                    " ",
                                                                    !ans.correct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            color: "#475569",
                                                                            fontWeight: 400
                                                                        },
                                                                        children: [
                                                                            "→ ",
                                                                            q.options[q.correctIndex]
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/game/[id]/page.tsx",
                                                                        lineNumber: 1130,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/game/[id]/page.tsx",
                                                                lineNumber: 1124,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/game/[id]/page.tsx",
                                                        lineNumber: 1122,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bd-time",
                                                        children: [
                                                            ans.timeTaken,
                                                            "s"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/game/[id]/page.tsx",
                                                        lineNumber: 1136,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, q.id, true, {
                                                fileName: "[project]/app/game/[id]/page.tsx",
                                                lineNumber: 1120,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1114,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "result-btns",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "lb-btn",
                                            onClick: ()=>router.push(`/leaderboard/${params.id}`),
                                            children: "🏆 View Leaderboard"
                                        }, void 0, false, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 1143,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "home-btn",
                                            onClick: ()=>router.push("/"),
                                            children: "← Back to Home"
                                        }, void 0, false, {
                                            fileName: "[project]/app/game/[id]/page.tsx",
                                            lineNumber: 1149,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/game/[id]/page.tsx",
                                    lineNumber: 1142,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/game/[id]/page.tsx",
                            lineNumber: 1066,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/game/[id]/page.tsx",
                    lineNumber: 889,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/game/[id]/page.tsx",
                lineNumber: 888,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(GamePage, "SLDFYlOiQ/6JBLci5FHbG5TEbWI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = GamePage;
var _c;
__turbopack_context__.k.register(_c, "GamePage");
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

//# sourceMappingURL=_6ef27949._.js.map