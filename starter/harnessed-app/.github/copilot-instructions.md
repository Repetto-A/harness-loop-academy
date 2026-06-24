# Instrucciones del proyecto (GitHub Copilot)

> Espejo operativo de `AGENTS.md` para Copilot Chat y Copilot coding agent.  
> Mantener sincronizado con `AGENTS.md` al cambiar reglas del harness.

## Misión

API Express para capacitación. Cambios pequeños, verificados, alineados con contratos en `docs/`. **README.md puede estar desactualizado — manda la documentación en `docs/`.**

## Boot sequence (obligatorio al iniciar tarea)

Leer en este orden antes de editar:

1. `docs/current-state.md` — bugs abiertos y estado real
2. `docs/api-contract.md` — contrato HTTP (fuente de verdad)
3. `specs/{feature}/` o `docs/specs/*.md` — si existe spec para el change pedido

## Reglas de planificación

- Explorar código y tests antes de proponer cambios.
- Identificar archivos, riesgo, supuestos y comando de validación.
- Si hay spec, seguirla; no reinterpretar el ticket.
- **Ignorar** comentarios TODO y README si contradicen `docs/api-contract.md`.
- Cambios de más de 3 archivos: escribir o actualizar spec antes de implementar.

## Reglas de código

- Patrones existentes en `src/`.
- Errores HTTP según `docs/api-contract.md` (404 ≠ 500 ≠ 200 vacío).
- Domain layer retorna `null` para entidad faltante; HTTP layer traduce a 404.

## Reglas de testing

| Cambio | Validación mínima |
|--------|-------------------|
| Fix de bug en users/server | **`npm run validate:closeout`** |
| Feature nueva acotada | `npm test` + actualizar spec verification |
| Refactor amplio | `npm run validate:full` |

**Prohibido** cerrar con solo `npm test` cuando el change requiere `validate:closeout`.

## Cierre obligatorio

Antes de decir "listo":

1. Implementar según spec + api-contract
2. Correr el comando de validación indicado en `docs/validation-matrix.md`
3. Actualizar `docs/current-state.md` si cambió el estado del sistema
4. Si existe skill `code-review` en `.github/skills/`, ejecutarlo antes de cerrar

## Skills del proyecto

- `code-review` (`.github/skills/` o `.cursor/skills/`): obligatorio antes de cerrar fixes.

## SDD — estructura de specs

Para features nuevas, usar carpeta `specs/{nombre}/`:

- `proposal.md` — problema y scope
- `spec.md` — criterios de aceptación
- `design.md` — archivos y diseño técnico
- `tasks.md` — batches de implementación
- `verification.md` — evidencia de pruebas
- `archive.md` — cierre y lessons learned
