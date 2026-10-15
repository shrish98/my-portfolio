'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/data';

const format = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: site.timeZone,
});

// Rendered empty on the server so the clock never causes a hydration mismatch.
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {now ?? ' '}
    </span>
  );
}
