"""Generate Sean John Camara's one-page ATS-friendly resume PDF."""

from pathlib import Path
from shutil import copy2
from datetime import datetime, timezone

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DecodedStreamObject, NameObject


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Sean_John_Camara_Resume.pdf"
PUBLIC = ROOT / "public" / "Sean_John_Camara_Resume.pdf"

# TODO(owner): Add verified STI College Fairview attendance years if desired.

PAGE_WIDTH, PAGE_HEIGHT = A4
LEFT = 38
RIGHT = PAGE_WIDTH - 38
TEXT = HexColor("#111111")
MUTED = HexColor("#333333")
ACCENT = HexColor("#111111")
RULE = HexColor("#BDBDBD")

TITLE = "Sean John Camara - Junior Frontend Developer Resume"
AUTHOR = "Sean John Camara"
SUBJECT = "Junior frontend developer resume"
KEYWORDS = "frontend developer, React, Next.js, TypeScript, JavaScript, resume"


def wrap(text: str, font: str, size: float, width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_link(c: canvas.Canvas, x: float, y: float, text: str, url: str, size: float = 8.6) -> float:
    c.setFont("Helvetica", size)
    c.setFillColor(ACCENT)
    c.drawString(x, y, text)
    width = stringWidth(text, "Helvetica", size)
    c.linkURL(url, (x, y - 1.5, x + width, y + size), relative=0, thickness=0)
    return x + width


def draw_wrapped(c: canvas.Canvas, text: str, x: float, y: float, width: float, size: float = 9, leading: float = 12, color=TEXT, font: str = "Helvetica") -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrap(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def section(c: canvas.Canvas, title: str, y: float) -> float:
    y -= 4
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 9.8)
    c.drawString(LEFT, y, title)
    c.setStrokeColor(RULE)
    c.setLineWidth(.55)
    title_width = stringWidth(title, "Helvetica-Bold", 9.8)
    c.line(LEFT + title_width + 10, y + 2.3, RIGHT, y + 2.3)
    return y - 15


def apply_metadata(path: Path) -> None:
    generated = datetime.now(timezone.utc).astimezone()
    iso_date = generated.isoformat(timespec="seconds")
    pdf_date = generated.strftime("D:%Y%m%d%H%M%S")
    offset = generated.strftime("%z")
    if offset:
        pdf_date += f"{offset[:3]}'{offset[3:]}'"

    reader = PdfReader(str(path))
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    writer.add_metadata({
        "/Title": TITLE,
        "/Author": AUTHOR,
        "/Subject": SUBJECT,
        "/Keywords": KEYWORDS,
        "/Creator": "Sean John Camara resume source (ReportLab)",
        "/Producer": "ReportLab and pypdf",
        "/CreationDate": pdf_date,
        "/ModDate": pdf_date,
    })
    xmp = f'''<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:pdf="http://ns.adobe.com/pdf/1.3/" xmlns:xmp="http://ns.adobe.com/xap/1.0/">
   <dc:title><rdf:Alt><rdf:li xml:lang="x-default">{TITLE}</rdf:li></rdf:Alt></dc:title>
   <dc:creator><rdf:Seq><rdf:li>{AUTHOR}</rdf:li></rdf:Seq></dc:creator>
   <dc:description><rdf:Alt><rdf:li xml:lang="x-default">{SUBJECT}</rdf:li></rdf:Alt></dc:description>
   <pdf:Keywords>{KEYWORDS}</pdf:Keywords>
   <pdf:Producer>ReportLab and pypdf</pdf:Producer>
   <xmp:CreatorTool>Sean John Camara resume source (ReportLab)</xmp:CreatorTool>
   <xmp:CreateDate>{iso_date}</xmp:CreateDate>
   <xmp:ModifyDate>{iso_date}</xmp:ModifyDate>
   <xmp:MetadataDate>{iso_date}</xmp:MetadataDate>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''
    stream = DecodedStreamObject()
    stream.set_data(xmp.encode("utf-8"))
    stream.update({NameObject("/Type"): NameObject("/Metadata"), NameObject("/Subtype"): NameObject("/XML")})
    writer.root_object[NameObject("/Metadata")] = writer._add_object(stream)
    temporary = path.with_suffix(".metadata.pdf")
    with temporary.open("wb") as target:
        writer.write(target)
    temporary.replace(path)


def project(c: canvas.Canvas, y: float, title: str, role: str, links: list[tuple[str, str]], bullets: list[str]) -> float:
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 9.3)
    c.drawString(LEFT, y, title)
    x = LEFT + stringWidth(title, "Helvetica-Bold", 9.3) + 7
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.4)
    role_text = f"| {role} |"
    c.drawString(x, y, role_text)
    x += stringWidth(role_text, "Helvetica", 8.4) + 5
    for index, (label, url) in enumerate(links):
        x = draw_link(c, x, y, label, url, 8.4)
        if index < len(links) - 1:
            c.setFillColor(MUTED)
            c.drawString(x + 3, y, "|")
            x += 9
    y -= 12.4
    for bullet in bullets:
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", 8.8)
        c.drawString(LEFT + 2, y, "-")
        y = draw_wrapped(c, bullet, LEFT + 12, y, RIGHT - LEFT - 12, 8.75, 11.7)
    return y - 3


def build() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle(TITLE)
    c.setAuthor(AUTHOR)
    c.setSubject(SUBJECT)
    c.setKeywords(KEYWORDS)
    c.setCreator("Sean John Camara resume source (ReportLab)")

    y = PAGE_HEIGHT - 39
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(LEFT, y, "SEAN JOHN CAMARA")
    y -= 15
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10.3)
    c.drawString(LEFT, y, "JUNIOR FRONTEND DEVELOPER")

    y -= 15
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.15)
    c.drawString(LEFT, y, "Quezon City, Philippines  |  +63 991 024 8649  |  ")
    x = LEFT + stringWidth("Quezon City, Philippines  |  +63 991 024 8649  |  ", "Helvetica", 8.15)
    draw_link(c, x, y, "camara.sean13@gmail.com", "mailto:camara.sean13@gmail.com", 8.15)
    y -= 11
    x = draw_link(c, LEFT, y, "seanjohncamara.vercel.app", "https://seanjohncamara.vercel.app", 8.15)
    c.setFillColor(MUTED)
    c.drawString(x + 4, y, "|")
    x = draw_link(c, x + 10, y, "github.com/sean-camara", "https://github.com/sean-camara", 8.15)
    c.setFillColor(MUTED)
    c.drawString(x + 4, y, "|")
    draw_link(c, x + 10, y, "LinkedIn", "https://www.linkedin.com/in/sean-john-camara-ab78a3321/", 8.15)

    y = section(c, "PROFESSIONAL SUMMARY", y - 9)
    y = draw_wrapped(
        c,
        "Junior frontend developer building responsive, accessible React, Next.js, and TypeScript applications. Experienced with REST API integration, authentication, PWA workflows, automated testing, and deployment, with supporting full-stack and native Android experience.",
        LEFT,
        y,
        RIGHT - LEFT,
        9,
        12,
    )

    y = section(c, "PROJECT EXPERIENCE", y - 1)
    y = project(
        c,
        y,
        "ApplyPH",
        "Independent Developer | Personal Project | In active development",
        [("Repository", "https://github.com/potatsukki/ApplyPH")],
        [
            "Building a mobile-first Next.js and TypeScript PWA for Filipino job seekers with guided resume workflows, evidence-linked match reports, application packages, and tracking.",
            "Integrated owner-scoped Supabase data and private document flows, with Vitest component tests and Playwright browser-test foundations.",
        ],
    )
    y = project(
        c,
        y,
        "RMV Stainless Steel Fabrication",
        "Full-Stack Developer | Academic Capstone",
        [
            ("Frontend", "https://github.com/sean-camara/rmv-web"),
            ("Backend", "https://github.com/sean-camara/rmv-server"),
            ("Demo", "https://www.rmvfabrication.app"),
        ],
        [
            "Built responsive React and TypeScript dashboards around a local fabrication business workflow, including appointments, projects, payments, reports, documents, and fabrication progress.",
            "Connected authenticated role-based interfaces to an Express and MongoDB REST API, real-time updates, file handling, and payment workflows.",
        ],
    )
    y = project(
        c,
        y,
        "AcademiaZen",
        "Full-Stack Developer | Personal Project",
        [
            ("Frontend", "https://github.com/sean-camara/AcademiaZen"),
            ("Backend", "https://github.com/sean-camara/AcademiaZen_Backend"),
            ("Demo", "https://www.academiazen.app"),
        ],
        [
            "Developed a responsive React and TypeScript student dashboard for subjects, tasks, calendars, study sessions, file organization, and notifications.",
            "Implemented PWA behavior, Firebase authentication, REST API integration, and automated coverage with Vitest and Playwright.",
        ],
    )
    y = project(
        c,
        y,
        "ShelfLife",
        "Android Developer | Personal Project",
        [("Repository", "https://github.com/sean-camara/ShelfLife")],
        ["Created a Kotlin and Jetpack Compose pantry tracker using Room, Firebase, and ML Kit for local inventory, expiry, barcode, and receipt workflows."],
    )
    y = project(
        c,
        y,
        "FlowMoney",
        "Full-Stack Developer | Personal Project",
        [
            ("Backend", "https://github.com/sean-camara/MoneyFlow_Backend"),
            ("Demo", "https://money-flow-six.vercel.app"),
        ],
        ["Built a responsive finance dashboard for income, expenses, goals, and data visualization, integrated with an Express and MongoDB backend API."],
    )

    y = section(c, "TECHNICAL SKILLS", y)
    skills = [
        ("Languages", "TypeScript, JavaScript, HTML5, CSS3"),
        ("Frontend", "React, Next.js, responsive design, accessibility, Tailwind CSS, PWA"),
        ("Backend and APIs", "Node.js, Express, REST APIs, authentication"),
        ("Data and cloud", "Supabase, PostgreSQL, MongoDB, Firebase, Cloudflare"),
        ("Testing and tools", "Git, GitHub, Vitest, Playwright, Vite, Vercel"),
        ("Additional", "Kotlin, Jetpack Compose, Room, ML Kit"),
    ]
    for label, value in skills:
        c.setFillColor(TEXT)
        c.setFont("Helvetica-Bold", 8.7)
        c.drawString(LEFT, y, f"{label}:")
        x = LEFT + stringWidth(f"{label}:", "Helvetica-Bold", 8.7) + 4
        c.setFont("Helvetica", 8.7)
        c.drawString(x, y, value)
        y -= 11.4

    y = section(c, "EDUCATION", y + 1)
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 9.1)
    c.drawString(LEFT, y, "STI COLLEGE FAIRVIEW")
    c.setFont("Helvetica", 8.9)
    c.setFillColor(MUTED)
    c.drawString(LEFT + 118, y, "Bachelor of Science in Computer Science coursework | Completed through third-year standing")

    c.save()
    apply_metadata(OUTPUT)
    copy2(OUTPUT, PUBLIC)


if __name__ == "__main__":
    build()
