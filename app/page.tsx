import Link from "next/link";

const features = [
  {
    emoji: "💬",
    title: "Plain Language Input",
    description: "No jargon required. Just describe what you want to build in everyday words and let MiMo-V2.5-Pro handle the translation.",
    gradient: "from-violet-500 to-fuchsia-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    emoji: "⚡",
    title: "Instant Starter Code",
    description: "Get a complete, runnable project scaffold in seconds. Pick your language, hit Vibe, and start coding.",
    gradient: "from-fuchsia-500 to-pink-500",
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-100",
  },
  {
    emoji: "🎮",
    title: "Explained Like a Game",
    description: "Every output comes with a plain-English walkthrough so you actually understand what was built and why.",
    gradient: "from-orange-400 to-pink-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
];

const steps = [
  { number: "01", title: "Describe your idea", description: "Type what you want to build in plain English. No technical knowledge needed.", color: "bg-violet-600" },
  { number: "02", title: "Choose your stack", description: "Pick from React, Next.js, Python, Node.js, and more with a single click.", color: "bg-fuchsia-600" },
  { number: "03", title: "Get your code", description: "Receive a spec, working starter code, and a plain-English explanation instantly.", color: "bg-pink-600" },
];

const previewTemplates = [
  { emoji: "🌐", title: "Portfolio Website", category: "Web App", template: "Build a personal portfolio website with a hero section, projects grid, skills list, and contact form", color: "bg-violet-100 text-violet-700" },
  { emoji: "🎮", title: "Wordle Clone", category: "Game", template: "Build a Wordle clone browser game with 5-letter word guessing, color-coded feedback tiles, and win/lose state", color: "bg-fuchsia-100 text-fuchsia-700" },
  { emoji: "🔗", title: "URL Shortener", category: "Tool", template: "Build a URL shortener tool with a form to paste long URLs, generate short codes, copy to clipboard, and track click counts", color: "bg-cyan-100 text-cyan-700" },
  { emoji: "🤖", title: "Discord Bot", category: "Bot", template: "Build a Discord bot with slash commands for moderation, fun responses, a help menu, and welcome messages for new members", color: "bg-orange-100 text-orange-700" },
  { emoji: "🚀", title: "REST API Boilerplate", category: "API", template: "Build a REST API boilerplate with Express.js, JWT authentication, CRUD routes, input validation, and error handling middleware", color: "bg-pink-100 text-pink-700" },
  { emoji: "📱", title: "Habit Tracker", category: "Mobile", template: "Build a mobile habit tracker app with daily check-ins, streak counters, progress charts, and push notification reminders", color: "bg-emerald-100 text-emerald-700" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-violet-200 rounded-full px-4 py-1.5 text-sm text-violet-700 font-medium mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Powered by MiMo-V2.5-Pro
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              Describe it.
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent">
              Build it.
            </span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Turn plain English into production-ready starter code in seconds. No boilerplate hunting,
            no blank-page anxiety — just describe what you want and start building.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/build"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-lg shadow-violet-200 transition-all hover:scale-105"
            >
              Start Building →
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-violet-700 font-semibold text-lg bg-white border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all hover:scale-105"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything you need to start fast</h2>
          <p className="text-gray-500 text-lg">Three superpowers, one tool.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className={`${f.bg} border ${f.border} rounded-3xl p-8 hover:shadow-lg transition-all hover:-translate-y-1`}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl mb-5 shadow-md`}>
                {f.emoji}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
            <p className="text-gray-500 text-lg">From idea to code in three steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-5 shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Jump-start with a template</h2>
          <p className="text-gray-500 text-lg">Pick a starting point and customize it to your needs.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {previewTemplates.map((t) => (
            <Link
              key={t.title}
              href={`/build?template=${encodeURIComponent(t.template)}`}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-violet-200 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{t.emoji}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.color}`}>{t.category}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-violet-700 transition-colors">{t.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{t.template}</p>
              <div className="mt-4 text-sm font-medium text-violet-600 flex items-center gap-1">
                Use template <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:border-violet-300 hover:text-violet-700 transition-all"
          >
            View all 30 templates →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            VibeCoder
          </span>
          <nav className="flex flex-wrap gap-6 text-sm text-gray-500">
            <Link href="/build" className="hover:text-violet-600 transition-colors">Build</Link>
            <Link href="/templates" className="hover:text-violet-600 transition-colors">Templates</Link>
            <Link href="/history" className="hover:text-violet-600 transition-colors">History</Link>
            <a href="https://github.com/zqwui/vibe-coder" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 transition-colors">GitHub</a>
          </nav>
          <p className="text-xs text-gray-400">Powered by <span className="font-semibold text-fuchsia-600">MiMo-V2.5-Pro</span></p>
        </div>
      </footer>
    </div>
  );
}
