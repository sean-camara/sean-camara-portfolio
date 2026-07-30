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
RULE = HexColor("#111111")

TITLE = "Sean John Camara - Junior Frontend and Full-Stack Developer Resume"
AUTHOR = "Sean John Camara"
SUBJECT = "Junior frontend and full-stack developer resume"
KEYWORDS = "frontend developer, full-stack developer, React, Next.js, TypeScript, JavaScript, resume"


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


def draw_centered_segments(c: canvas.Canvas, y: float, segments: list[tuple[str, str | None]], size: float = 8.4, underline: bool = False) -> None:
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


def draw_wrapped(c: canvas.Canvas, text: str, x: float, y: float, width: float, size: float = 9, leading: float = 12, color=TEXT, font: str = "Helvetica") -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrap(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def section(c: canvas.Canvas, title: str, y: float) -> float:
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 10.1)
    c.drawString(LEFT, y, title)
    c.setStrokeColor(RULE)
    c.setLineWidth(.65)
    c.line(LEFT, y - 5, RIGHT, y - 5)
    return y - 18


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


def bullet(c: canvas.Canvas, y: float, text: str, size: float = 8.45, leading: float = 12.2) -> float:
    c.setFillColor(TEXT)
    c.circle(LEFT + 4, y + 2.6, 1.05, stroke=0, fill=1)
    return draw_wrapped(c, text, LEFT + 11, y, RIGHT - LEFT - 11, size, leading)


def project(c: canvas.Canvas, y: float, title: str, role: str, stack: str, bullets: list[str]) -> float:
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 8.75)
    c.drawString(LEFT + 2, y, f"{title} - {role}")
    c.drawRightString(RIGHT - 2, y, stack)
    y -= 12
    for item in bullets:
        y = bullet(c, y, item)
    return y - 4


def experience(c: canvas.Canvas, y: float, title: str, period: str, bullets: list[str]) -> float:
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 8.75)
    c.drawString(LEFT + 2, y, title)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawRightString(RIGHT, y, period)
    y -= 12
    for item in bullets:
        y = bullet(c, y, item)
    return y - 5


def build() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle(TITLE)
    c.setAuthor(AUTHOR)
    c.setSubject(SUBJECT)
    c.setKeywords(KEYWORDS)
    c.setCreator("Sean John Camara resume source (ReportLab)")

    y = PAGE_HEIGHT - 48
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(PAGE_WIDTH / 2, y, "SEAN JOHN CAMARA")
    y -= 15
    c.setFont("Helvetica-Bold", 10.2)
    c.drawCentredString(PAGE_WIDTH / 2, y, "JUNIOR FRONTEND & FULL-STACK DEVELOPER")
    y -= 13
    draw_centered_segments(
        c,
        y,
        [
            ("Quezon City, Philippines", None),
            ("+63 991 024 8649", "tel:+639910248649"),
            ("camara.sean13@gmail.com", "mailto:camara.sean13@gmail.com"),
        ],
        8.2,
    )
    y -= 11
    draw_centered_segments(
        c,
        y,
        [
            ("seanjohncamara.vercel.app", "https://seanjohncamara.vercel.app"),
            ("github.com/sean-camara", "https://github.com/sean-camara"),
            ("linkedin.com/in/sean-john-camara-ab78a3321", "https://www.linkedin.com/in/sean-john-camara-ab78a3321/"),
        ],
        8.1,
        underline=True,
    )

    y = section(c, "PROFESSIONAL SUMMARY", y - 12)
    y = draw_wrapped(
        c,
        "Junior frontend and full-stack developer building responsive, accessible applications through independent personal projects with React, Next.js, TypeScript, Node.js, and REST APIs. Seeking junior roles, internships, freelance projects, and contract work to gain formal industry experience.",
        LEFT,
        y,
        RIGHT - LEFT,
        8.55,
        12,
    )

    y = section(c, "CORE COMPETENCIES & SKILLS", y - 4)
    skill_value_x = LEFT + 106
    skills = [
        ("Frontend", "React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, responsive design, accessibility, PWA"),
        ("Backend & APIs", "Node.js, Express, REST APIs, authentication, role-based access control, Socket.IO, PayMongo integration"),
        ("Data & Cloud", "PostgreSQL, Supabase, MongoDB, Firebase, Cloudflare, DigitalOcean, Vercel"),
        ("DevOps & Testing", "Git, GitHub, GitHub Actions, CI/CD, Docker, Linux, blue-green deployment, Vitest, Playwright"),
        ("Additional", "Kotlin, Jetpack Compose, Android Studio, .NET MAUI, Unity, Room, ML Kit"),
        ("Developing", "Data structures and algorithms, LeetCode Easy/Medium, HackerRank, junior system design, API/database design"),
    ]
    for label, value in skills:
        c.setFillColor(TEXT)
        c.setFont("Helvetica-Bold", 8.35)
        c.drawString(LEFT + 1, y, f"{label}:")
        next_y = draw_wrapped(c, value, skill_value_x, y, RIGHT - skill_value_x, 8.35, 11.5)
        y = min(y - 11.5, next_y)

    y = section(c, "PROFESSIONAL EXPERIENCE", y - 6)
    y = experience(
        c,
        y,
        "Independent Full-Stack Developer — Personal Projects",
        "2025 - Present",
        [
            "Build web and Android applications from interface implementation through API integration, database work, automated testing, and deployment.",
            "Develop authentication, role-based dashboards, CRUD systems, payment workflows, real-time features, and database-backed applications.",
            "Configure project testing and deployment workflows with Vitest, Playwright, GitHub Actions, Docker, CI/CD, and blue-green deployment practices.",
        ],
    )
    y = experience(
        c,
        y,
        "Customer Service Representative - Concentrix | Amazon Selling Partner Support",
        "Mar 2024 - Sep 2024",
        [
            "Supported Amazon selling partners through case-based troubleshooting, clear guidance, and documented resolutions.",
            "Followed support procedures and coordinated issue resolution while meeting service and quality standards.",
        ],
    )

    y = section(c, "SELECTED PROJECTS", y - 6)
    y = project(
        c,
        y,
        "RMV Stainless Steel Fabrication",
        "Independent Developer | Academic Capstone",
        "React / Node.js",
        [
            "Built role-based dashboards for appointments, projects, payments, reports, documents, and fabrication progress using React, TypeScript, Express, and MongoDB.",
            "Integrated authentication, real-time updates, file handling, PayMongo workflows, automated tests, and deployment automation.",
        ],
    )
    y = project(
        c,
        y,
        "ApplyPH",
        "Independent Developer | Personal Project",
        "Next.js / Supabase",
        ["Building a mobile-first PWA for Filipino job seekers with guided resume workflows, evidence-linked match reports, private application packages, and tracking."],
    )
    y = project(
        c,
        y,
        "AcademiaZen",
        "Independent Developer | Personal Project",
        "React / Firebase",
        ["Developed a student productivity PWA for subjects, tasks, calendars, study sessions, files, notifications, and automated Vitest and Playwright checks."],
    )
    y = project(
        c,
        y,
        "ShelfLife",
        "Independent Android Developer | Personal Project",
        "Kotlin / Compose",
        ["Created a pantry and expiry tracker with Room, Firebase, ML Kit, barcode scanning, receipt workflows, and protected AI-assisted recipe features."],
    )
    y = project(
        c,
        y,
        "FlowMoney",
        "Independent Developer | Personal Project",
        "React / MongoDB",
        ["Built a responsive finance dashboard for income, expenses, subscriptions, savings goals, shared accounts, and data visualization with an Express API."],
    )

    y = section(c, "EDUCATION", y - 6)
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 8.7)
    c.drawString(LEFT + 2, y, "Bachelor of Science in Computer Science - STI College Fairview")
    c.drawRightString(RIGHT, y, "Expected Graduation: 2027")
    y -= 12
    c.setFont("Helvetica-Bold", 8.35)
    c.drawString(LEFT + 2, y, "Course highlights:")
    highlight_x = LEFT + stringWidth("Course highlights:", "Helvetica-Bold", 8.35) + 6
    y = draw_wrapped(c, "Web development, Android Studio, .NET MAUI, Unity, database management, software engineering, systems analysis and design, and object-oriented programming.", highlight_x, y, RIGHT - highlight_x, 8.35, 11.5)

    y = section(c, "CERTIFICATIONS", y - 6)
    certifications = [
        ("MongoDB Node.js Developer Path - MongoDB", "Jul 2026"),
        ("Getting Started with MongoDB Atlas - MongoDB", "Jul 2026"),
        ("From Relational Model (SQL) to MongoDB's Document Model - MongoDB", "Jul 2026"),
    ]
    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 8.35)
    for certification, date in certifications:
        c.drawString(LEFT + 2, y, certification)
        c.drawRightString(RIGHT, y, date)
        y -= 11.5

    c.save()
    apply_metadata(OUTPUT)
    copy2(OUTPUT, PUBLIC)


if __name__ == "__main__":
    build()
