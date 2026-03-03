"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback, use } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Question {
  id: string;
  text: string;
  image?: string | null;
  options: string[];
  correctIndex: number;
}

interface Quiz {
  id: string;
  title: string;
  author: string;
  totalTime: number;
  questions: Question[];
}

interface AnswerRecord {
  questionId: string;
  selected: string;
  correct: boolean;
  timeTaken: number;
}

type GamePhase = "name" | "playing" | "result";

const OPTION_META = [
  { label: "A", color: "#818cf8", glow: "rgba(129,140,248,0.4)" },
  { label: "B", color: "#f472b6", glow: "rgba(244,114,182,0.4)" },
  { label: "C", color: "#34d399", glow: "rgba(52,211,153,0.4)" },
  { label: "D", color: "#fb923c", glow: "rgba(251,146,60,0.4)" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
  const router = useRouter();

  // ── Quiz Fetch State ───────────────────────────────────────────────────────
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [fetchError, setFetchError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadQuiz() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const res = await fetch(`${baseUrl}/api/quiz/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch quiz (status ${res.status})`);
        }
        const data = await res.json();
        setQuiz(data);
      } catch (err: unknown) {
        setFetchError(err instanceof Error ? err.message : "Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [id]);

  // ── State ──────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<GamePhase>("name");
  const [playerName, setPlayerName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);
  const [questionStart, setQuestionStart] = useState<number>(Date.now());
  const [animating, setAnimating] = useState<boolean>(false);
  const [confettiPieces, setConfettiPieces] = useState<{ x: number; color: string; delay: number; rot: number }[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalQuestions = quiz?.questions?.length ?? 0;
  const question = quiz?.questions?.[currentQ];

  // ── Timer ──────────────────────────────────────────────────────────────────
  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
  }, []);

  const startTimer = useCallback(() => {
    if (!quiz) return;
    setTimeLeft(quiz.totalTime);
    setQuestionStart(Date.now());
    setTimerActive(true);
  }, [quiz]);

  useEffect(() => {
    if (!timerActive) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, stopTimer]);

  const handleTimeout = () => {
    if (locked || !quiz || !question) return;
    setLocked(true);
    setShowCorrect(true);
    const record: AnswerRecord = {
      questionId: question.id,
      selected: "",
      correct: false,
      timeTaken: quiz.totalTime,
    };
    setAnswers((prev) => {
      const newAnswers = [...prev, record];
      setTimeout(() => advanceQuestion(newAnswers), 1800);
      return newAnswers;
    });
  };

  // ── Game Flow ──────────────────────────────────────────────────────────────
  const startGame = () => {
    if (!playerName.trim()) { setNameError("Please enter your name to play!"); return; }
    if (playerName.trim().length < 2) { setNameError("Name must be at least 2 characters."); return; }
    setNameError("");
    setPhase("playing");
    startTimer();
  };

  const selectOption = (idx: number) => {
    if (locked) return;
    setSelected(idx);
  };

  const submitAnswer = () => {
    if (selected === null || locked || !quiz || !question) return;
    stopTimer();
    setLocked(true);
    setShowCorrect(true);

    const timeTaken = Math.round((Date.now() - questionStart) / 1000);
    const correct = selected === question.correctIndex;
    const record: AnswerRecord = {
      questionId: question.id,
      selected: question.options[selected],
      correct,
      timeTaken,
    };
    const newAnswers = [...answers, record];
    setAnswers(newAnswers);

    setTimeout(() => advanceQuestion(newAnswers), 1800);
  };

  const advanceQuestion = (currentAnswers: AnswerRecord[]) => {
    if (currentQ < totalQuestions - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentQ((q) => q + 1);
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

  const finishGame = (finalAnswers: AnswerRecord[]) => {
    setConfettiPieces(
      Array.from({ length: 40 }, (_, i) => ({
        x: Math.random() * 100,
        color: ["#818cf8", "#f472b6", "#34d399", "#fb923c", "#fbbf24"][i % 5],
        delay: Math.random() * 0.8,
        rot: Math.random() * 360,
      }))
    );
    setPhase("result");
  };

  // ── Score Calculation ──────────────────────────────────────────────────────
  const score = answers.filter((a) => a.correct).length;
  const pct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const avgTime = answers.length
    ? Math.round(answers.reduce((s, a) => s + a.timeTaken, 0) / answers.length)
    : 0;

  const getResultTier = () => {
    if (pct === 100) return { emoji: "🏆", label: "PERFECT SCORE!", color: "#fbbf24", sub: "You know them better than they know themselves." };
    if (pct >= 75) return { emoji: "🔥", label: "Best Friend Material", color: "#34d399", sub: "You genuinely pay attention. Rare." };
    if (pct >= 50) return { emoji: "😌", label: "Decent Friend", color: "#818cf8", sub: "You know the highlights. The details? Not so much." };
    if (pct >= 25) return { emoji: "😅", label: "Acquaintance Energy", color: "#fb923c", sub: "You've definitely met them before, at least." };
    return { emoji: "💀", label: "Total Stranger", color: "#f472b6", sub: "Did you even try?" };
  };

  const tier = getResultTier();
  const timerPct = quiz ? (timeLeft / quiz.totalTime) * 100 : 100;
  const timerColor = timeLeft > 10 ? "#34d399" : timeLeft > 5 ? "#fb923c" : "#f87171";

  // Add this to your GamePage component

const saveResult = async () => {
  if (!quiz || phase !== "result") return;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    await fetch(`${baseUrl}/api/quiz/${id}/results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerName,
        score,
        total: totalQuestions,
        timeTaken: avgTime,
        avatar: "⭐", // You can add avatar selection in the name phase
      }),
    });
  } catch (error) {
    console.error("Failed to save result:", error);
  }
};

// Call saveResult when phase changes to result
useEffect(() => {
  if (phase === "result") {
    saveResult();
  }
}, [phase]);

  // ── Loading / Error States ─────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { width: 100%; min-height: 100vh; background: #06070f; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; }
          .loader-wrap { display: flex; flex-direction: column; align-items: center; gap: 18px; }
          .spinner { width: 44px; height: 44px; border: 3px solid rgba(129,140,248,0.15); border-top-color: #818cf8; border-radius: 50%; animation: spin 0.8s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
          .loader-text { color: #475569; font-size: 0.9rem; letter-spacing: 0.04em; }
        `}</style>
        <div className="loader-wrap">
          <div className="spinner" />
          <div className="loader-text">Loading quiz…</div>
        </div>
      </>
    );
  }

  if (fetchError || !quiz) {
    return (
      <>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { width: 100%; min-height: 100vh; background: #06070f; font-family: 'DM Sans', sans-serif; color: #f1f5f9; display: flex; align-items: center; justify-content: center; padding: 24px; }
          .err-card { background: rgba(10,12,28,0.88); border: 1px solid rgba(248,113,113,0.2); border-radius: 24px; padding: 40px 32px; text-align: center; max-width: 440px; width: 100%; backdrop-filter: blur(20px); }
          .err-emoji { font-size: 2.5rem; margin-bottom: 14px; display: block; }
          .err-title { font-size: 1.3rem; font-weight: 700; color: #f87171; margin-bottom: 8px; }
          .err-msg { font-size: 0.88rem; color: #475569; margin-bottom: 28px; }
          .err-btn { padding: 13px 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #94a3b8; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; font-family: inherit; }
          .err-btn:hover { border-color: rgba(255,255,255,0.2); color: #f1f5f9; }
        `}</style>
        <div className="err-card">
          <span className="err-emoji">😵</span>
          <div className="err-title">Quiz Not Found</div>
          <div className="err-msg">{fetchError || "This quiz doesn't exist or has been removed."}</div>
          <button className="err-btn" onClick={() => router.push("/")}>← Back to Home</button>
        </div>
      </>
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
      `}</style>

      {/* Background */}
      <div className="bg">
        <div className="bg-base" />
        <div className="bg-grid" />
        <div className="bg-vignette" />
      </div>

      {/* Confetti */}
      {phase === "result" && (
        <div className="confetti-wrap">
          {confettiPieces.map((p, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${p.x}%`,
                background: p.color,
                animationDuration: `${1.8 + Math.random() * 1.5}s`,
                animationDelay: `${p.delay}s`,
                transform: `rotate(${p.rot}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="page">
        <div className="card">

          {/* ══════════════════════ NAME PHASE ══════════════════════ */}
          {phase === "name" && (
            <div>
              <div className="name-eyebrow">
                <span className="name-dot" />
                Live Quiz
              </div>

              <h1 className="name-title">
                <span className="hi">Hey!</span> Ready to Explore....!!{" "}
                <span className="grad">{quiz.author}</span>?
              </h1>
              <p className="name-sub">
                {totalQuestions} questions · {quiz.totalTime}s per question · No second chances.
              </p>

              <label className="name-field-label">Your Name</label>
              <input
                className={`name-input${nameError ? " error" : ""}`}
                type="text"
                placeholder="Enter your name…"
                value={playerName}
                maxLength={24}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPlayerName(e.target.value);
                  if (nameError) setNameError("");
                }}
                onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && startGame()}
                autoFocus
              />
              <div className="error-msg">{nameError}</div>

              <button className="start-btn" onClick={startGame}>
                <span>▶ Start the Quiz</span>
              </button>

              <div className="name-stats">
                <div className="name-stat">
                  <div className="name-stat-val">{totalQuestions}</div>
                  <div className="name-stat-label">Questions</div>
                </div>
                <div className="name-stat">
                  <div className="name-stat-val">{quiz.totalTime}s</div>
                  <div className="name-stat-label">Per Question</div>
                </div>
                <div className="name-stat">
                  <div className="name-stat-val">1×</div>
                  <div className="name-stat-label">Attempt</div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════ PLAYING PHASE ══════════════════════ */}
          {phase === "playing" && question && (
            <div className={`q-wrap${animating ? " animating" : ""}`}>

              <div className="play-header">
                <span className="play-author">
                  Quiz by <strong>{quiz.author}</strong>
                </span>
                <span className="q-counter">
                  {currentQ + 1} / {totalQuestions}
                </span>
              </div>

              <div className="timer-wrap">
                <div className="timer-ring-wrap">
                  <svg className="timer-ring-svg" width="44" height="44" viewBox="0 0 44 44">
                    <circle className="timer-ring-bg" cx="22" cy="22" r="18" />
                    <circle
                      className="timer-ring-fill"
                      cx="22" cy="22" r="18"
                      stroke={timerColor}
                      strokeDasharray={`${2 * Math.PI * 18}`}
                      strokeDashoffset={`${2 * Math.PI * 18 * (1 - timerPct / 100)}`}
                    />
                  </svg>
                  <div className="timer-number" style={{ color: timerColor }}>
                    {timeLeft}
                  </div>
                </div>
                <div className="timer-bar-wrap">
                  <div
                    className="timer-bar"
                    style={{
                      width: `${timerPct}%`,
                      background: timeLeft > 10
                        ? "linear-gradient(90deg, #34d399, #6ee7b7)"
                        : timeLeft > 5
                          ? "linear-gradient(90deg, #fb923c, #fbbf24)"
                          : "linear-gradient(90deg, #f87171, #fb923c)",
                    }}
                  />
                </div>
              </div>

              <div className="progress-dots">
                {quiz.questions.map((q, i) => {
                  const ans = answers.find((a) => a.questionId === q.id);
                  let cls = "progress-dot";
                  if (ans) cls += ans.correct ? " correct" : " wrong";
                  else if (i === currentQ) cls += " active";
                  return <div key={i} className={cls} />;
                })}
              </div>

              <div className="question-text">{question.text}</div>

              {question.image && (
                <img className="q-image" src={question.image} alt="Question" />
              )}

              <div className="options-list">
                {question.options.map((opt, j) => {
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

                  return (
                    <button
                      key={j}
                      className={`option-btn${locked ? " locked" : ""}${extraClass}`}
                      style={{
                        "--opt-color": meta.color,
                        "--opt-glow": meta.glow,
                        "--opt-glow-bg": `${meta.color}12`,
                        "--opt-label-bg": isSelected || (showCorrect && isCorrect)
                          ? `${meta.color}22`
                          : "rgba(255,255,255,0.05)",
                      } as React.CSSProperties}
                      onClick={() => selectOption(j)}
                    >
                      <span className="opt-label">{meta.label}</span>
                      <span className="opt-text">{opt}</span>
                      <span className="opt-icon">
                        {showCorrect && isCorrect ? "✓" : showCorrect && isSelected && !isCorrect ? "✕" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                className="submit-btn"
                disabled={selected === null || locked}
                onClick={submitAnswer}
              >
                <span>
                  {locked
                    ? showCorrect
                      ? answers[answers.length - 1]?.correct
                        ? "✓ Correct! Moving on…"
                        : "✕ Wrong. Moving on…"
                      : "…"
                    : "Lock In Answer →"}
                </span>
              </button>

              {timeLeft === 0 && locked && (
                <div className="timeout-msg">⏱ Time's up!</div>
              )}
            </div>
          )}

          {/* ══════════════════════ RESULT PHASE ══════════════════════ */}
          {phase === "result" && (
            <div className="result-card">

              <span className="result-emoji">{tier.emoji}</span>
              <div className="result-tier" style={{ color: tier.color }}>{tier.label}</div>
              <div className="result-sub">{tier.sub}</div>

              <div className="score-ring-wrap">
                <div className="score-ring-inner">
                  <svg className="score-ring-svg" width="140" height="140" viewBox="0 0 140 140">
                    <circle className="score-ring-bg" cx="70" cy="70" r="58" />
                    <circle
                      className="score-ring-fill"
                      cx="70" cy="70" r="58"
                      stroke={tier.color}
                      strokeDasharray={`${2 * Math.PI * 58}`}
                      strokeDashoffset={`${2 * Math.PI * 58 * (1 - pct / 100)}`}
                    />
                  </svg>
                  <div className="score-ring-text">
                    <span className="score-big" style={{ color: tier.color }}>{score}</span>
                    <span className="score-denom">of {totalQuestions}</span>
                  </div>
                </div>
              </div>

              <div className="result-stats">
                <div className="result-stat">
                  <div className="result-stat-val" style={{ color: "#818cf8" }}>{pct}%</div>
                  <div className="result-stat-label">Accuracy</div>
                </div>
                <div className="result-stat">
                  <div className="result-stat-val" style={{ color: "#34d399" }}>{avgTime}s</div>
                  <div className="result-stat-label">Avg Time</div>
                </div>
                <div className="result-stat">
                  <div className="result-stat-val" style={{ color: "#f472b6" }}>
                    {answers.filter((a) => a.correct).length}
                  </div>
                  <div className="result-stat-label">Correct</div>
                </div>
                <div className="result-stat">
                  <div className="result-stat-val" style={{ color: "#fb923c" }}>
                    {answers.filter((a) => !a.correct).length}
                  </div>
                  <div className="result-stat-label">Wrong</div>
                </div>
              </div>

              <div className="breakdown">
                <div className="breakdown-title">Your Answers</div>
                {quiz.questions.map((q, i) => {
                  const ans = answers[i];
                  if (!ans) return null;
                  return (
                    <div key={q.id} className="breakdown-row">
                      <span className="bd-icon">{ans.correct ? "✅" : "❌"}</span>
                      <div className="bd-question">
                        <div className="bd-q-text">{q.text}</div>
                        <div
                          className="bd-answer"
                          style={{ color: ans.correct ? "#34d399" : "#f87171" }}
                        >
                          {ans.selected || "No answer"}{" "}
                          {!ans.correct && (
                            <span style={{ color: "#475569", fontWeight: 400 }}>
                              → {q.options[q.correctIndex]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="bd-time">{ans.timeTaken}s</div>
                    </div>
                  );
                })}
              </div>

              <div className="result-btns">
                <button
                  className="lb-btn"
                  onClick={() => router.push(`/leaderboard/${id}`)}
                >
                  🏆 View Leaderboard
                </button>
                <button
                  className="home-btn"
                  onClick={() => router.push("/")}
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}