"use client";

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  {
    href: "https://github.com/shrish98",
    icon: Github,
    label: "GitHub",
    color: "hover:border-white/30",
  },
  {
    href: "https://www.linkedin.com/in/shrishti-tomar-a924a1274/",
    icon: Linkedin,
    label: "LinkedIn",
    color: "hover:border-blue-500/40 hover:text-blue-400",
  },
  {
    href: "mailto:shrishtitomar300@gmail.com",
    icon: Mail,
    label: "Email",
    color: "hover:border-cyan-500/40 hover:text-cyan-400",
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden py-16 md:py-0">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg dot-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-cyan-600/6 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl w-full px-4 md:px-6 flex flex-col items-center text-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6 flex flex-col items-center max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 font-mono text-xs uppercase tracking-wider bg-indigo-400/10 text-indigo-300 border border-indigo-400/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-foreground/50 text-sm"
            >
              <span className="text-indigo-400/70">{'>'}</span> whoami
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="gradient-text">Shrishti</span>{" "}
              <span className="text-foreground/90">Tomar</span>
            </motion.h1>
          </div>

          {/* Type Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-foreground/60 flex items-center gap-2 font-mono justify-center"
          >
            <span className="text-foreground/40">{'//'}</span>
            <span className="text-indigo-400 font-semibold">
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer',
                  1500,
                  'AI Engineer',
                  1500,
                  'MERN Stack Expert',
                  1500,
                  'Agentic AI Builder',
                  1500,
                  'BTech CSE Student',
                  1500,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-foreground/55 text-base leading-relaxed max-w-lg"
          >
            Full-Stack Software Engineer specializing in building cognitive AI agents, scalable RAG architectures, and high-performance web applications. B.Tech Computer Science student at BPIT Delhi.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 pt-2"
          >
            <Link href="#projects">
              <button className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm bg-indigo-500 text-slate-950 hover:bg-indigo-400 transition-all duration-200 cursor-pointer">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/resume.pdf" target="_blank">
              <button className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm glass border border-white/10 text-foreground/80 hover:text-foreground hover:border-indigo-400/30 transition-all duration-200 cursor-pointer">
                <Download className="h-4 w-4" />
                Download CV
              </button>
            </Link>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="flex items-center justify-center gap-3 pt-4"
          >
            <span className="font-mono text-xs text-foreground/30">Find me on</span>
            <div className="h-px w-8 bg-white/10" />
            <div className="flex gap-2">
              {socialLinks.map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`h-10 w-10 flex items-center justify-center glass border border-white/10 text-foreground/50 transition-all duration-200 ${color}`}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
