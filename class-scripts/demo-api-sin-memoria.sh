#!/usr/bin/env bash
# Demo: the model API has no memory and no harness.
# Requires Ollama running locally and: ollama pull qwen2.5:1.5b
# Run from Git Bash: bash class-scripts/demo-api-sin-memoria.sh

MODEL="${MODEL:-qwen2.5:1.5b}"
URL="http://localhost:11434/api/chat"

pause() { echo; read -r -p "[Enter para seguir]" _; echo; }

call() {
  echo ">>> Request:"
  echo "$1" | python -m json.tool --no-ensure-ascii
  curl -s "$URL" -d "$1" | python -c "
import sys, json
d = json.load(sys.stdin)
print('<<< Respuesta:', d['message']['content'])
print('    tokens entrada:', d.get('prompt_eval_count'), '| salida:', d.get('eval_count'))
"
}

echo "=== 0. Lo que el runtime agrega solo: system prompt y plantilla ==="
echo "System por defecto:"
ollama show "$MODEL" --system
echo
echo "Plantilla (cómo se arma el texto que lee el modelo, tools incluidas):"
ollama show "$MODEL" --template | head -20
pause

echo "=== 1. Llamada nueva, sin historial ==="
call '{"model":"'"$MODEL"'","stream":false,"messages":[
  {"role":"user","content":"¿Cuál es mi nombre? Respondé solo el nombre."}
]}'
pause

echo "=== 2. Misma pregunta, mandando el historial ==="
call '{"model":"'"$MODEL"'","stream":false,"messages":[
  {"role":"user","content":"Hola, mi nombre es Alejandro."},
  {"role":"assistant","content":"¡Hola Alejandro! ¿En qué te ayudo?"},
  {"role":"user","content":"¿Cuál es mi nombre? Respondé solo el nombre."}
]}'
echo
echo "La memoria no está en el modelo: está en lo que le mandás. Y cada turno cuesta más tokens."
