// src/components/ProjectCard.jsx
export default function ProjectCard({ tag, name, summary, cta, url, image }) {
  return (
    <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950 hover:border-indigo-600 transition">
      <div className="aspect-video bg-slate-800 rounded-xl grid place-items-center text-3xl overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${name} preview`}
            className="w-full h-full object-cover"
          />
        ) : (
          "🧩"
        )}
      </div>

      <div className="text-xs text-slate-500 mt-3">{tag}</div>
      <div className="text-lg font-semibold mt-1">{name}</div>
      <p className="text-slate-400 mt-2 text-sm">{summary}</p>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 text-sm font-medium mt-3 inline-block hover:underline"
        >
          {cta} →
        </a>
      )}
    </div>
  );
}
