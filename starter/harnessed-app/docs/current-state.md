# TaskFlow API — Estado actual

**Última actualización:** 2026-06-19

## Qué es

API REST mínima de usuarios para demos de harness/loop engineering.

## Endpoints

| Método | Ruta | Estado |
|--------|------|--------|
| GET | `/health` | OK |
| GET | `/api/users` | OK |
| GET | `/api/users/:id/display-name` | **Bug abierto** — 500 en ID inexistente |

## Bug conocido (#1)

`getUserDisplayName("999")` lanza `TypeError`. Tests en `server.test.js` y `users.test.js` documentan el comportamiento esperado (404).

## Stack

- Node 20+, Express 4, Vitest, Supertest
- Sin base de datos (in-memory)

## Validación

```bash
npm run validate:quick   # lint + test
```
