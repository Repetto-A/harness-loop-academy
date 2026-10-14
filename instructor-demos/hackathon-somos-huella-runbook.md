# Runbook: demo Somos Huella (crash course hackathon)

**Bloque:** 5 del guion ([`class-scripts/hackathon-crash-course.md`](../class-scripts/hackathon-crash-course.md)) | **Duración en vivo:** 15 min | **Herramientas:** Cursor (IDE), Gentle AI (Engram + SDD), grafo de código (`codebase-memory-mcp`)

**Feature de la demo:** *"Supabase pgvector como índice alternativo de búsqueda, sin migrar datos."*

## Regla corta

1. **Nunca** demostrar desde la copia de trabajo de Somos Huella. Siempre desde **clones limpios** de GitHub.
2. **Repo 2** (en vivo) es el plan A. **Repo 1** (pre-hecho) es el salvavidas.
3. **No abrir `frontend/.env.local`** con el proyector. Un clon limpio no lo tiene: por eso se demuestra desde clones.

## Mapa de los dos repos

| | Repo 1 (salvavidas) | Repo 2 (en vivo) |
|---|---|---|
| Origen | Clon de GitHub, preparado el día anterior | Clon de GitHub, hecho **durante la charla** |
| Estado | Corrida completa: Gentle AI instalado, grafo, proposal, spec, design, tasks | Vacío: solo el clon |
| Carpeta (ejemplo) | `<DEMO_DIR>\somos-huella-repo1` | `<DEMO_DIR>\somos-huella-live` |
| Cuándo se usa | Si el agente falla o tarda; y para mostrar fases largas | Mientras todo ande |
| Frase de pivote | "Esto salió ayer con el mismo comando." | — |

- Repo de origen: `https://github.com/Repetto-A/ML-FaceRecognizer.git` (rama `main`).
- Usar rutas relativas simples: `<DEMO_DIR>` es una carpeta fuera de la copia de trabajo del proyecto.

## Qué es el repo (para la narración)

| Carpeta | Rol |
|---------|-----|
| `core/` | Motor compartido: detección (MTCNN) + embeddings (InceptionResnetV1) + similitud |
| `indexer/` | Indexado batch en GPU local; genera `index.npz` + metadata |
| `api/` | API REST de búsqueda y matching (FastAPI) |
| `frontend/` | UI Next.js: registro, búsqueda, `/ejemplos`, admin |

Por qué la feature tiene sentido: `docs/ARCHITECTURE.md` §5 ya prevé **pgvector (HNSW)** como fase 3 de sincronización, después del `index.npz` (F1). La feature de la demo es un *índice alternativo*, sin migrar datos: el `.npz` sigue siendo la fuente.

---

## 1. Preparación del Repo 1 (el día anterior)

### 1.1 Checklist

- [ ] Carpeta de trabajo fuera del proyecto original: `<DEMO_DIR>`
- [ ] Clon limpio hecho
- [ ] Gentle AI instalado y verificado
- [ ] Grafo ingestado
- [ ] SDD completo (proposal → spec → design → tasks)
- [ ] Capturas de cada fase
- [ ] Tabla de tiempos del ensayo completada (ver 1.8)

### 1.2 Clonar

```powershell
cd <DEMO_DIR>
git clone https://github.com/Repetto-A/ML-FaceRecognizer.git somos-huella-repo1
cd somos-huella-repo1
git status
```

- No hacer `git push` desde este repo. Es de demostración.
- Si la rama por defecto no es `main`, anotar cuál es.

### 1.3 Instalar y verificar Gentle AI

Comandos verificados contra `gentle-ai --help` (versión local 1.42.0):

```powershell
# Vista previa del plan de instalación; no ejecuta nada
gentle-ai install --dry-run

# Instalación real, eligiendo agentes y preset
gentle-ai install --agent claude-code,cursor --preset full-gentleman

# Chequeo de salud
gentle-ai doctor
```

- `--dry-run` imprime el plan (agentes, componentes, dependencias). Es lo que se muestra en vivo en la sección 2.
- Flags existentes: `--agent`, `--component`, `--skill`, `--persona`, `--preset`, `--sdd-mode single|multi`, `--scope global|workspace`, `--channel`, `--dry-run`.
- El preset `full-gentleman` es el que aparece por defecto en `--dry-run`. Verificar que sea el que se quiere para la demo.

<!-- VERIFICAR: (1) qué agentes aceptan `--agent` en la versión instalada (en `gentle-ai doctor` figuran claude-code, opencode, cursor, vscode-copilot, codex, windsurf). (2) Que Cursor sea el agente donde corren los comandos SDD en la demo. (3) La ruta de instalación en una máquina limpia (el README de Gentle AI lista brew, curl y `go install`; en esta máquina está por Scoop). -->

Refrescar el registro de skills dentro del repo:

```powershell
gentle-ai skill-registry refresh --cwd <DEMO_DIR>\somos-huella-repo1
```

- Flags: `--cwd <dir>`, `--force`, `--quiet`, `--no-gitignore`.
- Se hace parado en el repo para que el registro (`.atl/skill-registry.md`) quede dentro del repo.

### 1.4 Abrir en Cursor e inicializar SDD

```powershell
cursor .
```

<!-- VERIFICAR: que el comando `cursor` esté en el PATH (Cursor: "Shell Command: Install 'cursor' command"). Si no, abrir la carpeta desde Cursor. -->

En el chat del agente (modo agente):

```text
/sdd-init
```

- Detecta el stack (Python/FastAPI + Next.js) y deja el contexto del proyecto en Engram.
- Para el flujo orquestado, el orquestador pregunta la primera vez qué modo de ejecución y qué almacén usar. Respuestas para la demo:

| Pregunta | Respuesta | Por qué |
|----------|-----------|---------|
| Modo de ejecución | `interactive` | La sala opina entre fases |
| Almacén de artefactos | `engram` | Sin archivos extra; hace posible "Engram recuerda" |
| Estrategia de entrega | la por defecto | No se hace PR en la demo |

### 1.5 Ingestar el repo en el grafo

Herramienta: `codebase-memory-mcp`, función `index_repository`. Parámetro verificado: `repo_path`.

En el chat del agente:

```text
Indexá este repo en el grafo de código (herramienta index_repository de codebase-memory-mcp) y mostrame la arquitectura.
```

- Equivale a `index_repository` con `repo_path = <DEMO_DIR>\somos-huella-repo1`.
- Respuesta esperada: `status: indexed`, con conteo de nodos y aristas. El indexador excluye `.git`, `.venv`, `uploads`, `frontend/node_modules` y `frontend/.next`.
- Para el mapa: `get_architecture` con `aspects=['all']`.
- Apuntar los números (nodos, aristas) del Repo 1 para tener un dato de referencia.

<!-- VERIFICAR: que `codebase-memory-mcp` esté habilitado como MCP en Cursor en esta máquina (en Claude Code responde). Si el agente no lo ve, revisar el archivo de configuración de MCP de Cursor. -->

### 1.6 Correr SDD: proposal → spec → design → tasks

Prompt (único, copiar tal cual):

```text
/sdd-new supabase-pgvector-index

Feature: "Supabase pgvector como índice alternativo de búsqueda, sin migrar datos."
Contexto: hoy el índice vive en index/embeddings.npz + index.json (core/index_store.py). La API compara con matmul en numpy. docs/ARCHITECTURE.md §5 prevé pgvector (HNSW) como fase 3.
Restricciones: el .npz sigue siendo la fuente de verdad. Sin migrar datos. Solo datos de prueba (/ejemplos).
```

Después, fase por fase:

```text
/sdd-continue supabase-pgvector-index
```

- Repetir hasta tener: proposal, spec, design, tasks.
- Alternativa en una pasada: `/sdd-ff supabase-pgvector-index` (proposal → specs → design → tasks).
- Estado de las fases, desde la terminal:

```powershell
gentle-ai sdd-status supabase-pgvector-index
```

<!-- VERIFICAR: formato de salida de `gentle-ai sdd-status <change>` y de `gentle-ai sdd-continue <change>` (la ayuda no los documenta). Correrlos una vez en el ensayo y anotar qué muestran. -->

- **No correr `sdd-apply`.** La demo termina en tasks: no hay implementación.
- Capturar pantalla de cada fase (proposal, spec, design, tasks).

### 1.7 Confirmar que Engram guardó las decisiones

En un **chat nuevo** del Repo 1:

```text
¿Qué decidimos sobre supabase-pgvector-index y qué quedó afuera?
```

- Debe responder con la proposal. Si no: revisar `engram` (ver sección 5).
- Por CLI, para depurar:

```powershell
engram search "supabase-pgvector-index" --limit 5
```

<!-- VERIFICAR: que Engram agrupe las memorias por el nombre del proyecto detectado. El Repo 1 y el Repo 2 están en carpetas distintas (somos-huella-repo1 vs somos-huella-live): confirmar con `engram search` si guardan bajo el mismo proyecto o bajo proyectos distintos, y si hay que fijar el nombre del proyecto. Si fuera distinto, el "Engram recuerda" del Repo 2 solo recupera lo que se guardó en Repo 2, y es lo correcto. -->

### 1.8 Ensayo cronometrado

El spec lo marca como pendiente: no se conoce cuánto tarda cada fase. Completar en el ensayo:

| Paso | Tiempo medido | Comentario |
|------|---------------|-----------|
| `gentle-ai install --dry-run` | | |
| `skill-registry refresh` | | |
| Ingesta del grafo | | |
| proposal | | |
| spec | | |
| design | | |
| tasks | | |
| Chat nuevo + recupera de Engram | | |

- **Umbral de pivote** = lo que mida el ensayo para la proposal + margen. Punto de partida sugerido: 60 a 90 s sin avance visible (a calibrar).

---

## 2. Guion Repo 2 (en vivo)

Reloj del bloque: 0:45 – 1:00. Cada paso trae lo que se hace, lo que se dice y cuándo pivotar.

### 2.0 Antes de entrar al escenario

- [ ] Proyector en modo duplicado, **solo Cursor y la terminal visibles**
- [ ] Notificaciones apagadas
- [ ] Carpeta `somos-huella-live` **no existe todavía** (se clona en vivo)
- [ ] Repo 1 abierto en **otra ventana** de Cursor, listo
- [ ] Terminal en `<DEMO_DIR>`

### 2.1 (0:45) Clonar e instalar

```powershell
cd <DEMO_DIR>
git clone https://github.com/Repetto-A/ML-FaceRecognizer.git somos-huella-live
cd somos-huella-live
cursor .
```

Decir: "Repo limpio, recién clonado de GitHub. Les muestro cómo se instala Gentle AI."

```powershell
gentle-ai install --dry-run
gentle-ai doctor
```

- `--dry-run` muestra el plan sin ejecutar. `doctor` muestra que el sistema está sano.
- **No esperar una instalación real en vivo.** La máquina ya lo tiene instalado.
- Decir: "Cómo funciona ya lo vimos. Esto es solo instalar."

```powershell
gentle-ai skill-registry refresh
```

### 2.2 (0:47) Ingestar el grafo

En el chat de Cursor:

```text
Indexá este repo en el grafo de código y mostrame la arquitectura.
```

Decir: "Fíjense que sabe que hay un core, un indexer, una API y un frontend, sin haber leído todo."

### 2.3 (0:49) SDD con la sala

```text
/sdd-new supabase-pgvector-index

Feature: "Supabase pgvector como índice alternativo de búsqueda, sin migrar datos."
Contexto: hoy el índice vive en index/embeddings.npz + index.json (core/index_store.py). docs/ARCHITECTURE.md §5 prevé pgvector (HNSW) como fase 3.
Restricciones: el .npz sigue siendo la fuente de verdad. Sin migrar datos. Solo datos de prueba (/ejemplos).
```

- Si pregunta modo y almacén: `interactive` y `engram` (ver tabla 1.4).
- Cuando aparezca la proposal, preguntar a la sala: **"¿Qué queda afuera?"**
- Tomar 2 o 3 respuestas y decirle al agente que las incorpore:

```text
Agregá al "fuera de alcance" de la proposal: [respuesta de la sala 1], [respuesta de la sala 2].
```

### 2.4 Punto de pivote al Repo 1

| Situación | Acción |
|-----------|--------|
| El agente responde a tiempo | Esperar y comentar lo que va apareciendo |
| El agente falla (error, no responde) | **Pivotar de inmediato** |
| El agente tarda más que el umbral (1.8) | **Pivotar** |
| Cualquier otra duda | Pivotar. El salvavidas está para usarse |

**Cómo pivotar:**

1. Decir: **"Esto salió ayer con el mismo comando."**
2. Cambiar a la ventana de Cursor del Repo 1 (ya abierta).
3. Abrir el mismo punto del flujo: la proposal.
4. Seguir: "La sala dijo X. Vean cómo quedó en la proposal de ayer..." y continuar con spec, design y tasks.

- Se puede pivotar en **cualquier fase** (proposal, spec, design, tasks): el Repo 1 las tiene todas.
- Si el Repo 2 se recupera, se puede volver. No hace falta.

### 2.5 (0:53) Select 26 mientras el agente trabaja

~5 min. Ver sección 4 para qué decir y con qué estado de verificación.

### 2.6 (0:58) Chat nuevo: Engram recuerda

1. Abrir un chat **nuevo** (sin contexto) en el repo donde la demo haya andado (Repo 2, o Repo 1 si se pivotó).
2. Preguntar:

```text
¿Qué decidimos sobre supabase-pgvector-index y qué quedó afuera?
```

3. Decir: **"No le expliqué nada. Lo recordó."**

- Si no recupera: pivotar al Repo 1 para este paso. Ahí la memoria ya está verificada (1.7).

---

## 3. Qué NO abrir en pantalla

| Qué | Por qué | Cómo evitarlo |
|-----|---------|---------------|
| `frontend/.env.local` | Variables de entorno reales (`API_URL`, `API_KEY`, `ADMIN_SECRET`, `CLAIM_CONTACT_EMAIL`). **No abrir con el proyector** | Demostrar solo desde clones de GitHub: ahí no existe. Está en `.gitignore` (`.env*.local`) |
| La copia de trabajo de Somos Huella | Tiene el `.env.local` y archivos locales | No abrirla en Cursor. Cuidado con "Abrir reciente" y con el historial del Explorer |
| `frontend/.env.local.example` | Es inocuo pero invita a abrir los `.env` | Mejor no mostrarlo |
| `registry/photos/`, `uploads/`, `index/` locales | Datos reales de familias, aunque no estén en git | En el clon limpio no existen. No navegar a la copia de trabajo |
| El panel `/admin` | Operaciones sobre datos | No entrar |
| El servidor local con datos reales | Fotos y contactos de personas reales | Mostrar solo `/ejemplos` |

**Para la búsqueda en el frontend, usar `/ejemplos`:** datos de prueba (fotos públicas de celebridades que están versionadas en `frontend/public/demo/`). Es el único lugar donde se muestran caras en pantalla.

**Otros cuidados:**

- Si el grafo lista proyectos (`list_projects`), puede aparecer el nombre de la ruta de la copia de trabajo. Evitar esa llamada en vivo.
- Si Cursor muestra "Recent", cerrar esa vista antes de entrar.
- No pegar capturas de pantalla del navegador con sesiones o `localStorage` visible.

**Contexto de privacidad:** Somos Huella es una herramienta humanitaria de reencuentro. El sistema sugiere, nunca identifica: la verificación es siempre humana. En la narración, decirlo.

---

## 4. Anuncios de Supabase Select 26 dentro de la demo

Entran **solo adentro de la demo**, mientras el agente corre las fases y como contexto de la feature (pgvector es de Supabase). Máximo 2 o 3. Ritmo: ~5 min.

> **Estado:** ninguno de los tres está verificado. La única fuente encontrada es un recap de daily.dev. **No decirlos en vivo hasta confirmarlos contra el blog oficial de Supabase.**

| # | Anuncio | Dónde encaja | Estado |
|---|---------|--------------|--------|
| 1 | Desarrollo local sin Docker | Al hablar de probar pgvector sin montar infra | VERIFICAR contra blog oficial |
| 2 | Confirmación del MCP antes de acciones destructivas | Al hablar de MCP: el agente toca la base directo | VERIFICAR contra blog oficial |
| 3 | Apps que exponen su propio MCP | Al cerrar: tu app como herramienta de otros agentes | VERIFICAR contra blog oficial |

<!-- VERIFICAR: Select 26 en el blog oficial de Supabase (supabase.com/blog). Para cada anuncio, anotar: fecha, nombre exacto del feature, si es GA o beta, y la URL. Si no se puede confirmar uno, sacarlo del guion en lugar de nombrarlo igual. -->

**Plan si no se verifican a tiempo:** reemplazar los 5 min por una explicación de cómo pgvector con HNSW encaja en la arquitectura (que está en `docs/ARCHITECTURE.md`, ADR 4: HNSW sobre IVFFlat). Eso sí es verificable en el repo.

**Clip objetivo:** el clip de Supabase funcionando dentro de la demo (sirve para pedir créditos y visibilidad). Cursor y Grok Bot salen en el flujo, no como tour.

---

## 5. Checklist pre-charla

### Un día antes

- [ ] Repo 1 listo y verificado (sección 1)
- [ ] Tabla de tiempos del ensayo completa (1.8)
- [ ] Select 26 verificado, o plan B elegido (sección 4)
- [ ] Capturas de cada fase guardadas en `<DEMO_DIR>\capturas\`
- [ ] Cargador, adaptador HDMI, mouse
- [ ] Respuesta pregrabada del Grok Bot (bloque 3) guardada

### Una hora antes

- [ ] Wi-Fi probada. Hotspot del celular como respaldo
- [ ] `gentle-ai doctor` sin errores nuevos (hay un aviso conocido de `gga` duplicado en el PATH; no bloquea)
- [ ] `engram` responde: el chequeo `engram:reachable` de `doctor` debe estar OK
- [ ] Cursor abierto con el Repo 1 en una ventana y el Repo 2 sin clonar
- [ ] Fuente grande en Cursor y la terminal
- [ ] Tema claro u oscuro según el proyector (probar)
- [ ] Sin `frontend/.env.local` abierto ni en pestañas

### Pantalla

- [ ] Solo Cursor + terminal
- [ ] Notificaciones y Slack/Discord cerrados
- [ ] Chat de Cursor sin historial previo con datos reales

---

## 6. Reset (después del ensayo o de la charla)

Dejar la máquina como antes de la demo, sin tocar el proyecto original.

### Repo 2

```powershell
cd <DEMO_DIR>
Remove-Item -Recurse -Force .\somos-huella-live
```

- Revisar la ruta antes de ejecutar. Borra una carpeta de demo, nunca la copia de trabajo.

### Repo 1

- **Se conserva.** Es el salvavidas. Si hay que repetir la corrida desde cero: borrar la carpeta, volver a clonar y repetir la sección 1.

### Engram

- Si hay que repetir "Engram recuerda" desde cero, borrar las memorias de la demo:

```powershell
engram search "supabase-pgvector-index" --limit 20
engram delete <obs_id>
```

- `engram delete` hace borrado lógico por defecto; `--hard` es permanente.
- **No usar `--hard` ni `delete project` sin revisar qué proyecto es.** Podrías borrar memorias de otro proyecto.

<!-- VERIFICAR: nombre del proyecto que Engram asigna a cada clon, antes de borrar nada por proyecto. -->

### Grafo

- El índice del grafo del Repo 2 puede quedar huérfano al borrar la carpeta. Si hace falta, `delete_project` (herramienta de `codebase-memory-mcp`) con el nombre del proyecto.
- Verificar el nombre antes: `list_projects`.

### Skill registry

- `gentle-ai skill-registry refresh` crea `.atl/skill-registry.md` en cada repo. Se va con la carpeta del Repo 2.

### Checklist final

- [ ] `somos-huella-live` borrada
- [ ] Memorias de la demo en Engram revisadas
- [ ] La copia de trabajo de Somos Huella **intacta** (`git status` igual que antes)
