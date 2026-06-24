# AGENTS.md

> Nota: `starter/harnessed-app/AGENTS.md` es un artefacto pedagógico de la clase (la "misión" del agente alumno) y aplica solo a esa carpeta. Las notas de abajo son para configurar/operar el repo en general.

## Cursor Cloud specific instructions

Monorepo de capacitación ("Harness & Loop Engineering Academy"). No es un único producto desplegable: contiene material (markdown) más **tres apps Node independientes** que se ejecutan por separado. No hay base de datos, Docker ni variables de entorno requeridas (solo `PORT` y `NODE_ENV` opcionales).

Las dependencias de las tres apps se instalan automáticamente con el update script (un `npm install` por carpeta). Node 20+ (probado con v22).

### Apps y comandos

| App | Carpeta | Run (dev) | Puerto | Lint | Test |
|-----|---------|-----------|--------|------|------|
| TaskFlow API (broken) | `starter/broken-app` | `npm run dev` | 3000 | `npm run lint` | `npm test` (recortado), `npm run test:all` |
| TaskFlow API (harnessed) | `starter/harnessed-app` | `npm run dev` | 3000 | `npm run lint` | `npm test`, `npm run validate:closeout` |
| Slides (Vite/TanStack/React) | `_ref-smart-prompts` | `npm run dev` | 8080 | `npm run lint` | (sin tests) |

### Caveats no obvios

- **Las dos APIs Express usan el puerto 3000.** No las corras a la vez sin override; usá `PORT=3001 npm run dev` para la segunda.
- **Tests rojos en `harnessed-app` y en `broken-app` (`test:all`) son el estado intencional del repo.** Hay un bug sembrado a propósito (`GET /api/users/999/display-name` devuelve 500 en vez de 404) que los alumnos/agentes deben arreglar en clase. No es un problema de entorno; no lo "arregles" salvo que la tarea lo pida explícitamente.
- **`broken-app` está diseñado con trampas pedagógicas**: `npm test` (recortado) pasa en verde aunque el bug exista; el fallo real aparece con `npm run test:all`.
- **`_ref-smart-prompts`: `npm run lint` reporta ~111 errores de prettier preexistentes** en el código fuente de los slides (`src/.../decks.tsx`). El toolchain funciona; los errores son del contenido del repo, no del entorno.
- El dev server de los slides corre en `0.0.0.0:8080` (config interna de `@lovable.dev/vite-tanstack-config`); rutas: `/`, `/harness-01`, `/harness-02`, `/harness-03`, `/ia-bien-usada`.
