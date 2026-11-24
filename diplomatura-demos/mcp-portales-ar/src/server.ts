import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const TIMEOUT_MS = 10_000;
const CACHE_TTL_MS = 60_000;
const cache = new Map<string, { at: number; data: unknown }>();

/** GET JSON con timeout y cache en memoria (60 s). */
async function getJson(url: string): Promise<unknown> {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.data;
  let res: Response;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { accept: "application/json" } });
  } catch (e) {
    const msg = (e as Error).name === "TimeoutError" ? `timeout de ${TIMEOUT_MS / 1000}s` : (e as Error).message;
    throw new Error(`No se pudo consultar ${new URL(url).host}: ${msg}`);
  }
  if (!res.ok) throw new Error(`${new URL(url).host} respondió HTTP ${res.status} para ${url}`);
  const data = await res.json();
  cache.set(url, { at: Date.now(), data });
  return data;
}

function ok(data: unknown, fuente: string) {
  return { content: [{ type: "text" as const, text: JSON.stringify({ fuente, datos: data }, null, 2) }] };
}
function fail(e: unknown) {
  return { isError: true, content: [{ type: "text" as const, text: `Error: ${(e as Error).message}` }] };
}
async function run(url: string, fuente: string, map: (d: any) => unknown = (d) => d) {
  try { return ok(map(await getJson(url)), fuente); } catch (e) { return fail(e); }
}

const CASAS = ["oficial", "blue", "bolsa", "contadoconliqui", "tarjeta", "cripto", "mayorista"] as const;
const MONEDAS = ["usd", "eur", "brl", "clp", "uyu"] as const;

export function createServer() {
  const server = new McpServer({ name: "mcp-portales-ar", version: "0.1.0" });

  server.registerTool("dolar_cotizacion", {
    title: "Cotización del dólar",
    description: "Compra y venta del dólar en Argentina. casa: oficial, blue, bolsa (MEP), contadoconliqui (CCL), tarjeta, cripto, mayorista. Sin casa devuelve todas.",
    inputSchema: { casa: z.enum(CASAS).optional() },
  }, async ({ casa }) => run(`https://dolarapi.com/v1/dolares${casa ? `/${casa}` : ""}`, "dolarapi.com"));

  server.registerTool("cotizacion_moneda", {
    title: "Cotización de otras monedas",
    description: "Compra y venta en pesos de USD, EUR, BRL, CLP o UYU (oficial). Sin moneda devuelve todas.",
    inputSchema: { moneda: z.enum(MONEDAS).optional() },
  }, async ({ moneda }) => run(`https://dolarapi.com/v1/cotizaciones${moneda ? `/${moneda}` : ""}`, "dolarapi.com"));

  server.registerTool("riesgo_pais", {
    title: "Riesgo país",
    description: "Último valor del riesgo país de Argentina (puntos básicos).",
    inputSchema: {},
  }, async () => run("https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo", "argentinadatos.com"));

  server.registerTool("inflacion_mensual", {
    title: "Inflación mensual",
    description: "Inflación mensual (% de variación del IPC) de los últimos N meses.",
    inputSchema: { meses: z.number().int().min(1).max(60).default(12) },
  }, async ({ meses }) => run("https://api.argentinadatos.com/v1/finanzas/indices/inflacion", "argentinadatos.com", (d: any[]) => d.slice(-meses)));

  server.registerTool("bcra_buscar_variable", {
    title: "Buscar variable del BCRA",
    description: "Busca variables monetarias del BCRA (API pública Estadísticas v4.0) por texto, p. ej. 'reservas', 'base monetaria', 'badlar'. Devuelve id y último valor.",
    inputSchema: { texto: z.string().min(2), max: z.number().int().min(1).max(20).default(5) },
  }, async ({ texto, max }) => run("https://api.bcra.gob.ar/estadisticas/v4.0/monetarias?limit=3000", "api.bcra.gob.ar", (d: any) =>
    d.results.filter((v: any) => v.descripcion.toLowerCase().includes(texto.toLowerCase())).slice(0, max)
      .map((v: any) => ({ id: v.idVariable, descripcion: v.descripcion, unidad: v.unidadExpresion, ultimaFecha: v.ultFechaInformada, ultimoValor: v.ultValorInformado }))));

  server.registerTool("bcra_serie", {
    title: "Serie de una variable del BCRA",
    description: "Últimos N valores de una variable del BCRA por id (usar bcra_buscar_variable para encontrar el id; 1 = Reservas internacionales).",
    inputSchema: { id: z.number().int().positive(), n: z.number().int().min(1).max(100).default(10) },
  }, async ({ id, n }) => run(`https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/${id}?limit=${n}`, "api.bcra.gob.ar", (d: any) => d.results?.[0]?.detalle ?? d));

  server.registerTool("cripto_precio", {
    title: "Precio de criptomonedas",
    description: "Precio actual en USD y ARS desde CoinGecko (API pública). ids de CoinGecko separados por coma: bitcoin, ethereum, tether, solana...",
    inputSchema: { ids: z.string().regex(/^[a-z0-9-]+(,[a-z0-9-]+)*$/).default("bitcoin,ethereum") },
  }, async ({ ids }) => run(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,ars&include_24hr_change=true`, "coingecko.com"));

  return server;
}
