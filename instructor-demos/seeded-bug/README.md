# Bug semilla — Referencia técnica

Bug intencional para Clase 1, Lab 02 y demo Sentry.

## Ubicación

`starter/broken-app/src/users.js` y copia idéntica en `harnessed-app/src/users.js`

## Código

```javascript
export function getUserDisplayName(id) {
  const user = users.find((u) => u.id === id);
  return user.name.toUpperCase(); // ← user undefined si id no existe
}
```

## Síntoma

- **Runtime:** `TypeError: Cannot read properties of undefined (reading 'name')`
- **HTTP:** `GET /api/users/999/display-name` → 500
- **Tests:** `server.test.js` espera 404 → falla

## Fix esperado (solución referencia)

```javascript
export class UserNotFoundError extends Error {
  constructor(id) {
    super(`User not found: ${id}`);
    this.name = "UserNotFoundError";
  }
}

export function getUserDisplayName(id) {
  const user = users.find((u) => u.id === id);
  if (!user) throw new UserNotFoundError(id);
  return user.name.toUpperCase();
}
```

En `server.js`:

```javascript
app.get("/api/users/:id/display-name", (req, res, next) => {
  try {
    const name = getUserDisplayName(req.params.id);
    res.json({ displayName: name });
  } catch (err) {
    if (err.name === "UserNotFoundError") {
      return res.status(404).json({ error: "User not found" });
    }
    next(err);
  }
});
```

## Disparar para Sentry

```bash
npm run dev
curl -v http://localhost:3000/api/users/999/display-name
```

## Tests post-fix

```bash
npm test   # 4/4 verdes
```

**Nota instructor:** NO commitear el fix en `main` del repo demo — mantener bug semilla para cada cohorte. Usar branch `demo/fix-reference` con la solución si necesitás comparar.
