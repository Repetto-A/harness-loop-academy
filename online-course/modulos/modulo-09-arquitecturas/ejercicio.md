# Ejercicio — Dibujá tu arquitectura (Módulo 9)

**Duración:** 20 min  
**Módulo standalone** — no asume otros módulos del curso.

## Objetivo

Diseñar tu stack IA 2026: qué va en el repo (harness), qué en MCP (RAG, grafo, memoria), qué en local vs API.

## Parte 1 — Diagrama (10 min)

Completá un diagrama (Mermaid, Excalidraw o PNG) con:

- IDE (Cursor)
- Git / repo
- Harness: AGENTS, rules, skills, docs, validate
- **Contexto codebase:** RAG, codebase-memory-mcp, Engram (marcá cuáles usarías)
- Capa externa opcional: Ollama, APIs frontera, Gentle AI (si aplica)

Plantilla Mermaid en [`arquitectura-recomendada.md`](../../recursos/arquitectura-recomendada.md).

## Parte 2 — MCPs y contexto (5 min)

Listá:

| Usaría | Tipo (RAG / grafo / memoria / docs lib) | Razón |
|--------|----------------------------------------|-------|
| | | |
| | | |
| | | |

Y tres que **no** usarías (con razón concreta).

## Parte 3 — Boot sequence + SDD lite (5 min)

Definí:

1. **4 archivos** que tu agente debe leer siempre al iniciar una tarea en tu repo real.
2. **1 spec mínima** que escribirías antes del próximo cambio (título + 2 criterios de aceptación).

Ejemplo de referencia (`harnessed-app`):

1. `AGENTS.md`
2. `docs/current-state.md`
3. `docs/api-contract.md`
4. Spec activa en `specs/<feature>/spec.md`

## Entregable

- Diagrama (PNG o `.md`)
- Tabla MCP (3 sí + 3 no)
- Boot sequence (4 líneas) + spec mínima (3–5 líneas)

## Criterios de éxito

- [ ] El harness está **en el repo**, no solo en prompts del chat
- [ ] Distinguís RAG (similitud) vs grafo (impacto) vs Engram (memoria entre sesiones)
- [ ] Al menos un MCP con razón clara (no "porque está de moda")
- [ ] Boot sequence es ejecutable (archivos existen o planeás crearlos)
- [ ] La spec tiene criterios verificables (test o validate)
