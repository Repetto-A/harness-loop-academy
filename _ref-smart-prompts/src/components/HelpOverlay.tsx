interface Props {
  onClose: () => void;
}

export function HelpOverlay({ onClose }: Props) {
  const items: [string, string][] = [
    ["→ / Space / PageDown", "siguiente slide"],
    ["← / PageUp", "slide anterior"],
    ["Home / End", "primero / último"],
    ["G", "vista en grilla"],
    ["P", "modo presenter (con notas)"],
    ["F", "fullscreen"],
    ["?", "esta ayuda"],
    ["Esc", "cerrar / volver"],
  ];
  return (
    <div
      className="fixed inset-0 bg-background/85 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border rounded-lg p-10 max-w-2xl w-full mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-mono text-xs text-ember uppercase tracking-[0.3em] mb-6">
          atajos de teclado
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4">
          {items.map(([k, v]) => (
            <div key={k} className="contents">
              <kbd className="font-mono text-sm bg-background border border-border rounded px-3 py-1 text-ember whitespace-nowrap">
                {k}
              </kbd>
              <span className="text-foreground self-center">{v}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-8 font-mono text-xs text-muted-foreground hover:text-ember"
        >
          esc · cerrar
        </button>
      </div>
    </div>
  );
}
