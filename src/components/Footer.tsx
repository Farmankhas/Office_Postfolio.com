import React from 'react';
import {
  Shield,
  ArrowUp,
  Globe,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Phone,
  Mail,
} from 'lucide-react';
import { SocialLink } from '../types.ts';

interface FooterProps {
  portfolioName?: string;
  companyName?: string;
  companyTagline?: string;
  socialLinks: SocialLink[];
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  portfolioName = 'MY SKILLS',
  companyName = 'FA GROUP COMPANY',
  companyTagline = 'PREMIUM INTERNATIONAL BUSINESS',
  socialLinks,
  isAdmin = false,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'FA GROUP', href: '#fagroup' },
    { label: 'Contact', href: '#contact' },
  ];

  const getSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'whatsapp':
        return <Phone className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'mail':
        return <Mail className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-[#030305] border-t border-purple-500/15 pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Presentation */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {/* Metallic Chrome FA Monogram */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/30 via-neutral-900 to-purple-950 border border-purple-400/40 flex items-center justify-center shadow-lg shadow-purple-950/50">
                <span className="text-xl font-black chrome-purple-text font-serif">
                  FA
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white tracking-wider">
                  {companyName}
                </h3>
                <p className="text-[10px] font-mono tracking-widest uppercase text-purple-400 font-semibold">
                  {companyTagline}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-sm font-bold text-neutral-200 tracking-wide block">
                {portfolioName}
              </span>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm leading-relaxed">
                Creative digital solutions, modern design, technology, and innovation.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-900 hover:bg-purple-950/60 border border-purple-500/20 text-neutral-300 hover:text-white transition-all hover:border-purple-400/40"
                  aria-label={s.name}
                >
                  {getSocialIcon(s.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase text-white font-semibold tracking-wider block">
              Quick Navigation
            </span>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-purple-300 transition-colors py-1 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="text-left md:text-right space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>FA GROUP SYSTEM OPERATIONAL</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Built with precision & high performance.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 md:mt-0 p-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-purple-500/30 text-purple-300 hover:text-white transition-all flex items-center gap-2 text-xs font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <p>© 2026 {companyName}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>MY SKILLS PORTFOLIO</span>
            <span>•</span>
            <span className="text-purple-400/90">{companyTagline}</span>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer text-neutral-500 hover:text-purple-300"
                >
                  <Shield className="w-3 h-3 text-purple-400" />
                  <span>{isAdmin ? 'Admin Dashboard' : 'Admin Portal'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
