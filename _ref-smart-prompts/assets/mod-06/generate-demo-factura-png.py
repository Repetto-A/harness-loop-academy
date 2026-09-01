"""Genera PNG ficticio para demo OCR (misma info que demo-factura-ocr.pdf)."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).with_name("demo-factura-ocr.png")

LINES = [
    ("NEXA SERVICIOS S.A. (DEMO)", True),
    ("Av. Corrientes 1234, Piso 8 - CABA", False),
    ("CUIT demo: 30-71234567-9", False),
    ("", False),
    ("FACTURA A - DOCUMENTO FICTICIO PARA DEMO OCR", True),
    ("Punto de venta: 0003 | N: 00001234 | Fecha: 15/03/2026", False),
    ("", False),
    ("Cliente: Estudio Juridico Rivera & Asociados (DEMO)", True),
    ("Titular: Dr. Martin Alejandro Rivera", False),
    ("DNI: 28.456.789 | CUIT: 20-28456789-3", False),
    ("Domicilio: Calle San Martin 456, Rosario, Santa Fe", False),
    ("Email: m.rivera.demo@estudio-ejemplo.com.ar", False),
    ("Telefono: +54 341 555-0198", False),
    ("", False),
    ("Detalle:", True),
    ("2 x Licencia anual plataforma IA interna ........ $ 90.000", False),
    ("1 x Implementacion onboarding (40 hs) ............ $ 120.000", False),
    ("3 x Soporte premium mensual .................... $ 55.500", False),
    ("", False),
    ("Subtotal: $ 265.500", False),
    ("IVA 21%: $ 55.755", False),
    ("TOTAL: $ 321.255", True),
    ("", False),
    ("NOTA: Datos ficticios para capacitacion. No es un comprobante real.", False),
]


def build() -> None:
    width, height = 900, 1100
    img = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(img)
    font = ImageFont.load_default()
    font_bold = font

    y = 40
    for text, bold in LINES:
        if not text:
            y += 12
            continue
        draw.text((50, y), text, fill="black", font=font_bold if bold else font)
        y += 28 if bold else 24

    img.save(OUT)
    print(f"Generated: {OUT}")


if __name__ == "__main__":
    build()
