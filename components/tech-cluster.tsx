"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
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
    desc: "Agentic AI Orchestration",
    position: { top: "5%", left: "12%" },
    delay: 0,
  },
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "frontend",
    icon: Globe,
    desc: "App Router & SSR",
    position: { top: "18%", right: "8%" },
    delay: 0.2,
  },
  {
    id: "bullmq",
    name: "BullMQ",
    category: "backend",
    icon: Zap,
    desc: "Distributed Async Queues",
    position: { top: "44%", left: "2%" },
    delay: 0.4,
  },
  {
    id: "gemini",
    name: "Gemini AI",
    category: "ai",
    icon: Activity,
    desc: "Multimodal LLM Embeddings",
    position: { top: "48%", right: "4%" },
    delay: 0.6,
  },
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    icon: Code2,
    desc: "UI Framework",
    position: { bottom: "16%", left: "14%" },
    delay: 0.8,
  },
  {
    id: "redis",
    name: "Redis",
    category: "db",
    icon: Database,
    desc: "Sub-2ms Queue & Cache",
    position: { bottom: "10%", right: "16%" },
    delay: 1.0,
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    icon: Container,
    desc: "Multi-Container Orchestration",
    position: { top: "2%", right: "38%" },
    delay: 0.3,
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "db",
    icon: Server,
    desc: "Relational Schemas & Prisma",
    position: { bottom: "2%", left: "38%" },
    delay: 0.7,
  },
];

export function TechCluster() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  return (
    <div className="relative w-full max-w-lg h-[420px] mx-auto flex items-center justify-center select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-white/2 blur-3xl pointer-events-none" />

      {/* Outer Orbit Rings */}
      <div className="absolute w-[350px] h-[350px] rounded-full border border-white/8 pointer-events-none" />
      <div className="absolute w-[250px] h-[250px] rounded-full border border-white/5 pointer-events-none" />

      {/* Center Core Badge */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative z-20 flex flex-col items-center justify-center w-36 h-36 rounded-2xl glass-dark border border-white/15 p-4 text-center shadow-2xl shadow-black/60"
      >
        <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center mb-1.5 border border-white/12">
          <Boxes className="w-5 h-5 text-foreground opacity-90 animate-pulse" />
        </div>
        <span className="font-bold text-xs text-foreground leading-tight">Full-Stack & AI</span>
        <span className="font-mono text-[9px] text-foreground/50 uppercase tracking-widest mt-0.5">Architecture</span>
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
              y: [0, -6, 0, 6, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: item.delay },
              scale: { duration: 0.5, delay: item.delay },
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
              whileHover={{ scale: 1.1, zIndex: 30 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card border border-white/12 hover:border-white/30 backdrop-blur-md cursor-pointer transition-all duration-200 shadow-xl"
            >
              <Icon className="w-4 h-4 text-foreground/80" />
              <span className="font-mono text-xs font-semibold text-foreground/90 whitespace-nowrap">
                {item.name}
              </span>
            </motion.div>

            {/* Hover Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 rounded-lg bg-[#0e1619] border border-white/15 shadow-2xl pointer-events-none z-40 whitespace-nowrap"
              >
                <span className="font-mono text-[10px] text-foreground/80 font-medium">{item.desc}</span>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
