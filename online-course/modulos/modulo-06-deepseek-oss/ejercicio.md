# Ejercicio — Elegí tu stack local OSS (Módulo 6)

**Duración:** 15 min | **Autocorregible con checklist**

## Objetivo

Instalar Ollama, conectar Cursor o VS Code a un modelo local y documentar tu decisión con criterio (taxonomía + tarea, no solo el nombre del modelo).

## Pasos

1. Instalá Ollama y un modelo que entre en tu VRAM (empezá por `qwen2.5-coder:7b` o `llama3.2:3b`).
2. En Cursor (o VS Code con Continue / extensión Ollama): verificá el endpoint `http://localhost:11434`.
3. Completá [`checklist-decision-oss.md`](../../recursos/checklist-decision-oss.md).
4. Corré un prompt real de tu trabajo (coding o extracción JSON).

## Entregable

- Captura: Cursor con modelo local seleccionado
- Checklist completado (PDF o markdown)
- 2–3 líneas: cuándo **no** usarías este modelo

## Criterios de éxito

- [ ] `ollama list` muestra al menos un modelo
- [ ] Respuesta local coherente en tu caso de uso
- [ ] Identificaste al menos un límite del modelo local
