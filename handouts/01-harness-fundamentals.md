# Harness Engineering — Fundamentos

**Handout Clase 1** | Lectura: 15–20 min | Autor: Ale (adaptado de AI-Native Engineering Workflow Harness)

---

## 1. Dos capas: Harness vs Loop

| Concepto | Qué es | Analogía |
|----------|--------|----------|
| **Harness** | Infraestructura que hace predecible al agente | CI/CD del agente |
| **Loop** | Ciclo cerrado: señal → agente → verificación → salida | Pipeline con feedback |

**Tesis:** sin harness, el loop es caos; sin loop, el harness es documentación muerta.

---

## 2. Diagnóstico — fragmentación vs sistema

| Problema | Riesgo | Fix |
|----------|--------|-----|
| Sin contrato raíz (`AGENTS.md`) | Agente inventa convenciones | Un manual corto y estricto |
| Múltiples "memorias" | Contexto contradictorio | Definir qué va dónde |
| Specs sin workflow único | Planes stale | Un template antes de cambios riesgosos |
| Tests sin harness | Agente salta validación | Tiers de validación por riesgo |
| Skills sin curar | Ruido en contexto | 6–8 skills excelentes |
| Review tardío | Bugs en main | Review agent / skill post-implementación |

**Diagnóstico brutal:** hoy el sistema depende de que *vos* recuerdes el prompt, el doc, el test y el agente correcto. Eso no escala.

---

## 3. Stack canónico del harness

```txt
AGENTS.md                    ← contrato raíz (~120 líneas máx)
.cursor/rules/*.mdc          ← reglas por dominio/archivo
docs/current-state.md        ← qué es verdad AHORA (corto)
docs/architecture.md         ← estructura estable
docs/decision-log.md         ← decisiones durables
.cursor/skills/*/SKILL.md    ← juicio reutilizable
.cursor/hooks.json           ← gates en eventos del agente
.cursor/agents/*.md          ← subagentes especializados
openspec/ o Engram           ← persistencia SDD
package.json scripts         ← validación invocable
```

| Ruta | Propósito | Qué NO va ahí |
|------|-----------|---------------|
| `AGENTS.md` | Reglas operativas para todos los agentes | Tutoriales largos, historia stale |
| `.cursor/skills/` | Workflows reutilizables del proyecto | Dump de skills de terceros |
| `docs/current-state.md` | Snapshot actual | Historia completa |
| `docs/decision-log.md` | Decisiones de arquitectura/producto | Notas diarias |

---

## 4. Estrategia AGENTS.md

Mantenerlo bajo ~120 líneas. Debe incluir:

- **Misión** — qué valora el repo en cambios
- **Contexto** — stack + docs de orientación
- **Planning** — explorar antes; spec si >3 archivos
- **Coding** — patrones existentes, scope acotado
- **Testing** — tabla cambio → comando mínimo
- **Review** — diff + validación antes de cerrar
- **Context** — no inflar respuestas; actualizar current-state solo si aplica
- **Skills** — cuáles usar y cuándo

Ver plantilla: [`templates/AGENTS.md.template`](../templates/AGENTS.md.template)

---

## 5. Skills — menos es más

Usar skills para **juicio repetible**, no datos one-off.

| Skill sugerido | Cuándo |
|----------------|--------|
| `code-review` | Antes de merge |
| `product-spec-writing` | Antes de features |
| `database-schema-review` | Migraciones / RLS |
| `ai-agent-architecture` | Diseñar agents/workflows |

**Prioridad inicial:** code-review → spec-writing → review de dominio (frontend, DB, etc.)

No copies 200 skills locales a cada repo. Curá.

---

## 6. Subagentes — comité mínimo

Regla: **un agente implementa, uno revisa**. Más subagentes solo si los riesgos son independientes.

| Subagente | Cuándo |
|-----------|--------|
| Security reviewer | Auth, secrets, RLS |
| Architecture reviewer | Refactors cross-module |
| Test coverage reviewer | Feature done, tests finos |
| UX reviewer | Cambios user-facing |

---

## 7. MCP — cuándo sí y cuándo no

**Sí:** sistemas vivos — Supabase, GitHub, Linear, Sentry, browser, logs.

**No:** instrucciones estáticas → eso es `AGENTS.md` y skills.

MCP = herramientas estandarizadas para clientes IA. No reemplaza documentación.

---

## 8. Matriz de validación

Tu repo ya tiene scripts. El harness los organiza:

| Tier | Ejemplo | Cuándo |
|------|---------|--------|
| **quick** | lint + unit | Cambio acotado |
| **ui** | + e2e/playwright | Flujos de usuario |
| **full** | ci completo | Refactors, releases |

| Tipo de cambio | Validación mínima |
|----------------|-------------------|
| Componente UI | unit + typecheck |
| API route | integration + typecheck |
| Schema/auth | tests + security review |
| Refactor amplio | ci full |

Agregá wrappers si ayuda al agente:

```json
"validate:quick": "npm run lint && npm test",
"validate:full": "npm run ci"
```

---

## 9. Anti-patterns (memorizar)

1. **MCP para docs estáticos** → skills/rules
2. **LangGraph para coding normal** → SDD + subagents
3. **50 skills instalados** → curar 6–8
4. **AGENTS.md enciclopedia** → fragmentar
5. **Confiar en código generado** → siempre validation loop + diff review
6. **LangGraph demasiado pronto** → rules, specs, scripts primero

LangGraph solo para: retries, checkpoints, human gates, workflows largos con estado.

---

## 10. Flujo objetivo — feature nueva

```txt
idea
  → spec corta
  → exploración (plan mode)
  → plan de implementación
  → cambios acotados
  → validation loop
  → review agent
  → resumen del diff
  → postmortem solo si el agente erró de forma instructiva
```

---

## 11. Narrativa para stakeholders (elevator pitch)

> Uso IA como sistema de ingeniería, no como autocomplete. Para trabajo no trivial empiezo con spec: objetivo, non-goals, touchpoints, criterios de aceptación y tests. El agente inspecciona el repo antes de implementar.
>
> Mantengo un `AGENTS.md` con reglas de planning, coding, testing y review. Workflows repetidos son skills. Subagentes para review aislado. Todo cambio meaningful pasa por validation loop y diff review. Si el agente falla, agrego regla durable — no solo lo arreglo una vez.

---

## 12. Plan 30 días (referencia post-capacitación)

| Semana | Foco | Entregable |
|--------|------|------------|
| 1 | Baseline + rules | AGENTS.md, current-state, matriz validación |
| 2 | Skills + specs | 4 skills, 1 spec completa |
| 3 | Validation + review | Scripts wrapper, review prompts |
| 4 | Workflows avanzados | 1 MCP/script real o rechazo explícito de LangGraph |

---

## 13. GitHub Copilot vs Cursor (para equipos corporativos)

| Concepto | GitHub Copilot (alumno) | Cursor (instructor opcional) |
|----------|-------------------------|------------------------------|
| Contrato raíz | `.github/copilot-instructions.md` + `AGENTS.md` | `AGENTS.md` |
| Reglas por dominio | Instrucciones en copilot-instructions | `.cursor/rules/*.mdc` |
| Skills | `.github/skills/*/SKILL.md` | `.cursor/skills/*/SKILL.md` |
| Gates automáticos | Scripts en `package.json` + reglas en AGENTS | + `.cursor/hooks.json` |
| Subagentes | Chat separado / coding agent | Agent mode + Task tool |
| Memoria | Docs vivas (`current-state.md`) | + Engram MCP (opcional) |

**Regla de oro:** el harness vive en el **repo**, no en el IDE. Cambiás de herramienta sin reescribir el sistema.

Ejemplo Copilot: [`starter/harnessed-app/.github/copilot-instructions.md`](../starter/harnessed-app/.github/copilot-instructions.md)

---

## 14. Próximos pasos (Clase 1)

1. Copiar [`templates/AGENTS.md.template`](../templates/AGENTS.md.template)
2. Crear `docs/current-state.md` con hechos durables only
3. Crear skill `code-review`
4. Definir tiers con scripts existentes
5. Correr Lab 01 en tu repo

**Clase 2 preview:** SDD convierte el harness en workflow operativo con artefactos persistidos.

---

## Referencias

- Repo academy: [`README.md`](../README.md)
- Starters: [`broken-app`](../starter/broken-app) vs [`harnessed-app`](../starter/harnessed-app)
- Gentle AI: https://github.com/Gentleman-Programming/gentle-ai
- MCP: https://modelcontextprotocol.io
