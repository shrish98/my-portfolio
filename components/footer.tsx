import { site } from '@/lib/data';

export function Footer() {
  return (
    <footer className="shell overflow-hidden pb-10 pt-16">
      <p
        aria-label={site.name}
        className="select-none whitespace-nowrap font-serif text-[clamp(4rem,17vw,16rem)] leading-[0.8] tracking-[-0.04em]"
      >
        {'Shrishti'.split('').map((letter, i) => (
          <span
            key={i}
            aria-hidden
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-[0.12em] hover:-rotate-6 hover:text-accent"
          >
            {letter}
          </span>
        ))}
        <span aria-hidden className="text-accent">.</span>
      </p>

      <div className="mt-10 flex flex-col gap-4 border-t border-ink/15 pt-6 text-sm text-ink-mute md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Set in Instrument Serif, Instrument Sans &amp; JetBrains Mono. Built with Next.js.</p>
        <a href="#top" className="link w-fit text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
