"use client";

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Download, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { TechCluster } from '@/components/tech-cluster';

const socialLinks = [
  {
    href: "https://github.com/shrish98",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/shrishti-tomar-a924a1274/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:shrishtitomar300@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[92dvh] w-full flex items-center justify-center overflow-hidden py-12 lg:py-0">
      {/* Subtle Mesh Glow Background */}
      <div className="absolute inset-0 mesh-bg dot-grid opacity-60 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left — Text Content (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6 flex flex-col items-start text-left max-w-2xl"
        >
          {/* Executive Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for full-time roles & projects
            </span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
            >
              <span className="text-foreground">Shrishti</span>{" "}
              <span className="gradient-text">Tomar</span>
            </motion.h1>

            {/* Typewriter Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-xl sm:text-2xl font-semibold text-foreground/80 flex items-center gap-2"
            >
              <span className="text-foreground/40 font-mono text-sm font-normal">Specializing in</span>
              <span className="gradient-text font-bold">
                <TypeAnimation
                  sequence={[
                    'Full-Stack Systems',
                    1800,
                    'Agentic AI Architectures',
                    1800,
                    'Vector RAG Pipelines',
                    1800,
                    'Scalable SaaS Products',
                    1800,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.div>
          </div>

          {/* Clean Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-foreground/65 text-base sm:text-lg leading-relaxed max-w-xl font-sans"
          >
            Full-Stack Software Engineer building intelligent cognitive agents, scalable RAG architectures, and high-performance web platforms. B.Tech Computer Science student at BPIT Delhi.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link href="#projects">
              <button className="accent-btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold cursor-pointer shadow-lg shadow-black/20">
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/resume.pdf" target="_blank">
              <button className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white/5 border border-white/12 text-foreground/90 hover:text-foreground hover:bg-white/10 hover:border-white/25 transition-all duration-200 cursor-pointer backdrop-blur-md">
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex items-center gap-4 pt-4"
          >
            <span className="text-xs uppercase tracking-wider font-semibold text-foreground/40">Connect</span>
            <div className="h-px w-8 bg-white/12" />
            <div className="flex gap-2.5">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-foreground/60 hover:text-foreground hover:bg-white/10 hover:border-white/25 transition-all duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right — Interactive Tech Cluster (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 w-full flex items-center justify-center"
        >
          <TechCluster />
        </motion.div>
      </div>
    </section>
  );
}
