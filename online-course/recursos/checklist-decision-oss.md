# Checklist — Decisión de stack open source / local

**Módulo 6** | Ejercicio práctico | ~15 min

Completá antes de elegir un modelo local o API open weights.

## 1. Caso de uso

| Pregunta | Tu respuesta |
|----------|--------------|
| ¿Qué tarea querés automatizar? (ej. clasificar tickets, extraer campos JSON, refactor acotado) | |
| ¿Es batch o tiempo real? | |
| ¿Cuántas consultas por día estimás? | |

## 2. Datos y privacidad

| Pregunta | Tu respuesta |
|----------|--------------|
| ¿Los datos pueden salir de tu máquina/red? | Sí / No / Parcial |
| ¿Hay PII, secretos o código propietario? | |
| Si es parcial: ¿qué va local y qué a API frontera? | |

## 3. Riesgo y calidad

| Pregunta | Tu respuesta |
|----------|--------------|
| ¿Qué pasa si el modelo alucina? (impacto: bajo / medio / alto) | |
| ¿Tenés golden set o ejemplos para medir calidad? | |
| ¿Quién revisa la salida antes de producción? | |

## 4. Modelo elegido

| Campo | Valor |
|-------|-------|
| Modelo (ej. `qwen2.5-coder:7b`, DeepSeek vía API) | |
| Dónde corre (Ollama local, VPS, API managed) | |
| VRAM / RAM disponible | |
| IDE (Cursor + Ollama en Settings → Models) | |

## 5. Validación

- [ ] Corrí al menos 3 prompts representativos
- [ ] Comparé con un modelo frontera en 1 caso difícil
- [ ] Documenté cuándo **no** usar este modelo (límites)

## Entregable

Captura de pantalla: Cursor usando modelo local + una respuesta útil para tu caso.
