import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Laptop,
  Terminal,
  Palette,
  CheckCircle2,
  Box,
} from 'lucide-react';
import { ThreeCanvasLogo } from './ThreeCanvasLogo.tsx';

interface HeroWorkspace3DProps {
  onExploreClick?: () => void;
}

export const HeroWorkspace3D: React.FC<HeroWorkspace3DProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D cursor tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const cardShiftX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const cardShiftY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[540px] aspect-[4/4.2] mx-auto flex items-center justify-center perspective-[1200px]"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 bg-radial from-purple-600/20 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 -right-8 w-60 h-60 bg-purple-500/15 rounded-full blur-2xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 -left-8 w-52 h-52 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main 3D Tilted Workspace Canvas */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center p-6"
      >
        {/* Futuristic Backing Glass Stage */}
        <div
          style={{ transform: 'translateZ(-40px)' }}
          className="absolute inset-4 rounded-3xl bg-neutral-950/70 border border-purple-500/20 backdrop-blur-xl shadow-2xl shadow-purple-950/50"
        >
          {/* Grid lines overlay */}
          <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(to_right,#a855f70a_1px,transparent_1px),linear-gradient(to_bottom,#a855f70a_1px,transparent_1px)] bg-[size:28px_28px]" />
          
          {/* Status corner lights */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-mono tracking-wider text-purple-200/60 uppercase">FA_STUDIO_CORE // ONLINE</span>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-[10px] text-purple-300 font-mono">
            <span>3D_ENGINE_V2</span>
          </div>
        </div>

        {/* Central Core 3D FA Metallic Logo */}
        <motion.div
          style={{ transform: 'translateZ(50px)' }}
          className="relative w-64 h-64 flex items-center justify-center z-20"
        >
          <ThreeCanvasLogo size={240} className="w-full h-full" interactive={false} />
        </motion.div>

        {/* Floating Element 1: Code / Dev Panel (Top Left) */}
        <motion.div
          style={{
            x: cardShiftX,
            y: cardShiftY,
            transform: 'translateZ(90px)',
          }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-8 left-2 sm:-left-4 z-30 p-3.5 rounded-2xl bg-neutral-900/90 border border-purple-400/30 backdrop-blur-md shadow-xl shadow-black/60 max-w-[190px]"
        >
          <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/10">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-white tracking-wide">Web Architecture</span>
          </div>
          <div className="space-y-1 font-mono text-[10px] text-purple-200/70">
            <div className="flex justify-between">
              <span className="text-emerald-400">const</span> stack = [
            </div>
            <div className="pl-2 text-purple-300">'React', 'Tailwind', '3D']</div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-400 pt-0.5">
              <CheckCircle2 className="w-3 h-3" /> Compiled 100%
            </div>
          </div>
        </motion.div>

        {/* Floating Element 2: AI Creativity Engine (Top Right) */}
        <motion.div
          style={{
            x: cardShiftX,
            y: cardShiftY,
            transform: 'translateZ(80px)',
          }}
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute top-12 right-2 sm:-right-4 z-30 p-3 rounded-2xl bg-neutral-900/90 border border-purple-500/40 backdrop-blur-md shadow-xl shadow-purple-950/40 max-w-[185px]"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 rounded-lg bg-purple-600/30 text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">AI Creativity</div>
              <div className="text-[10px] text-purple-300/80 font-mono">Neural Synthetics</div>
            </div>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden mt-2">
            <div className="bg-gradient-to-r from-purple-500 to-sky-400 h-full w-[94%]" />
          </div>
          <div className="flex justify-between text-[9px] text-neutral-400 font-mono mt-1">
            <span>Prompt Engine</span>
            <span className="text-purple-300">Active</span>
          </div>
        </motion.div>

        {/* Floating Element 3: Graphic Design & Creative Palette (Bottom Left) */}
        <motion.div
          style={{
            x: cardShiftX,
            y: cardShiftY,
            transform: 'translateZ(70px)',
          }}
          animate={{
            y: [0, 7, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-10 left-3 sm:-left-3 z-30 p-3 rounded-2xl bg-neutral-900/90 border border-purple-400/30 backdrop-blur-md shadow-xl shadow-black/60 max-w-[175px]"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Visual Craft</span>
              <span className="text-[10px] text-neutral-400">Chrome & Vector</span>
            </div>
          </div>
          <div className="flex gap-1.5 mt-2">
            <span className="w-4 h-4 rounded-full bg-purple-600 border border-purple-300/40" />
            <span className="w-4 h-4 rounded-full bg-slate-200 border border-white/50" />
            <span className="w-4 h-4 rounded-full bg-indigo-500 border border-indigo-300/40" />
            <span className="w-4 h-4 rounded-full bg-sky-400 border border-sky-200/40" />
          </div>
        </motion.div>

        {/* Floating Element 4: 3D Game & Spatial Card (Bottom Right) */}
        <motion.div
          style={{
            x: cardShiftX,
            y: cardShiftY,
            transform: 'translateZ(95px)',
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          className="absolute bottom-6 right-2 sm:-right-4 z-30 p-3.5 rounded-2xl bg-gradient-to-br from-neutral-900/95 to-purple-950/70 border border-purple-400/40 backdrop-blur-md shadow-2xl shadow-purple-900/30 max-w-[200px]"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white">Spatial 3D & Unity</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">60 FPS</span>
          </div>
          <p className="text-[10px] text-neutral-300 mt-1 leading-relaxed">
            Real-time interactive environments & digital concepts.
          </p>
        </motion.div>

        {/* Floating Geometric Diamonds / Rings */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="absolute top-1/2 left-8 w-6 h-6 border border-purple-400/40 rotate-45 animate-spin duration-10000 pointer-events-none"
        />
        <div
          style={{ transform: 'translateZ(25px)' }}
          className="absolute top-1/3 right-10 w-8 h-8 rounded-full border border-dashed border-sky-400/40 animate-pulse pointer-events-none"
        />
      </motion.div>
    </div>
  );
};
