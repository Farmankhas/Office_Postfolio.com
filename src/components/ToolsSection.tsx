import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Wrench,
  Sparkles,
  Layers,
  Image,
  PenTool,
  Code,
  FileCode,
  Terminal,
  LayoutGrid,
  Gamepad2,
  FileSpreadsheet,
  Bot,
} from 'lucide-react';
import { ToolItem } from '../types.ts';

interface ToolsSectionProps {
  tools: ToolItem[];
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ tools }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Design', 'Development', 'AI & 3D', 'Productivity'];

  const filteredTools =
    selectedFilter === 'All'
      ? tools
      : tools.filter((t) => t.category === selectedFilter);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Image':
        return <Image className="w-5 h-5 text-sky-400" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-orange-400" />;
      case 'FileCode':
        return <FileCode className="w-5 h-5 text-blue-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-yellow-300" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-5 h-5 text-purple-400" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-rose-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-fuchsia-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="tools" className="relative py-24 bg-[#050508] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full metallic-badge mb-4">
            <Wrench className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              SOFTWARE ARSENAL
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Tools & Technologies <span className="chrome-purple-text">I Use</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-2xl mx-auto">
            Industry-standard digital creation software, programming frameworks, and generative artificial intelligence toolsets.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === cat
                  ? 'bg-purple-600 text-white shadow-md border border-purple-400/40'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-purple-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {filteredTools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-5 rounded-2xl metallic-card metallic-card-hover flex flex-col items-center text-center group"
            >
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-purple-500/30 mb-3 group-hover:scale-110 transition-transform shadow-inner">
                {getToolIcon(tool.icon)}
              </div>

              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {tool.name}
              </h3>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-neutral-400">
                  {tool.category}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-[10px] font-mono text-purple-300 font-semibold">
                  {tool.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
