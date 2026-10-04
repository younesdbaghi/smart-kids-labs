import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Logo } from '../components/Logo.tsx';
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  ChevronDown,
  ChevronUp,
  Globe,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/sound.ts';

export const LoginPage: React.FC = () => {
  const { login, language, setLanguage, t, setIsMoroccoModalOpen } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123@');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoInfo, setShowDemoInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isAr = language === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMessage(isAr ? 'يرجى ملء جميع الخانات.' : 'Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      await login(username.trim(), password);
    } catch (err: any) {
      setErrorMessage(
        err.message || (isAr ? 'اسم المستخدم أو كلمة المرور غير صحيحة.' : 'Identifiant ou mot de passe incorrect.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    sound.playPop();
    setUsername('admin');
    setPassword('admin123@');
    setErrorMessage('');
  };

  const toggleLanguage = () => {
    sound.playPop();
    setLanguage(isAr ? 'fr' : 'ar');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Top Navigation Bar on Login (Language Switcher & Morocco Banner) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between max-w-5xl mx-auto">
        {/* Morocco Special Offer Pill */}
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black text-xs shadow-lg shadow-red-500/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 border border-white/20"
        >
          <span>🇲🇦</span>
          <span>{isAr ? 'عرض المغرب : 150 درهم' : 'Offre Maroc : 150 DH'}</span>
          <span className="bg-white/20 px-1.5 py-0.2 rounded-md text-[10px]">-50%</span>
        </button>

        {/* Language Switcher */}
        
      </div>

      {/* Background glowing ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 mt-6">
        
        {/* Emblem & Branding */}
        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-white/95 rounded-3xl shadow-2xl border-2 border-cyan-400/40 backdrop-blur-md mb-3 transform hover:scale-105 transition-transform duration-300">
            <Logo size="lg" showText={false} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
            {t('app.name')}
          </h1>
          <p className="mt-1.5 text-cyan-200 text-sm sm:text-base font-semibold">
            {t('app.tagline')}
          </p>
          <p className="mt-1 text-xs text-slate-400 max-w-xs">
            {t('app.subtagline')}
          </p>
        </div>

        {/* Card Form */}
        <div className="mt-7 bg-white/95 backdrop-blur-xl py-7 px-6 sm:px-9 shadow-2xl rounded-3xl border border-white/40">
          
          <div className="mb-5 pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800 font-heading">
                {t('login.title')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('login.subtitle')}
              </p>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[11px] font-bold text-cyan-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              <span>{t('login.secureBadge')}</span>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-in fade-in">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('login.username')}
              </label>
              <div className="relative rounded-2xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t('login.password')}
                </label>
              </div>
              <div className="relative rounded-2xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123@"
                  required
                  className="block w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
            >
              {isLoading ? (
                <span>{t('login.submitting')}</span>
              ) : (
                <>
                  <span>{t('login.submit')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* ISOLATED & DISCREET DEMO CREDENTIALS ACCORDION */}
          <div className="mt-5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowDemoInfo(!showDemoInfo)}
              className="w-full py-2 px-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('login.demoToggle')}</span>
              </span>
              {showDemoInfo ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Collapsed content only visible if opened */}
            {showDemoInfo && (
              <div className="mt-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-slate-600 font-semibold">
                  <span>{t('login.demoNotice')}</span>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="text-blue-600 hover:underline font-extrabold text-[11px]"
                  >
                    {t('login.fillAuto')}
                  </button>
                </div>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-800">
                  <span className="font-bold">admin</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold">admin123@</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 5 pillars highlights */}
        <div className="mt-6 grid grid-cols-5 gap-2 text-center text-white/80">
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">🧠</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">
              {isAr ? 'المنطق' : 'Logique'}
            </div>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">💻</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">
              {isAr ? 'البرمجة' : 'Code'}
            </div>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">🤖</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">
              {isAr ? 'الذكاء' : 'IA'}
            </div>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">🎨</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">
              {isAr ? 'إبداع' : 'Créatif'}
            </div>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">🌐</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">
              {isAr ? 'الثقافة' : 'Culture'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
