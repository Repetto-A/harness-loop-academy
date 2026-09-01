# Guion de grabación — Módulo 6: Modelos open source en tu IDE

**Duración objetivo:** ~50 min (bloques orientativos, no rígidos)  
**Pantalla:** slides + terminal + Cursor (mención VS Code)

---

## Intro standalone (~1 min, opcional personal)

> Hoy no vamos a debatir si la IA open source “gana” a la de frontera. Vamos a aprender **cómo elegir y usar modelos con pesos abiertos** — taxonomía, categorías, pesos — y a **correrlos en tu máquina con Ollama**, conectados a **Cursor o VS Code**. DeepSeek es un ejemplo más en el ecosistema; el foco es el **procedimiento**: qué modelo, dónde corre, cómo lo validás.

*(Opcional: 30 s de contexto personal — tu stack, VRAM, por qué te interesa local.)*

**Promesa del video:** al terminar podés instalar Ollama, elegir un modelo acorde a tu hardware y usarlo en el IDE para tareas acotadas con criterio.

---

## Mapa orientativo (~50–55 min)

| Tiempo aprox. | Bloque | Qué decir / hacer |
|---------------|--------|-------------------|
| 0:00–1:00 | Intro | Promesa standalone; sin puentes a otros módulos |
| 1:00–16:00 | Taxonomía OSS | Vocabulario, categorías de apertura, aclaraciones, comparativa de calidad, modelos por tarea, cuándo local |
| 16:00–23:00 | Ollama | Instalar, `pull`, `list`, VRAM, límites (~5–7 min demo terminal) |
| 23:00–38:00 | IDE + local | Cursor: Settings → Models; chat y Agent acotado; mención VS Code (Continue / extensión Ollama) |
| 38:00–48:00 | **Cuantización + hardware** | Texto largo abajo: anatomía → Q → RAM/VRAM → embudo por tarea (~10 min) |
| 48:00–55:00 | Caso práctico | Clasificar/extraer JSON o coding acotado; contraste opcional 1 min |
| 55:00–58:00 | Cierre | Medí con casos reales, no con vibes; próximo paso concreto |

Los bloques Excel (0–10, 10–20…) son **guías**, no cortes de edición obligatorios.

**Dónde leer lo que hay que decir:**
- **Este archivo** → sección *Bloque cuantización* (texto para hablar ~10 min).
- **Slides** `/mod-06` → IDs `mod6-model-anatomy` → `quantization` → `memory` → `model-fit`. En presenter mode (**P**) hay notas cortas; el guion de abajo es la versión completa.

---

## Bloque 1 — Taxonomía y categorías (~15 min)

**Slides:** `c4-concept-map` → `c4-categories` → `c4-open-clarify` → `c4-comparison` → `c4-models` → `c4-when-local`

### Speaker notes (flexibles)

- **Concept map:** modelo ≠ plataforma ≠ API. Ejemplo: ChatGPT es plataforma; el modelo es el motor; la API es cómo lo llamás desde código.
- **Categorías:** eje = licencia y pesos. Cerrado, open weights, fine-tuned, open source real. DeepSeek, Qwen, Llama entran en la conversación como **ejemplos**, no como protagonista único.
- **Open clarify:** free vs enterprise, hosteado vs “en tu máquina”. Toque ligero — **no** profundizar on-prem ni espectro enterprise.
- **Comparativa calidad:** en 2026 la brecha open vs propietario se achicó para tareas acotadas. No abrir debate largo OSS vs frontera.
- **Modelos por tarea:** tabla por caso de uso; abajo Ollama/LM Studio para probar, vLLM para servir en red (mención en una frase, sin desplegar arquitectura).
- **Cuándo local:** datos sensibles, tareas acotadas, prototipos, baja dependencia de SaaS.

**Mensaje clave:** elegís **categoría + tarea + dónde corre**, no un nombre de moda.

---

## Bloque 2 — Ollama (~5–7 min demo)

**Slide:** `mod6-ide-integration` (preview) o transición verbal → terminal.

Seguir [`demo-ollama-cursor.md`](./demo-ollama-cursor.md) — Parte 1.

**Decir en voz:**

```text
Ollama es el camino más simple para probar OSS en tu PC.
Elegí un modelo que entre en tu VRAM; empezá chico.
```

**Comandos mínimos en pantalla:**

```bash
ollama --version
ollama pull qwen2.5-coder:7b
ollama list
ollama run qwen2.5-coder:7b "Explicá en 3 bullets qué hace un handler REST"
```

**Plan B:** si Ollama falla, mostrar `ollama list` precargado y seguir con IDE ya configurado.

---

## Bloque 3 — Integración IDE (~15 min)

**Slide:** `mod6-ide-integration`  
**Demo:** Partes 2–3 de [`demo-ollama-cursor.md`](./demo-ollama-cursor.md)

### Cursor (foco principal)

1. Settings → Models → Ollama en `http://localhost:11434`
2. Chat con modelo local — prompt acotado sobre un archivo del repo demo
3. Agent mode con **alcance explícito** (un archivo, un test, `npm test` al final)

**Frase ancla:**

> El contexto del archivo y el alcance del prompt importan más que el modelo más grande.

### VS Code (mención breve, ~1–2 min)

- **Continue:** extensión + provider Ollama, mismo endpoint local.
- **Extensión Ollama:** chat lateral contra modelos locales.

No demo completa de VS Code salvo que el público lo pida; dejar en slide y guion escrito.

---

## Bloque cuantización + hardware (~10 min) — TEXTO PARA HABLAR

**Cuándo grabarlo:** después de la demo IDE (cuando ya viste un tag tipo `…-q4` o `7b`), antes del caso práctico.  
**Slides:** `mod6-model-anatomy` → `mod6-quantization` → `mod6-memory` → `mod6-model-fit`  
**Objetivo del bloque:** que el alumno sepa *leer* un nombre de modelo y elegir uno que entre en su máquina para la tarea — no el más famoso.

> Podés leer casi literal o improvisar encima. Son ~10 minutos de charla sin demo pesada.

### Slide 1 — Anatomía del nombre (~2 min)

**Qué transmitir:** el nombre no es decorativo; antes de bajar nada, ya te dice si te sirve.

**Texto:**

```text
Cuando en Ollama ves un nombre como qwen2.5:7b-instruct-q4, no es un código random.
Es una etiqueta compacta. Vamos a partirla en cuatro.

Primero: la familia — qwen2.5. Quién lo entrenó y de qué linaje viene. Qwen, Llama, DeepSeek,
Mistral: son familias distintas. Mismo “tamaño” no implica mismo comportamiento.

Segundo: la escala — 7b. Son los parámetros. Aprox. siete mil millones.
Más B suele ser más capacidad… y más memoria. Acá viene el error típico:
la gente cree que 7B-q4 y 14B-q4 son “el mismo modelo comprimido distinto”.
No. 3B, 7B, 14B, 70B son modelos distintos. Cambiar de 7 a 14 es cambiar de cerebro,
no de zip.

Tercero: el ajuste — instruct. Significa que lo afinaron para seguir instrucciones
y chatear. No es el checkpoint base crudo: es el que querés en el IDE.

Cuarto: la cuantización — q4. Eso no te suma parámetros. Es el mismo 7B guardado
con menos precisión en cada peso, para que ocupe menos disco y menos RAM/VRAM.

Resumen: elegís familia y escala por capacidad; elegís q4 o q8 por si entra en tu máquina.
La cuantización no te convierte un 7B en un 70B.
```

**Transición:** *“Elegimos la escala; ahora cómo hacemos que entre.”*

---

### Slide 2 — Cuantización (~2,5 min)

**Qué transmitir:** mismo modelo, distinta huella de memoria; hay tradeoff, no es gratis.

**Texto:**

```text
Cuantizar es comprimir los pesos del mismo modelo. Pensalo así:
en vez de guardar cada número con mucha precisión, los guardás con menos bits.
Menos bits → menos memoria. El modelo “es el mismo”; lo que cambia es con qué
fidelidad están representados los pesos.

Tomemos un 7B de referencia, órdenes de magnitud — no hace falta memorizar GB exactos:

- Sin cuantizar, tipo FP16: alrededor de 14 GB solo de pesos. En muchas laptops, fuera.
- Q8: más o menos la mitad, unos 7 u 8 GB. Suele perder poco; a veces casi no se nota.
- Q4: cerca de 4 o 5 GB. Es el default práctico para correr local.
  Es lo que vas a ver más seguido en Ollama cuando tu hardware es modesto.

Ojo: no es gratis. A menos bits, algo de precisión se pierde.
Para extraer campos, clasificar un ticket, devolver JSON: casi no se nota.
Para razonamiento fino, cadenas largas, matices difíciles: sí puede notarse.

Regla simple: si te alcanza la memoria, preferí Q8.
Si estás justo y la tarea es acotada, Q4 y medí con casos reales.
No asumas “cuanto más comprimido mejor”.
```

**Transición:** *“Comprimido o no, el cuello físico es la memoria.”*

---

### Slide 3 — RAM y VRAM (~2,5 min)

**Qué transmitir:** “entra o no entra” define si es usable; VRAM rápida, RAM válida pero lenta.

**Texto:**

```text
El modelo corre rápido si entra en memoria. Dónde entra define tu velocidad.

Camino ideal: GPU + VRAM. Si el modelo completo entra en la VRAM de la placa,
la inferencia va rápida. El problema es que la VRAM suele ser el recurso más escaso:
una laptop de oficina a menudo tiene poca o ninguna dedicada.

Camino B: CPU + RAM. Sin GPU también corre. Funciona. Es más lento.
Ollama, si no entra todo en GPU, puede repartir capas entre GPU y CPU.
O sea: no es todo-o-nada, pero cada capa en CPU te frena.

Regla práctica — con margen para el sistema operativo y el contexto del prompt:

- Unos 8 GB → pensá modelos chicos: 1B a 3B en Q4.
- Unos 16 GB → ahí entran cómodos los 7B / 8B en Q4 — el rango más útil para el IDE.
- Unos 32 GB → podés mirar 14B en Q4.

Importante: no entran solo los pesos del modelo.
También el runtime y el contexto — el KV cache.
Si mandás un prompt enormemente largo o mucho archivo pegado, comés memoria
aunque el modelo “en papel” entraba.

Si querés verificar qué está cargado y cuánto usa: ollama ps en la terminal.
Con eso dejás de adivinar.
```

**Transición:** *“Con esto, elijamos modelo para ESTA tarea.”*  
*(No abras AWS ni cloud acá; ya cubriste dónde corre en taxonomía.)*

---

### Slide 4 — Elegir por tarea / embudo (~3 min)

**Qué transmitir:** no arrancás por el ranking; arrancás por la tarea + lo que entra en tu hardware.

**Texto:**

```text
El modelo más chico que resuelve bien la tarea suele ser mejor elección
que el más grande del leaderboard.

El embudo es este — en orden:

1. ¿Qué tarea es? Extraer, clasificar, sugerir un fix, razonar un diseño…
2. ¿Qué tipo de entrada? Texto, imagen, scan, código…
3. ¿Qué calidad mínima aceptás? “Formato JSON estable” no es lo mismo que “plan de arquitectura”.
4. ¿Qué memoria tenés? Acá entra todo lo de Q4 / VRAM.
5. ¿Qué latencia aceptás? En el IDE, esperar 30 segundos por cada chat mata el flujo.
6. Probar con casos reales. Tres a cinco ejemplos de tu trabajo. Medí, no vibes.

Ejemplo aplicado — flujo tipo factura u OCR, o cualquier pipeline de documentos:

- Si arrancás con imagen o scan: necesitás visión u OCR. No forcejes un 7B de texto solo.
- Cuando ya tenés texto: un instruct chico, tipo 7B, alcanza para estructurar campos,
  armar JSON, anonimizar PII. Ahí es donde local brilla.
- Recién si la tarea pide razonamiento pesado — multi-paso, ambigüedad alta —
  escalás de tamaño… o salís a un modelo de frontera vía API.

Anti-patrón clásico: bajar un 70B o un razonador enorme para leer un CUIT y un total.
Estás pagando memoria y latencia por un problema que un 7B Q4 resuelve.

Cierre: no elegimos por ranking. Elegimos por tarea, por evidencia con casos reales,
y por el hardware que tenemos delante.
```

**Salida natural:** volver al caso práctico / demo OCR con esa lente (“por eso elegimos este modelo, no uno más grande”).

---

### Frase ancla del bloque (por si te trabás)

> La cuantización te deja correr el **mismo** modelo con menos memoria. Tu trabajo es elegir la **escala** correcta y el **Q** que entre — y validar con casos reales.

---

## Bloque 4 — Caso práctico (~12 min)

**Slide:** `c4-demo-intro` (notas adaptadas: demo Ollama + IDE, no anonimizador enterprise)

### Opción A — Extracción JSON (recomendada en video)

Prompt fijo en chat local:

```text
Dado este JSON de ticket de soporte, devolvé SOLO JSON con campos: categoria, prioridad, resumen.
{"id": 42, "texto": "No puedo login desde ayer, urgente para demo con cliente"}
```

Repetir con 2 ejemplos más. Comentar si el formato se mantiene estable.

### Opción B — Coding acotado

Ver Parte 2–3 en demo-ollama-cursor (test 404, fix acotado).

### Medición (ligera, ~1 min)

> No necesitás un golden set de 200 casos para empezar. Tomá **3–5 ejemplos reales** de tu trabajo, corré el mismo prompt en local y mirá: ¿formato correcto? ¿alucina campos? ¿latencia aceptable? Medí, no vibes.

**Contraste frontera (opcional, ~1 min):** mismo prompt con modelo de API si tenés tiempo. Una frase: local para iterar y datos sensibles; API para agentes largos en repos enormes. **No** convertir en segmento largo.

---

## Cierre (~3 min)

**Slide:** `c4-closing`

**Frase final sugerida:**

> El modelo no es la arquitectura. Elegí sistema: categoría, dónde corre, cómo validás con casos reales, qué pasa si falla. Ollama + IDE es tu laboratorio; la decisión de producción viene después.

**Próximo paso para el alumno:**

1. Un modelo pulled en Ollama  
2. Cursor (o VS Code) apuntando a localhost  
3. Checklist completado + 3 líneas sobre cuándo **no** usarías ese modelo  

---

## Slides

Ruta dev: `/mod-06` — speaker notes en presenter mode (P).

**Orden de slide IDs:** ver `deck-modulo-06.tsx` (`slidesModulo06`).

---

## Mensajes clave (repaso)

1. OSS en el IDE sirve para tareas **acotadas** y datos que no querés mandar afuera.
2. DeepSeek es **uno** entre Qwen, Llama, Mistral, etc.; importa la **taxonomía** y la tarea.
3. No reemplaza agentes complejos sin evaluación con casos reales.
4. Deployment enterprise / on-prem: **toque ligero** en slides; profundidad fuera de alcance.

---

## Post-producción

- [ ] PDF deck en `online-course/exports/modulo-06.pdf`
- [ ] Enlace recursos: checklist + modelos-por-tarea-2026
