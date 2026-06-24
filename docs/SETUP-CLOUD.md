# Setup — GitHub + Cursor Cloud Agents

Pasos para retomar trabajo con la PC apagada o desde otra máquina.

## 1. Push a GitHub

```powershell
cd harness-loop-academy
git add -A
git commit -m "Academy: programa 2 clases Copilot-first"
git push -u origin master
```

Si el repo no existe en GitHub:

```powershell
gh repo create harness-loop-academy --public --source=. --remote=origin --push
```

## 2. Vincular en Cursor Dashboard

1. Ir a [cursor.com/dashboard](https://cursor.com/dashboard).
2. **Settings** → **Cloud Agents** (o **Background Agents**).
3. Conectar la cuenta de GitHub y autorizar el repo `harness-loop-academy`.
4. Abrir un nuevo Cloud Agent contra ese repo.

## 3. Retomar la auditoría / implementación

En un chat nuevo (local o cloud):

```text
Continuá la implementación del programa 2 clases Copilot-first en harness-loop-academy.
Revisá README, class-scripts, decks y demos SDD.
```

## Notas

- Cloud Agents requieren plan que incluya la feature y repo en GitHub.
- Los alumnos **no** necesitan Cloud Agents; solo Copilot en su IDE.
- `_ref-smart-prompts/node_modules` no debe commitearse; correr `npm install` localmente.
