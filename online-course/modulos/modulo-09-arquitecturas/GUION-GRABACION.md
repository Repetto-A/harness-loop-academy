# Guion de grabación — Módulo 9: Arquitecturas Modernas IA

**Duración objetivo:** ~50 min (bloques son guía, no rigidez)

## Narrativa (30 s intro)

> Este módulo cierra el curso corporativo con una pregunta concreta: **¿cómo hace tu equipo para que la IA entienda el repo y trabaje con proceso?** No vendemos herramientas — armamos un stack reproducible: contexto de codebase (RAG, grafo, memoria), harness en Git, workflow con spec y validación.

## Mapa minuto a minuto

| Tiempo | Bloque | Contenido |
|--------|--------|-----------|
| 0:00–8:00 | Panorama en capas | Developer (IDE + Git) → harness (AGENTS, rules, skills, validate) → contexto codebase (RAG, MCP grafo, Engram) |
| 8:00–18:00 | MCP en vivo | **codebase-memory-mcp**: instalar, indexar, consultar impacto. **Engram**: mem_search / mem_save entre sesiones |
| 18:00–30:00 | Documentación | AGENTS.md, rules, skills, current-state; qué indexar en RAG vs qué va en docs estáticos |
| 30:00–42:00 | Workflow Git + SDD lite | branch → `spec.md` → agent → `validate:closeout` → commit. Mención opcional Gentle AI (30 s–2 min) |
| 42:00–50:00 | Arquitectura recomendada | Stack 2026: RAG + codebase-memory-mcp + Engram + docs; niveles 1–3 |

## Slides

**PPTX grabación (SPEAKER-LIGHT):**  
`C:\Users\conta\Desktop\curso workana\9\Modulo-09-Arquitecturas-Modernas-IA - SPEAKER-LIGHT.pptx`  
(~22 slides, estética Workana template; texto mínimo — el guion vive acá)

**Deck web (referencia de ideas, no fuente del PPT):** `/mod-09`

| # | Titular | Bloque |
|---|---------|--------|
| 1 | Logo Workana Academy | Apertura |
| 2 | Módulo 9 · Arquitecturas IA | Portada (~50 min) |
| 3 | Brand wordmark | Beat de marca |
| 4 | No es un modelo más grande | Frase ancla |
| 5 | **01** Panorama en capas | 0–8' |
| 6 | Tres capas | 0–8' |
| 7 | Sin contexto estructurado | 0–8' |
| 8 | Escalones de contexto | 0–8' |
| 9 | **02** MCP en vivo | 8–18' |
| 10 | RAG | 8–18' |
| 11 | Grafo codebase-memory-mcp | Demo A |
| 12 | Engram | Demo B |
| 13 | **03** Documentación | 18–30' |
| 14 | Harness en Git | 18–30' |
| 15 | RAG vs docs estáticos | 18–30' |
| 16 | **04** Workflow | 30–42' |
| 17 | SDD lite | Demo C |
| 18 | Gentle AI (opcional) | 30 s–2 min |
| 19 | Stack 2026 | 42–50' |
| 20 | Niveles 1 · 2 · 3 | 42–50' |
| 21 | Demo / ejercicio | Cierre |
| 22 | Gracias | Cierre |

## Bloque 0:00–8:00 — Panorama

1. Slide portada: foco en **codebase intelligence + MCP + workflow**.
2. Diagrama de capas (`mod9-architecture`): el harness vive en el repo; MCP extiende (no reemplaza) AGENTS.md.
3. `c5-problem` + `c5-context-levels`: sin contexto estructurado la IA rellena con respuestas plausibles pero incorrectas. Escalones: manual → RAG → grafo → memoria persistente.

**Frase ancla:** "El IDE consume el harness; RAG, grafo y Engram son cómo la IA *encuentra* verdad en tu codebase."

## Bloque 8:00–18:00 — MCP (demo prioritaria)

### Demo A — codebase-memory-mcp (~6 min)

Ver [`demo-mcp-workflow.md`](./demo-mcp-workflow.md).

1. Instalar MCP en Cursor (config `mcp.json`).
2. Indexar `starter/harnessed-app`.
3. Pregunta de impacto: *"Si cambio la validación en X, ¿qué endpoints, tests y jobs toca?"*
4. Mostrar UI en `localhost:9749` si hay tiempo (opcional).

**Mensaje:** grafo = relaciones de impacto; vectores = similitud semántica. No repetir benchmark 120× — ya está en slide.

### Demo B — Engram (~4 min)

```text
mem_search: boot sequence harnessed-app
```

Si vacío:

```text
mem_save: Boot = AGENTS.md → docs/current-state.md → api-contract → spec activa
```

Nuevo chat → verificar recuperación vía MCP.

**Mensaje:** Engram = memoria entre sesiones y compactaciones; no sustituye specs ni AGENTS.md.

### Plan B

- MCP caído: slides `c5-graph-mcp` + `c5-engram-visual` + grabación previa del panel.
- Sin indexación: mostrar UI ya indexada en branch backup.

## Bloque 18:00–30:00 — Documentación

Slide `mod9-docs` + tabla en [`arquitectura-recomendada.md`](../../recursos/arquitectura-recomendada.md).

Recorrer en `starter/harnessed-app`:

1. `AGENTS.md` — contrato portable (~120 líneas máx).
2. `.cursor/rules/` — reglas scoped por glob.
3. `docs/current-state.md` — hechos durables.
4. Spec activa en `specs/<feature>/spec.md`.

### Qué indexar vs qué documentar (2 min oral)

| Va a RAG / grafo | Va en docs estáticos (CAG) |
|------------------|----------------------------|
| Contratos API, tests de referencia, ADRs | AGENTS.md, rules, skills |
| Docs de dominio que cambian poco | current-state, decision-log |
| **Nunca:** PII, secrets, dumps, logs sensibles | Specs del feature activo |

Slides de apoyo: `c5-rag-indexing`, `c5-harness-def`, `c5-harness-components`.

## Bloque 30:00–42:00 — Workflow Git + SDD lite

### SDD lite (2–3 min, no clase completa)

1. Escribir intención en `specs/<feature>/spec.md` (objetivo + criterios).
2. Agent implementa siguiendo spec + AGENTS.md.
3. `npm run validate:closeout` como gate.
4. Commit con mensaje que referencia la spec.

No abrir las 8 fases SDD ni openspec completo — solo el hilo **spec → agent → validate**.

### Demo workflow (~8 min)

```bash
cd starter/harnessed-app
git checkout -b feat/ejemplo-mod9
```

1. Crear o abrir `specs/add-health-version/spec.md`.
2. Prompt agent: *Implementá la spec. Seguí AGENTS.md. Al terminar: validate:closeout.*
3. `npm run validate:closeout`
4. `git add -A && git commit -m "feat(api): health endpoint per spec"`
5. Mostrar diff / PR template.

### Gentle AI — mención opcional (30 s–2 min)

Solo si el instructor lo tiene instalado. Ver slide `mod9-gentle-ai`.

- Capa **opcional** sobre Cursor + harness del repo.
- Orquesta fases SDD como comandos: `/sdd-explore`, `/sdd-design`, `/sdd-apply`, `/sdd-verify`.
- Skills registry unificado; no es requisito para alumnos.
- Referencia: [`handouts/01-harness-fundamentals.md`](../../../handouts/01-harness-fundamentals.md), [gentle-ai](https://github.com/Gentleman-Programming/gentle-ai).

**Frase:** "Si ya tenés harness + spec en el repo, Gentle AI acelera el mismo workflow — no lo reemplaza."

## Bloque 42:00–50:00 — Arquitectura recomendada

Slide `mod9-levels` + handout [`arquitectura-recomendada.md`](../../recursos/arquitectura-recomendada.md).

### Stack codebase context (resumen)

```txt
RAG (docs + tests indexados)     ← similitud semántica
codebase-memory-mcp (grafo)      ← impacto y relaciones
Engram (MCP memoria)             ← decisiones entre sesiones
AGENTS + rules + specs (repo)    ← contrato y proceso
```

### Tres niveles

- **Nivel 1:** AGENTS + 1 skill + validate + modelo frontera.
- **Nivel 2:** + rules + specs + MCP (grafo o Engram).
- **Nivel 3:** + OSS local + golden set + CI validate.

Cierre con `c5-closing`: el salto no es un modelo más grande — es mejor contexto, límites y proceso.

## Recursos

- [`arquitectura-recomendada.md`](../../recursos/arquitectura-recomendada.md)
- [`demo-mcp-workflow.md`](./demo-mcp-workflow.md)
- [`ejercicio.md`](./ejercicio.md)
- https://modelcontextprotocol.io
- https://github.com/DeusData/codebase-memory-mcp
