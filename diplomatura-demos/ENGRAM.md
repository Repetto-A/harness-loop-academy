# Qué es Engram (investigación 21/10/2026)

El nombre es ambiguo: hay varios proyectos de memoria para agentes llamados Engram.

1. **Gentleman-Programming/engram** (el más conocido, ~7.500 estrellas): memoria persistente para agentes de código. Un binario en Go con SQLite + FTS5, que expone MCP (stdio), API HTTP, CLI y TUI. Base local en `~/.engram/engram.db`. Funciona con Claude Code, OpenCode, Gemini CLI, Codex, VS Code (Copilot), Cursor, Windsurf, entre otros. Tools como `mem_save`, `mem_search`, `mem_context`. Licencia MIT. https://github.com/Gentleman-Programming/engram , https://engram.gentlemanprogramming.com/
2. edg-l/engram-mcp: MCP en Rust, memoria por rama de git con handoffs entre sesiones, embeddings locales. https://github.com/edg-l/engram-mcp
3. get-engram/engram: servicio hosteado (requiere API key) que guarda conversaciones completas con búsqueda semántica. https://github.com/get-engram/engram
4. jamjet-labs/engram-mcp-server: memoria como grafo de conocimiento temporal. https://github.com/jamjet-labs/engram-mcp-server
5. engram-memory/engram: implementación en Python. https://github.com/engram-memory/engram

Supongo que el que usa Alejandro es el 1 (su deck frisvy-03 lo describe como memoria local entre sesiones), pero hay que confirmarlo.
