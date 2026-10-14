# Cómo competir en una hackathon (y sobrevivir en el intento) — Diseño

**Formato:** Crash course 101 · charla + demo · sin hands-on en sala
**Duración:** versión maestra ~80 min (75 de contenido + 5 de preguntas), modular
**Primer destino:** workshop presencial propio → recorte para HackaTwin (Cande)
**Reutilización:** otros eventos; el bloque Grok Bot alimenta el Grok Bot Meetup
**Marca:** la charla es de Alejandro Repetto (sin paraguas de serie). NEXA aparece como chivo de pantalla.

---

## 1. Objetivo y público

- **Público:** mayoría técnica con mezcla (diseño, negocio, finanzas). Lo técnico va completo, con una traducción por concepto.
- **Primerizos invitados, pero el tono es competitivo:** high agency, excelencia, terminar sí o sí.
- **Éxito:** que salgan sabiendo elegir y matar ideas, priorizar por lo que se ve, construir con agentes sin perder el hilo y pitchear. Y con una tarea concreta para la semana.
- **Clips:** cada bloque tiene al menos una frase o un momento pensado para recortar.

## 2. Restricción que ordena todo: regla de HackaTwin

No se permite traer nada armado del proyecto. La charla enseña la línea explícitamente:

| Antes del sábado (permitido) | Desde las 9:00 (cero) |
|---|---|
| Entorno: cuentas (Supabase, Grok Bot, Cursor), créditos, MCP, Gentle AI / Engram, skills globales | El repo: AGENTS.md, spec, código |
| Cabeza: filtro de ideas, plantilla de pitch, esqueleto de AGENTS.md de memoria | Todo lo específico del proyecto |

**Pendiente:** confirmar con Cande que el entorno personal cuenta como tooling permitido.

## 3. Arco narrativo

- **Apertura:** "En mi primera hack no hablé. Le dejé el pitch a un profe."
- **Cierre (callback):** "Hoy pitcheo a sponsors en ETHGlobal, streameo en Builders Off The Record y estoy acá. Ustedes empiezan el sábado."
- **Lente transversal:** *¿Qué se ve en los 3 minutos de demo?* Atraviesa la elección, el triage, la demo y cierra en el pitch.

## 4. Estructura

| # | Bloque | Min | Ancla |
|---|---|---|---|
| 0 | Apertura: el arco | 3 | "No hablé" |
| 1 | Mentalidad | 10 | Abby Care + hack propia sin terminar |
| 2 | Elegir y triage | 12 | Pivot por la doc del sponsor |
| 3 | Grok Bot: anatomía + bot propio | 5 | Puente a lo técnico |
| 4 | Técnico | 15 | "Lo mismo que el bot, en tu repo" |
| 5 | Demo: Gentle AI + grafo + SDD sobre Somos Huella | 15 | Supabase pgvector como feature |
| 6 | Pitch | 10 | Callback del arco |
| 7 | Cierre | 5 | "9:05, primer commit: AGENTS.md" |

Cada bloque se puede sacar o agregar sin romper los demás.

## 5. Contenido por bloque

### Bloque 1 — Mentalidad (10 min)

1. **High agency:** el principio que ordena todo. Nadie te va a decir qué hacer el sábado.
2. **Qué es una hack:** 12 horas, un jurado, 3 minutos. Gana la mejor demo *contada*.
3. **El premio real es la gente:** mentores, sponsors y jurado. Networking con intención.
4. **La vida es una venta:** el pitch es una habilidad para siempre, no un trámite.
5. **Ownership, no roles fijos:** todos tocan todo, pero cada tarea tiene un dueño. El reparto sale de fortalezas y debilidades.
6. **Empatía sí, freeze no.** Historias:
   - *Abby Care* (amigo de Ale): tuvieron la idea y la perdieron discutiendo la certificación y cómo llamar a los médicos. Hoy vale US$ 225M ([Forbes Uruguay](https://es.linkedin.com/posts/forbesuruguay_forbesuruguay-negocios-activity-7512930884447211520-eL_H)). Matiz: la certificación SÍ es parte del modelo de Abby Care. Importaba en el mes 6, no en la hora 3. Todo lo que no se ve en el demo es para después.
   - *Hack propia:* diplomacia estirada para no ser dictador, tiempo perdido, proyecto sin terminar.
   - *Contraste:* otras veces la diplomacia funcionó. Depende del instinto.
   - Tip opcional, no regla: timebox a las discusiones.
   - En cámara, sin insultos hacia los compañeros de la historia.
7. **Terminar sí o sí:** algo feo que anda le gana a algo hermoso a medias.

### Bloque 2 — Elegir y triage (12 min)

1. **Brainstorm en equipo:** cantidad primero. El Grok Bot ayuda.
2. **Matar:** las muy comunes, las que no cierran, las sin mercado y el Frankenstein por sponsors (tracks pegados solo por la plata).
3. **Filtro de 5:**

| Pregunta | Mata si... |
|---|---|
| ¿Duele? | Nadie tiene ese problema |
| ¿Se ve? | No hay un momento wow en 3 min |
| ¿Se termina? | No entra en ~6 h reales de código |
| ¿Sobrevive? | Depende de una sola API o doc que se puede romper |
| ¿El track tiene sentido? | El track está pegado por el premio. Multi-track coherente = maximizar premios, válido |

4. **Historia:** pivot a mitad de hack por falta de documentación de un sponsor. Salió excelente igual. Elegí ideas que sobrevivan a que algo se rompa.
5. **Triage por wow:** matriz visibilidad × riesgo. Primero lo visible y seguro. Lo que no se ve, se simplifica o se mockea, y si el jurado pregunta, se dice.

### Bloque 3 — Grok Bot (5 min)

- Anatomía del bot propio de Ale: **rol, instrucciones, herramientas, memoria**.
- En vivo: research de una idea de la sala contra el filtro de 5.
- Se entrega por QR como template compartible ("Chief of Staff de hack": filtro, triage y plantilla de pitch adentro).
- Puente: la anatomía del bot es la misma que la del agente de código (AGENTS.md, MCP, Engram).
- **Fuera de alcance:** el tutorial de cómo armar un bot desde cero va al Grok Bot Meetup.

### Bloque 4 — Técnico (15 min)

| Concepto | Traducción | Por qué el sábado |
|---|---|---|
| Ventana de contexto | Un pizarrón que se borra | A las 15:00 el chat ya no recuerda lo decidido a las 9:00 |
| AGENTS.md | Las instrucciones del bot, en el repo | Cualquier chat nuevo arranca sabiendo |
| Spec de 1 página | El guion de demo como contrato | Contraste de 10 seg: cadena empresa (NovaBank: PRD → tickets → spec → PR → review) versus la versión hack |
| Skills | Recetas que se cargan solas | No repetís el mismo prompt 20 veces |
| MCP | El USB de las herramientas | El agente toca Supabase directo |
| Engram (cómo funciona) | Memoria entre chats | Las decisiones sobreviven al chat |
| Grafo de código | El mapa del repo | A la hora 8, el agente navega en vez de leer todo |

### Bloque 5 — Demo (15 min)

**Repo:** Somos Huella (`SomosHuella/ML-FaceRecognizer`). Datos de prueba, usar `/ejemplos`.

**Dos repos:**
- **Repo 1, pre-hecho:** la corrida completa del ensayo (Gentle AI instalado, grafo, proposal, spec, design, tasks).
- **Repo 2, en vivo:** clon limpio desde GitHub.

**Guion:**
1. Instalar Gentle AI (Engram + SDD). Instalar es un concepto separado de cómo funciona.
2. Ingestar el repo en el grafo y mostrar el mapa.
3. SDD con la sala: feature *"Supabase pgvector como índice alternativo de búsqueda, sin migrar datos"*. La sala opina en la proposal ("¿qué queda afuera?").
4. Si el agente responde a tiempo, se espera y se comenta. Si falla o tarda, se pasa al Repo 1: "esto salió ayer con el mismo comando".
5. Chat nuevo: Engram recuerda la decisión.

**Supabase / Select 26:** entra solo dentro de la demo, ~5 min, con 2 o 3 anuncios que le sirven a un hacker. Candidatos: desarrollo local sin Docker, confirmación del MCP antes de acciones destructivas, apps que exponen su propio MCP. **Pendiente:** verificar contra el blog oficial de Supabase. La única fuente detallada encontrada es un recap de daily.dev.

**Cursor:** es el IDE de la demo.

**Cuidado en pantalla:** no abrir `frontend/.env.local` con el proyector.

### Bloque 6 — Pitch (10 min)

| Parte | Qué | Regla |
|---|---|---|
| Problema | Que duela, con una persona concreta | ~20 seg |
| Solución | La demo, no slides | El wow elegido en el triage |
| Por qué nosotros | Este equipo, este problema | Una línea por persona, máximo |
| Impacto futuro | Hacia dónde va | Abby Care: el mes 6 que no cabía en la hora 3 |
| CTA | Qué piden | Una sola cosa |

- **Quién pitchea es una decisión de liderazgo.** Hay distintos estilos: el mejor orador, quien más lo necesita, o 1–2 personas. No más.
- Historia: Ale cedió el pitch muchas veces para que otros se animaran. No todo es ganar esa hack.
- Practicar 3 veces antes de las 18:00.
- Callback del arco.

### Bloque 7 — Cierre (5 min)

- Tabla entorno sí / repo no.
- QR: checklist de la semana (instalar Gentle AI, probar Engram y SDD, conocer al equipo), template del Grok Bot.
- "9:05, primer commit: AGENTS.md."
- Chivo NEXA en pantalla.

## 6. Sponsors

Las herramientas aparecen **adentro del flujo**, no como tour:

- **Grok Bot:** ideas y research.
- **Cursor:** IDE.
- **Supabase:** la feature de la demo y los anuncios de Select en contexto.

Objetivo: el clip de cada producto funcionando, que sirva para pedir créditos y visibilidad.

## 7. Entregables

1. **Deck** en el sistema propio (`_ref-smart-prompts`, `PresentationDeck`, ruta `/hackatwin` o una nueva), con notas de presentador en cada slide.
   - Hoy `deck-hackatwin.tsx` tiene 7 slides sin notas y está **untracked en el checkout de `master`**, no en esta rama. Hay que traerlo o recrearlo acá.
   - Revisar si se pueden reutilizar slides de `deck-clase-05` y `deck-sesion-0x` para el bloque técnico.
2. **Guion** minuto a minuto, con historias y frases para clips.
3. **Checklist / QR** para la semana.
4. **Template del Grok Bot** "Chief of Staff de hack".
5. **Demo:** Repo 1 pre-hecho con la corrida SDD y guion de comandos para el Repo 2.
6. **Recorte para Cande:** versión 45–60, achicando el técnico y la demo.

## 8. Pendientes y riesgos

- Confirmar con Cande que el entorno personal está permitido.
- Verificar los anuncios de Select 26 contra fuentes oficiales.
- Ensayo cronometrado del SDD en vivo, para saber cuánto tarda cada fase.
- Criterios del jurado de HackaTwin: desconocidos. Si se consiguen, entran al bloque 1.
- La portada actual (`presentations/hackatwin-portada.png`) usa el título viejo. Hay que rehacerla.
