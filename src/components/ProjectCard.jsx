// src/components/ProjectCard.jsx
export default function ProjectCard({
  name,
  tag,
  summary,
  cta,
  image,
  alt,
  url,
}) {
  return (
    <article className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60 hover:bg-slate-900 transition">
      <a href={url} aria-label={`${name} — ${cta}`}>
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-40 object-cover bg-slate-900"
        />
      </a>

      <div className="p-5">
        <p className="text-xs text-slate-400 mb-1">{tag}</p>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-slate-400 text-sm mt-2">{summary}</p>

        <a
          href={url}
          className="inline-block mt-3 text-indigo-300 hover:text-indigo-200 text-sm"
          aria-label={`${cta}: ${name}`}
        >
          {cta} →
        </a>
      </div>
    </article>
  );
}
