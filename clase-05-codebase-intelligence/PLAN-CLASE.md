# Encuentro 5 · Codebase Intelligence & Harness Engineering

**Duración:** 1 h 30 · **Formato:** clase virtual (participación por chat, micrófono y salas breakout) · **Audiencia:** desarrolladores de banco (sistemas reales, legacy, compliance, datos sensibles, herramientas corporativas limitadas) · **Stack permitido:** GitHub Copilot (Copilot-first).

> **Tesis de la clase:** No se trata solo de pedirle cosas a la IA. Se trata de construir un entorno donde la IA tenga el **contexto correcto**, las **restricciones correctas** y un **flujo de validación correcto**.

Esta clase continúa la serie. Calca estructura, tono, ritmo y formato del deck de referencia (`_ref-smart-prompts`). El deck en código está en `deck-clase-05.tsx` (mismo formato que `deck-clase-04.tsx`) y la ruta en `harness-05.route.tsx`.

---

## 1. Estructura completa de la clase (1 h 30)

La clase está pensada como una escalera: **recap → problema → cómo entiende la IA una codebase → técnicas de contexto (RAG, memoria, grafo) → harness como integrador → flujos aterrizados → límites → cierre**. Cada bloque conceptual cierra con una frase fuerte (slide ember) antes de bajar a lo práctico.

| # | Bloque | Idea central |
|---|--------|--------------|
| 0 | Portada + recap | Anclar lo anterior y abrir el tema |
| 1 | El problema real | La IA falla cuando no entiende el sistema |
| 2 | Cómo entiende una codebase | Niveles de contexto y sus límites |
| 3 | RAG aplicado a desarrollo | Recuperar antes de generar |
| 4 | Memoria de proyecto (CAG) | Lo estable no se busca cada vez |
| 5 | Codebase como grafo | Relaciones, no solo similitud |
| 6 | Harness engineering | El integrador: contexto + reglas + validación + límites |
| 7 | Flujos concretos | Legacy, regla de negocio, tests, refactor |
| 8 | Qué sí / qué no | Disciplina en entorno regulado |
| 9 | Loops y agentes (opcional) | Tendencia, no recomendación de prod |
| 10 | Actividad | Armar un mini-harness real |
| 11 | Cierre | Mejor contexto, límites y proceso |

---

## 2. Distribución de tiempos por bloque

Total ≈ 90 min, con ~3 min de colchón.

| Bloque | Tiempo | Acumulado |
|--------|-------:|----------:|
| Portada + recap de lo anterior | 6 min | 6 |
| El problema real | 8 min | 14 |
| Cómo entiende una codebase (niveles de contexto) | 12 min | 26 |
| RAG aplicado a desarrollo | 12 min | 38 |
| Memoria de proyecto (CAG) | 8 min | 46 |
| Codebase como grafo | 12 min | 58 |
| Harness engineering | 12 min | 70 |
| Flujos concretos para devs del banco | 8 min | 78 |
| Qué sí y qué no | 4 min | 82 |
| Loops y agentes (opcional) | 5 min | 87 |
| Actividad (puede solaparse / cerrar) | incluida arriba si hay tiempo, o 12–15 min como bloque | n/a |
| Cierre | 3 min | 90 |

> **Nota de ritmo:** la actividad (15 min) es el bloque más comprimible/expandible. En una clase de 90 min ajustada, conviene recortar "Loops y agentes" y reservar 12–15 min para la actividad. Ver sección 11 (recortes).

---

## 3. Secuencia sugerida de slides

26 slides. Patrón de referencia: slides "statement" (fondo ember, una frase grande) intercalados con slides de grid/contenido.

1. Portada
2. Lo que ya saben (recap)
3. **[ember]** Tesis: saber pedir no alcanza
4. El problema real
5. **[ember]** El riesgo no es que se equivoque, es que parezca correcto
6. Autocomplete vs asistente contextualizado
7. Cómo entiende una codebase (niveles de contexto)
8. RAG sin humo (R-A-G)
9. RAG ejemplo banco (regla de transferencias)
10. Qué indexar y qué no
11. **[ember]** RAG mejora el contexto, no garantiza la verdad
12. Memoria de proyecto (CAG): RAG vs CAG vs skills vs specs
13. Qué vive en la memoria estable
14. La codebase como grafo (nodos / aristas)
15. **[panel]** Pregunta que solo el grafo responde (impacto)
16. Grafo: pros y contras
17. **[ember]** Harness engineering: definición
18. Qué compone un harness
19. Mini-harness manual con Copilot
20. Flujos concretos (A legacy / B regla de negocio)
21. Flujos concretos (C tests / D refactor)
22. Qué sí y qué no
23. **[panel]** Loops y agentes (opcional / recortable)
24. Actividad
25. **[ember]** Cierre: el salto no es una IA más potente
26. Para llevarse (recap encadenado)

---

## 4–6. Slides: título, bullets y speaker notes

> Para cada slide: **Título** → bullets visibles en pantalla → *speaker notes* (lo que decís).

### Slide 1 · Portada
- Encuentro 5 · ~1h30
- "Que la IA entienda tu codebase"
- Codebase intelligence y harness engineering: contexto, restricciones y validación
- *Notes:* Abrir con la promesa concreta: hoy no hablamos de pedir mejor, hablamos de construir el entorno para que la IA entienda el sistema real del banco. Copilot-first. 30 segundos, no más.

### Slide 2 · Lo que ya saben (recap)
- Prompting · Context engineering · Skills · MCP · Spec-Driven Dev · Copilot con control
- "Todo eso es **cómo pedir**. Hoy: **cómo hacer que entienda**."
- *Notes:* 5 min. Recap rápido encadenando las clases anteriores. Prompting = pedir bien. Context engineering = qué entra a la ventana. Skills = procesos reutilizables. MCP = conectar a herramientas/datos. SDD = intención explícita. Cerrar: todo eso preparó el terreno; hoy damos el paso a codebase intelligence + harness. No reexplicar cada tema, solo anclar.

### Slide 3 · [ember] Tesis
- "Saber pedir no alcanza. La IA tiene que entender el sistema."
- *Notes:* Pausa 3 segundos en silencio. Es la frase que tiene que quedar. Conecta el recap con el problema.

### Slide 4 · El problema real
- Una codebase de banco no es solo código
- Reglas de negocio · Permisos y roles · Flujos e integraciones · Documentación interna · Decisiones históricas · Deuda técnica
- "La IA falla cuando no entiende todo eso."
- *Notes:* 8 min. Invitar participación por chat o micrófono: "¿cuántas reglas de negocio críticas viven solo en la cabeza de alguien?". El punto: la codebase es un sistema socio-técnico. La IA ve archivos, no ve el porqué. Por eso propone cambios que compilan pero violan una regla.

### Slide 5 · [ember] Plausible pero incorrecto
- "El riesgo no es que se equivoque. Es que parezca correcto."
- *Notes:* El error obvio lo atrapás. El cambio plausible que ignora la excepción regulatoria pasa el review distraído y llega lejos. Ese es el caro en un banco. Punchline.

### Slide 6 · Autocomplete vs asistente contextualizado
- Autocomplete: completa la línea, no conoce flujo ni impacto → acelera tipeo
- Asistente contextualizado: entiende el sistema, restricciones y validación → acelera decisiones
- *Notes:* Diferenciar las dos formas de usar IA. La mayoría usa la primera. El resto de la clase es cómo pasar a la segunda sin salir de Copilot.

### Slide 7 · Cómo entiende una codebase (niveles de contexto)
- Archivos sueltos → solo lo que pegás, cero relaciones
- Búsqueda textual → encuentra strings, no significado
- Embeddings → similitud semántica, no estructura
- RAG → recupera contexto relevante bajo demanda
- Árbol de dependencias → quién importa a quién
- Símbolos / imports / llamadas → definiciones, usos, ownership
- Grafo de código → relaciones estructurales reales
- Docs + decisiones (ADRs) → el porqué, no solo el qué
- *Notes:* 12 min, el corazón conceptual. Recorrer la escalera. Para CADA nivel decir qué aporta y qué NO. Clave: no vender embeddings como bala de plata: encuentran "parecido", no "relacionado". Aterrizar: Copilot ya combina varios de estos (búsqueda, símbolos, archivos abiertos); entender los niveles te ayuda a darle el contexto que le falta.

### Slide 8 · RAG sin humo (R-A-G)
- Retrieval: buscar el contexto relevante (docs, tests, modelos, código vecino)
- Augmentation: inyectarlo en el prompt antes de generar
- Generation: la IA responde con ese contexto a la vista
- "No generar a ciegas. Primero recuperar, después responder."
- *Notes:* 10 min con el ejemplo. Desmitificar: RAG no es magia ni un producto, es un patrón. En Copilot lo hacés "a mano" cuando adjuntás los archivos correctos antes de pedir. La idea conceptual de un RAG automatizado es solo escalar ese gesto.

### Slide 9 · RAG ejemplo banco (regla de transferencias)
- Tarea: modificar la validación de transferencias > 1M
- Recuperar primero: doc de negocio del límite y excepciones · endpoints que llaman al validador · tests existentes · modelo de datos · validadores previos · convenciones internas
- "Sin ese contexto, la IA propone algo plausible que ignora la excepción regulatoria."
- *Notes:* Ejemplo central, el más cercano. Preguntar: "¿qué pasa si no le damos la doc de la excepción para clientes institucionales?". Respuesta: código limpio, test verde, regla violada.

### Slide 10 · Qué indexar y qué no
- SÍ: docs de negocio/arquitectura, contratos API/OpenAPI, tests como ejemplos vivos, convenciones y ADRs
- NO: datos reales de clientes (PII), secrets/tokens, dumps de prod, logs con datos sensibles
- CUIDADO: permisos (el índice no debe ver más que el dev), RAG no garantiza verdad, validar siempre con tests + review
- *Notes:* Crítico para banco. El "NO" no es opcional: es compliance. El problema de permisos es sutil: si el índice tiene más acceso que quien pregunta, creaste una fuga. Mencionar que un índice/embedding de código sensible es un activo a proteger como el código mismo.

### Slide 11 · [ember] RAG no es verdad
- "RAG mejora el contexto. No garantiza la verdad."
- *Notes:* Pausa. Mejor contexto = menos alucinación, no cero. Sigue necesitando tests, review y criterios explícitos. Esto conecta directo con harness.

### Slide 12 · Memoria de proyecto (CAG)
- "Hay contexto que no quiero buscar cada vez. Quiero que esté siempre disponible."
- RAG: busco contexto relevante bajo demanda
- Contexto cacheado (CAG): mantengo contexto estable presente
- Skills / reglas del proyecto: instrucciones reutilizables
- Specs: intención explícita de este cambio
- *Notes:* 8 min. No academizar. CAG = lo estable lo tengo siempre cargado (ej. `copilot-instructions.md`, reglas del repo). Diferencia operativa con RAG: frecuencia y estabilidad. Las 4 cosas se complementan, no compiten.

### Slide 13 · Qué vive en la memoria estable
- Convenciones de logging · estándar de manejo de errores · reglas de seguridad · estructura de carpetas · cómo se escriben los tests · módulos que no se tocan sin review
- "Estable → memoria. Variable → RAG. Específico de este cambio → spec."
- *Notes:* Aterrizar con su repo. Esto es exactamente lo que ya pusieron en archivos en clases anteriores (skills, AGENTS/copilot-instructions). La memoria estable ES el harness persistente.

### Slide 14 · La codebase como grafo
- Nodos: archivos, clases, funciones, servicios, endpoints, tablas, jobs, eventos
- Aristas: importa, llama, depende de, escribe en, lee de, testea, expone
- "Embeddings encuentran similitud. El grafo encuentra relaciones."
- *Notes:* 12 min. La idea más potente del bloque. En código la relación importa tanto como el significado. Un embedding te trae funciones "parecidas"; el grafo te trae las que realmente se tocan.

### Slide 15 · [panel] Pregunta que solo el grafo responde
- Si modifico la validación de clientes corporativos: ¿qué endpoints la usan? ¿qué jobs dependen? ¿qué tests cubren? ¿qué módulos podrían romperse?
- "Esto es trazabilidad de impacto, no búsqueda por similitud."
- *Notes:* El "para qué" del grafo. En un banco, saber el blast radius de un cambio antes de hacerlo es oro. Conectar con análisis de impacto de cambios regulatorios.

### Slide 16 · Grafo: pros y contras
- Pros: trazabilidad de impacto, mejor navegación, mejor contexto para la IA, relaciones explícitas
- Contras: mantenimiento y costo, complejidad, riesgo de grafo desactualizado, falsa sensación de precisión
- Conceptos/herramientas: Graphify, indexadores de símbolos, LSP, opciones open source (como **patrón**, no como demo)
- *Notes:* Honestidad: un grafo desactualizado es peor que no tener grafo, porque da falsa confianza. Mencionar herramientas como conceptos arquitectónicos; NO "instalen esto mañana en prod". El LSP que ya usa el IDE es un mini-grafo gratis.

### Slide 17 · [ember] Harness engineering: definición
- "El conjunto de contexto, reglas, herramientas, validaciones y límites que rodean a la IA para que produzca cambios útiles y verificables."
- *Notes:* 12 min, el integrador. Todo lo anterior (RAG, memoria, grafo) son piezas de contexto. El harness es lo que las ordena + agrega validación y límites. Es el salto de madurez.

### Slide 18 · Qué compone un harness
- Specs claras · contexto correcto · reglas del proyecto · tests · linters · CI/CD · validación de seguridad · review humano · checklists · ambientes de prueba · logs y trazabilidad · límites explícitos
- "No es magia. No es un agente tocando producción solo. Es control."
- *Notes:* Recorrer rápido. La mayoría YA tienen estas piezas (tests, CI, review); el harness es usarlas deliberadamente alrededor de la IA, no como pasos sueltos.

### Slide 19 · Mini-harness manual con Copilot
- 1. Spec clara · 2. Archivos relevantes · 3. Plan antes de código · 4. Riesgos y supuestos · 5. Tests · 6. Validar contra reglas internas · 7. Review humano · 8. Iterar con errores concretos
- *Notes:* El entregable práctico de la clase. "Aunque solo tengan Copilot, hoy pueden hacer esto sin instalar nada." Demostrarlo en vivo si hay tiempo con un caso chico. Este es el flujo que quiero que se lleven.

### Slide 20 · Flujos concretos (A y B)
- A · Entender legacy: identificar archivos → resumen → diagrama textual → puntos de riesgo → tests faltantes → validar con código real
- B · Cambiar regla de negocio: spec → recuperar contexto → identificar impacto → proponer cambios → generar tests → revisar seguridad y edge cases
- *Notes:* 8 min los dos slides de flujos. Anclar A en un módulo legacy real que todos conocen. B reusa el ejemplo de transferencias.

### Slide 21 · Flujos concretos (C y D)
- C · Tests sobre código existente: matriz de casos → ramas no cubiertas → generar → ejecutar → corregir con errores reales
- D · Refactor seguro: definir objetivo → congelar comportamiento (tests antes) → cambios pequeños → validación incremental → rollback mental
- *Notes:* C: la IA es excelente generando matriz de casos; el dev valida. D: el orden importa: tests ANTES de refactorizar congelan el comportamiento esperado. "Rollback mental" = saber cómo volver atrás antes de empezar.

### Slide 22 · Qué sí y qué no
- SÍ: entender código, plan antes de implementar, pedir riesgos/supuestos, specs + tests como contrato, contexto seleccionado, documentar decisiones
- NO: pegar datos sensibles, confiar sin validar, cambios enormes de una vez, aceptar código que no entendés, saltarse permisos/compliance/review, confundir "parece" con "está" correcto
- *Notes:* 4 min. Leer el "NO" con énfasis. Es la diapositiva que más le importa a seguridad/compliance. El último punto resume toda la clase.

### Slide 23 · [panel] Loops y agentes (opcional)
- Loop: iteración controlada (planear → ejecutar → observar → corregir)
- Agente: modelo + herramientas + límites + feedback
- "Sin harness, un agente es solo una forma más rápida de equivocarse con confianza."
- *Notes:* 5 min, RECORTABLE. Presentar como tendencia, no como recomendación para prod bancaria. No sobreactuar. El mensaje: el harness es prerequisito del agente, no al revés.

### Slide 24 · Actividad
- En salas breakout (3-4 personas), para un cambio real: cambio (1 oración) · spec · contexto a recuperar · impacto (qué se rompe) · qué NO compartir · cómo se valida · qué se registra para auditoría
- *Notes:* 15 min. Ver sección 8. Abrir salas breakout; al volver, 1-2 equipos comparten en pantalla o por chat. El objetivo es que salgan con un mini-harness escrito de un caso suyo.

### Slide 25 · [ember] Cierre
- "El salto no es una IA más potente. Es mejor contexto, límites y proceso."
- *Notes:* Frase de cierre. Pausa.

### Slide 26 · Para llevarse (recap encadenado)
- Prompting → la base
- Context engineering → el puente
- RAG / grafos / memoria → mejor contexto
- Harness engineering → flujo confiable
- En entornos regulados → velocidad con trazabilidad
- *Notes:* Recap encadenado. Pregunta final por chat o micrófono: "¿qué pieza de harness ponen mañana en su repo?". Dejar que respondan 2-3 personas.

---

## 7. Ejemplos cercanos a devs de banco (banco de ejemplos reutilizables)

Usalos a lo largo de la clase para mantener todo aterrizado:

- **Validación de transferencias > umbral:** la regla "viva" tiene excepciones regulatorias (clientes institucionales, operaciones intra-banco) que no están en el código sino en una norma. La IA sin esa doc propone un cambio limpio que viola la norma.
- **Cálculo de comisiones / fees:** lógica dispersa en varios servicios + jobs batch nocturnos. Cambiar un parámetro impacta reporting regulatorio. Ejemplo perfecto para el grafo (¿qué jobs leen esto?).
- **KYC / onboarding:** flujo con integraciones externas (buró, scoring, listas de sanciones). Mostrar por qué pegar un payload real = fuga de PII.
- **Estado de cuenta / liquidación:** módulo legacy clásico, sin tests, que nadie quiere tocar. Flujo A (entender legacy) y D (refactor seguro).
- **Autorización por roles (perfiles de operador):** ejemplo de "módulo que no se toca sin review" en la memoria estable.
- **Conciliación contable:** job que escribe en tablas críticas; ejemplo de arista "escribe en" del grafo y de blast radius.

---

## 8. Mini actividad / dinámica

**"Armá el harness antes de tocar código" · 15 min, en salas breakout de 3-4 personas.**

Cada grupo elige un cambio real de su sistema (o uno de la lista de ejemplos) y completa una ficha:

1. **Cambio** en una oración.
2. **Spec:** qué se busca y por qué (criterio de éxito explícito).
3. **Contexto a recuperar:** qué docs, tests, modelos y código vecino le darían a la IA (simula el "retrieval").
4. **Impacto:** qué podría romperse (endpoints, jobs, tests), pensar como grafo.
5. **Qué NO compartir** con la IA (PII, secrets, dumps).
6. **Validación:** qué tests, qué review, qué criterios de aceptación.
7. **Auditoría:** qué se registra para trazabilidad.

**Cierre (3 min):** 1-2 grupos comparten en pantalla o leen en voz alta. Pregunta guía: *"¿en qué paso la IA tenía más probabilidad de proponer algo plausible pero incorrecto, y qué pieza del harness lo atrapa?"*

**Variante si hay poco tiempo (5 min):** hacerlo en vivo con un solo caso: el grupo propone ítems por chat y el instructor completa la ficha en pantalla.

---

## 9. Errores comunes (mostrar y desarmar)

- **Confundir "compila / test verde" con "correcto".** En banco lo correcto incluye la regla de negocio y la norma, no solo el verde.
- **Darle a la IA un mega-prompt en vez del contexto correcto.** Más texto ≠ más contexto útil. Curar > acumular.
- **Indexar todo "por las dudas".** Indexar PII, secrets o dumps de prod es un incidente de seguridad, no una optimización.
- **Creer que RAG = verdad.** RAG reduce alucinación, no la elimina. Sigue necesitando validación.
- **Confiar en un grafo/índice desactualizado.** Da falsa precisión; peor que no tenerlo.
- **Pedir cambios enormes de una sola vez.** Imposible de revisar, imposible de auditar, imposible de hacer rollback con criterio.
- **Aceptar código que no entendés** porque "parece andar". Si no lo podés explicar en el review, no es tuyo todavía.
- **Saltarse permisos/compliance** porque "es solo para probar". En entorno regulado no hay "solo para probar" con datos reales.
- **Tratar al agente como autónomo sin harness.** Es velocidad sin control = más rápido para romper.

---

## 10. Frases fuertes (para decir en voz alta)

- "El chat se olvida; el sistema no debería depender de tu memoria."
- "Saber pedir no alcanza: la IA tiene que entender el sistema."
- "El riesgo no es que la IA se equivoque. Es que acierte en apariencia."
- "Más texto no es más contexto. Curado le gana a acumulado."
- "RAG mejora el contexto. No te firma que sea verdad."
- "Los embeddings encuentran lo parecido. El grafo encuentra lo que se rompe."
- "Un grafo desactualizado no es información: es falsa confianza."
- "Un harness no es magia. Es la diferencia entre velocidad y velocidad con control."
- "Sin harness, un agente es una forma más rápida de equivocarse con confianza."
- "En un banco, la ventaja no es ir rápido. Es ir rápido y poder demostrar cada paso."
- "Si no lo podés explicar en el review, todavía no es tu código."
- "El salto de calidad no está en una IA más potente, sino en mejor contexto, mejores límites y mejor proceso."

---

## 11. Qué recortar si el tiempo no alcanza

Orden de recorte (de primero a último):

1. **Loops y agentes (slide 23).** Es explícitamente opcional. Se puede mencionar en una frase y saltar. (−5 min)
2. **Grafo: pros y contras (slide 16).** Si se va el tiempo, dejar solo la intro del grafo + el ejemplo de impacto, y mencionar contras de palabra. (−3 min)
3. **Flujos C y D (slide 21).** Quedarse con A y B, que cubren los casos más frecuentes. (−4 min)
4. **Memoria estable ejemplos (slide 13).** Fusionar con el slide 12 de CAG. (−3 min)
5. **Recap final (slide 26).** Fusionar con el cierre ember (slide 25). (−2 min)

**Núcleo intocable** (lo que NO se recorta): problema real → niveles de contexto → RAG (qué es + qué indexar/no) → grafo (intro + impacto) → harness (definición + mini-harness Copilot) → qué sí/qué no → actividad. Eso es la columna vertebral.

---

## 12. Dos versiones del enfoque

### Versión ejecutiva (para líderes / stakeholders / comité)
- **Mensaje:** la productividad con IA en sistemas regulados no viene de usar un modelo más potente, sino de construir el **entorno** (contexto + reglas + validación + límites) alrededor de la IA.
- **Foco:** riesgo y control. El peligro no es el error visible, sino el cambio plausible que viola una norma y pasa el review.
- **Lenguaje:** harness = "marco de control y trazabilidad para el desarrollo asistido por IA". RAG/grafo/memoria = "formas de darle a la IA el contexto correcto, dentro de los límites de seguridad y compliance".
- **Promesa medible:** velocidad **con trazabilidad**: cada cambio asistido tiene spec, contexto registrado, validación y auditoría.
- **Qué pedir:** no comprar herramientas todavía; estandarizar el flujo (mini-harness) sobre lo que ya tienen (Copilot, tests, CI, review).
- **Slides clave:** 3, 5, 11, 17, 22, 25.

### Versión técnica (para devs / arquitectos)
- **Mensaje:** entendé los niveles de contexto y armá deliberadamente el harness; no dependas del autocomplete.
- **Foco:** mecánica. Cómo recuperar el contexto correcto (retrieval manual con archivos en Copilot), qué representar como grafo (símbolos/deps/LSP), qué fijar como memoria estable (`copilot-instructions.md`, skills) y qué validar (tests como contrato, ramas no cubiertas, edge cases).
- **Lenguaje:** se puede entrar en embeddings vs grafo, blast radius, ownership, ADRs, índices con control de permisos.
- **Promesa práctica:** un flujo repetible (spec → contexto → plan → riesgos → tests → review → iterar) aplicable hoy con solo Copilot.
- **Profundizar:** slides 7 (niveles), 8-10 (RAG), 14-16 (grafo), 18-21 (harness + flujos). La actividad se hace con un caso de código real.

---

## Archivos de esta carpeta

- `PLAN-CLASE.md` · este documento (los 12 entregables).
- `deck-clase-05.tsx` · el deck en el formato exacto de referencia. Copiar a `_ref-smart-prompts/src/slides/`.
- `harness-05.route.tsx` · la ruta. Copiar a `_ref-smart-prompts/src/routes/harness-05.tsx` y registrar en `index.tsx`.
