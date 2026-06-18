'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, TrendingUp, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Signals', href: '/signals' },
  { label: 'Tools', href: '/tools' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0f1e]/95 backdrop-blur-md border-b border-cyan-400/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center glow-cyan-sm group-hover:glow-cyan transition-all duration-300">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-sm group-hover:blur-md transition-all duration-300" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">Daizan</span>
              <span className="text-white">FX</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-cyan-400/5 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-4 rounded-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/signals"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4" />
              Get Access
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-cyan-400/10 bg-[#0a0f1e]/98 backdrop-blur-md animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1 border-t border-cyan-400/10 mt-3">
              <Link
                href="/signals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <Zap className="w-4 h-4" />
                Get Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
