"use client";

import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  "React + TypeScript",
  "Next.js",
  "Vanilla JavaScript",
  "Python",
  "Node.js",
  "HTML + CSS",
  "Vue.js",
  "FastAPI",
];

const EXAMPLES = [
  "app buat nyimpen link artikel yang mau aku baca nanti, bisa kasih tag dan search",
  "game tebak kata kayak wordle tapi temanya anime",
  "tool buat bikin jadwal belajar otomatis dari daftar topik yang aku input",
  "chatbot yang bisa jawab pertanyaan soal menu restoran dari PDF",
];

interface Result {
  spec: string;
  code: string;
  explain: string;
}

type Tab = "spec" | "code" | "explain";

export default function Home() {
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("React + TypeScript");
  const [apiKey, setApiKey] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("mimo_api_key") || "" : ""
  );
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("spec");
  const [rawStream, setRawStream] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const streamRef = useRef("");

  useEffect(() => {
    if (apiKey) localStorage.setItem("mimo_api_key", apiKey);
  }, [apiKey]);

  const parseResult = (raw: string): Result | null => {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!description.trim() || !apiKey.trim()) return;
    setLoading(true);
    setResult(null);
    setRawStream("");
    setError("");
    streamRef.current = "";

    try {
      const res = await fetch("/api/vibe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, language, apiKey }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        streamRef.current += chunk;
        setRawStream(streamRef.current);
        const parsed = parseResult(streamRef.current);
        if (parsed) setResult(parsed);
      }

      const final = parseResult(streamRef.current);
      if (final) {
        setResult(final);
        setActiveTab("spec");
      }
    } catch {
      setError("Connection error. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (result?.code) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabLabels: { key: Tab; label: string; emoji: string }[] = [
    { key: "spec", label: "Spec", emoji: "📋" },
    { key: "code", label: "Code", emoji: "💻" },
    { key: "explain", label: "Explain", emoji: "🎮" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
            V
          </div>
          <span className="font-semibold text-lg tracking-tight">VibeCoder</span>
          <span className="text-xs text-white/30 border border-white/10 rounded-full px-2 py-0.5">
            powered by MiMo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              placeholder="MiMo API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm w-56 placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xs"
            >
              {showKey ? "hide" : "show"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
            Describe it. Build it.
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Ceritain apa yang mau kamu buat pakai bahasa sehari-hari — VibeCoder translate jadi spec, kode, dan penjelasan yang bisa kamu pahami.
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Main input */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ceritain project kamu... misal: 'aku mau bikin app buat nyimpen resep masakan, bisa search dan kasih rating'"
                rows={5}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-500/40 resize-none transition-colors leading-relaxed"
              />
              <div className="absolute bottom-3 right-3 text-white/20 text-xs">
                {description.length} chars
              </div>
            </div>

            {/* Examples */}
            <div>
              <p className="text-white/30 text-xs mb-2">Contoh:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setDescription(ex)}
                    className="text-xs bg-white/[0.03] border border-white/10 rounded-lg px-3 py-1.5 text-white/40 hover:text-white/70 hover:border-white/20 transition-all text-left"
                  >
                    {ex.length > 50 ? ex.slice(0, 50) + "…" : ex}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">
                Language / Framework
              </label>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`text-xs px-3 py-2 rounded-lg border transition-all text-left ${
                      language === lang
                        ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                        : "bg-white/[0.03] border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !description.trim() || !apiKey.trim()}
              className="mt-auto w-full py-3 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                "✨ Vibe it"
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Streaming indicator */}
        {loading && !result && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-violet-500/5 border border-violet-500/10 text-violet-400/60 text-sm font-mono">
            <span className="animate-pulse">● </span>
            Thinking...
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {tabLabels.map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-all border-b-2 ${
                    activeTab === key
                      ? "border-violet-500 text-white"
                      : "border-transparent text-white/30 hover:text-white/60"
                  }`}
                >
                  <span>{emoji}</span>
                  {label}
                </button>
              ))}
              {activeTab === "code" && (
                <button
                  onClick={copyCode}
                  className="ml-auto mr-4 my-2 px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white/70 transition-all"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              )}
            </div>

            {/* Tab content */}
            <div className="p-6">
              {activeTab === "spec" && (
                <div className="space-y-3">
                  <h3 className="text-white/40 text-xs uppercase tracking-wider mb-4">
                    What you&apos;re building
                  </h3>
                  {result.spec.split("\n").filter(Boolean).map((line, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-violet-400 mt-0.5 shrink-0">•</span>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {line.replace(/^[•\-]\s*/, "")}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "code" && (
                <div>
                  <h3 className="text-white/40 text-xs uppercase tracking-wider mb-4">
                    Starter code — {language}
                  </h3>
                  <pre className="bg-black/40 rounded-xl p-5 overflow-x-auto text-sm text-green-300/80 font-mono leading-relaxed border border-white/5">
                    <code>{result.code}</code>
                  </pre>
                </div>
              )}

              {activeTab === "explain" && (
                <div className="space-y-4">
                  <h3 className="text-white/40 text-xs uppercase tracking-wider mb-4">
                    Explained like a game
                  </h3>
                  {result.explain.split("\n\n").filter(Boolean).map((para, i) => (
                    <p key={i} className="text-white/70 text-sm leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 px-8 py-4 text-center text-white/20 text-xs">
        VibeCoder — built with MiMo-V2.5-Pro · Translate your vibe into code
      </footer>
    </div>
  );
}
