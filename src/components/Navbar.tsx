import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Shield,
  Sliders,
  Send,
  Lock,
  LogOut,
  UserCheck,
} from 'lucide-react';

interface NavbarProps {
  portfolioName?: string;
  companyName?: string;
  companyTagline?: string;
  isAdmin?: boolean;
  onOpenAdmin: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  portfolioName = 'MY SKILLS',
  companyName = 'FA GROUP COMPANY',
  companyTagline = 'PREMIUM INTERNATIONAL BUSINESS',
  isAdmin = false,
  onOpenAdmin,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'FA GROUP', href: '#fagroup' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/85 backdrop-blur-xl border-b border-purple-500/20 shadow-xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Corporate Tagline */}
        <a href="#hero" className="flex items-center gap-3.5 group">
          {/* 3D Metallic FA Chrome Monogram Emblem */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-500/30 via-neutral-900 to-purple-950/80 border border-purple-400/40 flex items-center justify-center shadow-lg shadow-purple-950/40 group-hover:border-purple-300 transition-all group-hover:scale-105">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            <span className="text-base sm:text-lg font-black tracking-tight chrome-purple-text font-serif">
              FA
            </span>
            {/* Subtle glow */}
            <div className="absolute -inset-0.5 rounded-xl bg-purple-500/20 blur-xs -z-10 group-hover:bg-purple-500/40 transition-colors" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold tracking-wider text-white">
                {portfolioName}
              </span>
              <span className="h-3 w-[1px] bg-purple-500/40 hidden sm:inline-block" />
              <span className="text-xs sm:text-xs font-bold text-purple-400 tracking-wider hidden sm:inline-block">
                {companyName}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono text-neutral-400/90 group-hover:text-purple-300/80 transition-colors">
              {companyTagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-wider font-semibold text-neutral-300 hover:text-purple-300 transition-colors duration-200 relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Action Controls & Contact Button */}
        <div className="hidden sm:flex items-center gap-3">
          {isAdmin ? (
            /* Authenticated Admin Controls */
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Administrator Active</span>
              </div>

              <button
                type="button"
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-xs font-semibold text-purple-200 hover:text-white transition-all shadow-md shadow-purple-950/50 cursor-pointer"
                title="Open Admin Dashboard"
              >
                <Sliders className="w-3.5 h-3.5 text-purple-300" />
                <span>Dashboard</span>
              </button>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Log out of Admin Dashboard"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            /* Public Visitor Controls */
            <button
              type="button"
              onClick={onOpenAdmin}
              className="p-2 rounded-xl bg-neutral-900/60 hover:bg-purple-950/40 border border-white/10 hover:border-purple-500/40 text-neutral-400 hover:text-purple-300 transition-all cursor-pointer"
              title="Admin Portal Access"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Primary Contact Me Button */}
          <a
            href="#contact"
            className="btn-chrome px-4 py-2 rounded-xl text-xs font-semibold text-white tracking-wide inline-flex items-center gap-1.5"
          >
            <span>Contact Me</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onOpenAdmin}
            className="p-2 rounded-xl bg-neutral-900 border border-purple-500/30 text-purple-300 text-xs sm:hidden"
            title={isAdmin ? "Admin Dashboard" : "Admin Login"}
          >
            {isAdmin ? <Sliders className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-neutral-900 border border-purple-500/30 text-neutral-200 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-neutral-950/95 backdrop-blur-2xl border-b border-purple-500/20 px-6 py-5 shadow-2xl"
          >
            <div className="flex flex-col space-y-3.5">
              <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider font-mono">
                  {companyName}
                </span>
                <span className="text-[10px] text-neutral-400">Navigation</span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-neutral-200 hover:text-purple-300 py-1 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-500/50" />
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                {isAdmin ? (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full py-2.5 rounded-xl bg-purple-600/30 border border-purple-400/50 text-xs font-semibold text-purple-200 flex items-center justify-center gap-2"
                    >
                      <Sliders className="w-4 h-4 text-purple-400" />
                      <span>Admin Dashboard (Active)</span>
                    </button>
                    {onLogout && (
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-rose-400 flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full py-2 rounded-xl bg-neutral-900/60 border border-white/10 text-xs text-neutral-400 hover:text-purple-300 flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Administrator Access</span>
                  </button>
                )}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-chrome w-full py-2.5 rounded-xl text-center text-xs font-semibold text-white tracking-wide flex items-center justify-center gap-2"
                >
                  <span>Contact Me</span>
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
