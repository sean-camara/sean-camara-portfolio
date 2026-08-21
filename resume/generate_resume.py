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

PAGE_WIDTH, PAGE_HEIGHT = A4
LEFT = 36
RIGHT = PAGE_WIDTH - 36
TEXT = HexColor("#111111")
MUTED = HexColor("#333333")
ACCENT = HexColor("#111111")
RULE = HexColor("#111111")

TITLE = "Sean John Camara - Junior Frontend & Full-Stack Developer Resume"
AUTHOR = "Sean John Camara"
SUBJECT = "Junior Frontend & Full-Stack Developer Resume"
KEYWORDS = "frontend developer, full-stack developer, React, Next.js, TypeScript, JavaScript, Node.js, resume"


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


def draw_centered_segments(c: canvas.Canvas, y: float, segments: list[tuple[str, str | None]], size: float = 8.3, underline: bool = False) -> None:
    separator = " | "
    total_width = sum(stringWidth(text, "Helvetica", size) for text, _ in segments)
    total_width += stringWidth(separator, "Helvetica", size) * (len(segments) - 1)
    x = (PAGE_WIDTH - total_width) / 2
    c.setFont("Helvetica", size)
    c.setFillColor(TEXT)
    for index, (text, url) in enumerate(segments):
        width = stringWidth(text, "Helvetica", size)
        c.drawString(x, y, text)
        if underline:
            c.setLineWidth(.45)
            c.line(x, y - 1, x + width, y - 1)
        if url:
            c.linkURL(url, (x, y - 2, x + width, y + size), relative=0, thickness=0)
        x += width
        if index < len(segments) - 1:
            c.drawString(x, y, separator)
            x += stringWidth(separator, "Helvetica", size)


def draw_wrapped(c: canvas.Canvas, text: str, x: float, y: float, width: float, size: float = 8.5, leading: float = 11.2, color=TEXT, font: str = "Helvetica") -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrap(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def section(c: canvas.Canvas, title: str, y: float) -> float:
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 9.8)
    c.drawString(LEFT, y, title)
    c.setStrokeColor(RULE)
    c.setLineWidth(.6)
    c.line(LEFT, y - 4, RIGHT, y - 4)
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


def bullet(c: canvas.Canvas, y: float, text: str, size: float = 8.3, leading: float = 11.0) -> float:
    c.setFillColor(TEXT)
    c.circle(LEFT + 3.5, y + 2.4, 0.95, stroke=0, fill=1)
    return draw_wrapped(c, text, LEFT + 10, y, RIGHT - LEFT - 10, size, leading)


def build() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle(TITLE)
    c.setAuthor(AUTHOR)
    c.setSubject(SUBJECT)
    c.setKeywords(KEYWORDS)
    c.setCreator("Sean John Camara resume source (ReportLab)")

    y = PAGE_HEIGHT - 38
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(PAGE_WIDTH / 2, y, "SEAN JOHN CAMARA")
    y -= 13
    c.setFont("Helvetica", 9.5)
    c.drawCentredString(PAGE_WIDTH / 2, y, "Junior Frontend & Full-Stack Developer")
    y -= 11
    draw_centered_segments(
        c,
        y,
        [
            ("Quezon City, Philippines", None),
            ("+63 991 024 8649", "tel:+639910248649"),
            ("camara.sean13@gmail.com", "mailto:camara.sean13@gmail.com"),
        ],
        8.0,
    )
    y -= 10
    draw_centered_segments(
        c,
        y,
        [
            ("seanjohncamara.vercel.app", "https://seanjohncamara.vercel.app"),
            ("github.com/sean-camara", "https://github.com/sean-camara"),
            ("linkedin.com/in/sean-john-camara-ab78a3321", "https://www.linkedin.com/in/sean-john-camara-ab78a3321/"),
        ],
        8.0,
        underline=True,
    )

    # PROFESSIONAL SUMMARY
    y = section(c, "PROFESSIONAL SUMMARY", y - 10)
    y = draw_wrapped(
        c,
        "Junior frontend and full-stack developer with paid freelance, academic, and independent project experience building responsive applications with React, Next.js, TypeScript, Node.js, REST APIs, databases, testing, and cloud deployment. Seeking a junior development role where I can contribute practical end-to-end development skills and continue growing within a professional team.",
        LEFT,
        y,
        RIGHT - LEFT,
        8.35,
        11.2,
    )

    # PROFESSIONAL EXPERIENCE
    y = section(c, "PROFESSIONAL EXPERIENCE", y - 4)
    # Exp 1
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 8.45)
    c.drawString(LEFT, y, "Independent Full-Stack Developer | Personal, Academic Projects, and Paid Freelance Projects")
    c.drawRightString(RIGHT, y, "2025 – Present")
    y -= 10.5
    y = bullet(c, y, "Build modern full-stack web applications from frontend to backend, including APIs, databases, authentication, real-time functionality, testing, and deployment.")
    y = bullet(c, y, "Leverage AI-powered development tools throughout the software development lifecycle for rapid prototyping, code generation, debugging, optimization, documentation, and workflow automation.")
    y -= 2

    # Exp 2
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 8.45)
    c.drawString(LEFT, y, "Customer Service Representative | Concentrix | Amazon Selling Partner Support")
    c.drawRightString(RIGHT, y, "Mar 2024 – Sep 2024")
    y -= 10.5
    y = bullet(c, y, "Supported Amazon selling partners through case-based troubleshooting, clear guidance, documented resolutions, and coordinated issue handling.")

    # SELECTED PROJECTS
    y = section(c, "SELECTED PROJECTS", y - 4)

    projects_data = [
        (
            "Aghimuan Creatives — Multimedia Portfolio Website | React / TypeScript",
            "Designed and developed a responsive React and TypeScript portfolio showcasing 50 photography and video projects with category filtering, media viewers, and mobile-friendly navigation."
        ),
        (
            "Yhan's Catering Services — Paid Client Project | React / TypeScript",
            "Building a responsive customer-facing catering website with service packages, menus, food trays, event galleries, inquiry pathways, optimized media, and production deployment."
        ),
        (
            "RMV Stainless Steel Fabrication — Academic Capstone | React / Node.js",
            "Built role-based dashboards for appointments, projects, payments, reports, documents, and fabrication progress; integrated authentication, Socket.IO, file handling, PayMongo, testing, and deployment automation."
        ),
        (
            "AcademiaZen — AI-Powered Academic Productivity Platform | React / TypeScript / Node.js",
            "Developed a full-stack PWA helping students manage academic tasks, run Pomodoro focus sessions, organize and review PDF materials, generate AI-powered quizzes, and track productivity; integrated Firebase Authentication, MongoDB, Cloudflare R2, push notifications, and secure subscription payments."
        ),
        (
            "ShelfLife — Android Project | Kotlin / Compose",
            "Created a pantry and expiry tracker with Room, Firebase, ML Kit, barcode scanning, receipt workflows, and protected AI-assisted recipe features."
        ),
    ]

    for header_title, desc in projects_data:
        c.setFillColor(TEXT)
        c.setFont("Helvetica-Bold", 8.45)
        c.drawString(LEFT, y, header_title)
        y -= 10.5
        y = bullet(c, y, desc)
        y -= 2

    # CORE COMPETENCIES & SKILLS
    y = section(c, "CORE COMPETENCIES & SKILLS", y - 2)
    skills = [
        ("Languages:", "JavaScript, TypeScript, HTML5, CSS3, Kotlin"),
        ("Frameworks & Libraries:", "React, Next.js, Express.js, Tailwind CSS, Jetpack Compose, .NET MAUI, Socket.IO"),
        ("Backend & APIs:", "Node.js, RESTful APIs, Authentication, Role-Based Access Control (RBAC), Third-Party API Integration, PayMongo"),
        ("Databases & Backend Platforms:", "PostgreSQL, Supabase, MongoDB, Firebase, Room"),
        ("AI-Assisted Development:", "ChatGPT, Codex, AI-assisted coding, debugging, code review, prototyping, research, and documentation"),
        ("Cloud & Deployment:", "Vercel, Cloudflare, DigitalOcean, Docker, Linux, GitHub Actions, CI/CD, Blue-Green Deployment"),
        ("Testing & Development Practices:", "Vitest, Playwright, Git, GitHub, Automated Testing, SDLC, Agile Development"),
        ("Additional:", "Android Studio, ML Kit, Progressive Web Apps (PWA), Responsive Design, Accessibility"),
    ]
    for label, val in skills:
        c.setFillColor(TEXT)
        c.setFont("Helvetica-Bold", 8.2)
        c.drawString(LEFT, y, label)
        label_w = stringWidth(label, "Helvetica-Bold", 8.2)
        c.setFont("Helvetica", 8.2)
        available_w = RIGHT - (LEFT + label_w + 4)
        if stringWidth(val, "Helvetica", 8.2) <= available_w:
            c.drawString(LEFT + label_w + 4, y, val)
            y -= 10.8
        else:
            lines = wrap(val, "Helvetica", 8.2, available_w)
            c.drawString(LEFT + label_w + 4, y, lines[0])
            y -= 10.8
            for extra_line in lines[1:]:
                c.drawString(LEFT + label_w + 4, y, extra_line)
                y -= 10.8

    # EDUCATION
    y = section(c, "EDUCATION", y - 2)
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 8.45)
    c.drawString(LEFT, y, "Bachelor of Science in Computer Science | STI College Fairview")
    c.drawRightString(RIGHT, y, "Completed Third-Year Standing")
    y -= 10.5
    y = bullet(c, y, "Coursework includes web development, database management, software engineering, systems analysis and design, object-oriented programming, Android development, .NET MAUI, and Unity.")
    y -= 2

    # CERTIFICATIONS
    y = section(c, "CERTIFICATIONS", y - 2)
    certifications = [
        "MongoDB Node.js Developer Path — MongoDB, Jul 2026",
        "Getting Started with MongoDB Atlas — MongoDB, Jul 2026",
        "From Relational Model (SQL) to MongoDB's Document Model — MongoDB, Jul 2026",
    ]
    c.setFillColor(TEXT)
    c.setFont("Helvetica", 8.35)
    for cert in certifications:
        c.drawString(LEFT, y, cert)
        y -= 10.5

    c.save()
    apply_metadata(OUTPUT)
    copy2(OUTPUT, PUBLIC)


if __name__ == "__main__":
    build()
