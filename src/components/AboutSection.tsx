import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  Shield,
  ArrowRight,
  Camera,
} from 'lucide-react';
import { StatItem } from '../types.ts';

interface AboutSectionProps {
  heading?: string;
  bio?: string;
  faLinkText?: string;
  profileImage?: string;
  onOpenUpload?: () => void;
  identities?: string[];
  stats?: StatItem[];
  companyName?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  heading = 'About Me',
  bio = 'I am a versatile creative professional and digital builder passionate about the intersection of graphic design, modern web architecture, artificial intelligence, and interactive 3D media. Through rigorous practice and entrepreneurial drive, I transform bold ideas into sleek, functional realities.',
  faLinkText = 'Building creative digital solutions through my personal work and FA GROUP COMPANY.',
  profileImage,
  onOpenUpload,
  identities = [
    'Graphic Designer',
    'Web Designer',
    'AI Creator',
    'Digital Creator',
    'Freelancer',
    'Game Development Learner',
    'Technology Enthusiast',
  ],
  stats = [
    { id: 'stat-1', value: '10+', label: 'Skills', sublabel: 'Design & Code' },
    { id: 'stat-2', value: '20+', label: 'Projects', sublabel: 'Shipped & Live' },
    { id: 'stat-3', value: '10+', label: 'Creative Tools', sublabel: 'Industry Standard' },
    { id: 'stat-4', value: '2+', label: 'Years Learning & Creating', sublabel: 'Continuous Growth' },
  ],
  companyName = 'FA GROUP COMPANY',
}) => {
  return (
    <section id="about" className="relative py-24 bg-[#050508] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Prominent Profile Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-2 metallic-card group">
              {/* Outer pulsing glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-fuchsia-500/20 to-sky-400/20 blur-xl opacity-80 group-hover:opacity-100 transition-opacity animate-pulse" />

              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900 border border-purple-500/30 flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile Portfolio Portrait"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Sleek Metallic Silhouette Placeholder */
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-900 via-purple-950/70 to-neutral-950 relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-neutral-800 border border-purple-400/30 flex items-center justify-center shadow-lg mb-3">
                      <span className="text-4xl font-extrabold chrome-purple-text font-serif">
                        FA
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white">Professional Creator</span>
                    <span className="text-xs text-purple-300/80 font-mono mt-1">
                      {companyName}
                    </span>
                  </div>
                )}

                {/* Edit Button Overlay */}
                {onOpenUpload && (
                  <button
                    type="button"
                    onClick={onOpenUpload}
                    className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg border border-purple-300/30 text-xs flex items-center gap-1.5 transition-all group-hover:scale-105"
                    title="Upload or change profile image"
                  >
                    <Camera className="w-4 h-4" />
                    <span className="hidden sm:inline">Change Photo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Sub-label under photo */}
            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>OFFICIAL PROFILE • {companyName}</span>
            </div>
          </div>

          {/* Right Column: Heading, Identities, Bio, FA GROUP connection, Stats */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full metallic-badge">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
                  CREATIVE DOSSIER
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {heading}
              </h2>
            </div>

            {/* 7 Identity Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {identities.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-xs font-medium text-purple-200 hover:border-purple-400 transition-colors"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Main Bio */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {bio}
            </p>

            {/* FA GROUP Connection Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-neutral-900/90 border border-purple-500/30 relative">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-purple-600/30 text-purple-300 shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-purple-300 uppercase block mb-1">
                    {companyName} FOUNDATION
                  </span>
                  <p className="text-sm font-medium text-white italic">
                    "{faLinkText}"
                  </p>
                </div>
              </div>
            </div>

            {/* Editable Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl metallic-card border border-purple-500/20 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white chrome-purple-text font-mono">
                    {item.value}
                  </div>
                  <div className="text-xs font-bold text-neutral-200 mt-1">
                    {item.label}
                  </div>
                  {item.sublabel && (
                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      {item.sublabel}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
