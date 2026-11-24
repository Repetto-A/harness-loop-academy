"""Fine-tuning LoRA en CPU (o GPU si hay CUDA). Guarda el adaptador en salida/lora."""
import json, time, torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import LoraConfig, get_peft_model
from comun import MODEL_ID, mensajes

EPOCHS, LR = 3, 2e-4
dev = "cuda" if torch.cuda.is_available() else "cpu"
tok = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForCausalLM.from_pretrained(MODEL_ID, dtype=torch.float32).to(dev)
model = get_peft_model(model, LoraConfig(r=8, lora_alpha=16, lora_dropout=0.05, target_modules=["q_proj", "k_proj", "v_proj", "o_proj"], task_type="CAUSAL_LM"))
model.print_trainable_parameters()

rows = [json.loads(l) for l in open("data/train.jsonl", encoding="utf-8")]
def encode(r):
    prompt = tok.apply_chat_template(mensajes(r["mail"]), tokenize=False, add_generation_prompt=True)
    full = tok.apply_chat_template(mensajes(r["mail"], r["ficha"]), tokenize=False)
    p, f = tok(prompt)["input_ids"], tok(full)["input_ids"]
    labels = [-100] * len(p) + f[len(p):]  # solo aprende la respuesta
    return torch.tensor([f]), torch.tensor([labels])
data = [encode(r) for r in rows]

opt = torch.optim.AdamW([p for p in model.parameters() if p.requires_grad], lr=LR)
model.train(); t0 = time.time()
for ep in range(EPOCHS):
    total = 0.0
    for ids, labels in data:
        loss = model(input_ids=ids.to(dev), labels=labels.to(dev)).loss
        loss.backward(); opt.step(); opt.zero_grad(); total += loss.item()
    print(f"época {ep+1}/{EPOCHS} · loss promedio {total/len(data):.3f} · {time.time()-t0:.0f}s")
model.save_pretrained("salida/lora")
print(f"Listo en {time.time()-t0:.0f}s ({dev}). Adaptador en salida/lora")
