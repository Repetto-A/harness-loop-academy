import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { STATUS_LABEL, TALKS, type Talk, type TalkStatus } from "@/talks/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charlas · Alejandro Repetto" },
      { name: "description", content: "Todas mis charlas, clases y workshops en un solo lugar." },
    ],
  }),
  component: Index,
});

const STATUS_STYLE: Record<TalkStatus, string> = {
  lista: "border-emerald-500/40 text-emerald-400",
  "en-progreso": "border-ember/50 text-ember",
  idea: "border-sky-500/40 text-sky-400",
  archivada: "border-border text-muted-foreground",
};

function matches(talk: Talk, q: string) {
  if (!q) return true;
  const hay = [talk.title, talk.subtitle, talk.track, talk.audience, ...(talk.tags ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((w) => hay.includes(w));
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full border border-ember bg-ember/15 px-3 py-1 text-sm text-foreground"
          : "rounded-full border border-border/60 px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-ember/40 hover:text-foreground"
      }
    >
      {children}
    </button>
  );
}

function TalkCard({ talk }: { talk: Talk }) {
  return (
    <li className="group relative flex flex-col rounded-xl border border-border/60 bg-card/40 p-5 transition-colors hover:border-ember/50 hover:bg-card/80">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate font-mono text-xs uppercase tracking-widest text-ember/80">
          {talk.track}
        </span>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${STATUS_STYLE[talk.status]}`}
        >
          {STATUS_LABEL[talk.status]}
        </span>
      </div>
      <Link
        to={talk.to}
        className="mt-3 font-display text-xl font-bold leading-snug after:absolute after:inset-0 group-hover:text-ember"
      >
        {talk.title}
      </Link>
      <p className="mt-1 text-sm text-muted-foreground">{talk.subtitle}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 text-xs text-muted-foreground">
        {talk.duration && <span>{talk.duration}</span>}
        {talk.audience && <span>· {talk.audience}</span>}
        {talk.tags?.map((t) => (
          <span key={t} className="rounded bg-surface px-1.5 py-0.5">
            {t}
          </span>
        ))}
        {talk.pdf && (
          <a
            href={talk.pdf}
            className="relative z-10 ml-auto font-mono font-bold text-ember hover:underline"
          >
            PDF
          </a>
        )}
      </div>
    </li>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  const visible = useMemo(
    () => TALKS.filter((t) => showArchived || t.status !== "archivada"),
    [showArchived],
  );
  const tracks = useMemo(() => [...new Set(visible.map((t) => t.track))], [visible]);
  const filtered = visible.filter((t) => (!track || t.track === track) && matches(t, query));
  const archivedCount = TALKS.filter((t) => t.status === "archivada").length;

  return (
    <div className="h-full overflow-y-auto bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Mis charlas</h1>
            <p className="mt-1 text-muted-foreground">
              {visible.length} charlas · {tracks.length} programas
            </p>
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscá por tema, evento o tag"
            className="w-full rounded-lg border border-border/60 bg-card/40 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-ember md:w-80"
          />
        </header>

        <div className="mt-6 flex flex-wrap gap-2">
          <Chip active={track === null} onClick={() => setTrack(null)}>
            Todas
          </Chip>
          {tracks.map((t) => (
            <Chip key={t} active={track === t} onClick={() => setTrack(track === t ? null : t)}>
              {t}
            </Chip>
          ))}
          {archivedCount > 0 && (
            <Chip active={showArchived} onClick={() => setShowArchived((v) => !v)}>
              Archivadas ({archivedCount})
            </Chip>
          )}
        </div>

        {filtered.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <TalkCard key={String(t.to)} talk={t} />
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-muted-foreground">No hay charlas con ese filtro.</p>
        )}
      </div>
    </div>
  );
}
