import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Send,
  CheckCircle2,
  Phone,
  MessageSquare,
  Globe,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Sparkles,
  ArrowRight,
  Shield,
  Copy,
  Check,
} from 'lucide-react';
import { SocialLink } from '../types.ts';

interface ContactSectionProps {
  socialLinks: SocialLink[];
  contactEmail?: string;
  contactLocation?: string;
  companyName?: string;
  selectedServicePreFill?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  socialLinks,
  contactEmail = 'contact@fagroup.com',
  contactLocation = 'International / Remote Worldwide',
  companyName = 'FA GROUP COMPANY',
  selectedServicePreFill,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: selectedServicePreFill || 'Website',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const projectTypes = [
    'Website',
    'Graphic Design',
    'AI Content',
    '3D Design',
    'Branding',
    'Game Development',
    'FA GROUP Business Inquiry',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const getSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'whatsapp':
        return <Phone className="w-4 h-4 text-emerald-400" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-fuchsia-400" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-blue-400" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-sky-400" />;
      case 'github':
        return <Github className="w-4 h-4 text-purple-300" />;
      case 'mail':
        return <Mail className="w-4 h-4 text-purple-400" />;
      default:
        return <Globe className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#050508] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full metallic-badge mb-4">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              INITIATE COLLABORATION
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Let’s Build <span className="chrome-purple-text">Something Great</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-2xl mx-auto">
            Ready to bring your digital vision to life? Send an inquiry directly or connect through official channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl metallic-card space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block mb-1">
                  DIRECT CHANNELS
                </span>
                <h3 className="text-xl font-bold text-white">
                  {companyName} Inquiries
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Available for freelance commissions, design consultation, and enterprise digital solutions.
                </p>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-mono block">OFFICIAL EMAIL</span>
                    <span className="text-xs font-semibold text-white">{contactEmail}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(contactEmail, 'email-main')}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedLink === 'email-main' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-purple-500/20 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono block">HEADQUARTERS / SERVICE REACH</span>
                  <span className="text-xs font-semibold text-white">{contactLocation}</span>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-neutral-400 font-semibold block mb-2">
                  Social & Messaging Channels:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-neutral-900 hover:bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/40 flex items-center gap-2.5 text-xs text-neutral-200 transition-all group"
                    >
                      <div className="p-1.5 rounded-lg bg-neutral-800 group-hover:bg-purple-600/20">
                        {getSocialIcon(s.icon)}
                      </div>
                      <div className="overflow-hidden">
                        <span className="font-semibold block text-white group-hover:text-purple-300 truncate">
                          {s.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono truncate block">
                          {s.displayHandle}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl metallic-card relative">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Received!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md leading-relaxed">
                    Thank you, <span className="text-purple-300 font-semibold">{formData.name}</span>. Your inquiry regarding <span className="text-purple-300 font-semibold">{formData.projectType}</span> has been securely logged. I will respond to <span className="text-purple-300 font-semibold">{formData.email}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', projectType: 'Website', message: '' });
                    }}
                    className="btn-secondary-metal px-5 py-2.5 rounded-xl text-xs font-semibold text-white mt-4"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-purple-500/25 text-sm text-white placeholder-neutral-500 focus:outline-hidden focus:border-purple-400 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. alex@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-purple-500/25 text-sm text-white placeholder-neutral-500 focus:outline-hidden focus:border-purple-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-2">
                      Project Type *
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-purple-500/25 text-sm text-white focus:outline-hidden focus:border-purple-400 transition-colors"
                    >
                      {projectTypes.map((pt) => (
                        <option key={pt} value={pt} className="bg-neutral-950 text-white">
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-2">
                      Project Details / Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your project, timeline, deliverables, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-purple-500/25 text-sm text-white placeholder-neutral-500 focus:outline-hidden focus:border-purple-400 transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-chrome w-full py-4 rounded-2xl text-sm font-bold text-white tracking-wide flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-neutral-400">
                    Protected by FA GROUP Client Confidentiality • Prompt response within 24 hours
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
