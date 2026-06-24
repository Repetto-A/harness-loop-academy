# Restaura ambos starters al estado buggy pre-demo.
# Uso: .\instructor-demos\reset-clase1-demo.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Broken = Join-Path $Root "starter\broken-app\src"
$Harnessed = Join-Path $Root "starter\harnessed-app\src"
$HarnessedDocs = Join-Path $Root "starter\harnessed-app\docs"

$usersBuggy = @'
/** @typedef {{ id: string; name: string; email: string }} User */

/** @type {User[]} */
const users = [
  { id: "1", name: "Ana García", email: "ana@example.com" },
  { id: "2", name: "Bruno López", email: "bruno@example.com" },
];

/**
 * BUG SEMILLA: no valida usuario inexistente → TypeError en runtime.
 * @param {string} id
 */
export function getUserDisplayName(id) {
  const user = users.find((u) => u.id === id);
  return user.name.toUpperCase();
}

/** @param {string} id */
export function getUser(id) {
  return users.find((u) => u.id === id);
}

export function listUsers() {
  return users;
}
'@

$serverBroken = @'
import express from "express";
import { getUserDisplayName, listUsers } from "./users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", (_req, res) => {
  res.json(listUsers());
});

// TODO(product/TASK-12): usuarios desconocidos → 200 con displayName: "" (PM aprobó en Slack)
app.get("/api/users/:id/display-name", (req, res) => {
  const name = getUserDisplayName(req.params.id);
  res.json({ displayName: name });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`TaskFlow API (broken) listening on http://localhost:${PORT}`);
  });
}

export default app;
'@

$serverHarnessed = @'
import express from "express";
import { getUserDisplayName, listUsers } from "./users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", (_req, res) => {
  res.json(listUsers());
});

app.get("/api/users/:id/display-name", (req, res) => {
  const name = getUserDisplayName(req.params.id);
  res.json({ displayName: name });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`TaskFlow API (harnessed) listening on http://localhost:${PORT}`);
  });
}

export default app;
'@

$currentStateOpen = @'
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

Contrato correcto: `docs/api-contract.md`.

## Stack

- Node 20+, Express 4, Vitest, Supertest
- Sin base de datos (in-memory)

## Validación

```bash
npm run validate:closeout   # requerido antes de declarar fix completo
```
'@

Set-Content -Path (Join-Path $Broken "users.js") -Value $usersBuggy -NoNewline
Set-Content -Path (Join-Path $Broken "server.js") -Value $serverBroken -NoNewline
Set-Content -Path (Join-Path $Harnessed "users.js") -Value ($usersBuggy -replace 'BUG SEMILLA', 'BUG SEMILLA #1') -NoNewline
Set-Content -Path (Join-Path $Harnessed "server.js") -Value $serverHarnessed -NoNewline
Set-Content -Path (Join-Path $HarnessedDocs "current-state.md") -Value $currentStateOpen -NoNewline

Write-Host "✅ Demo reset: broken-app + harnessed-app restored to buggy state." -ForegroundColor Green
Write-Host "   Run: cd starter/broken-app; npm run test:all"
Write-Host "   Run: cd starter/harnessed-app; npm run validate:closeout"
