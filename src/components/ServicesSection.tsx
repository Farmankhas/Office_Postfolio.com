import React from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Layout,
  Sparkles,
  Glasses,
  Award,
  Globe,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react';
import { ServiceItem } from '../types.ts';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService?: (serviceTitle: string) => void;
  companyName?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
  companyName = 'FA GROUP COMPANY',
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Glasses':
        return <Glasses className="w-5 h-5 text-purple-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-purple-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-purple-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#07060d] overflow-hidden border-t border-purple-500/10">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full metallic-badge mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              OFFICIAL OFFERINGS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            My <span className="chrome-purple-text">Professional Services</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-2xl mx-auto">
            Tailored creative and engineering packages delivered with speed, pristine aesthetics, and the corporate backing of {companyName}.
          </p>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isFAGroupSolution = service.id === 'service-fa-group';
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`p-7 rounded-3xl metallic-card metallic-card-hover flex flex-col justify-between relative group ${
                  isFAGroupSolution
                    ? 'md:col-span-2 lg:col-span-3 border-purple-400/40 bg-gradient-to-r from-purple-950/40 via-neutral-900/90 to-neutral-950'
                    : ''
                }`}
              >
                {/* Metallic badge for featured */}
                {service.featured && (
                  <div className="absolute top-5 right-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30">
                      Featured
                    </span>
                  </div>
                )}

                <div>
                  <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 w-fit mb-5 text-purple-300 group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.icon)}
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-semibold block mb-1">
                    {service.category}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-neutral-300/85 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                      Key Deliverables:
                    </span>
                    <div className={isFAGroupSolution ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : 'space-y-1.5'}>
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA to Inquire */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={() => onSelectService && onSelectService(service.title)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Inquire for {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                  </a>

                  {isFAGroupSolution && (
                    <span className="text-[11px] font-mono text-purple-400/90 font-bold hidden sm:inline">
                      CORPORATE PRIORITY TIER
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
