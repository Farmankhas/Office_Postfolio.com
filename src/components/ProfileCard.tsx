import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Upload, Camera, Sparkles, Check, RefreshCw, X, Shield, ArrowUpRight } from 'lucide-react';

interface ProfileCardProps {
  currentImage?: string;
  onImageChange?: (base64OrUrl: string) => void;
  founderTitle?: string;
  companyName?: string;
  tagline?: string;
  showControls?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  currentImage,
  onImageChange,
  founderTitle = 'Founder / Creative Professional',
  companyName = 'FA GROUP COMPANY',
  tagline = 'PREMIUM INTERNATIONAL BUSINESS',
  showControls = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/touch
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Motion values for interactive 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 140 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation angles
  const tiltX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  
  // Specular lighting reflection coordinates
  const lightSheenX = useTransform(smoothX, [-0.5, 0.5], ['10%', '90%']);
  const lightSheenY = useTransform(smoothY, [-0.5, 0.5], ['10%', '90%']);
  
  // Depth parallax for internal image layer
  const imageParallaxX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const imageParallaxY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
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

  // Handle File upload (JPG, JPEG, PNG, WebP)
  const processFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadNotice('Please upload a valid JPG, PNG, or WebP image.');
      setTimeout(() => setUploadNotice(null), 4000);
      return;
    }

    // Limit to 8MB
    if (file.size > 8 * 1024 * 1024) {
      setUploadNotice('Image size should be under 8MB.');
      setTimeout(() => setUploadNotice(null), 4000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onImageChange(result);
        try {
          localStorage.setItem('my_skills_profile_image', result);
        } catch {
          // localStorage full / private mode fallback
        }
        setUploadNotice('Profile image successfully updated!');
        setTimeout(() => setUploadNotice(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange('');
    localStorage.removeItem('my_skills_profile_image');
    setUploadNotice('Reverted to professional placeholder.');
    setTimeout(() => setUploadNotice(null), 3000);
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto flex flex-col items-center">
      {/* Hidden File Input */}
      {showControls && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
          onChange={handleFileInputChange}
          aria-label="Upload Profile Image (JPG, PNG, WebP)"
        />
      )}

      {/* Upload Status Toast */}
      {showControls && uploadNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-12 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-purple-400 text-xs text-purple-200 shadow-xl shadow-purple-950/80 font-medium"
        >
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{uploadNotice}</span>
        </motion.div>
      )}

      {/* Main 3D Tilt Card Frame */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onDragOver={
          showControls
            ? (e) => {
                e.preventDefault();
                setIsDragOver(true);
              }
            : undefined
        }
        onDragLeave={showControls ? () => setIsDragOver(false) : undefined}
        onDrop={showControls ? handleDrop : undefined}
        style={{
          rotateX: isMobile ? 0 : tiltX,
          rotateY: isMobile ? 0 : tiltY,
          transformStyle: 'preserve-3d',
        }}
        animate={
          isMobile
            ? {
                y: [0, -8, 0],
              }
            : undefined
        }
        transition={
          isMobile
            ? {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
        className={`relative w-full rounded-3xl p-6 sm:p-7 metallic-card transition-shadow duration-500 select-none group ${
          showControls ? 'cursor-pointer' : 'cursor-default'
        } ${
          isDragOver
            ? 'border-purple-400 ring-2 ring-purple-400/50 scale-[1.02]'
            : 'border-purple-500/25'
        }`}
        onClick={showControls ? () => fileInputRef.current?.click() : undefined}
      >
        {/* Animated Gradient Border Ring */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-purple-800/20 to-transparent -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Dynamic Specular Sheen (Reacts to cursor) */}
        {!isMobile && (
          <motion.div
            style={{
              background: `radial-gradient(circle 180px at ${lightSheenX} ${lightSheenY}, rgba(255,255,255,0.12), transparent 70%)`,
            }}
            className="absolute inset-0 rounded-3xl pointer-events-none z-30"
          />
        )}

        {/* Top Badging inside Card */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-[11px] font-semibold text-purple-200">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>FA VERIFIED FOUNDER</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE</span>
          </div>
        </div>

        {/* Circular / Rounded Image Frame with Glassmorphic Halo */}
        <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 flex items-center justify-center">
          {/* Outer glowing pulsing halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/30 via-fuchsia-500/20 to-sky-400/20 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse" />

          {/* Precision metallic bezel ring */}
          <div className="absolute inset-1 rounded-full border-2 border-purple-400/40 group-hover:border-purple-300 transition-colors" />

          {/* Image Container with Parallax Depth */}
          <motion.div
            style={{
              x: isMobile ? 0 : imageParallaxX,
              y: isMobile ? 0 : imageParallaxY,
            }}
            className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900 border border-purple-500/30 shadow-inner flex items-center justify-center"
          >
            {currentImage ? (
              <img
                src={currentImage}
                alt="Professional Portfolio Profile"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Professional Sleek Placeholder Avatar */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-purple-950/80 to-neutral-950 p-4 text-center relative overflow-hidden">
                {/* Background decorative geometry */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]" />
                
                {/* Metallic Chrome FA Monogram Silhouette */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-neutral-800 border border-purple-400/30 flex items-center justify-center shadow-lg mb-2 relative z-10 group-hover:border-purple-300 transition-colors">
                  <span className="text-3xl font-extrabold tracking-tighter chrome-purple-text font-serif">
                    FA
                  </span>
                </div>

                <span className="text-xs font-semibold text-white tracking-wide relative z-10">
                  {showControls ? 'Your Profile Photo' : 'Executive Portrait'}
                </span>
                <span className="text-[10px] text-purple-300/70 font-mono mt-0.5 relative z-10">
                  {showControls ? 'Click or Drop to Upload' : 'FA GROUP COMPANY'}
                </span>
              </div>
            )}

            {/* Hover overlay with edit/camera icon - ADMIN ONLY */}
            {showControls && (
              <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 text-white z-20">
                <div className="p-2.5 rounded-full bg-purple-600/90 text-white shadow-lg shadow-purple-900/50">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-purple-200">
                  {currentImage ? 'Change Image' : 'Upload Image'}
                </span>
                <span className="text-[9px] text-purple-300/70 font-mono">JPG • PNG • WebP</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Card Details & Identity */}
        <div className="mt-5 text-center">
          <div className="text-sm font-semibold text-white tracking-wide">
            {founderTitle}
          </div>
          <div className="text-xs text-purple-300/90 font-medium mt-0.5">
            {companyName}
          </div>
          <div className="text-[10px] text-neutral-400 tracking-wider uppercase font-mono mt-1">
            {tagline}
          </div>
        </div>

        {/* Interactive Upload / Action Bar */}
        {showControls && (
          <div className="mt-5 pt-4 border-t border-purple-500/20 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/35 border border-purple-400/40 text-xs font-medium text-purple-200 transition-all hover:text-white"
            >
              <Upload className="w-3.5 h-3.5 text-purple-400" />
              <span>Upload Profile Image</span>
            </button>

            {currentImage && (
              <button
                type="button"
                onClick={handleResetImage}
                title="Reset to default placeholder"
                className="px-2.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white text-xs transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Configuration note for the user - ADMIN ONLY */}
      {showControls && (
        <div className="mt-3 text-center">
          <p className="text-[11px] text-neutral-400 flex items-center justify-center gap-1">
            <span>Configurable via variable</span>
            <code className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono">
              profileImage
            </code>
            <span>or interactive upload</span>
          </p>
        </div>
      )}
    </div>
  );
};
