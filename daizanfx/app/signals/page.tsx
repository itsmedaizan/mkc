'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart2,
  Target,
  Clock,
  Zap,
  AlertCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SignalCard from '@/components/SignalCard';

const allSignals = [
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
  {
    type: 'BUY' as const,
    entry: '2,280.00',
    tp1: '2,293.00',
    tp2: '2,308.00',
    tp3: '2,325.00',
    sl: '2,265.00',
    status: 'TP1 Hit' as const,
    date: 'Jun 14, 2026',
  },
  {
    type: 'SELL' as const,
    entry: '2,360.00',
    tp1: '2,345.00',
    tp2: '2,328.00',
    tp3: '2,310.00',
    sl: '2,375.00',
    status: 'Closed' as const,
    date: 'Jun 12, 2026',
  },
  {
    type: 'BUY' as const,
    entry: '2,305.00',
    tp1: '2,318.00',
    tp2: '2,332.00',
    tp3: '2,350.00',
    sl: '2,290.00',
    status: 'TP3 Hit' as const,
    date: 'Jun 11, 2026',
  },
];

const dashboardStats = [
  { label: "Today's Signals", value: '2', icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { label: 'This Week', value: '5', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Win Rate (June)', value: '87%', icon: BarChart2, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'Active Trades', value: '1', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

type FilterTab = 'All' | 'Active' | 'Closed';

export default function SignalsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setLoginError('');
    // Simulate auth check delay
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setIsLoggedIn(true);
  };

  const filteredSignals = allSignals.filter((s) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Active') return s.status === 'Active';
    if (activeFilter === 'Closed')
      return s.status === 'Closed' || s.status === 'TP1 Hit' || s.status === 'TP2 Hit' || s.status === 'TP3 Hit';
    return true;
  });

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: '#050a14' }}>
        <Navbar />

        {/* Login Gate */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

          <div className="relative w-full max-w-md mx-auto px-4 py-16">
            <div className="glass-card p-8 rounded-2xl" style={{ boxShadow: '0 0 60px rgba(0,212,255,0.1)' }}>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 mx-auto mb-4">
                  <div className="w-full h-full rounded-2xl bg-[#0a0f1e] flex items-center justify-center">
                    <Lock className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <h1 className="text-2xl font-black text-white mb-2">Members Only</h1>
                <p className="text-slate-400 text-sm">
                  Sign in to access your XAUUSD signal dashboard.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-4 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-400/10 border border-red-400/20">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-red-400 text-xs">{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Access Dashboard
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <p className="text-slate-500 text-sm">
                  Not a member yet?{' '}
                  <Link href="/pricing" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    Join Now
                  </Link>
                </p>
              </div>

              <p className="text-xs text-slate-600 text-center mt-4">
                Demo: Enter any email and password to preview the dashboard
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // Logged-in Dashboard
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#050a14' }}>
      <Navbar />

      <section className="relative pt-28 pb-10 overflow-hidden" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium uppercase tracking-wider">Live Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                XAUUSD <span className="gradient-text">Signal Dashboard</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 glass-card px-3 py-2 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Last updated: Jun 18, 2026 — 14:32 UTC
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`text-2xl font-black ${stat.color} mb-0.5`}>{stat.value}</div>
                  <div className="text-slate-500 text-xs">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {(['All', 'Active', 'Closed'] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === tab
                    ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab}
                <span className="ml-2 text-xs opacity-60">
                  {tab === 'All'
                    ? allSignals.length
                    : tab === 'Active'
                    ? allSignals.filter((s) => s.status === 'Active').length
                    : allSignals.filter((s) => s.status !== 'Active').length}
                </span>
              </button>
            ))}
          </div>

          {/* Signal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSignals.map((signal, idx) => (
              <SignalCard key={idx} {...signal} />
            ))}
          </div>

          {filteredSignals.length === 0 && (
            <div className="text-center py-16">
              <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500">No {activeFilter.toLowerCase()} signals right now.</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-4 glass-card rounded-xl border-amber-400/15">
            <p className="text-xs text-slate-500">
              <span className="text-amber-400 font-medium">Risk Disclaimer: </span>
              These signals are for educational and informational purposes. All trading involves risk. Never risk more than you can afford to lose. Past performance does not guarantee future results. Always use the provided stop loss levels.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
