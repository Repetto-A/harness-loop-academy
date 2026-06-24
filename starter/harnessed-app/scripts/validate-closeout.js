#!/usr/bin/env node
/**
 * Gate de cierre — falla si el fix no está completo.
 * Parte del harness pedagógico: el agente NO puede declarar victoria sin esto.
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd: root, stdio: "inherit" });
}

console.log("=== validate:closeout ===\n");

run("npm run lint");
run("npx vitest run"); // suite COMPLETA — no la suite recortada de broken-app

const statePath = join(root, "docs/current-state.md");
const state = readFileSync(statePath, "utf8");

const bugStillOpen =
  /Bug abierto/i.test(state) ||
  /500 en ID inexistente/i.test(state) ||
  /Bug conocido \(#1\)/i.test(state);

if (bugStillOpen) {
  console.error("\n❌ CLOSEOUT FAIL: docs/current-state.md still marks bug #1 as open.");
  console.error("   Update current-state after fixing the display-name 404 bug.\n");
  process.exit(1);
}

console.log("\n✅ validate:closeout OK — safe to declare done.\n");
