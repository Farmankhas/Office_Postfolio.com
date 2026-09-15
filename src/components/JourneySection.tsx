import React from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Code,
  Sparkles,
  Box,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { JourneyStep } from '../types.ts';

interface JourneySectionProps {
  journey: JourneyStep[];
}

export const JourneySection: React.FC<JourneySectionProps> = ({ journey }) => {
  const getJourneyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Box':
        return <Box className="w-5 h-5 text-purple-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-purple-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="journey" className="relative py-24 bg-[#07060d] overflow-hidden border-t border-purple-500/10">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full metallic-badge mb-4">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              EVOLUTION & MILESTONES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            My <span className="chrome-purple-text">Creative Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-2xl mx-auto">
            From raster art mastery to responsive code, generative AI workflows, interactive 3D media, and the founding of FA GROUP COMPANY.
          </p>

          {/* Quick Flow Breadcrumb */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-purple-300/80 bg-neutral-900/60 p-2.5 rounded-2xl border border-purple-500/20 max-w-2xl mx-auto">
            <span>Graphic Design</span>
            <span className="text-purple-500">→</span>
            <span>Web Dev</span>
            <span className="text-purple-500">→</span>
            <span>AI Creativity</span>
            <span className="text-purple-500">→</span>
            <span>3D / Game Dev</span>
            <span className="text-purple-500">→</span>
            <span>Freelancing</span>
            <span className="text-purple-500">→</span>
            <span className="text-purple-200 font-bold">FA GROUP</span>
          </div>
        </div>

        {/* Timeline Line & Steps */}
        <div className="relative">
          {/* Vertical central connector line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500/20 via-purple-500/60 to-purple-500/20 -translate-x-1/2 z-0" />

          <div className="space-y-12 relative z-10">
            {journey.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Left or Right) */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div
                      className={`w-full max-w-lg p-6 sm:p-7 rounded-3xl metallic-card metallic-card-hover ${
                        step.id === 'step-6'
                          ? 'border-purple-400/50 bg-gradient-to-br from-purple-950/40 via-neutral-900/90 to-neutral-950 shadow-purple-950/50'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-bold text-purple-400">
                          STAGE {step.stepNumber} • {step.period}
                        </span>
                        {step.id === 'step-6' && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-600/30 text-purple-200 border border-purple-400/40">
                            Current Standard
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-300/85 leading-relaxed mb-4">
                        {step.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-950/50 border border-purple-500/20 text-purple-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="flex items-center justify-center shrink-0">
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-950 border-2 border-purple-400 flex items-center justify-center shadow-lg shadow-purple-900/40">
                      {getJourneyIcon(step.icon)}
                      <span className="absolute -inset-1 rounded-2xl bg-purple-500/20 blur-xs -z-10" />
                    </div>
                  </div>

                  {/* Empty counterpart for symmetry on desktop */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
