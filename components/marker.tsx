'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

// Inline highlighter that sweeps across the words once they scroll into view.
export function Marker({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <mark ref={ref} className={`marker bg-transparent text-inherit ${inView ? 'is-on' : ''}`}>
      {children}
    </mark>
  );
}
