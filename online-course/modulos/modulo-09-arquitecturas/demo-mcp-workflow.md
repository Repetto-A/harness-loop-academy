# Demo — MCP, workflow Git y SDD lite (Módulo 9)

**Repo:** `starter/harnessed-app`  
**Duración demo total:** ~12 min (MCP) + ~10 min (workflow)

---

## Demo A — codebase-memory-mcp (grafo + semántica)

### Prerrequisitos

- Cursor con MCP configurado (`~/.cursor/mcp.json` o proyecto)
- Node 20+ si el servidor lo requiere
- Repo abierto: `starter/harnessed-app`

### Paso 1 — Instalar MCP

Agregar servidor en configuración MCP de Cursor (ajustar ruta según instalación):

```json
{
  "mcpServers": {
    "codebase-memory": {
      "command": "npx",
      "args": ["-y", "codebase-memory-mcp", "--ui", "--port=9749"]
    }
  }
}
```

Reiniciar Cursor → verificar que el servidor aparece **verde** en MCP panel.

**UI opcional:** abrir `http://localhost:9749` para ver el grafo indexado.

### Paso 2 — Indexar el repo

En Agent chat:

```text
Indexá el proyecto actual con codebase-memory-mcp.
Confirmá cuando el índice esté listo.
```

Esperar confirmación. Si tarda >2 min en vivo, saltar al Plan B.

### Paso 3 — Consulta de impacto

```text
Usando codebase-memory-mcp: si modifico la lógica de validación del endpoint de health,
¿qué archivos, tests y dependencias se ven afectados? Listá relaciones explícitas.
```

**Qué mostrar al alumno:**

- Respuesta basada en **relaciones** (llama, importa, testea), no solo similitud de texto.
- Contraste oral: RAG encontraría docs parecidos; el grafo responde *impacto*.

### Paso 4 — Consulta semántica (opcional, 1 min)

```text
¿Dónde está definido el contrato de respuesta JSON para APIs en este repo?
```

---

## Demo B — Engram (memoria entre sesiones)

1. Cursor → MCP panel → Engram activo
2. Prompt:

```text
mem_search: boot sequence harnessed-app
```

3. Si vacío:

```text
mem_save topic_key=harnessed-app-boot
Decisión: boot sequence = AGENTS.md → docs/current-state.md → docs/api-contract.md → spec activa en specs/
```

4. **Nuevo chat** (misma sesión o reinicio) → repetir `mem_search` y verificar que el agente recupera la decisión vía MCP.

**Mensaje:** Engram complementa el grafo — recuerda *cómo trabajaste*, no reemplaza specs en Git.

---

## Demo C — Workflow Git + SDD lite

### Branch y spec

```bash
cd starter/harnessed-app
git status
git checkout -b feat/ejemplo-mod9
```

### Spec mínima (`specs/add-health-version/spec.md`)

```markdown
# Health endpoint

## Objetivo
GET /api/health devuelve `{ "status": "ok", "version": "<from package.json>" }`.

## Criterios
- 200 JSON
- Test en tests/integration/
- validate:closeout pasa
```

### Prompt Agent

```text
Implementá specs/add-health-version/spec.md.
Seguí AGENTS.md. Al terminar: npm run validate:closeout y resumen de cambios.
```

### Cierre workflow

```bash
npm run validate:closeout
git add -A
git commit -m "feat(api): health endpoint with version per spec"
git log -1 --oneline
```

Mostrar diff. Mencionar PR template si existe en el repo.

---

## Gentle AI — path opcional (solo instructor)

**No es requisito para alumnos.** Usar solo si tenés [Gentle AI](https://github.com/Gentleman-Programming/gentle-ai) instalado.

Mapeo del mismo workflow a comandos SDD:

| Paso manual (demo C) | Comando Gentle AI |
|----------------------|-------------------|
| Explorar repo antes de spec | `/sdd-explore` |
| Escribir/refinar spec | `/sdd-design` o spec en `specs/` |
| Implementar | `/sdd-apply` |
| Validar y cerrar | `/sdd-verify` |

Ejemplo alternativo (misma feature health):

```text
/sdd-explore Qué falta para un GET /api/health con version en package.json
```

Luego `/sdd-apply` sobre la spec generada, y `npm run validate:closeout` igual que la demo manual.

Referencia: [`instructor-demos/demo-sdd-healthcheck.md`](../../../instructor-demos/demo-sdd-healthcheck.md) (sección Gentle AI), [`handouts/01-harness-fundamentals.md`](../../../handouts/01-harness-fundamentals.md).

---

## Plan B

| Falla | Mitigación |
|-------|------------|
| codebase-memory-mcp no instala | Slide `c5-graph-mcp` + screenshot UI pre-indexada |
| Indexación lenta (>3 min) | Branch `feat/ejemplo-mod9` ya indexado; mostrar consulta directa |
| Engram sin respuesta | Explicar con slide `c5-engram-visual`; memoria de ejemplo pre-cargada |
| MCP panel caído | Diagrama arquitectura + grabación previa del panel |
| `validate:closeout` lento | Mostrar output parcial; commit en branch backup listo |
| Sin Gentle AI | Omitir slide `mod9-gentle-ai` (30 s oral: "existe acelerador opcional") |
