'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { projects, type Project, type Tint } from '@/lib/data';

const tints: Record<Tint, string> = {
  lilac: 'bg-tint-lilac',
  sage: 'bg-tint-sage',
  peach: 'bg-tint-peach',
  butter: 'bg-tint-butter',
};

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

export function Work() {
  return (
    <section id="work" className="shell py-20 md:py-32">
      <SectionHeading
        index="01"
        kicker="Selected work"
        title={
          <>
            Things I’ve <em>built</em>
          </>
        }
        aside="Four projects, all live. If you only have a minute, start with the first two."
      />

      <ol className="mt-16 space-y-24 md:mt-24 md:space-y-32">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} flip={i % 2 === 1} />
        ))}
      </ol>
    </section>
  );
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const tilt = flip ? 2 : -2;

  return (
    <li id={project.id} className="grid grid-cols-1 scroll-mt-28 items-center gap-10 md:grid-cols-12 md:gap-8">
      <motion.a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name} live`}
        initial="rest"
        whileHover="hover"
        whileInView="shown"
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        variants={{ rest: { opacity: 0, y: 40 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative block aspect-[4/3] rounded-[1.75rem] md:col-span-7 md:aspect-[16/12] ${tints[project.tint]} ${
          flip ? 'md:order-2 md:col-start-6' : ''
        }`}
      >
        <motion.div
          variants={{ rest: { rotate: tilt }, shown: { rotate: tilt }, hover: { rotate: 0, y: -8, scale: 1.02 } }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="absolute inset-x-[7%] top-[16%] overflow-hidden rounded-xl bg-ink shadow-[0_30px_60px_-20px_rgb(var(--ink)/0.45)]"
        >
          <div className="flex items-center gap-3 px-3.5 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-paper/25" />
              <span className="h-2 w-2 rounded-full bg-paper/25" />
              <span className="h-2 w-2 rounded-full bg-paper/25" />
            </span>
            <span className="truncate font-mono text-[11px] text-paper/60">{host(project.live)}</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
          <img
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            loading="lazy"
            width={1024}
            height={455}
            className="aspect-[1024/455] w-full object-cover object-top"
          />
        </motion.div>

        <motion.p
          variants={{ rest: { rotate: flip ? -4 : 3 }, shown: { rotate: flip ? -4 : 3 }, hover: { rotate: flip ? -8 : 7 } }}
          className={`absolute bottom-[7%] max-w-[14rem] bg-marker px-4 py-3 font-hand text-[1.4rem] leading-[1.05] shadow-[0_8px_16px_-8px_rgb(var(--ink)/0.4)] ${
            flip ? 'left-[5%]' : 'right-[5%]'
          }`}
        >
          {project.note}
        </motion.p>
      </motion.a>

      <div className={`md:col-span-5 ${flip ? 'md:order-1 md:col-start-1 md:pr-6' : 'md:pl-6'}`}>
        <p className="label text-ink-mute">
          <span className="text-accent-deep">{project.number}</span> — {project.kind}
        </p>
        <h3 className="mt-4 font-serif text-[clamp(2.6rem,5vw,4rem)] leading-none tracking-[-0.02em]">{project.name}</h3>
        <p className="mt-4 text-xl font-medium leading-snug">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-ink-soft">{project.description}</p>

        {project.metrics.length > 0 && (
          <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-ink/15 pt-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-[13px] leading-snug text-ink-mute">{m.label}</dt>
                <dd className="order-1 whitespace-nowrap font-serif text-[1.55rem] leading-none tracking-[-0.01em] sm:text-[1.9rem]">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-6 font-mono text-[12px] leading-relaxed text-ink-mute">
          {project.stack.join('  /  ')}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-medium">
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="link">
            Visit live site ↗
          </a>
          <a href={project.source} target="_blank" rel="noopener noreferrer" className="link">
            Read the source ↗
          </a>
        </div>
      </div>
    </li>
  );
}
