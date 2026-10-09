"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Marquee } from "../magicui/marquee";

const techIcons = [
  { src: "https://skillicons.dev/icons?i=react", alt: "React" },
  { src: "https://skillicons.dev/icons?i=nextjs", alt: "Next.js" },
  { src: "https://skillicons.dev/icons?i=ts", alt: "TypeScript" },
  { src: "https://skillicons.dev/icons?i=js", alt: "JavaScript" },
  { src: "https://skillicons.dev/icons?i=tailwind", alt: "Tailwind CSS" },
  { src: "https://skillicons.dev/icons?i=nodejs", alt: "Node.js" },
  { src: "https://skillicons.dev/icons?i=express", alt: "Express" },
  { src: "https://skillicons.dev/icons?i=mongodb", alt: "MongoDB" },
  { src: "https://skillicons.dev/icons?i=postgres", alt: "PostgreSQL" },
  { src: "https://skillicons.dev/icons?i=supabase", alt: "Supabase" },
  { src: "https://skillicons.dev/icons?i=prisma", alt: "Prisma" },
  { src: "https://skillicons.dev/icons?i=docker", alt: "Docker" },
  { src: "https://skillicons.dev/icons?i=aws", alt: "AWS" },
  { src: "https://skillicons.dev/icons?i=git", alt: "Git" },
  { src: "https://skillicons.dev/icons?i=github", alt: "GitHub" },
  { src: "https://skillicons.dev/icons?i=vscode", alt: "VS Code" },
  { src: "https://skillicons.dev/icons?i=vite", alt: "Vite" },
  { src: "https://skillicons.dev/icons?i=python", alt: "Python" },
  { src: "https://skillicons.dev/icons?i=cpp", alt: "C++" },
  { src: "https://skillicons.dev/icons?i=html", alt: "HTML5" },
  { src: "https://skillicons.dev/icons?i=css", alt: "CSS3" },
];

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const firstHalf = techIcons.slice(0, Math.ceil(techIcons.length / 2));
  const secondHalf = techIcons.slice(Math.ceil(techIcons.length / 2));

  return (
    <section ref={ref} className="py-12 w-full relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="eyebrow mb-3">SYSTEM TOOLKIT</span>
        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Tech <span className="gradient-text">Stack</span>
        </h2>
        <p className="text-foreground/60 max-w-lg mx-auto text-base">
          Languages, frameworks, database systems, and cloud tooling powering my applications.
        </p>
      </motion.div>

      {/* Dual Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4"
      >
        {/* Row 1 — Left to Right */}
        <Marquee pauseOnHover className="[--duration:55s]" repeat={3}>
          {firstHalf.map((icon, index) => (
            <IconCard key={index} icon={icon} />
          ))}
        </Marquee>

        {/* Row 2 — Right to Left */}
        <Marquee pauseOnHover reverse className="[--duration:50s]" repeat={3}>
          {secondHalf.map((icon, index) => (
            <IconCard key={index} icon={icon} />
          ))}
        </Marquee>
      </motion.div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
}

function IconCard({ icon }: { icon: { src: string; alt: string } }) {
  return (
    <div className="group flex flex-col items-center justify-center gap-2 w-24 h-24 rounded-2xl glass-card border border-white/10 hover:border-white/25 transition-all duration-200 mx-2 cursor-default shadow-lg">
      <img
        src={icon.src}
        alt={icon.alt}
        className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      <span className="text-[11px] font-semibold text-foreground/50 group-hover:text-foreground transition-colors duration-200 text-center leading-tight">
        {icon.alt}
      </span>
    </div>
  );
}