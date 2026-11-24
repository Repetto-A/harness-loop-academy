# RAG en vivo (mínimo)

`docs/` -> fragmentos de ~800 caracteres -> embeddings locales (modelo por defecto de Chroma, all-MiniLM-L6-v2) -> Chroma en disco -> respuesta con citas.

```bash
pip install chromadb
python rag.py indexar
python rag.py preguntar "Qué mide el riesgo país?"
# opcional: export OPENAI_API_KEY=... para que un LLM redacte la respuesta citando [n]
```

Sin API key funciona en modo "solo recuperación": muestra los fragmentos y su fuente. Sirve para mostrar que el RAG es, antes que nada, buscar bien.

Los documentos de ejemplo son artículos de Wikipedia en español (CC BY-SA 4.0) descargados el 21/10/2026; cada archivo tiene su URL. Para la clase, reemplazalos por documentos propios del rubro de los alumnos (con permiso y sin datos personales).

Ejemplo real: `salida-ejemplo.txt`.

Nota: el modelo de embeddings por defecto está entrenado principalmente en inglés; en español recupera, pero con distancias altas. Para producción conviene un modelo multilingüe.

## Alternativa sin código

- **NotebookLM** (Google; su ayuda ahora lo nombra "Gemini Notebook"): subís fuentes y responde solo con ellas, con citas clickeables al pasaje. Cuenta gratis: 50 fuentes por notebook, hasta 500.000 palabras o 200 MB por fuente. https://support.google.com/notebooklm/answer/14276569 , https://support.google.com/notebooklm/answer/16269187
- **Claude Projects** o un **GPT personalizado**: subir archivos como conocimiento del proyecto. No verifiqué hoy sus límites actuales; revisar en la ayuda de cada producto antes de la clase.
