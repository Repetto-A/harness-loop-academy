# AGENTS.md — ejemplo (Interbanking / pagos entre entidades)

Manual corto del repo para agentes. Portable: sirve en Claude Code, Cursor y similares.
Si existe `CLAUDE.md`, puede reexportar o apuntar acá.

## Qué es este sistema

Riel de liquidaciones y transferencias **entre bancos / entidades**.
No es un producto de consumidor final: hay límites, permisos por entidad, conciliaciones y mucho dinero en juego.

## Cómo se trabaja acá

- Dominio primero: reglas de negocio y puertos viven en `domain/` y `ports/`.
- Adapters HTTP / mensajería en `adapters/`. No mezclar regla de negocio con I/O en el mismo cambio.
- Nombres en español de negocio cuando el dominio ya los usa; código en el idioma del módulo existente.
- Todo cambio de límite, excepción o permiso **empieza por spec validada**, no por un turno de implementación.

## Qué sí puede hacer el agente

- Leer el issue en Linear (MCP) y armar / actualizar la spec.
- Proponer cambios de dominio + tests del dominio sin I/O.
- Señalar fuera de alcance y riesgos (PII, secrets, dumps).
- Pedir confirmación si la regla o la excepción no está documentada.

## Qué no puede hacer

- Inventar excepciones a un límite “porque parece razonable”.
- Indexar, pegar o commitear: datos reales de clientes/entidades, secrets, dumps, logs sensibles.
- Tocadores HTTP + dominio en el mismo PR si el skill del dominio dice split.
- Mergear o “dar por hecho” sin que una persona corra la verificación.

## Contexto que debe usar

1. Este archivo.
2. `.agents/rules/` (siempre).
3. `.agents/skills/` cuando la tarea matchee la `description`.
4. `docs/arquitectura.md` y `docs/decisiones/` si el cambio toca límites, permisos o flujos entre entidades.
5. Issue vivo en Linear — no un paste viejo.

## Verificación

Los checks los corre una persona. El chat no firma el merge.
Comandos típicos (ajustar al repo real):

```bash
# tests del dominio / del módulo tocado
npm test -- --filter=domain
# o
go test ./internal/domain/...
```

## Skills relevantes

| Skill | Cuándo |
|-------|--------|
| `contexto-seguro` | Indexar, RAG, pegar logs, “dame todo el repo”, dumps |
| `tocar-dominio` | Cambiar lógica de negocio o un puerto |
| `armar-spec-desde-linear` | Hay issue; todavía no se implementa |
| `review-contra-spec` | Hay diff / PR y hay spec acordada |
