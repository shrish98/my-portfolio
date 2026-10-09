"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ThemeSwitcher } from '@/components/theme-switcher';

const navItems = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["projects", "about", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{
          scaleX,
          backgroundColor: "var(--theme-accent)",
        }}
      />

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-[#080d0f]/80 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/40" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-foreground group-hover:border-emerald-400/40 transition-colors duration-200">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-foreground tracking-tight group-hover:opacity-90 transition-opacity">
                  Shrishti Tomar
                </span>
                <span className="text-[10px] text-foreground/40 font-mono tracking-wider">
                  Full-Stack & AI
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-1 font-medium text-sm">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-full transition-all duration-200 ${
                      activeSection === item.name.toLowerCase()
                        ? "text-foreground bg-white/8 font-semibold"
                        : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Theme Switcher Widget */}
              <ThemeSwitcher />

              {/* Hire Me CTA */}
              <a
                href="#contact"
                className="accent-btn px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hire Me</span>
              </a>
            </div>

            {/* Mobile Toggle & Theme Switcher */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeSwitcher />
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="flex items-center justify-center h-10 w-10 rounded-lg text-foreground/70 hover:text-foreground bg-white/5 border border-white/10 transition-all duration-200"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-[#0a0f12] border-t border-white/8 font-sans"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                      activeSection === item.name.toLowerCase()
                        ? "text-foreground bg-white/10 font-semibold"
                        : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="accent-btn flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-semibold"
                >
                  <Sparkles className="w-4 h-4" />
                  Hire Me
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
