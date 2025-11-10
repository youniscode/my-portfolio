// src/pages/AiFormAssistant.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AiFormAssistant() {
  const [aiSummary, setAiSummary] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link to="/" className="text-slate-400 text-sm hover:underline">
          ← Back to jonascode.dev
        </Link>

        <h1 className="text-3xl font-semibold mt-4">AI Form Assistant</h1>
        <p className="text-slate-400 mt-2">
          A small demo that shows how form submissions can be routed through AI
          and automation tools (like Make/Zapier) to save you manual work.
        </p>
        <p className="text-xs text-slate-400 mt-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 border border-slate-700 px-3 py-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-600 text-white">
              Use case
            </span>
            <span>
              For freelancers, agencies, and small businesses handling lots of
              form leads.
            </span>
          </span>
        </p>

        {/* Two-column layout: form + explanation */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Left: demo form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold mb-2">Demo form</h2>
            <p className="text-sm text-slate-400 mb-4">
              In this demo, a simple contact form sends structured data to an AI
              + automation workflow. The AI can summarize, tag, or route
              messages.
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formEl = e.target;
                const formData = new FormData(formEl);

                const name = formData.get("name") || "Someone";
                const email = formData.get("email") || "no-email";
                const projectType = formData.get("projectType") || "Project";
                const message =
                  formData.get("message") || "No extra details were provided.";

                setIsProcessing(true);
                setAiSummary("");

                // Fake AI delay
                setTimeout(() => {
                  const summary = `${name} (${email}) is interested in a ${projectType} project.\n\nKey details:\n${message}\n\nSuggested next step: Reply with 2–3 clarifying questions and a proposed call time.`;
                  setAiSummary(summary);
                  setIsProcessing(false);
                  formEl.reset();
                }, 800);
              }}
            >
              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Project type
                </label>
                <select
                  name="projectType"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Website</option>
                  <option>Automation</option>
                  <option>AI integration</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="3"
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Briefly describe your project or idea..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl font-medium text-sm"
              >
                Send message
              </button>
            </form>
          </div>

          {/* Right: explanation + AI summary preview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold mb-2">
              How the AI assistant works
            </h2>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Visitor fills in the form on your site.</li>
              <li>
                • The form data is sent to an automation tool (Make, Zapier,
                etc.).
              </li>
              <li>
                • An AI step analyzes the message and extracts key details.
              </li>
              <li>
                • The workflow can tag the lead, prioritize it, and send you a
                summary.
              </li>
              <li>
                • You receive a clean, structured email or CRM entry instead of
                raw text.
              </li>
            </ul>

            {/* AI preview box */}
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              <div className="text-xs font-semibold text-slate-400 tracking-wide uppercase mb-2">
                AI assistant demo
              </div>

              {isProcessing && (
                <p className="text-sm text-slate-300">
                  Analyzing message…{" "}
                  <span className="text-indigo-400">Thinking with AI</span>
                </p>
              )}

              {!isProcessing && aiSummary && (
                <p className="text-sm text-slate-200 whitespace-pre-line">
                  {aiSummary}
                </p>
              )}

              {!isProcessing && !aiSummary && (
                <p className="text-sm text-slate-400">
                  Fill out the form on the left and submit to see an example AI
                  summary here.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Problem / Solution section */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold mb-3">Problem / Solution</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">
                ❌ The Problem
              </h3>
              <p className="text-slate-400">
                Teams often lose time reading long, unstructured contact form
                messages. Important leads get buried in inboxes and never
                followed up.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">
                ✅ The Solution
              </h3>
              <p className="text-slate-400">
                An AI-powered workflow summarizes, tags, and prioritizes each
                message instantly routing it to your CRM or Slack with the key
                info ready for action.
              </p>
            </div>
          </div>
        </div>
        {/* CTA section */}
        <div className="mt-10 text-center border-t border-slate-800 pt-10">
          <h2 className="text-2xl font-semibold mb-3">
            Want a workflow like this for your business?
          </h2>
          <p className="text-slate-400 mb-6 text-sm max-w-md mx-auto">
            I build AI-powered automations that save time and make your lead
            handling smarter. Let’s design one that fits your tools.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl font-medium text-sm"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </div>
  );
}
