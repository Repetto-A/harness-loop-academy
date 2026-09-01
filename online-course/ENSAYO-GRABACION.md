# Ensayo y grabación — Módulos 8, 6 y 9

Checklist operativo antes de grabar. Orden recomendado: **M8 → M6 → M9**.

## Pre-flight (una vez)

- [ ] Node 20+, `npm install` en `_ref-smart-prompts` y `starter/harnessed-app`
- [ ] Cursor actualizado; Ollama instalado con modelos precargados:
  - `ollama pull qwen2.5-coder:7b` (demo laptop modesta)
  - Opcional: `deepseek-r1` o equivalente según VRAM
- [ ] Cursor → Settings → Models → Ollama en `http://localhost:11434`
- [ ] Micrófono, OBS o herramienta de captura, resolución 1920×1080
- [ ] Cerrar notificaciones; modo No molestar

## Ensayo cronometrado (1× por módulo)

| Módulo | Meta | Guion | Slides |
|--------|------|-------|--------|
| M8 | ~50 min | `modulos/modulo-08-cursor/GUION-GRABACION.md` | `/mod-08` |
| M6 | ~50 min | `modulos/modulo-06-deepseek-oss/GUION-GRABACION.md` | `/mod-06` |
| M9 | ~50 min | `modulos/modulo-09-arquitecturas/GUION-GRABACION.md` | `/mod-09` |

Durante el ensayo:

1. Cronometrar cada bloque del guion (tabla minuto a minuto).
2. Si te pasás >3 min, recortar speaker notes o acortar demo.
3. Probar **plan B** de cada demo (comandos en `demo-*.md`).
4. Anotar índices de slide donde hacer jump-cut si el Agent tarda.

## Grabación

### M8 — Cursor AI

- [ ] Abrir `starter/harnessed-app` en Cursor
- [ ] Slides en `/mod-08` (presenter mode **P**)
- [ ] Demo: prompt de `instructor-demos/DEMO-CLASE1-WOW.md` (mitad harnessed)
- [ ] Mostrar: rules, skill, `npm run validate:closeout`

### M6 — DeepSeek y Open Source

- [ ] Intro: “en M8 vimos el harness; hoy el **modelo** local”
- [ ] Slides `/mod-06`
- [ ] Terminal: `ollama list`, `ollama run`
- [ ] Cursor con `qwen2.5-coder:7b` sobre `harnessed-app`
- [ ] Contraste 1 min con modelo frontera (opcional)

### M9 — Arquitecturas (cierre del curso corporativo)

- [ ] Slides `/mod-09` (codebase intelligence + MCP + workflow)
- [ ] Demo MCP A: **codebase-memory-mcp** — index + consulta impacto (`demo-mcp-workflow.md`)
- [ ] Demo MCP B: **Engram** — mem_search / mem_save boot sequence
- [ ] Workflow Git: branch → spec.md → agent → validate → commit (SDD lite, 2–3 min oral)
- [ ] Opcional: mención Gentle AI 30 s–2 min (solo si instructor lo tiene)

## Post-producción

Con dev server en `http://localhost:8080`:

```bash
cd _ref-smart-prompts
node scripts/export-mod-08-pdf.mjs
node scripts/export-mod-06-pdf.mjs
node scripts/export-mod-09-pdf.mjs
```

Empaquetar recursos:

```powershell
cd online-course/scripts
.\package-recursos.ps1
```

Entregables en `online-course/exports/`:

- `modulo-06-deepseek-oss.pdf`
- `modulo-08-cursor.pdf`
- `modulo-09-arquitecturas.pdf`
- `recursos-modulo-06.zip`, `recursos-modulo-08.zip`, `recursos-modulo-09.zip`

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|------------|
| Agent lento | Pre-grabar terminal; jump-cut; branch con fix casi listo |
| codebase-memory index lento | Branch pre-indexado; Plan B en demo-mcp-workflow.md |
| Sin GPU | Modelo 7B precargado; advertir en slide setup |
| Ollama caído | `ollama serve` en otra terminal antes de grabar |
| Solapamiento M6/M8 | Decir explícito en intro de cada video |
