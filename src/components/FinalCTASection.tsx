import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Send, Shield } from 'lucide-react';

interface FinalCTASectionProps {
  companyName?: string;
  companyTagline?: string;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  companyName = 'FA GROUP COMPANY',
  companyTagline = 'PREMIUM INTERNATIONAL BUSINESS',
}) => {
  return (
    <section className="relative py-28 bg-[#07060d] overflow-hidden border-t border-purple-500/20">
      {/* Subdued FA GROUP Metallic Watermark in Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10 opacity-5">
        <span className="text-[20vw] font-black tracking-tighter text-white font-serif">
          FA
        </span>
      </div>

      {/* Atmospheric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-700/20 via-fuchsia-600/15 to-sky-600/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full metallic-badge mb-6">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
            {companyName} • {companyTagline}
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight mb-6">
          Have an Idea? Let's Turn It Into{' '}
          <span className="chrome-purple-text">Reality.</span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          From creative design to modern websites, AI content, 3D experiences, and digital solutions — let's create something impressive.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="btn-secondary-metal px-7 py-3.5 rounded-2xl text-sm font-semibold text-white tracking-wide inline-flex items-center gap-2"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </a>

          <a
            href="#contact"
            className="btn-chrome px-7 py-3.5 rounded-2xl text-sm font-semibold text-white tracking-wide inline-flex items-center gap-2 shadow-xl shadow-purple-950/60"
          >
            <span>Contact Me</span>
            <Send className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
