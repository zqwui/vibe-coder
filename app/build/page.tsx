"use client";

import { useState, useEffect, useRef } from "react";
import { saveHistory } from "../lib/history";

const LANGUAGES = [
  { label: "React + TS", value: "React + TypeScript", color: "bg-blue-100 text-blue-700 border-blue-200", active: "bg-blue-600 text-white border-blue-600" },
  { label: "Next.js", value: "Next.js", color: "bg-gray-100 text-gray-700 border-gray-200", active: "bg-gray-800 text-white border-gray-800" },
  { label: "Vanilla JS", value: "Vanilla JavaScript", color: "bg-yellow-100 text-yellow-700 border-yellow-200", active: "bg-yellow-500 text-white border-yellow-500" },
  { label: "Python", value: "Python", color: "bg-green-100 text-green-700 border-green-200", active: "bg-green-600 text-white border-green-600" },
  { label: "Node.js", value: "Node.js", color: "bg-emerald-100 text-emerald-700 border-emerald-200", active: "bg-emerald-600 text-white border-emerald-600" },
  { label: "HTML + CSS", value: "HTML + CSS", color: "bg-orange-100 text-orange-700 border-orange-200", active: "bg-orange-500 text-white border-orange-500" },
  { label: "Vue.js", value: "Vue.js", color: "bg-teal-100 text-teal-700 border-teal-200", active: "bg-teal-600 text-white border-teal-600" },
  { label: "FastAPI", value: "FastAPI", color: "bg-cyan-100 text-cyan-700 border-cyan-200", active: "bg-cyan-600 text-white border-cyan-600" },
];

const TABS = [
  { id: "spec", label: "Spec", emoji: "📋", active: "bg-violet-600 text-white" },
  { id: "code", label: "Code", emoji: "💻", active: "bg-fuchsia-600 text-white" },
  { id: "explain", label: "Explain", emoji: "🎮", active: "bg-pink-600 text-white" },
];

interface VibeResult {
  spec: string;
  code: string;
  explain: string;
}

export default function BuildPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("React + TypeScript");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VibeResult | null>(null);
  const [activeTab, setActiveTab] = useState("spec");
  const [toast, setToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const streamRef = useRef("");

  useEffect(() => {
    const stored = localStorage.getItem("mimo_api_key");
    if (stored) setApiKey(stored);
    const params = new URLSearchParams(window.location.search);
    const template = params.get("template");
    if (template) setDescription(decodeURIComponent(template));
  }, []);

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem("mimo_api_key", val);
  };

  const handleSubmit = async () => {
    if (!description.trim()) { setError("Please describe what you want to build."); return; }
    if (!apiKey.trim()) { setError("Please enter your MiMo API key."); return; }
    setError(""); setLoading(true); setResult(null);
    streamRef.current = "";

    try {
      const res = await fetch("/api/vibe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, language, apiKey }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "API error"); }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        streamRef.current += decoder.decode(value);
      }

      const match = streamRef.current.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed: VibeResult = JSON.parse(match[0]);
        setResult(parsed);
        setActiveTab("spec");
        saveHistory({ description, language, result: parsed });
        setToast(true);
        setTimeout(() => setToast(false), 3000);
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.code) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabContent: Record<string, string> = {
    spec: result?.spec || "",
    code: result?.code || "",
    explain: result?.explain || "",
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 px-4">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-white border border-green-200 text-green-700 font-semibold px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">
          ✅ Saved to History
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
            Build with VibeCoder
          </h1>
          <p className="text-gray-500">Describe your idea and get working starter code instantly.</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-7">
          {/* API Key */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">MiMo API Key</label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="sk-mimo-..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-medium"
              >
                {showKey ? "hide" : "show"}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Stored locally. Never sent anywhere except the MiMo API.</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">What do you want to build?</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. A todo app with drag-and-drop reordering, local storage persistence, and a dark mode toggle..."
              rows={5}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{description.length} characters</p>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Language / Framework</label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${language === lang.value ? lang.active : lang.color}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-violet-200 transition-all hover:scale-[1.01]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Vibing...
              </span>
            ) : "✨ Vibe it"}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
                    activeTab === tab.id
                      ? "border-violet-500 text-violet-700 bg-violet-50"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab.emoji} {tab.label}
                </button>
              ))}
              {activeTab === "code" && (
                <button
                  onClick={handleCopy}
                  className="ml-auto mr-4 my-3 px-4 py-1.5 text-xs rounded-xl bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 font-semibold hover:bg-fuchsia-100 transition-all"
                >
                  {copied ? "✓ Copied!" : "Copy Code"}
                </button>
              )}
            </div>

            <div className="p-6">
              {activeTab === "spec" && (
                <div className="space-y-3">
                  {tabContent.spec.split("\n").filter(Boolean).map((line, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</span>
                      <p className="text-gray-700 text-sm leading-relaxed">{line.replace(/^[•\-]\s*/, "")}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "code" && (
                <pre className="bg-gray-950 rounded-2xl p-5 overflow-x-auto text-sm text-green-300 font-mono leading-relaxed">
                  <code>{tabContent.code}</code>
                </pre>
              )}
              {activeTab === "explain" && (
                <div className="space-y-4">
                  {tabContent.explain.split("\n\n").filter(Boolean).map((para, i) => (
                    <p key={i} className="text-gray-700 text-sm leading-relaxed">{para}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
