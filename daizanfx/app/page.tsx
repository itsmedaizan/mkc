import Link from 'next/link';
import {
  Target,
  Shield,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Lock,
  ChevronRight,
  Star,
  BarChart2,
  Users,
  Award,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TradingViewChart from '@/components/TradingViewChart';
import SignalCard from '@/components/SignalCard';

const tickerItems = [
  { label: 'XAUUSD', price: '$2,345.67', change: '+0.53%', up: true },
  { label: 'Gold (Spot)', price: '$2,345.12', change: '+$12.34', up: true },
  { label: 'XAGUSD', price: '$29.84', change: '+1.2%', up: true },
  { label: 'DXY', price: '104.23', change: '-0.18%', up: false },
  { label: 'US10Y', price: '4.312%', change: '+0.04%', up: true },
  { label: 'EURUSD', price: '1.08234', change: '+0.12%', up: true },
  { label: 'WTI Oil', price: '$78.45', change: '-0.34%', up: false },
  { label: 'S&P 500', price: '5,234.18', change: '+0.67%', up: true },
  { label: 'XAUUSD', price: '$2,345.67', change: '+0.53%', up: true },
  { label: 'Gold (Spot)', price: '$2,345.12', change: '+$12.34', up: true },
  { label: 'XAGUSD', price: '$29.84', change: '+1.2%', up: true },
  { label: 'DXY', price: '104.23', change: '-0.18%', up: false },
  { label: 'US10Y', price: '4.312%', change: '+0.04%', up: true },
  { label: 'EURUSD', price: '1.08234', change: '+0.12%', up: true },
  { label: 'WTI Oil', price: '$78.45', change: '-0.34%', up: false },
  { label: 'S&P 500', price: '5,234.18', change: '+0.67%', up: true },
];

const features = [
  {
    icon: Target,
    title: 'Precision Signals',
    description:
      'Receive high-probability XAUUSD trade signals with clear entry, take profit, and stop loss levels. Every signal is backed by technical and fundamental analysis.',
    color: 'from-cyan-400 to-blue-500',
    glow: 'shadow-cyan-500/20',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description:
      'Professional-grade risk calculator built specifically for gold trading. Know your exact lot size and position risk before entering any trade.',
    color: 'from-blue-400 to-violet-500',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Live Charts',
    description:
      'Full-featured TradingView charts with XAUUSD price action, key support/resistance levels, and technical indicators updated in real-time.',
    color: 'from-violet-400 to-purple-500',
    glow: 'shadow-violet-500/20',
  },
  {
    icon: BookOpen,
    title: 'Expert Education',
    description:
      'Learn to trade gold like a professional. From reading price action to understanding macro drivers that move gold prices globally.',
    color: 'from-emerald-400 to-cyan-500',
    glow: 'shadow-emerald-500/20',
  },
];

const previewSignals = [
  {
    type: 'BUY' as const,
    entry: '2,318.50',
    tp1: '2,328.00',
    tp2: '2,340.00',
    tp3: '2,356.00',
    sl: '2,305.00',
    status: 'TP2 Hit' as const,
    date: 'Jun 17, 2026',
  },
  {
    type: 'SELL' as const,
    entry: '2,352.00',
    tp1: '2,340.00',
    tp2: '2,326.00',
    tp3: '2,310.00',
    sl: '2,365.00',
    status: 'Active' as const,
    date: 'Jun 18, 2026',
  },
  {
    type: 'BUY' as const,
    entry: '2,298.00',
    tp1: '2,310.00',
    tp2: '2,325.00',
    tp3: '2,345.00',
    sl: '2,282.00',
    status: 'TP3 Hit' as const,
    date: 'Jun 15, 2026',
  },
];

const stats = [
  { value: '500+', label: 'Active Members', icon: Users },
  { value: '89%', label: 'Signal Accuracy', icon: Award },
  { value: '3+', label: 'Years Trading', icon: BarChart2 },
];

const testimonials = [
  {
    name: 'Marcus T.',
    role: 'Full-time Trader',
    avatar: 'MT',
    review:
      "DaizanFX completely transformed how I trade gold. The signals are precise and the risk management framework they provide is world-class. In 6 months I've turned consistent profits for the first time.",
    stars: 5,
    profit: '+$4,200 this month',
  },
  {
    name: 'Aisha Rahman',
    role: 'Swing Trader',
    avatar: 'AR',
    review:
      "The XAUUSD focus is exactly what I needed. Unlike generic signal services, DaizanFX understands gold fundamentals deeply. Their TP3 signals alone have covered my membership fee 10x over.",
    stars: 5,
    profit: '+$2,800 this month',
  },
  {
    name: 'James Okonkwo',
    role: 'Part-time Trader',
    avatar: 'JO',
    review:
      "I was skeptical at first but the track record speaks for itself. Clear entries, tight stop losses, and multiple TP levels so you can scale out. The education materials alone are worth the price.",
    stars: 5,
    profit: '+$1,650 this month',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#050a14' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        {/* Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-100 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-400 text-sm font-medium mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Professional XAUUSD Trading Platform</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 leading-none">
            <span className="block text-white">Trade Gold</span>
            <span className="block gradient-text">Smarter</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional XAUUSD signals, risk tools & education for serious traders.
            <br className="hidden sm:block" />
            Join 500+ active members consistently profiting from gold markets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/signals"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              <Zap className="w-5 h-5" />
              Access Members Area
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/70 font-bold text-base transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <TrendingUp className="w-5 h-5" />
              View Live Chart
            </Link>
          </div>

          {/* Floating Chart Icon */}
          <div className="flex justify-center">
            <div
              className="relative animate-float"
              style={{ animationDuration: '6s' }}
            >
              <div className="w-32 h-32 rounded-2xl glass-card flex items-center justify-center" style={{ boxShadow: '0 0 60px rgba(0,212,255,0.15)' }}>
                <BarChart2 className="w-16 h-16 text-cyan-400 opacity-80" />
              </div>
              {/* Orbiting dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-400 shadow-lg shadow-green-400/50 animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE TICKER ── */}
      <section className="relative overflow-hidden border-y border-cyan-400/10 bg-[#0a0f1e]/60">
        <div className="flex overflow-hidden py-3">
          <div className="ticker-animate">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 px-6 border-r border-white/5 whitespace-nowrap">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-mono font-bold text-white">{item.price}</span>
                <span className={`text-xs font-semibold ${item.up ? 'text-green-400' : 'text-red-400'}`}>
                  {item.up ? '▲' : '▼'} {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Everything You Need
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Built for <span className="gradient-text">Gold Traders</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              A complete ecosystem designed specifically for XAUUSD trading — signals, tools, and education all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card p-6 rounded-2xl group hover:-translate-y-2 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-5 group-hover:shadow-lg group-hover:${feature.glow} transition-all duration-300`}>
                    <div className="w-full h-full rounded-xl bg-[#0a0f1e] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SIGNAL PREVIEW ── */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Signal Feed
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Live <span className="gradient-text">XAUUSD Signals</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Professional trade setups delivered directly to your phone. Below is a preview of our latest signals.
            </p>
          </div>

          {/* Blurred signal cards with overlay */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none" style={{ filter: 'blur(4px)' }}>
              {previewSignals.map((signal, idx) => (
                <SignalCard key={idx} {...signal} />
              ))}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
              style={{ background: 'linear-gradient(to bottom, rgba(5,10,20,0.6), rgba(5,10,20,0.95))' }}>
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Members Only Content</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-xs">
                  Join the DaizanFX members area to access all live signals, full price levels, and real-time updates.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  <Zap className="w-4 h-4" />
                  Join Members Area
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE CHART ── */}
      <section className="py-24" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Real-Time Data
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Live <span className="gradient-text">XAUUSD Chart</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">
              Professional-grade TradingView chart with full technical analysis capabilities.
            </p>
          </div>
          <TradingViewChart height={550} />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.03), transparent)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 mb-4 group-hover:border-cyan-400/40 transition-all duration-300">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">{stat.value}</div>
                  <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Member Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Traders Who <span className="gradient-text">Trust DaizanFX</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">
              Real results from real members who have transformed their trading with our signals and education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card p-6 rounded-2xl flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">&quot;{t.review}&quot;</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                  <div className="text-green-400 text-xs font-semibold">{t.profit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="glass-card p-12 rounded-3xl" style={{ borderColor: 'rgba(0,212,255,0.2)', boxShadow: '0 0 60px rgba(0,212,255,0.08)' }}>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 mx-auto mb-6">
              <div className="w-full h-full rounded-2xl bg-[#0a0f1e] flex items-center justify-center">
                <Zap className="w-10 h-10 text-cyan-400" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Ready to Trade <span className="gradient-text">Smarter?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Join 500+ traders already using DaizanFX signals to consistently profit from gold markets. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                <Zap className="w-5 h-5" />
                Join Now — From $49/mo
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-bold text-base transition-all duration-300 w-full sm:w-auto justify-center"
              >
                Learn More
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-slate-600 text-xs mt-6">No hidden fees • Cancel anytime • Instant access</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
