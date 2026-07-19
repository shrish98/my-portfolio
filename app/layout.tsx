import './globals.css';
import type { Metadata } from 'next';
import { Outfit, Fira_Code } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://github.com/shrish98'),
  title: 'Shrishti Tomar — Full-Stack Developer & AI Engineer',
  description: 'Portfolio of Shrishti Tomar, a full-stack software engineer and BTech CSE student specializing in Next.js, React, LangGraph, and Gemini AI.',
  keywords: ['Shrishti Tomar', 'shrish98', 'developer', 'portfolio', 'software engineer', 'full-stack', 'AI engineer', 'Next.js', 'React', 'Delhi'],
  authors: [{ name: 'Shrishti Tomar' }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/shrish98',
    title: 'Shrishti Tomar — Full-Stack Developer & AI Engineer',
    description: 'Portfolio of Shrishti Tomar, building modern web applications and AI agents.',
    siteName: 'Shrishti Tomar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shrishti Tomar — Full-Stack Developer & AI Engineer',
    description: 'Portfolio of Shrishti Tomar, building modern web applications and AI agents.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${firaCode.variable} font-[var(--font-outfit)]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}