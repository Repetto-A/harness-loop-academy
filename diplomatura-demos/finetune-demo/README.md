# Fine-tuning local (LoRA) en una notebook

Demo: enseñarle a un modelo chico a convertir mails informales de clientes en una **ficha con formato fijo** para un estudio contable o jurídico. Es una tarea de estilo y formato, que es para lo que sirve el fine-tuning.

> Los datos de `data/` son **datos de ejemplo inventados** (los genera `preparar.py`). No son clientes reales.

- Modelo: `Qwen/Qwen2.5-0.5B-Instruct` (Hugging Face, licencia Apache 2.0, archivo de pesos de ~988 MB). https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct
- Técnica: LoRA con `transformers` + `peft`. Se entrenan ~1,1 millones de parámetros (0,22% del modelo). El adaptador final pesa ~4 MB.
- Corre en CPU. Si la notebook tiene GPU NVIDIA con CUDA, la usa sola.

## Windows: paso a paso (PowerShell)

Necesitás Python 3.10 o más (https://www.python.org/downloads/, tildá "Add python.exe to PATH").

```powershell
cd finetune-demo
python -m venv .venv
.\.venv\Scripts\Activate.ps1
# Si PowerShell bloquea el script: Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt
python preparar.py      # 60 pares de ejemplo + 4 de prueba
python entrenar.py      # entrena y guarda salida\lora
python comparar.py      # antes vs después -> salida\comparacion.md
```

GPU NVIDIA (opcional): en vez de la línea de torch para CPU, usá el comando que da https://pytorch.org/get-started/locally/ para tu versión de CUDA. Para saber si tenés: `nvidia-smi` en PowerShell; si no existe el comando, no hay GPU NVIDIA y queda en CPU.

## Tiempos reales (medidos en el box, 21/10/2026)

Linux, 8 núcleos de CPU, sin GPU, ~3 GB de RAM libres:

- `entrenar.py`: 1 min 48 s en total (94 s de entrenamiento, 3 épocas sobre 60 ejemplos). Loss: 1,210 → 0,414 → 0,155.
- `comparar.py`: 27 s para 4 prompts antes y después.
- La primera vez se suma la descarga del modelo (~1 GB).

En una notebook con menos núcleos puede tardar varias veces más. No lo medí en Windows.

## Qué esperar

Ver `salida/comparacion.md`. Antes: el modelo contesta como chatbot y pide más datos. Después: respeta el formato de seis campos en los cuatro casos de prueba. Pero **inventa contenido** cuando el caso no estaba en los datos (por ejemplo "Recibos y recibos" en vez de "Copia de la carta documento"). Esa es la lección: el fine-tuning enseña la forma, no los hechos.

## Cuándo conviene

| Necesito... | Usá |
|---|---|
| Que siga instrucciones o un formato, con pocos ejemplos | **Prompt** con 2 o 3 ejemplos (few-shot). Probá esto primero. |
| Que responda con mis documentos y cite | **RAG** (ver `../rag-demo`). |
| El mismo formato o estilo miles de veces, con un modelo chico, barato o local | **Fine-tuning**. |
| Que "sepa" datos nuevos | No fine-tuning: RAG. |

## Tip para alumnos

Pueden pedirle a una IA (ChatGPT, Claude, Grok Bot, Copilot) que haga cada paso con ustedes: "ayudame a crear un venv en Windows", "explicame este error", "generá 60 ejemplos de mails informales y su ficha". Pero lean y prueben lo que les da.
