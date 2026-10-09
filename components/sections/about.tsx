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
  { name: "Tailwind CSS", category: "Frontend" },
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

const stats = [
  { label: "Projects Built", value: "3+", icon: Code2 },
  { label: "DSA Solved", value: "400+", icon: Brain },
  { label: "Tech Stacks", value: "5+", icon: Layers },
  { label: "Hackathons", value: "Top 3", icon: Trophy },
];

const interests = [
  "Agentic AI Frameworks", "Retrieval-Augmented Generation", "Full-Stack SaaS Architecture",
  "Vector Database Indexing", "Cloud Infrastructure", "Open Source Engineering", "API System Design"
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="relative py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="eyebrow mb-3">BACKGROUND & SKILLS</span>
        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
          About <span className="gradient-text">Me</span>
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-5 gap-8"
      >
        {/* Left Column (2 cols) */}
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          {/* Profile Photo */}
          <div className="relative group rounded-2xl overflow-hidden aspect-[4/3] glass-card border border-white/12 shadow-2xl">
            <img
              src="avatar-1.jpg"
              alt="Shrishti Tomar"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d0f]/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <div className="flex items-center gap-2 text-sm text-foreground/90 font-medium">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map(({ label, value, icon: Icon }) => (
              <motion.div
                key={label}
                variants={item}
                className="glass-card p-4 text-center border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Icon className="h-5 w-5 text-foreground/70 mx-auto mb-1.5" />
                <div className="text-2xl font-bold gradient-text">{value}</div>
                <div className="text-xs text-foreground/50 font-medium mt-0.5">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick Contact Links */}
          <div className="glass-card p-5 border border-white/10 space-y-3">
            <span className="eyebrow">CONNECT DIRECTLY</span>
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
                  className="flex-1 flex items-center justify-center h-10 rounded-xl bg-white/5 border border-white/10 text-foreground/60 hover:text-foreground hover:bg-white/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column (3 cols) */}
        <motion.div variants={item} className="lg:col-span-3 space-y-6">
          {/* Bio Story Card */}
          <div className="glass-card p-7 border border-white/10">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center border border-white/10">
                <BookOpen className="h-4 w-4 text-foreground/80" />
              </div>
              <h3 className="text-xl font-bold text-foreground">My Engineering Journey</h3>
            </div>
            <div className="space-y-4 text-foreground/70 leading-relaxed text-sm sm:text-base">
              <p>
                I&apos;m <span className="text-foreground font-bold">Shrishti Tomar</span>, a Full-Stack Software Engineer and Computer Science student at <span className="text-foreground font-semibold">Bhagwan Parshuram Institute of Technology, Delhi</span>. I specialize in building full-stack products, agentic AI frameworks, and Retrieval-Augmented Generation (RAG) pipelines.
              </p>
              <p>
                My technical foundation is rooted in modern JavaScript/TypeScript architectures (Next.js, React, Node.js). I am deeply passionate about AI orchestration—connecting Large Language Models with vector search databases like MongoDB Atlas and building stateful cognitive agents with LangGraph.
              </p>
              <p>
                Outside of backend engineering and UI/UX design, I have solved 400+ algorithmic problems across competitive coding platforms and secured top placements in regional hackathons.
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="glass-card p-7 border border-white/10">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center border border-white/10">
                <GraduationCap className="h-4 w-4 text-foreground/80" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Education</h3>
            </div>
            <div className="space-y-5">
              {[
                {
                  degree: "B.Tech in Computer Science & Engineering",
                  school: "Bhagwan Parshuram Institute of Technology, Delhi",
                  period: "2023 – 2027",
                  status: "Current",
                  grade: "CGPA: 8.29"
                },
                {
                  degree: "Higher Secondary Education (Class XII)",
                  school: "CBSE Board",
                  period: "2021 – 2023",
                  status: "Completed",
                  grade: "PCM Stream"
                },
              ].map((edu) => (
                <div key={edu.degree} className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                    <div className="w-px flex-1 bg-white/10" />
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-bold text-foreground">{edu.degree}</h4>
                      <span className="tag-mono text-[10px] font-semibold">
                        {edu.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground/80">{edu.school}</p>
                    <p className="text-xs text-foreground/40 mt-1">{edu.period} • {edu.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="glass-card p-7 border border-white/10">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center border border-white/10">
                <Cpu className="h-4 w-4 text-foreground/80" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Technologies & Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map(({ name }) => (
                <span
                  key={name}
                  className="tag-mono hover:scale-105 transition-transform duration-150 cursor-default"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="glass-card p-7 border border-white/10">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center border border-white/10">
                <Lightbulb className="h-4 w-4 text-foreground/80" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Focus & Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-foreground/80 border border-white/10 hover:border-white/20 transition-all duration-150 cursor-default"
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