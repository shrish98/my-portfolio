"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Github, Linkedin, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (formStatus === 'success') {
      const link = `mailto:shrishtitomar300@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
      window.open(link);
      setTimeout(() => { setName(''); setEmail(''); setMessage(''); setFormStatus(null); }, 3000);
    }
  }, [formStatus, name, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setFormStatus('success'); }, 1200);
  };

  const infoItems = [
    { icon: Mail, label: "Email", value: "shrishtitomar300@gmail.com", href: "mailto:shrishtitomar300@gmail.com" },
    { icon: MapPin, label: "Location", value: "Delhi, India", href: null },
  ];

  const socialLinks = [
    { href: "https://github.com/shrish98", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/shrishti-tomar-a924a1274/", icon: Linkedin, label: "LinkedIn" },
  ];

  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-foreground/30 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-all duration-200 text-sm";

  return (
    <section ref={ref} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="eyebrow mb-3">GET IN TOUCH</span>
        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Let&apos;s Build <span className="gradient-text">Together</span>
        </h2>
        <p className="text-foreground/60 max-w-lg mx-auto text-base leading-relaxed">
          Have a project in mind, an engineering opportunity, or just want to connect? Send me a message below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="glass-card p-8 border border-white/10 h-full shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-foreground">
              <Send className="h-5 w-5 text-emerald-400" />
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="cn" className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Name</label>
                <input type="text" id="cn" value={name} onChange={e => setName(e.target.value)} className={inputCls} placeholder="Your name" required />
              </div>
              <div>
                <label htmlFor="ce" className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Email</label>
                <input type="email" id="ce" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} placeholder="your@email.com" required />
              </div>
              <div>
                <label htmlFor="cm" className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Message</label>
                <textarea id="cm" value={message} onChange={e => setMessage(e.target.value)} rows={5} className={`${inputCls} resize-none`} placeholder="Tell me about your project or opportunity..." required />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading || formStatus === 'success'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="accent-btn w-full py-3.5 px-6 rounded-xl text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {isLoading ? (
                  <><svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Sending...</>
                ) : formStatus === 'success' ? (
                  <><CheckCircle2 className="h-4 w-4" />Sent!</>
                ) : (
                  <><Send className="h-4 w-4" />Send Message<ArrowRight className="h-4 w-4 ml-1" /></>
                )}
              </motion.button>

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm text-center flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Opening your email client... I&apos;ll respond shortly!
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="glass-card p-7 border border-white/10 space-y-4">
            <span className="eyebrow">DIRECT DETAILS</span>
            {infoItems.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8 hover:border-white/20 transition-all duration-200">
                <div className="h-10 w-10 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0 border border-white/10 text-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-foreground/40 font-medium mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-foreground hover:text-emerald-400 transition-colors truncate block">{value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground truncate">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-7 border border-white/10 space-y-3">
            <span className="eyebrow mb-2">ONLINE PRESENCE</span>
            <div className="space-y-2.5">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/8 text-foreground/70 hover:text-foreground hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{label}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-40" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/3">
            <p className="text-xs text-foreground/60 leading-relaxed font-sans">
              I usually respond within <span className="text-foreground font-semibold">24 hours</span>. Looking forward to discussing projects or opportunities!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}