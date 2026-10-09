"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Filter } from 'lucide-react';
import type { ReactElement } from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  url: string;
  github: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: "RepoInsight — Codebase RAG Platform",
    description: "Intelligent codebase analysis platform that clones, indexes, and enables vector-search chats with any public or private GitHub repository using LangGraph and Google Gemini AI.",
    image: "/reposight.png",
    tags: ["React 19", "LangGraph", "Gemini AI", "MongoDB Atlas", "Docker", "AWS EC2"],
    category: "ai",
    url: "http://13.201.51.249:5000",
    github: "https://github.com/shrish98/RepoInsight",
    featured: true,
  },
  {
    id: 2,
    title: "PrepWise — AI Career Coach",
    description: "Interactive mock interview SaaS offering dynamic AI behavior questionnaires, dashboard progress metrics, background tasks via Inngest, and resume/feedback export to PDF.",
    image: "/prepwise.png",
    tags: ["Next.js", "Gemini API", "Prisma", "PostgreSQL", "Inngest", "Clerk"],
    category: "ai",
    url: "https://ai-interview-prep-rose.vercel.app/",
    github: "https://github.com/shrish98/AI-Interview-Prep",
    featured: true,
  },
  {
    id: 3,
    title: "DropAlert — Price Tracker SaaS",
    description: "E-commerce price monitoring SaaS that extracts product data with Firecrawl API, schedules background cron tasks using Upstash Redis, and sends email alerts via Resend.",
    image: "/dropalert.png",
    tags: ["Next.js", "Supabase", "Firecrawl", "Redis", "Resend", "Recharts"],
    category: "fullstack",
    url: "https://dropalert-lemon.vercel.app/",
    github: "https://github.com/shrish98/dropalert",
    featured: true,
  },
  {
    id: 4,
    title: "TaskForge — Asynchronous Job Queue Engine",
    description: "Asynchronous job execution and distributed queue engine with live telemetry dashboard, worker concurrency, and automated task logging built with BullMQ, Redis, and WebSockets.",
    image: "/taskforge.png",
    tags: ["Next.js", "BullMQ", "Redis", "WebSockets", "Prisma", "PostgreSQL"],
    category: "fullstack",
    url: "https://task-forge-zeta-ten.vercel.app/",
    github: "https://github.com/shrish98/TaskForge",
    featured: true,
  },
];

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'ai', label: 'AI & Agents' },
  { key: 'fullstack', label: 'Full-Stack' },
];

export default function ProjectsShowcase(): ReactElement {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const filtered = activeFilter === 'all'
      ? projects
      : projects.filter(p => p.category === activeFilter);
    setFilteredProjects(filtered);
  }, [activeFilter]);

  return (
    <section ref={ref} className="py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="eyebrow mb-3">SELECTED WORK</span>
        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-foreground/60 max-w-xl mx-auto text-base leading-relaxed">
          Production-grade applications engineered with modern full-stack frameworks, LLM orchestrations, and distributed background jobs.
        </p>
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeFilter === key
                ? 'accent-btn shadow-md'
                : 'bg-white/5 border border-white/10 text-foreground/60 hover:text-foreground hover:bg-white/10'
            }`}
          >
            {key === 'all' && <Filter className="h-3.5 w-3.5" />}
            {label}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }): ReactElement {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl glass-card border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col shadow-xl shadow-black/40"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-[#0e1619] border border-white/15 text-foreground shadow-md backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-emerald-400" />
          Featured Project
        </div>
      )}

      {/* Project Image Box */}
      <div className="relative h-56 overflow-hidden flex-shrink-0 bg-black/40">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d0f] via-transparent to-transparent pointer-events-none opacity-80" />

        {/* Hover overlay with action buttons */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center gap-3 bg-black/70 backdrop-blur-sm"
        >
          <Link href={project.url} target="_blank" rel="noopener noreferrer">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="accent-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold shadow-lg cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </motion.span>
          </Link>
          <Link href={project.github} target="_blank" rel="noopener noreferrer">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold bg-white/10 border border-white/20 text-foreground hover:bg-white/20 cursor-pointer backdrop-blur-md"
            >
              <Github className="h-3.5 w-3.5" />
              Source Code
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-400 transition-colors duration-200 mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-foreground/60 text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
