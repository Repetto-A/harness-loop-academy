# Curso online corporativo — Módulos 6, 8 y 9 (estado del arte 2026)

Material de grabación (~50 min por módulo) para el **curso online corporativo**. Cada módulo es autónomo; reutiliza slides y demos del repositorio de referencia.

## Estructura

```
online-course/
├── modulos/          # Guiones, demos y ejercicios por módulo
├── decks/            # Copias de referencia (fuente canónica: _ref-smart-prompts/src/slides/)
├── recursos/         # Handouts descargables
├── scripts/          # Export PDF y empaquetado ZIP
└── ENSAYO-GRABACION.md
```

## Presentaciones (dev server)

Desde `_ref-smart-prompts`:

```bash
npm install
npm run dev
```

| Módulo | Ruta | Deck |
|--------|------|------|
| 6 — DeepSeek y Open Source | http://localhost:8080/mod-06 | `deck-modulo-06.tsx` |
| 8 — Cursor AI | http://localhost:8080/mod-08 | `deck-modulo-08.tsx` |
| 9 — Arquitecturas Modernas IA | http://localhost:8080/mod-09 | `deck-modulo-09.tsx` |

Atajos en cada deck: **G** grid, **P** presenter, **F** fullscreen.

## Orden de grabación recomendado

Los módulos **no dependen** unos de otros en el guion; el orden sugerido prioriza contexto técnico progresivo:

1. **M6** — modelos open source y Ollama (base opcional para elegir modelos en Cursor)
2. **M8** — Cursor en profundidad con repo demo (`starter/harnessed-app`)
3. **M9** — arquitecturas, MCP en profundidad y workflow Git

Podés grabarlos en cualquier orden si el curso se publica como módulos independientes.

## Export PDF

Con el dev server corriendo:

```bash
cd _ref-smart-prompts
node scripts/export-mod-06-pdf.mjs
node scripts/export-mod-08-pdf.mjs
node scripts/export-mod-09-pdf.mjs
```

Los PDFs se guardan en `online-course/exports/`.

## Recursos ZIP

```powershell
cd online-course/scripts
.\package-recursos.ps1
```

Genera ZIPs en `online-course/exports/` con handouts y starter sin `node_modules`.
