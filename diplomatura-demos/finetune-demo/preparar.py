"""Genera datos de EJEMPLO (sintéticos, inventados) para el demo.
Tarea: mail informal de un cliente -> ficha con formato fijo de un estudio contable o jurídico.
Salida: data/train.jsonl (entrenamiento) y data/test.jsonl (prompts que el modelo nunca vio).
"""
import json, random, pathlib

random.seed(7)
NOMBRES = ["Marta", "Julián", "Sofía", "Carlos", "Lucía", "Diego", "Valeria", "Martín", "Paula", "Hernán", "Romina", "Federico"]
SALUDOS = ["hola!!", "buenas", "che hola", "buen día", "holaa", "qué tal"]
CIERRES = ["gracias!!", "abrazo", "saludos", "mil gracias", "quedo atenta", "avisame"]
# (estudio, pedido informal, pedido formal, documentación, próximo paso)
CASOS = [
    ("contable", "me llegó una intimación y no entiendo nada", "Revisión de intimación recibida", "Copia de la intimación", "Analizar la intimación y responder al cliente"),
    ("contable", "quiero pasarme de monotributo a responsable inscripto", "Consulta por cambio de régimen tributario", "Facturación de los últimos 12 meses", "Evaluar el cambio de régimen"),
    ("contable", "necesito que me hagan la factura de este mes", "Emisión de factura mensual", "Datos del cliente a facturar e importe", "Emitir la factura"),
    ("contable", "no sé si me toca recategorizarme", "Consulta por recategorización", "Facturación de los últimos 12 meses", "Verificar la categoría que corresponde"),
    ("contable", "me piden un certificado de ingresos para alquilar", "Solicitud de certificación de ingresos", "Facturación y comprobantes del período", "Preparar la certificación"),
    ("contable", "contraté a una persona y no sé qué hay que hacer", "Alta de empleado", "DNI y datos del empleado", "Gestionar el alta"),
    ("jurídico", "el inquilino no me paga hace dos meses", "Consulta por falta de pago de alquiler", "Contrato de locación y recibos", "Analizar el contrato y opciones"),
    ("jurídico", "me quieren despedir y no sé qué me corresponde", "Consulta laboral por posible despido", "Recibos de sueldo y telegramas recibidos", "Calcular lo que corresponde y asesorar"),
    ("jurídico", "quiero revisar un contrato antes de firmarlo", "Revisión de contrato previo a la firma", "Borrador del contrato", "Revisar el contrato y marcar observaciones"),
    ("jurídico", "me chocaron el auto y el seguro no responde", "Consulta por siniestro de tránsito", "Denuncia del siniestro y póliza", "Evaluar el reclamo"),
    ("jurídico", "necesito armar una sociedad con un socio", "Constitución de sociedad", "DNI de los socios y actividad prevista", "Proponer tipo societario"),
    ("jurídico", "me llegó una carta documento", "Análisis de carta documento recibida", "Copia de la carta documento", "Analizar y proponer respuesta"),
]
PLAZOS = [("para el viernes", "Viernes"), ("antes de fin de mes", "Fin de mes"), ("lo antes posible", "Urgente"), ("para la semana que viene", "Próxima semana"), ("cuando puedas", "Sin plazo indicado")]

def mail(nombre, saludo, pedido, plazo_inf, cierre, adjunto):
    adj = " te mando lo que tengo adjunto" if adjunto else " no tengo nada escaneado todavía"
    return f"{saludo} soy {nombre}, {pedido}.{adj}. lo necesito {plazo_inf}. {cierre}"

def ficha(estudio, nombre, formal, doc, plazo, paso, adjunto):
    estado = "Adjunta" if adjunto else "Pendiente"
    return (f"ASUNTO: {formal}\nCLIENTE: {nombre}\nÁREA: Estudio {estudio}\n"
            f"DOCUMENTACIÓN: {doc} ({estado})\nPLAZO: {plazo}\nPRÓXIMO PASO: {paso}")

def ejemplo(caso, nombre):
    est, inf, formal, doc, paso = caso
    pi, pf = random.choice(PLAZOS); adj = random.random() < 0.5
    return {"mail": mail(nombre, random.choice(SALUDOS), inf, pi, random.choice(CIERRES), adj),
            "ficha": ficha(est, nombre, formal, doc, pf, paso, adj)}

out = pathlib.Path("data"); out.mkdir(exist_ok=True)
train = [ejemplo(c, random.choice(NOMBRES[:10])) for c in CASOS[:10] for _ in range(6)]  # 60 pares
test = [ejemplo(CASOS[10], "Romina"), ejemplo(CASOS[11], "Federico"), ejemplo(CASOS[0], "Federico"), ejemplo(CASOS[6], "Romina")]
for name, rows in [("train", train), ("test", test)]:
    with open(out / f"{name}.jsonl", "w", encoding="utf-8") as f:
        for r in rows: f.write(json.dumps(r, ensure_ascii=False) + "\n")
print(f"DATOS DE EJEMPLO (sintéticos): {len(train)} de entrenamiento, {len(test)} de prueba en data/")
