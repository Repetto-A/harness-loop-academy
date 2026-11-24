import os
MODEL_ID = os.getenv("MODEL_ID", "Qwen/Qwen2.5-0.5B-Instruct")
SYSTEM = "Convertí el mail del cliente en una ficha para el estudio."

def mensajes(mail, ficha=None):
    m = [{"role": "system", "content": SYSTEM}, {"role": "user", "content": mail}]
    if ficha is not None: m.append({"role": "assistant", "content": ficha})
    return m
