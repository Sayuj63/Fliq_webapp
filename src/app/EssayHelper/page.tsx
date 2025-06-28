"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';

const RightColumnVisuals = dynamic(
  () => import('@/components/RightColumnVisuals'),
  { ssr: false }
);

const commonAppPrompts = [
  "Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.",
  "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
  "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?",
  "Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?",
  "Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.",
  "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?",
  "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.",
  "+ Add supplement question"
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
  const [touched, setTouched] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handlePromptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPromptIndex(Number(e.target.value));
  };

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!essay.trim()) {
      setError("Please enter your essay before submitting.");
      return;
    }
    
    setLoading(true);
    setError("");
    setHasSubmitted(true);
    
    // Here you would typically make an API call to analyze the essay
    // For now, we'll just simulate a short delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <div className="w-[1400px] flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-1">Let's Check Your Essay</h1>
          <p className="text-sm text-white/80">Essay Builder/Checker</p>
        </div>
        
        <div className="flex justify-between w-full">
          {/* Left Column - Wider */}
          <div className="w-[900px] bg-black border border-white/10 rounded-2xl p-8 flex flex-col">
            <h2 className="text-sm font-medium mb-2">Common App Prompt</h2>
            <p className="text-sm text-white/60 mb-4">You can manually type too, select 'Other' if not found.</p>
            
            <select
              id="prompt"
              className="w-full p-3 bg-black border border-white/10 rounded-lg text-sm text-white focus:outline-none mb-6"
              value={promptIndex}
              onChange={handlePromptChange}
            >
              {commonAppPrompts.map((prompt, i) => (
                <option key={i} value={i} className="bg-black text-white">{prompt}</option>
              ))}
            </select>
            
            <h2 className="text-sm font-medium mb-3">Your Essay</h2>
            <div className="flex-1 flex flex-col">
              <div className="w-full h-[289px] border border-white/20 rounded-lg overflow-hidden">
                <textarea
                  id="essay"
                  className="w-full h-full p-4 bg-black text-white placeholder-white/30 text-sm focus:outline-none resize-none"
                  placeholder="Paste/type your essay here.."
                  value={essay}
                  onChange={handleEssayChange}
                  spellCheck={true}
                  autoCorrect="on"
                  autoFocus
                  disabled={loading}
                  style={{ lineHeight: '1.5' }}
                />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-white/60">{wordCount(essay)} words</span>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || wordCount(essay) < 100}
                  className={`px-5 py-2 rounded-lg text-sm ${
                    loading || wordCount(essay) < 100 
                      ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {loading ? 'Analyzing...' : 'Submit'}
                </button>
              </div>
              {error && (
                <div className="mt-2 text-red-400 text-sm" role="alert">{error}</div>
              )}
            </div>
          </div>
          
          {/* Right Column - Visual Feedback */}
          <div className="w-[450px] bg-black border border-white/10 rounded-2xl p-6 overflow-y-auto">
            {!hasSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-white/60 mb-2">Submit your essay to see the analysis</div>
                <div className="text-xs text-white/40">Your feedback will appear here</div>
              </div>
            ) : loading ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="text-white/80 mb-2">Analyzing your essay</div>
                <div className="text-sm text-white/60 mb-4">This may take a moment...</div>
                <div className="w-3/4 bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            ) : (
              <RightColumnVisuals essay={essay} loading={false} />
            )}
          </div>
        </div>
      </div>
      {/* FadeIn keyframes for Tailwind */}
      <style jsx global>{`
        @font-face {
          font-family: 'Geist';
          src: url('/fonts/Geist/Geist-Regular.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist';
          src: url('/fonts/Geist/Geist-Medium.woff2') format('woff2');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Geist';
          src: url('/fonts/Geist/Geist-Bold.woff2') format('woff2');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        body {
          font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default EssayHelperPage;
