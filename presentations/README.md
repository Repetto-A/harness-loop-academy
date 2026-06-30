# Presentaciones — Harness & Loop Engineering

Decks en formato [smart-prompts](https://github.com/Repetto-A/smart-prompts): React + `SlideShell` + `CodeBlock` + speaker notes.

## Cómo usar

### Opción A — ya integrado en `_ref-smart-prompts/`

```bash
cd _ref-smart-prompts
npm install
npm run dev
```

El servidor usa puerto **8080** (default de Lovable/smart-prompts — es normal).

Rutas:
- `/` — índice con links a las 3 clases
- `/harness-01` — Clase 1 (17 slides)
- `/harness-02` — Clase 2 (13 slides)
- `/harness-03` — Clase 3 (14 slides, bonus)
- `/ia-bien-usada` — deck original smart-prompts (deck-30)

Usa `PresentationDeck` genérico (grid `G`, presenter `P`, fullscreen `F`).

### Opción B — copiar al repo smart-prompts en producción

1. Copiá `decks/deck-clase-0X.tsx` → `smart-prompts/src/slides/`
2. Copiá `PresentationDeck.tsx`, `GridOverviewDeck.tsx`, `PresenterViewDeck.tsx`, `slides/types.ts`
3. Copiá rutas `harness-0X.tsx` desde `_ref-smart-prompts/src/routes/`

## Reglas de diseño (90 min por clase)

| Regla | Valor |
|-------|-------|
| Slides totales | **12–15** (no más — el resto es demo en vivo) |
| Tipos de slide | cover, thesis, grid, code-bad/good, demo-slot, transition, closing |
| Texto en slide | Mínimo. Vos narrás con `notes` |
| Demo | Slide casi vacía → pantalla Cursor/terminal |
| Animación | Solo 1 slide con `steps` (reveal), como budín en deck-30 |

## Archivos

| Archivo | Clase | Slides |
|---------|-------|--------|
| [DISEÑO-MAESTRO.md](DISEÑO-MAESTRO.md) | Las 3 | Spec completa + tiempos |
| [decks/deck-clase-01.tsx](decks/deck-clase-01.tsx) | Harness base | 17 slides |
| [decks/deck-clase-02.tsx](decks/deck-clase-02.tsx) | Proyecto real + SDD | 13 slides |
| [decks/deck-clase-03.tsx](decks/deck-clase-03.tsx) | Loop engineering (bonus) | 14 slides |

## Atajos presentación

- `→` / `Space` — siguiente (con steps si aplica)
- `G` — grid overview
- `P` — presenter view (notes)
- `F` — fullscreen
