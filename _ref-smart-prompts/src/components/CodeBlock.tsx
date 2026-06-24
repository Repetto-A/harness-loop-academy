interface Props {
  children: string;
  label?: string;
  tone?: "default" | "bad" | "good";
  className?: string;
}

export function CodeBlock({ children, label, tone = "default", className }: Props) {
  const accent =
    tone === "bad"
      ? "border-l-[oklch(0.6_0.22_25)]"
      : tone === "good"
      ? "border-l-ember"
      : "border-l-surface-2";
  const labelColor =
    tone === "bad" ? "text-[oklch(0.7_0.2_25)]" : tone === "good" ? "text-ember" : "text-muted-foreground";

  return (
    <div className={`bg-[oklch(0.14_0_0)] border border-border rounded-lg overflow-hidden ${className ?? ""}`}>
      {label && (
        <div className={`px-6 py-3 border-b border-border font-mono text-sm uppercase tracking-widest ${labelColor}`}>
          {label}
        </div>
      )}
      <pre className={`font-mono text-base leading-relaxed p-8 overflow-auto border-l-4 ${accent} text-foreground/90 whitespace-pre-wrap`}>
        {children}
      </pre>
    </div>
  );
}
