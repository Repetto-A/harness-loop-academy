"""Genera PDF ficticio para demo OCR mod-06. Datos inventados, no reales."""

from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).with_name("demo-factura-ocr.pdf")


class FacturaPDF(FPDF):
    def header(self) -> None:
        self.set_font("Helvetica", "B", 16)
        self.cell(0, 10, "NEXA SERVICIOS S.A. (DEMO)", ln=True)
        self.set_font("Helvetica", "", 10)
        self.cell(0, 6, "Av. Corrientes 1234, Piso 8 - C1043AAZ - CABA", ln=True)
        self.cell(0, 6, "CUIT demo: 30-71234567-9 | IVA Responsable Inscripto", ln=True)
        self.ln(4)

    def section_title(self, title: str) -> None:
        self.set_font("Helvetica", "B", 11)
        self.cell(0, 8, title, ln=True)
        self.set_font("Helvetica", "", 10)


def build() -> None:
    pdf = FacturaPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 10, "FACTURA A - DOCUMENTO FICTICIO PARA DEMO OCR", ln=True)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 6, "Punto de venta: 0003  |  Comprobante N: 00001234  |  Fecha: 15/03/2026", ln=True)
    pdf.ln(6)

    pdf.section_title("Datos del cliente")
    pdf.multi_cell(
        0,
        6,
        "Razon social: Estudio Juridico Rivera & Asociados (DEMO)\n"
        "Titular: Dr. Martin Alejandro Rivera\n"
        "DNI: 28.456.789\n"
        "CUIT: 20-28456789-3\n"
        "Domicilio: Calle San Martin 456, Rosario, Santa Fe\n"
        "Email: m.rivera.demo@estudio-ejemplo.com.ar\n"
        "Telefono: +54 341 555-0198",
    )
    pdf.ln(4)

    pdf.section_title("Detalle")
    col_w = (20, 80, 25, 25, 30)
    headers = ("Cant.", "Descripcion", "P. unit.", "IVA", "Subtotal")
    pdf.set_font("Helvetica", "B", 10)
    for w, h in zip(col_w, headers, strict=True):
        pdf.cell(w, 8, h, border=1)
    pdf.ln()

    rows = [
        ("2", "Licencia anual plataforma IA interna", "$ 45.000", "21%", "$ 90.000"),
        ("1", "Implementacion onboarding (40 hs)", "$ 120.000", "21%", "$ 120.000"),
        ("3", "Soporte premium mensual", "$ 18.500", "21%", "$ 55.500"),
    ]
    pdf.set_font("Helvetica", "", 10)
    for row in rows:
        for w, val in zip(col_w, row, strict=True):
            pdf.cell(w, 8, val, border=1)
        pdf.ln()

    pdf.ln(6)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 8, "Subtotal: $ 265.500", ln=True)
    pdf.cell(0, 8, "IVA 21%: $ 55.755", ln=True)
    pdf.cell(0, 8, "TOTAL: $ 321.255", ln=True)

    pdf.ln(8)
    pdf.set_font("Helvetica", "I", 9)
    pdf.multi_cell(
        0,
        5,
        "NOTA: Documento generado con fines de capacitacion. Nombres, CUIT, DNI, direcciones "
        "y montos son ficticios. No utilizar como comprobante real.",
    )

    pdf.output(str(OUT))
    print(f"Generated: {OUT}")


if __name__ == "__main__":
    build()
