// src/pages/portfolio-builder/PortfolioBuilder.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const STORAGE_KEY = "portfolioBuilder:v1";

export default function PortfolioBuilder() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "John Doe",
    role: "Web Developer",
    tagline: "I build fast, modern web apps.",
    bio: "I’m a front-end developer focused on React, Tailwind, and great UX.",
    website: "https://example.com",
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
  });

  const [theme, setTheme] = useState("dark");
  const [banner, setBanner] = useState(null);
  const previewRef = useRef(null);

  // 🔹 Show success/error banner
  const showBanner = (type, msg) => {
    setBanner({ type, msg });
    setTimeout(() => setBanner(null), 2500);
  };

  // 🔹 Save / Load / Clear (localStorage)
  const savePortfolio = () => {
    const payload = { form, theme, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    showBanner("success", "Portfolio saved locally.");
  };

  const loadPortfolio = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return showBanner("error", "No saved portfolio found.");
    try {
      const { form: savedForm, theme: savedTheme } = JSON.parse(raw);
      if (savedForm) setForm(savedForm);
      if (savedTheme) setTheme(savedTheme);
      showBanner("success", "Saved portfolio loaded.");
    } catch {
      showBanner("error", "Could not read saved data.");
    }
  };

  const clearSaved = () => {
    localStorage.removeItem(STORAGE_KEY);
    showBanner("success", "Saved data cleared.");
  };

  // 🔹 Download JSON
  const downloadJson = () => {
    const payload = { form, theme };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio.json";
    a.click();
    URL.revokeObjectURL(a.href);
    showBanner("success", "JSON downloaded.");
  };

  // 🔹 Copy Share Link
  const copyShareLink = async () => {
    const encoded = encodeURIComponent(btoa(JSON.stringify({ form, theme })));
    const shareUrl = `${window.location.origin}${location.pathname}#${encoded}`;
    await navigator.clipboard.writeText(shareUrl);
    showBanner("success", "Share link copied!");
  };

  // 🔹 Auto-load from hash link
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    try {
      const decoded = JSON.parse(atob(decodeURIComponent(hash)));
      if (decoded.form) setForm(decoded.form);
      if (decoded.theme) setTheme(decoded.theme);
      showBanner("success", "Portfolio loaded from shared link.");
      navigate(location.pathname, { replace: true }); // clean hash from URL
    } catch {
      console.warn("Invalid share data in URL");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      showBanner("success", "Saved draft detected — you can Load it.");
    }
  }, []);

  // 🔹 Handle inputs
  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // 🔹 Safe links
  const links = useMemo(() => {
    const safe = (url) => (url?.startsWith("http") ? url : "");
    return {
      website: safe(form.website),
      github: safe(form.github),
      linkedin: safe(form.linkedin),
    };
  }, [form]);

  // 🔹 Theme presets
  const themes = {
    dark: {
      bg: "bg-slate-950",
      text: "text-slate-100",
      border: "border-slate-800",
      accent: "text-indigo-400",
      muted: "text-slate-400",
      card: "bg-slate-900 border border-slate-800",
      link: "text-indigo-400",
    },
    light: {
      bg: "bg-gray-50",
      text: "text-gray-800",
      border: "border-gray-200",
      accent: "text-indigo-700",
      muted: "text-gray-500",
      card: "bg-white border border-gray-200",
      link: "text-indigo-600",
    },
    accent: {
      bg: "bg-indigo-950",
      text: "text-indigo-50",
      border: "border-indigo-900",
      accent: "text-indigo-300",
      muted: "text-indigo-200",
      card: "bg-indigo-900 border border-indigo-800",
      link: "text-indigo-300",
    },
  };
  const t = themes[theme];

  // 🔹 Copy / Download HTML
  const copyHtml = async () => {
    const node = previewRef.current;
    if (!node) return;
    await navigator.clipboard.writeText(node.outerHTML);
    alert("HTML copied to clipboard!");
  };

  const downloadHtml = () => {
    const node = previewRef.current;
    if (!node) return;
    const blob = new Blob([node.outerHTML], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio.html";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // ---- UI ----
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/" className="text-slate-400 text-sm hover:underline">
          ← Back to jonascode.dev
        </Link>

        <h1 className="text-3xl font-semibold mt-4">Portfolio Builder</h1>
        <p className="text-slate-400 mt-1">
          Fill a few fields → preview a one-page portfolio instantly.
        </p>

        {/* Status Banner */}
        {banner && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-4 mb-2 rounded-lg px-3 py-2 text-sm ${
              banner.type === "success"
                ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30"
                : "bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/30"
            }`}
          >
            {banner.msg}
          </div>
        )}

        {/* Controls */}
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          <label className="text-sm text-slate-400 mr-2">Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="accent">Accent</option>
          </select>

          <button
            onClick={savePortfolio}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Save
          </button>
          <button
            onClick={loadPortfolio}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm"
          >
            Load
          </button>
          <button
            onClick={clearSaved}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 px-3 py-2 rounded-lg text-xs"
          >
            Clear
          </button>
          <button
            onClick={downloadJson}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg text-xs"
          >
            Download JSON
          </button>
          <button
            onClick={copyShareLink}
            className="bg-indigo-950 hover:bg-indigo-800 border border-indigo-800 text-indigo-200 px-3 py-2 rounded-lg text-xs"
          >
            Copy Share Link
          </button>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Form */}
          <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
            <div className="grid gap-4">
              <Input
                label="Full name"
                name="name"
                value={form.name}
                onChange={handle}
              />
              <Input
                label="Role / Headline"
                name="role"
                value={form.role}
                onChange={handle}
              />
              <Input
                label="One-line tagline"
                name="tagline"
                value={form.tagline}
                onChange={handle}
              />
              <Text
                label="Short bio (2–3 sentences)"
                name="bio"
                value={form.bio}
                onChange={handle}
              />
            </div>

            <div className="mt-6 grid gap-4">
              <Input
                label="Website"
                name="website"
                value={form.website}
                onChange={handle}
              />
              <Input
                label="GitHub"
                name="github"
                value={form.github}
                onChange={handle}
              />
              <Input
                label="LinkedIn"
                name="linkedin"
                value={form.linkedin}
                onChange={handle}
              />
            </div>

            <div className="mt-6 flex gap-3 flex-wrap">
              <button
                onClick={copyHtml}
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm"
              >
                Copy HTML
              </button>
              <button
                onClick={downloadHtml}
                className="border border-slate-600 px-4 py-2 rounded-xl text-sm"
              >
                Download HTML
              </button>
            </div>
          </div>

          {/* Preview */}
          <div
            className={`${t.bg} ${t.text} rounded-2xl p-5 border ${t.border} transition-colors`}
            ref={previewRef}
          >
            <span className={`text-xs uppercase font-medium ${t.accent}`}>
              Portfolio
            </span>
            <h2 className="text-3xl font-bold mt-3">{form.name}</h2>
            <div className={`font-medium ${t.accent}`}>{form.role}</div>
            <p className={`${t.muted} mt-3`}>{form.tagline}</p>

            <div className={`${t.card} rounded-xl p-4 mt-6`}>
              <h3 className="font-semibold mb-2">About</h3>
              <p className={`${t.muted}`}>{form.bio}</p>
            </div>

            {(links.website || links.github || links.linkedin) && (
              <div className="mt-6 space-x-4 text-sm">
                {links.website && (
                  <a
                    href={links.website}
                    target="_blank"
                    rel="noreferrer"
                    className={t.link}
                  >
                    Website
                  </a>
                )}
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer"
                    className={t.link}
                  >
                    GitHub
                  </a>
                )}
                {links.linkedin && (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={t.link}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helpers */
function Input({ label, ...props }) {
  return (
    <label className="block text-sm">
      <span className="text-slate-300">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}

function Text({ label, ...props }) {
  return (
    <label className="block text-sm">
      <span className="text-slate-300">{label}</span>
      <textarea
        {...props}
        rows={4}
        className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}
