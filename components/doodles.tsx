'use client';

import { motion } from 'framer-motion';

// Hand-drawn marks. Paths are drawn on with pathLength so they feel penned in.

type DoodleProps = { className?: string; delay?: number };

export function Swoosh({ className, delay = 0 }: DoodleProps) {
  return (
    <svg viewBox="0 0 220 24" fill="none" preserveAspectRatio="none" aria-hidden className={className}>
      <motion.path
        d="M3 15C38 8 79 5 121 6c30 1 60 4 94 9M30 20c38-5 92-7 150-3"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

export function CurlyArrow({ className, delay = 0 }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 70" fill="none" aria-hidden className={className}>
      <motion.path
        d="M84 6C64 2 44 8 42 22c-2 12 14 16 18 6 4-11-12-15-24-6-12 9-20 24-26 40"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay, ease: 'easeInOut' }}
      />
      <motion.path
        d="M3 51l7 12 10-9"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.25, delay: delay + 0.85 }}
      />
    </svg>
  );
}
