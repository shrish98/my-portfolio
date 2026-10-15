type Props = {
  index: string;
  kicker: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
};

export function SectionHeading({ index, kicker, title, aside }: Props) {
  return (
    <header className="grid grid-cols-1 gap-6 border-b border-ink/15 pb-8 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <p className="label text-ink-mute">
          <span className="text-accent-deep">§ {index}</span>
          <span className="mx-2">—</span>
          {kicker}
        </p>
        <h2 className="mt-5 font-serif text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      {aside && (
        <p className="max-w-sm text-ink-soft [text-wrap:balance] md:col-span-4 md:justify-self-end md:text-right">
          {aside}
        </p>
      )}
    </header>
  );
}
