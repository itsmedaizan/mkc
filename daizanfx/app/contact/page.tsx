'use client';

import { useState } from 'react';
import {
  Send,
  MessageCircle,
  Instagram,
  Mail,
  User,
  AtSign,
  FileText,
  MessageSquare,
  CheckCircle2,
  Zap,
  ExternalLink,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const contactInfo = [
  {
    icon: Send,
    label: 'Telegram',
    value: '@DaizanFX',
    href: 'https://t.me/daizanfx',
    description: 'Fastest response — usually within 1 hour',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    hoverBorder: 'hover:border-blue-400/40',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+1 (555) 000-0000',
    href: 'https://wa.me/15550000000',
    description: 'Business hours: 8am – 8pm UTC',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
    hoverBorder: 'hover:border-green-400/40',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@daizanfx',
    href: 'https://instagram.com/daizanfx',
    description: 'Follow for market insights & updates',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400/20',
    hoverBorder: 'hover:border-pink-400/40',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@daizanfx.com',
    href: 'mailto:info@daizanfx.com',
    description: 'Response within 24 hours',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/20',
    hoverBorder: 'hover:border-cyan-400/40',
  },
];

const subjects = [
  'General Inquiry',
  'Membership / Pricing',
  'Technical Support',
  'Signal Question',
  'Partnership / Collaboration',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: subjects[0],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#050a14' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-14 overflow-hidden" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            <span className="text-white">Get </span>
            <span className="gradient-text">In Touch</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Have questions about our signals or membership? We&apos;re here to help. Reach out on any platform below.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="pb-24" style={{ backgroundColor: '#050a14' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>

              {submitted ? (
                <div className="glass-card p-10 rounded-2xl text-center" style={{ boxShadow: '0 0 40px rgba(0,212,255,0.08)' }}>
                  <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours. For faster response, message us on Telegram.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: subjects[0], message: '' });
                    }}
                    className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-7 rounded-2xl space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        Full Name
                      </div>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <div className="flex items-center gap-2">
                        <AtSign className="w-3.5 h-3.5 text-cyan-400" />
                        Email Address
                      </div>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 text-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        Subject
                      </div>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 text-sm appearance-none cursor-pointer"
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s} className="bg-[#0a0f1e] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                        Message
                      </div>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Cards */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Reach Us Directly</h2>
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-5 rounded-2xl border ${info.borderColor} ${info.hoverBorder} transition-all duration-300 group hover:-translate-y-0.5`}
                      style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
                    >
                      <div className={`w-12 h-12 rounded-xl ${info.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className={`w-5 h-5 ${info.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm mb-0.5">{info.label}</div>
                        <div className={`${info.color} font-mono text-sm font-medium mb-1`}>{info.value}</div>
                        <div className="text-slate-500 text-xs">{info.description}</div>
                      </div>
                      <ExternalLink className={`w-4 h-4 ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0`} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TELEGRAM CTA ── */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="glass-card p-10 rounded-2xl text-center relative overflow-hidden"
            style={{ boxShadow: '0 0 60px rgba(0,212,255,0.08)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }} />

            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center mx-auto mb-5">
                <Send className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Join Our <span className="gradient-text">Telegram Community</span>
              </h2>
              <p className="text-slate-400 mb-7 max-w-md mx-auto text-sm">
                Get free market updates, gold analysis, and community discussion. 500+ traders already inside.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://t.me/daizanfx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 w-full sm:w-auto justify-center"
                >
                  <Send className="w-4 h-4" />
                  Join Free Telegram Channel
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/pricing"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-bold text-sm transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <Zap className="w-4 h-4" />
                  Upgrade to Pro for Signals
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
