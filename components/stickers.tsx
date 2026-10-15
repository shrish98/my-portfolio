'use client';

import { RefObject, useState } from 'react';
import { motion } from 'framer-motion';

const shadow = (y: number, blur: number, alpha: number) =>
  `drop-shadow(0px 1px 1px rgba(28,26,22,0.18)) drop-shadow(0px ${y}px ${blur}px rgba(28,26,22,${alpha}))`;

// 18-point starburst, generated once.
const burst = Array.from({ length: 36 }, (_, i) => {
  const angle = (i / 36) * Math.PI * 2 - Math.PI / 2;
  const r = i % 2 === 0 ? 48 : 40;
  return `${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`;
}).join(' ');

type Sticker = {
  id: string;
  label: string;
  rotate: number;
  position: string;
  body: React.ReactNode;
};

const stickers: Sticker[] = [
  {
    id: 'dsa',
    label: '400+ DSA problems solved',
    rotate: -9,
    position: 'left-[2%] top-[14%] md:left-[8%] lg:left-0 lg:top-[4%]',
    body: (
      <div className="grid h-[112px] w-[112px] place-items-center rounded-full bg-marker text-center ring-[5px] ring-white md:h-[136px] md:w-[136px]">
        <div>
          <p className="font-serif text-[2.2rem] leading-none md:text-[2.75rem]">400+</p>
          <p className="label mt-1.5 text-[8.5px] leading-tight md:text-[9.5px]">
            DSA problems
            <br />
            solved
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'hackathons',
    label: '3rd of 80+ teams at the GTBIT hackathon',
    rotate: 11,
    position: 'left-[36%] top-0 md:left-[30%] lg:left-[42%] lg:top-[15%]',
    body: (
      <div className="relative h-[128px] w-[128px] md:h-[152px] md:w-[152px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          {/* The deeper red keeps the small label above 4.5:1 contrast. */}
          <polygon points={burst} fill="rgb(var(--accent-deep))" stroke="#fff" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
        <div className="relative grid h-full place-items-center text-center text-paper">
          <div>
            <p className="font-serif text-[2.2rem] italic leading-none md:text-[2.6rem]">3rd</p>
            <p className="label mt-1 text-[8.5px] leading-tight md:text-[9.5px]">
              of 80+ teams
              <br />
              GTBIT hack
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'latency',
    label: 'RepoInsight answer time cut from 12 seconds to 3',
    rotate: 7,
    position: 'left-[54%] top-[36%] md:left-[60%] md:top-[30%] lg:left-[12%] lg:top-[45%]',
    body: (
      <div className="rounded-[10px] bg-white p-[5px]">
        <div className="whitespace-nowrap rounded-[6px] border-[1.5px] border-dashed border-ink/35 px-4 py-2.5 text-center">
          <p className="label text-[9px] text-ink-mute">RepoInsight</p>
          <p className="mt-1.5 font-serif text-[1.9rem] leading-none md:text-[2.3rem]">12s → 3s</p>
          <p className="label mt-1.5 text-[9px] text-ink-mute">answer time</p>
        </div>
      </div>
    ),
  },
  // Last in the list so it starts on top of the pile: it's the one message that must stay readable.
  {
    id: 'open',
    label: 'Open to SDE internships',
    rotate: -4,
    position: 'left-[4%] top-[76%] md:left-[20%] md:top-[66%] lg:left-[6%] lg:top-[67%]',
    body: (
      <div className="flex items-center gap-2.5 whitespace-nowrap rounded-full bg-cobalt px-5 py-3 text-[15px] font-semibold text-white ring-[5px] ring-white md:text-base">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7CF0A9] opacity-70 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7CF0A9]" />
        </span>
        Open to SDE internships
      </div>
    ),
  },
];

export function StickerBoard({ bounds }: { bounds: RefObject<HTMLElement> }) {
  const [stack, setStack] = useState(stickers.map((s) => s.id));
  const raise = (id: string) => setStack((s) => [...s.filter((x) => x !== id), id]);

  return (
    <div className="relative h-[300px] lg:h-full lg:min-h-[460px]">
      {stickers.map((s, i) => (
        <motion.div
          key={s.id}
          role="img"
          aria-label={s.label}
          drag
          dragConstraints={bounds}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 18 }}
          onPointerDown={() => raise(s.id)}
          initial={{ opacity: 0, scale: 0.4, rotate: s.rotate - 30 }}
          animate={{ opacity: 1, scale: 1, rotate: s.rotate }}
          transition={{ type: 'spring', stiffness: 240, damping: 15, delay: 0.9 + i * 0.12 }}
          whileHover={{ scale: 1.05 }}
          whileDrag={{ scale: 1.1, rotate: 0, filter: shadow(22, 22, 0.22) }}
          style={{ zIndex: stack.indexOf(s.id) + 1, filter: shadow(6, 10, 0.12) }}
          className={`absolute cursor-grab touch-none select-none active:cursor-grabbing ${s.position}`}
        >
          {s.body}
        </motion.div>
      ))}
    </div>
  );
}
