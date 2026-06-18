import Link from 'next/link';
import {
  TrendingUp,
  Target,
  Shield,
  BarChart2,
  Users,
  Award,
  BookOpen,
  Zap,
  ChevronRight,
  CheckCircle2,
  Globe,
  Clock,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const whyGoldCards = [
  {
    icon: Globe,
    title: 'Global Liquidity',
    description:
      'Gold is the most globally traded commodity with $120+ billion in daily volume. It reacts to macro events, geopolitics, and central bank policies — giving skilled traders predictable patterns.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: TrendingUp,
    title: 'Trending Trends',
    description:
      'XAUUSD makes strong, sustained moves that last days to weeks. Unlike choppy currency pairs, gold respects key support and resistance levels making technical analysis highly effective.',
    color: 'from-blue-400 to-violet-500',
  },
  {
    icon: Clock,
    title: '23-Hour Market',
    description:
      'Gold trades 23 hours a day, 5 days a week — giving traders in every time zone access to high-volume sessions. London and New York sessions offer the best volatility and liquidity.',
    color: 'from-violet-400 to-emerald-500',
  },
];

const trackRecordStats = [
  { value: '89%', label: 'Signal Accuracy Rate', description: 'Signals that hit at least TP1' },
  { value: '500+', label: 'Signals Delivered', description: 'Since platform launch' },
  { value: '3+ yrs', label: 'Trading Experience', description: 'Years analyzing XAUUSD' },
  { value: '500+', label: 'Active Members', description: 'Traders currently subscribed' },
];

const methodology = [
  {
    step: '01',
    title: 'Technical Analysis',
    description:
      'We analyze XAUUSD price action on multiple timeframes (Daily, H4, H1) to identify high-probability setups with clear structure.',
  },
  {
    step: '02',
    title: 'Fundamental Backdrop',
    description:
      'Every signal considers macro environment: DXY strength, Fed policy, US Treasury yields, and geopolitical risk factors that drive gold prices.',
  },
  {
    step: '03',
    title: 'Risk-First Approach',
    description:
      'Stop losses are placed logically at structural levels — never arbitrary. We target minimum 1:1.5 R:R, with most signals offering 1:3 or better.',
  },
  {
    step: '04',
    title: 'Multi-TP Structure',
    description:
      'Every signal includes 3 take profit levels so traders can scale out and lock profits progressively while letting runners capture the full move.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#050a14' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-white">About </span>
            <span className="gradient-text">DaizanFX</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We are a dedicated XAUUSD trading platform born from years of studying gold markets. Our mission: make professional-grade trading accessible to every serious trader.
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-24" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
                Our Mission
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                Democratizing{' '}
                <span className="gradient-text">Professional Trading</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                We exist to democratize professional-grade XAUUSD trading by giving retail traders access to the same quality analysis, signals, and risk management frameworks that institutional traders use daily.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Most retail traders fail because they trade without a system, ignore risk management, and chase random tips. DaizanFX was built to change that — with a structured, proven methodology applied to the world&apos;s most exciting market: gold.
              </p>
              <div className="space-y-3">
                {[
                  'Structured signal methodology — not random tips',
                  'Education embedded into every signal',
                  'Community of serious, focused traders',
                  'Transparency in wins and losses',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }} />
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">DaizanFX</div>
                    <div className="text-slate-400 text-sm">XAUUSD Specialists</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {trackRecordStats.map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-white/4 border border-white/8">
                      <div className="text-2xl font-black gradient-text mb-1">{stat.value}</div>
                      <div className="text-white text-xs font-semibold mb-1">{stat.label}</div>
                      <div className="text-slate-500 text-xs">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Meet <span className="gradient-text">The Founder</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto glass-card rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5">
                  <div className="w-full h-full rounded-2xl bg-[#0a0f1e] flex items-center justify-center">
                    <span className="text-3xl font-black gradient-text">DX</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-black text-2xl mb-1">The Founder</h3>
                <p className="text-cyan-400 text-sm font-medium mb-4">Head Analyst & Lead Trader</p>
                <p className="text-slate-400 leading-relaxed mb-4">
                  With over 3 years of dedicated focus on XAUUSD markets, the founder of DaizanFX developed a deep understanding of gold price dynamics — from micro price action patterns to the macro forces that drive multi-week trends.
                </p>
                <p className="text-slate-400 leading-relaxed mb-4">
                  After consistently generating returns from gold trading and helping friends and family improve their trading, DaizanFX was launched to formalize and scale the same approach to a wider community of motivated traders.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['XAUUSD Specialist', 'Technical Analyst', 'Risk Management', 'Macro Analyst'].map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY XAUUSD ── */}
      <section className="py-24" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Why Gold?
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Why <span className="gradient-text">XAUUSD</span> Is the Best Market
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Not all forex pairs are equal. Gold offers unique advantages that make it perfect for consistent, structured trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyGoldCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="glass-card p-7 rounded-2xl group hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} p-0.5 mb-5`}>
                    <div className="w-full h-full rounded-xl bg-[#0a0f1e] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH / METHODOLOGY ── */}
      <section className="py-24 relative overflow-hidden" id="education" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Signal Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Our <span className="gradient-text">Approach</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">
              Every signal we publish goes through a rigorous 4-step process before being sent to members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methodology.map((step) => (
              <div key={step.step} className="glass-card p-6 rounded-2xl flex gap-5 group hover:-translate-y-1 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center">
                  <span className="text-cyan-400 font-black text-sm">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACK RECORD STATS ── */}
      <section className="py-16 border-y border-cyan-400/10" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, value: '89%', label: 'Signal Accuracy', sub: 'Signals hitting TP1+' },
              { icon: BarChart2, value: '500+', label: 'Signals Sent', sub: 'Since launch' },
              { icon: Clock, value: '3+ yrs', label: 'Experience', sub: 'Analyzing XAUUSD' },
              { icon: Users, value: '500+', label: 'Members', sub: 'Active traders' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 mb-3 group-hover:border-cyan-400/40 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black gradient-text mb-1">{item.value}</div>
                  <div className="text-white text-sm font-semibold mb-0.5">{item.label}</div>
                  <div className="text-slate-500 text-xs">{item.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ backgroundColor: '#050a14' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Join <span className="gradient-text">Our Community?</span>
          </h2>
          <p className="text-slate-400 mb-8">
            Start with free access or go Pro to unlock all signals and tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              <Zap className="w-5 h-5" />
              View Pricing Plans
            </Link>
            <Link
              href="/signals"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-bold transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Access Signals
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
