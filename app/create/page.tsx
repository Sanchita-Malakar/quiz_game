// app/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Fraunces, DM_Sans } from "next/font/google";

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

interface Option { id: string; text: string; }
interface Question {
  id: string;
  question: string;
  options: Option[];
  correctIndex: number | null;
  imagePreview: string | null;
}

const uid = () => Math.random().toString(36).slice(2, 9);
const makeQuestion = (): Question => ({
  id: uid(),
  question: "",
  options: ["A", "B", "C", "D"].map((l) => ({ id: l, text: "" })),
  correctIndex: null,
  imagePreview: null,
});
const isQuestionComplete = (q: Question): boolean =>
  q.question.trim().length > 0 &&
  q.options.every((o) => o.text.trim().length > 0) &&
  q.correctIndex !== null &&
  q.correctIndex !== -1;

export default function CreatePage() {
  const router = useRouter();
  const supabase = createClient();

  // ─── ALL hooks at the top — no exceptions ─────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([makeQuestion()]);
  const [activeQ, setActiveQ] = useState<number>(0);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Auth check ────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/login");
      } finally {
        setLoadingAuth(false);
      }
    };
    checkAuth();
  }, []); // ✅ empty deps — runs once on mount

  // ─── Question mutations ────────────────────────────────────────────────────
  const updateQuestion = useCallback((text: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === activeQ ? { ...q, question: text } : q))
    );
  }, [activeQ]);

  const updateOption = useCallback((optIdx: number, text: string) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === activeQ
          ? { ...q, options: q.options.map((o, j) => (j === optIdx ? { ...o, text } : o)) }
          : q
      )
    );
  }, [activeQ]);

  const setCorrect = useCallback((optIdx: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === activeQ ? { ...q, correctIndex: optIdx === q.correctIndex ? null : optIdx } : q
      )
    );
  }, [activeQ]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, makeQuestion()]);
    setActiveQ(questions.length);
  };

  const removeQuestion = (idx: number) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
    setActiveQ((prev) => Math.min(prev, questions.length - 2));
  };

  // ─── Image handling ────────────────────────────────────────────────────────
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setQuestions((prev) =>
        prev.map((q, i) => (i === activeQ ? { ...q, imagePreview: result } : q))
      );
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const removeImage = () => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === activeQ ? { ...q, imagePreview: null } : q))
    );
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Generate quiz ─────────────────────────────────────────────────────────
  const generateLink = async () => {
    if (!canGenerate) return;
    setGenerating(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        router.push("/login");
        return;
      }
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title: quizTitle,
          author: "Quiz Creator",
          questions: questions.map((q) => ({
            question: q.question,
            options: q.options.map((o) => o.text),
            correctIndex: q.correctIndex,
            image: q.imagePreview,
          })),
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create quiz");
      }
      const data = await res.json();
      setGeneratedLink(`${window.location.origin}/quiz/${data.quizId}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating quiz");
    } finally {
      setGenerating(false);
    }
  };

  const copyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ─── Derived state ─────────────────────────────────────────────────────────
  const completedCount = questions.filter(isQuestionComplete).length;
  const allQuestionsComplete = completedCount === questions.length && questions.length > 0;
  const canGenerate = quizTitle.trim().length > 0 && allQuestionsComplete;
  const current = questions[activeQ];
  const optionLabels = ["A", "B", "C", "D"];
  const optionColors = ["#a78bfa", "#f472b6", "#34d399", "#fb923c"];

  // ─── Conditional RENDER (not conditional hooks) ────────────────────────────
  if (loadingAuth) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#070711",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#475569",
        fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{
          width: 40, height: 40,
          border: "3px solid rgba(99,102,241,0.2)",
          borderTop: "3px solid #6366f1",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  // ─── Full UI ───────────────────────────────────────────────────────────────
  return (
    <div className={`${fraunces.variable} ${dmSans.variable}`}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          width: 100%; min-height: 100vh; background: #070711;
          font-family: var(--font-dm-sans), sans-serif;
          overflow-x: hidden; color: #f1f5f9;
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
          padding: 0 16px 80px;
        }
        .nav {
          width: 100%; max-width: 680px; display: flex;
          justify-content: space-between; align-items: center;
          padding: 28px 0 0; margin-bottom: 48px;
        }
        .nav-logo {
          font-family: var(--font-fraunces), serif; font-size: 1.05rem;
          color: #a78bfa; cursor: pointer; letter-spacing: 0.02em; transition: opacity 0.2s;
        }
        .nav-logo:hover { opacity: 0.75; }
        .nav-step { font-size: 0.75rem; color: #475569; letter-spacing: 0.1em; text-transform: uppercase; }
        .card {
          width: 100%; max-width: 680px; background: rgba(15,17,35,0.85);
          border: 1px solid rgba(99,102,241,0.15); border-radius: 24px; padding: 40px 36px;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 0 1px rgba(99,102,241,0.08), 0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.08);
          animation: cardIn 0.5s ease both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .title-block { margin-bottom: 32px; }
        .page-heading {
          font-family: var(--font-fraunces), serif;
          font-size: clamp(1.8rem, 4vw, 2.4rem); font-weight: 900;
          color: #f8fafc; line-height: 1.1; margin-bottom: 6px;
        }
        .page-heading .accent {
          background: linear-gradient(120deg, #818cf8, #c084fc);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .page-sub { font-size: 0.88rem; color: #475569; font-weight: 300; }
        .field-label {
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #64748b; margin-bottom: 8px; display: block;
        }
        .quiz-title-input {
          width: 100%; padding: 14px 18px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09); border-radius: 14px; color: #f1f5f9;
          font-family: var(--font-fraunces), serif; font-size: 1.15rem; font-weight: 700;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          margin-bottom: 32px;
        }
        .quiz-title-input::placeholder { color: #334155; font-weight: 300; font-family: var(--font-dm-sans), sans-serif; font-size: 0.95rem; }
        .quiz-title-input:focus {
          border-color: rgba(129,140,248,0.5); background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 0 20px rgba(99,102,241,0.1);
        }
        .tabs-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; align-items: center; }
        .tab {
          padding: 7px 14px; border-radius: 10px; font-size: 0.78rem; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.07); background: transparent; color: #64748b;
          cursor: pointer; transition: all 0.18s; font-family: var(--font-dm-sans), sans-serif;
          position: relative;
        }
        .tab.active { border-color: rgba(99,102,241,0.5); color: #a5b4fc; background: rgba(99,102,241,0.08); }
        .tab.done::after {
          content: '✓'; position: absolute; top: -4px; right: -4px;
          width: 14px; height: 14px; background: #34d399; border-radius: 50%;
          font-size: 8px; color: #000; font-weight: 700; line-height: 14px; text-align: center;
          display: flex; align-items: center; justify-content: center;
        }
        .tab:hover { border-color: rgba(99,102,241,0.4); color: #a5b4fc; }
        .tab-add {
          padding: 7px 12px; border-radius: 10px; font-size: 1rem;
          border: 1px dashed rgba(255,255,255,0.12); background: transparent; color: #475569;
          cursor: pointer; transition: all 0.18s; font-family: var(--font-dm-sans), sans-serif; line-height: 1;
        }
        .tab-add:hover { border-color: rgba(99,102,241,0.4); color: #a5b4fc; }
        .progress-wrap { margin-bottom: 28px; }
        .progress-meta { display: flex; justify-content: space-between; font-size: 0.72rem; color: #475569; margin-bottom: 6px; }
        .progress-track { height: 4px; background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #6366f1, #a855f7); transition: width 0.4s ease; }
        .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 24px 0; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .question-input {
          width: 100%; padding: 14px 18px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09); border-radius: 14px; color: #f1f5f9;
          font-family: var(--font-dm-sans), sans-serif; font-size: 1rem; outline: none;
          resize: vertical; min-height: 80px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; margin-bottom: 20px;
        }
        .question-input::placeholder { color: #334155; }
        .question-input:focus { border-color: rgba(129,140,248,0.5); background: rgba(99,102,241,0.05); box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
        .upload-box {
          border: 1.5px dashed rgba(71,85,105,0.6); border-radius: 16px; padding: 28px 20px;
          text-align: center; cursor: pointer; transition: all 0.2s; margin-bottom: 24px;
          background: rgba(255,255,255,0.02); position: relative; overflow: hidden;
        }
        .upload-box.drag-over { border-color: #6366f1; background: rgba(99,102,241,0.08); }
        .upload-box:hover { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.05); }
        .upload-icon { font-size: 1.8rem; margin-bottom: 8px; display: block; opacity: 0.5; }
        .upload-text { font-size: 0.85rem; color: #64748b; margin-bottom: 4px; }
        .upload-hint { font-size: 0.72rem; color: #334155; }
        .upload-preview { width: 100%; max-height: 180px; object-fit: cover; border-radius: 10px; display: block; }
        .remove-img {
          position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7);
          border: 1px solid rgba(255,255,255,0.15); border-radius: 50%; width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center; font-size: 0.75rem;
          color: #94a3b8; cursor: pointer; transition: all 0.2s; z-index: 2;
        }
        .remove-img:hover { background: rgba(220,38,38,0.7); color: #fff; }
        .options-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 8px; }
        .option-row { display: flex; align-items: center; gap: 10px; }
        .option-letter {
          width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center;
          justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
          transition: all 0.2s; cursor: pointer; border: 1.5px solid transparent;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .option-letter.selected { box-shadow: 0 0 12px currentColor; }
        .option-input {
          flex: 1; padding: 11px 16px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 11px; color: #f1f5f9;
          font-family: var(--font-dm-sans), sans-serif; font-size: 0.92rem; outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .option-input::placeholder { color: #334155; }
        .option-input:focus { border-color: rgba(129,140,248,0.4); background: rgba(99,102,241,0.05); }
        .option-input.correct-input { border-color: rgba(52,211,153,0.4); background: rgba(52,211,153,0.05); }
        .correct-hint { font-size: 0.72rem; color: #475569; margin-bottom: 24px; margin-top: 4px; }
        .correct-hint span { color: #34d399; }
        .remove-q-btn {
          background: none; border: none; color: #475569; font-size: 0.75rem; cursor: pointer;
          font-family: var(--font-dm-sans), sans-serif; padding: 4px 8px; border-radius: 6px; transition: all 0.15s;
        }
        .remove-q-btn:hover { background: rgba(239,68,68,0.12); color: #f87171; }
        .generate-btn {
          width: 100%; padding: 16px 24px; border-radius: 14px; border: none;
          font-family: var(--font-dm-sans), sans-serif; font-size: 1rem; font-weight: 600;
          cursor: pointer; letter-spacing: 0.02em; position: relative; overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s; margin-top: 28px;
        }
        .generate-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
        .generate-btn:not(:disabled) { background: linear-gradient(135deg, #4f46e5, #7c3aed, #9333ea); color: #fff; box-shadow: 0 0 30px rgba(99,102,241,0.35); }
        .generate-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 8px 40px rgba(99,102,241,0.55); }
        .btn-spinner {
          display: inline-block; width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: spin 0.7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .req-hint { font-size: 0.75rem; color: #475569; text-align: center; margin-top: 10px; }
        .req-hint .check { color: #34d399; margin-right: 4px; }
        .req-hint .cross { color: #ef4444; margin-right: 4px; }
        .link-box {
          margin-top: 24px; padding: 20px 24px; background: rgba(52,211,153,0.07);
          border: 1px solid rgba(52,211,153,0.25); border-radius: 16px;
          animation: fadeUp 0.4s ease both;
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .link-label {
          font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em;
          color: #34d399; font-weight: 600; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .link-label::before { content: '✦'; font-size: 0.6rem; }
        .link-row { display: flex; gap: 10px; align-items: center; }
        .link-value {
          flex: 1; padding: 10px 14px; background: rgba(0,0,0,0.3);
          border: 1px solid rgba(52,211,153,0.2); border-radius: 10px;
          font-size: 0.82rem; color: #94a3b8; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .copy-btn {
          padding: 10px 18px; border-radius: 10px; border: 1px solid rgba(52,211,153,0.35);
          background: rgba(52,211,153,0.12); color: #34d399;
          font-family: var(--font-dm-sans), sans-serif; font-size: 0.82rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
        }
        .copy-btn:hover { background: rgba(52,211,153,0.22); }
        .copy-btn.copied { background: rgba(52,211,153,0.25); color: #6ee7b7; }
        .share-btns { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
        .share-btn {
          flex: 1; min-width: 120px; padding: 9px 14px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04);
          color: #94a3b8; font-family: var(--font-dm-sans), sans-serif; font-size: 0.8rem;
          cursor: pointer; transition: all 0.2s; text-align: center;
        }
        .share-btn:hover { border-color: rgba(255,255,255,0.18); color: #f1f5f9; background: rgba(255,255,255,0.07); }
        @media (max-width: 600px) {
          .card { padding: 28px 20px; border-radius: 18px; }
          .tabs-row { gap: 6px; }
          .link-row { flex-direction: column; }
          .copy-btn { width: 100%; }
        }
      `}</style>

      <div className="bg-wrap">
        <div className="bg-mesh" />
        <div className="bg-grid" />
      </div>

      <div className="page">
        <nav className="nav">
          <span className="nav-logo" onClick={() => router.push("/")}>KnowMe?</span>
          <span className="nav-step">Create Your Quiz</span>
        </nav>

        <div className="card">
          <div className="title-block">
            <h1 className="page-heading">Build your <span className="accent">quiz</span></h1>
            <p className="page-sub">Add questions, set answers, share with friends.</p>
          </div>

          <label className="field-label">Quiz Title</label>
          <input
            className="quiz-title-input"
            type="text"
            placeholder="e.g. How well do you know me?"
            value={quizTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuizTitle(e.target.value)}
          />

          <div className="progress-wrap">
            <div className="progress-meta">
              <span>{completedCount} of {questions.length} question{questions.length !== 1 ? "s" : ""} complete</span>
              <span>{Math.round((completedCount / questions.length) * 100)}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${(completedCount / questions.length) * 100}%` }} />
            </div>
          </div>

          <div className="tabs-row">
            {questions.map((q, i) => (
              <button
                key={q.id}
                className={`tab${activeQ === i ? " active" : ""}${isQuestionComplete(q) ? " done" : ""}`}
                onClick={() => setActiveQ(i)}
              >
                Q{i + 1}
              </button>
            ))}
            {questions.length < 10 && (
              <button className="tab-add" onClick={addQuestion} title="Add question">＋</button>
            )}
          </div>

          <div className="divider" />

          <div>
            <div className="section-header">
              <label className="field-label" style={{ margin: 0 }}>Question {activeQ + 1}</label>
              {questions.length > 1 && (
                <button className="remove-q-btn" onClick={() => removeQuestion(activeQ)}>Remove ✕</button>
              )}
            </div>

            <textarea
              className="question-input"
              placeholder="Type your question here…"
              value={current.question}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateQuestion(e.target.value)}
            />

            <label className="field-label">Image (optional)</label>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onFileChange} />
            <div
              className={`upload-box${dragOver ? " drag-over" : ""}`}
              onClick={() => !current.imagePreview && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              {current.imagePreview ? (
                <>
                  <button className="remove-img" onClick={(e) => { e.stopPropagation(); removeImage(); }}>✕</button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="upload-preview" src={current.imagePreview} alt="Preview" />
                </>
              ) : (
                <>
                  <span className="upload-icon">🖼</span>
                  <div className="upload-text">Click or drag & drop an image</div>
                  <div className="upload-hint">PNG, JPG, GIF up to 5MB</div>
                </>
              )}
            </div>

            <label className="field-label">Answer Options</label>
            <p className="correct-hint">Tap a letter to mark it as the <span>correct answer</span></p>
            <div className="options-grid">
              {current.options.map((opt, j) => {
                const color = optionColors[j];
                const isCorrect = current.correctIndex === j;
                return (
                  <div key={opt.id} className="option-row">
                    <div
                      className={`option-letter${isCorrect ? " selected" : ""}`}
                      style={{
                        background: isCorrect ? `${color}22` : "rgba(255,255,255,0.04)",
                        color: isCorrect ? color : "#64748b",
                        borderColor: isCorrect ? `${color}66` : "rgba(255,255,255,0.08)",
                      }}
                      onClick={() => setCorrect(j)}
                    >
                      {optionLabels[j]}
                    </div>
                    <input
                      className={`option-input${isCorrect ? " correct-input" : ""}`}
                      type="text"
                      placeholder={`Option ${optionLabels[j]}…`}
                      value={opt.text}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateOption(j, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="divider" />

          <div className="req-hint">
            <span className={quizTitle.trim().length > 0 ? "check" : "cross"}>
              {quizTitle.trim().length > 0 ? "✓" : "✕"}
            </span>
            Quiz title &nbsp;·&nbsp;
            <span className={allQuestionsComplete ? "check" : "cross"}>
              {allQuestionsComplete ? "✓" : "✕"}
            </span>
            All questions complete
          </div>

          <button className="generate-btn" disabled={!canGenerate || generating} onClick={generateLink}>
            <span>
              {generating
                ? <><span className="btn-spinner" />Generating your link…</>
                : generatedLink ? "✦ Regenerate Link" : "✦ Generate Shareable Link"
              }
            </span>
          </button>

          {generatedLink && (
            <div className="link-box">
              <div className="link-label">Your quiz is ready to share</div>
              <div className="link-row">
                <div className="link-value">{generatedLink}</div>
                <button className={`copy-btn${copied ? " copied" : ""}`} onClick={copyLink}>
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <div className="share-btns">
                <button className="share-btn" onClick={() => {
                  const text = `Hey! Take my quiz on KnowMe? 🤔\n${generatedLink}`;
                  if (navigator.share) { navigator.share({ title: quizTitle, text, url: generatedLink }); }
                  else { window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank"); }
                }}>📱 WhatsApp</button>
                <button className="share-btn" onClick={() =>
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Can you ace my quiz? 🧠 ${generatedLink}`)}`, "_blank")
                }>𝕏 Twitter</button>
                <button className="share-btn" onClick={() => window.open("https://www.instagram.com/", "_blank")}>
                  📸 Instagram
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}