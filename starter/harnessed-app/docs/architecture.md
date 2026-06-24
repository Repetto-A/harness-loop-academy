# TaskFlow API — Arquitectura

```txt
src/
├── server.js      ← Express app, rutas HTTP, error handler
├── server.test.js ← tests de integración (Supertest)
├── users.js       ← lógica de dominio (in-memory)
└── users.test.js  ← tests unitarios
```

## Flujo de request

```mermaid
sequenceDiagram
    participant Client
    participant Server as server.js
    participant Users as users.js

    Client->>Server: GET /api/users/:id/display-name
    Server->>Users: getUserDisplayName(id)
    Users-->>Server: string | throws
    Server-->>Client: 200 JSON | 500
```

## Decisiones

- Sin ORM ni DB: suficiente para labs de harness.
- Errores de dominio deben traducirse a HTTP en la capa de rutas (pendiente de implementar).
