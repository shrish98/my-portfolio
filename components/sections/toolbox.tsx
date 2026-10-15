'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { alsoInTheBag, projects, shippedWith, site } from '@/lib/data';

// Eased, then quantised into small steps so the paper feeds like a thermal printer.
const printerEase = (t: number) => Math.round((1 - Math.pow(1 - t, 2.2)) * 60) / 60;

// Fixed bar widths so the barcode is identical on server and client.
const ITEM_COUNT = shippedWith.length + alsoInTheBag.reduce((n, line) => n + line.split(', ').length, 0);

const BARS = [3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 1, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1];

function useStamp() {
  const [stamp, setStamp] = useState<{ date: string; time: string } | null>(null);
  useEffect(() => {
    const now = new Date();
    setStamp({
      date: now.toLocaleDateString('en-GB', { timeZone: site.timeZone }),
      time: now.toLocaleTimeString('en-GB', { timeZone: site.timeZone, hour: '2-digit', minute: '2-digit' }),
    });
  }, []);
  return stamp;
}

export function Toolbox() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [printRun, setPrintRun] = useState(0);
  const stamp = useStamp();

  return (
    <section id="toolbox" className="shell py-20 md:py-32">
      <SectionHeading
        index="03"
        kicker="Toolbox"
        title={
          <>
            The <em>itemised</em> stack
          </>
        }
        aside="No logo wall. Here’s what I’ve actually shipped with, and where."
      />

      <div className="mt-16 grid grid-cols-1 gap-16 md:mt-24 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="text-lg leading-relaxed text-ink-soft">
            Every line on the receipt ends with the project it went into, so you can check my working. The numbers
            map to the work above:
          </p>
          <ul className="mt-8 border-t border-ink/15">
            {projects.map((p) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  className="group flex items-baseline gap-4 border-b border-ink/15 py-3.5 transition-colors hover:text-accent-deep"
                >
                  <span className="font-mono text-sm text-accent-deep">{p.number}</span>
                  <span className="font-serif text-[1.65rem] leading-none">{p.name}</span>
                  <span className="ml-auto text-sm text-ink-mute transition-transform group-hover:-translate-y-0.5">
                    ↑
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPrintRun((n) => n + 1)}
            className="btn-line mt-10 text-sm"
          >
            <span aria-hidden>⎙</span> Print another copy
          </button>
        </div>

        <div ref={ref} className="md:col-span-6 md:col-start-7">
          <div className="mx-auto w-full max-w-[25rem]">
            {/* Printer mouth */}
            <div className="relative z-10 h-6 rounded-full bg-ink shadow-[0_8px_16px_-6px_rgb(var(--ink)/0.5)]">
              <div className="absolute inset-x-6 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-black" />
            </div>

            <div className="-mt-3 overflow-hidden px-4 pb-10">
              <motion.div
                key={printRun}
                initial={{ y: '-100%' }}
                animate={inView ? { y: '0%' } : undefined}
                transition={{ duration: 2.6, ease: printerEase, delay: printRun ? 0.1 : 0.3 }}
                style={{ filter: 'drop-shadow(0 14px 18px rgb(28 26 22 / 0.16))' }}
              >
                <Receipt stamp={stamp} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ left, right, dots = true }: { left: React.ReactNode; right?: React.ReactNode; dots?: boolean }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="shrink-0">{left}</span>
      <span aria-hidden className="flex-1 overflow-hidden whitespace-nowrap text-ink/30">
        {dots && '.'.repeat(60)}
      </span>
      {right && <span className="shrink-0 text-right">{right}</span>}
    </div>
  );
}

const Rule = () => (
  <div aria-hidden className="my-3 overflow-hidden whitespace-nowrap text-ink/40">
    {'- '.repeat(40)}
  </div>
);

function Receipt({ stamp }: { stamp: { date: string; time: string } | null }) {
  return (
    <div className="zigzag bg-[#FDFCF8] px-6 pt-7 font-mono text-[12.5px] leading-[1.75] text-ink">
      <div className="text-center">
        <p className="font-serif text-[2rem] italic leading-none">Shrishti &amp; Co.</p>
        <p className="mt-2 uppercase tracking-[0.14em] text-ink-soft">Full-stack supply</p>
        <p className="uppercase tracking-[0.14em] text-ink-soft">Delhi, IN · Est. 2023</p>
      </div>

      <Rule />
      <Line dots={false} left={`DATE ${stamp?.date ?? '--/--/----'}`} right={`TIME ${stamp?.time ?? '--:--'}`} />
      <Line dots={false} left="ORDER #2027" right="TILL 01" />
      <Rule />

      <Line dots={false} left={<span className="font-bold">SHIPPED WITH</span>} right={<span className="font-bold">IN #</span>} />
      <div className="mt-1">
        {shippedWith.map(({ item, usedIn }) => (
          <Line key={item} left={item} right={usedIn.join(' ')} />
        ))}
      </div>

      <Rule />
      <p className="font-bold">ALSO IN THE BAG</p>
      <ul className="mt-1">
        {alsoInTheBag.map((line) => (
          <li key={line}>+ {line}</li>
        ))}
      </ul>

      <Rule />
      <Line left="ITEMS" right={ITEM_COUNT} />
      <Line left={<span className="font-bold">TOTAL</span>} right={<span className="font-bold">1 DEVELOPER</span>} />
      <Line left="PAID IN" right="CURIOSITY + CHAI" />
      <Rule />

      <div aria-hidden className="mx-auto mt-4 flex h-12 w-fit items-stretch gap-[2px]">
        {BARS.map((w, i) => (
          <span key={i} className="bg-ink" style={{ width: w * 1.5 }} />
        ))}
      </div>
      <p className="mt-2 text-center tracking-[0.3em] text-ink-soft">0427 2027 0001</p>
      <p className="mt-4 text-center uppercase tracking-[0.12em]">*** Thanks for scrolling ***</p>
    </div>
  );
}
