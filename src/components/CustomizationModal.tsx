import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sliders,
  Upload,
  RefreshCw,
  Save,
  Copy,
  Check,
  Camera,
  Layers,
  Sparkles,
  Shield,
  Trash2,
} from 'lucide-react';
import { PortfolioData } from '../types.ts';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onResetToDefaults: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onResetToDefaults,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'profile' | 'stats' | 'socials'>('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize with incoming data
  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const handleProfilePhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormData({ ...formData, profileImage: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCopyConfig = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl metallic-card border border-purple-400/40 shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-purple-500/20 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/30 text-purple-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Customize Portfolio & Brand</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 border border-purple-500/30 text-purple-300">
                  FA GROUP
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Update your name, bio, image, stats, and social links instantly.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/5 bg-neutral-950/30 overflow-x-auto">
          {[
            { id: 'general', label: 'General & Brand' },
            { id: 'profile', label: 'Profile Photo & Bio' },
            { id: 'stats', label: 'Statistics' },
            { id: 'socials', label: 'Contact & Socials' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-500 text-white bg-purple-950/20'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Tab 1: General & Brand */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                    Portfolio Name
                  </label>
                  <input
                    type="text"
                    value={formData.portfolioName}
                    onChange={(e) => setFormData({ ...formData, portfolioName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={formData.companyTagline}
                  onChange={(e) => setFormData({ ...formData, companyTagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  Hero Role / Title
                </label>
                <input
                  type="text"
                  value={formData.heroRole}
                  onChange={(e) => setFormData({ ...formData, heroRole: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  Hero Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.heroDescription}
                  onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white resize-y"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Profile Photo & Bio */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              {/* Photo Area */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-purple-500/20 flex flex-col sm:flex-row items-center gap-5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={handleProfilePhotoFile}
                />

                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-400/40 bg-neutral-950 shrink-0 flex items-center justify-center">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-lg font-bold chrome-purple-text font-serif">
                      FA
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-white block">
                    Profile Image Upload (JPG, JPEG, PNG, WebP)
                  </span>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    Upload your high-res portrait. Stored safely in your browser storage or configure <code className="text-purple-300 font-mono">profileImage</code> directly in <code className="text-purple-300 font-mono">portfolioConfig.ts</code>.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-chrome px-3 py-1.5 rounded-xl text-xs font-semibold text-white inline-flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Upload From Device</span>
                    </button>

                    {formData.profileImage && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, profileImage: '' })}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs inline-flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Use Placeholder</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Direct URL input fallback */}
              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  Or Paste Direct Image URL:
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/my-photo.jpg"
                  value={formData.profileImage}
                  onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  About Me Bio Text
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutBio}
                  onChange={(e) => setFormData({ ...formData, aboutBio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white resize-y"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Statistics */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                Update the 4 prominent stat badges displayed in the About Me section:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.stats.map((stat, idx) => (
                  <div key={stat.id} className="p-4 rounded-xl bg-neutral-900 border border-purple-500/20 space-y-2">
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">
                      Metric #{idx + 1}
                    </span>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...formData.stats];
                          newStats[idx].value = e.target.value;
                          setFormData({ ...formData, stats: newStats });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...formData.stats];
                          newStats[idx].label = e.target.value;
                          setFormData({ ...formData, stats: newStats });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Contact & Socials */}
          {activeTab === 'socials' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
                  Primary Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/20 text-xs text-white"
                />
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase text-neutral-300 font-semibold block">
                  Social Channels & Handles:
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
                        URL / Link
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
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-purple-500/20 bg-neutral-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetToDefaults}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleCopyConfig}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
              title="Copy current data JSON to clipboard"
            >
              {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedConfig ? 'Copied!' : 'Export JSON'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary-metal px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="btn-chrome px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-lg"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
