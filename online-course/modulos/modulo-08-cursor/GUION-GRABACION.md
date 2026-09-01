# Guion de grabación — Módulo 8: Cursor AI

**Duración objetivo:** ~60 min (bloques flexibles) | **Repo demo:** `starter/harnessed-app`  
**Slides entrega (grabar con este):**  
`Desktop/curso workana/8/Modulo-08-Cursor-AI - SPEAKER-LIGHT.pptx`  
(~7 slides speaker-first: intro corta + demo. Ignorá Copy / COMPLETO / `M8-Cursor-60min-COMPLETO-modos-cloud-mcp-v2.pptx`.)

## Narrativa (30–45 s intro)

> Cursor es un IDE pensado para trabajar con agentes de IA: varios modos de chat, modelos, terminal, browser, MCP y una app cloud/mobile. La diferencia que importa en producción no es solo el modelo — es el **harness engineering aplicado en el repo**: reglas, skills, docs y validación que el agente puede leer en cada sesión nueva. Hoy recorremos el producto Cursor y montamos ese sistema; lo cerramos con un bug real.

**OK repetir ideas del M9.** Acá el ángulo es *cómo se vive en Cursor*; allá es arquitectura del stack.

---

## Mapa por bloques (~60 min)

| Bloque | Tiempo guía | Contenido |
|--------|-------------|-----------|
| **A · Producto Cursor** | 0:00–18:00 | Tesis, modos, modelos, settings, Git, extensiones, cloud/mobile/comandos |
| **B · Harness en Cursor** | 18:00–35:00 | Qué es harness / skill / rule; UI Rules·Skills·Subagents; AGENTS + Closeout |
| **C · Superficie avanzada** | 35:00–42:00 | Hooks, Browser, Tools & MCP, Plugins (show + explicar) |
| **D · Demo** | 42:00–55:00 | Bug 500 + harness + (opcional) MCP/plugin en Settings |
| **E · Cierre** | 55:00–60:00 | 4 pasos + ejercicio + recursos |

---

### A — Producto Cursor (0:00–18:00)

- **0:00–2:00** — Intro: Cursor ≠ “ChatGPT pegado al editor”. Producto + harness en repo.
- **2:00–4:00** — Tesis: *El chat se olvida. El repo no.*
- **4:00–8:00** — **Modos del chat (obligatorio, hoy incompleto en el PPT):**
  - **Agent** — planifica y ejecuta (edits, terminal, skills).
  - **Plan** — diseña el approach sin (o con poca) ejecución; útil antes de tocar mucho.
  - **Ask** — solo lectura / Q&A; no edita.
  - **Debug** — investigación de bugs con evidencia (logs, hypotesis, fixes acotados).
  - **Multitask** — varios agentes / frentes en paralelo.
  - Frase: *Elegís el modo según el riesgo de la tarea, no por costumbre.*
- **8:00–11:00** — **Modelos:** Settings → Models. Cloud (Auto / Opus / Sonnet / GPT / Gemini según plan). Ollama/local si ya lo vieron en M6. Regla práctica: Agent largo → modelo fuerte; Ask/refactor chico → modelo más barato/rápido. No hace falta ranking eterno: “dónde se elige” + “cuándo subir/bajar”.
- **11:00–14:00** — **Settings tour (pantalla):** General, indexing, `.cursorignore`, Rules/Skills/Subagents (preview), Tools & MCPs, Hooks, Browser & Network. Git & PRs: conectar remoto, PRs desde Cursor. Extensiones: Cursor = fork VS Code → marketplace compatible; cuidá conflictos con otras AI extensions.
- **14:00–18:00** — **Cloud + Mobile + comandos:**
  - Cursor Cloud / Cloud Agents: trabajo que sigue fuera de la laptop.
  - Cursor mobile: revisar / empujar tareas ligeras; no reemplaza el IDE para demos pesadas.
  - Comando útil: `/in-cloud` (y mención de otros `/` de Commands en Settings).
  - 2–3 comandos más que uses vos (ej. workflows SDD o review) — *mostrar*, no listar 20.

---

### B — Harness engineering aplicado en Cursor (18:00–35:00)

**Renombrá el slide** “Mapa del harness” → **“Harness engineering aplicado en Cursor”**.

Sí: explicá **qué es** cada pieza (aunque M9 lo retome) **y** cómo se ve en Cursor.

- **18:00–22:00** — Vocabulario (sin apuro):
  - **Harness** — el sistema alrededor del modelo: contrato, reglas, procedimientos, docs, gates (`validate:*`).
  - **Rule** — instrucción scoped (glob/dominio) que el agente debe respetar.
  - **Skill** — procedimiento bajo demanda (`SKILL.md` + `description`); se invoca solo o con `/`.
  - **Subagent** — agente especializado para un tramo (opcional; no es el foco del demo).
  - **Docs del repo** (`docs/`, specs) — hechos durables.  
  - **¿“Open Docs” / @Docs?** Sí tiene sentido en **1–2 min**: indexar docs externas o de librerías como contexto en Cursor (`@Docs` / docs indexadas). Diferencial: *docs indexadas ≠ skill*. Docs = conocimiento de referencia; skill = *cómo* hacer un proceso. No profundices RAG acá (eso es M9).
- **22:00–26:00** — Grid harness en Cursor: `AGENTS.md`, `.cursor/rules/`, `.cursor/skills/`, `docs/`, `validate:*`, `.cursor/hooks.json`.
- **26:00–30:00** — UI Settings → **Rules, Skills, Subagents** (como tu screenshot): project vs user; ejemplo `api-errors` / `code-review`. Mensaje: *371 skills instaladas ≠ harness bueno; curá 6–8.*
- **30:00–35:00** — Boot sequence + Closeout + `validate:closeout`. Anti-patterns: AGENTS gigante, victoria sin validate, skill spam.

---

### C — Superficie avanzada (35:00–42:00)

Show, no sermon:

- **Hooks** — gates en el loop del agente (pre/post). Abrí `.cursor/hooks.json` o Settings → Hooks. 1 ejemplo verbal (“antes de commit / antes de editar”).
- **Browser** (intra-Cursor) — Settings → Browser & Network; cuándo sirve (UI local, smoke visual). No demo larga.
- **Tools & MCPs** — qué es un MCP en una frase; abrir panel y mostrar 1 server conectado (o conectar uno simple en vivo).
- **Plugins** — dónde viven; 30 s.
- Puente: *MCP/plugins amplían manos; no reemplazan AGENTS + skills para el comportamiento del repo.*

---

### D — Demo (42:00–55:00)

**Pre-demo:**

```powershell
cd harness-loop-academy
.\instructor-demos\reset-clase1-demo.ps1
cd starter\harnessed-app
npm test
npm run validate:closeout   # debe fallar antes del fix (bug abierto)
```

Abrí **Agent** (modo correcto a propósito — contrastá 10 s con Ask/Plan). Prompt:

```text
El cliente reporta 500 en GET /api/users/999/display-name.
Seguí AGENTS.md: boot sequence, fix, validate:closeout, code-review skill, Closeout.
```

En pantalla:

1. Boot / rules / skill como hoy.
2. `npm run validate:closeout` en verde.
3. **Extra (~2–3 min):** Settings → Tools & MCPs (o un plugin) — “así se conecta capacidad externa”; no hace falta usarlo en el fix.
4. Opcional: Hooks + Browser solo si sobra tiempo.

**Alternativa corta:** [`instructor-demos/demo-sdd-healthcheck.md`](../../../instructor-demos/demo-sdd-healthcheck.md)

---

### E — Cierre (55:00–60:00)

4 pasos para llevar Cursor+harness a tu repo + ejercicio [`ejercicio.md`](./ejercicio.md) + recursos.

---

## Checklist de slides a sumar / renombrar (PPTX)

Prioridad alta (hoy faltan o están flacos):

1. **Modos:** Agent · Plan · Ask · Debug · Multitask  
2. **Modelos** (dónde + cuándo subir/bajar; link mental a M6 local)  
3. Renombrar mapa → **Harness engineering aplicado en Cursor**  
4. **Qué es** harness / rule / skill / docs / @Docs (1 slide vocabulario)  
5. **Cloud + Mobile + `/in-cloud` + Commands**  
6. **Git & PRs + extensiones VS Code**  
7. **Hooks · Browser · MCP · Plugins** (puede ser 1 slide “superficie” + demo)  
8. Settings tour (screenshot Rules/Skills/Subagents)

Mantener: tesis, setup, rules vs skills, boot, closeout, anti-patterns, demo prompt, cierre, ejercicio.

---

## Mensajes clave

1. El chat se olvida; el repo no.  
2. Modo correcto (Agent/Plan/Ask/Debug/Multitask) = menos riesgo.  
3. Modelos se eligen en Settings; harness decide *cómo* trabaja el agente.  
4. Rule = scoped; Skill = procedimiento; Docs/@Docs = conocimiento; MCP = herramientas externas.  
5. Agent sin `validate:closeout` = victoria falsa.  
6. Cloud/mobile amplían el loop; el contrato sigue en el repo.

## Recursos alumno

- Handout Cursor / harness  
- ZIP `harnessed-app` sin `node_modules`  
- [`docs/SETUP-CLOUD.md`](../../../docs/SETUP-CLOUD.md)  
- Ejercicio: [`ejercicio.md`](./ejercicio.md)
