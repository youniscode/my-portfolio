import { useState } from "react";
import ProjectCard from "./components/ProjectCard";

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
      title: "Websites",
      desc: "Responsive websites and landing pages built fast with modern tools.",
    },
    {
      title: "AI-powered automation",
      desc: "Automate tasks or integrate AI assistants to save time and cost.",
    },
    {
      title: "Web Apps",
      desc: "Full-stack applications built with React, Node.js, and databases.",
    },
    {
      title: "Integrations",
      desc: "Connect your site with payment, CRM, or analytics tools.",
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
        "A fast, minimal personal portfolio generator built for freelancers.",
      cta: "View Repo",
      url: "https://github.com/youniscode/portfolio-builder",
    },
    {
      name: "AI Form Assistant",
      tag: "Automation • AI",
      summary: "Automates form processing using ChatGPT + Make workflows.",
      cta: "View Demo",
      url: "https://your-demo-url-3.com",
    },
  ];

  const steps = [
    { title: "Discover", text: "We discuss your goals, style, and features." },
    { title: "Design", text: "I create a clean layout and choose visuals." },
    { title: "Build", text: "Your site is developed using modern tools." },
    { title: "Launch", text: "Final testing, deployment, and SEO setup." },
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/80 border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <a href="#" className="font-semibold tracking-tight text-xl">
              jonascode.dev
            </a>
            <nav className="hidden md:flex gap-6 text-sm">
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

        <section className="mx-auto max-w-7xl px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block border border-slate-700 bg-slate-800 text-slate-300 px-3 py-1 text-xs rounded-full">
              Available for freelance projects
            </p>
            <h1 className="mt-4 text-5xl font-semibold">
              Building smart websites & AI automations for small businesses
            </h1>
            <p className="mt-4 text-slate-400 leading-relaxed">
              I’m a certified Web & Web Mobile Developer helping clients build
              professional, modern websites and automate workflows using AI and
              no-code tools.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#work"
                className="bg-indigo-600 px-4 py-2.5 rounded-xl text-white text-sm font-medium hover:bg-indigo-700"
              >
                See my work
              </a>
              <a
                href="#contact"
                className="border border-slate-500 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800"
              >
                Contact me
              </a>
            </div>
          </div>
          <div className="text-center">
            <div className="text-7xl">⚡</div>
            <p className="text-slate-500 mt-2">Fast. Reliable. Smart.</p>
          </div>
        </section>

        <section id="services" className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold mb-8">Services</h2>
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

        <section id="process" className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold mb-8">How We’ll Work</h2>
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

        <section
          id="about"
          className="bg-slate-900 border-y border-slate-800 py-16 px-4"
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-semibold mb-3">About Me</h2>
              <p className="text-slate-400 leading-relaxed">
                I’m Younis Haitham, a certified{" "}
                <b>Développeur Web & Web Mobile</b>. I build modern,
                user-friendly websites and use AI tools to automate repetitive
                tasks for clients.
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
                  React, Tailwind, Node.js, Framer, Make.com, AI APIs
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

          <form
            onSubmit={handleSubmit}
            className="max-w-md space-y-4"
            noValidate
          >
            <label htmlFor="name" className="sr-only">
              Your name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label htmlFor="email" className="sr-only">
              Your email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              required
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="inline-block bg-indigo-600 text-white font-medium px-5 py-3 rounded-xl hover:bg-indigo-500 transition"
            >
              Send Message
            </button>
          </form>
        </section>

        <footer className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Younis Haitham - All rights reserved.
        </footer>
      </div>
    </>
  );
}
