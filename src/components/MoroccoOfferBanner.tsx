import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { sound } from '../utils/sound.ts';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const MoroccoOfferBanner: React.FC = () => {
  const { setIsMoroccoModalOpen, language } = useApp();
  const isAr = language === 'ar';

  const handleClick = () => {
    sound.playPop();
    setIsMoroccoModalOpen(true);
  };

  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white p-4 sm:p-5 shadow-xl shadow-red-500/20 border border-white/20 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] transition-all group"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left side text */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner shrink-0 border border-white/30 group-hover:rotate-6 transition-transform">
            🇲🇦
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-xs">
                {isAr ? 'عرض المغرب الخاص' : 'Offre Spéciale Maroc'}
              </span>
              <span className="text-[11px] font-bold text-amber-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                {isAr ? 'خصم 50% لفترة محدودة' : '-50% Offre de Lancement'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black font-heading leading-tight">
              {isAr
                ? 'استفد من اشتراك العائلة الكامل بسعر 150 درهم فقط !'
                : 'Accès Famille Complet à 150 DH au lieu de 499 DH !'}
            </h3>
            <p className="text-xs text-rose-100 font-medium">
              {isAr
                ? 'جميع الأنشطة (برمجة، ذكاء اصطناعي، منطق)، ملفات غير محدودة لكل أطفالك وشهادات معتمدة.'
                : 'Tous les modules (Code, IA, Logique), profils illimités et diplômes officiels téléchargeables.'}
            </p>
          </div>
        </div>

        {/* Right side CTA Button */}
        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-rose-200 line-through">499 DH</div>
            <div className="text-2xl font-black text-amber-300 leading-none">150 DH</div>
          </div>
          <button
            type="button"
            className="py-2.5 px-5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 group-hover:translate-x-1 duration-200"
          >
            <span>{isAr ? 'تفعيل العرض الآن' : 'Profiter de l’offre'}</span>
            <ArrowRight className="w-4 h-4 text-rose-600" />
          </button>
        </div>

      </div>
    </div>
  );
};
