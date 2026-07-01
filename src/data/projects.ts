export type ProjectKind = "rmv" | "academia" | "flowmoney" | "shelflife";

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
};

export type SkillGroup = {
  label: string;
  icon: "frontend" | "backend" | "android" | "tools";
  skills: string[];
};

export const projects: Project[] = [
  {
    title: "RMV Stainless Steel Fabrication",
    type: "Full-Stack Business Management System",
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
    imageUrl: "/assets/rmv-screenshot.png",
    visual: "rmv",
    actionLabel: "View Repo",
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
    imageUrl: "/assets/academiazen-screenshot.png",
    visual: "academia",
    actionLabel: "Launch App",
  },
  {
    title: "FlowMoney",
    type: "Money Tracker Web App",
    description:
      "A responsive money tracking system with chat-style interactions and goal management features for personal finance organization.",
    tech: ["React", "Responsive Web", "Dashboard UI", "Goal System"],
    highlights: [
      "Expense tracking",
      "Goal system",
      "Chat-style interaction",
      "Responsive design",
    ],
    repoUrl: "https://github.com/sean-camara/MoneyFlow_Backend",
    liveUrl: "https://money-flow-six.vercel.app",
    imageUrl: "/assets/flowmoney-screenshot.png",
    visual: "flowmoney",
    actionLabel: "View Repo",
  },
  {
    title: "ShelfLife",
    type: "Native Android Pantry App",
    description:
      "A native Android app for pantry tracking, shopping lists, barcode scanning, receipt scanning, AI recipe generation, and kitchen assistant features.",
    tech: ["Kotlin", "Jetpack Compose", "Firebase", "Room", "ML Kit", "Cloudflare Worker"],
    highlights: [
      "Pantry inventory",
      "Barcode and receipt scanning",
      "AI recipe generation",
      "Kitchen assistant chat",
    ],
    repoUrl: "https://github.com/sean-camara/ShelfLife",
    imageUrl: "/assets/shelflife-screenshot.jpg",
    visual: "shelflife",
    actionLabel: "GitHub Repo",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    icon: "frontend",
    skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Responsive UI", "PWA"],
  },
  {
    label: "Backend & Database",
    icon: "backend",
    skills: [
      "Firebase",
      "Cloudflare Workers",
      "MongoDB Atlas",
      "REST APIs",
      "Authentication",
      "PayMongo Integration",
    ],
  },
  {
    label: "Android",
    icon: "android",
    skills: [
      "Kotlin",
      "Jetpack Compose",
      "Room Database",
      "DataStore",
      "ML Kit",
      "Firebase App Distribution",
    ],
  },
  {
    label: "Tools",
    icon: "tools",
    skills: ["GitHub", "Codex", "Android Studio", "VS Code", "UI Planning"],
  },
];
