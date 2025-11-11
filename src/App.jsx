import { useState } from "react";
import ProjectCard from "./components/ProjectCard.jsx";
import Logo from "./assets/Logo.PNG";

export default function PortfolioPage() {
  const nav = [
    { id: "services", label: "Services" },
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const [status, setStatus] = useState({ state: "idle", msg: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "success", msg: "Thanks! I'll reply within 24 hours." });

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/xblpnjae", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });

    if (res.ok) {
      form.reset();
      setStatus({
        state: "success",
        msg: "Thanks! I’ll reply within 24 hours.",
      });
    } else {
      setStatus({
        state: "error",
        msg: "Something went wrong. Please try again or email contact@jonascode.com.",
      });
    }
  }

  const services = [
    {
      title: "Launch-ready websites",
      desc: "Custom, responsive sites and landing pages designed to look great on mobile and turn visitors into leads.",
    },
    {
      title: "AI lead handling & automation",
      desc: "Turn contact form messages and inbox chaos into structured, AI-tagged leads routed to your email, CRM, or Slack.",
    },
    {
      title: "Web apps & client portals",
      desc: "Lightweight web apps, dashboards, or client portals built with React and modern APIs so your clients can log in and self-serve.",
    },
    {
      title: "Integrations & tech glue",
      desc: "Connect your site with tools like Stripe, Notion, Airtable, or Make/Zapier so everything works together instead of in silos.",
    },
  ];

  const projects = [
    {
      name: "Coffee House Website",
      tag: "Framer • Small Business",
      summary:
        "A modern cafe landing page built using Framer with integrated booking system.",
      cta: "View Demo",
      image: "/projects/coffee-house.png",
      url: "/coffee-house", // internal route -> handled by <Link>
    },
    {
      name: "Portfolio Builder",
      tag: "React • Tailwind",
      summary:
        "Generate a clean one-page portfolio from a few fields, live preview.",
      cta: "Try It",
      image: "/projects/portfolio-builder.png", // optional if you have it
      url: "/portfolio-builder",
    },

    {
      name: "AI Form Assistant",
      tag: "Automation • AI",
      summary: "Automates form processing using ChatGPT + Make workflows.",
      cta: "View Demo",
      image: "/projects/ai-form-assistant.png",
      url: "/ai-form-assistant", // ← point to your internal route
    },
  ];

  const steps = [
    {
      title: "Discovery & Strategy",
      text: "We start with a short call to define your goals, target audience, and what success looks like. You’ll get a clear roadmap before we begin.",
    },
    {
      title: "Design & Prototype",
      text: "You’ll see a clickable mockup of your future website simple, visual, and easy to review. We refine it together before writing a single line of code.",
    },
    {
      title: "Build & Automate",
      text: "I develop your website using modern tech and connect AI or no-code automations to handle forms, leads, or repetitive tasks for you.",
    },
    {
      title: "Launch & Support",
      text: "Your site goes live with analytics, SEO basics, and a quick handover. I stay available for post-launch tweaks or future improvements.",
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/80 border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-2 font-semibold tracking-tight text-xl"
            >
              <img
                src={Logo}
                alt="JonasCode"
                className="h-8 w-auto object-contain brightness-110 drop-shadow-[0_0_6px_rgba(255,200,0,0.3)] transition-transform duration-300 hover:scale-105"
              />
            </a>

            <nav
              className="hidden md:flex gap-6 text-sm"
              aria-label="Main navigation"
            >
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="hover:text-indigo-400"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              className="rounded-xl border border-indigo-500 px-3 py-2 text-sm font-medium text-indigo-300 hover:bg-indigo-600/10"
            >
              Get a quote
            </a>
          </div>
        </header>

        <section className="mx-auto max-w-7xl min-h-[90vh] flex items-center px-4 py-12 md:py-24">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center w-full">
            {/* LEFT TEXT */}
            <div className="mx-auto md:mx-0">
              <p className="inline-block border border-slate-700 bg-slate-800 text-slate-300 px-3 py-1 text-xs rounded-full">
                Available for freelance projects
              </p>

              <h1 className="mt-4 text-5xl font-semibold leading-tight max-w-2xl">
                I build <span className="text-indigo-400">smart websites</span>{" "}
                and <span className="text-indigo-400">AI automations</span> that
                help small businesses grow.
              </h1>

              <p className="mt-4 text-slate-400 leading-relaxed max-w-xl">
                From landing pages to automated workflows, I help you launch
                fast, look professional, and save hours every week by automating
                forms, leads, and follow-ups using modern tech and AI tools.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="bg-indigo-600 px-4 py-2.5 rounded-xl text-white text-sm font-medium hover:bg-indigo-700"
                >
                  Get a free quote
                </a>
                <a
                  href="#work"
                  className="border border-slate-500 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800"
                >
                  See my work →
                </a>
              </div>
            </div>

            {/* RIGHT ICON */}
            <div className="flex flex-col items-center justify-center text-center md:items-end md:text-right md:pr-10 mt-10 md:mt-0">
              <div className="text-7xl">⚡</div>
              <p className="text-slate-400 mt-3 text-base font-medium">
                Fast. Reliable. Smart.
              </p>
              <p className="text-slate-500 text-sm mt-1 max-w-xs md:ml-auto leading-relaxed">
                Websites + automations for small businesses, creators, and
                agencies.
              </p>
            </div>
          </div>
        </section>
        {/* WHO I WORK WITH */}
        <section className="border-y border-slate-800 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
            <span className="uppercase tracking-wide text-[0.7rem] text-slate-500">
              Who I work with
            </span>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-700/70 px-3 py-1 bg-slate-900/60">
                Small businesses ready to look sharp online
              </span>
              <span className="rounded-full border border-slate-700/70 px-3 py-1 bg-slate-900/60">
                Founders automating their client workflow
              </span>
              <span className="rounded-full border border-slate-700/70 px-3 py-1 bg-slate-900/60">
                Agencies needing a dependable web dev partner
              </span>
            </div>
          </div>
        </section>

        <section id="services" className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold">Services</h2>
          <p className="text-slate-400 mt-2 mb-8 text-sm max-w-2xl">
            I focus on small, practical projects that ship quickly: launch-ready
            websites, simple web apps, and AI-powered automations that actually
            save you time.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="border border-slate-800 rounded-2xl p-5 hover:bg-slate-900 transition"
              >
                <div className="font-semibold text-lg">{s.title}</div>
                <p className="text-slate-400 mt-2 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="work"
          className="bg-slate-900 border-y border-slate-800 py-16 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8">Selected Work</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.name} {...p} />
              ))}
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="bg-slate-900 border-y border-slate-800 py-16 px-4"
        >
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-3">What People Say</h2>
            <p className="text-slate-400 mb-8 text-sm">
              Feedback and impressions from people I’ve collaborated or learned
              with online.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-slate-800 rounded-2xl p-6 bg-slate-950/60">
                <p className="text-slate-300 text-sm">
                  “Younis is very detail-oriented and fast. He turns ideas into
                  working demos in a really structured way.”
                </p>
                <p className="text-slate-500 text-xs mt-3">
                  Fellow developer, online community
                </p>
              </div>

              <div className="border border-slate-800 rounded-2xl p-6 bg-slate-950/60">
                <p className="text-slate-300 text-sm">
                  “Clear communication, good questions, and always focused on
                  solving the real problem, not just writing code.”
                </p>
                <p className="text-slate-500 text-xs mt-3">
                  Project collaborator
                </p>
              </div>

              <div className="border border-slate-800 rounded-2xl p-6 bg-slate-950/60">
                <p className="text-slate-300 text-sm">
                  “Delivers clean, modern results and cares about the user
                  experience and automation behind the scenes.”
                </p>
                <p className="text-slate-500 text-xs mt-3">
                  UX-focused teammate
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold mb-8">How Our Process Works</h2>
          <p className="text-slate-400 mb-8 text-sm max-w-2xl">
            A clear, fast, and collaborative process that keeps you in the loop
            from our first chat to your live website.
          </p>

          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={i} className="border border-slate-800 rounded-2xl p-5">
                <div className="text-indigo-400 text-xs mb-1">Step {i + 1}</div>
                <div className="font-semibold">{s.title}</div>
                <p className="text-slate-400 mt-2 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
        {/* TECH & TOOLS */}
        <section className="border-y border-slate-800 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">
              Tech & tools I work with
            </p>

            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-slate-200">
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                React
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Vite
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                TailwindCSS
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Node.js
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Framer Motion
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Make (Integromat)
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Zapier
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Formspree
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Vercel
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                AI APIs (OpenAI, etc.)
              </span>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="bg-slate-900 border-y border-slate-800 py-16 px-4"
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-semibold mb-3">About Me</h2>
              <p className="text-slate-400 leading-relaxed">
                I’m <b>Younis Haitham</b> a certified{" "}
                <b>Web & Mobile Developer</b> passionate about building clean,
                modern websites that actually help businesses grow.
                <br />
                <br />I combine <b>development</b> and <b>automation</b> to save
                clients time: smart forms that route messages automatically,
                dashboards that update themselves, and integrations that remove
                repetitive work.
                <br />
                <br />
                Every project I take on is practical, fast to deliver, and
                focused on real results not just design for design’s sake.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
                <div className="font-semibold">Languages</div>
                <p className="text-slate-400 text-sm mt-1">
                  English, French, Arabic
                </p>
              </div>

              <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
                <div className="font-semibold">Tech Stack</div>
                <p className="text-slate-400 text-sm mt-1">
                  React, TailwindCSS, Node.js, Framer Motion, Make (Integromat),
                  AI APIs
                </p>
              </div>

              <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
                <div className="font-semibold">Focus</div>
                <p className="text-slate-400 text-sm mt-1">
                  Web design & automation for small businesses, creators, and
                  startups who need results fast.
                </p>
              </div>
              <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
                <div className="font-semibold">Beyond Code</div>
                <p className="text-slate-400 text-sm mt-1">
                  Outside of development, I enjoy exploring new AI tools,
                  automating everyday workflows, and sharing knowledge with
                  other tech enthusiasts. I’m always looking for smarter,
                  simpler ways to solve problems both in code and in life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold mb-3">Let’s Work Together</h2>
          <p className="text-slate-400 mb-8">
            Tell me about your project - I’ll reply within 24 hours.
          </p>

          {status.msg && (
            <div
              role="status"
              aria-live="polite"
              className={`mb-6 rounded-lg px-3 py-2 text-sm ${
                status.state === "success"
                  ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30"
                  : "bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/30"
              }`}
            >
              {status.msg}
            </div>
          )}

          {status.state === "success" ? (
            // ✅ Success screen
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-6">
              <div className="text-sm font-medium text-emerald-300 mb-1">
                Message sent successfully
              </div>
              <p className="text-sm text-emerald-100 mb-3">
                Thanks for reaching out! I’ll review your message and reply
                within <span className="font-semibold">24 hours</span>.
              </p>
              <p className="text-xs text-emerald-200/80">
                Want to send another project brief?{" "}
                <button
                  type="button"
                  onClick={() => setStatus({ state: "idle", msg: "" })}
                  className="underline underline-offset-2 hover:text-emerald-100"
                >
                  Reset the form
                </button>
                .
              </p>
            </div>
          ) : (
            // 📨 Contact form (shown when not successful yet)
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  What do you need help with?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell me a bit about your project, timeline, and budget…"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl font-medium text-sm"
              >
                {status.state === "loading" ? "Sending…" : "Send message"}
              </button>

              {status.state === "error" && (
                <p className="text-xs text-rose-300 mt-1">
                  {status.msg ||
                    "Something went wrong. You can also email me directly at your@email.com."}
                </p>
              )}
            </form>
          )}
        </section>

        <footer className="border-t border-slate-800 py-6 text-slate-500 text-sm">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span>© {new Date().getFullYear()} Younis Haitham.</span>{" "}
              <span className="text-slate-600">
                Made by{" "}
                <span className="text-slate-300 font-medium">JonasCode ⚡</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm">
              <a
                href="https://github.com/youniscode"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300 hover:underline underline-offset-4"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/younis-haitham-9581b013a/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300 hover:underline underline-offset-4"
              >
                LinkedIn
              </a>
              <a
                href="mailto:contact@jonascode.com"
                className="hover:text-slate-300 hover:underline underline-offset-4"
              >
                contact@jonascode.com
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
