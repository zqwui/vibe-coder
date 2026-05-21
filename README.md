<div align="center">

# ⚡ VibeCoder

### Turn your ideas into production-ready code — instantly.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-vibecoderapp.vercel.app-6d28d9?style=for-the-badge&logo=vercel&logoColor=white)](https://vibecoderapp.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

<br/>

**VibeCoder** is an AI-powered code generation platform that transforms plain-language descriptions into fully-specified, production-ready starter code — complete with a technical spec, working implementation, and a plain-English explanation. No boilerplate hunting. No blank-page anxiety. Just describe what you want and ship.

<br/>

![VibeCoder Screenshot](https://via.placeholder.com/900x500/6d28d9/ffffff?text=VibeCoder+—+Describe+it.+Build+it.)

</div>

---

## ✨ Features

- 🧠 **AI-Powered Generation** — Describe your idea in plain English and get a complete spec, working code, and a clear explanation in seconds, powered by MiMo-V2.5-Pro.
- 🌐 **Multi-Language Support** — Generate code in React + TypeScript, Next.js, Vanilla JS, Python, Node.js, HTML + CSS, Vue.js, FastAPI, and more.
- 📋 **Three-Panel Output** — Every generation includes a structured **Spec**, the **Code** implementation, and a human-readable **Explanation**.
- 🗂️ **Generation History** — All past generations are saved locally in your browser. Revisit, preview, and reuse them anytime — no account required.
- 🎨 **30 Ready-to-Use Templates** — Jump-start with templates across 6 categories: Web App, Game, Tool, Bot, API, and Mobile.
- 🔁 **Use Again** — One click to reload any past generation as a starting point for your next build.
- ⚡ **Real-Time Streaming** — Responses stream in as they're generated so you're never staring at a blank screen.
- 🔑 **BYOK (Bring Your Own Key)** — Your API key is stored locally in your browser and never touches our servers.

---

## 🔄 How It Works

```
1. Describe  →  2. Choose Stack  →  3. Get Code
```

**Step 1 — Describe your idea**
Type a plain-language description of what you want to build. No technical knowledge needed. Or pick one of 30 templates to get started faster.

**Step 2 — Choose your stack**
Select your target language or framework — React, Next.js, Python, Node.js, and more.

**Step 3 — Get three outputs**
VibeCoder calls MiMo-V2.5-Pro to produce:
- 📋 **Spec** — A structured breakdown of what you're building and how it works.
- 💻 **Code** — Clean, commented, production-ready starter implementation.
- 🎮 **Explain** — A plain-English walkthrough of the code, explained like a game.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| AI Model | MiMo-V2.5-Pro via OpenAI-compatible API |
| Streaming | Next.js Route Handlers + ReadableStream |
| Storage | Browser localStorage (no database) |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- A [MiMo API key](https://platform.xiaomimimo.com)

### 1. Clone the repository

```bash
git clone https://github.com/zqwui/vibe-coder.git
cd vibe-coder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Enter your API key

Click the **MiMo API Key** field in the top-right corner (or on the Build page), paste your key, and start generating. The key is saved to localStorage automatically.

---

## 🔑 Environment Variables

No environment variables are required to run VibeCoder. The MiMo API key is provided by the user at runtime via the UI (BYOK model) and stored in their browser's localStorage.

If you want to pre-configure a server-side key for a private deployment, you can add:

```env
MIMO_API_KEY=your_key_here
```

And update `app/api/vibe/route.ts` to fall back to `process.env.MIMO_API_KEY` when no client key is provided.

---

## 📐 Template Categories

| Category | Count | Examples |
|---|---|---|
| 🌐 Web App | 6 | Portfolio, E-Commerce, Blog, Dashboard, Chat, Calendar |
| 🎮 Game | 5 | Wordle Clone, Snake, Memory Cards, 2048, Quiz App |
| 🔧 Tool | 6 | URL Shortener, Color Palette, Resume Builder, Pomodoro, Markdown Editor |
| 🤖 Bot | 4 | Discord Bot, Telegram Bot, Twitter Bot, Slack Bot |
| 🚀 API | 5 | REST Boilerplate, Auth Service, File Upload, Notifications, Search |
| 📱 Mobile | 4 | Habit Tracker, Expense Tracker, Fitness App, Recipe App |

---

## 🤝 Contributing

Contributions are welcome! Bug fixes, new templates, UI improvements — all appreciated.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a Pull Request against `main`

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ by [zqwui](https://github.com/zqwui) · Powered by **MiMo-V2.5-Pro**

⭐ If VibeCoder saved you time, a star on the repo goes a long way!

[Live Demo](https://vibecoderapp.vercel.app) · [Report a Bug](https://github.com/zqwui/vibe-coder/issues) · [Request a Feature](https://github.com/zqwui/vibe-coder/issues)

</div>
