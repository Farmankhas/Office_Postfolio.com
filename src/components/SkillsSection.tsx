import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  Code2,
  Cpu,
  Box,
  FileSpreadsheet,
  Briefcase,
  Search,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { SkillCategory } from '../types.ts';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Icon mapper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Box':
        return <Box className="w-4 h-4" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-4 h-4" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  // Filter categories and skills
  const filteredCategories = categories
    .map((cat) => {
      if (activeTab !== 'all' && cat.id !== activeTab) {
        return null;
      }
      const matchingSkills = cat.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingSkills.length === 0 && searchQuery.trim() !== '') {
        return null;
      }
      return {
        ...cat,
        skills: matchingSkills,
      };
    })
    .filter(Boolean) as SkillCategory[];

  return (
    <section id="skills" className="relative py-24 bg-[#050508] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full metallic-badge mb-4">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              COMPREHENSIVE CAPABILITIES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            My <span className="chrome-purple-text">Skills</span> & Expertise
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-2xl mx-auto">
            A versatile multi-disciplinary stack spanning high-precision graphic design, modern responsive web architecture, generative AI workflows, and interactive 3D media.
          </p>
        </div>

        {/* Filter Controls: Tabs + Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 p-1 rounded-2xl bg-neutral-900/90 border border-purple-500/20 max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g. Photoshop, HTML)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-purple-400 transition-colors"
            />
          </div>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="p-6 rounded-2xl metallic-card metallic-card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300">
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {cat.name}
                        </h3>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {cat.skills.length} Capabilities
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Skills Pills / Bars */}
                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium text-neutral-200 group-hover/skill:text-purple-300 transition-colors flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-purple-400 shrink-0" />
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-purple-300 font-mono">
                              Core
                            </span>
                          )}
                        </div>

                        {/* Visual Proficiency Meter */}
                        {skill.level && (
                          <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-sky-400 rounded-full"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
