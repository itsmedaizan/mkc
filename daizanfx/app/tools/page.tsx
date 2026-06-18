import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TradingViewChart from '@/components/TradingViewChart';
import RiskCalculator from '@/components/RiskCalculator';
import { TrendingUp, Calculator, Table2, Info } from 'lucide-react';

const pipValueTable = [
  {
    lotType: 'Standard',
    units: '100 oz',
    pipValue: '$1.00',
    example30pip: '$30',
    example50pip: '$50',
    example100pip: '$100',
  },
  {
    lotType: 'Mini',
    units: '10 oz',
    pipValue: '$0.10',
    example30pip: '$3',
    example50pip: '$5',
    example100pip: '$10',
  },
  {
    lotType: 'Micro',
    units: '1 oz',
    pipValue: '$0.01',
    example30pip: '$0.30',
    example50pip: '$0.50',
    example100pip: '$1.00',
  },
];

const goldFacts = [
  { label: 'Symbol', value: 'XAUUSD (XAU/USD)' },
  { label: '1 Pip', value: '= $0.10 movement per 1 oz' },
  { label: 'Standard Lot', value: '100 troy ounces of gold' },
  { label: 'Trading Hours', value: 'Mon 00:00 – Fri 23:00 UTC' },
  { label: 'Best Sessions', value: 'London & New York overlap' },
  { label: 'Average Daily Range', value: '1,500 – 2,500 pips' },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#050a14' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-12 overflow-hidden" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Trading Tools
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            <span className="text-white">Professional </span>
            <span className="gradient-text">Trading Tools</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Everything you need to analyze XAUUSD and manage your risk with precision.
          </p>
        </div>
      </section>

      {/* ── LIVE CHART ── */}
      <section className="py-16" id="chart" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">
                Live <span className="gradient-text">XAUUSD Chart</span>
              </h2>
              <p className="text-slate-500 text-sm">Real-time gold price chart powered by TradingView</p>
            </div>
          </div>

          <TradingViewChart height={600} symbol="OANDA:XAUUSD" interval="60" />

          <div className="mt-4 flex flex-wrap gap-2">
            {['H1 Default', 'Dark Theme', 'RSI + MACD', 'OANDA Feed', 'Full Controls'].map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RISK CALCULATOR ── */}
      <section className="py-16 relative" id="calculator" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">
                <span className="gradient-text">Risk Calculator</span>
              </h2>
              <p className="text-slate-500 text-sm">Precisely calculate your XAUUSD position size</p>
            </div>
          </div>

          <RiskCalculator />
        </div>
      </section>

      {/* ── PIP VALUE TABLE ── */}
      <section className="py-16" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
              <Table2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">
                XAUUSD <span className="gradient-text">Pip Value Reference</span>
              </h2>
              <p className="text-slate-500 text-sm">Dollar value per pip movement by lot type</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {pipValueTable.map((row) => (
              <div key={row.lotType} className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5">
                    <div className="w-full h-full rounded-xl bg-[#0a0f1e] flex items-center justify-center">
                      <span className="text-cyan-400 text-xs font-black">{row.lotType[0]}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-bold">{row.lotType} Lot</div>
                    <div className="text-slate-500 text-xs">{row.units}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">1 Pip Value</span>
                    <span className="text-cyan-400 font-bold font-mono">{row.pipValue}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-white/5">
                    <span className="text-slate-400 text-sm">30 Pip Move</span>
                    <span className="text-white font-semibold font-mono">{row.example30pip}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">50 Pip Move</span>
                    <span className="text-white font-semibold font-mono">{row.example50pip}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-white/5">
                    <span className="text-slate-400 text-sm">100 Pip Move</span>
                    <span className="text-white font-semibold font-mono">{row.example100pip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Note */}
          <div className="glass-card p-5 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-400">
              <span className="text-white font-medium">XAUUSD Pip Note:</span> For gold (XAUUSD), 1 pip = $0.10 price movement per unit (troy oz). A Standard lot represents 100 oz, so a 1-pip movement = $0.10 × 100 = <span className="text-cyan-400">$10 per standard lot</span>. Some brokers quote gold to 2 decimal places (e.g., 2345.67), where the last digit is 1 pip.
            </p>
          </div>
        </div>
      </section>

      {/* ── GOLD QUICK FACTS ── */}
      <section className="py-12 border-t border-white/5" style={{ backgroundColor: '#050a14' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-white mb-6">XAUUSD Quick Facts</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {goldFacts.map((fact) => (
              <div key={fact.label} className="glass-card p-4 rounded-xl">
                <div className="text-slate-500 text-xs mb-1">{fact.label}</div>
                <div className="text-white text-sm font-semibold">{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
