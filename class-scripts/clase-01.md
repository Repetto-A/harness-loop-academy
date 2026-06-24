# Guion Clase 1 — Context Engineering

**Duración total:** ~2h 30m | **Elevator pitch:** "El chat se olvida. El repo no."

## Materiales

- [`starter/broken-app`](../starter/broken-app) y [`starter/harnessed-app`](../starter/harnessed-app)
- [`handouts/01-harness-fundamentals.md`](../handouts/01-harness-fundamentals.md)
- [`instructor-demos/DEMO-CLASE1-WOW.md`](../instructor-demos/DEMO-CLASE1-WOW.md)
- [`labs/lab-01-bootstrap-harness.md`](../labs/lab-01-bootstrap-harness.md) (homework opcional)

---

## 0:00 – 0:10 | Apertura + tesis

**Decir:**

> El chat se olvida. El repo no. Hoy pasamos de "promptear mejor" a construir un entorno donde el agente entiende el proyecto sin que lo repitamos cada vez.

**Pregunta al aula:** "¿Cuántas veces repitieron las mismas instrucciones al agente esta semana?"

---

## 0:10 – 0:35 | Prompting que importa (25 min)

No repetir anatomía del budín (curso previo). Enfocar:

| Pieza | Mensaje |
|-------|---------|
| Rol + contexto | Qué es el proyecto, qué archivos importan |
| Restricciones | Qué NO tocar, qué comando de validación |
| Criterio de éxito | Observable: tests, contrato HTTP, diff acotado |
| Verificación explícita | "Corré X y pegá output" — no "dejalo listo" |

**Ejemplo malo vs bueno** (en pizarra):

```text
Malo:  "Arreglá el bug de usuarios"
Bueno: "Bug 500 en GET /api/users/999/display-name. Seguí docs/api-contract.md.
        Cerrá solo si npm run validate:closeout pasa."
```

---

## 0:35 – 0:50 | Ventana de contexto (15 min)

- La ventana es el cuello de botella — no el modelo.
- Mega-prompts se pierden; archivos en repo persisten.
- Boot sequence: qué lee el agente primero (`AGENTS.md` → `current-state` → contratos).

---

## 0:50 – 1:15 | Mapa de archivos + Copilot vs Cursor (35 min)

Recorrer handout §3 y §14:

```txt
AGENTS.md / copilot-instructions.md → docs/ → skills → scripts validate
```

**Anti-patterns** (2 min cada uno):

- MCP para docs estáticos
- 50 skills sin curar
- AGENTS.md enciclopedia
- README mentiroso vs api-contract

**Traducción en vivo:** mostrar `.github/copilot-instructions.md` y `.cursor/rules/` en harnessed-app.

---

## 1:15 – 1:40 | Demo WOW (25 min)

Ver [`DEMO-CLASE1-WOW.md`](../instructor-demos/DEMO-CLASE1-WOW.md).

1. **Copilot/VS Code** en `broken-app`, chat **nuevo**.
2. Mismo prompt en `harnessed-app`, chat **nuevo**.
3. Punchline: tests verdes parciales ≠ producción OK.

**Nota instructor Cursor:** podés usar Agent mode; el alumno con Copilot sigue el mismo prompt.

---

## 1:40 – 2:00 | Lab corto (20 min)

Cada alumno en su repo (o papel si no tienen acceso):

1. Escribir **Misión** en 1–3 oraciones (futuro `AGENTS.md` o `copilot-instructions.md`).
2. Elegir **1 regla** que hoy repiten en cada chat → convertirla en archivo.

Homework opcional: completar [`lab-01-bootstrap-harness.md`](../labs/lab-01-bootstrap-harness.md).

---

## 2:00 – 2:30 | Q&A + cierre (30 min)

| Pregunta | Respuesta corta |
|----------|-----------------|
| ¿Over-engineering? | El costo hoy es vos acordando todo en cada chat |
| ¿Copilot vs Cursor? | Mismo harness en archivos; distinto IDE |
| ¿Cuántos skills? | 6–8 excelentes > 50 mediocres |

**Puente Clase 2:** "El harness dice *cómo*. Mañana: *qué* construir antes de codear (SDD)."

---

## Checklist instructor pre-clase

- [ ] `npm install` en ambos starters
- [ ] `.\instructor-demos\reset-clase1-demo.ps1` ejecutado
- [ ] Dos workspaces listos (broken + harnessed)
- [ ] Handout compartido
- [ ] Slides: `cd _ref-smart-prompts && npm run dev` → `/harness-01`
