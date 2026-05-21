"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getHistory, deleteHistory, clearHistory, HistoryItem } from "../lib/history";

const LANG_COLORS: Record<string, string> = {
  "React + TypeScript": "bg-blue-100 text-blue-700",
  "Next.js": "bg-gray-100 text-gray-700",
  "Vanilla JavaScript": "bg-yellow-100 text-yellow-700",
  "Python": "bg-green-100 text-green-700",
  "Node.js": "bg-emerald-100 text-emerald-700",
  "HTML + CSS": "bg-orange-100 text-orange-700",
  "Vue.js": "bg-teal-100 text-teal-700",
  "FastAPI": "bg-cyan-100 text-cyan-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function HistoryCard({ item, onDelete }: { item: HistoryItem; onDelete: (id: string) => void }) {
  const [tab, setTab] = useState<"spec" | "code" | "explain">("spec");
  const langColor = LANG_COLORS[item.language] || "bg-gray-100 text-gray-700";

  const content = {
    spec: item.result.spec,
    code: item.result.code,
    explain: item.result.explain,
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 flex flex-col">
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <p className="text-sm text-gray-800 font-medium leading-relaxed line-clamp-2 flex-1">
            {item.description}
          </p>
          <button
            onClick={() => onDelete(item.id)}
            className="shrink-0 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            🗑️
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${langColor}`}>
            {item.language}
          </span>
          <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-5">
        {(["spec", "code", "explain"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-xs font-semibold capitalize transition-all border-b-2 ${
              tab === t
                ? "border-violet-500 text-violet-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {t === "spec" ? "📋 Spec" : t === "code" ? "💻 Code" : "🎮 Explain"}
          </button>
        ))}
      </div>

      <div className="px-5 py-3 flex-1">
        <pre className="text-xs text-gray-600 bg-gray-50 rounded-xl p-3 overflow-hidden max-h-24 leading-relaxed font-mono whitespace-pre-wrap break-words">
          {(content[tab] || "").slice(0, 300)}{(content[tab] || "").length > 300 ? "…" : ""}
        </pre>
      </div>

      <div className="px-5 pb-5 pt-1">
        <Link
          href={`/build?template=${encodeURIComponent(item.description)}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-semibold hover:from-violet-600 hover:to-fuchsia-600 transition-all shadow-sm"
        >
          🔁 Use Again
        </Link>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setItems(getHistory());
    setLoaded(true);
  }, []);

  const handleDelete = (id: string) => {
    deleteHistory(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearAll = () => {
    clearHistory();
    setItems([]);
    setConfirmClear(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-1">
              Generation History
            </h1>
            <p className="text-gray-500">
              {loaded ? `${items.length} saved generation${items.length !== 1 ? "s" : ""}` : "Loading..."}
            </p>
          </div>
          {items.length > 0 && (
            <div className="flex items-center gap-2">
              {confirmClear ? (
                <>
                  <span className="text-sm text-gray-500">Are you sure?</span>
                  <button onClick={handleClearAll} className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-all">
                    Yes, clear all
                  </button>
                  <button onClick={() => setConfirmClear(false)} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-all">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setConfirmClear(true)} className="px-4 py-2 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-all">
                  🗑️ Clear All
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        {!loaded ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse h-64" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-7xl mb-6">🗂️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No history yet</h2>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Your past code generations will appear here. Start building something and come back to revisit your work.
            </p>
            <Link
              href="/build"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:from-violet-600 hover:to-fuchsia-600 transition-all shadow-md"
            >
              ✨ Start Building
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <HistoryCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
