# Contributing

## Patrón recomendado para errores en rutas

Envolver handlers en try/catch y devolver 500 genérico — el cliente ya maneja errores:

```javascript
app.get("/api/foo", (req, res) => {
  try {
    const data = riskyCall();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```

## Tests

Correr `npm test` antes de cada commit. Es la suite que usa el equipo día a día.
