'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HeroSection } from '@/components/sections/hero';
import { TechStack } from '@/components/sections/tech-stack';
import ProjectsShowcase from '@/components/sections/projects';
import { Header } from '@/components/header';
import Contact from '@/components/sections/contact';
import About from '@/components/sections/about';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }
  }, [pathname]);

  return (
    <main className="min-h-screen bg-background font-[family-name:var(--font-outfit)] text-foreground">
      <Header />
      <section id="hero">
        <HeroSection />
      </section>
      <div className="container mx-auto px-4 md:px-6 space-y-28 pt-16 pb-24">
        <section id="tech-stack">
          <TechStack />
        </section>
        <section id="projects">
          <ProjectsShowcase />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 text-xs font-medium">
            © {new Date().getFullYear()} <span className="text-foreground font-bold">Shrishti Tomar</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-foreground/40">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for new projects & roles</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
