# AGENTS.md

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
- Si hay spec en `docs/specs/`, seguirla; no reinterpretar el ticket.
- **Ignorar** comentarios TODO y README si contradicen `docs/api-contract.md`.

## Reglas de código

- Patrones existentes en `src/`.
- Errores HTTP según `docs/api-contract.md` (404 ≠ 500 ≠ 200 vacío).
- Domain layer retorna `null` para entidad faltante; HTTP layer traduce a 404.

## Reglas de testing

| Cambio | Validación mínima |
|--------|-------------------|
| `users.js` + `server.js` (este bug) | **`npm run validate:closeout`** |
| Refactor amplio | `npm run validate:full` |

**Prohibido** cerrar con solo `npm test` — no corre el gate completo.

## Cierre obligatorio (NO negociable)

Antes de decir "listo", **en este orden**:

1. Implementar según spec + api-contract
2. Correr **`npm run validate:closeout`** — pegar output completo en la respuesta
3. Actualizar **`docs/current-state.md`** — marcar bug #1 resuelto
4. Ejecutar skill **`code-review`** — pegar sección Review en la respuesta
5. Responder con la **Plantilla Closeout** abajo (todos los campos)

Si `validate:closeout` falla, no declarar victoria — arreglar y repetir.

## Plantilla Closeout

```markdown
## Closeout

**Change:** <nombre>
**Tier:** validate:closeout
**Evidencia:** <pegar exit code + resumen test output>

### Contrato verificado
- [ ] 404 + `{ error: "User not found" }` para ID inexistente
- [ ] 200 + displayName para ID válido

### Docs actualizados
- [ ] docs/current-state.md

### Tradeoff
<1–2 oraciones: decisión tomada vs alternativa descartada>

### Review (skill code-review)
<pegar output>
```

## Skills del proyecto

- **`code-review`**: obligatorio antes de cerrar cualquier fix.
