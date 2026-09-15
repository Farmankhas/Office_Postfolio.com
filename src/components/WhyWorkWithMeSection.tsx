import React from 'react';
import { motion } from 'motion/react';
import {
  Lightbulb,
  Compass,
  Cpu,
  CheckCircle2,
  Users,
  TrendingUp,
  Sparkles,
  Shield,
} from 'lucide-react';
import { WhyWorkItem } from '../types.ts';

interface WhyWorkWithMeSectionProps {
  items: WhyWorkItem[];
}

export const WhyWorkWithMeSection: React.FC<WhyWorkWithMeSectionProps> = ({ items }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-purple-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-purple-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section className="relative py-24 bg-[#07060d] overflow-hidden border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full metallic-badge mb-4">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              THE VALUE PROPOSITION
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why <span className="chrome-purple-text">Work With Me?</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-2xl mx-auto">
            Combining artistic intuition, disciplined code architecture, and client-first communication backed by FA GROUP COMPANY.
          </p>
        </div>

        {/* 6 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-7 rounded-3xl metallic-card metallic-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 w-fit mb-5">
                  {getIcon(item.icon)}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-purple-300/70">
                <span>BENEFIT 0{idx + 1}</span>
                <span className="text-emerald-400">Guaranteed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
