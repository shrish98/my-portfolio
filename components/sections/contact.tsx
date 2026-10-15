'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { site } from '@/lib/data';

const topics = [
  { id: 'internship', label: 'Internship', subject: 'Internship opportunity', hint: 'The role, the team, and rough dates…' },
  { id: 'role', label: 'Full-time role', subject: 'Full-time role', hint: 'The role, the team, and where it’s based…' },
  { id: 'project', label: 'Project', subject: 'Project enquiry', hint: 'What you’d like built, and by when…' },
  { id: 'hello', label: 'Just saying hi', subject: 'Hello', hint: 'A question about a project, or just hi…' },
] as const;

type TopicId = (typeof topics)[number]['id'];

// Ticket numbers are stamped from the current Delhi time, client-side only to keep hydration stable.
function useTicketNumber() {
  const [number, setNumber] = useState<string | null>(null);
  useEffect(() => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: site.timeZone,
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(new Date());
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
    setNumber(`ST-${get('month')}${get('day')}-${get('hour')}${get('minute')}`);
  }, []);
  return number;
}

export function Contact() {
  const [topicId, setTopicId] = useState<TopicId>('internship');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const ticket = useTicketNumber();
  const topic = topics.find((t) => t.id === topicId)!;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    const from = name.trim();
    const subject = `[${ticket ?? 'ST'}] ${topic.subject}${from ? ` from ${from}` : ''}`;
    const body = from ? `${message}\n\n— ${from}` : message;
    // Let the stamp land before handing off to the mail app.
    setTimeout(() => {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 650);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="shell py-20 md:py-32">
      <SectionHeading
        index="04"
        kicker="Contact"
        title={
          <>
            Open a <em>ticket</em>
          </>
        }
        aside="Internships, roles, or something you need built. Pick a type, add a line or two, and it lands in my inbox."
      />

      <div className="mx-auto mt-16 max-w-5xl drop-shadow-[0_24px_30px_rgb(28_26_22/0.16)] md:mt-24">
        <form onSubmit={send} className="ticket grid grid-cols-1 rounded-lg bg-card md:grid-cols-[1fr_17rem]">
          <div className="p-6 sm:p-10">
            <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-4">
              <p className="label text-ink">Request form</p>
              <p className="label tabular-nums text-ink-mute">No. {ticket ?? 'ST-····-····'}</p>
            </div>

            <fieldset className="mt-7">
              <legend className="label text-ink-mute">What’s this about?</legend>
              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                {topics.map((t) => (
                  <label key={t.id} className="flex cursor-pointer items-center gap-2.5 text-[15px]">
                    <input
                      type="radio"
                      name="topic"
                      value={t.id}
                      checked={topicId === t.id}
                      onChange={() => setTopicId(t.id)}
                      className="peer sr-only"
                    />
                    <span className="relative h-[1.1rem] w-[1.1rem] shrink-0 rounded-[4px] border-[1.5px] border-ink/45 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                      {topicId === t.id && <Check />}
                    </span>
                    <span className={topicId === t.id ? 'font-medium text-ink' : 'text-ink-soft'}>{t.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label htmlFor="message" className="label mt-9 block text-ink-mute">
              Details
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={topic.hint}
              className="ruled mt-1 w-full resize-none bg-transparent text-[17px] text-ink placeholder:text-ink-mute/70 focus:outline-none"
            />

            <div className="mt-6 flex items-baseline gap-4">
              <label htmlFor="name" className="label shrink-0 text-ink-mute">
                From
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (and company, if any)"
                autoComplete="name"
                className="w-full border-b border-ink/20 bg-transparent pb-1.5 text-[17px] text-ink placeholder:text-ink-mute/70 focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          <aside className="relative flex flex-col border-t-2 border-dashed border-ink/20 p-6 sm:p-10 md:border-l-2 md:border-t-0 md:p-8">
            <p className="label text-ink-mute">Ticket</p>
            <p className="mt-2 font-mono text-xl tabular-nums tracking-tight">{ticket ?? 'ST-····-····'}</p>

            <dl className="mt-6 space-y-3 text-[14px]">
              <StubRow term="Assignee" detail={site.name} />
              <StubRow term="Type" detail={topic.label} />
              <StubRow
                term="Status"
                detail={
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${sent ? 'bg-accent' : 'bg-moss'}`} />
                    {sent ? 'Sent' : 'Open'}
                  </span>
                }
              />
              <StubRow term="Reply" detail="Usually within a day" />
            </dl>

            <button type="submit" className="btn-ink mt-8 justify-center md:mt-auto">
              {sent ? 'Opening mail app…' : 'Send ticket'} <span aria-hidden>→</span>
            </button>
            <p className="mt-3 text-center text-[13px] leading-snug text-ink-mute">
              Opens your email app with this filled in.
            </p>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.8, rotate: -24 }}
                  animate={{ opacity: 1, scale: 1, rotate: -12 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  className="pointer-events-none absolute right-5 top-6 md:right-4 md:top-5"
                  aria-hidden
                >
                  <ReceivedStamp />
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </form>
      </div>

      <div className="mx-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[15px]">
        <span className="text-ink-mute">Rather just email?</span>
        <button type="button" onClick={copyEmail} className="link font-medium" aria-live="polite">
          {copied ? 'Copied to clipboard ✓' : 'Copy my email'}
        </button>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link font-medium">
          LinkedIn ↗
        </a>
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="link font-medium">
          GitHub ↗
        </a>
        <a href={site.leetcode} target="_blank" rel="noopener noreferrer" className="link font-medium">
          LeetCode ↗
        </a>
      </div>
    </section>
  );
}

function StubRow({ term, detail }: { term: string; detail: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-2.5">
      <dt className="label text-ink-mute">{term}</dt>
      <dd className="text-right font-medium">{detail}</dd>
    </div>
  );
}

// Hand-drawn tick, penned in when an option is picked.
function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="absolute -inset-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+0.75rem)] text-accent-deep">
      <motion.path
        d="M3.5 12.5c2 1.5 3.5 3.3 4.8 5.6C10.6 12.4 14.2 7.2 20.5 3"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </svg>
  );
}

function ReceivedStamp() {
  return (
    <div className="rounded-[6px] border-[2.5px] border-accent-deep/85 p-[3px] text-accent-deep/90 mix-blend-multiply">
      <div className="rounded-[3px] border-[1.5px] border-accent-deep/85 px-3.5 py-1.5 text-center">
        <p className="font-mono text-[1.35rem] font-bold leading-none tracking-[0.12em]">RECEIVED</p>
        <p className="mt-1 font-mono text-[9px] tracking-[0.2em]">SHRISHTI · DELHI</p>
      </div>
    </div>
  );
}
