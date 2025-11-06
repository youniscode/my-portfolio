// src/pages/portfolio-builder/PortfolioBuilder.jsx
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function PortfolioBuilder() {
  const [form, setForm] = useState({
    name: "John Doe",
    role: "Web Developer",
    tagline: "I build fast, modern web apps.",
    bio: "I’m a front-end developer focused on React, Tailwind, and great UX.",
    website: "https://example.com",
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
  });

  const previewRef = useRef(null);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // very small sanitizer for links
  const links = useMemo(() => {
    const safe = (url) => (url?.startsWith("http") ? url : "");
    return {
      website: safe(form.website),
      github: safe(form.github),
      linkedin: safe(form.linkedin),
    };
  }, [form]);

  const copyHtml = async () => {
    const node = previewRef.current;
    if (!node) return;
    const html =
      `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
      `<title>${form.name} – ${form.role}</title>` +
      // Minimal inline styles so the export stands alone
      `<style>
        :root{color-scheme:dark}
        body{margin:0;background:#0b1220;color:#e5e7eb;font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial}
        .wrap{max-width:800px;margin:48px auto;padding:0 20px}
        .tag{display:inline-block;border:1px solid #334155;background:#0f172a;color:#94a3b8;padding:6px 10px;border-radius:9999px;font-size:12px}
        .title{font-size:36px;font-weight:700;margin:18px 0}
        .muted{color:#94a3b8;line-height:1.6}
        .links a{display:inline-block;margin-right:12px;color:#60a5fa;text-decoration:none}
        .card{border:1px solid #1f2937;background:#0b1324;border-radius:16px;padding:18px}
      </style></head><body>` +
      `<div class="wrap">${node.innerHTML}</div></body></html>`;
    await navigator.clipboard.writeText(html);
    alert("HTML copied to clipboard");
  };

  const downloadHtml = () => {
    const node = previewRef.current;
    if (!node) return;
    const blob = new Blob(
      [
        `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${form.name} – ${form.role}</title></head><body>${node.outerHTML}</body></html>`,
      ],
      { type: "text/html" }
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio.html";
    a.click();
    URL.revokeObjectURL(a.href);
  };

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

            <div className="mt-6 flex gap-3">
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
          <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
            <div ref={previewRef}>
              <span className="tag">Portfolio</span>
              <h2 className="title">{form.name}</h2>
              <div className="text-indigo-300 font-medium">{form.role}</div>
              <p className="muted mt-3">{form.tagline}</p>

              <div className="card mt-6">
                <h3 style={{ margin: "0 0 8px", fontWeight: 600 }}>About</h3>
                <p className="muted">{form.bio}</p>
              </div>

              {(links.website || links.github || links.linkedin) && (
                <div className="links mt-6">
                  {links.website && <a href={links.website}>Website</a>}
                  {links.github && <a href={links.github}>GitHub</a>}
                  {links.linkedin && <a href={links.linkedin}>LinkedIn</a>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* small input helpers (keeps the page tidy) */
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
