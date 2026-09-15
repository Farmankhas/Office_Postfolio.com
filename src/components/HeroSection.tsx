import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Shield,
  Sparkles,
  Layers,
  ChevronDown,
  Code,
  Laptop,
  Box,
  Eye,
} from 'lucide-react';
import { ProfileCard } from './ProfileCard.tsx';
import { HeroWorkspace3D } from './HeroWorkspace3D.tsx';

interface HeroSectionProps {
  headline: string;
  subtitle: string;
  role: string;
  description: string;
  brandBadge: string;
  profileImage: string;
  onProfileImageChange?: (newImg: string) => void;
  companyName: string;
  companyTagline: string;
  isAdmin?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  subtitle,
  role,
  description,
  brandBadge,
  profileImage,
  onProfileImageChange,
  companyName,
  companyTagline,
  isAdmin = false,
}) => {
  const [viewMode, setViewMode] = useState<'profile' | 'workspace'>('profile');

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:py-32 flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Gradients & Particles */}
      <div className="absolute inset-0 bg-[#050508] -z-20" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-purple-900/25 via-fuchsia-950/10 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-12 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid Pattern with Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Role, Description, CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Small Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full metallic-badge mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              <span className="text-xs font-bold tracking-wider text-purple-300 uppercase font-mono">
                {brandBadge}
              </span>
              <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">•</span>
              <span className="text-[11px] text-neutral-400 uppercase tracking-widest hidden sm:inline">
                {companyTagline}
              </span>
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-5">
              Turning Ideas Into{' '}
              <span className="chrome-purple-text block mt-1">
                Digital Experiences
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base font-semibold tracking-wide text-purple-300/90 mb-3">
              {subtitle}
            </p>

            {/* Role / Founder Line */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-300 mb-4 bg-purple-950/40 px-3 py-1.5 rounded-lg border border-purple-500/20">
              <Shield className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{role}</span>
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-neutral-300/85 leading-relaxed max-w-2xl mb-8">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="btn-chrome px-6 py-3.5 rounded-2xl text-sm font-semibold text-white tracking-wide inline-flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg"
              >
                <span>View My Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="btn-secondary-metal px-6 py-3.5 rounded-2xl text-sm font-semibold text-neutral-200 hover:text-white tracking-wide inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Interactive Switcher for Right-Side Visual */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-mono">HERO VIEW:</span>
              <div className="inline-flex p-1 rounded-xl bg-neutral-900 border border-purple-500/30">
                <button
                  type="button"
                  onClick={() => setViewMode('profile')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'profile'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isAdmin ? 'Profile Card & Upload' : 'Profile Showcase'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('workspace')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'workspace'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Digital Workspace</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Profile Frame or 3D Workspace */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {viewMode === 'profile' ? (
              <div className="w-full flex justify-center">
                <ProfileCard
                  currentImage={profileImage}
                  onImageChange={isAdmin ? onProfileImageChange : undefined}
                  founderTitle={role}
                  companyName={companyName}
                  tagline={companyTagline}
                  showControls={isAdmin}
                />
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <HeroWorkspace3D />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-400 hover:text-purple-300 transition-colors"
        aria-label="Scroll to About Section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">DISCOVER</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-purple-400" />
      </a>
    </section>
  );
};
