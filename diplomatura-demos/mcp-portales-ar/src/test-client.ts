import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({ name: "test", version: "1.0.0" });
await client.connect(new StdioClientTransport({ command: "node", args: ["dist/index.js"] }));
const { tools } = await client.listTools();
console.log("TOOLS:", tools.map((t) => t.name).join(", "));
const calls: [string, Record<string, unknown>][] = [
  ["dolar_cotizacion", { casa: "blue" }], ["dolar_cotizacion", {}], ["cotizacion_moneda", { moneda: "eur" }],
  ["riesgo_pais", {}], ["inflacion_mensual", { meses: 3 }], ["bcra_buscar_variable", { texto: "reservas", max: 2 }],
  ["bcra_serie", { id: 1, n: 3 }], ["cripto_precio", { ids: "bitcoin,ethereum" }], ["dolar_cotizacion", { casa: "inexistente" }],
];
for (const [name, args] of calls) {
  const r: any = await client.callTool({ name, arguments: args });
  console.log(`\n### ${name} ${JSON.stringify(args)}${r.isError ? " (isError)" : ""}\n${r.content[0].text.slice(0, 700)}`);
}
await client.close();
