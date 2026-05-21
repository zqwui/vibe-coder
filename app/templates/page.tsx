"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = ["All", "Web App", "Game", "Tool", "Bot", "API", "Mobile"];

const TEMPLATES = [
  { emoji: "🌐", title: "Portfolio Website", category: "Web App", description: "Personal portfolio with hero, projects grid, skills, and contact form.", template: "Build a personal portfolio website with a hero section, animated intro, projects grid with filter by category, skills progress bars, and a working contact form with validation" },
  { emoji: "🛒", title: "E-Commerce Store", category: "Web App", description: "Product listing, cart, checkout flow with Stripe integration.", template: "Build an e-commerce store with product listing page, search and filter, shopping cart with localStorage, checkout form, and Stripe payment integration" },
  { emoji: "📝", title: "Blog Platform", category: "Web App", description: "Markdown blog with categories, tags, and search.", template: "Build a blog platform with markdown post rendering, category and tag filtering, search functionality, reading time estimate, and a newsletter signup form" },
  { emoji: "📊", title: "Dashboard App", category: "Web App", description: "Analytics dashboard with charts, stats, and data tables.", template: "Build an analytics dashboard with KPI stat cards, line and bar charts using Chart.js, a sortable data table, date range picker, and CSV export" },
  { emoji: "💬", title: "Chat App", category: "Web App", description: "Real-time chat with rooms, usernames, and message history.", template: "Build a real-time chat app with WebSocket support, multiple chat rooms, username selection, message history, typing indicators, and emoji reactions" },
  { emoji: "🗓️", title: "Calendar App", category: "Web App", description: "Monthly calendar with event creation and reminders.", template: "Build a calendar app with monthly and weekly views, drag-and-drop event creation, color-coded categories, recurring events, and browser notification reminders" },

  { emoji: "🎮", title: "Wordle Clone", category: "Game", description: "5-letter word guessing game with color-coded feedback.", template: "Build a Wordle clone browser game with 5-letter word guessing, color-coded feedback tiles (green/yellow/gray), on-screen keyboard, win/lose state, and daily word reset" },
  { emoji: "🐍", title: "Snake Game", category: "Game", description: "Classic snake game on HTML5 canvas with high scores.", template: "Build a classic Snake game using HTML5 canvas with smooth movement, food spawning, collision detection, score tracking, high score localStorage, and increasing speed" },
  { emoji: "🃏", title: "Memory Card Game", category: "Game", description: "Flip cards to find matching pairs, track moves and time.", template: "Build a memory card matching game with a grid of face-down cards, flip animation, match detection, move counter, timer, difficulty levels, and a leaderboard" },
  { emoji: "🧩", title: "2048 Clone", category: "Game", description: "Slide tiles to combine numbers and reach 2048.", template: "Build a 2048 puzzle game with a 4x4 grid, arrow key and swipe controls, tile merging logic, score tracking, undo move, and a game over/win screen" },
  { emoji: "🎯", title: "Quiz App", category: "Game", description: "Multiple choice quiz with timer, score, and leaderboard.", template: "Build a quiz app with multiple choice questions, countdown timer per question, score tracking, progress bar, result summary, and a local leaderboard" },

  { emoji: "🔗", title: "URL Shortener", category: "Tool", description: "Shorten URLs, copy to clipboard, track click counts.", template: "Build a URL shortener tool with a form to paste long URLs, generate short alphanumeric codes, copy to clipboard button, click count tracking, and a history list" },
  { emoji: "🎨", title: "Color Palette Generator", category: "Tool", description: "Generate harmonious color palettes from a base color.", template: "Build a color palette generator that takes a base hex color and generates complementary, analogous, and triadic palettes, with copy hex/rgb/hsl buttons and export as CSS variables" },
  { emoji: "📄", title: "Resume Builder", category: "Tool", description: "Fill a form, preview resume, export as PDF.", template: "Build a resume builder with form sections for personal info, experience, education, and skills, a live preview panel, multiple templates, and PDF export using html2pdf" },
  { emoji: "⏱️", title: "Pomodoro Timer", category: "Tool", description: "Focus timer with work/break cycles and task list.", template: "Build a Pomodoro timer with 25/5 minute work-break cycles, custom interval settings, a task list with checkboxes, session counter, sound notifications, and progress ring animation" },
  { emoji: "💱", title: "Currency Converter", category: "Tool", description: "Convert between currencies with live exchange rates.", template: "Build a currency converter with a dropdown for 30+ currencies, live exchange rate API integration, swap button, conversion history, and a mini chart of rate trends" },
  { emoji: "📋", title: "Markdown Editor", category: "Tool", description: "Split-pane markdown editor with live preview.", template: "Build a split-pane markdown editor with live HTML preview, syntax highlighting in the editor, toolbar buttons for bold/italic/link/image, word count, and export as HTML or PDF" },

  { emoji: "🤖", title: "Discord Bot", category: "Bot", description: "Slash commands for moderation, fun, and welcome messages.", template: "Build a Discord bot with slash commands for moderation (kick, ban, mute), fun commands (8ball, meme, joke), a welcome message for new members, and a help menu" },
  { emoji: "📬", title: "Telegram Bot", category: "Bot", description: "Telegram bot with commands, inline keyboards, and webhooks.", template: "Build a Telegram bot with command handlers, inline keyboard menus, webhook setup, a /start onboarding flow, /help command, and a simple FAQ auto-reply system" },
  { emoji: "🐦", title: "Twitter/X Bot", category: "Bot", description: "Auto-post tweets on a schedule with hashtag tracking.", template: "Build a Twitter/X bot that auto-posts scheduled tweets from a content queue, tracks mentions and replies, monitors hashtags, and sends a daily summary digest" },
  { emoji: "🛎️", title: "Slack Bot", category: "Bot", description: "Slack bot for standup reminders and team polls.", template: "Build a Slack bot that sends daily standup reminder messages, collects responses via modal forms, runs team polls with emoji reactions, and posts weekly summaries" },

  { emoji: "🚀", title: "REST API Boilerplate", category: "API", description: "Express.js API with JWT auth, CRUD routes, and validation.", template: "Build a REST API boilerplate with Express.js, JWT authentication with refresh tokens, CRUD routes for a resource, Zod input validation, rate limiting, and structured error handling" },
  { emoji: "🔐", title: "Auth Service", category: "API", description: "Full auth system: register, login, OAuth, password reset.", template: "Build an authentication service with email/password register and login, JWT access and refresh tokens, Google OAuth, password reset via email, and account verification flow" },
  { emoji: "📁", title: "File Upload API", category: "API", description: "Upload, resize, and serve images with S3 storage.", template: "Build a file upload API with multipart form handling, image resizing with Sharp, S3 bucket storage, signed URL generation, file type validation, and upload progress tracking" },
  { emoji: "🔔", title: "Notification Service", category: "API", description: "Send email, SMS, and push notifications via queue.", template: "Build a notification service with email via Nodemailer, SMS via Twilio, web push notifications, a job queue with Bull, retry logic, and a notification preferences API" },
  { emoji: "🔍", title: "Search API", category: "API", description: "Full-text search with filters, pagination, and ranking.", template: "Build a full-text search API with Elasticsearch or MeiliSearch integration, faceted filters, pagination, relevance ranking, autocomplete suggestions, and search analytics" },

  { emoji: "📱", title: "Habit Tracker", category: "Mobile", description: "Daily habits with streaks, progress charts, and reminders.", template: "Build a mobile habit tracker app with daily check-in buttons, streak counters, weekly progress charts, push notification reminders, and a motivational quote of the day" },
  { emoji: "💰", title: "Expense Tracker", category: "Mobile", description: "Log expenses by category, view monthly summaries.", template: "Build a mobile expense tracker with quick-add expense form, category tags, monthly budget limits, pie chart breakdown, CSV export, and recurring expense detection" },
  { emoji: "🏃", title: "Fitness App", category: "Mobile", description: "Log workouts, track sets/reps, view progress over time.", template: "Build a mobile fitness app with workout logging (exercise, sets, reps, weight), exercise library with instructions, progress graphs over time, rest timer, and personal records tracking" },
  { emoji: "🍽️", title: "Recipe App", category: "Mobile", description: "Save recipes, plan meals, generate shopping lists.", template: "Build a mobile recipe app with recipe cards (ingredients, steps, photos), meal planner calendar, automatic shopping list generation from planned meals, and dietary filter tags" },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch = search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categoryColors: Record<string, string> = {
    "Web App": "bg-violet-100 text-violet-700",
    "Game": "bg-fuchsia-100 text-fuchsia-700",
    "Tool": "bg-cyan-100 text-cyan-700",
    "Bot": "bg-orange-100 text-orange-700",
    "API": "bg-pink-100 text-pink-700",
    "Mobile": "bg-emerald-100 text-emerald-700",
  };

  const activeTabColors: Record<string, string> = {
    "All": "bg-gray-900 text-white",
    "Web App": "bg-violet-600 text-white",
    "Game": "bg-fuchsia-600 text-white",
    "Tool": "bg-cyan-600 text-white",
    "Bot": "bg-orange-500 text-white",
    "API": "bg-pink-600 text-white",
    "Mobile": "bg-emerald-600 text-white",
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Template Gallery
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            30 ready-to-use project templates. Click any to open it in the builder.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all shadow-sm"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === cat
                  ? `${activeTabColors[cat]} border-transparent shadow-md`
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-xs opacity-70">
                  {TEMPLATES.filter((t) => t.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No templates found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t) => (
              <div
                key={t.title}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-violet-200 transition-all hover:-translate-y-1 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{t.emoji}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[t.category]}`}>
                    {t.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-violet-700 transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{t.description}</p>
                <Link
                  href={`/build?template=${encodeURIComponent(t.template)}`}
                  className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 transition-all shadow-sm hover:shadow-md"
                >
                  Use Template →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
