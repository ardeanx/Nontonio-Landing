"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  Film,
  Flame,
  Globe,
  Layers3,
  MonitorPlay,
  PlayCircle,
  Shield,
  Sparkles,
  Star,
  Tv,
  Zap,
  BookOpen,
  GalleryVerticalEnd,
  TrendingUp,
  Wifi,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";
import { div } from "framer-motion/m";

const navItems = [
  "Home",
  "Categories",
  "Features",
  "Progress",
  "Roadmap",
];

const categories = [
  {
    title: "Anime",
    description: "Curated anime library with seasonal highlights, trending releases, and premium discovery.",
    icon: Sparkles,
    badge: "Core Catalog",
  },
  {
    title: "Movies",
    description: "Modern cinematic hub for blockbuster drops, indie picks, and personalized watch flows.",
    icon: Film,
    badge: "Streaming",
  },
  {
    title: "TV Shows",
    description: "Series-first browsing with smart continue watching and immersive collection layouts.",
    icon: Tv,
    badge: "Series",
  },
  {
    title: "Short Drama",
    description: "Vertical-era storytelling packaged for fast sessions and binge-friendly micro episodes.",
    icon: Flame,
    badge: "Fast Format",
  },
  {
    title: "K-Drama",
    description: "K-drama spotlight area with mood-based discovery and high-retention content rails.",
    icon: Star,
    badge: "Popular",
  },
  {
    title: "Manga",
    description: "A clean reading experience with chapter sync, bookmarks, and collector-style presentation.",
    icon: GalleryVerticalEnd,
    badge: "Reader",
  },
  {
    title: "Novel",
    description: "Long-form reading mode with distraction-free UI and progress continuity across devices.",
    icon: BookOpen,
    badge: "Library",
  },
  {
    title: "Videos",
    description: "Beyond entertainment: trailers, bonus content, creator uploads, and community-driven clips.",
    icon: PlayCircle,
    badge: "Expansion",
  },
];

const highlights = [
  {
    title: "Rich Content Ecosystem",
    description: "A comprehensive collection of diverse media formats, curated for seamless discovery and consumption.",
    icon: Layers3,
  },
  {
    title: "Powerful Admin Panel",
    description: "Robust backend tools for content management, user insights, and platform administration",
    icon: MonitorPlay,
  },
  {
    title: "Performance-minded architecture",
    description: "Designed for scalable catalogs, smooth playback journeys, and high-clarity content browsing.",
    icon: Zap,
  },
  {
    title: "Enterprise-grade Experience",
    description: "A polished, signal-driven interface with advanced interaction design and cinematic visual language",
    icon: Shield,
  },
];

const stats = [
  { label: "Media Verticals", value: "8+", icon: Database },
  { label: "Current Phase", value: "Beta Core", icon: Wifi },
  { label: "Target Experience", value: "Universal", icon: Globe },
  { label: "Design Direction", value: "Futuristic", icon: TrendingUp },
];

const milestones = [
  {
    phase: "Phase 01",
    title: "UI/UX Design System",
    progress: 100,
    status: "Completed",
    details: [
      "Brand direction established",
      "Admin & Web Client design systems built",
      "User flows and interaction patterns defined",
      "Core experience layers visualized",
      "Platform architecture mapped for development",
    ],
  },
  {
    phase: "Phase 02 (12 Sprint)",
    title: "API Core & Content Engine",
    progress: 30,
    status: "In Progress",
    details: [
      "Sprint 0 - API Foundation & Bootstraping Implemented",
      "Sprint 1 - Auth, User, Role & Permission Foundation Built",
      "Sprint 2 - Content Core & Taxonomy Established",
      "Sprint 3 - Content Type Modules Structured for Media Formats Established",
      "Sprint 4 - Season, Episode, Media Metadata, and Cataloging Systems Developed",
    ],
  },
  {
    phase: "Phase 03 (10 Sprint)",
    title: "Frontend Development",
    progress: 0,
    status: "Queued",
    details: [
    ],
  },
  {
    phase: "Phase 04",
    title: "Testing, Polish, and Iteration",
    progress: 0,
    status: "Queued",
    details: [
    ],
  },
  {
    phase: "Phase 05",
    title: "Deployment & Launch Preparation",
    progress: 0,
    status: "Queued",
    details: [
    ],
  },
  {
    phase: "Phase 06",
    title: "Mobile Development & Expansion",
    progress: 0,
    status: "Queued",
    details: [
    ],
  },
];

const roadmap = [
  {
    quarter: "Milestone A",
    title: "Platform Engineering",
    text: "Researching the platform Design System and building the platform ecosystem.",
  },
  {
    quarter: "Milestone B",
    title: "Full Stack Development",
    text: "Building the core API, content engine, and frontend layers for the web client experience.",
  },
  {
    quarter: "Milestone C",
    title: "Testing & Deployment",
    text: "Polishing the web client experience, deploying the platform, and preparing for launch.",
  },
  {
    quarter: "Milestone D",
    title: "Launching & Mobile Dev",
    text: "Executing the public launch of the web client and beginning development on mobile applications.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });

      const data = await res.json();

      setMessage(data.message ?? "Done.");
      setIsSuccess(res.ok);

      if (res.ok) {
        setEmail("");
        setConsent(false);
      }
    } catch {
      setMessage("Network error.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          required
          className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-white/45 backdrop-blur-xl outline-none transition focus:border-red-400/40"
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-gradient-to-r from-red-500 to-rose-600 px-6 py-4 font-semibold text-white shadow-[0_0_35px_rgba(239,68,68,0.30)] transition hover:translate-y-[-2px] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Join Waitlist"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <label className="mt-4 flex items-start gap-3 text-sm text-white/55">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-white/20 bg-black/30"
        />
        <span>
          I agree to receive product updates, launch announcements, and waitlist emails from Nontonio.
        </span>
      </label>

      {message ? (
        <p className={`mt-4 text-sm ${isSuccess ? "text-green-300" : "text-red-300"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-red-500/30">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[15%] h-[24rem] w-[24rem] rounded-full bg-orange-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(circle at center, black 45%, transparent 85%)",
          }}
        />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-red-400/25 bg-white/5 shadow-[0_0_30px_rgba(239,68,68,0.18)]">
              <Image
                src="/logo.png"
                alt="Nontonio Logo"
                fill
                className="object-contain p-1.5"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/50">OTT Platform</p>
              <h1 className="text-lg font-semibold">Nontonio</h1>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-200 md:block">
              Under Development
            </div>
            <a
              href="#launch"
              className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_25px_rgba(239,68,68,0.35)] transition hover:scale-[1.02]"
            >
              Join Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <section id="home" className="relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24 lg:pt-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
              <Clock3 className="h-4 w-4 text-red-300" />
              Building the future of entertainment, one layer at a time
            </div>

            <h2 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              A next-gen <span className="bg-gradient-to-r from-red-400 via-red-500 to-orange-400 bg-clip-text text-transparent">OTT universe</span>
              <br />
              for streaming, reading, and binge culture.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Nontonio is an all-in-one media streaming platform currently in development. It is being designed to combine anime, movies, TV shows, short drama, K-drama, manga, novels, and videos into one cinematic ecosystem.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#progress"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-gradient-to-r from-red-500 to-rose-600 px-6 py-3.5 font-semibold text-white shadow-[0_0_35px_rgba(239,68,68,0.30)] transition hover:translate-y-[-2px]"
              >
                Track Development
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
              >
                View Live Build
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    transition={{ duration: 0.45, delay: 0.08 * index }}
                    className="group rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-2 text-red-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_16px_rgba(248,113,113,0.8)]" />
                    </div>
                    <p className="mt-4 text-2xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-sm text-white/55">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_0_80px_rgba(239,68,68,0.12)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_30%)]" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/30 p-4">
                  <div>
                    <p className="text-sm text-white/50">Platform Status</p>
                    <p className="mt-1 text-xl font-semibold">Backend Development</p>
                  </div>
                  <div className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-sm text-red-200">
                    API
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/40">Experience Mode</p>
                    <p className="mt-3 text-3xl font-black text-white">Cinematic</p>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      Dark-first visual system with red signal accents and advanced surface layering.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/40">Content Engine</p>
                    <p className="mt-3 text-3xl font-black text-white">Hybrid</p>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      Streaming, episodic content, reading formats, and flexible discovery combined.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-red-400/20 bg-gradient-to-br from-red-500/10 to-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/55">Build Confidence Index</p>
                      <p className="mt-1 text-4xl font-black">42%</p>
                    </div>
                    <BadgeCheck className="h-12 w-12 text-red-300" />
                  </div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-red-400 via-red-500 to-orange-400" />
                  </div>
                  <p className="mt-3 text-sm text-white/60">
                    Visual identity is strong, platform direction is clear, and major experience layers are actively taking shape.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["UI Signal", "Advanced"],
                    ["Stack Readiness", "Active"],
                    ["Launch Direction", "Measured"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-3xl border border-white/10 bg-black/30 p-4 text-center"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-white/35">{label}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="categories" className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-200">
              <Sparkles className="h-4 w-4" />
              Media Ecosystem
            </div>
            <h3 className="text-3xl font-black tracking-tight sm:text-4xl">
              Designed as one destination for every kind of binge habit.
            </h3>
            <p className="mt-4 text-lg leading-8 text-white/65">
              Nontonio is not limited to a single content lane. It is being shaped as a unified media environment for streaming, reading, and short-format engagement.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:border-red-400/30 hover:bg-white/[0.07]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-red-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white/60">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="mt-5 text-xl font-semibold">{item.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-white/60">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-red-200">Why Nontonio</p>
              <h3 className="mt-4 text-3xl font-black tracking-tight">Platform with rich Media Entertainment.</h3>
              <p className="mt-4 text-base leading-8 text-white/65">
                A single powerful platform for all your streaming and reading needs, designed to evolve with your entertainment habits and the future of media consumption. Nontonio is being built to combine the best of cinematic design, multi-format content, and performance-driven architecture into one OTT universe.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                  >
                    <div className="inline-flex rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-red-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-5 text-xl font-semibold">{item.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-white/60">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="progress" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                <TrendingUp className="h-4 w-4" />
                Development Progress Notice
              </div>
              <h3 className="text-3xl font-black tracking-tight sm:text-4xl">Real Progress, Visible Results</h3>
              <p className="mt-4 text-lg leading-8 text-white/65">
                Nontonio is still under development, and this section exists to show that the platform is moving through real build stages, not empty hype wrapped in gradients.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
              <p className="text-sm text-white/50">Overall Development Progress</p>
              <p className="mt-1 text-3xl font-black">45%</p>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {milestones.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-red-200">{item.phase}</p>
                    <h4 className="mt-2 text-2xl font-bold">{item.title}</h4>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white/70">
                    {item.status}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-white/55">Completion</span>
                    <span className="font-semibold text-white">{item.progress}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-400 via-red-500 to-orange-400"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {item.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-3 text-sm text-white/65">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <Globe className="h-4 w-4 text-red-300" />
              Roadmap Overview
            </div>
            <h3 className="text-3xl font-black tracking-tight sm:text-4xl">How Nontonio moves from concept to launch.</h3>
          </div>

          <div className="relative grid gap-5 lg:grid-cols-4">
            {roadmap.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="mb-4 inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-sm text-red-200">
                  {item.quarter}
                </div>
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/60">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="launch" className="pb-24 pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-red-400/20 bg-gradient-to-br from-red-500/15 via-white/[0.04] to-transparent p-8 backdrop-blur-2xl sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.18),transparent_25%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70">
                  <Zap className="h-4 w-4 text-red-300" />
                  Early Access Opening Soon
                </div>
                <h3 className="text-3xl font-black tracking-tight sm:text-5xl">
                  Join the waitlist for Nontonio.
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                  Nontonio is still in active development. Join the waitlist to get early updates, launch news, and first access when the platform begins rolling out.
                </p>
                <WaitlistForm />
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-white/50">Waitlist Benefit</p>
                  <p className="mt-2 text-xl font-semibold">Get early platform updates and priority access.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-white/50">Current Status</p>
                  <p className="mt-2 text-xl font-semibold">Core API Development are in Progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-white/45 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Nontonio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://nontonio.com"
              className="transition hover:text-red-500"
            >
              Track Development
            </a>
            <a
              href="https://staging-api.nontonio.com"
              target="_blank"
              className="transition hover:text-red-500"
            >
              Preview Current Live Build
            </a>
            <a
              href="https://ardeanbimasaputra.com"
              target="_blank"
              className="transition hover:text-red-500"
            >
              Owner
            </a>
        </div>
        </div>
      </footer>
    </main>
  );
}
