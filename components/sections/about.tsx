"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2, Layers, Cpu, BookOpen,
  Github, Linkedin, MapPin, Mail,
  GraduationCap, Lightbulb, Trophy, Brain
} from 'lucide-react';

const skills = [
  { name: "React 19", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS v4", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "HTML5/CSS3", category: "Frontend" },
  
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "JWT Auth", category: "Backend" },
  { name: "Clerk Auth", category: "Backend" },
  
  { name: "MongoDB Atlas", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma ORM", category: "Database" },
  { name: "Upstash Redis", category: "Database" },
  
  { name: "Docker", category: "Tools" },
  { name: "AWS EC2", category: "Tools" },
  { name: "Git & GitHub", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Supabase", category: "Tools" },
  
  { name: "LangGraph", category: "AI" },
  { name: "LangChain", category: "AI" },
  { name: "RAG Pipelines", category: "AI" },
  { name: "Gemini API", category: "AI" },
  { name: "Firecrawl API", category: "AI" },
  
  { name: "C++", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
];

const categoryColors: Record<string, string> = {
  Frontend: "bg-indigo-400/15 text-indigo-300 border-indigo-400/25",
  Backend: "bg-cyan-400/15 text-cyan-300 border-cyan-400/25",
  Database: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  Tools: "bg-orange-500/15 text-orange-300 border-orange-500/25",
  AI: "bg-pink-500/15 text-pink-300 border-pink-500/25",
  Languages: "bg-violet-500/15 text-violet-300 border-violet-500/25",
};

const stats = [
  { label: "Projects Built", value: "3+", icon: Code2 },
  { label: "DSA Problems", value: "400+", icon: Brain },
  { label: "Tech Stacks", value: "5+", icon: Layers },
  { label: "Hackathons", value: "Top 3", icon: Trophy },
];

const interests = [
  "Agentic AI", "Retrieval-Augmented Generation", "Full-Stack SaaS",
  "Vector Indexing", "Cloud Infrastructures", "Open Source", "API Design"
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="relative py-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">About Me</h2>
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-5 gap-8"
      >
        {/* ─── Left Column ─────────────────────────── */}
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          {/* Profile Photo */}
          <div className="relative group rounded-lg overflow-hidden aspect-[4/3] plate">
            <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-cyan-600 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
            <div className="plate-ticks relative w-full h-full overflow-hidden">
              <img
                src="avatar-1.jpg"
                alt="Shrishti Tomar"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map(({ label, value, icon: Icon }) => (
              <motion.div
                key={label}
                variants={item}
                className="plate-ticks glass-dark p-4 text-center gradient-border group hover:glow-violet-sm transition-all duration-300"
              >
                <Icon className="h-5 w-5 text-indigo-400 mx-auto mb-2" />
                <div className="text-2xl font-bold gradient-text">{value}</div>
                <div className="text-xs text-foreground/50 mt-0.5">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick Contact */}
          <div className="plate-ticks glass-dark p-5 gradient-border space-y-3">
            <div className="eyebrow">quick links</div>
            <div className="flex gap-2">
              {[
                { href: "https://github.com/shrish98", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/shrishti-tomar-a924a1274/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:shrishtitomar300@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex-1 flex items-center justify-center h-10 bg-white/5 border border-white/10 text-foreground/50 hover:text-indigo-400 hover:border-indigo-400/30 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── Right Column ────────────────────────── */}
        <motion.div variants={item} className="lg:col-span-3 space-y-6">
          {/* Bio Card */}
          <div className="plate-ticks glass-dark p-7 gradient-border">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xl font-bold">My Story</h2>
            </div>
            <div className="space-y-4 text-foreground/65 leading-relaxed">
              <p>
                I'm <span className="text-foreground font-semibold">Shrishti Tomar</span>, a Full-Stack Software Engineer and Computer Science student at <span className="text-indigo-400 font-medium">Bhagwan Parshuram Institute of Technology, Delhi</span>. I specialize in engineering intelligent full-stack products, agentic AI frameworks, and Retrieval-Augmented Generation (RAG) pipelines.
              </p>
              <p>
                My development experience is centered around modern Javascript/TypeScript stacks, notably Next.js and React. I am deeply interested in AI orchestration—connecting Large Language Models with structural vector search tools like MongoDB Atlas and building stateful cognitive agents using LangGraph.
              </p>
              <p>
                Outside of backend engineering and UI/UX design, I have solved 400+ algorithmic problems across coding platforms and secured podium placements in regional hackathons. I thrive on translating complex technical architectures into simple, beautiful, and accessible web platforms.
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="plate-ticks glass-dark p-7 gradient-border">
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xl font-bold">Education</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  degree: "B.Tech in Computer Science & Engineering",
                  school: "Bhagwan Parshuram Institute of Technology, Delhi",
                  period: "2023 – 2027",
                  status: "Current",
                  color: "text-indigo-400",
                  dot: "bg-indigo-500",
                  grade: "CGPA: 8.29"
                },
                {
                  degree: "Higher Secondary Education (Class XII)",
                  school: "CBSE Board",
                  period: "2021 – 2023",
                  status: "Completed",
                  color: "text-cyan-400",
                  dot: "bg-cyan-500",
                  grade: "PCM Stream"
                },
              ].map((edu) => (
                <div key={edu.degree} className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className={`h-3 w-3 rounded-full ${edu.dot} ring-2 ring-offset-2 ring-offset-[#030712] ring-white/10`} />
                    <div className="w-px flex-1 bg-white/10" />
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-foreground/90">{edu.degree}</h3>
                      <span className={`font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 ${edu.status === 'Current' ? 'bg-indigo-400/15 text-indigo-300' : 'bg-cyan-500/15 text-cyan-300'}`}>
                        {edu.status}
                      </span>
                    </div>
                    <p className={`text-sm font-medium ${edu.color}`}>{edu.school}</p>
                    <p className="text-xs text-foreground/40 mt-0.5">{edu.period} • <span className="italic">{edu.grade}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech I Work With */}
          <div className="plate-ticks glass-dark p-7 gradient-border">
            <div className="flex items-center gap-2 mb-5">
              <Cpu className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xl font-bold">Tech I Work With</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map(({ name, category }) => (
                <span
                  key={name}
                  className={`inline-flex items-center px-3 py-1.5 font-mono text-xs border transition-all duration-200 hover:scale-105 cursor-default ${categoryColors[category]}`}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="plate-ticks glass-dark p-7 gradient-border">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xl font-bold">Interests</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 text-sm font-medium bg-white/5 text-foreground/60 border border-white/10 hover:border-indigo-400/30 hover:text-foreground/80 transition-all duration-200 cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}