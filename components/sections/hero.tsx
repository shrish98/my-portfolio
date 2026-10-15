'use client';

import { Fragment, useRef } from 'react';
import { motion } from 'framer-motion';
import { CurlyArrow, Swoosh } from '@/components/doodles';
import { StickerBoard } from '@/components/stickers';
import { site } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as const;
const STAGGER = 0.045;

// Each word rises out of its own mask, so the reveal works however the line wraps.
function Words({ text, from }: { text: string; from: number }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease, delay: (from + i) * STAGGER }}
            >
              {word}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </>
  );
}

function PhotoPill() {
  return (
    <span className="relative inline-block">
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -4 }}
        whileHover={{ scale: 1.08, rotate: 4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 3 * STAGGER + 0.2 }}
        className="relative inline-block h-[0.74em] w-[1.42em] translate-y-[0.06em] overflow-hidden rounded-full bg-paper-deep shadow-[0_0_0_0.045em_rgb(var(--ink))]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative crop of the About photo */}
        <img
          src="/avatar-1.jpg"
          alt=""
          className="absolute inset-0 h-full w-full scale-[1.7] object-cover"
          style={{ objectPosition: '42% 22%', transformOrigin: '41% 27%' }}
        />
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="pointer-events-none absolute bottom-[80%] left-[62%] hidden -rotate-6 items-start whitespace-nowrap font-hand text-[0.3em] leading-none text-accent-deep md:flex"
      >
        <CurlyArrow className="mt-[0.25em] h-[1.5em] w-[1.9em]" delay={1.2} />
        <span className="-ml-[0.1em]">that’s me!</span>
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="top" ref={ref} className="relative pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="label flex items-center justify-between border-b border-ink/15 pb-4 text-ink-mute"
        >
          <span>Portfolio — Ed. 2026</span>
          <span className="hidden sm:inline">Backend · Full-stack · AI</span>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-y-14 md:mt-20 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
          <h1 className="font-serif text-[clamp(3.1rem,7.4vw,7.5rem)] leading-[0.95] tracking-[-0.025em] [text-wrap:balance] lg:col-span-8 lg:row-start-1">
            <Words text="Hi, I’m Shrishti" from={0} />
            <PhotoPill /> <Words text="— I build full-stack apps & teach them to" from={4} />
            <span className="relative inline-block">
              <Words text="think." from={13} />
              <Swoosh delay={1} className="absolute -bottom-[0.06em] left-[2%] h-[0.2em] w-[88%] text-accent" />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.75 }}
            className="lg:col-span-5 lg:row-start-2"
          >
            <p className="max-w-md text-lg leading-relaxed text-ink-soft md:text-xl md:leading-relaxed">
              Software developer in Delhi, mostly on the backend: job queues, RAG pipelines and real-time
              dashboards, built with Node.js, PostgreSQL, Redis and Docker.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="btn-ink">
                See the work <span aria-hidden>↓</span>
              </a>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn-line">
                Résumé <span aria-hidden>↗</span>
              </a>
            </div>
          </motion.div>

          <div className="relative lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
            <StickerBoard bounds={ref} />
            <motion.p
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="pointer-events-none absolute -bottom-8 right-0 -rotate-3 whitespace-nowrap font-hand text-2xl text-ink-soft lg:bottom-0 lg:left-[6%] lg:right-auto"
            >
              psst, they peel off. go on, drag one.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
