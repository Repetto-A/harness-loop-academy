# Generación aumentada por recuperación

Fuente: https://es.wikipedia.org/wiki/Generaci%C3%B3n_aumentada_por_recuperaci%C3%B3n (Wikipedia, CC BY-SA 4.0, descargado 2026-10-21)

La generación aumentada por recuperación (conocido comúnmente como RAG, siglas en inglés para Retrieval Augmented Generation) es una técnica que permite a los grandes modelos lingüísticos (LLM) recuperar e incorporar nueva información. ​ Con el RAG, los modelos de lenguaje (LLMs) no responden a las consultas de los usuarios hasta que consultan un conjunto específico de documentos. Estos documentos complementan la información de los datos de entrenamiento preexistentes del LLM ​ y les permite utilizar información específica del dominio o actualizada que no está disponible en los datos de entrenamiento. ​ ​ Por ejemplo, esto ayuda a los chatbots basados en LLM a acceder a datos internos de la empresa o a generar respuestas basadas en fuentes fiables.
Un RAG mejora los grandes modelos lingüísticos (LLM) al incorporar la recuperación de información antes de generar respuestas. ​ A diferencia de los LLM tradicionales, que dependen de datos de entrenamiento estáticos, RAG extrae texto relevante de bases de datos, documentos subidos o fuentes web.​ Según Ars Technica, «El RAG es una forma de mejorar el rendimiento de los LLM, en esencia, combinando el proceso de LLM con una búsqueda web u otro proceso de consulta de documentos para ayudar a los LLM a ceñirse a los hechos». Este método ayuda a reducir las alucinaciones de la IA, ​​ que han provocado que los chatbots describan políticas inexistentes o recomienden casos legales inexistentes a abogados que buscan citas para respaldar sus argumentos.​
El RAG también reduce la necesidad de reentrenar a los LLM con nuevos datos, lo que ahorra costos computacionales y financieros. ​ Además de mejorar la eficiencia, el RAG también permite a los LLM incluir fuentes en sus respuestas, para que los usuarios puedan verificar las fuentes citadas. Esto proporciona mayor transparencia, ya que los usuarios pueden cotejar el contenido recuperado para garantizar su precisión y relevancia.
El término RAG se introdujo por primera vez en un artículo de investigación de 2020 ​ de Meta . ​ ​


== Limitaciones de RAG y LLM ==
Los LLM pueden proporcionar información incorrecta. Por ejemplo, cuando Google presentó por primera vez su herramienta LLM, "Google Bard", esta proporcionó información incorrecta sobre el Telescopio Espacial James Webb . Este error contribuyó a una caída de 100 mil millones de dólares en el valor de las acciones de la compañía .​ Un RAG se utiliza para prevenir estos errores, pero no resuelve todos los problemas. Por ejemplo, los LLM pueden generar información errónea incluso al obtener información de fuentes objetivamente correctas si malinterpretan el contexto.​ MIT Technology Review ofrece el ejemplo de una respuesta generada por IA que afirma: "Estados Unidos ha tenido un presidente musulmán, Barack Hussein Obama". El modelo extrajo esta información de un libro académico titulado retóricamente Barack Hussein Obama: ¿El primer presidente musulmán de Estados Unidos? El LLM no "conocía" ni "entendía" el contexto del título, lo que generó una afirmación falsa.​
Los LLM con RAG están programados para priorizar la información nueva. Esta técnica se denomina "prompt stuffing". Sin estas indicaciones, el input al LLM la genera solo el usuario; con la inserción de indicaciones, se añade contexto relevante adicional a este input para guiar la respuesta del modelo. Este enfoque proporciona al LLM información clave al inicio del input, lo que le permite priorizar los datos proporcionados sobre el conocimiento de entrenamiento preexistente. ​


== Proceso ==
La generación aumentada por recuperación (en inglés, Retrieval-augmented generation, RAG) mejora los modelos lingüísticos extensos (en inglés, large languages models, LLM) al incorporar un mecanismo de recuperación de información que permite a los modelos acceder y utilizar datos adicionales a su conjunto de entrenamiento original. AWS afirma: «un RAG permite a los LLM recuperar información relevante de fuentes de datos externas para generar respuestas más precisas y contextualmente relevantes» («indexación»).​ Este enfoque reduce la dependencia de conjuntos de datos estáticos, que pueden quedar obsoletos rápidamente. Cuando un usuario realiza una consulta, el RAG utiliza un recuperador de documentos para buscar contenido relevante en las fuentes disponibles antes de incorporar la información recuperada en la respuesta del modelo («recuperación»).​ Ars Technica señala que «cuando se dispone de nueva información, en lugar de tener que volver a entrenar el modelo, basta con aumentar la base de conocimiento externa del modelo con la información actualizada» («aumento»).​ Al integrar dinámicamente datos relevantes, el RAG permite a los LLM generar respuestas más informadas y contextualmente fundamentadas («generación»).​ IBM afirma que "en la fase generativa, el LLM se basa en un prompt aumentado y su representación interna de los datos de entrenamiento para sintetizar una respuesta atractiva adaptada al usuario en ese instante.​


=== Etapas clave del RAG ===


==== Indexación ====
Normalmente, los datos a referenciar se convierten en embeddings del LLM, representaciones numéricas en forma de un gran espacio vectorial.​ Un RAG se puede utilizar con datos no estructurados (generalmente texto), semiestructurados o estructurados (por ejemplo, grafos de conocimiento ). ​ Estas incrustaciones se almacenan posteriormente en una base de datos vectorial para permitir la recuperación de documentos . ​


==== Recuperación ====
Dada una consulta de usuario, primero se llama a un recuperador de documentos para seleccionar los documentos más relevantes que se utilizarán para ampliar la consulta.​​ Esta comparación se puede realizar utilizando una variedad de métodos, que dependen en parte del tipo de indexación utilizada.​ 


==== Aumento ====
El modelo introduce esta información recuperada relevante en el LLM mediante prompt engineering de la consulta original del usuario.​​ Las implementaciones más recientes (a partir de 2023) también pueden incorporar módulos de aumento específicos con capacidades como la expansión de consultas hacia múltiples dominios y el uso de memoria y auto-mejora para aprender de recuperaciones previas. 


==== Generación ====
Finalmente, el LLM puede generar resultados basados tanto en la consulta como en los documentos recuperados.​​ Algunos modelos incorporan pasos adicionales para mejorar los resultados, como la reclasificación de la información recuperada, la selección del contexto y el fine-tuning . 


== Mejoras ==
Las mejoras al proceso básico anterior se pueden aplicar en diferentes etapas del flujo del RAG.


=== Codificador ===
Estos métodos se centran en la codificación de texto como vectores densos o dispersos. Los vectores dispersos, que codifican la identidad de una palabra, suelen tener la longitud de un diccionario y contienen principalmente ceros. Los vectores densos, que codifican el significado, son más compactos y contienen menos ceros. Diversas mejoras pueden optimizar el cálculo de las similitudes en los almacenes de vectores (bases de datos).​

El rendimiento mejora al optimizar el cálculo de las similitudes vectoriales. Los productos escalares mejoran la puntuación de similitud, mientras que las búsquedas de approximate nearest neighbor (ANN) mejoran la eficiencia de recuperación en comparación con las búsquedas de K vecinos más cercanos (KNN). ​
La precisión se puede mejorar con las interacciones tardías, que permiten al sistema comparar palabras con mayor precisión tras la recuperación. Esto ayuda a refinar la clasificación del documento y a mejorar la relevancia de la búsqueda. ​
Se pueden utilizar enfoques vectoriales híbridos para combinar representaciones vectoriales densas con vectores one-hot dispersos, aprovechando la eficiencia computacional de los productos puntuales dispersos sobre las operaciones con vectores densos.​
Otras técnicas de recuperación se centran en mejorar la precisión mediante el refinamiento de la selección de documentos. Algunos métodos de recuperación combinan representaciones dispersas, como SPLADE, con estrategias de expansión de consultas para mejorar la precisión y la recuperación de la búsqueda. ​


=== Métodos centrados en el retriever ===
Estos métodos tienen como objetivo mejorar la calidad de la recuperación de documentos en bases de datos vectoriales:

Entrenamiento previo del recuperador mediante la tarea Inverse Cloze Task (ICT), una técnica que ayuda al modelo a aprender patrones de recuperación al predecir texto enmascarado dentro de los documentos. ​
El aumento progresivo de datos, tal como se utiliza en el método de aumento diverso para recuperación densa generalizable (DRAGON), mejora la recuperación densa mediante el muestreo de ejemplos negativos difíciles durante el entrenamiento. ​
La optimización supervisada del recuperador alinea las probabilidades de recuperación con la distribución de verosimilitud del modelo generador. Esto implica recuperar los k vectores principales para una indicación dada, evaluar la perplejidad de la respuesta generada y minimizar la divergencia KL entre las selecciones del recuperador y las verosimilitudes del modelo para refinar la recuperación. ​
Las técnicas de reordenamiento pueden refinar el rendimiento del recuperador al priorizar los documentos recuperados más relevantes durante el entrenamiento. ​


=== Modelo de lenguaje ===
Al rediseñar el modelo de lenguaje teniendo en cuenta el recuperador, una red 25 veces más pequeña puede alcanzar una perplejidad comparable a la de sus contrapartes mucho más grandes. ​ Al entrenarse desde cero, este método (Retro) incurre en el alto costo de las ejecuciones de entrenamiento que el esquema del RAG original evitaba. La hipótesis es que, al proporcionar conocimiento del dominio durante el entrenamiento, El Retro necesita menos atención al dominio y puede dedicar sus recursos de menor peso únicamente a la semántica del lenguaje. El modelo de lenguaje rediseñado se muestra aquí.
Se ha informado que Retro no es reproducible, por lo que se realizaron modificaciones para que así sea. La versión más reproducible se llama Retro++ e incluye RAG contextual. ​


=== Fragmentación ===
La fragmentación implica varias estrategias para dividir los datos en vectores para que el recuperador pueda encontrar detalles en ellos. ​Existen tres tipos de estrategias de fragmentación: 
Longitud fija con superposición. Es rápido y sencillo. Superponer fragmentos consecutivos ayuda a mantener el contexto semántico entre ellos.
Los fragmentos basados en sintaxis pueden dividir el documento en oraciones. Bibliotecas como spaCy o NLTK también pueden ser útiles.
Fragmentación según el formato de archivo. Algunos tipos de archivo tienen fragmentos naturales integrados, y es recomendable respetarlos. Por ejemplo, los archivos de código se fragmentan y vectorizan mejor como funciones o clases completas. Los archivos HTML deben conservar intactos los elementos <table> o <img> codificados en base64 . Se deben tener consideraciones similares para los archivos PDF. Bibliotecas como Unstructured o Langchain pueden ser útiles con este método.


=== Grafos de conocimiento ===
En lugar de usar documentos como fuente para vectorizar y recuperar, se pueden utilizar grafos de conocimiento . Se puede partir de un conjunto de documentos, libros u otros textos y convertirlos en un grafo de conocimiento mediante diversos métodos, incluyendo modelos de lenguaje. Una vez creado el grafo de conocimiento, los subgrafos se pueden vectorizar, almacenar en una base de datos vectorial y utilizar para la recuperación como en RAG simple. La ventaja es que los grafos tienen una estructura más reconocible que las cadenas de texto, y esta estructura puede ayudar a recuperar datos más relevantes para la generación. A veces, este enfoque se denomina GraphRAG. ​


=== Búsqueda híbrida ===
A veces, las búsquedas en bases de datos vectoriales pueden pasar por alto datos clave necesarios para responder a la pregunta del usuario. Una forma de mitigar esto es realizar una búsqueda de texto tradicional, añadir esos resultados a los fragmentos de texto vinculados a los vectores recuperados de la búsqueda vectorial e introducir el texto híbrido combinado en el modelo de lenguaje para su generación.[cita requerida]


=== Evaluación y puntos de referencia ===
Los sistemas de RAG, se evalúan comúnmente mediante parámetros diseñados para evaluar tanto la precisión de recuperación como la calidad generativa. Entre los conjuntos de datos más populares se incluyen BEIR, un conjunto de tareas de recuperación de información en diversos dominios, y Natural Questions o Google QA para el control de calidad de dominio abierto.[cita requerida]


== Desafíos ==
Un RAG no es una solución completa al problema de las alucinaciones en los LLM. Según Ars Technica, «no es una solución directa, ya que el LLM aún puede alucinar en torno al material fuente en su respuesta».​
Si bien un RAG mejora la precisión de los modelos de lenguaje grandes (LLM), no elimina todos los desafíos. Una limitación es que, si bien un RAG reduce la necesidad de reentrenamiento frecuente del modelo, no la elimina por completo. Además, los LLM pueden tener dificultades para reconocer cuándo carecen de información suficiente para proporcionar una respuesta fiable. Sin un entrenamiento específico, los modelos pueden generar respuestas incluso cuando deberían indicar incertidumbre. Según IBM, este problema puede surgir cuando el modelo no es capaz de evaluar sus propias limitaciones de conocimiento.​
Los sistemas de RAG pueden recuperar fuentes correctas pero engañosas, lo que da lugar a errores de interpretación. En algunos casos, un LLM puede extraer afirmaciones de una fuente sin considerar su contexto, lo que resulta en una conclusión incorrecta.​ Además, al enfrentarse a información contradictoria, los modelos de RAG pueden tener dificultades para determinar qué fuente es precisa. El peor resultado de esta limitación es que el modelo puede combinar detalles de múltiples fuentes, generando respuestas que combinan información obsoleta y actualizada de forma engañosa. Según MIT Technology Review, estos problemas se producen porque los sistemas de RAG pueden malinterpretar los datos que recuperan.​


== Referencias ==