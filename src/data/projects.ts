export type ProjectKind = "applyph" | "rmv" | "academia" | "flowmoney" | "shelflife";

export type ProjectLink = {
  label: string;
  url: string;
  kind: "repository" | "demo";
};

export type Project = {
  title: string;
  type: string;
  status: string;
  context: string;
  role: string;
  summary: string;
  description: string;
  tech: string[];
  highlights: string[];
  links: ProjectLink[];
  unavailableDemo?: string;
  imageUrl: string;
  visual: ProjectKind;
  gallery?: { src: string; alt: string; caption: string }[];
  caseStudy: {
    challenge: string;
    targetUsers: string;
    ownership: string;
    frontend: string;
    backend?: string;
    decision: string;
    testing: string;
    deployment: string;
    engineering: string[];
    limitation?: string;
  };
};

export type SkillGroup = {
  label: string;
  icon: "frontend" | "backend" | "android" | "ai" | "engineering" | "tools";
  skills: string[];
  accent?: boolean;
};

export const projects: Project[] = [
  {
    title: "ApplyPH",
    type: "Job application assistant",
    status: "In active development",
    context: "Personal project",
    role: "Independent developer",
    summary: "Guided, evidence-aware application workflows for Filipino job seekers.",
    description:
      "A mobile-first job application assistant for Filipino job seekers, combining guided resume workflows, evidence-linked job matching, application packages, and tracking in a privacy-aware PWA.",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "PWA", "Vitest", "Playwright"],
    highlights: [
      "Responsive, mobile-first interface",
      "Private document and resume workflows",
      "Application tracking with offline support",
      "Automated and browser test foundations",
    ],
    links: [
      { label: "Repository", url: "https://github.com/potatsukki/ApplyPH", kind: "repository" },
    ],
    unavailableDemo: "Public demo not yet available",
    imageUrl: "/assets/applyph-showcase.webp",
    visual: "applyph",
    gallery: [
      { src: "/assets/applyph-landing-laptop.png", alt: "ApplyPH landing page shown on a laptop", caption: "Landing page" },
      { src: "/assets/applyph-resume-checker-laptop.png", alt: "ApplyPH resume checker shown on a laptop", caption: "Resume checker" },
      { src: "/assets/applyph-resume-result-laptop.png", alt: "ApplyPH resume checker result shown on a laptop", caption: "Resume checker result" },
    ],
    caseStudy: {
      challenge: "Help Filipino job seekers prepare stronger applications from confirmed experience without overstating their qualifications.",
      targetUsers: "Filipino job seekers preparing, evaluating, and tracking applications.",
      ownership: "Frontend architecture, responsive product design, Supabase integration, document workflows, PWA behavior, testing, and cloud deployment setup.",
      frontend: "Responsive Next.js and React PWA flows for resumes, job matching, application packages, and tracking.",
      backend: "Owner-scoped Supabase interfaces and private document APIs.",
      decision: "Evidence-linked output and explicit fact confirmation reduce unsupported claims in generated application material.",
      testing: "Vitest, Testing Library, and Playwright foundations cover components and critical browser flows.",
      deployment: "Next.js Node and Docker deployment path configured; public launch pending.",
      engineering: ["Evidence-linked match reports", "Owner-scoped data flows", "Offline application tracker"],
      limitation: "The product is still in active development, so no public demo is linked yet.",
    },
  },
  {
    title: "RMV Stainless Steel Fabrication",
    type: "Fabrication management system",
    status: "Live demo available",
    context: "Academic capstone",
    role: "Full-stack developer",
    summary: "Role-based workflows for appointments, projects, payments, and fabrication progress.",
    description:
      "Academic capstone developed around the real operational workflow of a local stainless-steel fabrication business, from appointments and project tracking to payments and fabrication progress.",
    tech: ["React", "TypeScript", "REST APIs", "MongoDB", "Firebase", "Vitest"],
    highlights: [
      "Responsive role-based dashboards",
      "Appointment and project workflows",
      "Payments, reports, and document handling",
      "Fabrication progress and notifications",
    ],
    links: [
      { label: "Frontend Repository", url: "https://github.com/sean-camara/rmv-web", kind: "repository" },
      { label: "Backend Repository", url: "https://github.com/sean-camara/rmv-server", kind: "repository" },
      { label: "Live Demo", url: "https://www.rmvfabrication.app", kind: "demo" },
    ],
    imageUrl: "/assets/rmv-showcase.webp",
    visual: "rmv",
    caseStudy: {
      challenge: "Translate a complex fabrication workflow into clear interfaces for customers, staff, and administrators.",
      targetUsers: "Fabrication customers, staff, and administrators with distinct workflow needs.",
      ownership: "Responsive React interfaces, state and API integration, role-based workflows, backend implementation, and deployment.",
      frontend: "Responsive React and TypeScript dashboards tailored to authenticated roles.",
      backend: "Express and MongoDB REST APIs with authentication, file, payment, and real-time integrations.",
      decision: "The navigation and dashboards mirror each role's part of the appointment-to-fabrication lifecycle.",
      testing: "Vitest coverage supports the frontend's core behavior.",
      deployment: "Frontend and backend are deployed; a live public demo is available.",
      engineering: ["Authenticated role-based dashboards", "Appointment-to-project workflow", "Real-time updates and payment flows"],
      limitation: "This is an academic capstone based on a real business workflow; no claim is made that the business currently uses it.",
    },
  },
  {
    title: "AcademiaZen",
    type: "Student productivity PWA",
    status: "Live demo available",
    context: "Personal project",
    role: "Full-stack developer",
    summary: "A calm, responsive workspace unifying study planning and learning tools.",
    description:
      "A responsive student workspace for subjects, tasks, study sessions, calendars, files, notifications, and AI-assisted learning tools, designed to work well across mobile and desktop.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "PWA", "Vitest", "Playwright"],
    highlights: [
      "Responsive student dashboard",
      "Subject, task, and calendar workflows",
      "File and PDF organization",
      "Notifications and AI-assisted study tools",
    ],
    links: [
      { label: "Frontend Repository", url: "https://github.com/sean-camara/AcademiaZen", kind: "repository" },
      { label: "Backend Repository", url: "https://github.com/sean-camara/AcademiaZen_Backend", kind: "repository" },
      { label: "Live Demo", url: "https://www.academiazen.app", kind: "demo" },
    ],
    imageUrl: "/assets/academiazen-showcase.webp",
    visual: "academia",
    caseStudy: {
      challenge: "Bring planning, study materials, and focused learning tools into one calm, mobile-friendly workspace.",
      targetUsers: "Students managing coursework, schedules, materials, and focused study sessions.",
      ownership: "React interface development, responsive layouts, PWA behavior, API integration, and automated testing.",
      frontend: "Responsive React and TypeScript PWA with dashboard, calendar, file, and study workflows.",
      backend: "Separate REST API and Firebase-backed authentication services.",
      decision: "Related academic tools share one workspace while retaining focused, task-specific views.",
      testing: "Vitest and Playwright cover application behavior and browser workflows.",
      deployment: "Frontend and backend are deployed; a live public demo is available.",
      engineering: ["Offline-friendly PWA", "Calendar and notification flows", "Separated frontend and backend applications"],
    },
  },
  {
    title: "ShelfLife",
    type: "Native Android pantry app",
    status: "Android project",
    context: "Personal project",
    role: "Android developer",
    summary: "Local-first pantry tracking with expiry, barcode, and receipt workflows.",
    description:
      "A native Android pantry and ingredient tracker with local inventory, expiration tracking, barcode and receipt scanning, and AI-assisted recipe ideas.",
    tech: ["Kotlin", "Jetpack Compose", "Room", "ML Kit", "Firebase"],
    highlights: [
      "Native Compose interface",
      "Local pantry and expiry tracking",
      "Barcode and receipt scanning",
      "AI-assisted recipe ideas",
    ],
    links: [
      { label: "Repository", url: "https://github.com/sean-camara/ShelfLife", kind: "repository" },
    ],
    imageUrl: "/assets/shelflife-showcase.webp",
    visual: "shelflife",
    caseStudy: {
      challenge: "Make pantry tracking quick enough for everyday use while keeping core inventory data available locally.",
      targetUsers: "People tracking household pantry inventory and expiration dates.",
      ownership: "Native Android UI, local data, scanning flows, Firebase integration, and AI feature integration.",
      frontend: "Native Android interface built with Kotlin and Jetpack Compose.",
      backend: "Room provides local persistence with supporting Firebase integrations.",
      decision: "Local-first inventory keeps essential pantry data usable without depending on a network request.",
      testing: "Testing approach is not publicly documented.",
      deployment: "No public store release or downloadable build is linked.",
      engineering: ["Jetpack Compose UI", "Room local database", "ML Kit barcode and receipt scanning"],
      limitation: "No public Google Play listing or downloadable build is linked.",
    },
  },
  {
    title: "FlowMoney",
    type: "Personal finance web app",
    status: "Live demo available",
    context: "Personal project",
    role: "Full-stack developer",
    summary: "A responsive dashboard for everyday money tracking and financial goals.",
    description:
      "A responsive personal-finance dashboard for income and expense tracking, financial goals, data visualization, and API-backed account workflows.",
    tech: ["React", "TypeScript", "REST APIs", "MongoDB", "Express"],
    highlights: [
      "Responsive finance dashboard",
      "Income and expense tracking",
      "Financial goals and data visualization",
      "Frontend-to-API integration",
    ],
    links: [
      { label: "Backend Repository", url: "https://github.com/sean-camara/MoneyFlow_Backend", kind: "repository" },
      { label: "Live Demo", url: "https://money-flow-six.vercel.app", kind: "demo" },
    ],
    imageUrl: "/assets/flowmoney-showcase.webp",
    visual: "flowmoney",
    caseStudy: {
      challenge: "Present everyday financial activity and goals in a dashboard that remains clear on smaller screens.",
      targetUsers: "Individuals tracking income, expenses, and personal financial goals.",
      ownership: "Responsive interface work, dashboard flows, data visualization, and backend API integration.",
      frontend: "Responsive React and TypeScript dashboard with clear financial summaries and charts.",
      backend: "Express and MongoDB API for account and transaction workflows.",
      decision: "Summary-first dashboards surface balances and trends before transaction-level detail.",
      testing: "Testing approach is not publicly documented.",
      deployment: "The frontend is live on Vercel; the verified repository link is backend-only.",
      engineering: ["Income and expense workflows", "Goal tracking", "Separated frontend and backend applications"],
      limitation: "The public frontend repository could not be verified; the available repository link is explicitly backend-only.",
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    icon: "frontend",
    accent: true,
    skills: ["TypeScript", "JavaScript", "HTML5", "CSS3", "React", "Next.js", "Responsive Design", "Accessibility", "Tailwind CSS", "Progressive Web Apps"],
  },
  {
    label: "Backend & APIs",
    icon: "backend",
    skills: ["Node.js", "Express", "REST APIs", "Authentication", "Supabase", "PostgreSQL", "MongoDB", "Firebase", "Cloudflare Workers"],
  },
  {
    label: "Testing & Tools",
    icon: "tools",
    skills: ["Git", "GitHub", "Vitest", "Playwright", "Vite", "Postman", "Vercel", "Cloudflare"],
  },
  {
    label: "Additional: Android",
    icon: "android",
    skills: ["Kotlin", "Jetpack Compose", "Room Database", "ML Kit", "Android Studio"],
  },
];
