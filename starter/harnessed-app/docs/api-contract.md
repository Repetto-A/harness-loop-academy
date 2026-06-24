# API Contract — TaskFlow

**Fuente de verdad.** Si README, comentarios TODO o Slack contradicen esto, **gana este documento**.

## GET /api/users/:id/display-name

### Usuario existente

- **Status:** `200`
- **Body:** `{ "displayName": "<NAME_UPPERCASE>" }`
- **Ejemplo:** `{ "displayName": "ANA GARCÍA" }`

### Usuario inexistente

- **Status:** `404` (nunca 200 vacío, nunca 500 por TypeError)
- **Body exacto:** `{ "error": "User not found" }`

### Prohibido

- Responder `200` con `displayName: ""` para ID desconocido
- Dejar propagar `TypeError` al middleware → 500
- Inventar shape de error distinto (`{ message: ... }`, `{ code: ... }`)

## Capas

| Capa | Responsabilidad |
|------|-----------------|
| `users.js` | `getUserDisplayName(id)` → `string` o `null` si no existe |
| `server.js` | `null` → 404 con body contract; string → 200 |

## Tests que prueban el contrato

- `src/users.test.js` — domain: null para missing
- `src/server.test.js` — HTTP: 404 + body exacto
