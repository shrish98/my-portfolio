'use client';

import { motion } from 'framer-motion';
import { Marker } from '@/components/marker';
import { SectionHeading } from '@/components/section-heading';
import { facts, interests } from '@/lib/data';

export function About() {
  return (
    <section id="about" className="shell py-20 md:py-32">
      <SectionHeading
        index="02"
        kicker="About"
        title={
          <>
            Hello, <em>properly</em>.
          </>
        }
        aside="A bit more about me, plus the boring-but-useful facts."
      />

      <div className="mt-16 grid grid-cols-1 gap-16 md:mt-24 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Polaroid />
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <p className="font-serif text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.01em]">
            I like the part of software where the plumbing meets the product: queues, vector stores and auth on one
            side, and an interface people actually enjoy on the other.
          </p>

          <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              I’m a software developer in Delhi, finishing a B.Tech in Computer Science in 2027. Most of my time goes
              into the backend: Node.js and Express services, PostgreSQL and Redis, job queues and WebSockets, all
              packaged with Docker and deployed to AWS.
            </p>
            <p>
              Lately I’ve been building <Marker>RAG pipelines</Marker> and{' '}
              <Marker>multi-agent workflows with LangGraph</Marker>, and caring about the unglamorous parts that make
              them usable: latency, retries, auth and image size. Away from projects I’ve solved 400+ DSA problems and
              placed 3rd of 80+ teams at the GTBIT hackathon.
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-x-10 border-t border-ink/15 sm:grid-cols-2">
            {facts.map(({ term, detail }) => (
              <div key={term} className="flex items-baseline gap-3 border-b border-ink/15 py-3.5">
                <dt className="label shrink-0 text-ink-mute">{term}</dt>
                <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-ink/30" />
                <dd className="text-right text-[15px] font-medium">{detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="label mr-2 text-ink-mute">Currently into</span>
            {interests.map((interest) => (
              <span key={interest} className="rounded-full border border-ink/20 px-3.5 py-1.5 text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Polaroid() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: -40, rotate: -12 }}
      whileInView={{ opacity: 1, y: 0, rotate: -3.5 }}
      whileHover={{ rotate: 0, y: -6 }}
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className="relative mx-auto max-w-[18rem] bg-white sm:max-w-[22rem] p-3.5 pb-0 shadow-[0_2px_3px_rgb(var(--ink)/0.08),0_24px_48px_-16px_rgb(var(--ink)/0.35)] md:sticky md:top-28"
    >
      <span
        aria-hidden
        className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 rotate-[4deg] bg-marker/70 shadow-sm mix-blend-multiply"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, image is pre-sized */}
      <img
        src="/avatar-1.jpg"
        alt="Shrishti Tomar smiling, chin resting on one hand"
        width={768}
        height={1024}
        loading="lazy"
        className="aspect-[4/5] w-full object-cover object-[50%_20%]"
      />
      <figcaption className="py-4 text-center font-hand text-[1.7rem] leading-none text-ink-soft">
        hello from Delhi :)
      </figcaption>
    </motion.figure>
  );
}
