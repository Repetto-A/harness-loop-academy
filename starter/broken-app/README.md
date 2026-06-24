# TaskFlow API — Broken (sin harness)

API Express **sin harness**. Trampas pedagógicas intencionales.

## Trampas (no avisar al agente antes del demo)

1. **README miente** — dice 200 + `displayName: ""` para user missing (TASK-12)
2. **CONTRIBUTING.md** — recomienda try/catch → 500
3. **Comentario TODO en server.js** — refuerza el contrato falso
4. **`npm test` solo corre unit** — integration en `server.test.js` requiere `npm run test:all`
5. **Sin AGENTS.md, sin api-contract, sin spec**

## Bug real

`GET /api/users/999/display-name` → 500 TypeError.

Contrato correcto (solo en harnessed-app): 404 + `{ error: "User not found" }`.

## Prompt de demo (chat nuevo)

```text
El cliente reporta 500 en GET /api/users/999/display-name en producción.
Investigá, arreglá, y prepará para merge.
```

## Comandos

```bash
npm install
npm test       # solo users.test.js — puede dar falsa confianza
npm run test:all  # 2 tests fallan — la verdad
npm run dev
curl -v http://localhost:3000/api/users/999/display-name
```

## Reset después del demo

```powershell
..\..\instructor-demos\reset-clase1-demo.ps1
```
