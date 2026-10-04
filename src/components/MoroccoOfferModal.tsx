import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { sound } from '../utils/sound.ts';
import {
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Building2,
  Send,
  Zap,
  Star,
  Award,
  Lock,
  ArrowRight,
  BadgePercent
} from 'lucide-react';

export const MoroccoOfferModal: React.FC = () => {
  const { isMoroccoModalOpen, setIsMoroccoModalOpen, language, setLanguage, triggerCelebration } = useApp();
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'cash' | 'transfer'>('card');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isMoroccoModalOpen) return null;

  const isAr = language === 'ar';

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    setIsSuccess(true);
    triggerCelebration({
      levelUp: true,
      newLevel: 10,
      xpEarned: 150
    });
  };

  const handleClose = () => {
    sound.playPop();
    setIsMoroccoModalOpen(false);
    setIsSuccess(false);
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden my-6">
        
        {/* Moroccan Flag & Gradient Header */}
        <div className="relative bg-gradient-to-r from-red-700 via-rose-700 to-emerald-800 p-6 sm:p-7 text-white overflow-hidden">
          {/* Subtle star pattern */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute top-2 right-12 text-6xl opacity-15 select-none font-bold">
            🇲🇦
          </div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{isAr ? '🇲🇦 عرض التدشين الحصري بالمغرب' : '🇲🇦 Offre de Lancement Spéciale Maroc'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading leading-tight">
                {isAr ? 'الوصول الكامل للعائلة بـ 150 درهم فقط' : 'Accès Famille Illimité à 150 DH'}
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-md font-medium">
                {isAr
                  ? 'سعر استثنائي لمرة واحدة بدل 499 درهم. بدون اشتراك شهري متكرر لجميع أطفالك.'
                  : 'Tarif unique à vie au lieu de 499 DH. Aucun prélèvement caché, profils illimités.'}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pricing Highlight Pill */}
          <div className="mt-5 inline-flex items-baseline gap-3 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/25">
            <span className="text-3xl sm:text-4xl font-black text-amber-300">
              {isAr ? '150 درهم' : '150 DH'}
            </span>
            <span className="text-sm sm:text-base line-through text-white/70">
              {isAr ? '499 درهم' : '499 DH'}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500 text-white text-xs font-black">
              -50%
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {isSuccess ? (
            <div className="p-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-inner">
                🎉
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                {isAr ? 'مبروك ! تم تسجيل طلب التفعيل بنجاح' : 'Félicitations ! Demande enregistrée avec succès'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {isAr
                  ? `شكراً لك ${parentName || 'ولي الأمر'}. سيتم التواصل معك فوراً عبر الواتساب (${phone || 'رقمكم'}) لتسليمك مفتاح التفعيل الرسمي.`
                  : `Merci ${parentName || 'cher parent'} ! Notre équipe au Maroc va vous contacter sur WhatsApp (${phone || 'votre numéro'}) pour valider votre accès 150 DH.`}
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-3 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-lg shadow-emerald-500/25 cursor-pointer active:scale-95"
                >
                  {isAr ? 'العودة للمنصة ومتابعة التعلم' : 'Retourner à la plateforme'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">
                      {isAr ? 'حسابات غير محدودة للأطفال' : 'Profils enfants illimités'}
                    </span>
                    <span className="text-slate-500">
                      {isAr ? 'كل إخوة العائلة في حساب واحد' : 'Pour tous les enfants de la famille'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">
                      {isAr ? '5 مجالات علمية متكاملة' : '5 Modules d’excellence'}
                    </span>
                    <span className="text-slate-500">
                      {isAr ? 'البرمجة، الذكاء الاصطناعي، المنطق، التصميم' : 'Code, IA, Logique, Pixel Art, Culture'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">
                      {isAr ? 'شهادات تخرج رسمية معتمدة' : 'Diplômes officiels HD'}
                    </span>
                    <span className="text-slate-500">
                      {isAr ? 'قابلة للتحميل والطباعة بجودة عالية' : 'Téléchargeables et imprimables avec sceau doré'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">
                      {isAr ? 'مساعد ذكي Coach IA متفاعل' : 'Coach IA interactif'}
                    </span>
                    <span className="text-slate-500">
                      {isAr ? 'مساعدة سريعة باللغتين العربية والفرنسية' : 'Aide socratique bilingue FR/AR'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods in Morocco */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  {isAr ? 'اختر طريقة الدفع المفضلة لديك في المغرب :' : 'Choisissez votre moyen de paiement au Maroc :'}
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('card')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedPayment === 'card'
                        ? 'bg-blue-50/80 border-blue-500 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                    <div className="font-black text-xs">Carte Bancaire</div>
                    <div className="text-[10px] text-slate-500">CMI Maroc</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('cash')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedPayment === 'cash'
                        ? 'bg-amber-50/80 border-amber-500 text-amber-900 ring-2 ring-amber-500/20 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                    <div className="font-black text-xs">Wafacash / Cash Plus</div>
                    <div className="text-[10px] text-slate-500">Paiement en agence</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('transfer')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedPayment === 'transfer'
                        ? 'bg-emerald-50/80 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                    <div className="font-black text-xs">Virement Bancaire</div>
                    <div className="text-[10px] text-slate-500">CIH, Attijari, BCP</div>
                  </button>
                </div>
              </div>

              {/* Quick Checkout Form */}
              <form onSubmit={handleOrder} className="space-y-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'اسم ولي الأمر *' : 'Nom du parent responsable *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder={isAr ? 'محمد الإدريسي' : 'ex. Mohamed El Amrani'}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'رقم الهاتف / واتساب *' : 'Numéro Téléphone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+212 6XX-XXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'المدينة في المغرب' : 'Ville au Maroc'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Casablanca">Casablanca / الدار البيضاء</option>
                    <option value="Rabat">Rabat / الرباط</option>
                    <option value="Marrakech">Marrakech / مراكش</option>
                    <option value="Tanger">Tanger / طنجة</option>
                    <option value="Agadir">Agadir / أكادير</option>
                    <option value="Fès">Fès / فاس</option>
                    <option value="Meknès">Meknès / مكناس</option>
                    <option value="Oujda">Oujda / وجدة</option>
                    <option value="Autre">Autre ville / مدينة أخرى</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black text-sm sm:text-base shadow-xl shadow-red-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    <span>
                      {isAr
                        ? 'تفعيل الولوج الكامل للعائلة (150 درهم)'
                        : 'Valider et Activer mon accès (150 DH)'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-2">
                    🔒 {isAr ? 'دفع آمن 100% • ضمان استرجاع الأموال لمدة 14 يوماً' : 'Paiement sécurisé CMI • Garantie satisfait ou remboursé 14 jours'}
                  </p>
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
