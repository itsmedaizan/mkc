'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  X,
  Zap,
  Crown,
  Star,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Shield,
  Users,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const plans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Get started with essential tools and a taste of our signals.',
    icon: TrendingUp,
    color: 'from-slate-400 to-slate-600',
    popular: false,
    features: [
      { text: 'Live XAUUSD chart access', included: true },
      { text: '1 signal preview per week', included: true },
      { text: 'Basic risk calculator', included: true },
      { text: 'Market commentary', included: true },
      { text: 'Full signal alerts (5-7/week)', included: false },
      { text: 'Complete TP/SL levels', included: false },
      { text: 'Signal history archive', included: false },
      { text: 'Telegram group access', included: false },
      { text: '1-on-1 coaching sessions', included: false },
      { text: 'Custom market analysis', included: false },
    ],
    cta: 'Get Started Free',
    ctaHref: '/signals',
    ctaStyle: 'secondary',
  },
  {
    name: 'Pro',
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'Full access to all signals, tools, and community. Most popular plan.',
    icon: Zap,
    color: 'from-cyan-400 to-blue-600',
    popular: true,
    features: [
      { text: 'Live XAUUSD chart access', included: true },
      { text: 'All signals (5-7 per week)', included: true },
      { text: 'Full risk calculator', included: true },
      { text: 'Complete TP/SL levels', included: true },
      { text: 'Signal history archive', included: true },
      { text: 'Telegram group access', included: true },
      { text: 'Market analysis reports', included: true },
      { text: 'Priority email support', included: true },
      { text: '1-on-1 coaching sessions', included: false },
      { text: 'Custom market analysis', included: false },
    ],
    cta: 'Join Pro',
    ctaHref: '/signals',
    ctaStyle: 'primary',
  },
  {
    name: 'Elite',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'Everything in Pro plus personalized coaching and custom analysis.',
    icon: Crown,
    color: 'from-yellow-400 to-orange-500',
    popular: false,
    features: [
      { text: 'Live XAUUSD chart access', included: true },
      { text: 'All signals (5-7 per week)', included: true },
      { text: 'Full risk calculator', included: true },
      { text: 'Complete TP/SL levels', included: true },
      { text: 'Signal history archive', included: true },
      { text: 'Telegram group access', included: true },
      { text: 'Weekly video analysis', included: true },
      { text: 'Priority support (24hr response)', included: true },
      { text: '1-on-1 coaching sessions', included: true },
      { text: 'Custom market analysis on request', included: true },
    ],
    cta: 'Join Elite',
    ctaHref: '/signals',
    ctaStyle: 'secondary',
  },
];

const comparisonFeatures = [
  { feature: 'XAUUSD Live Chart', free: true, pro: true, elite: true },
  { feature: 'Weekly Signal Preview', free: '1/week', pro: false, elite: false },
  { feature: 'Full Signals (5-7/week)', free: false, pro: true, elite: true },
  { feature: 'Entry, TP1/2/3, SL Levels', free: false, pro: true, elite: true },
  { feature: 'Basic Risk Calculator', free: true, pro: true, elite: true },
  { feature: 'Advanced Risk Calculator', free: false, pro: true, elite: true },
  { feature: 'Signal History Archive', free: false, pro: true, elite: true },
  { feature: 'Telegram Community', free: false, pro: true, elite: true },
  { feature: 'Weekly Video Analysis', free: false, pro: false, elite: true },
  { feature: '1-on-1 Coaching', free: false, pro: false, elite: true },
  { feature: 'Custom Analysis Requests', free: false, pro: false, elite: true },
  { feature: 'Priority Support', free: false, pro: true, elite: true },
];

const faqs = [
  {
    q: 'How quickly will I get access after signing up?',
    a: 'Access is instant. After payment you\'ll receive a welcome email with your Telegram invite link and dashboard credentials within 5 minutes.',
  },
  {
    q: 'How are the signals delivered?',
    a: 'Signals are sent directly to the private Telegram group with full details: pair, direction (BUY/SELL), entry zone, TP1/TP2/TP3, stop loss, and rationale. You\'ll also see them in the members dashboard.',
  },
  {
    q: 'What is the signal accuracy rate?',
    a: 'Our historical accuracy for signals hitting at least TP1 is 89%. Past performance is not indicative of future results. Always use proper risk management.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, there are no long-term contracts. You can cancel your subscription at any time and you\'ll retain access until the end of your billing period.',
  },
  {
    q: 'Is this suitable for beginners?',
    a: 'Yes, though we recommend having basic forex knowledge first. The Pro plan includes educational content alongside signals. The Elite plan includes 1-on-1 coaching which is ideal for newer traders.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-medium text-sm pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/5">
          <p className="text-slate-400 text-sm leading-relaxed pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#050a14' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Plans & Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            <span className="text-white">Simple, Transparent </span>
            <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Choose the plan that fits your trading journey. All plans include core tools. Upgrade anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                !annual ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                annual ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual
              <span className="text-xs bg-green-400/20 text-green-400 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="pb-24" style={{ backgroundColor: '#050a14' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const price = annual ? plan.annualPrice : plan.monthlyPrice;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                    plan.popular
                      ? 'border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/15 scale-105'
                      : 'border border-white/10 hover:border-white/20'
                  }`}
                  style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600" />
                  )}
                  {plan.popular && (
                    <div className="absolute -top-0 right-4 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-b-xl text-xs font-bold text-white">
                      <Star className="w-3 h-3 fill-white" />
                      POPULAR
                    </div>
                  )}

                  <div className="p-7">
                    {/* Plan header */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} p-0.5 mb-4`}>
                      <div className="w-full h-full rounded-xl bg-[#0a0f1e] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                    <p className="text-slate-400 text-sm mb-5">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-end gap-1">
                        <span className="text-slate-400 text-lg">$</span>
                        <span className="text-4xl font-black text-white">{price}</span>
                        <span className="text-slate-400 text-sm mb-1">/mo</span>
                      </div>
                      {annual && price > 0 && (
                        <div className="text-green-400 text-xs mt-1">
                          Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <Link
                      href={plan.ctaHref}
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm mb-7 transition-all duration-300 ${
                        plan.ctaStyle === 'primary'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                          : 'border border-white/20 text-white hover:bg-white/5 hover:border-white/30'
                      }`}
                    >
                      {plan.cta}
                    </Link>

                    {/* Features */}
                    <ul className="space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-center gap-2.5">
                          {f.included ? (
                            <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-slate-600 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${f.included ? 'text-slate-300' : 'text-slate-600'}`}>
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-20" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Full <span className="gradient-text">Feature Comparison</span>
            </h2>
            <p className="text-slate-400 text-sm">See exactly what&apos;s included in each plan</p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-white/5 border-b border-white/5">
              <div className="p-4 text-sm font-medium text-slate-400">Feature</div>
              <div className="p-4 text-center text-sm font-medium text-slate-300">Free</div>
              <div className="p-4 text-center text-sm font-bold text-cyan-400">Pro</div>
              <div className="p-4 text-center text-sm font-medium text-yellow-400">Elite</div>
            </div>
            {comparisonFeatures.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/2'}`}
              >
                <div className="p-4 text-sm text-slate-300">{row.feature}</div>
                {[row.free, row.pro, row.elite].map((val, colIdx) => (
                  <div key={colIdx} className="p-4 flex items-center justify-center">
                    {typeof val === 'string' ? (
                      <span className="text-xs text-cyan-400 font-medium">{val}</span>
                    ) : val ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <X className="w-4 h-4 text-slate-700" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 relative" style={{ backgroundColor: '#050a14' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Frequently <span className="gradient-text">Asked Questions</span>
            </h2>
            <p className="text-slate-400 text-sm">Everything you need to know before joining.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section className="py-12 border-y border-white/5" style={{ backgroundColor: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            {[
              { icon: Shield, text: 'Cancel Anytime' },
              { icon: Zap, text: 'Instant Access' },
              { icon: Users, text: '500+ Active Members' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-3 text-slate-400">
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
