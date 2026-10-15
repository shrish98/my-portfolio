'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LocalTime } from '@/components/local-time';
import { nav, site } from '@/lib/data';

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the viewport decides which section is "current".
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const targets = ['top', ...nav.map((n) => n.id)].map((id) => document.getElementById(id));
    targets.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Header() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? 'bg-paper/85 shadow-[0_1px_0_rgb(var(--ink)/0.1)] backdrop-blur-md' : ''
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <div className="flex items-baseline gap-4">
            <a href="#top" className="font-serif text-[1.65rem] leading-none tracking-[-0.01em]">
              Shrishti Tomar<span className="text-accent">.</span>
            </a>
            <p className="label hidden text-ink-mute lg:block">
              Delhi <LocalTime className="ml-1 tabular-nums" />
            </p>
          </div>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative px-3 py-2 text-[15px] transition-colors hover:text-ink ${
                  active === item.id ? 'text-ink' : 'text-ink-soft'
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </a>
            ))}
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn-ink ml-3 px-4 py-2.5 text-sm">
              Résumé <span aria-hidden>↗</span>
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="label rounded-full border border-ink/25 px-4 py-2.5 md:hidden"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-paper md:hidden"
          >
            <div className="shell flex h-16 items-center justify-between">
              <span className="font-serif text-[1.65rem] leading-none">
                Shrishti Tomar<span className="text-accent">.</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="label rounded-full border border-paper/30 px-4 py-2.5"
                autoFocus
              >
                Close
              </button>
            </div>

            <nav aria-label="Mobile" className="shell mt-10 flex-1">
              <ol className="space-y-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-paper/15 py-3"
                    >
                      <span className="label text-paper/50">0{i + 1}</span>
                      <span className="font-serif text-6xl leading-none">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>

            <div className="shell flex flex-wrap gap-x-6 gap-y-3 pb-10 text-paper/70">
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="link">Résumé ↗</a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link">LinkedIn ↗</a>
              <a href={site.leetcode} target="_blank" rel="noopener noreferrer" className="link">LeetCode ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
