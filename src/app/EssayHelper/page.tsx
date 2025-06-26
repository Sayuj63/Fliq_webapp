"use client";
import React, { useState, useRef } from "react";
import { formatFeedback } from "./formatFeedback";

const commonAppPrompts = [
  "1. Background, identity, interest, or talent.",
  "2. Lesson from obstacles.",
  "3. Challenging a belief or idea.",
  "4. Problem solved or problem you'd like to solve.",
  "5. Accomplishment or realization that sparked growth.",
  "6. Topic, idea, or concept you find engaging."
];

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const fadeIn = "animate-[fadeIn_0.7s_ease]";

const EssayHelperPage: React.FC = () => {
  const [promptIndex, setPromptIndex] = useState<number>(0);
  const [essay, setEssay] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [formattedFeedback, setFormattedFeedback] = useState<Array<{ label: string, bullets: string[] }>>([]);
  const [touched, setTouched] = useState<boolean>(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const handlePromptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPromptIndex(Number(e.target.value));
  };

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
    setTouched(true);
    setError("");
    setFeedback("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFeedback("");
    if (!essay.trim()) {
      setError("Please enter your essay text.");
      return;
    }
    if (wordCount(essay) < 100) {
      setError("Essay is too short. Please provide at least 100 words.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/essay-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay, prompt: commonAppPrompts[promptIndex] })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setFeedback("");
      } else {
        const content = data.result?.choices?.[0]?.message?.content || "No feedback received.";
        setFeedback(content);
        setFormattedFeedback(formatFeedback(content));
        setTimeout(() => {
          responseRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Essay Builder</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-zinc-900/80 rounded-2xl shadow-lg p-6 md:p-8 border border-zinc-800">
          <div className="flex flex-col gap-2">
            <label htmlFor="prompt" className="font-semibold text-base mb-1">Common App Prompt</label>
            <select
              id="prompt"
              className="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-white/40"
              value={promptIndex}
              onChange={handlePromptChange}
            >
              {commonAppPrompts.map((prompt, i) => (
                <option key={i} value={i} className="bg-zinc-900 text-white">{prompt}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="essay" className="font-semibold text-base mb-1">Your Essay</label>
            <textarea
              id="essay"
              className="resize-vertical min-h-[200px] bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-white/40 placeholder:text-zinc-400 placeholder:opacity-80"
              placeholder="Paste or type your essay here..."
              value={essay}
              onChange={handleEssayChange}
              rows={8}
              spellCheck={true}
              autoCorrect="on"
              autoFocus
              disabled={loading}
              style={{ fontFamily: 'inherit', fontSize: '1.08rem' }}
            />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>Word count: {wordCount(essay)}</span>
              {touched && wordCount(essay) < 100 && (
                <span className="text-red-400">Essay must be at least 100 words.</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`mt-2 w-full py-3 rounded-lg font-semibold text-lg bg-white text-black shadow-md border-2 border-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60 hover:bg-black hover:text-white hover:border-neutral-300 hover:shadow-[0_0_16px_2px_rgba(255,255,255,0.2)] ${loading ? 'opacity-70 cursor-not-allowed animate-pulse' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                Analyzing...
              </span>
            ) : (
              "Submit Essay"
            )}
          </button>
          {error && (
            <div className="mt-1 text-red-400 text-sm font-medium" role="alert">{error}</div>
          )}
        </form>
        {feedback && (
          <div
            ref={responseRef}
            className={`bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-lg p-6 md:p-8 mt-2 ${fadeIn}`}
            style={{ animationName: 'fadeIn', animationDuration: '0.7s', animationTimingFunction: 'ease' }}
          >
            <h2 className="text-2xl font-bold mb-5 tracking-tight">AI Suggestions</h2>
            {formattedFeedback && formattedFeedback.length > 0 ? (
              <div className="max-w-prose space-y-7">
                {formattedFeedback.map(({ label, bullets }) => (
                  <div key={label}>
                    <h3 className="font-semibold text-lg mb-2 text-white/90">{label}</h3>
                    <ul className="list-disc pl-6 text-base leading-relaxed space-y-2">
                      {bullets.map((b, i) => (
                        <li key={i} className="text-zinc-100">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap bg-zinc-950/70 border border-zinc-800 rounded-lg text-base text-zinc-100 px-4 py-3 overflow-x-auto" style={{fontFamily: 'inherit'}}>{feedback}</pre>
            )}
          </div>
        )}
      </div>
      {/* FadeIn keyframes for Tailwind */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default EssayHelperPage;
