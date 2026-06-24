import type { ReactNode } from "react";

interface Props {
  block?: string;
  eyebrow?: string;
  children: ReactNode;
  bg?: "default" | "ember" | "panel";
  noChrome?: boolean;
}

export function SlideShell({ block, eyebrow, children, bg = "default", noChrome }: Props) {
  const bgStyle =
    bg === "ember"
      ? "bg-[oklch(0.66_0.18_38)] text-[oklch(0.18_0_0)]"
      : bg === "panel"
      ? "bg-[oklch(0.245_0_0)]"
      : "bg-background text-foreground";

  return (
    <div className={`w-full h-full ${bgStyle} relative flex flex-col`}>
      {!noChrome && (
        <>
          <div className="absolute top-16 left-20 flex items-center gap-4 font-mono text-base">
            {block && (
              <span className={bg === "ember" ? "text-[oklch(0.18_0_0)]/70" : "text-ember"}>
                {block}
              </span>
            )}
            {eyebrow && (
              <span
                className={
                  bg === "ember"
                    ? "text-[oklch(0.18_0_0)]/60 uppercase tracking-[0.3em]"
                    : "text-muted-foreground uppercase tracking-[0.3em]"
                }
              >
                {eyebrow}
              </span>
            )}
          </div>
          <div className="absolute bottom-12 left-20 right-20 flex items-center justify-between font-mono text-sm">
            <span
              className={
                bg === "ember" ? "text-[oklch(0.18_0_0)]/70" : "text-muted-foreground"
              }
            >
              IA bien usada · charla
            </span>
            <span
              className={
                bg === "ember" ? "text-[oklch(0.18_0_0)]/70" : "text-muted-foreground"
              }
            >
              de prompts sueltos a workflows inteligentes
            </span>
          </div>
        </>
      )}
      <div className="flex-1 px-32 py-32 flex flex-col">{children}</div>
    </div>
  );
}
