export type ProjectKind = "yhans" | "applyph" | "rmv" | "academia" | "flowmoney" | "shelflife";

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
    problem: string;
    solution: string;
    architecture: string;
    challenges: string[];
    decisions: string[];
    testing: string;
    deployment: string;
    lessons: string[];
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
    title: "Yhan’s Catering Services",
    type: "Responsive business and marketing website",
    status: "Deployed on Vercel",
    context: "Professional experience — paid freelance project",
    role: "Frontend Developer and Web Designer",
    summary: "A polished online presence for a real catering business serving Quezon City and nearby Metro Manila areas.",
    description:
      "A responsive marketing website that brings catering packages, menus, past events, booking details, and customer inquiries into one clear experience.",
    tech: ["React 19", "TypeScript", "Tailwind CSS 4", "React Router DOM 7", "Vite 8", "Vitest", "React Testing Library", "Playwright", "Axe", "jsdom"],
    highlights: [
      "Responsive desktop, tablet, and mobile layouts",
      "Packages, customizable menus, grazing tables, food trays, and packed meals",
      "Filterable previous-event gallery and business story",
      "Service areas, booking process, contact details, hours, and payment methods",
      "Facebook inquiry and quotation calls to action",
      "SEO, structured data, sitemap, accessibility, and automated testing",
    ],
    links: [
      { label: "Live Website", url: "https://yhans-catering-services-eight.vercel.app", kind: "demo" },
    ],
    imageUrl: "/assets/yhans-catering-showcase.png",
    visual: "yhans",
    gallery: [
      { src: "/assets/yhans-catering-showcase.png", alt: "Yhan’s Catering Services website displayed on a laptop", caption: "Responsive business website" },
    ],
    caseStudy: {
      problem: "The catering business’s packages, menus, event work, booking details, and contact information were scattered across social-media posts and private messages, making it harder for potential customers to understand the full service offering before inquiring.",
      solution: "Created one organized marketing website where customers can explore the business, services, packages, menus, past events, service areas, and booking process before requesting a quotation through Facebook.",
      architecture: "A React 19 and TypeScript single-page application built with Vite 8, Tailwind CSS 4, and React Router DOM 7. Dedicated Home, Packages & Services, Events, and About & Contact routes organize the public content. Locally hosted Fontsource packages provide Inter, Cormorant Garamond, and Great Vibes typography.",
      challenges: ["Organizing a broad service catalog without turning the site into an ordering platform", "Keeping package and event content easy to browse on small screens", "Presenting business information clearly while preserving direct quotation and booking workflows"],
      decisions: ["Structured content across four focused routes", "Used clear Facebook inquiry calls to action instead of implying online ordering", "Added filterable events and service-specific sections to help customers find relevant information quickly"],
      testing: "Vitest, React Testing Library, jsdom, Playwright, and Axe cover unit, component, end-to-end, and accessibility behavior.",
      deployment: "Deployed to Vercel through a GitHub-based production workflow.",
      lessons: ["A service-business website needs clear boundaries between discovery and booking", "Centralized content reduces repetitive questions before inquiries", "Accessibility, SEO, and responsive behavior are core parts of a professional marketing site"],
      limitation: "The website is informational rather than an ordering platform; quotations, availability, final pricing, bookings, and payments are handled directly by the business.",
    },
  },
  {
    title: "RMV Stainless Steel Fabrication",
    type: "Fabrication management system",
    status: "Live demo available",
    context: "Academic capstone",
    role: "Independent full-stack developer",
    summary: "Role-based workflows for appointments, projects, payments, and fabrication progress.",
    description:
      "An academic capstone designed for fabrication customers, staff, and administrators, covering appointments, project tracking, payments, documents, and fabrication progress in one role-based system.",
    tech: ["React", "TypeScript", "REST APIs", "MongoDB", "Firebase", "Vitest"],
    highlights: [
      "Responsive role-based dashboards",
      "Appointment and project workflows",
      "Payments, reports, and document handling",
      "Fabrication progress and notifications",
    ],
    links: [
      { label: "Frontend Repository", url: "https://github.com/potatsukki/rmv-web", kind: "repository" },
      { label: "Backend Repository", url: "https://github.com/potatsukki/rmv-server", kind: "repository" },
      { label: "Live Demo", url: "https://www.rmvfabrication.app", kind: "demo" },
    ],
    imageUrl: "/assets/rmv-showcase.webp",
    visual: "rmv",
    gallery: [
      { src: "/assets/rmv-screenshot.png", alt: "RMV Stainless Steel Fabrication dashboard interface", caption: "Dashboard" },
    ],
    caseStudy: {
      problem: "Appointments, quotations, project updates, payments, and fabrication records can become fragmented when customers, staff, and administrators rely on separate manual processes.",
      solution: "The capstone connects those steps in one role-based system, giving each account type the screens and actions needed for its part of the appointment-to-fabrication workflow.",
      architecture: "A React and TypeScript frontend consumes an Express REST API backed by MongoDB. Firebase supports authentication-related services, while Socket.IO, document handling, and PayMongo integrations support live updates, files, and payments. Docker, Nginx, and blue-green deployment scripts support the hosted environment.",
      challenges: ["Modeling status transitions across appointments, projects, fabrication, and delivery", "Keeping customer, staff, and administrator access rules consistent", "Coordinating payment, file, notification, and real-time workflows"],
      decisions: ["Used role-specific dashboards instead of exposing one shared administrative interface", "Centralized workflow rules and validation in backend services", "Added state-machine, authorization, validation, and service tests around high-risk transitions"],
      testing: "Frontend Vitest tests cover authentication routing, project access, report and engineer workflows, configuration safety, and contrast regressions. Backend Vitest suites cover authentication policies, validation, state transitions, payments, refunds, fabrication, and other services; smoke-test scripts exercise API and pipeline flows. Run `npm run test` in each repository and the documented smoke commands when test data is available. Full browser coverage and live-provider sandbox checks remain areas for further testing.",
      deployment: "The React frontend and Express API are deployed with Docker/Nginx operations documented in the repositories; a public demo is available.",
      lessons: ["Business workflows need explicit state and permission rules before UI implementation", "Service-level validation is essential when several roles can affect one project", "Deployment and rollback procedures should be treated as part of the application"],
      limitation: "This is an academic capstone based on a real business workflow; no claim is made that the business currently uses it.",
    },
  },
  {
    title: "AcademiaZen",
    type: "Student productivity PWA",
    status: "Live demo available",
    context: "Personal project",
    role: "Independent full-stack developer",
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
    gallery: [
      { src: "/assets/academiazen-screenshot.png", alt: "AcademiaZen student dashboard interface", caption: "Student dashboard" },
    ],
    caseStudy: {
      problem: "Students often manage tasks, schedules, study materials, focus sessions, and reminders across disconnected tools, increasing context switching and making progress harder to track.",
      solution: "AcademiaZen combines coursework planning, study sessions, files, notifications, and AI-assisted study tools in a responsive workspace designed for desktop and mobile use.",
      architecture: "A React, TypeScript, Vite, and Tailwind CSS PWA communicates with a separate Node.js REST API. Firebase handles identity, MongoDB stores application state, Cloudflare R2 stores PDFs, and external adapters isolate push notifications, AI, and PayMongo billing. Docker and Nginx support production deployment.",
      challenges: ["Synchronizing student state across authenticated sessions and reconnects", "Keeping PDF, notification, and study workflows usable on small screens", "Separating external services from core application behavior"],
      decisions: ["Kept frontend and backend deployable as separate applications", "Used typed API boundaries and dedicated adapters for storage, identity, AI, billing, and push services", "Designed related study tools as focused views inside one persistent workspace"],
      testing: "Frontend Vitest tests cover API helpers, navigation, calendar, library, empty states, and error boundaries; Playwright covers the public browser experience. Backend Vitest suites cover authentication, environment validation, billing, quotas, state revisions, and account deletion. Run `npm run test:run` in each repository and `npm run test:e2e` in the frontend. Coverage commands exist, but no coverage percentage is claimed; authenticated cross-service browser flows remain an area for expansion.",
      deployment: "The frontend and backend are deployed with Docker and production operations documented; a public demo is available.",
      lessons: ["Offline and reconnect behavior must be designed alongside normal online flows", "External services are easier to test when isolated behind adapters", "A productivity interface benefits from clear task boundaries instead of one overloaded dashboard"],
    },
  },
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
      problem: "Job seekers need to compare their real experience with a vacancy and prepare tailored documents without introducing unsupported claims or exposing private resume data.",
      solution: "ApplyPH guides applicants through resume intake, evidence-linked matching, follow-up questions, application-package generation, review, download, and tracking while requiring confirmation for factual changes.",
      architecture: "A Next.js and TypeScript PWA uses server-rendered routes and protected server APIs. Supabase provides authentication, PostgreSQL persistence, row-level ownership controls, and private file storage. Provider adapters support mock and planned live AI/payment modes; Docker and Node deployment files target a DigitalOcean VPS.",
      challenges: ["Keeping generated claims traceable to applicant-confirmed evidence", "Protecting private documents and owner-scoped records", "Preserving progress across multi-step AI, payment, and document workflows"],
      decisions: ["Made evidence atoms and explicit confirmation the source of truth for generated facts", "Revalidated sessions and roles on the server instead of relying on hidden frontend controls", "Used deterministic mock providers so core workflows remain testable without paid credentials"],
      testing: "Vitest covers validation, authentication policy, environment safety, downloads, PDF generation, application services, and other domain behavior. Playwright covers public pages, authentication, profile, matching, packages, downloads, payments, tracking, admin operations, security headers, and responsive layouts. Run `npm test` and `npm run test:browser`. Runtime Supabase RLS and Storage tests still need a working local Supabase environment; no coverage percentage is claimed.",
      deployment: "Next.js Node and Docker deployment path configured; public launch pending.",
      lessons: ["AI output should be treated as untrusted input and validated against confirmed facts", "Authorization must be enforced at every server and database boundary", "Idempotent workflow steps make retries safer for document and payment operations"],
      limitation: "The product is still in active development, so no public demo is linked yet.",
    },
  },
  {
    title: "ShelfLife",
    type: "Native Android pantry app",
    status: "Android project",
    context: "Personal project",
    role: "Independent Android developer",
    summary: "Local-first pantry tracking with expiry, barcode, and receipt workflows.",
    description:
      "A native Android app for households that combines local pantry inventory, expiration tracking, barcode and receipt scanning, shopping lists, and AI-assisted recipe ideas.",
    tech: ["Kotlin", "Jetpack Compose", "Room", "ML Kit", "Firebase"],
    highlights: [
      "Native Compose interface",
      "Local pantry and expiry tracking",
      "Barcode and receipt scanning",
      "AI-assisted recipe ideas",
    ],
    links: [
      { label: "Repository", url: "https://github.com/potatsukki/ShelfLife", kind: "repository" },
    ],
    imageUrl: "/assets/shelflife-showcase.webp",
    visual: "shelflife",
    gallery: [
      { src: "/assets/shelflife-screenshot.jpg", alt: "ShelfLife Android pantry tracking interface", caption: "Pantry tracking" },
    ],
    caseStudy: {
      problem: "Household ingredients are easy to forget after purchase, which makes expiration dates, duplicate buying, and meal planning difficult to manage.",
      solution: "ShelfLife keeps a local pantry inventory, surfaces expiry information, and reduces manual entry through barcode and receipt scanning with optional recipe assistance.",
      architecture: "A Kotlin and Jetpack Compose Android client uses Room for local inventory persistence. ML Kit supports barcode and receipt scanning, Firebase provides cloud services and security rules, and a Cloudflare Worker proxies AI requests so provider credentials are not embedded in the app.",
      challenges: ["Keeping core pantry data useful without a network connection", "Turning imperfect barcode and receipt input into editable inventory records", "Calling AI features without shipping private service credentials in the APK"],
      decisions: ["Used Room as the local source for essential pantry data", "Kept scan results reviewable before saving", "Routed AI requests through a Worker instead of calling the provider directly from Android"],
      testing: "Kotlin unit tests cover pantry-item saving and DAO isolation, Firebase emulator tests validate Firestore rules, and Node tests cover Worker validation. An Android instrumentation test scaffold is present. Run `gradlew test`, `npm test` in `firebase-tests`, and `npm test` in `worker`; broader Compose UI, scanner-device, and end-to-end tests remain to be added.",
      deployment: "No public store release or downloadable build is linked.",
      lessons: ["Local-first storage keeps everyday utilities resilient", "Scanner results need correction paths because recognition is imperfect", "Mobile secrets belong behind a server-side proxy"],
      limitation: "No public Google Play listing or downloadable build is linked.",
    },
  },
  {
    title: "FlowMoney",
    type: "Personal finance web app",
    status: "Live demo available",
    context: "Personal project",
    role: "Independent full-stack developer",
    summary: "A responsive dashboard for everyday money tracking and financial goals.",
    description:
      "A responsive personal-finance dashboard for individuals and shared-account members managing income, expenses, subscriptions, financial goals, and API-backed account workflows.",
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
    gallery: [
      { src: "/assets/flowmoney-screenshot.png", alt: "FlowMoney personal finance dashboard interface", caption: "Finance dashboard" },
    ],
    caseStudy: {
      problem: "Income, expenses, subscriptions, and savings goals are difficult to understand when records are scattered or shown without useful summaries.",
      solution: "FlowMoney organizes transactions and goals in a responsive dashboard, presenting account summaries and charts before detailed records.",
      architecture: "A React and Vite frontend uses Firebase client services, Recharts, and Socket.IO integration. A separate Express and TypeScript API uses Better Auth, MongoDB, Socket.IO, Web Push, email, and an AI-service adapter. The frontend is deployed on Vercel.",
      challenges: ["Presenting several financial data types clearly on mobile screens", "Enforcing access to shared-account records", "Keeping dashboard data synchronized with API-backed changes"],
      decisions: ["Used summary-first dashboard views before transaction-level detail", "Kept frontend and backend concerns in separate repositories", "Applied backend middleware to authentication and joint-account access rules"],
      testing: "The deployed frontend and backend repositories do not currently expose automated test scripts. Available validation is linting and production build for the frontend plus TypeScript build for the backend. Unit tests for financial calculations and access rules, API integration tests, and end-to-end transaction flows remain priorities.",
      deployment: "The frontend is live on Vercel; backend setup and production build commands are documented separately.",
      lessons: ["Financial dashboards need clear information hierarchy before added visual detail", "Shared accounts require explicit authorization checks on every record", "Testability should be planned early around calculations and ownership rules"],
      limitation: "The frontend repository is private; automated tests and detailed production operations are not yet documented in the public backend repository.",
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
  {
    label: "Currently Developing",
    icon: "engineering",
    skills: ["Data Structures & Algorithms", "LeetCode Easy & Medium", "HackerRank Exercises", "Junior-Level System Design", "REST API Design", "Database Design", "Automated Testing", "Deployment & CI/CD"],
  },
];
