"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  Zap,
  Database,
  Server,
  Code2,
  Container,
  Activity,
  Globe,
  Boxes
} from "lucide-react";

type TechItem = {
  id: string;
  name: string;
  category: "ai" | "frontend" | "backend" | "db" | "devops";
  icon: any;
  color: string;
  glow: string;
  border: string;
  desc: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
};

const techItems: TechItem[] = [
  {
    id: "langgraph",
    name: "LangGraph",
    category: "ai",
    icon: Cpu,
    color: "text-purple-400",
    glow: "rgba(168, 85, 247, 0.3)",
    border: "border-purple-500/30 hover:border-purple-400",
    desc: "Agentic AI Orchestration",
    position: { top: "5%", left: "15%" },
    delay: 0,
  },
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "frontend",
    icon: Globe,
    color: "text-sky-300",
    glow: "rgba(56, 189, 248, 0.3)",
    border: "border-sky-500/30 hover:border-sky-400",
    desc: "App Router & SSR",
    position: { top: "18%", right: "12%" },
    delay: 0.3,
  },
  {
    id: "bullmq",
    name: "BullMQ",
    category: "backend",
    icon: Zap,
    color: "text-amber-400",
    glow: "rgba(251, 191, 36, 0.3)",
    border: "border-amber-500/30 hover:border-amber-400",
    desc: "Distributed Async Queues",
    position: { top: "42%", left: "5%" },
    delay: 0.6,
  },
  {
    id: "gemini",
    name: "Gemini AI",
    category: "ai",
    icon: Activity,
    color: "text-indigo-300",
    glow: "rgba(129, 140, 248, 0.35)",
    border: "border-indigo-400/40 hover:border-indigo-300",
    desc: "Multimodal LLM Embeddings",
    position: { top: "45%", right: "8%" },
    delay: 0.9,
  },
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    icon: Code2,
    color: "text-cyan-400",
    glow: "rgba(34, 211, 238, 0.3)",
    border: "border-cyan-500/30 hover:border-cyan-400",
    desc: "UI Framework",
    position: { bottom: "18%", left: "18%" },
    delay: 1.2,
  },
  {
    id: "redis",
    name: "Redis",
    category: "db",
    icon: Database,
    color: "text-rose-400",
    glow: "rgba(244, 63, 94, 0.3)",
    border: "border-rose-500/30 hover:border-rose-400",
    desc: "Sub-1.8ms Transport Cache",
    position: { bottom: "12%", right: "20%" },
    delay: 1.5,
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    icon: Container,
    color: "text-blue-400",
    glow: "rgba(96, 165, 250, 0.3)",
    border: "border-blue-500/30 hover:border-blue-400",
    desc: "Multi-Container Compose",
    position: { top: "2%", right: "42%" },
    delay: 0.4,
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "db",
    icon: Server,
    color: "text-teal-300",
    glow: "rgba(45, 212, 191, 0.3)",
    border: "border-teal-500/30 hover:border-teal-400",
    desc: "Relational Schemas & Prisma",
    position: { bottom: "4%", left: "40%" },
    delay: 0.8,
  },
];

export function TechCluster() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  return (
    <div className="relative w-full max-w-lg h-[440px] mx-auto flex items-center justify-center select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Outer Orbit Rings */}
      <div className="absolute w-[360px] h-[360px] rounded-full border border-white/5 animate-spin-slow pointer-events-none" />
      <div className="absolute w-[260px] h-[260px] rounded-full border border-indigo-500/10 pointer-events-none" />

      {/* Center Core Badge */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="relative z-20 flex flex-col items-center justify-center w-36 h-36 rounded-full glass-dark border border-indigo-400/40 p-4 text-center shadow-2xl glow-violet-sm"
      >
        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-1 border border-indigo-400/30">
          <Boxes className="w-5 h-5 text-indigo-300 animate-pulse" />
        </div>
        <span className="font-bold text-xs text-foreground/90 leading-tight">Full-Stack & AI</span>
        <span className="font-mono text-[9px] text-indigo-400 uppercase tracking-widest mt-0.5">Architecture</span>
      </motion.div>

      {/* Floating Tech Orbs */}
      {techItems.map((item) => {
        const Icon = item.icon;
        const isHovered = hoveredTech?.id === item.id;

        return (
          <motion.div
            key={item.id}
            style={{ ...item.position }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0, 8, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: item.delay },
              scale: { duration: 0.6, delay: item.delay },
              y: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              },
            }}
            onMouseEnter={() => setHoveredTech(item)}
            onMouseLeave={() => setHoveredTech(null)}
            className="absolute z-10"
          >
            <motion.div
              whileHover={{ scale: 1.15, zIndex: 30 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full glass-dark border ${item.border} backdrop-blur-md cursor-pointer transition-all duration-300 shadow-lg`}
              style={{
                boxShadow: isHovered ? `0 0 20px ${item.glow}` : "none",
              }}
            >
              <Icon className={`w-4 h-4 ${item.color}`} />
              <span className="font-mono text-xs font-medium text-foreground/85 whitespace-nowrap">
                {item.name}
              </span>
            </motion.div>

            {/* Hover Description Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2.5 py-1 rounded bg-[#0b1220] border border-white/10 shadow-xl pointer-events-none z-40 whitespace-nowrap"
              >
                <span className="font-mono text-[10px] text-indigo-300 font-semibold">{item.desc}</span>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
