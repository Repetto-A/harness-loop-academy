
# Presentación interactiva: "IA bien usada"

App de slides web construida en el proyecto, lista para presentar en vivo desde el navegador. Versión larga (~60 min) con todos los bloques del guion.

## Estética

- Paleta charcoal & ember: fondo `#1a1a1a`, superficies `#2d2d2d`, líneas `#4a4a4a`, acento ember `#e85d3a`, texto `#f5f5f5`.
- Tipografía con personalidad: **Space Grotesk** para títulos (display, bold), **Inter** para body. Mono **JetBrains Mono** para bloques de código/prompt.
- Tono visual: dark, denso, con acento ember en números, palabras clave y bordes. Sin gradientes pastel, sin "AI genérico".
- Motivo repetido: numeración grande de bloque arriba a la izquierda (ej. `B07 ▸`) en ember, y barra inferior con título de la charla + progreso.

## Arquitectura técnica

- Una sola ruta `/` que monta el editor/presentador (es una app de slides, no un sitio multi-página).
- Slides como componentes React individuales en `src/slides/SlideXX.tsx`, registrados en un array `slides` con `{ id, title, component, notes }`.
- Render fijo a **1920x1080** con `transform: scale()` para que se vea perfecto en cualquier pantalla y proyector. Componente `ScaledSlide` reutilizable.
- Navegación: flechas ←/→, Space, PageUp/Down, click en zonas, swipe en touch.
- Atajos: `F` fullscreen, `G` grid overview de todos los slides, `P` presenter view (slide actual + siguiente + notas + timer), `D` toggle dark/light (default dark), `?` ayuda.
- Barra inferior con número de slide, total, progreso y título.
- Persistencia: número de slide actual en `localStorage` para no perder el lugar.
- Sin backend ni Cloud — todo estático.

## Bloques / slides (versión 60 min)

Cada slide tiene título, idea visual y notas del orador (las notas vienen del guion del usuario).

1. **Cover** — "IA bien usada: de prompts sueltos a workflows inteligentes" + nombre del orador.
2. **Tesis** — "Un buen input logra un buen output." Tipografía gigante, ember.
3. **El modelo no hace magia** — corremos atrás del último modelo, pero…
4. **Pregunta al público** — "¿Qué tiene que tener un buen mensaje para una IA?" prompt pobre en pantalla.
5. **Prompt engineering, sin humo** — definición bajada a tierra.
6. **La IA no lee tu mente** — bullets de lo que no sabe.
7. **Anatomía de un prompt** — diagrama con los 9 elementos (tarea, objetivo, contexto, referencias, reglas, formato, proceso, criterios, modo de error).
8. **Prompt malo** — bloque de código con el prompt pobre.
9. **Prompt mejorado** — bloque de código con la versión estructurada (split-view con el anterior).
10. **Ventana de contexto: la mesa** — ilustración de mesa vacía / ordenada / explotada.
11. **Más contexto ≠ mejor** — "información que cambia la respuesta vs ruido con autoestima".
12. **Ejemplo de filtrado de contexto** — bloque "leé la sección 3, ignorá lo histórico…".
13. **Meta prompting** — "la IA también puede revisar el pedido".
14. **Ejemplos de meta prompts** — 3 bloques cortos.
15. **De prompt a sistema** — tabla estable / dinámico / reutilizable / memoria.
16. **Archivos persistentes** — árbol de carpetas `project/` con CLAUDE.md, memory.md, skills/.
17. **Ejemplo CLAUDE.md / AGENTS.md** — bloque de código.
18. **Ejemplo memory.md** — bloque de código.
19. **Skills / templates** — "si lo usás más de una vez, convertillo en template".
20. **Ejemplo de skill (Frontend Review)** — bloque de código.
21. **Subagents** — agentes especializados, mención inicial.
22. **Workflow AI-first** — pipeline visual: idea → prompt → spec → plan → tasks → impl → review → memoria → iteración.
23. **Spec-driven development** — qué es, por qué importa.
24. **MCP / RAG (mención)** — slide breve, no entrar en detalle.
25. **Demo / momento abierto** — slide reservado por si hace demo en vivo.
26. **Ejercicio QR** — prompt malo "ayudame a estudiar para un examen" + QR placeholder a un Doc.
27. **Versión esperada del ejercicio** — bloque de código con el prompt mejorado.
28. **Frases para llevarse** — slides con citas grandes (3-4 frases del guion, una por slide quizás colapsadas en una con animación).
29. **Cierre — "La ventaja no es usar IA, es saber dirigirla"** — tipografía gigante ember.
30. **Gracias / contacto** — cierre con redes / QR.

Total: ~30 slides, calza cómodo en 60 min.

## Detalles técnicos

```text
src/
  routes/
    index.tsx              # monta <Presentation />
  components/
    Presentation.tsx       # estado global (slide actual, modo)
    ScaledSlide.tsx        # wrapper 1920x1080 con transform scale
    SlideShell.tsx         # número de bloque, footer, layout base
    GridOverview.tsx       # vista grilla de todos los slides
    PresenterView.tsx      # vista presentador (next + notas + timer)
    HelpOverlay.tsx        # atajos
    CodeBlock.tsx          # bloque mono con highlight ember
  slides/
    index.ts               # registro de slides + notas
    Slide01Cover.tsx
    Slide02Thesis.tsx
    ... (uno por slide)
  styles.css               # tokens charcoal/ember + escalado tipográfico .slide-content
  hooks/
    useKeyboardNav.ts
    useFullscreen.ts
```

- `styles.css` define tokens en `oklch` (background, surface, border, accent ember, foreground) y aplica escalado de tipografía dentro de `.slide-content` (text-xs..text-9xl forzados a tamaños grandes).
- Fuentes vía Google Fonts en `<head>` del root.
- Sin dependencias nuevas pesadas; uso de framer-motion (ya común) para transiciones entre slides (fade + slight slide).

## Qué NO incluye

- No hay backend ni base de datos (no se necesita Cloud).
- No hay export a PPTX/PDF (es app web; si lo necesitás después, lo agregamos).
- El QR del ejercicio es placeholder visual — reemplazable cuando definas la URL.

¿Le doy para adelante con esta estructura?
