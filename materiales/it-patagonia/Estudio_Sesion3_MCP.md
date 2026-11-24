# MCP para entenderlo a fondo · Sesión 3

Material de estudio para vos, no para leer en clase. La idea es que entiendas cada concepto de raíz: después, cómo lo decís está en el `Guion_Sesion3_MCP.md`.

Orden recomendado: leelo de corrido una vez, y al final hacé la autoevaluación sin mirar. Si una respuesta no te sale en dos oraciones, volvé a esa sección.

---

## 1. El problema: N × M

### La idea
Tenés **N aplicaciones con IA** (un agente de soporte, uno de ventas, un asistente interno, Claude Desktop) y **M herramientas** (CRM, facturación, wiki, tickets, base de datos, mail). Si cada aplicación se conecta a cada herramienta por su cuenta, la cantidad de integraciones es **N × M**.

Con 4 apps y 6 herramientas: 4 × 6 = **24 integraciones**.

### Por qué es peor de lo que parece
El problema no es el número 24. Es que cada una de esas 24:
- tiene su propia forma de autenticarse,
- su propio formato de errores,
- sus propios bugs,
- y vive **adentro** de la app que la usa, así que nadie más la reutiliza.

Y lo peor: si cambiás de modelo o de framework (de LangChain a otro, de un proveedor a otro), la forma de declarar herramientas cambia y **las reescribís todas**.

Además crece mal: sumar una herramienta nueva cuesta N integraciones (una por app). Sumar una app nueva cuesta M.

### Cómo lo resuelve un protocolo
Si todas las apps hablan el mismo protocolo, y cada herramienta se "envuelve" una vez en ese protocolo:
- cada app implementa el protocolo **una vez** (N trabajos),
- cada herramienta se envuelve **una vez** (M trabajos).

Total: **N + M**. Con el ejemplo: 4 + 6 = **10**. Y sumar una herramienta nueva cuesta 1, no N.

### La analogía que mejor funciona con devs: LSP
MCP se inspiró explícitamente en el **Language Server Protocol** (LSP). Antes de LSP, cada editor (VS Code, Vim, Emacs, IntelliJ) tenía que implementar el autocompletado de cada lenguaje (Python, Go, Rust, TypeScript): editores × lenguajes. Con LSP, cada lenguaje escribe un "language server" una vez, y cualquier editor que hable LSP lo usa. Es exactamente el mismo movimiento, cambiando editores por apps de IA y lenguajes por herramientas.

La analogía del USB-C también sirve para público no técnico: un puerto común en vez de un cable por dispositivo.

### Lo que tenés que poder decir
> "Sin protocolo, integrar es multiplicar. Con protocolo, es sumar. Y la herramienta deja de ser código pegado dentro de una app para ser una pieza con contrato propio."

---

## 2. Qué es MCP, y qué no es

**Es** un protocolo abierto que define cómo una aplicación con un modelo **descubre** y **usa** herramientas y datos externos.

La palabra clave es *descubre*: la app se conecta a un server y le pregunta "¿qué ofrecés?". El server responde con su lista de herramientas, cada una con nombre, descripción y parámetros. Nada está hardcodeado en la app.

**No es:**
- **Un modelo ni una librería de IA.** Es un protocolo, como HTTP. No hace nada inteligente por sí mismo.
- **Un reemplazo de function calling.** Lo usa por debajo (sección 5).
- **Un reemplazo de RAG.** RAG es una técnica para recuperar contexto; puede vivir detrás de un server MCP.
- **Algo exclusivo de Claude.** Lo creó Anthropic (noviembre de 2024), y en diciembre de 2025 lo donó a la Agentic AI Foundation, de la Linux Foundation. Lo implementan clientes de muchas empresas.
- **Lo que decide qué hace la herramienta.** MCP estandariza *cómo se conecta*, no *qué hace*. Como USB-C: define el enchufe, no si del otro lado hay un disco o un monitor.

---

## 3. La arquitectura: host, client, server

Tres roles. La confusión clásica es entre host y client.

| Rol | Qué es | Ejemplo |
|-----|--------|---------|
| **Host** | La aplicación donde vive el modelo y el usuario interactúa | Claude Desktop, Claude Code, un IDE, tu agente propio |
| **Client** | Una conexión: el componente, dentro del host, que habla con **un** server | Uno por cada server conectado |
| **Server** | El programa que envuelve una herramienta real y la expone por MCP | Un server de GitHub, uno de tu base de facturación |

### Ejemplo concreto
Abrís Claude Code con tres servers conectados: filesystem, GitHub y el de economía.
- **Host:** Claude Code.
- **Clients:** tres, uno por server. Cada conexión es **uno a uno**.
- **Servers:** tres procesos o URLs distintos.

### Por qué importa la separación
El host **no conoce la API que hay detrás** de cada server. Solo conoce MCP. Si GitHub cambia su API, se actualiza el server de GitHub y Claude Code ni se entera. Eso es lo que "compra" el protocolo: el desacople.

### Una consecuencia que conviene tener clara
El host es el que tiene el control. Decide qué servers conectar, qué tools mostrarle al modelo y si pide permiso antes de ejecutar algo. Por eso Claude Code te pregunta antes de correr una tool: esa decisión es del host, no del server.

---

## 4. Qué viaja por el cable

### El formato
Los mensajes son **JSON-RPC 2.0**: un JSON con un método, parámetros y un id para asociar pedido y respuesta. Nada exótico.

### Las dos operaciones que tenés que conocer
**Descubrir** (`tools/list`). El client pregunta qué hay, el server responde algo así:

```json
{
  "tools": [{
    "name": "buscar_facturas",
    "description": "Busca facturas de UN cliente en un rango de fechas. Devuelve máximo 20...",
    "inputSchema": {
      "type": "object",
      "properties": {
        "cliente_id": { "type": "string" },
        "desde": { "type": "string", "description": "AAAA-MM-DD" },
        "hasta": { "type": "string", "description": "AAAA-MM-DD" }
      },
      "required": ["cliente_id", "desde", "hasta"]
    },
    "annotations": { "readOnlyHint": true }
  }]
}
```

Los parámetros se describen con **JSON Schema**, el mismo estándar que se usa para validar JSON en cualquier lado.

**Ejecutar** (`tools/call`):

```json
{ "jsonrpc": "2.0", "id": 7, "method": "tools/call",
  "params": { "name": "buscar_facturas",
              "arguments": { "cliente_id": "CLI-001", "desde": "2026-01-01", "hasta": "2026-03-31" } } }
```

La respuesta trae `content` (texto, imágenes u otros recursos) y un `isError` que dice si falló. También puede traer datos estructurados, si la tool declaró un schema de salida.

### El ciclo completo de una llamada (esto es lo que más ordena la cabeza)
1. El usuario escribe: *"¿cuánto le facturamos a Bodega Río Negro en marzo?"*.
2. El **host** ya tiene la lista de tools de todos sus servers (la pidió con `tools/list`).
3. El host le manda al **modelo** el mensaje del usuario **más** esa lista de tools, traducida al formato de tools del modelo.
4. El **modelo** decide: "necesito `buscar_facturas` con estos argumentos". Eso es function calling.
5. El host recibe ese pedido y lo rutea al **client** del server correcto, que manda `tools/call`.
6. El **server** ejecuta (consulta la base, llama la API) y devuelve el resultado.
7. El host le pasa el resultado al modelo, que responde al usuario o pide otra tool.

Fijate que **el modelo nunca habla con el server**. El modelo solo ve descripciones y resultados. Quien habla MCP es el host.

### El detalle de versión (dato actualizado)
- **Hasta la spec de noviembre de 2025:** al conectarse había un handshake (`initialize`) para negociar versión y capacidades, y una sesión.
- **Desde la spec del 28 de julio de 2026:** no hay handshake ni sesión. Cada request lleva su versión y capacidades en un campo `_meta`. Así cualquier instancia de un server atrás de un balanceador puede atender cualquier request, como una API web común.

Los SDK están migrando, así que en la práctica vas a ver las dos formas un tiempo.

---

## 5. MCP y function calling

Con el ciclo de arriba esto se vuelve obvio: **son capas distintas.**

- **Function calling** es la capacidad del *modelo* de decir "quiero ejecutar esta función con estos argumentos" (paso 4). Es el mecanismo.
- **MCP** es de dónde salen esas funciones y cómo se ejecutan (pasos 2, 5 y 6). Es la plomería.

Sin MCP, las funciones las definís dentro de tu app, en el formato de tu proveedor o framework. Funcionan, pero solo en esa app. Con MCP, viven en un server que cualquier host compatible descubre solo.

**Cuándo alcanza con function calling a secas:** una sola app, pocas funciones, nadie más las va a usar. No hay que meter MCP en todo.

---

## 6. Las tres primitivas

Lo que distingue a cada una es **quién decide usarla**. Si te quedás con una sola cosa de esta sección, que sea esa.

| Primitiva | La controla | Qué es | Ejemplo |
|-----------|-------------|--------|---------|
| **Tools** | El **modelo** | Funciones ejecutables, pueden tener efectos | `buscar_facturas`, `crear_ticket` |
| **Resources** | La **aplicación** (host) | Datos para leer, sin efectos, identificados por una URI | Un documento, un esquema de base, `economia-ar://fuentes` |
| **Prompts** | El **usuario** | Templates reutilizables que el server reparte | "Revisar PR", "¿Dónde pongo mis pesos?" |

### Por qué importa quién decide
- Una **tool** la llama el modelo cuando *cree* que hace falta, según su descripción. Por eso la descripción es crítica.
- Un **resource** lo trae el host al contexto cuando el host quiere (porque el usuario lo adjuntó, o porque la app lo decide). El modelo no puede ir a buscarlo por su cuenta. Por eso, en la práctica, a veces algo de solo lectura se expone *también* como tool: para que el modelo lo pueda pedir.
- Un **prompt** lo elige el usuario, típicamente como un comando. En Claude Code aparecen con `/`.

### Regla para decidir resource o tool
Solo lectura y sin parámetros → probablemente resource. Búsqueda con parámetros, o cualquier efecto → tool.

### Por qué los prompts están subvalorados
Porque resuelven un problema de equipos, no de código: el "cómo se hace acá" (el criterio de review, el formato de un informe) queda versionado en un solo lugar. Cambia el criterio y todo el equipo lo tiene al día siguiente.

---

## 7. Transportes

El transporte es **por dónde viajan** los mensajes JSON-RPC. Hay dos vigentes.

### stdio
- El host **lanza al server como proceso hijo** en tu máquina.
- Hablan por **stdin/stdout**: el host escribe pedidos en la entrada del server, el server responde por su salida.
- Atiende a un solo cliente (el que lo lanzó).
- No tiene auth: se confía en que es tu máquina. Las credenciales se pasan por variables de entorno.
- **Consecuencia práctica clave:** stdout **es** el canal del protocolo. Si el server hace un `console.log` o un `print` normal, mete basura en el canal y rompe la comunicación. Los logs van a **stderr**.
- **No viaja por la red.** Un cliente remoto no puede lanzar un proceso en tu máquina.

### Streamable HTTP
- El server vive **atrás de una URL** y recibe los mensajes por POST.
- Atiende a **muchos clientes** a la vez.
- Auth con **OAuth 2.1** o tokens. El server valida el token como cualquier API.
- Puede responder en streaming cuando la respuesta tarda.
- Es el transporte de **producción**.

### El viejo HTTP+SSE (deprecado)
La primera versión remota usaba dos canales: un stream SSE abierto permanentemente (el cliente hacía GET y el server le iba mandando eventos) más POSTs aparte. Era difícil de escalar porque cada cliente mantenía una conexión abierta contra una instancia concreta. Lo reemplazó Streamable HTTP, y en la spec de julio de 2026 quedó formalmente deprecado, con un año de transición.

Por eso el error de la Demo C: un cliente configurado como SSE hace ese GET esperando un stream, el server nuevo responde 405, y el cliente nunca llega a mandar un POST. **"Conecta y no pasa nada."**

### Resumen para decidir
stdio para desarrollo y herramientas personales. HTTP para compartir y producción.

---

## 8. Diseño de tools (el corazón de la sesión)

### El principio
El modelo **solo ve tres cosas** de tu tool: **nombre, descripción y schema de parámetros**. No ve tu código, tu base ni tus intenciones. Con esas tres cosas decide *si* la usa, *cuándo* y *con qué argumentos*.

Por eso: **la descripción es el prompt de la tool.** Escribirla es prompt engineering.

### Anatomía de una buena tool
- **Nombre de acción de negocio:** `buscar_facturas`, no `query` ni `get_data`.
- **Descripción que dice:** qué hace, cuándo usarla, qué devuelve, qué **no** hace, límites ("máximo 20").
- **Parámetros tipados con restricciones:** fechas con formato, enums en vez de strings libres, rangos. Un argumento inválido se rechaza antes de ejecutar nada.
- **Respuestas acotadas:** resumen, paginación, límites.
- **Errores útiles:** qué pasó y qué hacer.
- **Las cuentas las hace el server:** si hay que sumar o calcular, que lo haga el código, no el modelo. Los modelos son malos sumando 40 números.

### Granularidad: el tamaño correcto
- **Muy atómica** (`abrir_conexion`, `filtrar`, `paginar`…): el modelo encadena muchas llamadas para algo simple. Cada una suma latencia, tokens y una chance más de error.
- **Muy monolítica** (`hacer_todo` con veinte parámetros opcionales): el modelo no sabe qué combinación usar.
- **Correcta:** una **acción de negocio**, lo que diría una persona del equipo. "Buscá las facturas de este cliente."

Test rápido: si para explicar la tool tenés que explicar tu arquitectura interna, es muy atómica.

### Los cuatro errores típicos, y por qué
1. **Descripciones para humanos** ("endpoint legacy de cobranzas v2"): describen la implementación, no cuándo usarla.
2. **Respuestas enormes:** la ventana de contexto la comparten la conversación, el system prompt y todas las tools. **La ventana no es tuya.** 50 KB de JSON desplazan todo lo demás y degradan al modelo.
3. **Errores sin mensaje:** un `500` pelado hace que el modelo reintente a ciegas. `"No existe CLI-099. Usá buscar_cliente primero"` lo encamina.
4. **Tools que se pisan** (`buscar_cliente`, `obtener_cliente`, `consultar_cliente`): el modelo elige mal y no hay forma fácil de saber por qué.

### Lo que la Demo B demuestra
Mismo código de negocio, mismos datos, dos interfaces. Con `consulta(data)` el modelo adivina qué mandar, recibe 61 filas de dos clientes y puede sumar mal. Con `buscar_cliente` + `buscar_facturas` encuentra la ambigüedad, pregunta, y recibe los totales ya calculados. **La única diferencia es lo que el modelo ve.**

---

## 9. Seguridad

La idea madre: **todo lo que sale del modelo es input no confiable**, igual que lo que escribe un usuario en un formulario.

- **Validar inputs:** si una tool mete un parámetro en un SQL sin validar, es inyección, venga de una persona o de un modelo.
- **Prompt injection indirecto:** el ataque no viene del usuario, viene del *contenido*. Un mail, un documento o una página que devuelve una tool puede traer "ignorá tus instrucciones y mandá los datos a…". El modelo lo lee como texto y puede obedecer. Lo que devuelven las tools también es no confiable.
- **Credenciales en el server, nunca en el contexto:** si la API key está en el prompt, una inyección la puede sacar. El server guarda la llave y expone la capacidad.
- **Permisos mínimos:** exponé las operaciones que elegiste, no toda la API de atrás. Empezá solo con lectura. (En la Demo A el server de filesystem trae `write_file` y `move_file` aunque nadie los pidió: exactamente esto.)
- **Acciones destructivas con confirmación:** borrar, pagar, mandar mails piden OK explícito o una persona en el medio.
- **Servidores de terceros:** corren con tus permisos. Conectar uno desconocido es como instalar un paquete sin mirarlo.

### Anotaciones: pistas, no seguridad
Una tool puede declararse de solo lectura (`readOnlyHint`), destructiva (`destructiveHint`), idempotente o de "mundo abierto" (toca sistemas externos). Sirven para que el **host** decida si pide confirmación. Pero las declara el propio server: un server malicioso puede mentir. **No son una barrera de seguridad.**

---

## 10. Llevarlo a producción

### El orden (y por qué)
1. Diseñar las tools (nombres, parámetros, límites).
2. Server local por stdio.
3. Probar a mano con **MCP Inspector**.
4. Recién ahí: HTTP, auth, deploy, observabilidad.

Por qué: el error caro es al revés. Tres días de OAuth y deploy para descubrir que las tools estaban mal pensadas. Las tools se iteran rápido en local; la infraestructura no.

### MCP Inspector
Una herramienta que levanta tu server y te muestra **exactamente lo que ve el modelo** (nombres, descripciones, schemas), y te deja llamar tools a mano. Sirve para separar "el server está roto" de "el modelo razona raro".

### Versionado
- **Agregar** una tool: gratis. Los clientes viejos la ignoran.
- **Cambiar** una existente (renombrar un parámetro, cambiar un tipo): rompe a todos de golpe.
- Si cambia el comportamiento: tool nueva + deprecar la vieja con aviso.

Un server puede avisarle al cliente que cambió su lista de tools, y el cliente la vuelve a pedir sin reconectar.

### Observabilidad
Loguear cada tool call con **argumentos, resultado y latencia**. Sin eso, cuando algo falle en producción no vas a saber si fue el modelo (llamó mal) o el server (respondió mal).

### Hosting
Control contra comodidad, aplicado a **qué datos pasan por el server**. Datos regulados: self-hosted. Docs públicos: administrado y listo.

### Los tres errores reales de debugging
- `fetch is not defined` → Node menor a 18.
- Conecta y no pasa nada → transportes distintos (SSE contra Streamable HTTP).
- Anda local, muere en el deploy → stdio no viaja por la red.

---

## 11. Tareas largas (slide 21)

Problema: un cálculo que tarda veinte minutos. Si la tool espera, se corta por timeout y el agente queda colgado.

Patrón: **validar → encolar → ticket → consultar estado → resultados resumidos.** El agente recibe un ticket al instante y consulta después.

**Dato actualizado:** desde la spec de julio de 2026 este patrón tiene forma estándar, como extensión oficial: `io.modelcontextprotocol/tasks`, con consulta por polling. El diseño de la slide sigue siendo válido con cualquier cliente, esté o no soportada la extensión.

Relacionado: si una tool necesita pedirle algo al usuario a mitad de camino (*elicitation*), en la spec nueva el server responde "me falta input" (`input_required`) y el cliente reintenta con la respuesta. Se llama **MRTR** (*multi round-trip requests*) y reemplaza las conexiones abiertas de antes.

---

## 12. Cómo encaja con lo que ya vieron

- **Sesión 2 (multi-agente, RAG, sesiones):** los workers hablan MCP; el vector store, la base de sesiones y las APIs internas quedan detrás de servers. Cambiás una pieza y el resto no se entera.
- **Agent SDK:** los servers se **declaran** en la configuración del agente (locales por stdio y remotos por HTTP, mezclados) y sus tools aparecen como tools del agente. Pasás de integrar a declarar.
- **Sesión 4 (Claude Code):** Claude Code es un host MCP. Todo lo de hoy aplica directo.

### El mito que más vale entender: "más servers es mejor"
Cada tool conectada ocupa lugar en la ventana (su nombre, descripción y schema viajan en cada request) y compite en la elección del modelo. Con cuarenta tools parecidas, el modelo elige peor y gastás tokens en descripciones que no se usan. Conectá lo que la tarea necesita.

---

## 13. Qué cambió en 2026 (para no quedarte con material viejo)

Spec del **28 de julio de 2026**:
- **Sin estado:** no más handshake `initialize` ni header de sesión. Cada request trae versión, cliente y capacidades en `_meta`.
- **MRTR** para pedir input al usuario sin conexiones abiertas.
- **Tasks** pasa a ser la extensión oficial `io.modelcontextprotocol/tasks`.
- **Deprecados:** *sampling* (el server le pedía al cliente que corra el modelo), *roots* (el cliente le indicaba al server qué carpetas podía tocar), *logging* del protocolo, y el transporte HTTP+SSE. Al menos doce meses de compatibilidad.

Si alguien cita alguno de los deprecados como novedad, está leyendo material de 2025.

---

## 14. Glosario

- **Host:** la app donde vive el modelo (Claude Code, Claude Desktop).
- **Client:** una conexión del host con un server. Uno por server.
- **Server:** el programa que expone herramientas y datos por MCP.
- **Tool / Resource / Prompt:** las tres primitivas; las controlan modelo, app y usuario, respectivamente.
- **JSON-RPC 2.0:** el formato de los mensajes.
- **JSON Schema:** cómo se describen los parámetros de una tool.
- **stdio:** transporte local, proceso hijo, stdin/stdout.
- **Streamable HTTP:** transporte remoto, POST a una URL.
- **HTTP+SSE:** el transporte remoto viejo. Deprecado.
- **Inspector:** herramienta para ver y probar un server sin modelo.
- **Annotations:** pistas sobre una tool (solo lectura, destructiva…). No son seguridad.
- **Elicitation:** pedirle datos al usuario en medio de una tool.
- **MRTR:** cómo se hace elicitation sin conexión abierta, desde 2026.
- **Registry:** el catálogo oficial para publicar y encontrar servers.
- **LSP:** Language Server Protocol, el antecedente del que MCP copió la idea.

---

## 15. Autoevaluación

Respondé en voz alta, en dos oraciones como máximo, antes de mirar las respuestas.

1. ¿Por qué N × M es un problema, más allá del número?
2. Tenés 5 apps y 8 herramientas. ¿Cuántas integraciones con y sin MCP? ¿Cuánto cuesta sumar una herramienta en cada caso?
3. En Claude Code con 4 servers conectados, ¿cuántos hosts, clients y servers hay?
4. ¿El modelo habla directamente con el server?
5. Explicá la diferencia entre MCP y function calling usando el ciclo de una llamada.
6. ¿Quién decide usar una tool, un resource y un prompt?
7. Tenés un catálogo de productos de solo lectura. ¿Resource o tool? ¿Y "buscar producto por SKU"?
8. ¿Por qué un `console.log` puede romper un server stdio?
9. Un cliente conecta a tu server remoto y no pasa nada. ¿Qué mirás primero?
10. ¿Qué tres cosas ve el modelo de una tool?
11. ¿Por qué `hacer_todo` es mal diseño? ¿Y doce tools atómicas?
12. ¿Por qué las anotaciones como `readOnlyHint` no son seguridad?
13. ¿Qué es un prompt injection indirecto y por qué afecta a MCP?
14. ¿Por qué las tools primero y el transporte al final?
15. ¿Qué cambió con la spec de julio de 2026? Nombrá tres cosas.

### Respuestas

1. Porque cada integración tiene su auth, sus errores y sus bugs, vive encerrada en una app, y se reescribe entera al cambiar de modelo o framework. Además cada herramienta nueva cuesta N integraciones.
2. Sin MCP: 5 × 8 = 40. Con MCP: 5 + 8 = 13. Sumar una herramienta: 5 integraciones sin MCP, 1 con MCP.
3. Un host (Claude Code), cuatro clients (uno por server), cuatro servers.
4. No. El modelo solo ve descripciones y resultados. El que habla MCP es el host, a través de sus clients.
5. El modelo, con function calling, dice "quiero esta función con estos argumentos". MCP es de dónde salió esa lista de funciones y cómo el host ejecuta la llamada contra el server.
6. Tool: el modelo. Resource: la aplicación. Prompt: el usuario.
7. El catálogo entero, resource. Buscar por SKU, tool, porque lleva parámetros.
8. Porque en stdio, stdout es el canal del protocolo: cualquier texto que no sea JSON-RPC lo corrompe. Los logs van a stderr.
9. Que los dos lados usen el mismo transporte: SSE contra Streamable HTTP es la causa más común.
10. Nombre, descripción y schema de parámetros.
11. `hacer_todo` tiene tantos parámetros que el modelo no sabe cómo llamarla. Doce atómicas obligan a encadenar llamadas: más latencia, más tokens, más errores. Lo correcto es una acción de negocio.
12. Porque las declara el propio server, que puede mentir. Sirven para que el host decida si pide confirmación, no para proteger nada.
13. Instrucciones escondidas en el contenido que devuelve una tool (un mail, un documento) que el modelo lee y puede obedecer. Afecta a MCP porque las tools traen justamente contenido externo al contexto.
14. Porque las tools se iteran rápido en local y la infraestructura no. Si las tools están mal, todo lo demás fue trabajo tirado.
15. Protocolo sin estado (sin handshake ni sesión), tasks como extensión oficial, MRTR para elicitation, y deprecación de sampling, roots, logging y HTTP+SSE.
