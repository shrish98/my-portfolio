import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Hero } from '@/components/sections/hero';
import { Toolbox } from '@/components/sections/toolbox';
import { Work } from '@/components/sections/work';
import { Ticker } from '@/components/ticker';

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="label sr-only z-[70] rounded-full bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Work />
        <About />
        <Toolbox />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
