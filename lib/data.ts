// All copy and content for the site lives here, so sections stay presentational.

export const site = {
  name: 'Shrishti Tomar',
  title: 'Shrishti Tomar — Software developer',
  description:
    'Shrishti Tomar is a software developer in Delhi building backend and full-stack systems: job queues, RAG pipelines and real-time dashboards with Node.js, PostgreSQL, Redis and Docker.',
  // Explicit override first, then the production domain Vercel exposes at build time.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
  location: 'Delhi, India',
  timeZone: 'Asia/Kolkata',
  email: 'shrishtitomar300@gmail.com',
  resume: '/resume.pdf',
  github: 'https://github.com/shrish98',
  linkedin: 'https://www.linkedin.com/in/shrishti-tomar-a924a1274/',
  leetcode: 'https://leetcode.com/u/shri0908',
};

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'contact', label: 'Contact' },
];

export type Tint = 'lilac' | 'sage' | 'peach' | 'butter';

export type Project = {
  id: string;
  number: string;
  name: string;
  kind: string;
  tagline: string;
  description: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  image: string;
  live: string;
  source: string;
  note: string;
  tint: Tint;
};

export const projects: Project[] = [
  {
    id: 'repoinsight',
    number: '01',
    name: 'RepoInsight',
    kind: 'AI · RAG',
    tagline: 'Ask questions about any GitHub codebase in plain English.',
    description:
      'Point it at a public GitHub repo and it chunks the code, stores it as Gemini embeddings in MongoDB Atlas Vector Search, and answers plain-English questions about it. A LangGraph pipeline searches by both meaning and keyword, answers with an LLM on Groq, can pull in the repo’s GitHub issues, and grades its own answer: if it comes back thin, it rewrites the search and tries again. Answers cite the files they came from. The React frontend and Express backend ship as one Docker image on AWS EC2, with GitHub sign-in, JWT auth and chat history in MongoDB Atlas.',
    metrics: [],
    stack: ['React', 'Vite', 'Express', 'LangGraph', 'Gemini', 'Groq', 'MongoDB Atlas', 'Docker', 'AWS EC2'],
    image: '/reposight.png',
    live: 'http://13.201.51.249:5000',
    source: 'https://github.com/shrish98/RepoInsight',
    note: 'ask it “where does auth happen?”',
    tint: 'lilac',
  },
  {
    id: 'taskforge',
    number: '02',
    name: 'TaskForge',
    kind: 'Backend · Queues',
    tagline: 'A job queue that takes the heavy lifting off the API.',
    description:
      'An Express and BullMQ engine that moves heavy work (OCR with Tesseract, web scraping, PDF reports, CSV exports, signed webhooks) off the request path and onto Redis-backed workers. Workers publish progress over Redis pub/sub and Socket.IO pushes it to the dashboard. Failed jobs retry with exponential backoff and then land in a dead-letter queue; idempotency keys stop duplicate jobs, and outbound fetches go through an SSRF guard. Load-tested, covered by integration tests against real Postgres and Redis, and runs as five containers under Docker Compose.',
    metrics: [
      { value: '60 ms', label: 'median API latency under OCR load' },
      { value: '3 jobs/s', label: 'OCR throughput on one laptop' },
      { value: '70', label: 'unit + integration tests in CI' },
    ],
    stack: ['Express', 'BullMQ', 'Redis', 'Socket.IO', 'PostgreSQL', 'Prisma', 'Docker Compose'],
    image: '/taskforge.png',
    live: 'https://task-forge-zeta-ten.vercel.app/',
    source: 'https://github.com/shrish98/TaskForge',
    note: 'watch jobs go 0 → 100% live',
    tint: 'butter',
  },
  {
    id: 'prepwise',
    number: '03',
    name: 'PrepWise',
    kind: 'AI · SaaS',
    tagline: 'A career coach that runs mock interviews.',
    description:
      'Gemini writes interview questions on the fly and gives feedback on your answers, a dashboard tracks how you improve, and resumes and feedback export to PDF. Background jobs run on Inngest, auth is Clerk, and data is Prisma on Postgres.',
    metrics: [],
    stack: ['Next.js', 'Gemini', 'Prisma', 'PostgreSQL', 'Inngest', 'Clerk'],
    image: '/prepwise.png',
    live: 'https://ai-interview-prep-rose.vercel.app/',
    source: 'https://github.com/shrish98/AI-Interview-Prep',
    note: 'practise here, not in the real one',
    tint: 'sage',
  },
  {
    id: 'dropalert',
    number: '04',
    name: 'DropAlert',
    kind: 'SaaS · Scraping',
    tagline: 'Emails you the moment a price drops.',
    description:
      'Paste a product link and Firecrawl pulls clean product data (name, price, currency, image), even from JavaScript-heavy store pages. A secret-protected cron route re-checks prices against your target, Redis caches scrapes and rate-limits new products per user, and Resend emails you when the price falls. Price history is charted so you can see the trend.',
    metrics: [],
    stack: ['Next.js', 'Supabase', 'Firecrawl', 'Redis', 'Resend', 'Recharts'],
    image: '/dropalert.png',
    live: 'https://dropalert-lemon.vercel.app/',
    source: 'https://github.com/shrish98/dropalert',
    note: 'set it & forget it',
    tint: 'peach',
  },
];

export const ticker = [
  'Backend systems',
  'Job queues',
  'RAG pipelines',
  'Real-time dashboards',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Open to SDE internships',
];

export const facts: { term: string; detail: string }[] = [
  { term: 'Focus', detail: 'Backend & full-stack' },
  { term: 'Degree', detail: 'B.Tech CSE, 2027' },
  { term: 'GTBIT Hackathon', detail: '3rd of 80+ teams' },
  { term: 'HackMait', detail: 'Top 17 of 700+' },
  { term: 'DSA', detail: '400+ problems' },
  { term: 'Namespace', detail: 'Junior Counselling Member' },
  { term: 'Based in', detail: 'Delhi, UTC+5:30' },
  { term: 'Looking for', detail: 'SDE internships' },
];

export const interests = ['RAG & vector search', 'Agentic LLM workflows', 'Job queues', 'Real-time systems', 'System design'];

// Receipt line items. `usedIn` points at project numbers above.
export const shippedWith: { item: string; usedIn: string[] }[] = [
  { item: 'Node.js / Express', usedIn: ['01', '02'] },
  { item: 'React', usedIn: ['01'] },
  { item: 'Next.js', usedIn: ['03', '04'] },
  { item: 'LangGraph', usedIn: ['01'] },
  { item: 'Gemini API', usedIn: ['01', '03'] },
  { item: 'Groq', usedIn: ['01'] },
  { item: 'MongoDB Atlas', usedIn: ['01'] },
  { item: 'PostgreSQL', usedIn: ['02', '03'] },
  { item: 'Prisma', usedIn: ['02', '03'] },
  { item: 'Redis', usedIn: ['02', '04'] },
  { item: 'BullMQ', usedIn: ['02'] },
  { item: 'Socket.IO', usedIn: ['02'] },
  { item: 'JWT auth', usedIn: ['01', '02'] },
  { item: 'Supabase', usedIn: ['04'] },
  { item: 'Firecrawl', usedIn: ['04'] },
  { item: 'Resend', usedIn: ['04'] },
  { item: 'Inngest', usedIn: ['03'] },
  { item: 'Docker / Compose', usedIn: ['01', '02'] },
  { item: 'Jest', usedIn: ['02'] },
  { item: 'AWS EC2', usedIn: ['01'] },
];

export const alsoInTheBag = [
  'TypeScript, JavaScript, SQL',
  'Python, C++, Java',
  'Redux Toolkit, TanStack Query',
  'Tailwind CSS, REST APIs',
  'RAG, vector embeddings',
  'Git, Linux, CI/CD pipelines',
];
