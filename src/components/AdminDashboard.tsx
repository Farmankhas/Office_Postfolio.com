import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  LogOut,
  ExternalLink,
  Save,
  Check,
  AlertCircle,
  Camera,
  Trash2,
  Plus,
  Edit2,
  Layers,
  Sparkles,
  Sliders,
  Award,
  Globe,
  Briefcase,
  User,
  Key,
  FolderKanban,
  FileText,
  Upload,
  RefreshCw,
} from 'lucide-react';
import {
  PortfolioData,
  SkillCategory,
  ServiceItem,
  ProjectItem,
  SocialLink,
  StatItem,
} from '../types.ts';
import { updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase.ts';

interface AdminDashboardProps {
  adminEmail: string;
  adminToken: string;
  data: PortfolioData;
  onSaveData: (newData: PortfolioData) => Promise<void>;
  onLogout: () => void;
  onViewPublicSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminEmail,
  adminToken,
  data,
  onSaveData,
  onLogout,
  onViewPublicSite,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'skills' | 'services' | 'projects' | 'fagroup' | 'socials' | 'security'
  >('profile');

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Profile image upload ref
  const profileInputRef = useRef<HTMLInputElement>(null);

  // New Skill Modal / State
  const [editingSkillCategory, setEditingSkillCategory] = useState<number | null>(null);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(90);

  // Project Editor Modal State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const projectImgInputRef = useRef<HTMLInputElement>(null);

  // Service Editor Modal State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewService, setIsNewService] = useState(false);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);

  // Handle Save
  const handleSave = async () => {
    setSaveStatus('saving');
    setSaveMessage(null);
    try {
      await onSaveData(formData);
      setSaveStatus('saved');
      setSaveMessage('All portfolio changes securely saved and published!');
      setTimeout(() => {
        setSaveStatus('idle');
        setSaveMessage(null);
      }, 4000);
    } catch (err: any) {
      setSaveStatus('error');
      setSaveMessage(err.message || 'Failed to save changes.');
    }
  };

  // Profile Image upload
  const handleProfileImageUpload = (file: File) => {
    const valid = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!valid.includes(file.type)) {
      alert('Please select a JPG, PNG, or WebP image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setFormData({ ...formData, profileImage: result });
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordStatus('Password must be at least 6 characters.');
      return;
    }

    try {
      // 1. Update server authentication credentials
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to update password');
      }

      // 2. Also update Firebase Auth if active currentUser session
      if (auth.currentUser) {
        try {
          await updatePassword(auth.currentUser, newPassword);
        } catch {
          // ignore if re-auth required
        }
      }

      setPasswordStatus('Administrator password successfully updated and secured!');
      setNewPassword('');
      setTimeout(() => setPasswordStatus(null), 4000);
    } catch (err: any) {
      setPasswordStatus('Error: ' + (err.message || 'Failed to update password'));
    }
  };

  const handleSendPasswordReset = async () => {
    if (!auth.currentUser?.email) {
      setPasswordStatus('Unable to determine administrator email for reset.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      setPasswordStatus('Password reset link sent to registered administrator email.');
      setTimeout(() => setPasswordStatus(null), 4000);
    } catch (err: any) {
      setPasswordStatus('Error sending reset link: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#06050a] text-neutral-100 pb-24">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-xl border-b border-purple-500/25 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300 font-bold font-serif shadow-sm">
            FA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">Admin Dashboard</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AUTHORIZED ADMIN</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-purple-300/80">
              {adminEmail}
            </span>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onViewPublicSite}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="btn-chrome px-4 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-purple-950/50 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saveStatus === 'saving' ? 'Saving...' : 'Publish Changes'}</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 hover:text-white text-xs transition-colors flex items-center gap-1"
            title="Log out from Admin Dashboard"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Save Status Notification Banner */}
      <AnimatePresence>
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`max-w-7xl mx-auto px-4 sm:px-8 mt-4 py-2.5 rounded-xl text-xs flex items-center gap-2 ${
              saveStatus === 'error'
                ? 'bg-rose-950/80 border border-rose-500/50 text-rose-200'
                : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200'
            }`}
          >
            {saveStatus === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{saveMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pb-4 border-b border-purple-500/20 overflow-x-auto no-scrollbar">
          {[
            { id: 'profile', label: 'Profile & Bio', icon: User },
            { id: 'skills', label: 'Skills Manager', icon: Layers },
            { id: 'services', label: 'Services Manager', icon: Briefcase },
            { id: 'projects', label: 'Projects & Uploads', icon: FolderKanban },
            { id: 'fagroup', label: 'FA GROUP Brand', icon: Sparkles },
            { id: 'socials', label: 'Contact & Socials', icon: Globe },
            { id: 'security', label: 'Admin Security', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-950 border border-purple-400/50'
                    : 'bg-neutral-900/70 text-neutral-400 hover:text-white border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: Profile & Bio */}
        {/* ============================================================== */}
        {activeTab === 'profile' && (
          <div className="mt-8 space-y-8">
            {/* Profile Photo Uploader Section */}
            <div className="p-6 sm:p-8 rounded-3xl metallic-card space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-400" />
                <span>Profile Image System</span>
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleProfileImageUpload(f);
                  }}
                />

                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-purple-400/50 bg-neutral-950 shrink-0 flex items-center justify-center shadow-xl">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Admin Profile Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-2xl font-bold chrome-purple-text font-serif">
                      FA
                    </span>
                  )}
                </div>

                <div className="space-y-3 flex-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-white block">
                    Upload High-Resolution Profile Photo
                  </span>
                  <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
                    Supports JPG, PNG, and WebP formats. Only the authenticated administrator can change this image.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={() => profileInputRef.current?.click()}
                      className="btn-chrome px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Image</span>
                    </button>

                    {formData.profileImage && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, profileImage: '' })}
                        className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 hover:text-white flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Reset to Placeholder</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Direct image URL input */}
              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                  Or Set Direct Hosted Image URL:
                </label>
                <input
                  type="text"
                  value={formData.profileImage}
                  onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                />
              </div>
            </div>

            {/* Profile Information */}
            <div className="p-6 sm:p-8 rounded-3xl metallic-card space-y-5">
              <h3 className="text-lg font-bold text-white">Headline, Role & Bio</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                    Portfolio Main Name
                  </label>
                  <input
                    type="text"
                    value={formData.portfolioName}
                    onChange={(e) => setFormData({ ...formData, portfolioName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                    Hero Role Title
                  </label>
                  <input
                    type="text"
                    value={formData.heroRole}
                    onChange={(e) => setFormData({ ...formData, heroRole: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  About Me Detailed Bio
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutBio}
                  onChange={(e) => setFormData({ ...formData, aboutBio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white resize-y"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  FA GROUP Connection Quote
                </label>
                <input
                  type="text"
                  value={formData.aboutFALink}
                  onChange={(e) => setFormData({ ...formData, aboutFALink: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                />
              </div>

              {/* Statistics */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-neutral-400 font-semibold block mb-3">
                  Key Statistics Badges:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.stats.map((st, idx) => (
                    <div key={st.id} className="p-3 rounded-xl bg-neutral-900 border border-purple-500/20">
                      <label className="text-[10px] text-purple-400 font-mono block mb-1">
                        Stat #{idx + 1}
                      </label>
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => {
                          const newStats = [...formData.stats];
                          newStats[idx].value = e.target.value;
                          setFormData({ ...formData, stats: newStats });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white font-mono mb-1.5"
                      />
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const newStats = [...formData.stats];
                          newStats[idx].label = e.target.value;
                          setFormData({ ...formData, stats: newStats });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: Skills Manager */}
        {/* ============================================================== */}
        {activeTab === 'skills' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Skills Categories & Proficiencies</h3>
                <p className="text-xs text-neutral-400">
                  Add, edit, or remove technical and design skills.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.skills.map((cat, catIdx) => (
                <div key={cat.id} className="p-6 rounded-3xl metallic-card space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>{cat.title}</span>
                    </h4>
                    <span className="text-[10px] font-mono text-purple-300">
                      {cat.skills.length} skills
                    </span>
                  </div>

                  {/* Skills List in Category */}
                  <div className="space-y-2.5">
                    {cat.skills.map((s, sIdx) => (
                      <div
                        key={s.name}
                        className="p-2.5 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-semibold text-white block">{s.name}</span>
                          <span className="text-[10px] text-purple-300 font-mono">
                            {s.level}% Proficiency
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={s.level}
                            onChange={(e) => {
                              const updatedCategories = [...formData.skills];
                              updatedCategories[catIdx].skills[sIdx].level = parseInt(e.target.value);
                              setFormData({ ...formData, skills: updatedCategories });
                            }}
                            className="w-20 accent-purple-500 cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedCategories = [...formData.skills];
                              updatedCategories[catIdx].skills = updatedCategories[catIdx].skills.filter(
                                (_, idx) => idx !== sIdx
                              );
                              setFormData({ ...formData, skills: updatedCategories });
                            }}
                            className="p-1 rounded text-neutral-500 hover:text-rose-400"
                            title="Delete skill"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add skill into category */}
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add new skill..."
                      value={editingSkillCategory === catIdx ? newSkillName : ''}
                      onFocus={() => setEditingSkillCategory(catIdx)}
                      onChange={(e) => {
                        setEditingSkillCategory(catIdx);
                        setNewSkillName(e.target.value);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newSkillName.trim()) return;
                        const updatedCategories = [...formData.skills];
                        updatedCategories[catIdx].skills.push({
                          name: newSkillName.trim(),
                          level: 90,
                          icon: 'Sparkles',
                        });
                        setFormData({ ...formData, skills: updatedCategories });
                        setNewSkillName('');
                      }}
                      className="btn-chrome px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: Services Manager */}
        {/* ============================================================== */}
        {activeTab === 'services' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Services Offerings</h3>
                <p className="text-xs text-neutral-400">
                  Manage professional packages and client deliverables.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingService({
                    id: `service-${Date.now()}`,
                    title: 'New Service',
                    category: 'Creative Services',
                    description: 'Detailed description of the new service.',
                    deliverables: ['High-Quality Deliverable 1', 'Deliverable 2'],
                    icon: 'Sparkles',
                    featured: false,
                  });
                  setIsNewService(true);
                }}
                className="btn-chrome px-3.5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {formData.services.map((srv, idx) => (
                <div key={srv.id} className="p-5 rounded-2xl metallic-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold">
                        {srv.category}
                      </span>
                      {srv.featured && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30">
                          Featured
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">{srv.title}</h4>
                    <p className="text-xs text-neutral-400 line-clamp-3 mb-4">{srv.description}</p>

                    <div className="space-y-1 mb-4">
                      {srv.deliverables.map((del) => (
                        <div key={del} className="text-[11px] text-neutral-300 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-purple-400 shrink-0" />
                          <span className="truncate">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingService(srv);
                        setIsNewService(false);
                      }}
                      className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Service</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete service "${srv.title}"?`)) {
                          setFormData({
                            ...formData,
                            services: formData.services.filter((s) => s.id !== srv.id),
                          });
                        }
                      }}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-950/30"
                      title="Delete service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: Projects Manager */}
        {/* ============================================================== */}
        {activeTab === 'projects' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Projects & Image Uploads</h3>
                <p className="text-xs text-neutral-400">
                  Manage showcased projects and upload custom project screenshots/artwork.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProject({
                    id: `project-${Date.now()}`,
                    title: 'New Featured Project',
                    category: 'Web Design',
                    description: 'Project overview and objectives.',
                    tools: ['React', 'Tailwind CSS'],
                    highlights: ['Responsive layout', 'Performance optimized'],
                  });
                  setIsNewProject(true);
                }}
                className="btn-chrome px-3.5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formData.projects.map((proj) => (
                <div key={proj.id} className="p-5 rounded-3xl metallic-card flex flex-col justify-between">
                  <div>
                    {/* Project Image Preview */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-purple-500/25 mb-4">
                      {proj.projectImage ? (
                        <img
                          src={proj.projectImage}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-purple-950/40 text-center p-4">
                          <span className="text-lg font-bold chrome-purple-text font-serif mb-1">
                            FA
                          </span>
                          <span className="text-xs text-white">{proj.title}</span>
                        </div>
                      )}

                      <div className="absolute top-2 left-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-950/90 border border-purple-500/30 text-purple-300">
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1.5">{proj.title}</h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 mb-3">{proj.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.tools.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/50 border border-purple-500/20 text-purple-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(proj);
                        setIsNewProject(false);
                      }}
                      className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit & Upload Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          setFormData({
                            ...formData,
                            projects: formData.projects.filter((p) => p.id !== proj.id),
                          });
                        }
                      }}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-950/30"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: FA GROUP Brand */}
        {/* ============================================================== */}
        {activeTab === 'fagroup' && (
          <div className="mt-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl metallic-card space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>FA GROUP COMPANY Identity</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                    Official Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.companyTagline}
                    onChange={(e) => setFormData({ ...formData, companyTagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  Company Official Mission / Description
                </label>
                <textarea
                  rows={4}
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white resize-y"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: Contact & Socials */}
        {/* ============================================================== */}
        {activeTab === 'socials' && (
          <div className="mt-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl metallic-card space-y-5">
              <h3 className="text-lg font-bold text-white">Contact & Social Channels</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                    Official Inquiries Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                    Location / Operational Reach
                  </label>
                  <input
                    type="text"
                    value={formData.contactLocation}
                    onChange={(e) => setFormData({ ...formData, contactLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-3">
                <span className="text-xs font-mono uppercase text-neutral-400 font-semibold block">
                  Social Links & Handles:
                </span>
                {formData.socialLinks.map((link, idx) => (
                  <div key={link.id} className="p-3 rounded-xl bg-neutral-900 border border-purple-500/15 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-neutral-400 font-mono block mb-1">
                        {link.name} Display Handle
                      </label>
                      <input
                        type="text"
                        value={link.displayHandle}
                        onChange={(e) => {
                          const newLinks = [...formData.socialLinks];
                          newLinks[idx].displayHandle = e.target.value;
                          setFormData({ ...formData, socialLinks: newLinks });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400 font-mono block mb-1">
                        URL / Direct Link
                      </label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...formData.socialLinks];
                          newLinks[idx].url = e.target.value;
                          setFormData({ ...formData, socialLinks: newLinks });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: Security & Password */}
        {/* ============================================================== */}
        {activeTab === 'security' && (
          <div className="mt-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl metallic-card space-y-5 max-w-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span>Admin Password Management</span>
              </h3>

              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center justify-between">
                <span>Firebase Authentication Security:</span>
                <span className="font-mono text-emerald-400 font-semibold">Protected Administrator Active</span>
              </div>

              {passwordStatus && (
                <div className="p-3 rounded-xl bg-neutral-900 border border-purple-400 text-xs text-purple-200">
                  {passwordStatus}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                    New Administrator Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-chrome px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* Project Edit / Add Modal */}
      {/* ============================================================== */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl metallic-card p-6 sm:p-7 border border-purple-400/40 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-white">
                {isNewProject ? 'Add New Project' : `Edit: ${editingProject.title}`}
              </h3>

              <input
                ref={projectImgInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      const res = evt.target?.result as string;
                      if (res) {
                        setEditingProject({ ...editingProject, projectImage: res });
                      }
                    };
                    reader.readAsDataURL(f);
                  }
                }}
              />

              {/* Project Image Preview & Upload */}
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 border border-purple-500/30 relative group">
                {editingProject.projectImage ? (
                  <img
                    src={editingProject.projectImage}
                    alt="Project"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 text-neutral-400">
                    <FolderKanban className="w-8 h-8 text-purple-400 mb-2" />
                    <span className="text-xs">No image uploaded</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => projectImgInputRef.current?.click()}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </button>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Category
                </label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                >
                  <option value="Web Design">Web Design</option>
                  <option value="Game Development">Game Development</option>
                  <option value="AI Creativity">AI Creativity</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Branding / Business">Branding / Business</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Tools (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.tools.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tools: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white font-mono"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (isNewProject) {
                      setFormData({
                        ...formData,
                        projects: [editingProject, ...formData.projects],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        projects: formData.projects.map((p) =>
                          p.id === editingProject.id ? editingProject : p
                        ),
                      });
                    }
                    setEditingProject(null);
                  }}
                  className="btn-chrome px-4 py-2 rounded-xl text-xs font-bold text-white"
                >
                  Save Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* Service Edit / Add Modal */}
      {/* ============================================================== */}
      <AnimatePresence>
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl metallic-card p-6 border border-purple-400/40 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-white">
                {isNewService ? 'Add Service' : `Edit: ${editingService.title}`}
              </h3>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editingService.category}
                  onChange={(e) =>
                    setEditingService({ ...editingService, category: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Deliverables (one per line)
                </label>
                <textarea
                  rows={3}
                  value={editingService.deliverables.join('\n')}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      deliverables: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (isNewService) {
                      setFormData({
                        ...formData,
                        services: [editingService, ...formData.services],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        services: formData.services.map((s) =>
                          s.id === editingService.id ? editingService : s
                        ),
                      });
                    }
                    setEditingService(null);
                  }}
                  className="btn-chrome px-4 py-2 rounded-xl text-xs font-bold text-white"
                >
                  Save Service
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
