# TaskFlow API — Harnessed

Misma API que `broken-app`, con **harness completo** para demo Clase 1 wow.

## Qué incluye el harness

| Artefacto | Para qué |
|-----------|----------|
| `AGENTS.md` | Boot sequence + cierre obligatorio + plantilla Closeout |
| `docs/api-contract.md` | Fuente de verdad (contradice README del repo broken) |
| `docs/specs/fix-display-name-404.md` | Spec del bug P0 |
| `docs/current-state.md` | Estado real — debe actualizarse al cerrar bug |
| `scripts/validate-closeout.js` | Gate: tests + lint + docs — **no se puede fingir "listo"** |
| `.cursor/skills/code-review` | Review obligatorio |
| `.cursor/rules/api-errors.mdc` | Reglas por archivo |

## Bug semilla

`GET /api/users/999/display-name` → 500. Ver `docs/current-state.md`.

## Comandos

```bash
npm install
npm test                  # 2 tests fallan (unit + integration)
npm run validate:closeout # falla hasta fix + docs actualizados
```

## Prompt de demo (chat nuevo)

```text
El cliente reporta 500 en GET /api/users/999/display-name en producción.
Investigá, arreglá según las reglas del repo, y prepará para merge.
```

## Contraste con broken-app

| | broken-app | harnessed-app |
|---|------------|---------------|
| Docs | README miente (200 vacío) | api-contract.md manda |
| Tests default | solo unit (`npm test`) | suite completa + closeout gate |
| Cierre | agente declara victoria fácil | validate:closeout + Closeout template |
