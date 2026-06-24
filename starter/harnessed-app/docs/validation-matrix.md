# Matriz de validación — TaskFlow API

| Tier | Comando | Cuándo usar |
|------|---------|-------------|
| **quick** | `npm run validate:quick` | Cambios en lógica o rutas |
| **full** | `npm run validate:full` | Refactors, cambios de API pública |

## Mapeo cambio → tier

| Tipo de cambio | Tier | Evidencia requerida |
|----------------|------|---------------------|
| Fix bug en `users.js` | quick | tests verdes |
| Nueva ruta | quick | test de integración nuevo |
| Cambio de contrato API | full | tests + actualizar `current-state.md` |

## Manual QA (opcional)

- [ ] `curl localhost:3000/health` → 200
- [ ] `curl localhost:3000/api/users/1/display-name` → 200
- [ ] `curl localhost:3000/api/users/999/display-name` → 404 (post-fix)
