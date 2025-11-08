// src/pages/portfolio-builder/PortfolioBuilder.jsx
// src/pages/portfolio-builder/PortfolioBuilder.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as QRCode from "qrcode";

const STORAGE_KEY = "portfolioBuilder:v1";

/* ---------- UTF-8 safe Base64 helpers ---------- */
function base64FromObject(obj) {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json); // UTF-8 bytes
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

// --- helper: format last-saved label ---
function savedLabel(ts) {
  if (!ts) return "";
  const diff = Date.now() - ts;
  if (diff < 15_000) return "Saved just now";
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `Saved ${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  return `Saved ${hrs} hr${hrs > 1 ? "s" : ""} ago`;
}

export default function PortfolioBuilder() {
  /* ---------- form state ---------- */
  const [form, setForm] = useState({
    name: "John Doe",
    role: "Web Developer",
    tagline: "I build fast, modern web apps.",
    bio: "I’m a front-end developer focused on React, Tailwind, and great UX.",
    website: "https://example.com",
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
    skills: "React, Tailwind, Node.js",
  });

  /* ---------- UI state ---------- */
  const [theme, setTheme] = useState("dark");
  const [banner, setBanner] = useState(null); // {type,msg}
  const [qr, setQr] = useState({ open: false, dataUrl: "", url: "" });
  const previewRef = useRef(null);
  // track last auto-save time
  const [lastSavedAt, setLastSavedAt] = useState(null);

  // for debounced autosave
  const autosaveTimer = useRef(null);

  const showBanner = (type, msg) => {
    setBanner({ type, msg });
    setTimeout(() => setBanner(null), 2500);
  };

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const links = useMemo(() => {
    const safe = (url) => (url?.startsWith("http") ? url : "");
    return {
      website: safe(form.website),
      github: safe(form.github),
      linkedin: safe(form.linkedin),
    };
  }, [form]);
  // ---------- auto-save to localStorage (debounced) ----------
  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);

    autosaveTimer.current = setTimeout(() => {
      try {
        const payload = {
          form,
          theme,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        // Optional: showBanner?.("success", "Changes saved.");
        setLastSavedAt(Date.now());
      } catch (err) {
        console.error("Auto-save failed:", err);
        // showBanner?.("error", "Auto-save failed.");
      }
    }, 600); // debounce delay

    return () => clearTimeout(autosaveTimer.current);
  }, [form, theme]);

  // Auto-load from share hash on first mount
  // ---------- bootstrap: load from hash or localStorage on first mount ----------
  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    let bootstrapped = false;

    // 1) Try to load from the share link hash
    if (hash) {
      try {
        const decoded = decodeURIComponent(hash);
        const payload = objectFromBase64(decoded); // { form, theme }

        if (payload?.form && typeof payload.form === "object") {
          setForm((prev) => ({ ...prev, ...payload.form }));
          bootstrapped = true;
        }
        if (payload?.theme && typeof payload.theme === "string") {
          setTheme(payload.theme);
        }

        // Clean URL: keep path, remove hash
        window.history.replaceState(null, "", window.location.pathname);
        // showBanner?.("success", "Loaded portfolio from link.");
      } catch (err) {
        console.error("Invalid share link.", err);
        // showBanner?.("error", "Invalid or expired share link.");
      }
    }

    // 2) Fallback to localStorage draft if no valid hash was used
    if (!bootstrapped) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved?.form && typeof saved.form === "object") {
            setForm((prev) => ({ ...prev, ...saved.form }));
          }
          if (saved?.theme && typeof saved.theme === "string") {
            setTheme(saved.theme);
          }
          // showBanner?.("success", "Draft loaded from this device.");
        }
      } catch (err) {
        console.error("Could not load saved draft.", err);
      }
    }
  }, []);

  /* ---------- themes ---------- */
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

  /* ---------- actions: copy / download / preview / print ---------- */
  const copyHtml = async () => {
    const node = previewRef.current;
    if (!node) return;
    await navigator.clipboard.writeText(node.outerHTML);
    showBanner("success", "HTML copied to clipboard.");
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

  const previewInNewTab = () => {
    const node = previewRef.current;
    if (!node) return;

    const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${form.name} — ${form.role}</title>
<style>
  :root { color-scheme: ${theme === "light" ? "light" : "dark"} }
  body { margin:0; font-family: ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial; }
  .wrap { max-width: 820px; margin: 48px auto; padding: 0 20px; }
</style>
</head>
<body>
  <div class="wrap">${node.innerHTML}</div>
  <script>
    window.onload = () => window.print();
  </script>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (!win) {
      alert("Popup blocked. Please allow popups for this site.");
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  const printToPdf = () => {
    const node = previewRef.current;
    if (!node) return;

    const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${form.name} — ${form.role}</title>
<style>
  :root { color-scheme: ${theme === "light" ? "light" : "dark"} }
  body { margin:0; font-family: ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial; }
  .wrap { max-width: 820px; margin: 48px auto; padding: 0 20px; }
</style>
</head>
<body>
  <div class="wrap">${node.innerHTML}</div>
  <script>
  window.onload = () => window.print();
</script>

</body>
</html>`;

    const win = window.open("", "_blank");
    if (!win) {
      alert("Popup blocked. Please allow popups for this site.");
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  /* ---------- share: JSON / link / QR ---------- */
  const downloadJson = () => {
    const payload = {
      form,
      theme,
      exportedAt: new Date().toISOString(),
      version: 1,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyShareLink = async () => {
    try {
      const encoded = encodeURIComponent(base64FromObject({ form, theme }));
      const shareUrl = `${window.location.origin}${window.location.pathname}#${encoded}`;
      await navigator.clipboard.writeText(shareUrl);
      showBanner("success", "Share link copied.");
    } catch {
      showBanner("error", "Could not copy share link.");
    }
  };

  const generateQrCode = async () => {
    try {
      const encoded = encodeURIComponent(base64FromObject({ form, theme }));
      const shareUrl = `${window.location.origin}${window.location.pathname}#${encoded}`;
      const dataUrl = await QRCode.toDataURL(shareUrl, {
        width: 260,
        margin: 1,
      });
      setQr({ open: true, dataUrl, url: shareUrl });
      showBanner("success", "QR code ready.");
    } catch (err) {
      console.error("❌ QR generation error:", err);
      showBanner("error", "Failed to generate QR code.");
    }
  };
  // UTF-8 safe Base64 -> object
  function objectFromBase64(b64) {
    const binary = atob(b64); // base64 -> binary string
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes); // bytes -> UTF-8 string
    return JSON.parse(json);
  }

  /* ---------- UI ---------- */
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

        {/* Theme Selector */}
        <div className="mt-4">
          <label className="text-sm text-slate-400 mr-3">Choose Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="accent">Accent</option>
          </select>
        </div>

        {/* Banner */}
        {banner && (
          <div
            className={`mt-4 rounded-lg px-3 py-2 text-sm ${
              banner.type === "success"
                ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30"
                : "bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/30"
            }`}
            role="status"
            aria-live="polite"
          >
            {banner.msg}
          </div>
        )}

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
                label="Skills (comma-separated)"
                name="skills"
                value={form.skills}
                onChange={handle}
              />
              <Text
                label="Projects (one per line, format: Title - https://link.com)"
                name="projects"
                value={form.projects}
                onChange={handle}
              />

              <Input
                label="LinkedIn"
                name="linkedin"
                value={form.linkedin}
                onChange={handle}
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
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
              <button
                onClick={previewInNewTab}
                className="border border-slate-700 px-4 py-2 rounded-xl text-sm"
              >
                Preview in New Tab
              </button>
              <button
                onClick={printToPdf}
                className="border border-slate-700 px-4 py-2 rounded-xl text-sm"
              >
                Print to PDF
              </button>
              <button
                onClick={downloadJson}
                className="border border-slate-600 px-4 py-2 rounded-xl text-sm"
              >
                Download JSON
              </button>
              <button
                onClick={copyShareLink}
                className="border border-slate-600 px-4 py-2 rounded-xl text-sm"
              >
                Copy Share Link
              </button>
              <button
                onClick={generateQrCode}
                className="border border-slate-600 px-4 py-2 rounded-xl text-sm"
              >
                Generate QR Code
              </button>

              {/* save status */}
              <div className="mt-2 text-xs text-slate-400">
                {lastSavedAt ? <>💾 {savedLabel(lastSavedAt)}</> : null}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div
            ref={previewRef}
            className={`${t.bg} ${t.text} rounded-2xl p-5 border ${t.border} transition-colors`}
          >
            <span className={`text-xs uppercase font-medium ${t.accent}`}>
              Portfolio
            </span>
            <h2 className="text-3xl font-bold mt-3">{form.name}</h2>
            <div className={`font-medium ${t.accent}`}>{form.role}</div>
            <p className={`${t.muted} mt-3`}>{form.tagline}</p>

            <div className={`${t.card} rounded-xl p-4 mt-6`}>
              <h3 className="font-semibold mb-2">About</h3>
              <p className={`${t.muted} leading-relaxed`}>{form.bio}</p>
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
      {parseSkills(form.skills).length > 0 && (
        <div className={`${t.card} rounded-2xl p-5 mt-8`}>
          <h3 className="font-semibold mb-3 tracking-tight">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {parseSkills(form.skills).map((sk) => (
              <span
                key={sk}
                className="px-2.5 py-1 text-xs rounded-lg border border-current/20 opacity-90 font-medium"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>
      )}
      {parseProjects(form.projects).length > 0 && (
        <div className={`${t.card} rounded-2xl p-5 mt-8`}>
          <h3 className="font-semibold mb-3 tracking-tight">Projects</h3>
          <ul className="space-y-1 text-sm list-none">
            {parseProjects(form.projects).map((p) => (
              <li key={p.title} className="block">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`${t.link} hover:underline inline-flex items-center gap-1`}
                >
                  {p.title}
                  <span aria-hidden="true" className="text-xs opacity-70">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* QR Modal */}
      {qr.open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={() => setQr((p) => ({ ...p, open: false }))}
        >
          <div
            className="bg-slate-950 border border-slate-800 rounded-2xl p-5 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">
              Scan to open this portfolio
            </h3>
            <img
              src={qr.dataUrl}
              alt="QR Code"
              className="mx-auto mb-4 w-[260px] h-[260px]"
            />
            <a
              href={qr.url}
              target="_blank"
              rel="noopener"
              className="text-indigo-400 hover:underline break-all text-sm"
            >
              {qr.url}
            </a>
            <div className="mt-4 flex justify-center gap-3">
              <button
                className="border border-slate-600 px-4 py-2 rounded-xl text-sm"
                onClick={() =>
                  navigator.clipboard
                    .writeText(qr.url)
                    .then(() => showBanner("success", "Share link copied."))
                    .catch(() =>
                      showBanner("error", "Could not copy share link.")
                    )
                }
              >
                Copy Link
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm"
                onClick={() => setQr((p) => ({ ...p, open: false }))}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function parseSkills(s) {
  if (!s) return [];
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function parseProjects(str = "") {
  return str
    .split("\n")
    .map((line) => {
      const [title, link] = line.split(" - ");
      return title && link ? { title: title.trim(), link: link.trim() } : null;
    })
    .filter(Boolean);
}

/* ---------- small input helpers ---------- */
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
