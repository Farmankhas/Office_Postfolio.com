import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  ExternalLink,
  Github,
  Upload,
  Camera,
  Layers,
  Sparkles,
  Eye,
  X,
  Check,
  Code,
  Tag,
} from 'lucide-react';
import { ProjectItem } from '../types.ts';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onUpdateProject?: (updatedProject: ProjectItem) => void;
  isAdmin?: boolean;
}

// Subcomponent: 3D Interactive Project Card
const ProjectCard3D: React.FC<{
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
  onQuickUpload?: (project: ProjectItem) => void;
  isAdmin?: boolean;
}> = ({ project, onOpenDetails, onQuickUpload, isAdmin = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const imgShiftX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const imgShiftY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);
  const lightSheenX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const lightSheenY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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

  // Category Theme Color
  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'Web Design':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/30';
      case 'Game Development':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30';
      case 'AI Creativity':
        return 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-500/30';
      case 'Graphic Design':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/30';
      case 'Branding / Business':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/30';
      default:
        return 'bg-neutral-900 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        transformStyle: 'preserve-3d',
      }}
      className="relative rounded-3xl metallic-card metallic-card-hover overflow-hidden flex flex-col justify-between group cursor-pointer"
      onClick={() => onOpenDetails(project)}
    >
      {/* Dynamic Specular Light Reflection */}
      <motion.div
        style={{
          background: `radial-gradient(circle 220px at ${lightSheenX} ${lightSheenY}, rgba(255,255,255,0.08), transparent 70%)`,
        }}
        className="absolute inset-0 rounded-3xl pointer-events-none z-30"
      />

      {/* Card Image Area with Subtle 3D Shift & Zoom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950 border-b border-purple-500/20">
        {project.projectImage ? (
          <motion.img
            style={{
              x: imgShiftX,
              y: imgShiftY,
            }}
            src={project.projectImage}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* Aesthetic Fallback Artwork */
          <motion.div
            style={{
              x: imgShiftX,
              y: imgShiftY,
            }}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-900 via-purple-950/50 to-neutral-950 relative overflow-hidden"
          >
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-400/40 flex items-center justify-center mb-2 z-10 shadow-lg group-hover:border-purple-300 transition-colors">
              <span className="text-xl font-bold chrome-purple-text font-serif">
                FA
              </span>
            </div>
            <span className="text-xs font-semibold text-white z-10">
              {project.title}
            </span>
            <span className="text-[10px] text-purple-300/80 font-mono mt-0.5 z-10">
              {project.category}
            </span>
          </motion.div>
        )}

        {/* Category Pill Top Left */}
        <div className="absolute top-3 left-3 z-20">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border backdrop-blur-md ${getCategoryBadgeClass(
              project.category
            )}`}
          >
            {project.category}
          </span>
        </div>

        {/* Quick Image Upload Button Top Right - ADMIN ONLY */}
        {isAdmin && onQuickUpload && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickUpload(project);
            }}
            className="absolute top-3 right-3 z-20 p-2 rounded-xl bg-neutral-950/80 hover:bg-purple-600 text-neutral-300 hover:text-white border border-purple-500/30 transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
            title="Upload / Change Project Image"
          >
            <Camera className="w-4 h-4" />
          </button>
        )}

        {/* Interactive Hover Overlay with "View Project" button */}
        <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4 z-20">
          <span className="text-xs font-semibold text-purple-200 tracking-wide uppercase font-mono">
            {project.category}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(project);
            }}
            className="btn-chrome px-4 py-2 rounded-xl text-xs font-semibold text-white tracking-wide inline-flex items-center gap-2 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Project</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-neutral-300/80 leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tools Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 rounded-md bg-purple-950/40 border border-purple-500/20 text-[10px] font-mono text-purple-200"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Card Footer Actions */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(project);
              }}
              className="text-purple-300 hover:text-white font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Project Details</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-400 hover:text-white transition-colors"
                title="View Code Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onUpdateProject,
  isAdmin = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [uploadTargetProject, setUploadTargetProject] = useState<ProjectItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'All',
    'Web Design',
    'Game Development',
    'AI Creativity',
    'Graphic Design',
    'Branding / Business',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // File upload handler for project image
  const handleProjectImageUpload = (file: File, project: ProjectItem) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const updated = { ...project, projectImage: result };
        if (onUpdateProject) {
          onUpdateProject(updated);
        }
        if (activeModalProject?.id === project.id) {
          setActiveModalProject(updated);
        }
        setUploadTargetProject(null);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="projects" className="relative py-24 bg-[#050508] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hidden file input for quick upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && uploadTargetProject) {
            handleProjectImageUpload(file, uploadTargetProject);
          }
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full metallic-badge mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              PORTFOLIO SHOWCASE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="chrome-purple-text">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-2xl mx-auto">
            A curated selection of shipped web applications, Unity 3D game concepts, generative AI pipelines, and commercial brand identities.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/60 border border-purple-400/40'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-purple-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              isAdmin={isAdmin}
              onOpenDetails={(p) => setActiveModalProject(p)}
              onQuickUpload={
                isAdmin
                  ? (p) => {
                      setUploadTargetProject(p);
                      fileInputRef.current?.click();
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl metallic-card p-6 sm:p-8 border border-purple-400/40 shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Area */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-purple-500/30 mb-6 group">
                {activeModalProject.projectImage ? (
                  <img
                    src={activeModalProject.projectImage}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-purple-950/60 to-neutral-950 text-center p-6">
                    <span className="text-2xl font-bold chrome-purple-text font-serif mb-2">
                      FA GROUP
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {activeModalProject.title}
                    </span>
                  </div>
                )}

                {/* Upload Button in Modal - ADMIN ONLY */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setUploadTargetProject(activeModalProject);
                      fileInputRef.current?.click();
                    }}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </button>
                )}
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-950/80 border border-purple-500/40 text-purple-300">
                    {activeModalProject.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    ID: {activeModalProject.id}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white">
                  {activeModalProject.title}
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {activeModalProject.description}
                </p>

                {/* Highlights */}
                {activeModalProject.highlights && (
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/5 space-y-2">
                    <span className="text-xs font-mono uppercase text-purple-300 font-semibold block">
                      Core Implementation Highlights
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProject.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools */}
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">
                    Technologies & Software Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tools.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  {isAdmin ? (
                    <button
                      type="button"
                      onClick={() => {
                        setUploadTargetProject(activeModalProject);
                        fileInputRef.current?.click();
                      }}
                      className="btn-secondary-metal px-4 py-2 rounded-xl text-xs font-medium text-neutral-200 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-purple-400" />
                      <span>Change Image (JPG, PNG, WebP)</span>
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-purple-300/80">
                      FA GROUP Official Portfolio
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    {activeModalProject.githubUrl && (
                      <a
                        href={activeModalProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(null)}
                      className="btn-chrome px-4 py-2 rounded-xl text-xs font-semibold text-white"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
