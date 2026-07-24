# AGENTS.md

Repositorio de capacitación ("Harness & Loop Engineering Academy"). Contiene material de curso y **tres apps Node.js independientes** usadas como artefactos didácticos. No hay base de datos ni servicios externos.

## Cursor Cloud specific instructions

### Servicios

| Servicio | Carpeta | Runtime | Comando dev | Puerto |
|----------|---------|---------|-------------|--------|
| Slides (app principal) | `_ref-smart-prompts` | TanStack Start + Vite + React 19 | `npm run dev` | 8080 |
| TaskFlow API "broken" | `starter/broken-app` | Express 4 | `npm run dev` | 3000 (usa `PORT` para cambiar) |
| TaskFlow API "harnessed" | `starter/harnessed-app` | Express 4 | `npm run dev` | 3000 (usa `PORT` para cambiar) |

El update script (`npm install` en las tres carpetas) ya deja las dependencias listas; no hace falta reinstalar.

### Notas no obvias

- **Las dos APIs Express usan el puerto 3000 por defecto.** Para correrlas a la vez, pasá `PORT` distinto a cada una (ej. `PORT=3001 npm run dev` y `PORT=3002 npm run dev`).
- **`broken-app` tiene un bug intencional (pedagógico):** `GET /api/users/999/display-name` devuelve 500 en lugar de 404. `npm run test:all` falla a propósito (el "momento wow"). `npm test` solo corre la suite unitaria recortada y pasa. No "arregles" esto salvo que la tarea lo pida.
- **`harnessed-app` también arranca con el mismo bug abierto documentado** en `docs/current-state.md` (Bug #1). Por eso `npm run validate:closeout` falla en el estado inicial: el gate funciona, el código tiene el bug a propósito. La demo de Clase 1 consiste en arreglarlo (404 + `{ "error": "User not found" }`).
- **`harnessed-app` tiene su propio `AGENTS.md`** con reglas de cierre obligatorias (boot sequence, `validate:closeout`, plantilla closeout, skill `code-review`). Seguilas si trabajás dentro de esa carpeta.
- **Lint de la app de slides (`_ref-smart-prompts`):** `npm run lint` reporta errores de formato `prettier/prettier` preexistentes en el código del repo (no es un problema de entorno). `npm run format` los corrige si hace falta.
- No hay hooks de git (husky/pre-commit). `starter/harnessed-app/.cursor/hooks.json` es un hook de Cursor (stop hook), no de git.
- Lockfiles: usar **npm** (`package-lock.json`). La app de slides también incluye `bun.lock`, pero el flujo soportado es npm.
