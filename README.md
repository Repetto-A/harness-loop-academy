# Harness & Loop Engineering Academy

Material de capacitación: **Context Engineering** + **Spec Driven Development** para equipos que trabajan con IA sobre repos reales.

**Herramienta principal del alumno:** [GitHub Copilot](https://github.com/features/copilot) (VS Code / Visual Studio).  
**Instructor:** puede dictar con [Cursor](https://cursor.com); el harness del repo es agnóstico al IDE.

## Programa (2 clases)

| Sesión | Duración | Objetivo | Entregable alumno |
|--------|----------|----------|-------------------|
| **Clase 1** | ~2.5h | Context engineering + harness mínimo | Misión en `AGENTS.md` o `copilot-instructions.md` + 1 regla de validación |
| **Clase 2** | ~2.5h | SDD con artefactos persistentes | 1 change SDD completo (explore → verify → archive) |

**Material extra (opcional):** Clase 3 loops + hackathon en [`class-scripts/clase-03.md`](class-scripts/clase-03.md) y [`hackathon/`](hackathon/).

## Estructura del repo

```txt
harness-loop-academy/
├── README.md
├── handouts/                 ← lectura Clase 1
├── class-scripts/            ← guiones con tiempos
├── presentations/decks/      ← fuente de slides (copiar a _ref-smart-prompts)
├── _ref-smart-prompts/       ← app de presentaciones (npm run dev)
├── starter/
│   ├── broken-app/           ← sin harness (demo contraste)
│   └── harnessed-app/        ← harness completo + ejemplo SDD
├── templates/                ← plantillas copiables
├── labs/
├── instructor-demos/
└── hackathon/                ← opcional post-curso
```

## Prerrequisitos (alumnos)

- **GitHub Copilot** activo en el IDE (Chat + coding agent según plan corporativo)
- Git + GitHub (`gh auth login`)
- Node.js 20+
- VS Code o Visual Studio con extensión Copilot

**Opcional (instructor):** Cursor, Gentle AI, Engram — no requeridos para alumnos.

## Equivalencias Cursor ↔ Copilot

| Concepto | GitHub Copilot | Cursor (instructor) |
|----------|----------------|---------------------|
| Contrato raíz | `.github/copilot-instructions.md` + `AGENTS.md` | `AGENTS.md` |
| Reglas scoped | Instrucciones en copilot-instructions | `.cursor/rules/*.mdc` |
| Skills | `.github/skills/*/SKILL.md` | `.cursor/skills/*/SKILL.md` |
| Gates automáticos | Scripts `npm run validate:*` en AGENTS | + `.cursor/hooks.json` (bonus) |
| Subagentes | Copilot coding agent | Agent mode + Task tool |

Ver ejemplo en [`starter/harnessed-app/`](starter/harnessed-app/).

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

## Ver las slides

```powershell
cd _ref-smart-prompts
npm install
npm run dev
```

Abrí **http://localhost:8080/**

| Ruta | Contenido |
|------|-----------|
| `/` | Menú Clase 1 y 2 |
| `/harness-01` | Clase 1 — Context engineering |
| `/harness-02` | Clase 2 — Spec antes de código |
| `/harness-03` | Bonus — Loop engineering (material extra) |
| `/ia-bien-usada` | Deck smart-prompts (referencia) |

Fuente editable: [`presentations/decks/`](presentations/decks/) · timing: [`presentations/DISEÑO-MAESTRO.md`](presentations/DISEÑO-MAESTRO.md)

## Quick start — Instructor

1. Leer [`class-scripts/clase-01.md`](class-scripts/clase-01.md) y [`class-scripts/clase-02.md`](class-scripts/clase-02.md).
2. Tener `broken-app` y `harnessed-app` en workspaces separados.
3. Demo SDD Clase 2: [`instructor-demos/demo-sdd-healthcheck.md`](instructor-demos/demo-sdd-healthcheck.md).
4. Cloud Agents (opcional): [`docs/SETUP-CLOUD.md`](docs/SETUP-CLOUD.md).

## Licencia

MIT — uso libre en capacitaciones corporativas. Atribución apreciada.
