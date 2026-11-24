"""RAG mínimo y legible: docs/ -> chunks -> embeddings -> Chroma -> respuesta con citas.

Uso:
  python rag.py indexar
  python rag.py preguntar "Qué mide el riesgo país?"

Embeddings: el modelo por defecto de Chroma (all-MiniLM-L6-v2, local, sin API key).
Respuesta: si hay OPENAI_API_KEY, un LLM redacta usando SOLO los fragmentos y cita [n].
Sin key, muestra los fragmentos recuperados con su cita (modo "solo recuperación").
"""
import os, re, sys, pathlib, json, urllib.request
import chromadb

DOCS = pathlib.Path(__file__).parent / "docs"
DB = pathlib.Path(__file__).parent / ".chroma"
CHUNK, OVERLAP, TOP_K = 800, 150, 4

def fuente(texto: str, archivo: str) -> str:
    m = re.search(r"^Fuente: (\S+)", texto, re.M)
    return m.group(1) if m else archivo

def trocear(texto: str):
    """Corta en ventanas de ~CHUNK caracteres con solapamiento, respetando párrafos."""
    parrafos, actual, out = [p.strip() for p in texto.split("\n\n") if p.strip()], "", []
    for p in parrafos:
        if len(actual) + len(p) > CHUNK and actual:
            out.append(actual); actual = actual[-OVERLAP:]
        actual += "\n\n" + p
    if actual.strip(): out.append(actual)
    return out

def coleccion():
    return chromadb.PersistentClient(path=str(DB)).get_or_create_collection("docs")

def indexar():
    col = coleccion()
    ids, textos, metas = [], [], []
    for f in sorted(DOCS.glob("*.md")) + sorted(DOCS.glob("*.txt")):
        t = f.read_text(encoding="utf-8")
        for i, c in enumerate(trocear(t)):
            ids.append(f"{f.stem}-{i}"); textos.append(c)
            metas.append({"archivo": f.name, "fuente": fuente(t, f.name), "chunk": i})
    col.upsert(ids=ids, documents=textos, metadatas=metas)
    print(f"Indexados {len(ids)} fragmentos de {len({m['archivo'] for m in metas})} archivos.")

def llm(pregunta, frags):
    ctx = "\n\n".join(f"[{i+1}] ({m['archivo']})\n{d}" for i, (d, m) in enumerate(frags))
    body = {"model": os.getenv("OPENAI_MODEL", "gpt-4o-mini"), "messages": [
        {"role": "system", "content": "Respondé en español usando SOLO los fragmentos. Citá cada afirmación con [n]. Si no está en los fragmentos, decí que no lo sabés."},
        {"role": "user", "content": f"Fragmentos:\n{ctx}\n\nPregunta: {pregunta}"}]}
    req = urllib.request.Request(os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1") + "/chat/completions",
        data=json.dumps(body).encode(), headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}", "Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req, timeout=60))["choices"][0]["message"]["content"]

def preguntar(pregunta):
    r = coleccion().query(query_texts=[pregunta], n_results=TOP_K)
    frags = list(zip(r["documents"][0], r["metadatas"][0]))
    if os.getenv("OPENAI_API_KEY"):
        print(llm(pregunta, frags), "\n")
    else:
        print("(Sin OPENAI_API_KEY: modo solo recuperación)\n")
    for i, ((d, m), dist) in enumerate(zip(frags, r["distances"][0])):
        print(f"[{i+1}] {m['archivo']} · fragmento {m['chunk']} · distancia {dist:.3f}\n    {m['fuente']}")
        print("    " + d.strip().replace("\n", " ")[:300] + "...\n")

if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "indexar": indexar()
    elif len(sys.argv) >= 3 and sys.argv[1] == "preguntar": preguntar(" ".join(sys.argv[2:]))
    else: print(__doc__)
