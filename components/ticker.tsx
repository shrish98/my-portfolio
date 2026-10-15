import { ticker } from '@/lib/data';

// A tilted band of tape running across the page. Pure CSS, pauses on hover.
export function Ticker() {
  const items = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ticker.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-serif text-[1.75rem] italic md:text-[2.1rem]">{item}</span>
          <span aria-hidden className="text-xl text-accent">✺</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden py-10" aria-label="What I work on">
      <div className="-mx-4 -rotate-[1.6deg] bg-ink py-3 text-paper shadow-[0_10px_30px_-12px_rgb(var(--ink)/0.5)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {items(false)}
          {items(true)}
        </div>
      </div>
    </div>
  );
}
