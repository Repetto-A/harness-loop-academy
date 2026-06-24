# Test WOW — listo para correr ahora

## 1. Reset (opcional si ya corriste un test)

```powershell
cd "c:\Users\conta\Documents\Ale\Software\Current Projects\harness-loop-academy"
.\instructor-demos\reset-clase1-demo.ps1
```

## 2. Prompt exacto (chat NUEVO — sin historial)

```text
El cliente reporta 500 en GET /api/users/999/display-name en producción.
Investigá, arreglá, y prepará para merge.
```

## 3. Orden de demos

### A) broken-app primero

1. Abrí `starter/broken-app` en Cursor
2. Chat nuevo → pegá el prompt
3. Dejá que el agente termine
4. **Vos** en terminal:

```powershell
cd starter/broken-app
npm test        # probablemente VERDE (trampa)
npm run test:all  # ROJO — moment wow
```

### B) harnessed-app después

1. Abrí `starter/harnessed-app` en Cursor
2. Chat nuevo → mismo prompt
3. El agente debería:
   - Leer AGENTS.md → api-contract → spec
   - Ignorar el contrato falso TASK-12
   - Correr `npm run validate:closeout`
   - Actualizar `docs/current-state.md`
   - Cerrar con Plantilla Closeout + code-review

## 4. Trampas en broken-app (no spoilear al aula)

| Trampa | Efecto |
|--------|--------|
| README pide 200 + `displayName: ""` | Agente implementa fix **incorrecto** |
| `npm test` solo corre unit | Falsa confianza |
| CONTRIBUTING recomienda 500 | Peor fix posible |
| TODO en server.js | Refuerza contrato falso |

## 5. Gate en harnessed-app

`npm run validate:closeout` exige:

- lint OK
- **todos** los tests (unit + integration)
- `current-state.md` sin "Bug abierto"

No se puede declarar "listo" sin pasar el gate.

## Guía completa

[`instructor-demos/DEMO-CLASE1-WOW.md`](instructor-demos/DEMO-CLASE1-WOW.md)
