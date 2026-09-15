import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Lock,
  ArrowLeft,
  KeyRound,
  Mail,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  loginWithEmailPassword,
  sendResetPassword,
  verifyAdminToken,
  logoutAdmin,
} from '../lib/firebase.ts';

interface AdminLoginProps {
  onLoginSuccess: (token: string, email: string) => void;
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToPublic,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);

  // Handle Administrator Email/Password Sign In
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResetMessage(null);

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // 1. Authenticate with credentials
      const authResult = await loginWithEmailPassword(email.trim(), password);

      // 2. Cryptographically verify administrator authorization
      const authCheck = await verifyAdminToken(authResult.token);

      if (!authCheck.authorized) {
        await logoutAdmin(authResult.token);
        setError('Access denied: This account is not authorized as administrator.');
        setLoading(false);
        return;
      }

      // 3. Complete login
      sessionStorage.setItem('fa_admin_token', authResult.token);
      onLoginSuccess(authResult.token, authResult.email);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    setError(null);
    setResetMessage(null);

    if (!email.trim()) {
      setError('Please enter your email in the field above to receive a password reset link.');
      return;
    }

    setResetLoading(true);
    try {
      await sendResetPassword(email.trim());
      setResetMessage('If a registered administrator account exists for this email, a reset link has been sent.');
    } catch (err: unknown) {
      const errObj = err as { code?: string; message?: string };
      if (errObj.code === 'auth/user-not-found') {
        setResetMessage('If a registered administrator account exists for this email, a reset link has been sent.');
      } else {
        setError(errObj.message || 'Failed to send reset email. Please try again.');
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative brand monogram watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
        <span className="text-[25vw] font-black tracking-tighter text-white font-serif">
          FA
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md rounded-3xl metallic-card p-8 border border-purple-400/35 relative z-10 shadow-2xl"
      >
        {/* Return to Public Site */}
        <button
          type="button"
          onClick={onBackToPublic}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portfolio</span>
        </button>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-500/30 via-neutral-900 to-purple-950 border border-purple-400/40 flex items-center justify-center shadow-lg shadow-purple-950/60">
            <span className="text-2xl font-black chrome-purple-text font-serif">
              FA
            </span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-purple-300 uppercase mb-1 font-semibold">
            FA GROUP COMPANY
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">
            Administrator <span className="chrome-purple-text">Login</span>
          </h1>
        </div>

        {/* Error notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-200"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </motion.div>
        )}

        {/* Reset notification */}
        {resetMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-start gap-2.5 text-xs text-emerald-200"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{resetMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div>
            <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-purple-400 font-mono"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-neutral-300 font-semibold block">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors font-mono cursor-pointer"
              >
                {resetLoading ? 'Sending...' : 'Forgot Password'}
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-900 border border-purple-500/25 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-chrome w-full py-3 rounded-xl text-xs font-bold text-white tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60 mt-6 cursor-pointer disabled:opacity-50"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Private management portal. Public visitors have read-only access to published portfolio content.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
