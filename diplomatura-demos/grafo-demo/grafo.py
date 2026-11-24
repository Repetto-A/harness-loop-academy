"""Grafo de conocimiento mínimo: tripletas (sujeto, relación, objeto) y consultas por relaciones.
Los hechos salen del código de mcp-portales-ar (qué tool consulta qué API y qué dato devuelve).

Uso: python grafo.py            -> imprime el grafo en Mermaid y responde 3 consultas
"""
from collections import defaultdict

TRIPLETAS = [
    ("dolar_cotizacion", "consulta", "dolarapi.com"),
    ("cotizacion_moneda", "consulta", "dolarapi.com"),
    ("riesgo_pais", "consulta", "argentinadatos.com"),
    ("inflacion_mensual", "consulta", "argentinadatos.com"),
    ("bcra_buscar_variable", "consulta", "api.bcra.gob.ar"),
    ("bcra_serie", "consulta", "api.bcra.gob.ar"),
    ("cripto_precio", "consulta", "coingecko.com"),
    ("dolar_cotizacion", "devuelve", "dólar oficial, blue, MEP, CCL, tarjeta, cripto"),
    ("cotizacion_moneda", "devuelve", "EUR, BRL, CLP, UYU"),
    ("riesgo_pais", "devuelve", "riesgo país"),
    ("inflacion_mensual", "devuelve", "inflación mensual"),
    ("bcra_serie", "devuelve", "reservas y otras variables BCRA"),
    ("cripto_precio", "devuelve", "precio de criptomonedas"),
    ("bcra_serie", "necesita id de", "bcra_buscar_variable"),
]

salida, entrada = defaultdict(list), defaultdict(list)
for s, r, o in TRIPLETAS:
    salida[s].append((r, o)); entrada[o].append((r, s))

def quien(relacion, objeto):
    return [s for r, s in entrada[objeto] if r == relacion]

def impacto(nodo):
    """Si se cae `nodo`, qué se rompe (recorre aristas entrantes)."""
    vistos, pila = set(), [nodo]
    while pila:
        n = pila.pop()
        for _, s in entrada[n]:
            if s not in vistos: vistos.add(s); pila.append(s)
    return sorted(vistos)

print("```mermaid\ngraph LR")
ids = {n: f"n{i}" for i, n in enumerate(dict.fromkeys([x for t in TRIPLETAS for x in (t[0], t[2])]))}
for s, r, o in TRIPLETAS:
    print(f'  {ids[s]}["{s}"] -->|{r}| {ids[o]}["{o}"]')
print("```\n")
print("1) Qué tools consultan dolarapi.com?", quien("consulta", "dolarapi.com"))
print("2) Si se cae api.bcra.gob.ar, qué se rompe?", impacto("api.bcra.gob.ar"))
print("3) Si se cae bcra_buscar_variable, qué se rompe?", impacto("bcra_buscar_variable"))
