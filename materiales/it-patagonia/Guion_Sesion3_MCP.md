# Guion · Sesión 3 · Model Context Protocol

Claude Certified Architect · Foundations · IT Patagonia

Para tener abierto mientras das la clase. Cada slide tiene: **en pantalla** (lo que ya dice la slide, para no leerla), **decís** (la explicación que la slide no tiene) y **pasás con** (la frase que te lleva a la siguiente). Los minutos son orientativos.

---

## La clase en una frase

> Los agentes sin herramientas solo repiten lo que saben. MCP es el estándar para conectarles herramientas una sola vez, y lo que decide si funcionan no es el protocolo: es cómo diseñás las tools.

## Las 8 ideas que se tienen que llevar

1. **N × M → N + M.** Sin protocolo, cada agente se integra con cada herramienta. Con MCP, cada uno se escribe una vez.
2. **Host, client, server.** El host no conoce la API que hay atrás. Eso es lo que compra el protocolo.
3. **Tres primitivas, tres dueños.** Tools las elige el modelo, resources la aplicación, prompts el usuario.
4. **MCP no reemplaza a function calling:** lo vuelve portable.
5. **La descripción es el prompt de la tool.** El modelo solo ve nombre, descripción y schema.
6. **Granularidad de acción de negocio.** Ni doce llamadas atómicas ni un `hacer_todo`.
7. **Las tools primero, el transporte al final.** stdio para desarrollo, HTTP para producción.
8. **Lo que sale del modelo es input de usuario.** Se valida, y las acciones destructivas llevan confirmación.

## Tiempos

| Bloque | Slides | Tiempo |
|--------|--------|--------|
| Apertura | 1–3 | 5 min |
| 1 · Qué es MCP y por qué existe | 4–13 | 30 min |
| 2 · Diseñar un servidor | 14–21 | 35 min |
| 3 · Ruta a producción + demos | 22–28 | 30 min |
| Cierre · ejercicio y arquitectura | 29–35 | 25 min |
| **Total** | | **~2 h 05** |

Va justo. Si necesitás aire, en este orden se acortan sin perder el hilo: **25** (n8n), **23** (hosting), **20** (versionado), **12** (ecosistema). Las que no se tocan: 6, 8, 9, 14, 15, 24, 26 y el ejercicio.

---

## Apertura

### 1 · Portada (1 min)
**Decís:** "Hoy es la sesión más técnica del curso. En la 2 armamos agentes que se reparten el trabajo. Hoy les damos manos."

### 2 · Quién soy (1–2 min)
**Decís:** Rápido. Lo que conecta con la clase: capacitás equipos que están adoptando IA en serio, y el primer muro que chocan es siempre el mismo, conectar el modelo con sus sistemas. Eso es MCP.
**Pasás con:** "Veamos cómo se reparte la tarde."

### 3 · Agenda (2 min)
**Decís:** Cuatro bloques. Primero por qué existe y cómo está armado. Después lo más importante, que es diseñar bien un servidor. Después llevarlo a producción, con demo. Y al final un ejercicio donde diseñan uno ustedes.
Avisá del ejercicio ahora: "a la hora y media les toca a ustedes, así que vayan pensando un sistema de su laburo".

---

## Bloque 1 · Qué es MCP y por qué existe (30 min)

### 4 · De dónde venimos (1–2 min)
**En pantalla:** repaso de la Sesión 2 y las dos cards: herramientas y protocolo.
**Decís:** Multi-agente, RAG agéntico y sesiones tienen algo en común: todo depende de que el agente pueda *hacer* cosas. Buscar, leer una base, llamar una API. Un agente sin tools es un chatbot con buena conversación.
**Pasás con:** "¿Y cómo se conectaban esas herramientas antes? Mal."

### 5 · El problema N × M (3 min)
**Decís:** Contalo como historia. Tenés cuatro agentes (soporte, ventas, un asistente interno, uno de datos) y seis herramientas (CRM, facturación, wiki, tickets, base, mail). Cada combinación es una integración a mano, con su auth, su formato de errores y sus bugs propios. Y el golpe: cambiás de modelo o de framework y las reescribís todas.
Preguntá a la sala: "¿Quién escribió dos veces el mismo conector para dos proyectos distintos?". Siempre se levantan manos.

### 6 · 4 × 6 = 24 contra 4 + 6 = 10 (3 min)
**Decís:** La cuenta es el argumento entero. Con un protocolo común, cada agente aprende a hablar MCP una vez y cada herramienta se envuelve una vez. Se deja de multiplicar y se empieza a sumar.
Remarcá la tercera card: lo que cambia no es solo la cantidad. La herramienta deja de ser código pegado adentro de tu app y pasa a ser una pieza con contrato propio, que sobrevive al cambio de modelo.
**Pasás con:** "Bien, ¿y qué es exactamente eso que se escribe una vez?"

### 7 · ¿Qué es MCP? (2 min)
**Decís:** Un estándar abierto para que un modelo descubra y use herramientas y datos externos. La palabra clave es *descubra*: el cliente se conecta, pregunta "¿qué tenés?" y el servidor le lista lo que ofrece. Nadie hardcodea nada.
La analogía USB-C sirve, pero no te quedes en ella: USB-C define el enchufe, no lo que hace el dispositivo. MCP igual: estandariza cómo se conecta una herramienta, no qué hace.
**Contexto útil:** lo lanzó Anthropic a fines de 2024 y desde diciembre de 2025 lo gobierna la Agentic AI Foundation, de la Linux Foundation. Lo usan clientes de muchas empresas, no es "cosa de Claude".

### 8 · Host, client, server (4 min)
**En pantalla:** el diagrama: host a la izquierda, tres servers a la derecha.
**Decís:** Tres roles, y la gente siempre confunde host con client.
- **Host:** la aplicación donde vive el modelo. Claude Desktop, Claude Code, un IDE, tu propio agente.
- **Client:** una conexión. El host abre *un client por cada server*, uno a uno. Si tenés tres servers conectados, hay tres clients.
- **Server:** el que envuelve la herramienta real (la API de GitHub, tu base de facturación) y la expone por protocolo.

La frase de la slide es la clave: el host no sabe nada de la API que hay atrás. Si mañana GitHub cambia su API, se actualiza el server y el host ni se entera.
**Si preguntan cómo hablan por dentro:** mensajes JSON-RPC. El client pide la lista (`tools/list`) y llama (`tools/call`). Detalle en "Lo que sabés aunque no esté en las slides", al final.

### 9 · Los tres primitivos (4 min)
**Decís:** Esta slide es de las que más se evalúan. Lo que distingue a cada primitivo es **quién decide usarlo**:
- **Tools → el modelo.** Lee la descripción y decide cuándo llamarla. Pueden tener efectos: crear, modificar, borrar.
- **Resources → la aplicación.** Datos para leer. El host decide cuándo meterlos en el contexto. No tienen efectos.
- **Prompts → el usuario.** Templates que el server reparte y el usuario elige, típicamente como un comando.

Remate: casi todo el mundo usa solo tools. Los prompts son el más subvalorado, y volvemos a ellos en la 17.

### 10 · Transportes (3 min)
**Decís:** Dos transportes vigentes.
- **stdio:** el host lanza al server como proceso hijo en tu máquina y hablan por entrada y salida estándar. Un solo cliente, sin auth porque se confía en lo local. Ideal para desarrollo y herramientas personales.
- **Streamable HTTP:** el server vive atrás de una URL, atiende a muchos clientes a la vez y la auth va por OAuth o tokens. Es el de producción.

Subrayá la última línea: el viejo HTTP+SSE quedó deprecado. Si un tutorial lo usa, es viejo. Esto vuelve en la 24 como error real.
**Dato actualizado para vos:** desde la spec del 28 de julio de 2026 el protocolo es *sin estado*: no hay handshake ni sesión, cada request trae todo lo que necesita. Es lo que hace que escalen atrás de un balanceador como cualquier API. El server de la Demo C ya funciona así.

### 11 · ¿Y function calling? (3 min)
**Decís:** La pregunta que siempre aparece: "si ya tengo function calling, ¿para qué MCP?". No compiten, están en capas distintas. Function calling es el *mecanismo*: el modelo dice "quiero ejecutar esta función con estos argumentos" y tu código la corre. MCP es *de dónde salen* esas funciones. Las tools de un server MCP terminan llegando al modelo como function calling.
La diferencia: con function calling a secas, las funciones viven adentro de tu app. Cambiás de cliente y las reescribís. Con MCP viven en un server que cualquier host puede usar.

### 12 · Ecosistema (2 min)
**Decís:** Del lado de los clientes: Claude Desktop, Claude Code, varios IDEs, plataformas como n8n, y los agentes que escribas vos con el SDK. Del lado de los servers: GitHub, Slack, Postgres, filesystem y miles de la comunidad. Existe un registry oficial para buscarlos.
El mensaje: **buscá antes de construir.** Es muy probable que tu integración ya exista.
Aviso de seguridad, que se retoma en la 26: que exista no quiere decir que sea confiable.

### 13 · ¿Servidor propio? (2 min)
**Decís:** La pregunta no es si podés hacerlo (en una tarde lo hacés), es si conviene. Un server propio es código que después hay que mantener, versionar, operar y asegurar.
Construí cuando el sistema es tuyo y nadie más lo conoce: tu ERP, tu base interna, tus reglas. No construyas si ya hay uno mantenido, o si es una sola app con dos funciones y con function calling alcanza.
**Pasás con:** "Supongamos que sí conviene. Ahora viene lo importante: cómo se diseña bien."

---

## Bloque 2 · Diseñar un servidor (35 min)

### 14 · Diseño de tools (5 min) ← el corazón de la clase
**En pantalla:** "así no" (`consulta` / `hace una consulta` / `data: string`) contra "así sí" (`buscar_facturas` con fechas y límite).
**Decís:** Detenete acá. Lo único que el modelo sabe de tu tool es **el nombre, la descripción y el schema de parámetros**. No ve tu código, no ve tu base, no sabe que `data` era un SQL. Con eso decide si la usa y cómo la llama.
Leé en voz alta la versión mala y preguntá: "¿qué le mando a `data`?". Nadie sabe, y el modelo tampoco. Después la buena: nombre de acción de negocio, fechas tipadas, y "devuelve máximo 20", que le dice qué esperar.
Frase para que anoten: **la descripción es el prompt de la tool.**
**Enganche:** esta es exactamente la Demo B.

### 15 · Granularidad (4 min)
**Decís:** Dos formas de equivocarse.
- **Muy atómica:** `abrir_conexion`, `seleccionar_tabla`, `filtrar`, `paginar`… El modelo encadena doce llamadas para algo simple. Cada llamada es latencia, tokens y una chance más de equivocarse.
- **Muy monolítica:** `hacer_todo` con veinte parámetros opcionales. El modelo no sabe qué combinación usar.

El tamaño correcto es **una acción de negocio**: lo que diría una persona del equipo. "Buscá las facturas de este cliente" es una tool; "abrí una conexión" no lo es.
**Regla que sirve:** si para explicar la tool tenés que explicar tu arquitectura interna, es muy atómica.

### 16 · ¿Resource o tool? (3 min)
**Decís:** Regla práctica de la slide: solo lectura y sin parámetros, probablemente resource. Búsqueda con parámetros o cualquier efecto, tool.
El matiz que importa es **quién decide**. El resource lo carga la aplicación, así que el modelo no puede ir a buscarlo si el host no lo trajo. Por eso, en la práctica, mucha gente expone también como tool algo que técnicamente es lectura: para que el modelo lo pueda pedir cuando lo necesita.
Ejemplo claro: el catálogo de productos entero es un resource; "buscar producto por SKU" es una tool.

### 17 · Prompts del servidor (4 min)
**Decís:** El primitivo olvidado. El server no solo expone acciones, también puede repartir **cómo se hace el trabajo**: el template de review de PR que usa todo el equipo, el formato de reporte de incidentes, el checklist de deploy.
El valor es el versionado: está en un solo lugar. Si cambia el criterio de review, se cambia en el server y todo el equipo lo tiene al día siguiente, en vez de que cada uno tenga su versión en un doc o en la cabeza.
En Claude Code los prompts de un server aparecen como comandos con `/`. El MCP de economía trae uno (`donde_pongo_mis_pesos`).

### 18 · Credenciales y permisos (4 min)
**Decís:** Tres reglas.
1. **El secreto vive en el servidor, nunca en el contexto del modelo.** Si la API key está en el prompt, cualquier prompt injection la puede sacar. El server guarda la llave y expone la capacidad.
2. **Permisos mínimos.** El server expone lo que vos elegiste, no toda la API de atrás. Si la API de facturación permite anular facturas, tu server no tiene por qué exponerlo. Empezá solo con lectura.
3. **Cómo se pasan:** variables de entorno en stdio; OAuth y tokens en HTTP.

### 19 · Errores típicos (5 min)
**Decís:** Los cuatro que más se repiten, y cada uno con su porqué:
- **Descripciones para humanos:** "Endpoint legacy del módulo de cobranzas v2". El modelo no sabe cuándo corresponde usarla. Escribí para quien tiene que decidir, no para quien mantiene el código.
- **Respuestas enormes:** devolver 50 KB de JSON. **La ventana de contexto no es tuya**: la comparte con la conversación, las otras tools y el system prompt. Resumí, paginá, poné límites.
- **Errores sin mensaje:** un `500` pelado hace que el modelo reintente a ciegas. Un error útil dice qué pasó y qué hacer: "No existe el cliente CLI-099. Usá buscar_cliente primero."
- **Tools que se pisan:** `buscar_cliente`, `consultar_cliente`, `obtener_cliente`, `cliente_por_id`. El modelo elige mal y es muy difícil saber por qué.

### 20 · Versionar y probar (4 min)
**Decís:**
- **Versionado:** agregar tools es gratis, porque los clientes viejos las ignoran. Cambiar la firma de una existente (renombrar un parámetro, cambiar el tipo) rompe a todos de golpe. Si cambia el comportamiento, sumá una tool nueva y deprecá la vieja con aviso.
- **Testing:** el **MCP Inspector** es la herramienta clave. Levanta tu server, te muestra lo que ve el modelo y te deja llamar tools a mano, sin modelo en el medio. Separa bugs del server de rarezas del modelo. Y un test de contrato por tool: que la entrada válida responda y la inválida se rechace con un mensaje útil.

### 21 · Caso: cálculo que tarda (5 min)
**En pantalla:** un server científico con `validar_entrada`, `encolar_calculo`, `estado_calculo` y `resultados`.
**Decís:** Caso real para ver que diseñar tools es diseñar el comportamiento del agente. El cálculo tarda veinte minutos. Si la tool se queda esperando, se corta por timeout, el agente queda colgado y el usuario sin respuesta.
Recorré las cuatro tools:
- **validar primero:** no gastes veinte minutos de cómputo para enterarte de que la entrada estaba mal.
- **encolar y devolver un ticket.**
- **consultar el estado.**
- **resultados como resumen, no el dump completo** (otra vez: la ventana no es tuya).

**Dato actualizado:** desde la spec de julio de 2026 este patrón tiene forma estándar, la extensión oficial `io.modelcontextprotocol/tasks`. Mencionalo como "hacia dónde va": el diseño de la slide sigue siendo válido con cualquier cliente.
**Pasás con:** "Ya sabemos diseñar. Ahora, ¿cómo llega esto a producción?"

---

## Bloque 3 · Ruta a producción (30 min, demo incluida)

### 22 · Camino a producción (3 min)
**Decís:** El orden importa. Recorré el diagrama de arriba a abajo: diseñás las tools, las levantás local por stdio, las probás a mano con Inspector, y **recién ahí** HTTP, auth, deploy y observabilidad.
El error típico es arrancar al revés: tres días configurando OAuth y Kubernetes para descubrir que las tools estaban mal pensadas. **El transporte y el hosting son la última decisión, no la primera.**

### 23 · Dónde hostearlo (3 min)
**Decís:** Es la decisión de siempre, control u operación, aplicada a una pregunta concreta: **qué datos pasan por el servidor.** Self-hosted: vos operás, vos parcheás, vos controlás. Administrado: arriba en minutos, menos control fino.
Si por el server pasan datos de clientes, de salud o financieros regulados, el control pesa más que la comodidad. Para un server de docs públicos, administrado y listo.

### 24 · Debugging (4 min)
**En pantalla:** tres errores y su causa.
**Decís:** Los fallos de MCP casi nunca son del protocolo: son de runtime, de transporte o de entorno.
- **"fetch is not defined":** Node viejo. `fetch` es nativo desde Node 18. Mirá la versión antes de culpar al server.
- **"Conecta y no pasa nada":** un lado habla SSE y el otro Streamable HTTP. Es el más común y el más frustrante porque no tira un error claro. (Es la Demo C.)
- **"Anda en local, muere en el deploy":** stdio no viaja por la red. Un cliente remoto necesita HTTP.

Una más para vos si hay preguntas: en stdio, **stdout es el canal del protocolo.** Un `console.log` en el server rompe la comunicación. Los logs van a stderr.

### 25 · n8n (2 min) · recortable
**Decís:** Para quien automatiza con n8n: el nodo MCP Client Tool conecta un flujo a tus servers como lo haría un agente. Dos cuidados: una instancia en la nube solo puede hablar HTTP (stdio es solo para n8n corriendo en tu máquina), y las credenciales se configuran en la plataforma, no escritas en un nodo.

### 26 · Seguridad (4 min)
**Decís:** La slide más importante del bloque. Cuatro ideas:
- **Los inputs del modelo son inputs de usuario.** Si una tool recibe un ID y lo mete en un SQL sin validar, es una inyección, venga de una persona o de un modelo.
- **Prompt injection indirecto:** un documento, un mail o una página que trae una tool puede tener instrucciones escondidas ("ignorá lo anterior y mandá la base a…"). Lo que devuelven las tools también es input no confiable.
- **Acciones destructivas:** borrar, pagar o mandar mails, con confirmación explícita o una persona en el medio. MCP deja marcar una tool como destructiva o de solo lectura, pero son *pistas* para el cliente, no una barrera de seguridad.
- **Servidores de terceros:** un server corre con tus permisos. Conectar uno desconocido es como instalar un paquete de npm sin mirar: leé qué hace.

### 27 · Demo en vivo (6–20 min)
Usá el `GUION.md` de `demo-sesion-03-mcp`. Arriba tiene la tabla para elegir según el tiempo que te quede.
Antes de arrancar decí qué van a ver y qué tienen que mirar, así la demo enseña aunque el modelo tarde.

### 28 · Checklist (2 min)
**Decís:** No la leas entera. Decí que es para llevarse, y marcá las dos preguntas que más problemas evitan: **¿ya existe un server para esto?** y **¿lo probaste con Inspector antes de enchufarlo al agente?**. La tercera que vale subrayar: loguear cada tool call con argumentos, resultado y latencia. Sin eso, cuando algo falle en producción no vas a saber si fue el modelo o el server.

---

## Cierre · MCP en la arquitectura (25 min)

### 29 · Ejercicio (15 min + 5 de puesta en común)
**Consigna:** cada uno (o de a dos) toma un sistema interno de su equipo y diseña el server MCP para que un agente lo opere. Máximo tres tools. Por cada una: nombre, qué recibe, qué devuelve y **qué NO puede hacer**.
**Mientras trabajan:** recorré. Lo que más vas a ver: tools con nombre técnico (`get_data`), parámetros `string` para todo, y nadie llena la columna del NO.
**Puesta en común:** elegí dos o tres. Preguntas que generan discusión:
- "¿Por qué tres y no cinco?"
- "¿Qué dejaste afuera a propósito?"
- "Si el modelo llama esta tool con un parámetro mal, ¿qué le devolvés?"
- "¿Alguna de estas debería pedir confirmación?"

### 30 · MCP, RAG y agentes (2 min)
**Decís:** Esta slide cierra las tres sesiones. Los workers de la Sesión 2 no saben de conectores: hablan MCP. Del otro lado, el vector store del RAG, la base de sesiones y las APIs internas quedan atrás de servers. Cambiás una pieza y el resto no se entera.

### 31 · MCP y el Agent SDK (2 min)
**Decís:** En el SDK los servers se **declaran** en la configuración del agente, mezclando locales por stdio y remotos por HTTP, y sus tools aparecen como tools del agente. Pasás de integrar herramientas a declarar de dónde vienen.
Ojo: el bloque de código es ilustrativo, para mostrar la idea. La sintaxis exacta depende del lenguaje y de la versión del SDK.

### 32 · Mitos (2 min)
**Decís:** Ida y vuelta rápido con la sala: leé el mito y que respondan antes de mostrar la respuesta. El que más vale explicar es el último: **más servers no es mejor.** Cada tool conectada ocupa lugar en la ventana y compite en la elección del modelo. Con cuarenta tools parecidas, el modelo elige peor. Conectá lo que la tarea necesita.

### 33 · Para llevarse (1 min)
**Decís:** Las cuatro cards son el resumen. Leé solo los títulos y cerrá con la idea de diseño: tools claras, del tamaño de una acción de negocio, con permisos mínimos.

### 34 · Antes de la Sesión 4 (1 min)
**Decís:** La próxima es Claude Code y prompts para producción. Tarea: conectar un server MCP a su cliente y mirar qué tools expone. Si hiciste la Demo D, esa es la tarea: que conecten el de economía esta noche.

### 35 · Cierre (30 s)
**Decís:** "El protocolo te ahorra el conector. El diseño de las tools sigue siendo trabajo tuyo."

---

## Lo que sabés aunque no esté en las slides

Para responder con soltura cuando alguien quiere ir más profundo.

- **Cómo hablan:** mensajes JSON-RPC 2.0: `tools/list` para descubrir y `tools/call` para ejecutar. Hasta la spec de noviembre de 2025, al conectarse hacían un handshake (`initialize`) para negociar versión y capacidades, y había sesión. **En la spec del 28 de julio de 2026 eso desaparece:** cada request lleva su versión, la identidad del cliente y sus capacidades en `_meta`, y se retiró el header de sesión. Cualquier instancia atrás de un balanceador puede atender cualquier request. Los SDK todavía están migrando, así que en la práctica vas a ver las dos formas.
- **Qué devuelve una tool:** contenido (texto, imágenes, recursos) y una marca de error. Las tools también pueden declarar un schema de salida y devolver datos estructurados, no solo texto.
- **Anotaciones:** una tool puede marcarse como de solo lectura, destructiva, idempotente o de mundo abierto. Son pistas para que el cliente decida si pide confirmación; **no son seguridad**.
- **Notificaciones:** un server puede avisar que cambió su lista de tools, y el cliente la vuelve a pedir sin reconectar.
- **Pedirle algo al usuario en medio de una tool (*elicitation*):** sigue, pero ahora sin conexión abierta. El server responde "me falta input" (`input_required`) con lo que necesita, y el cliente reintenta la llamada con las respuestas. Se llama MRTR (*multi round-trip requests*).
- **Deprecado en julio de 2026:** *sampling*, *roots* y *logging*, además del viejo transporte HTTP+SSE. Tienen al menos doce meses de compatibilidad. Si alguien los propone para algo nuevo, es material viejo.
- **Auth en HTTP:** OAuth 2.1. El server se comporta como un servidor de recursos que valida tokens. Nunca se pasa la credencial del usuario al modelo.
- **Tareas largas:** salieron del núcleo a una extensión oficial, `io.modelcontextprotocol/tasks`, con consulta de estado por polling. Es la versión estándar del patrón de la slide 21.
- **Gobernanza:** Anthropic donó MCP en diciembre de 2025 a la Agentic AI Foundation, un fondo de la Linux Foundation. Buen dato para el mito "MCP es solo para Claude".

## Preguntas que te pueden hacer

**"¿Por qué no uso function calling y listo?"**
Si tenés una sola app y tres funciones, usá function calling, está perfecto. MCP vale cuando la misma herramienta la van a usar varios clientes, o cuando no querés reescribirla al cambiar de modelo o de framework.

**"¿MCP es de Anthropic? ¿Me ata a Claude?"**
Lo creó Anthropic, pero desde diciembre de 2025 lo gobierna la Agentic AI Foundation (Linux Foundation), y lo implementan clientes de muchas empresas. Un server MCP funciona con cualquier host compatible.

**"¿Es seguro conectar servers de la comunidad?"**
Tan seguro como instalar un paquete sin mirarlo. Corre con tus permisos. Leé el código o usá los de fuentes oficiales, dales la mínima credencial posible, y desconfiá de lo que devuelvan.

**"¿Cuántas tools es demasiado?"**
No hay número mágico, pero cada tool ocupa contexto y compite en la elección. Si dos tools se parecen, el modelo se confunde. Mejor pocas y bien descriptas, y conectar solo los servers que la tarea necesita.

**"¿Cómo testeo un server sin gastar tokens?"**
Con el MCP Inspector: llamás las tools a mano y ves exactamente lo que ve el modelo. Y tests de contrato automáticos con un client del SDK.

**"¿Qué pasa si la tool tarda mucho?"**
Slide 21: encolar y devolver un ticket, y que el agente consulte el estado. No dejes una tool colgada esperando.

**"¿El modelo puede ejecutar cualquier cosa que exponga el server?"**
Puede *pedir* ejecutar cualquier tool que vea. Por eso el control está en qué exponés y en pedir confirmación para lo destructivo. El host también puede pedir aprobación antes de cada llamada, como hace Claude Code.

**"¿Resources o meter todo en el system prompt?"**
Los resources los carga la app cuando hacen falta, versionados en el server. Todo en el system prompt se desactualiza y ocupa ventana en cada llamada.

**"¿Sirve para datos en tiempo real?"**
Sí. Es exactamente lo que hace el MCP de economía: cada llamada va a la fuente en vivo.
