# Modelos por tarea — referencia 2026

**Módulo 6** | Actualizable sin regrabar el video completo

> Los nombres cambian rápido. Usá esta tabla como **marco de decisión**, no como lista cerrada.

## Por tipo de tarea

| Tarea | Local (Ollama) | API / managed | Notas |
|-------|----------------|---------------|-------|
| Coding acotado (un archivo, test, refactor) | Qwen2.5-Coder 7B–14B, DeepSeek-Coder | Claude Sonnet, GPT-4.1 | Local: datos sensibles, iteración rápida |
| Razonamiento / plan multi-paso | DeepSeek-R1 (si entra en VRAM) | o1, Claude Opus, GPT reasoning | Local R1 exige GPU seria |
| Clasificación / extracción JSON | Qwen 7B, Llama 3.x 8B | Modelos pequeños en API | Golden set obligatorio |
| Chat general / docs | Llama 3.x, Mistral | Cualquier frontera | Local para borradores |
| Agent en repo grande | Limitado en local | Cursor Agent + frontera | OSS local = tareas acotadas |

## DeepSeek — cuándo tiene sentido

- **Open weights / API:** buen costo-rendimiento en coding y razonamiento (2025–2026).
- **Local:** solo si tu hardware aguanta el tamaño del checkpoint.
- **No asumir:** que OSS reemplaza agentes complejos en monorepos grandes.

## Qwen — cuándo tiene sentido

- **Coder variants:** fuerte en código con pocos GB de VRAM.
- **Multilingüe:** útil si mezclás español/inglés en prompts y datos.

## Llama (Meta) — cuándo tiene sentido

- Ecosistema maduro en Ollama; buen default si no sabés por dónde empezar.
- Versiones más chicas (8B) para laptops; 70B+ para estaciones de trabajo.

## Matriz rápida

| Criterio | Priorizá local | Priorizá API frontera |
|----------|----------------|---------------------|
| Datos no pueden salir | ✓ | |
| Repo grande + Agent | | ✓ |
| Presupuesto API limitado | ✓ (con evaluación) | |
| Necesitás máxima calidad ya | | ✓ |
| Volumen alto batch offline | ✓ | Depende costo |

## Links

- [Ollama library](https://ollama.com/library)
- [Hugging Face — DeepSeek](https://huggingface.co/deepseek-ai)
- [Hugging Face — Qwen](https://huggingface.co/Qwen)
