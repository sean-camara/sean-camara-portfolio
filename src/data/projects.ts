export type ProjectKind = "applyph" | "rmv" | "academia" | "flowmoney" | "shelflife";

export type Project = {
  title: string;
  type: string;
  description: string;
  tech: string[];
  highlights: string[];
  repoUrl: string;
  liveUrl?: string;
  imageUrl: string;
  visual: ProjectKind;
  actionLabel: string;
  liveActionLabel?: string;
  caseStudy: {
    challenge: string;
    ownership: string;
    engineering: string[];
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
    type: "Ongoing · AI-Powered Job Application Assistant",
    description:
      "A mobile-first job application assistant for Filipino job seekers with resume building, evidence-linked match reports, AI-assisted application packages, application tracking, and offline-friendly PWA support.",
    tech: ["Next.js", "TypeScript", "Supabase", "Cloudflare Workers", "PWA", "AI Workflows"],
    highlights: [
      "Evidence-linked job matching",
      "AI-assisted application packages",
      "Private resume workflows",
      "Offline application tracking",
    ],
    repoUrl: "https://github.com/potatsukki/ApplyPH",
    imageUrl: "/assets/applyph-showcase.png",
    visual: "applyph",
    actionLabel: "View Repository",
    caseStudy: {
      challenge: "Help Filipino job seekers create stronger applications from confirmed experience without overstating their qualifications.",
      ownership: "Full-stack product design, Next.js architecture, AI workflows, private document flows, PWA behavior, and cloud integration.",
      engineering: ["Evidence-linked match reports", "Owner-scoped AI workflow", "Offline application tracker"],
    },
  },
  {
    title: "RMV Stainless Steel Fabrication",
    type: "Thesis · Full-Stack Business Management System",
    description:
      "A web-based system for a stainless steel fabrication business with appointment booking, role-based dashboards, project tracking, and payment-related workflows.",
    tech: ["React", "Cloudflare", "MongoDB Atlas", "PayMongo"],
    highlights: [
      "Appointment to project workflow",
      "Multiple user roles",
      "Admin and staff dashboards",
      "Business-focused web system",
    ],
    repoUrl: "https://github.com/sean-camara/rmv-web",
    liveUrl: "https://www.rmvfabrication.app",
    imageUrl: "/assets/rmv-showcase.png",
    visual: "rmv",
    actionLabel: "View Repository",
    liveActionLabel: "Live Demo",
    caseStudy: {
      challenge: "Unify appointments, fabrication projects, staff operations, and payment workflows in one business system.",
      ownership: "Full-stack product design, implementation, integration, and deployment.",
      engineering: ["Role-based dashboards", "Appointment-to-project workflow", "PayMongo integration"],
    },
  },
  {
    title: "AcademiaZen",
    type: "Student Productivity Web App",
    description:
      "A student organizer with subjects, tasks, AI quizzes, PDF folders, calendar tools, smart notifications, and offline-friendly PWA features.",
    tech: ["React", "PWA", "AI Features", "Calendar", "Offline Support"],
    highlights: [
      "Task and subject management",
      "AI quiz generation",
      "PDF organization",
      "Smart notifications",
    ],
    repoUrl: "https://github.com/sean-camara/AcademiaZen",
    liveUrl: "https://www.academiazen.app",
    imageUrl: "/assets/academiazen-showcase.png",
    visual: "academia",
    actionLabel: "View Repository",
    liveActionLabel: "Live Demo",
    caseStudy: {
      challenge: "Bring student planning, study materials, and AI-assisted practice into one focused workspace.",
      ownership: "Product design, React development, PWA behavior, and AI feature integration.",
      engineering: ["Offline-friendly PWA", "AI quiz generation", "Tasks, calendar, and PDF organization"],
    },
  },
  {
    title: "FlowMoney",
    type: "Money Tracker Web App",
    description:
      "A money tracker with chat-based AI assistant and goal system to help users manage finances smarter.",
    tech: ["React", "Charts", "AI Assistant", "Local Storage"],
    highlights: [
      "Income and expense tracking",
      "Financial goals management",
      "AI chat assistant",
      "Beautiful analytics dashboard",
    ],
    repoUrl: "https://github.com/sean-camara/MoneyFlow_Backend",
    liveUrl: "https://money-flow-six.vercel.app",
    imageUrl: "/assets/flowmoney-showcase.png",
    visual: "flowmoney",
    actionLabel: "View Repository",
    liveActionLabel: "Live Demo",
    caseStudy: {
      challenge: "Make personal finance tracking easier to understand through goals, visual feedback, and conversation.",
      ownership: "Interface design, React implementation, data visualization, and AI assistant integration.",
      engineering: ["Income and expense tracking", "Goal-based workflow", "Local-first persistence"],
    },
  },
  {
    title: "ShelfLife",
    type: "Native Android Pantry App",
    description:
      "A native Android pantry and ingredient tracker with barcode scanner, AI recipes, and AI kitchen assistant.",
    tech: ["Kotlin", "Jetpack Compose", "Room", "ML Kit"],
    highlights: [
      "Pantry and ingredient management",
      "Barcode and receipt scanner OCR",
      "AI recipe generation",
      "AI kitchen assistant chat",
    ],
    repoUrl: "https://github.com/sean-camara/ShelfLife",
    imageUrl: "/assets/shelflife-showcase.png",
    visual: "shelflife",
    actionLabel: "View Repository",
    liveActionLabel: "Get on Google Play",
    caseStudy: {
      challenge: "Help people track pantry items quickly and turn available ingredients into useful meal ideas.",
      ownership: "Native Android product design, Kotlin development, local data, scanning, and AI features.",
      engineering: ["Jetpack Compose UI", "Room local database", "ML Kit barcode and receipt scanning"],
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    icon: "frontend",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Responsive Design",
      "Progressive Web Apps",
      "Vite",
      "Framer Motion",
      "UI/UX",
      "Accessibility",
    ],
  },
  {
    label: "Backend & Cloud",
    icon: "backend",
    skills: [
      "Firebase",
      "Cloudflare Workers",
      "MongoDB Atlas",
      "REST APIs",
      "Authentication",
      "PayMongo",
      "API Integration",
      "Deployment",
      "JSON Architecture",
    ],
  },
  {
    label: "Android Development",
    icon: "android",
    skills: [
      "Kotlin",
      "Jetpack Compose",
      "Room Database",
      "DataStore",
      "Navigation Compose",
      "CameraX",
      "ML Kit",
      "Material 3",
      "Firebase Auth",
      "Firebase App Distribution",
      "WorkManager",
    ],
  },
  {
    label: "Artificial Intelligence",
    icon: "ai",
    accent: true,
    skills: [
      "AI Applications",
      "Prompt Engineering",
      "LLM Integration",
      "DeepSeek API",
      "OCR Processing",
      "AI Chat Systems",
      "AI Workflow Design",
      "AI Automation",
      "Recipe Generation",
    ],
  },
  {
    label: "Software Engineering",
    icon: "engineering",
    skills: [
      "Full-Stack Development",
      "Mobile Development",
      "Database Design",
      "System Architecture",
      "State Management",
      "Performance Optimization",
      "Problem Solving",
      "Clean Architecture",
    ],
  },
  {
    label: "Developer Tools",
    icon: "tools",
    skills: [
      "Git",
      "GitHub",
      "Codex",
      "Android Studio",
      "VS Code",
      "Postman",
      "Firebase Console",
      "Cloudflare Dashboard",
      "UI Planning",
    ],
  },
];
