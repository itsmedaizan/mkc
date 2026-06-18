import Link from 'next/link';
import { TrendingUp, Send, MessageCircle, Instagram, Mail, AlertTriangle } from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Signals', href: '/signals' },
    { label: 'Tools', href: '/tools' },
  ],
  services: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Education', href: '/about#education' },
    { label: 'Risk Calculator', href: '/tools#calculator' },
    { label: 'Live Chart', href: '/tools#chart' },
  ],
  legal: [
    { label: 'Disclaimer', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
};

const socialLinks = [
  {
    label: 'Telegram',
    href: 'https://t.me/daizanfx',
    icon: Send,
    color: 'hover:text-blue-400',
    description: 'Join our channel',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/daizanfx',
    icon: MessageCircle,
    color: 'hover:text-green-400',
    description: '+1 (555) 000-0000',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/daizanfx',
    icon: Instagram,
    color: 'hover:text-pink-400',
    description: '@daizanfx',
  },
  {
    label: 'Email',
    href: 'mailto:info@daizanfx.com',
    icon: Mail,
    color: 'hover:text-cyan-400',
    description: 'info@daizanfx.com',
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050a14] border-t border-cyan-400/10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-cyan-400/3 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">Daizan</span>
                <span className="text-white">FX</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Professional XAUUSD signals and education platform for serious traders. Empowering
              traders with precision, education, and cutting-edge tools.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-400 ${social.color} transition-all duration-200 hover:scale-110`}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200 group"
                    >
                      <Icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                      <span>{social.description}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-white/5">
          {footerLinks.legal.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Risk Warning */}
        <div className="glass-card p-4 rounded-xl mb-8 border-amber-400/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="text-amber-400 font-semibold">Risk Warning:</span> Trading forex
              and gold (XAUUSD) involves substantial risk of loss and is not suitable for all
              investors. Past performance is not indicative of future results. The content on this
              site is for informational and educational purposes only and does not constitute
              financial advice. Never trade with money you cannot afford to lose.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} DaizanFX. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
