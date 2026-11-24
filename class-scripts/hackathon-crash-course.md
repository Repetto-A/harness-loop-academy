# Guion — Cómo competir en una hackathon (y sobrevivir en el intento)

**Formato:** crash course 101 · charla + demo · sin hands-on en sala
**Duración:** 75 min de contenido + ~5 min de preguntas (versión maestra, ~80 min) | **Elevator pitch:** "Gana la mejor demo contada. Terminá sí o sí."
**Fuente de verdad:** [`docs/superpowers/specs/2026-10-14-crash-course-hackathon-design.md`](../docs/superpowers/specs/2026-10-14-crash-course-hackathon-design.md)

## Materiales

- Deck: `_ref-smart-prompts/src/slides/deck-hackathon-crash-course.tsx` (Tanda 2).
- QR: [`handouts/hackathon-crash-course-checklist.md`](../handouts/hackathon-crash-course-checklist.md)
- Template del bot: [`hackathon/grok-bot-chief-of-staff.md`](../hackathon/grok-bot-chief-of-staff.md)
- Runbook de la demo: [`instructor-demos/hackathon-somos-huella-runbook.md`](../instructor-demos/hackathon-somos-huella-runbook.md)

## Mapa de tiempos

| Reloj | Bloque | Min | Ancla |
|-------|--------|-----|-------|
| 0:00 – 0:03 | 0. Apertura: el arco | 3 | "No hablé" |
| 0:03 – 0:13 | 1. Mentalidad | 10 | Abby Care + hack propia sin terminar |
| 0:13 – 0:25 | 2. Elegir y triage | 12 | Pivot por la doc del sponsor |
| 0:25 – 0:30 | 3. Grok Bot: anatomía + bot propio | 5 | Puente a lo técnico |
| 0:30 – 0:45 | 4. Técnico | 15 | "Lo mismo que el bot, en tu repo" |
| 0:45 – 1:00 | 5. Demo: Gentle AI + grafo + SDD sobre Somos Huella | 15 | Supabase pgvector como feature |
| 1:00 – 1:10 | 6. Pitch | 10 | Callback del arco |
| 1:10 – 1:15 | 7. Cierre | 5 | "9:05, primer commit: AGENTS.md" |
| 1:15 – 1:20 | Preguntas | 5 | — |

**Regla de oro del guion:** cada bloque se puede sacar o agregar sin romper los demás. Cada uno cierra con una transición y una línea "si falta tiempo, cortá".

**Lente transversal (repetirla en 2, 5 y 6):** *¿qué se ve en los 3 minutos de demo?*

**Convención:** `🎬` = frase o momento pensado para recortar como clip.

---

## 0:00 – 0:03 | Bloque 0 — Apertura: el arco (3 min)

**Decir:**

> En mi primera hack no hablé. Le dejé el pitch a un profe.

🎬 "En mi primera hack no hablé. Le dejé el pitch a un profe."

> Hoy les quiero contar lo que me hubiera gustado saber antes de esa hack. No es un curso de programación. Es cómo elegir una idea, cómo matarla a tiempo, cómo construir con agentes sin perder el hilo y cómo contar lo que hicieron.

> Esto es una charla para primerizos, pero el tono es competitivo. La idea no es participar. Es terminar, y que se vea.

**Pregunta a la sala (levantar la mano):** "¿Quién ya fue a una hackathon? ¿Quién va por primera vez?"

**Transición:** "Arranco por lo que más me costó: la cabeza."

**Si falta tiempo, cortá:** la pregunta a la sala. La frase de apertura no se corta nunca (el cierre depende de ella).

---

## 0:03 – 0:13 | Bloque 1 — Mentalidad (10 min)

**Ancla:** Abby Care + hack propia sin terminar.

### 1.1 High agency (1 min)

> El principio que ordena todo es *high agency*. Nadie te va a decir qué hacer el sábado. Nadie te va a asignar tareas ni a avisarte que vas mal. Si algo se traba, lo destrabás vos o no se destraba.

🎬 "Nadie te va a decir qué hacer el sábado."

### 1.2 Qué es una hack (1 min)

> Una hack son 12 horas, un jurado y 3 minutos. Gana la mejor demo *contada*. No gana el mejor código ni la idea más ambiciosa: gana lo que el jurado entiende y ve funcionando en tres minutos.

🎬 "Una hack son 12 horas, un jurado y 3 minutos."

### 1.3 El premio real es la gente (1 min)

> El premio real es la gente: mentores, sponsors y jurado. Vayan con intención: elijan con quién quieren hablar y qué le van a preguntar.

### 1.4 La vida es una venta (1 min)

> La vida es una venta. El pitch no es un trámite de la hackathon, es una habilidad para siempre: conseguir un trabajo, un cliente, una inversión, que alguien te preste atención. Una hack es el lugar más barato para practicarla.

🎬 "La vida es una venta."

### 1.5 Ownership, no roles fijos (1 min)

> No armen roles fijos tipo "vos hacés el front, vos el back". Todos tocan todo, pero cada tarea tiene *un* dueño. El reparto sale de fortalezas y debilidades, y eso se habla el primer día, no a las 15:00.

### 1.6 Empatía sí, freeze no (4 min)

**Historia 1 — Abby Care** (amigo de Ale):

> Un amigo mío tuvo la idea de Abby Care. Y la perdieron discutiendo la certificación y cómo llamar a los médicos. Hoy vale 225 millones de dólares. [Fuente: Forbes Uruguay.]

> Ojo con la lectura: la certificación SÍ es parte del modelo de Abby Care. Importaba. Pero importaba en el mes 6, no en la hora 3. Todo lo que no se ve en el demo es para después.

🎬 "Importaba en el mes 6, no en la hora 3."

**Historia 2 — Mi hack sin terminar:**

> Yo también lo hice. En una hack mía estiré la diplomacia para no ser el dictador del equipo. Perdí tiempo y el proyecto quedó sin terminar.

**Contraste:**

> Ahora, otras veces la diplomacia sí funcionó. No hay regla. Depende del instinto, de la gente y de cuánto falta para las 18:00.

**Tip opcional (no regla):**

> Un tip, no una regla: timebox a las discusiones. Si no se cierra en un rato fijo, decide el dueño de esa tarea y se sigue.

🎬 "Empatía sí, freeze no."

> Nota para Ale: en cámara, sin insultos hacia los compañeros de las historias. Contar la decisión, no el defecto de la persona.

### 1.7 Terminar sí o sí (1 min)

> Y la última: algo feo que anda le gana a algo hermoso a medias. Todas las veces.

🎬 "Algo feo que anda le gana a algo hermoso a medias."

**Transición:** "Con esa cabeza, ¿cómo se elige qué construir? Y sobre todo: cómo se mata una idea."

**Si falta tiempo, cortá:** 1.3 (el premio es la gente), 1.5 (ownership) y el tip opcional del timebox. Mínimo para no romper nada: 1.1, 1.2, Abby Care y 1.7.

> **Pendiente (spec §8):** si se consiguen los criterios del jurado de HackaTwin, entran acá, después de 1.2.

---

## 0:13 – 0:25 | Bloque 2 — Elegir y triage (12 min)

**Ancla:** pivot por la doc del sponsor.

### 2.1 Brainstorm en equipo (2 min)

> Primero cantidad, después calidad. Mucha idea mala sobre la mesa, sin juzgar. Y usen al bot: que les tire variantes y haga research mientras ustedes discuten.

### 2.2 Matar ideas (2 min)

> Después hay que matar. Cuatro tipos de idea mueren rápido:
>
> - las muy comunes (la que el jurado ya vio diez veces),
> - las que no cierran (no tienen un flujo completo),
> - las que no tienen mercado,
> - y el Frankenstein por sponsors: pegarle tres tracks a una idea solo por la plata.

> Ojo: multi-track *coherente* es maximizar premios, y es válido. Lo que no vale es pegar el track por el premio.

🎬 "Matar una idea a las 10:00 sale barato. A las 15:00 sale carísimo."

<!-- Nota: la frase del clip es de redacción nueva y no una anécdota; Ale puede reemplazarla por una propia si prefiere. -->

### 2.3 Filtro de 5 (4 min)

Mostrar la tabla en pantalla; recorrer una por una con una frase.

| Pregunta | Mata si... |
|----------|-----------|
| ¿Duele? | Nadie tiene ese problema |
| ¿Se ve? | No hay un momento wow en 3 min |
| ¿Se termina? | No entra en ~6 h reales de código |
| ¿Sobrevive? | Depende de una sola API o doc que se puede romper |
| ¿El track tiene sentido? | El track está pegado por el premio |

> Cinco preguntas. Si una idea falla una sola, no la hagan. Fíjense que "¿se ve?" es la pregunta del jurado: ¿qué se ve en los 3 minutos de demo?

> Ojo con "¿se termina?": son 12 horas, pero ~6 de código real. El resto es setup, comer, pitch y cosas que salen mal.

🎬 "¿Qué se ve en los 3 minutos de demo?"

### 2.4 Historia: el pivot (2 min)

> Una vez, a mitad de una hack, tuvimos que pivotear porque el sponsor no tenía documentación de lo que necesitábamos. Cambiamos de idea en el medio. Y salió excelente igual.

> La lección es la cuarta pregunta del filtro: elegí ideas que *sobrevivan* a que algo se rompa. Si tu idea depende de una sola doc o una sola API, ya sabés qué va a fallar.

🎬 "Elegí ideas que sobrevivan a que algo se rompa."

### 2.5 Triage por wow (2 min)

Dibujar la matriz 2×2 (visibilidad × riesgo).

> Una vez que tienen la idea, triage. Dos ejes: cuánto *se ve* y cuánto *riesgo* tiene. Primero lo visible y seguro. Lo visible y riesgoso, lo atacan temprano. Lo que no se ve, se simplifica o se mockea. Y si el jurado pregunta, se dice la verdad: "esto es un mock".

🎬 "Lo que no se ve, se mockea. Y si el jurado pregunta, se dice."

**Transición:** "Todo esto —las ideas, el filtro, el triage— lo puede hacer un bot con ustedes. Les muestro el mío."

**Si falta tiempo, cortá:** 2.1 (brainstorm) y las dos últimas filas del 2.2. Mínimo: filtro de 5 + triage.

---

## 0:25 – 0:30 | Bloque 3 — Grok Bot: anatomía + bot propio (5 min)

**Ancla:** puente a lo técnico.

> Grok Bot son compañeros de equipo hechos con IA: tienen su propia computadora, su memoria, herramientas por MCP o API y un navegador. Y se pueden compartir como templates.

### 3.1 Anatomía (2 min)

Mostrar el bot propio. Cuatro piezas, una por una:

| Pieza | Qué es | En mi bot |
|-------|--------|-----------|
| **Rol** | Quién es y para qué sirve | Chief of Staff de hack |
| **Instrucciones** | Cómo trabaja | Filtro de 5, triage, plantilla de pitch, ownership |
| **Herramientas** | Qué puede tocar | Navegador, MCP/API |
| **Memoria** | Qué recuerda entre charlas | Decisiones del equipo |

🎬 "Rol, instrucciones, herramientas, memoria. Cuatro cosas."

### 3.2 En vivo (2 min)

> Le pido una idea a la sala. ¿Alguien me da una idea de hack? [elegir una, la más concreta]

Pedirle al bot que haga research de esa idea y la pase por el filtro de 5. Comentar el resultado en voz alta mientras corre.

> **Si el bot tarda o falla:** no esperar. Mostrar la respuesta pregrabada o la captura del ensayo y decir "esto es lo que me devolvió ayer". El bloque sigue.

### 3.3 Entrega y puente (1 min)

> Este bot se los dejo por QR como template: filtro, triage y plantilla de pitch adentro. Cárguenlo en Grok Bot y ya tienen un chief of staff para la semana.

> Y ahora el puente: lo que acabo de mostrar —rol, instrucciones, herramientas, memoria— es *exactamente* la misma anatomía que un agente de código. Solo cambia dónde vive: en vez de un bot, es tu repo.

🎬 "Lo mismo que el bot, en tu repo."

**Fuera de alcance:** cómo armar un bot desde cero. Eso va al Grok Bot Meetup. Si alguien pregunta: "eso es otro día".

**Transición:** "Veamos el equivalente en el repo."

**Si falta tiempo, cortá:** el en vivo (3.2), y mostrar solo la tabla y el QR.

---

## 0:30 – 0:45 | Bloque 4 — Técnico (15 min)

**Ancla:** "Lo mismo que el bot, en tu repo."

**Estructura:** siete conceptos, ~2 min cada uno. Cada concepto: (1) qué es en una frase técnica, (2) la traducción para quien no es técnico, (3) por qué importa el sábado.

| # | Concepto | Traducción | Por qué el sábado |
|---|----------|-----------|-------------------|
| 4.1 | Ventana de contexto | Un pizarrón que se borra | A las 15:00 el chat ya no recuerda lo decidido a las 9:00 |
| 4.2 | AGENTS.md | Las instrucciones del bot, en el repo | Cualquier chat nuevo arranca sabiendo |
| 4.3 | Spec de 1 página | El guion de demo como contrato | Contraste de 10 seg con la cadena empresa |
| 4.4 | Skills | Recetas que se cargan solas | No repetís el mismo prompt 20 veces |
| 4.5 | MCP | El USB de las herramientas | El agente toca Supabase directo |
| 4.6 | Engram | Memoria entre chats | Las decisiones sobreviven al chat |
| 4.7 | Grafo de código | El mapa del repo | A la hora 8, el agente navega en vez de leer todo |

### 4.1 Ventana de contexto

> El modelo tiene un límite de cuánto puede tener en la cabeza a la vez. Eso es la ventana de contexto. Piensenlo como un pizarrón que se borra: cuando se llena, lo viejo desaparece.

> Traducción para el sábado: a las 15:00, el chat ya no se acuerda de lo que decidieron a las 9:00. Si no está escrito en el repo, no existe.

🎬 "El chat se olvida. El repo no."

### 4.2 AGENTS.md

> AGENTS.md es un archivo en la raíz del repo con las instrucciones para cualquier agente: qué es el proyecto, cómo se trabaja, qué no se toca, cómo se verifica. Es lo mismo que las instrucciones del bot, pero vive en el repo.

> Cualquier chat nuevo, cualquier compañero nuevo, cualquier agente nuevo arranca leyéndolo. Por eso es lo primero del sábado.

### 4.3 Spec de 1 página

> Una spec de una página es el guion de la demo escrito como contrato: qué se tiene que ver en los 3 minutos, qué queda afuera.

**Contraste de 10 segundos (NovaBank):**

> En una empresa como NovaBank la cadena es: PRD, tickets, spec, PR, review. Cinco pasos con cinco personas. En una hack es una página, escrita en diez minutos, que dice qué se ve en la demo. Mismo principio, versión hack.

### 4.4 Skills

> Una skill es una receta que el agente carga solo cuando la tarea matchea. En vez de pegar el mismo prompt veinte veces, la receta se carga sola.

### 4.5 MCP

> MCP es el USB de las herramientas. Un estándar para enchufarle herramientas al agente. Con el MCP de Supabase, el agente toca la base directo en vez de que vos copies y pegues SQL.

### 4.6 Engram — cómo funciona

> Engram es la memoria entre chats. El agente guarda decisiones, bugs y descubrimientos, y en un chat nuevo las busca. No es magia: es un almacén de notas al que el agente escribe y lee por MCP.

> Ojo: acá explico *cómo funciona*. Cómo se instala lo vemos en la demo. Son dos cosas distintas.

🎬 "Las decisiones sobreviven al chat."

### 4.7 Grafo de código

> El grafo es el mapa del repo: qué funciones existen, quién llama a quién. Sin mapa, el agente lee archivo por archivo. Con mapa, navega.

> A la hora 8, con el repo ya grande, la diferencia es entre que el agente tarde un minuto o que se pierda.

**Transición:** "Ahora lo veo funcionar sobre un repo real, y no es mío por casualidad: es un proyecto humanitario, Somos Huella."

**Si falta tiempo, cortá:** 4.4 (skills) y 4.5 (MCP; se ve igual en la demo con Supabase). Mínimo: 4.1, 4.2, 4.6 y 4.7. Los conceptos 4.2, 4.6 y 4.7 son los que la demo necesita.

---

## 0:45 – 1:00 | Bloque 5 — Demo: Gentle AI + grafo + SDD sobre Somos Huella (15 min)

**Ancla:** Supabase pgvector como feature.
**Detalle de comandos y plan B:** [`instructor-demos/hackathon-somos-huella-runbook.md`](../instructor-demos/hackathon-somos-huella-runbook.md)

**Dos repos:** Repo 1 (pre-hecho, la corrida completa del ensayo) y Repo 2 (clon limpio en vivo). El Repo 1 es el salvavidas.

**Cuidado en pantalla:** no abrir `frontend/.env.local` con el proyector. Para la búsqueda, usar `/ejemplos` (datos de prueba).

| Min | Qué | Notas |
|-----|-----|-------|
| 0:45 – 0:47 | 5.1 Instalar Gentle AI (Engram + SDD) | Instalar ≠ cómo funciona |
| 0:47 – 0:49 | 5.2 Ingestar el repo en el grafo y mostrar el mapa | |
| 0:49 – 0:53 | 5.3 SDD con la sala: proposal | La sala opina: "¿qué queda afuera?" |
| 0:53 – 0:58 | 5.4 Supabase / Select 26 (~5 min) | Mientras el agente corre las fases siguientes |
| 0:58 – 1:00 | 5.5 Chat nuevo: Engram recuerda | |

### 5.1 Instalar Gentle AI (2 min)

> Gentle AI es lo que le instala al agente la memoria (Engram) y el flujo de trabajo (SDD). Les muestro cómo se instala.

Mostrar el comando y el chequeo de salud (ver runbook). **No esperar a que termine una instalación completa:** usar la vista previa y el chequeo.

> Cómo funciona ya lo vimos hace un rato. Esto es solo instalar.

### 5.2 Ingestar el repo en el grafo (2 min)

> Repo limpio, recién clonado desde GitHub. Primero le armo el mapa.

Pedirle al agente que indexe el repo en el grafo y mostrar la arquitectura que devuelve.

> Este es el mapa. Fíjense que el agente ahora sabe que hay un `core`, un `indexer`, una `api` y un `frontend`, sin haber leído todo.

### 5.3 SDD con la sala (4 min)

> Ahora le voy a pedir una feature real. Es un proyecto humanitario: familias que buscan a un ser querido. La feature: **"Supabase pgvector como índice alternativo de búsqueda, sin migrar datos."**

Lanzar el flujo SDD (`/sdd-new`). Cuando salga la proposal:

> Acá está la proposal. Esta es la parte donde ustedes opinan: **¿qué queda afuera?** Lo que no se ve en el demo, ¿qué le sacamos?

Tomar 2 o 3 respuestas de la sala y pedirle al agente que las incorpore al scope.

🎬 "¿Qué queda afuera? La spec es lo que NO hacés."

**Regla de espera:**

- Si el agente responde a tiempo: se espera y se comenta lo que aparece.
- Si falla o tarda: se pasa al Repo 1. **Frase:** "esto salió ayer con el mismo comando". Abrir el Repo 1 en el mismo punto del flujo.

### 5.4 Supabase / Select 26 (5 min)

Entra **solo dentro de la demo**, mientras el agente trabaja y como parte del contexto de la feature. Máximo 2 o 3 anuncios, los que le sirven a un hacker.

> Mientras el agente trabaja, algo de lo que Supabase anunció en Select que les sirve el sábado.

<!-- VERIFICAR contra el blog oficial de Supabase (la única fuente encontrada es un recap de daily.dev). No decir ningún anuncio en vivo hasta confirmarlo. -->

Candidatos (confirmar antes de incluirlos en el deck):

| Anuncio | Por qué le sirve a un hacker | Estado |
|---------|------------------------------|--------|
| Desarrollo local sin Docker | Menos setup, menos que falle a las 9:30 | VERIFICAR |
| Confirmación del MCP antes de acciones destructivas | El agente no borra tu base en la hora 8 | VERIFICAR |
| Apps que exponen su propio MCP | Tu app se vuelve herramienta de otros agentes | VERIFICAR |

🎬 "El agente no puede borrarte la base sin pedirte permiso." <!-- VERIFICAR: usar solo si la confirmación del MCP se confirma contra el blog oficial. -->

### 5.5 Chat nuevo: Engram recuerda (2 min)

> Cierro este chat y abro uno nuevo, sin nada de contexto.

Preguntar: qué decidimos sobre el índice alternativo y qué quedó afuera. El agente debería recuperar la decisión de Engram.

> No le expliqué nada. Lo recordó. Esa es la diferencia entre un chat y un entorno.

🎬 "No le expliqué nada. Lo recordó."

**Transición:** "Ya tienen la idea, el mapa y la spec. Falta lo que decide la hackathon: contarlo."

**Si falta tiempo, cortá:** 5.1 (instalar; mostrar solo el chequeo), 5.4 completo (Select), y de 5.3 las respuestas de la sala. Mínimo: 5.2 + proposal + Engram recuerda. Siempre pasar al Repo 1 antes que dejar la sala mirando una pantalla sin avance.

---

## 1:00 – 1:10 | Bloque 6 — Pitch (10 min)

**Ancla:** callback del arco.

### 6.1 Las 5 partes (4 min)

> Pitch de 3 minutos, cinco partes. Fíjense que no hay slides en el medio.

| Parte | Qué | Regla |
|-------|-----|-------|
| Problema | Que duela, con una persona concreta | ~20 seg |
| Solución | La demo, no slides | El wow elegido en el triage |
| Por qué nosotros | Este equipo, este problema | Una línea por persona, máximo |
| Impacto futuro | Hacia dónde va | Abby Care: el mes 6 que no cabía en la hora 3 |
| CTA | Qué piden | Una sola cosa |

> Problema: una persona concreta, no "mucha gente". Solución: la demo, el wow que elegiste en el triage. Por qué nosotros: una línea por persona. Impacto: acá va el mes 6, la certificación de Abby Care que no cabía en la hora 3. Y CTA: **una sola cosa**.

🎬 "El impacto futuro es el mes 6 que no cabía en la hora 3."

### 6.2 Quién pitchea (3 min)

> Quién pitchea es una decisión de liderazgo. Hay distintos estilos: el mejor orador, quien más lo necesita, o una o dos personas. No más.

> Yo cedí el pitch muchas veces para que otros se animaran. No todo es ganar esa hack.

🎬 "Quién pitchea es una decisión de liderazgo."

### 6.3 Practicar (2 min)

> Practíquenlo tres veces antes de las 18:00. En voz alta, con cronómetro.

### 6.4 Callback del arco (1 min)

> Y acá cierra lo que dije al principio: en mi primera hack no hablé. Le dejé el pitch a un profe. Si tengo que elegir una sola cosa para que se lleven hoy, es esta: **la próxima vez, hablen**.

**Transición:** "Cierro con lo concreto: qué se puede hacer antes del sábado y qué no."

**Si falta tiempo, cortá:** 6.3 (practicar; decirlo en una frase en el cierre) y 6.2 reducido a una frase. Mínimo: tabla de las 5 partes + callback.

---

## 1:10 – 1:15 | Bloque 7 — Cierre (5 min)

**Ancla:** "9:05, primer commit: AGENTS.md."

### 7.1 Entorno sí / repo no (2 min)

Mostrar la tabla.

| Antes del sábado (permitido) | Desde las 9:00 (cero) |
|------------------------------|-----------------------|
| **Entorno:** cuentas (Supabase, Grok Bot, Cursor), créditos, MCP, Gentle AI / Engram, skills globales | **El repo:** AGENTS.md, spec, código |
| **Cabeza:** filtro de ideas, plantilla de pitch, esqueleto de AGENTS.md de memoria | Todo lo específico del proyecto |

> En HackaTwin no se permite traer nada armado del proyecto. La línea es clara: preparás el entorno y la cabeza, pero no el repo. Hasta las 9:00 el repo no existe.

<!-- PENDIENTE: confirmar con Cande que el entorno personal cuenta como tooling permitido. Hasta confirmar, decir "preguntenle a los organizadores" en lugar de afirmarlo. -->

### 7.2 QR (1 min)

> El QR tiene el checklist de la semana: instalar Gentle AI, probar Engram y SDD en cualquier repo, crear las cuentas, conocer a su equipo. Y el template del Grok Bot.

### 7.3 El primer commit (1 min)

> El sábado, 9:05, primer commit: AGENTS.md. Antes de escribir una línea de código.

🎬 "9:05, primer commit: AGENTS.md."

### 7.4 Cierre del arco (1 min)

> Hoy pitcheo a sponsors en ETHGlobal, streameo en Builders Off The Record y estoy acá. Ustedes empiezan el sábado.

🎬 "Ustedes empiezan el sábado."

**Pantalla final:** chivo NEXA + QR.

**Si falta tiempo, cortá:** 7.2 (el QR queda en pantalla; no se lee). Nunca cortar 7.3 ni 7.4.

---

## 1:15 – 1:20 | Preguntas (5 min)

Si no hay preguntas: "¿Qué idea de hack les gustaría pasar por el filtro de 5?" y correr una en vivo con el bot.

---

## Recorte 45–60 (Cande)

Misma estructura, achicando el técnico y la demo. **No cortar** apertura, mentalidad ni cierre: son lo que se queda en la cabeza. El recorte de la demo la deja como "mostrar el resultado", no como "mostrar el proceso".

### Versión 60 min (53 de contenido + 7 de preguntas)

| Bloque | Maestra | 60 | Qué se achica |
|--------|---------|----|---------------|
| 0. Apertura | 3 | 2 | Sin pregunta a la sala |
| 1. Mentalidad | 10 | 8 | Sin 1.3 (premio) ni tip de timebox |
| 2. Elegir y triage | 12 | 10 | Sin brainstorm (2.1) |
| 3. Grok Bot | 5 | 3 | Sin en vivo: tabla + QR |
| 4. Técnico | 15 | 10 | Solo 4.1, 4.2, 4.3, 4.6, 4.7 |
| 5. Demo | 15 | 10 | Sin instalar, sin Select. Grafo + proposal + Engram, con el Repo 1 como respaldo |
| 6. Pitch | 10 | 7 | Sin "practicar" ni "quién pitchea" |
| 7. Cierre | 5 | 3 | Sin QR hablado |
| **Total** | **75** | **53** | + 7 de preguntas |

### Versión 45 min (40 de contenido + 5 de preguntas)

| Bloque | Maestra | 45 | Qué se achica |
|--------|---------|----|---------------|
| 0. Apertura | 3 | 2 | Frase de apertura y nada más |
| 1. Mentalidad | 10 | 6 | Solo 1.1, 1.2, Abby Care, 1.7 |
| 2. Elegir y triage | 12 | 8 | Filtro de 5 + triage; el bot, en una frase |
| 3. Grok Bot | 5 | 0 | Se funde en el bloque 2 (1 min, dentro de los 8) |
| 4. Técnico | 15 | 7 | Solo 4.1, 4.2, 4.6, 4.7 |
| 5. Demo | 15 | 8 | Solo Repo 1: grafo + Engram recuerda. Sin instalar, sin Select, sin SDD en vivo |
| 6. Pitch | 10 | 6 | Tabla de 5 partes + callback |
| 7. Cierre | 5 | 3 | Tabla, 9:05, cierre del arco |
| **Total** | **75** | **40** | + 5 de preguntas |

**Reglas del recorte (para ambas versiones):**

- La regla de HackaTwin (entorno sí / repo no) se dice **siempre**: es el motivo por el que la charla existe.
- Si el organizador tiene los criterios del jurado, entran en el bloque 1 aun en la versión corta.
- Los clips marcados `🎬` se mantienen aunque se corte el resto del bloque.
