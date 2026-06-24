# Demo Clase 1 — WOW (before/after)

**Duración:** 5–7 min en vivo | **Impacto:** falso "listo" vs cierre verificable

## Prompt exacto (copiar/pegar — chat NUEVO en cada repo)

```text
El cliente reporta 500 en GET /api/users/999/display-name en producción.
Investigá, arreglá, y prepará para merge.
```

No agregues "corré tests" ni "seguí AGENTS.md" — dejá que el harness hable.

**GitHub Copilot:** mismo prompt en Copilot Chat con cada starter en un workspace de VS Code separado.  
**Cursor (instructor):** Agent mode equivalente; alumnos con Copilot siguen el mismo guion.

---

## Qué debería pasar

### broken-app — el agente se autoengaña

| Paso | Comportamiento típico (wow) |
|------|----------------------------|
| Lee README | Cree que debe devolver **200 + displayName: ""** |
| Edita server.js | Implementa contrato TASK-12 falso |
| Corre `npm test` | Solo unit — **pasa** o arregla unit test |
| Declara victoria | **Pero `npm run test:all` sigue roto** — 404 esperado vs 200 vacío |
| No actualiza docs | No hay docs que actualizar |
| Cierre | "Listo" sin evidencia de integración |

**Punchline para el aula:**

> Corrieron tests. Están verdes. **Y el bug sigue en producción.** ¿Por qué? Porque no tenían harness — tenían un README mentiroso y una suite recortada.

Verificación en vivo después del agente:

```powershell
cd starter/broken-app
npm run test:all   # FALLA — moment wow
curl http://localhost:3000/api/users/999/display-name
```

---

### harnessed-app — el harness no deja mentir

| Paso | Comportamiento esperado |
|------|-------------------------|
| Boot | Lee `AGENTS.md` → current-state → api-contract → spec |
| Ignora README hermano / TODO | Sigue api-contract (404) |
| Implementa | null en domain + 404 en route |
| `validate:closeout` | lint + **suite completa** + current-state |
| Actualiza docs | Bug #1 cerrado en current-state.md |
| Cierre | Plantilla Closeout + code-review |

**Punchline:**

> Mismo modelo. Mismo bug. **Sistema distinto.** El harness no escribe mejor código — hace imposible declarar victoria sin evidencia.

---

## Checklist pre-demo

```powershell
cd harness-loop-academy
.\instructor-demos\reset-clase1-demo.ps1
cd starter\broken-app && npm test && npm run test:all
cd ..\harnessed-app && npm test && npm run validate:closeout
```

Esperado:

| Comando | broken-app | harnessed-app |
|---------|------------|---------------|
| `npm test` | 1 fail (throw) | 2 fail |
| `npm run test:all` | 2 fail | — |
| `validate:closeout` | N/A | fail (bug + docs) |

---

## Reset entre cohortes

```powershell
.\instructor-demos\reset-clase1-demo.ps1
```

---

## Si el contraste es débil

1. Verificá chat **nuevo** (sin historial)
2. Verificá que broken no tenga AGENTS.md
3. Después del agente en broken, **vos** corrés `npm run test:all` en silencio — pausa 3 seg — "¿Alguien ve el problema?"

---

## Narración sugerida (90 seg)

1. Mismo prompt → broken → agente termina
2. "¿Le creemos?" → `npm run test:all` → rojo
3. Mismo prompt → harnessed → agente termina con Closeout
4. "¿Le creemos?" → ya corrió validate:closeout → verde
5. "El harness es CI/CD del agente."
