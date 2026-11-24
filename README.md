# Harness & Loop Engineering Academy

Material de capacitación sobre **Context Engineering**, **Spec Driven Development (SDD)** y arquitecturas modernas de IA para equipos que trabajan con agentes sobre repos reales.

**Herramienta principal del alumno (track Copilot):** [GitHub Copilot](https://github.com/features/copilot) (VS Code / Visual Studio).  
**Instructor:** puede dictar con [Cursor](https://cursor.com); el harness del repo es agnóstico al IDE (`.agents/`, `AGENTS.md`, skills).

---

## Contenidos del repo

El repo agrupa **varios programas** que comparten la misma app de slides (`_ref-smart-prompts/`):

| Track | Audiencia | Dónde está |
|-------|-----------|------------|
| **Harness & Loop (Copilot)** | Capacitación corporativa Copilot-first | Clases 01–05, starters, labs, guiones |
| **Claude Architect** | Programa multi-sesión (agentes, MCP, reliability) | Decks `/sesion-02`, `/sesion-03`, `/sesion-05` |
| **Frisvy** | Formación en IA (encuentros presenciales) | Deck `/frisvy-03` |
| **Curso online** | Grabación async (~50 min/módulo) | [`online-course/`](online-course/) + decks `/mod-06`, `/mod-08`, `/mod-09` |

---

## Ver las slides

```powershell
cd _ref-smart-prompts
npm install
npm run dev
```

Abrí **http://localhost:8080/** — el menú lista todo por sección.

**Atajos en cada deck:** **G** grid · **P** presenter · **F** fullscreen

### Harness & Loop (Copilot)

| Ruta | Contenido | Duración orientativa |
|------|-----------|----------------------|
| `/harness-01` | El repo enseña al agente — context engineering | ~2.5h |
| `/harness-02` | Spec antes de código — SDD con artefactos | ~2.5h |
| `/harness-03` | Loop engineering (bonus) | material extra |
| `/harness-04` | Open source vs propietarios | charla |
| `/harness-05` | Que la IA entienda tu codebase | ~1h30 |

**Entregables alumnos (Clases 1–2):**

| Sesión | Objetivo | Entregable |
|--------|----------|------------|
| Clase 1 | Context engineering + harness mínimo | Misión en `AGENTS.md` / `copilot-instructions.md` + 1 regla de validación |
| Clase 2 | SDD con artefactos persistentes | 1 change SDD completo (explore → verify → archive) |

Material extra: Clase 3 loops + hackathon en [`class-scripts/clase-03.md`](class-scripts/clase-03.md) y [`hackathon/`](hackathon/).

### Claude Architect

| Ruta | Contenido |
|------|-----------|
| `/sesion-02` | Multi-agent, Agentic RAG y sesiones |
| `/sesion-03` | Diseño de ruta técnica MCP |
| `/sesion-05` | Context management, reliability y simulacro final |

Fuente editable: `_ref-smart-prompts/src/slides/deck-sesion-*.tsx`  
Material previo sesión 2 (PDF con transiciones ya reveladas): [`/sesion-02.pdf`](https://charla-ia-alejandrorepetto.vercel.app/sesion-02.pdf) — también en [`_ref-smart-prompts/exports/sesion-02-multi-agent-agentic-rag.pdf`](_ref-smart-prompts/exports/sesion-02-multi-agent-agentic-rag.pdf)

### Frisvy

| Ruta | Contenido |
|------|-----------|
| `/frisvy-03` | IA para el trabajo técnico — brief, Linear, SDD; RAG, grafo, Engram |

Fuente editable: `_ref-smart-prompts/src/slides/deck-frisvy-03.tsx`  
Ejemplo de repo demo para facilitador: [`AGENTS.md`](AGENTS.md) (dominio Interbanking / pagos entre entidades).

### Curso online (grabación)

| Ruta | Contenido |
|------|-----------|
| `/mod-06` | Modelos open source en tu IDE — Ollama + VS Code |
| `/mod-08` | Cursor AI — harness y Agent mode |
| `/mod-09` | Arquitecturas modernas IA — MCP + Git + docs |

Guiones, ejercicios y exports: [`online-course/README.md`](online-course/README.md)

### Referencia

| Ruta | Contenido |
|------|-----------|
| `/ia-bien-usada` | Deck original smart-prompts (deck-30) |

---

## Estructura del repo

```txt
harness-loop-academy/
├── README.md
├── AGENTS.md                     ← ejemplo portable de brief para agentes (demo facilitador)
├── handouts/                     ← lectura Clase 1
├── class-scripts/                ← guiones con tiempos (Clases 1–3)
├── presentations/
│   ├── decks/                    ← fuente histórica (copiar / sincronizar con _ref-smart-prompts)
│   └── DISEÑO-MAESTRO.md         ← timing y diseño pedagógico
├── _ref-smart-prompts/           ← app de presentaciones (Vite + TanStack Router)
│   ├── src/slides/               ← decks editables (*.tsx)
│   ├── src/routes/               ← rutas /harness-*, /sesion-*, /frisvy-*, /mod-*
│   ├── scripts/                  ← export PDF (Playwright)
│   └── exports/                  ← PDFs generados
├── online-course/                ← guiones grabación, recursos ZIP, exports
├── starter/
│   ├── broken-app/               ← sin harness (demo contraste Clase 1)
│   └── harnessed-app/            ← harness completo + ejemplo SDD
├── templates/                    ← plantillas spec, postmortem, etc.
├── labs/
├── instructor-demos/
├── docs/
└── hackathon/                    ← opcional post-curso
```

**Fuente canónica de slides:** `_ref-smart-prompts/src/slides/` — los archivos en `presentations/decks/` pueden estar desfasados; priorizá la app.

---

## Exportar PDF

Desde `_ref-smart-prompts/` (requiere Playwright instalado vía `npm install`):

```powershell
npm run export:pdf:05          # harness-05
npm run export:pdf:sesion-02   # Claude Architect sesión 2 (reveals finales, material previo)
npm run export:pdf:frisvy-03   # Frisvy encuentro 3
npm run export:pdf:mod06       # módulo online 06
npm run export:pdf:mod08       # módulo online 08
npm run export:pdf:mod09       # módulo online 09
```

Los PDFs quedan en `_ref-smart-prompts/exports/` (y en `online-course/exports/` para el curso grabado).

---

## Deploy en Vercel

El proyecto Vercel apunta al **repo root**. Tras el build, `scripts/prepare-vercel.mjs`:

1. Copia `_ref-smart-prompts/dist` → `dist/`
2. Genera `dist/client/index.html` vía SSR en **build time** (sin serverless en runtime)

Deploy **estático SPA**: rutas de decks resuelven a `index.html` y TanStack Router hidrata en el cliente.

- Salida: `dist/client`
- No requiere `api/index.js` en producción

Si en el dashboard tenés **Root Directory** distinto de `.`, dejalo en la raíz del repo.

---

## Prerrequisitos (alumnos — track Copilot)

- **GitHub Copilot** activo en el IDE (Chat + coding agent según plan corporativo)
- Git + GitHub (`gh auth login`)
- Node.js 20+
- VS Code o Visual Studio con extensión Copilot

**Opcional (instructor):** Cursor, Linear MCP, Engram — no requeridos para alumnos Copilot.

---

## Equivalencias Cursor ↔ Copilot

| Concepto | GitHub Copilot | Cursor (instructor) |
|----------|----------------|---------------------|
| Contrato raíz | `.github/copilot-instructions.md` + `AGENTS.md` | `AGENTS.md` |
| Reglas scoped | Instrucciones en copilot-instructions | `.cursor/rules/*.mdc` o `.agents/rules/` |
| Skills | `.github/skills/*/SKILL.md` | `.cursor/skills/` o `.agents/skills/` |
| Gates automáticos | Scripts `npm run validate:*` en AGENTS | + `.cursor/hooks.json` (bonus) |
| Subagentes | Copilot coding agent | Agent mode + Task tool |
| Integraciones | MCP vía host / extensiones | MCP nativo en Cursor |

Ver ejemplo completo en [`starter/harnessed-app/`](starter/harnessed-app/).

---

## Quick start — Demo WOW Clase 1

**Prompt (chat nuevo en cada repo):**

```text
El cliente reporta 500 en GET /api/users/999/display-name en producción.
Investigá, arreglá, y prepará para merge.
```

Guía completa: [`instructor-demos/DEMO-CLASE1-WOW.md`](instructor-demos/DEMO-CLASE1-WOW.md)

```powershell
.\instructor-demos\reset-clase1-demo.ps1

cd starter/broken-app
npm install
npm test          # suite recortada (trampa)
npm run test:all  # falla — moment wow

cd ../harnessed-app
npm install
npm run validate:closeout
```

**Copilot:** abrí cada starter en un workspace de VS Code separado. Mismo prompt en Copilot Chat.

---

## Quick start — Instructor

1. Leer [`class-scripts/clase-01.md`](class-scripts/clase-01.md) y [`class-scripts/clase-02.md`](class-scripts/clase-02.md).
2. Tener `broken-app` y `harnessed-app` en workspaces separados.
3. Demo SDD Clase 2: [`instructor-demos/demo-sdd-healthcheck.md`](instructor-demos/demo-sdd-healthcheck.md).
4. Cloud Agents (opcional): [`docs/SETUP-CLOUD.md`](docs/SETUP-CLOUD.md).
5. Curso online: [`online-course/ENSAYO-GRABACION.md`](online-course/ENSAYO-GRABACION.md).

---

## Licencia

MIT — uso libre en capacitaciones corporativas. Atribución apreciada.
