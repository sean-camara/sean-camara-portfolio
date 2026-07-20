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
  description: string;
  tech: string[];
  highlights: string[];
  links: ProjectLink[];
  unavailableDemo?: string;
  imageUrl: string;
  visual: ProjectKind;
  caseStudy: {
    challenge: string;
    ownership: string;
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
    imageUrl: "/assets/applyph-showcase.png",
    visual: "applyph",
    caseStudy: {
      challenge: "Help Filipino job seekers prepare stronger applications from confirmed experience without overstating their qualifications.",
      ownership: "Frontend architecture, responsive product design, Supabase integration, document workflows, PWA behavior, testing, and cloud deployment setup.",
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
    imageUrl: "/assets/rmv-showcase.png",
    visual: "rmv",
    caseStudy: {
      challenge: "Translate a complex fabrication workflow into clear interfaces for customers, staff, and administrators.",
      ownership: "Responsive React interfaces, state and API integration, role-based workflows, backend implementation, and deployment.",
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
    imageUrl: "/assets/academiazen-showcase.png",
    visual: "academia",
    caseStudy: {
      challenge: "Bring planning, study materials, and focused learning tools into one calm, mobile-friendly workspace.",
      ownership: "React interface development, responsive layouts, PWA behavior, API integration, and automated testing.",
      engineering: ["Offline-friendly PWA", "Calendar and notification flows", "Separated frontend and backend applications"],
    },
  },
  {
    title: "ShelfLife",
    type: "Native Android pantry app",
    status: "Android project",
    context: "Personal project",
    role: "Android developer",
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
    imageUrl: "/assets/shelflife-showcase.png",
    visual: "shelflife",
    caseStudy: {
      challenge: "Make pantry tracking quick enough for everyday use while keeping core inventory data available locally.",
      ownership: "Native Android UI, local data, scanning flows, Firebase integration, and AI feature integration.",
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
    imageUrl: "/assets/flowmoney-showcase.png",
    visual: "flowmoney",
    caseStudy: {
      challenge: "Present everyday financial activity and goals in a dashboard that remains clear on smaller screens.",
      ownership: "Responsive interface work, dashboard flows, data visualization, and backend API integration.",
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
