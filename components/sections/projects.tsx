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
    image: "/vibecode.png",
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
    image: "/feedback1.png",
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
    image: "/rapsheet.png",
    tags: ["Next.js", "Supabase", "Firecrawl", "Redis", "Resend", "Recharts"],
    category: "fullstack",
    url: "https://dropalert-lemon.vercel.app/",
    github: "https://github.com/shrish98/dropalert",
    featured: true,
  },
  {
    id: 4,
    title: "AI App Builder",
    description: "Full-stack AI-powered React app generator like Bolt.new, offering live Sandpack code preview, persistent chat history, and Cline AI agents for multi-file improvements.",
    image: "/riverflow.png",
    tags: ["Next.js 15", "Gemini 3.5", "Cline SDK", "Sandpack", "Supabase", "Clerk"],
    category: "ai",
    url: "https://github.com/shrish98/AI-app-builder",
    github: "https://github.com/shrish98/AI-app-builder",
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
    <section ref={ref} className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="eyebrow mb-4">what i&apos;ve built</div>
        <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">My Projects</h2>
        <p className="text-foreground/50 max-w-xl mx-auto text-sm leading-relaxed">
          A collection of real-world projects — from agentic AI search tools to fully containerized price-tracking SaaS platforms.
        </p>
        <div className="h-px w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
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
            className={`flex items-center gap-2 px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeFilter === key
                ? 'bg-indigo-500 text-slate-950 font-bold'
                : 'glass border border-white/10 text-foreground/50 hover:text-foreground hover:border-indigo-400/30'
            }`}
          >
            {key === 'all' && <Filter className="h-3.5 w-3.5" />}
            {label}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-6">
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
      className="plate-ticks group relative overflow-hidden glass-dark border border-white/8 hover:border-indigo-400/25 transition-all duration-400 hover:glow-violet-sm flex flex-col"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider font-semibold bg-indigo-500 text-slate-950">
          <Sparkles className="h-2.5 w-2.5" />
          Featured
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent pointer-events-none" />

        {/* Hover action overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 backdrop-blur-sm"
        >
          <Link href={project.url} target="_blank" rel="noopener noreferrer">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider font-semibold bg-indigo-500 text-slate-950 cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </motion.span>
          </Link>
          <Link href={project.github} target="_blank" rel="noopener noreferrer">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider font-semibold glass border border-white/20 text-white cursor-pointer"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 relative">
        {/* Gradient top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <h3 className="text-base font-bold text-foreground/90 group-hover:text-indigo-300 transition-colors duration-300 mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-foreground/50 text-xs leading-relaxed mb-4 flex-1">
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
