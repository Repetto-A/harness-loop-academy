"""Mismos prompts de prueba, antes (modelo base) y después (base + LoRA). Guarda salida/comparacion.md"""
import json, torch, pathlib
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
from comun import MODEL_ID, mensajes

tok = AutoTokenizer.from_pretrained(MODEL_ID)
base = AutoModelForCausalLM.from_pretrained(MODEL_ID, dtype=torch.float32)
tests = [json.loads(l) for l in open("data/test.jsonl", encoding="utf-8")]

def generar(model, mail):
    texto = tok.apply_chat_template(mensajes(mail), tokenize=False, add_generation_prompt=True)
    ids = tok(texto, return_tensors="pt")["input_ids"]
    with torch.no_grad():
        out = model.generate(ids, max_new_tokens=120, do_sample=False)
    return tok.decode(out[0][ids.shape[1]:], skip_special_tokens=True).strip()

antes = [generar(base, t["mail"]) for t in tests]
lora = PeftModel.from_pretrained(base, "salida/lora")
despues = [generar(lora, t["mail"]) for t in tests]

md = ["# Antes vs después (datos de ejemplo)\n", f"Modelo: {MODEL_ID}\n"]
for t, a, d in zip(tests, antes, despues):
    md += [f"## Mail\n\n> {t['mail']}\n", f"### Antes\n\n```\n{a}\n```\n", f"### Después\n\n```\n{d}\n```\n", f"### Esperado\n\n```\n{t['ficha']}\n```\n"]
pathlib.Path("salida").mkdir(exist_ok=True)
pathlib.Path("salida/comparacion.md").write_text("\n".join(md), encoding="utf-8")
print("\n".join(md))
