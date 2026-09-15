import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Globe2,
  Cpu,
  Palette,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { ThreeCanvasLogo } from './ThreeCanvasLogo.tsx';

interface FAGroupSectionProps {
  companyName?: string;
  companyTagline?: string;
  companyDescription?: string;
}

export const FAGroupSection: React.FC<FAGroupSectionProps> = ({
  companyName = 'FA GROUP COMPANY',
  companyTagline = 'PREMIUM INTERNATIONAL BUSINESS',
  companyDescription = 'FA GROUP is a professional digital and creative brand focused on modern technology, design, digital services, innovation, and business solutions.',
}) => {
  const divisions = [
    {
      title: 'Creative & Visual Media',
      description: 'Ultra-high-end branding, graphic design, vector architecture, and digital marketing aesthetics.',
      icon: Palette,
      tag: 'Studio',
    },
    {
      title: 'Web & Digital Engineering',
      description: 'Responsive web applications, bespoke landing experiences, and accessible modern front-ends.',
      icon: Cpu,
      tag: 'Technology',
    },
    {
      title: 'AI & Generative Labs',
      description: 'Harnessing generative AI frameworks for synthetic visuals, prompt pipelines, and modern workflows.',
      icon: Sparkles,
      tag: 'Innovation',
    },
    {
      title: 'Global Business Solutions',
      description: 'End-to-end client consultation, milestone execution, executive presentations, and online delivery.',
      icon: Globe2,
      tag: 'Enterprise',
    },
  ];

  return (
    <section id="fagroup" className="relative py-28 bg-[#07060d] overflow-hidden border-t border-b border-purple-500/15">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-purple-900/15 via-fuchsia-900/10 to-indigo-950/20 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -left-32 top-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute -right-32 bottom-1/4 w-72 h-72 bg-sky-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full metallic-badge mb-4">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              CORPORATE BRAND IDENTITY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            <span className="chrome-purple-text">{companyName}</span>
          </h2>
          <p className="text-xs sm:text-sm font-bold tracking-widest text-neutral-400 uppercase font-mono mt-2">
            {companyTagline}
          </p>
        </div>

        {/* Centerpiece: Large 3D Metallic FA Logo Stage with Depth & Glass Panels */}
        <div className="relative rounded-3xl p-8 sm:p-12 metallic-card border border-purple-500/25 shadow-2xl mb-16 overflow-hidden">
          {/* Subtle background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_75%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: 3D Interactive WebGL Metallic FA Logo */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Glowing pedestal backing */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600/30 to-sky-500/20 blur-2xl -z-10 animate-pulse" />
                <ThreeCanvasLogo size={320} className="w-full h-full" interactive={true} />
              </div>
              <span className="text-[10px] text-purple-300/60 font-mono tracking-wider mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                METALLIC PURPLE CHROME 3D RENDERING
              </span>
            </div>

            {/* Right: Company Presentation & Values */}
            <div className="lg:col-span-6 text-left space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">
                  EXECUTIVE PROFILE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Modern Technology, Creative Media & Global Innovation
                </h3>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {companyDescription}
              </p>

              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-purple-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span>Strategic International Vision</span>
                </div>
                <p className="text-xs text-neutral-400 leading-normal">
                  FA GROUP COMPANY unifies personal freelancing craft with institutional quality, offering businesses worldwide cutting-edge web platforms, memorable brand identities, and futuristic AI-powered creative solutions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#contact"
                  className="btn-chrome px-5 py-2.5 rounded-xl text-xs font-semibold text-white tracking-wide inline-flex items-center gap-2"
                >
                  <span>Business Inquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#services"
                  className="btn-secondary-metal px-5 py-2.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white inline-flex items-center gap-2"
                >
                  <span>Explore FA Divisions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Corporate Division Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {divisions.map((div, idx) => {
            const IconComponent = div.icon;
            return (
              <motion.div
                key={div.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl metallic-card metallic-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400/90 px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/20">
                      {div.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">
                    {div.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {div.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-medium text-purple-300">
                  <span>FA Division {idx + 1}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-emerald-400">Certified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
