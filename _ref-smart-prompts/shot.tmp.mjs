import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = b.contexts()[0]; const p = await ctx.newPage();
await p.setViewportSize({ width: 1440, height: 1000 });
await p.goto("http://localhost:8080/", { waitUntil: "networkidle" });
await p.screenshot({ path: "/home/ubuntu/grid.png", fullPage: true });
await p.getByRole("button", { name: "Claude Architect" }).click();
await p.screenshot({ path: "/home/ubuntu/grid-filtro.png" });
for (const r of ["/sesion-02-itp","/hackatwin","/ucel-flujo","/prompts-apis-01","/diplomatura-rag-mcp","/ads-clase-invertida"]) {
  const errs=[]; p.removeAllListeners("pageerror"); p.on("pageerror", e=>errs.push(e.message));
  await p.goto("http://localhost:8080"+r,{waitUntil:"networkidle"}); console.log(r, errs.length?errs:"ok");
}
await p.goto("http://localhost:8080/sesion-02-itp",{waitUntil:"networkidle"}); await p.screenshot({ path: "/home/ubuntu/itp.png" });
await p.close();
