# Guion demo en vivo (10 min)

1. (1 min) Mostrar `src/server.ts`: una tool = nombre + descripción + schema Zod + función que llama a una API. "El modelo lee la descripción para decidir cuándo usarla."
2. (2 min) `npm run inspector`: listar tools, ejecutar `dolar_cotizacion` con `casa: blue`. Mostrar el JSON con `fuente`.
3. (2 min) Ya conectado en Claude Desktop o Copilot, preguntar: "Cuánto está el blue y el MEP hoy, y cuál es la brecha con el oficial?" Señalar que el modelo llama a la tool y cita la fuente.
4. (2 min) Encadenar: "Cuánto subieron las reservas del BCRA en los últimos 5 días informados?" (usa `bcra_buscar_variable` y después `bcra_serie`).
5. (1 min) Error controlado: pedir `casa: "inexistente"` en el Inspector. El schema lo frena antes de llamar a la API.
6. (2 min) Preguntas. Mensaje: "MCP es el enchufe. La tool no piensa, el modelo decide cuándo enchufarla."

Plan B si no hay internet: mostrar `test-output.txt`.
