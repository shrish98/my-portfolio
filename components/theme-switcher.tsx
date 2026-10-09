"use client";

import { useState, useEffect, useRef } from 'react';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ThemeId = 'emerald' | 'amber' | 'rose' | 'steel';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  dotColor: string;
  gradient: string;
}

export const themes: ThemeOption[] = [
  {
    id: 'emerald',
    name: 'Emerald Obsidian',
    dotColor: '#10b981',
    gradient: 'from-emerald-400 to-teal-200',
  },
  {
    id: 'amber',
    name: 'Warm Amber',
    dotColor: '#f59e0b',
    gradient: 'from-amber-400 to-orange-200',
  },
  {
    id: 'rose',
    name: 'Velvet Rose',
    dotColor: '#fb7185',
    gradient: 'from-rose-400 to-purple-200',
  },
  {
    id: 'steel',
    name: 'Minimal Steel',
    dotColor: '#38bdf8',
    gradient: 'from-sky-400 to-teal-200',
  },
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('emerald');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as ThemeId;
    if (saved && themes.some(t => t.id === saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'emerald');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeTheme = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('portfolio-theme', themeId);
    setIsOpen(false);
  };

  const activeOption = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change color theme"
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 hover:border-white/25 text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer"
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: activeOption.dotColor }}
        />
        <span className="hidden sm:inline">{activeOption.name}</span>
        <Palette className="w-3.5 h-3.5 opacity-60 ml-0.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 py-2 rounded-xl bg-[#0f171c] border border-white/12 shadow-2xl shadow-black/80 backdrop-blur-xl z-50"
          >
            <div className="px-3 py-1 mb-1 border-b border-white/8">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
                Select Theme Palette
              </span>
            </div>

            {themes.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => changeTheme(theme.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 text-foreground font-semibold'
                      : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: theme.dotColor }}
                    />
                    <span>{theme.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
