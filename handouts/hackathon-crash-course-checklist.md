# Hackathon: tu checklist de la semana

Esto es lo que podés hacer **antes del sábado** para llegar con el entorno listo y la cabeza clara. Todo lo que dependa del proyecto se hace desde las 9:00, no antes.

> Crash course: "Cómo competir en una hackathon (y sobrevivir en el intento)" — Alejandro Repetto

## Lo primero: entorno sí, repo no

HackaTwin no permite traer nada armado del proyecto. La línea:

| Antes del sábado (permitido) | Desde las 9:00 (cero) |
|------------------------------|-----------------------|
| **Entorno:** cuentas (Supabase, Grok Bot, Cursor), créditos, MCP, Gentle AI / Engram, skills globales | **El repo:** AGENTS.md, spec, código |
| **Cabeza:** filtro de ideas, plantilla de pitch, esqueleto de AGENTS.md de memoria | Todo lo específico del proyecto |

> **Confirmalo con los organizadores.** Esta tabla es mi lectura de la regla. Si tenés dudas sobre algo puntual (por ejemplo, tus skills globales), preguntales antes del sábado.

<!-- PENDIENTE (Ale): confirmar con Cande que el entorno personal cuenta como tooling permitido. Hasta que esté confirmado, mantener el aviso de arriba. -->

## Checklist de la semana

- [ ] **Instalar Gentle AI** (memoria con Engram + flujo SDD)
- [ ] **Probar Engram y SDD en cualquier repo** que no sea el de la hack (uno tuyo, uno de práctica)
- [ ] **Crear las cuentas:** Supabase, Grok Bot, Cursor
- [ ] **Cargar el template del Grok Bot** "Chief of Staff de hack" (el link al template va con el QR)
<!-- Ale: reemplazar por el link compartible del template cuando esté cargado en Grok Bot. Fuente: hackathon/grok-bot-chief-of-staff.md -->
- [ ] **Conocer a tu equipo** (ver abajo, 3 preguntas)
- [ ] **Practicar el filtro de 5** con 3 ideas inventadas (sin elegir ninguna para el sábado)
- [ ] **Escribir de memoria el esqueleto de AGENTS.md** (ver abajo)

### Instalar Gentle AI

```bash
# macOS (Homebrew)
brew install gentleman-programming/tap/gentle-ai

# macOS / Linux (curl)
curl -fsSL https://raw.githubusercontent.com/Gentleman-Programming/gentle-ai/main/scripts/install.sh | bash

# Windows (PowerShell): requiere Go
go install github.com/gentleman-programming/gentle-ai/v4/cmd/gentle-ai@v4.1.1
```

<!-- VERIFICAR: comandos tomados del README de https://github.com/Gentleman-Programming/gentle-ai (consulta del 2026-10-14). Confirmar el tag exacto de `go install` (@v4.1.1) y la versión mínima de Go contra el README actual, porque la máquina de Ale tiene gentle-ai 1.42.0 instalado por Scoop. Probar en una máquina limpia de Windows y de Mac. -->

Después:

```bash
gentle-ai          # te guía: elegís agentes, componentes y persona
gentle-ai doctor   # chequeo de salud; solo lee, no cambia nada
```

### Probar Engram y SDD en cualquier repo

1. Abrí un repo que no importe (uno tuyo viejo, o cualquier repo de práctica).
2. En tu agente (por ejemplo Cursor), pedí una feature chica con `/sdd-new <nombre-del-cambio>`.
3. Cerrá el chat. Abrí uno nuevo y preguntale qué decidieron. Si lo recuerda, Engram funciona.

### Conocer a tu equipo: 3 preguntas

Hacéselas a cada persona. Anotá las respuestas, que son las que ordenan el reparto del sábado:

1. **¿En qué sos fuerte?** (qué te sale rápido y bien)
2. **¿En qué sos débil?** (qué te cuesta o no querés hacer)
3. **¿Qué querés sacar de la hack?** (aprender algo, ganar, networking, terminar algo)

> Ownership, no roles fijos: todos tocan todo, pero cada tarea tiene un dueño. Con estas tres respuestas, el reparto del sábado ya está medio hecho.

## Filtro de 5

Pasá cada idea por las cinco. Si falla una, no la hagas.

| Pregunta | Mata si... |
|----------|-----------|
| ¿Duele? | Nadie tiene ese problema |
| ¿Se ve? | No hay un momento wow en 3 min |
| ¿Se termina? | No entra en ~6 h reales de código |
| ¿Sobrevive? | Depende de una sola API o doc que se puede romper |
| ¿El track tiene sentido? | El track está pegado por el premio. Multi-track coherente = maximizar premios, válido |

Después, **triage por wow:** matriz visibilidad × riesgo. Primero lo visible y seguro. Lo que no se ve, se simplifica o se mockea, y si el jurado pregunta, se dice.

## Plantilla de pitch (5 partes, 3 minutos)

| Parte | Qué | Regla |
|-------|-----|-------|
| Problema | Que duela, con una persona concreta | ~20 seg |
| Solución | La demo, no slides | El wow elegido en el triage |
| Por qué nosotros | Este equipo, este problema | Una línea por persona, máximo |
| Impacto futuro | Hacia dónde va | Lo que no cabía en la hora 3 |
| CTA | Qué piden | Una sola cosa |

- Quién pitchea es una decisión de liderazgo: el mejor orador, quien más lo necesita, o 1–2 personas. No más.
- Practicalo 3 veces antes de las 18:00, en voz alta y con cronómetro.

## Esqueleto de AGENTS.md (de memoria)

Sabelo de memoria. El sábado, 9:05, es tu **primer commit**. Cada sección, corta: una o dos líneas.

```markdown
# AGENTS.md

## Qué es       <!-- una línea: el proyecto y para quién -->
## Cómo se trabaja   <!-- convenciones, estructura de carpetas -->
## Qué sí puede hacer el agente
## Qué no puede hacer   <!-- lo que no se toca, lo que no se inventa -->
## Verificación   <!-- el comando que corre una persona antes de dar algo por hecho -->
## Contexto que debe usar   <!-- la spec de 1 página, en qué orden leer -->
```

> Un chat nuevo arranca leyendo esto. Si no está escrito en el repo, el agente no lo sabe.

## Después del sábado a las 9:00

- [ ] 9:05, primer commit: `AGENTS.md`
- [ ] Spec de 1 página: qué se tiene que ver en los 3 minutos de demo
- [ ] Un dueño por tarea
- [ ] Algo feo que anda le gana a algo hermoso a medias
