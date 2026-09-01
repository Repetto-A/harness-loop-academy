# Demo — Ollama + Cursor / VS Code (Módulo 6)

**Duración en video:** ~25 min (bloques 16:00–50:00 del guion) | **Repo demo:** `starter/harnessed-app`

---

## Pre-requisitos (grabar una vez, off-camera)

- Node 20+
- Ollama instalado: https://ollama.com
- Modelos precargados (ajustar a tu VRAM):

```bash
ollama --version
ollama pull qwen2.5-coder:7b
# Opcional si hay GPU: ollama pull deepseek-r1:8b
ollama list
```

- **Cursor:** Settings → Models → Ollama en `http://localhost:11434`
- **VS Code (opcional):** extensión Continue u Ollama configurada al mismo endpoint
- Repo clonado, `npm install` en `starter/harnessed-app`

---

## Parte 1 — Terminal (~5–7 min)

Objetivo: mostrar que el modelo corre local antes de abrir el IDE.

```bash
ollama run qwen2.5-coder:7b "Explicá en 3 bullets qué hace users.js en una API REST"
```

Mostrar latencia y calidad en tarea trivial. Mencionar VRAM: si va lento, bajar a `llama3.2:3b`.

**Si el pull tarda en grabación:** precargar off-camera; en cámara solo `ollama list` + `ollama run`.

---

## Parte 2 — Cursor chat (~8 min)

1. Abrir `starter/harnessed-app` en Cursor
2. Chat nuevo → modelo `qwen2.5-coder:7b`
3. Prompt:

```text
Leé starter/harnessed-app/src/users.js y proponé un test para el caso 404 en GET /api/users/:id/display-name.
No implementes todavía; solo el plan y el esqueleto del test.
```

4. Mostrar que el **contexto del archivo** importa más que el modelo gigante.

---

## Parte 3 — Agent acotado (~7 min)

Mismo repo, Agent mode con modelo local:

```text
En src/routes/users.js, asegurate de que el handler de display-name devuelve 404 cuando el usuario no existe.
Solo tocá ese archivo y el test relacionado. Corré npm test al final.
```

**Si tarda mucho en grabación:** jump-cut con branch `demo/mod6-local-fix` ya preparado.

---

## Parte 4 — VS Code (~2 min, mención o B-roll)

No es obligatorio grabar demo completa; sirve como referencia escrita.

### Continue

1. Instalar extensión **Continue**
2. Config → provider **Ollama** → `http://localhost:11434`
3. Elegir el mismo modelo (`qwen2.5-coder:7b`)

### Extensión Ollama

1. Instalar **Ollama** desde marketplace
2. Panel lateral → seleccionar modelo pulled
3. Mismo tipo de prompt acotado que en Cursor

**Frase para voz en off:**

> El flujo es el mismo: modelo local, prompt acotado, validación manual. Cursor y VS Code difieren en UX, no en el concepto.

---

## Parte 5 — Caso JSON (~10 min en guion principal)

Prompt fijo (chat local):

```text
Dado este JSON de ticket de soporte, devolvé SOLO JSON con campos: categoria, prioridad, resumen.
{"id": 42, "texto": "No puedo login desde ayer, urgente para demo con cliente"}
```

Repetir con 2 ejemplos más. Comentar formato y alucinaciones.

**Medición ligera (30 s):**

> Tres casos tuyos, mismo prompt, mirá formato y estabilidad. No hace falta un benchmark formal para decidir si te sirve en el día a día.

---

## Parte 6 — Contraste frontera (opcional, ~1 min)

Solo si sobra tiempo. Mismo prompt JSON con modelo de API en Cursor:

- Calidad en edge cases (una frase)
- Velocidad / costo / privacidad (una frase)

**Frase única:**

> Local para iterar y datos sensibles; API para agentes largos en monorepos — sin convertir esto en debate.

---

## Plan B

| Fallo | Mitigación |
|-------|------------|
| Ollama no arranca | Mostrar `ollama list` + captura Settings Cursor de sesión anterior |
| Modelo lento | Usar 3B/7B; advertir en voz |
| Agent se cuelga | Pre-grabar terminal; voz en off sobre capturas |
| Cursor no detecta Ollama | Verificar puerto 11434; reiniciar Ollama |

---

## Checklist pre-grabación

- [ ] `ollama list` muestra modelo pulled
- [ ] Cursor detecta Ollama
- [ ] (Opcional) VS Code + Continue probado una vez
- [ ] `harnessed-app` abre sin errores
- [ ] Cerrar notificaciones / modo no molestar
