# mcp-portales-ar

Servidor MCP con datos públicos de Argentina (sin API keys): dólar, otras monedas, riesgo país, inflación, BCRA y cripto.
Hecho con el SDK oficial `@modelcontextprotocol/sdk` (TypeScript), transporte stdio y, opcional, Streamable HTTP.

## Tools

| Tool | Qué devuelve | API |
|---|---|---|
| `dolar_cotizacion` | compra/venta: oficial, blue, bolsa (MEP), contadoconliqui (CCL), tarjeta, cripto, mayorista | https://dolarapi.com/v1/dolares |
| `cotizacion_moneda` | USD, EUR, BRL, CLP, UYU en pesos | https://dolarapi.com/v1/cotizaciones |
| `riesgo_pais` | último valor | https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo |
| `inflacion_mensual` | últimos N meses (%) | https://api.argentinadatos.com/v1/finanzas/indices/inflacion |
| `bcra_buscar_variable` | busca variables del BCRA por texto | https://api.bcra.gob.ar/estadisticas/v4.0/monetarias |
| `bcra_serie` | últimos N valores de una variable (id 1 = reservas) | https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/{id} |
| `cripto_precio` | precio USD/ARS y variación 24 h | https://api.coingecko.com/api/v3/simple/price |

Todas las APIs se verificaron con curl el 21/10/2026 (HTTP 200, sin key). Timeout 10 s, cache en memoria 60 s, errores claros (`isError`) y validación con Zod.

## Instalar

```bash
cd mcp-portales-ar
npm install
npm run build
npm test            # cliente MCP de prueba: llama a todas las tools
npm run inspector   # MCP Inspector en el navegador
```

Requiere Node 18 o más (se probó con Node 20).

## Conectarlo

Reemplazá `/RUTA/ABSOLUTA` por la carpeta donde lo clonaste.

**Claude Desktop** (`claude_desktop_config.json`; en Mac está en `~/Library/Application Support/Claude/`):

```json
{ "mcpServers": { "portales-ar": { "command": "node", "args": ["/RUTA/ABSOLUTA/mcp-portales-ar/dist/index.js"] } } }
```

Reiniciá Claude Desktop.

**Cursor** (`.cursor/mcp.json` en el proyecto o `~/.cursor/mcp.json` global; docs: https://cursor.com/docs/mcp):

```json
{ "mcpServers": { "portales-ar": { "command": "node", "args": ["/RUTA/ABSOLUTA/mcp-portales-ar/dist/index.js"] } } }
```

**VS Code / GitHub Copilot** (`.vscode/mcp.json`; ojo que la clave es `servers`; docs: https://code.visualstudio.com/docs/copilot/reference/mcp-configuration):

```json
{ "servers": { "portales-ar": { "type": "stdio", "command": "node", "args": ["/RUTA/ABSOLUTA/mcp-portales-ar/dist/index.js"] } } }
```

Después, en el chat de Copilot en modo Agent, habilitá las tools del server.

**Modo HTTP (opcional)**: `npm run start:http` levanta `http://127.0.0.1:3333/mcp` (Streamable HTTP, sin estado). En Cursor: `{ "mcpServers": { "portales-ar": { "url": "http://127.0.0.1:3333/mcp" } } }`.

## Salidas reales

Ver `test-output.txt` (stdio) y `http-test-output.txt` (HTTP), generadas el 21/10/2026.

## Límites

- Son APIs comunitarias o públicas sin SLA: pueden cambiar o caerse. Los datos son informativos, no asesoramiento financiero.
- CoinGecko público tiene límite de requests; la cache de 60 s ayuda.
