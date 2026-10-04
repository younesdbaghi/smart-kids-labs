import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { sound } from '../utils/sound.ts';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Printer,
  Pencil,
  Check,
  Download,
  Loader2,
  Eye,
  Share2,
  X,
  ShieldCheck,
  Star,
  Layers,
  Crown,
  Maximize2
} from 'lucide-react';
import { Logo } from '../components/Logo.tsx';
import { downloadCertificateImage, printCertificateDirectly } from '../utils/certificateGenerator.ts';

export const ProfilePage: React.FC = () => {
  const { selectedChild, selectedChildProgress, updateChild, language } = useApp();
  const [avatar, setAvatar] = useState(selectedChild?.avatar || '🤖');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(selectedChild?.name || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);
  const [certNotice, setCertNotice] = useState('');

  // Certificate Customization State (Themes & Language)
  const [certTheme, setCertTheme] = useState<'gold' | 'morocco' | 'cyber'>('morocco');
  const [certLang, setCertLang] = useState<'fr' | 'ar'>(language === 'ar' ? 'ar' : 'fr');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCopiedShare, setIsCopiedShare] = useState(false);

  const avatars = ['🤖', '🚀', '🧠', '🐱', '🦊', '🦁', '🐼', '👾', '🦄', '🧑‍🚀', '🦖', '⚡'];
  const isAr = certLang === 'ar';

  const handleUpdateAvatar = async (newAvatar: string) => {
    if (!selectedChild) return;
    sound.playPop();
    setAvatar(newAvatar);
    setIsUpdating(true);
    try {
      await updateChild(selectedChild.id, { avatar: newAvatar });
      sound.playSuccess();
      setSuccessMsg(language === 'ar' ? 'تم تحديث الصورة الرمزية بنجاح !' : 'Avatar mis à jour avec succès !');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveName = async () => {
    if (!selectedChild || !nameInput.trim()) return;
    setIsUpdating(true);
    try {
      sound.playSuccess();
      await updateChild(selectedChild.id, { name: nameInput.trim() });
      setIsEditingName(false);
      setSuccessMsg(language === 'ar' ? 'تم حفظ الاسم بنجاح !' : 'Prénom mis à jour avec succès !');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const currentRank = selectedChildProgress?.rank || { name: 'Explorateur', icon: '🔎' };

  const handleDownloadCertificate = async () => {
    if (!selectedChild || isGeneratingCert) return;
    setIsGeneratingCert(true);
    sound.playLevelUp();
    try {
      await downloadCertificateImage({
        childName: selectedChild.name,
        level: selectedChild.level,
        xp: selectedChild.xp,
        rankName: currentRank.name,
        rankIcon: currentRank.icon,
        avatar: selectedChild.avatar,
        theme: certTheme,
        lang: certLang
      });
      setCertNotice(
        isAr
          ? `تم تحميل شهادة ${selectedChild.name} بجودة عالية HD بنجاح ! 🎉`
          : `Diplôme officiel HD de ${selectedChild.name} téléchargé avec succès ! 🎉`
      );
      setTimeout(() => setCertNotice(''), 5000);
    } catch (err) {
      console.error(err);
      setCertNotice('Une erreur est survenue lors de la génération du diplôme.');
    } finally {
      setIsGeneratingCert(false);
    }
  };

  const handlePrintCertificate = async () => {
    if (!selectedChild || isGeneratingCert) return;
    setIsGeneratingCert(true);
    sound.playLevelUp();
    try {
      const printed = await printCertificateDirectly({
        childName: selectedChild.name,
        level: selectedChild.level,
        xp: selectedChild.xp,
        rankName: currentRank.name,
        rankIcon: currentRank.icon,
        avatar: selectedChild.avatar,
        theme: certTheme,
        lang: certLang
      });
      if (!printed) {
        setCertNotice(
          isAr
            ? `تم تحميل شهادة ${selectedChild.name} كصورة عالية الدقة ! 📥`
            : `Le diplôme de ${selectedChild.name} a été téléchargé en Image HD pour l’impression ! 📥`
        );
      } else {
        setCertNotice(
          isAr
            ? `تم فتح نافذة الطباعة الرسمية لشهادة ${selectedChild.name} ! 🖨️`
            : `Fenêtre d’impression ouverte pour le diplôme de ${selectedChild.name} ! 🖨️`
        );
      }
      setTimeout(() => setCertNotice(''), 6000);
    } catch (err) {
      console.error(err);
      await handleDownloadCertificate();
    } finally {
      setIsGeneratingCert(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!selectedChild) return;
    sound.playPop();
    const shareText = isAr
      ? `🎉 ما شاء الله ! تفوق ${selectedChild.name} وحصل على "شهادة التميز الرقمي" (المستوى ${selectedChild.level} - ${selectedChild.xp} XP) على منصة Smart Kids Lab ! 🇲🇦🏆`
      : `🎉 Félicitations à ${selectedChild.name} qui vient d’obtenir son Diplôme Officiel d'Explorateur du Numérique (Niveau ${selectedChild.level} - ${selectedChild.xp} XP) sur Smart Kids Lab ! 🇲🇦🏆`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    setIsCopiedShare(true);
    setTimeout(() => setIsCopiedShare(false), 4000);
  };

  if (!selectedChild) return null;

  const certNumber = `SKL-${certTheme === 'morocco' ? 'MA-' : ''}${Math.abs(selectedChild.name.split('').reduce((a, b) => a + b.charCodeAt(0), 1000) * 89)}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-in fade-in">
      
      {/* Profile Card Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-5xl shadow-xl shadow-blue-500/20 border-4 border-white transform hover:rotate-6 transition-transform">
            {avatar}
          </div>
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs border-2 border-white shadow-xs">
            Niv. {selectedChild.level}
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1 w-full">
          <div className="text-xs font-black uppercase text-blue-600 tracking-wider">
            {language === 'ar' ? 'الملف الشخصي للمتعلم' : 'Fiche Apprenant'}
          </div>

          {/* Name & Inline Edit */}
          {isEditingName ? (
            <div className="flex items-center gap-2 max-w-xs mx-auto sm:mx-0 pt-1">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-blue-400 text-lg font-black text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-full"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                disabled={isUpdating}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                title="Sauvegarder"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsEditingName(false)}
                className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                title="Annuler"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {selectedChild.name}
              </h1>
              <button
                onClick={() => {
                  setNameInput(selectedChild.name);
                  setIsEditingName(true);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                title="Modifier le prénom"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <p className="text-xs text-slate-500 font-medium">
            {selectedChild.age} ans • {language === 'ar' ? 'مغامر نشط في' : 'Apprenti explorateur dans'} Smart Kids Lab
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-3">
          <div className="text-center px-4 py-3 bg-amber-50 rounded-2xl border border-amber-200/80">
            <div className="text-xl font-black text-amber-700">{selectedChild.level}</div>
            <div className="text-[10px] font-bold text-amber-600 uppercase">Niveau</div>
          </div>
          <div className="text-center px-4 py-3 bg-blue-50 rounded-2xl border border-blue-200/80">
            <div className="text-xl font-black text-blue-700">{selectedChild.xp}</div>
            <div className="text-[10px] font-bold text-blue-600 uppercase">Points XP</div>
          </div>
        </div>
      </div>

      {/* Avatar Customization */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
            {language === 'ar' ? 'تخصيص الصورة الرمزية (Avatar)' : 'Personnaliser mon Avatar'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar' ? 'اختر شخصيتك المفضلة التي ستظهر على شهادتك' : 'Choisis ton personnage favori qui apparaîtra sur ton diplôme'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {avatars.map((av) => (
            <button
              key={av}
              onClick={() => handleUpdateAvatar(av)}
              disabled={isUpdating}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-2xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                avatar === av
                  ? 'bg-blue-50 border-blue-600 scale-110 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:scale-105'
              }`}
            >
              {av}
            </button>
          ))}
        </div>

        {successMsg && (
          <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 🏆 EXTRA JOLIE SECTION : DIPLÔME OFFICIEL & CERTIFICATION   */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-6">
        
        {/* Certificate Studio Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  {language === 'ar' ? 'استوديو الشهادات الرسمية الفاخرة' : 'Studio du Diplôme Officiel'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase">
                  HD 1600x1130
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'شهادة رقمية فاخرة معتمدة قابلة للطباعة والتأطير والتحميل بجودة عالية'
                  : 'Diplôme haute résolution certifié avec sceau royal, prêt à imprimer et encadrer'}
              </p>
            </div>
          </div>

          {/* Theme & Language Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Theme Pills */}
            <div className="p-1 bg-slate-100 rounded-2xl flex items-center gap-1 text-xs font-black">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setCertTheme('morocco');
                }}
                className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                  certTheme === 'morocco'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇲🇦</span>
                <span>Maroc</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setCertTheme('gold');
                }}
                className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                  certTheme === 'gold'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>👑</span>
                <span>Or Impérial</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setCertTheme('cyber');
                }}
                className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                  certTheme === 'cyber'
                    ? 'bg-slate-900 text-cyan-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>⚡</span>
                <span>Cyber</span>
              </button>
            </div>

            {/* Diploma Language Isolated Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/90 text-xs font-black">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setCertLang('fr');
                }}
                className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  certLang === 'fr'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇫🇷</span>
                <span>Français</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setCertLang('ar');
                }}
                className={`py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  certLang === 'ar'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇲🇦</span>
                <span>العربية</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 📜 REALISTIC LUXURY DIPLOMA CANVAS MOCKUP (PARCHMENT LOOK)   */}
        {/* ============================================================ */}
        <div className="relative group">
          
          {/* Outer glowing ambient frame */}
          <div
            dir={isAr ? 'rtl' : 'ltr'}
            className={`relative rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-2xl overflow-hidden border-4 ${
              certTheme === 'morocco'
                ? 'bg-gradient-to-br from-[#fefdfc] via-[#f7faf8] to-[#f0fdf4] border-red-700/80 shadow-emerald-950/15'
                : certTheme === 'cyber'
                ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-cyan-400 shadow-cyan-500/20 text-white'
                : 'bg-gradient-to-br from-[#fefefa] via-[#fdfbf6] to-[#fbf7ed] border-amber-500 shadow-amber-900/15'
            }`}
          >
            {/* Subtle ornate watermark emblem in center background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none text-9xl">
              {certTheme === 'morocco' ? '🇲🇦' : '🏆'}
            </div>

            {/* Inner Golden Guilloche Border */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border-2 transition-all relative ${
                certTheme === 'morocco'
                  ? 'border-emerald-600/70 bg-white/70'
                  : certTheme === 'cyber'
                  ? 'border-blue-500/50 bg-slate-900/60'
                  : 'border-amber-400/80 bg-white/75'
              }`}
            >
              {/* Corner Star Embellishments */}
              <span className="absolute top-2 left-2 text-amber-500 text-sm font-bold">★</span>
              <span className="absolute top-2 right-2 text-amber-500 text-sm font-bold">★</span>
              <span className="absolute bottom-2 left-2 text-amber-500 text-sm font-bold">★</span>
              <span className="absolute bottom-2 right-2 text-amber-500 text-sm font-bold">★</span>

              {/* Certificate Header */}
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-1">
                  <Logo size="md" />
                </div>
                
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase shadow-xs border bg-amber-100/90 text-amber-900 border-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-current" />
                  <span>
                    {isAr
                      ? '★ شـهـادة الـتـفـوق والـتـمـيـز الـرسـمـيـة ★'
                      : '★ CERTIFICAT D’APTITUDE & D’HONNEUR NUMÉRIQUE ★'}
                  </span>
                </div>

                <h3
                  className={`text-2xl sm:text-4xl font-black font-heading tracking-tight mt-2 ${
                    certTheme === 'morocco'
                      ? 'text-emerald-900'
                      : certTheme === 'cyber'
                      ? 'text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]'
                      : 'text-blue-950'
                  }`}
                >
                  {isAr ? 'شـهـادة الـتـخـرج والابـتـكـار' : 'DIPLÔME DE L’EXPLORATEUR'}
                </h3>

                <p
                  className={`text-xs sm:text-sm font-medium italic ${
                    certTheme === 'cyber' ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {isAr
                    ? 'يُمنح هذا الدبلوم الشرفي الرسمي بكل فخر واعتزاز إلى المبدع(ة) :'
                    : 'Ce diplôme officiel est décerné avec toutes les félicitations à :'}
                </p>
              </div>

              {/* Child Hero Recipient Block */}
              <div className="my-6 text-center space-y-2">
                <div className="inline-flex items-center justify-center gap-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-white flex items-center justify-center text-3xl shadow-md border-2 border-white">
                    {avatar}
                  </div>
                  <div className="text-left">
                    <div
                      className={`text-3xl sm:text-5xl font-black tracking-tight font-heading ${
                        certTheme === 'cyber' ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {selectedChild.name}
                    </div>
                    {/* Golden Underline Accent */}
                    <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-full w-3/4 mt-1" />
                  </div>
                </div>

                <p
                  className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed pt-2 ${
                    certTheme === 'cyber' ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {isAr
                    ? 'تقديراً لاجتيازه بنجاح وتفوق باهر كافة التحديات العلمية في التفكير المنطقي، والبرمجة الخوارزمية، ومبادئ الذكاء الاصطناعي والإبداع الرقمي المستقبلي.'
                    : 'Pour avoir accompli avec succès et curiosité les épreuves d’initiation aux sciences de la Logique, des Algorithmes, de la Programmation, de l’Intelligence Artificielle et de la Créativité Numérique.'}
                </p>
              </div>

              {/* Stats & Honors Cards */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg mx-auto my-5 text-center">
                <div
                  className={`p-3 rounded-2xl border ${
                    certTheme === 'cyber'
                      ? 'bg-slate-800/80 border-cyan-500/40'
                      : 'bg-blue-50/80 border-blue-200'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isAr ? 'المستوى' : 'Niveau'}
                  </div>
                  <div className="text-base sm:text-xl font-black text-blue-600 mt-0.5">
                    Niv. {selectedChild.level}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-2xl border ${
                    certTheme === 'cyber'
                      ? 'bg-slate-800/80 border-amber-500/40'
                      : 'bg-amber-50/80 border-amber-200'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isAr ? 'الرتبة الشرفية' : 'Rang'}
                  </div>
                  <div className="text-base sm:text-xl font-black text-amber-600 mt-0.5 truncate">
                    {currentRank.icon} {currentRank.name}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-2xl border ${
                    certTheme === 'cyber'
                      ? 'bg-slate-800/80 border-emerald-500/40'
                      : 'bg-emerald-50/80 border-emerald-200'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isAr ? 'النقاط' : 'XP Validés'}
                  </div>
                  <div className="text-base sm:text-xl font-black text-emerald-600 mt-0.5">
                    {selectedChild.xp} XP
                  </div>
                </div>
              </div>

              {/* Seal and Signatures Footer */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs max-w-xl mx-auto">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {isAr ? 'رقم التحقق المعتمد' : 'Numéro de Certification'}
                  </div>
                  <div className="font-mono font-bold text-slate-700 text-xs">
                    {certNumber}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{isAr ? 'موثق ومسجل رسمياً' : 'Authentifié & Vérifié'}</span>
                  </div>
                </div>

                {/* 3D Wax Seal with ribbon */}
                <div className="relative group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-xl shadow-amber-500/30 flex items-center justify-center transform group-hover:scale-105 transition-transform border-2 border-white">
                    <div className="w-full h-full rounded-full border border-amber-600/40 flex flex-col items-center justify-center text-center bg-amber-100">
                      <span className="text-xl sm:text-2xl leading-none">
                        {certTheme === 'morocco' ? '🇲🇦' : '🏆'}
                      </span>
                      <span className="text-[8px] font-black text-amber-900 uppercase mt-0.5 leading-tight">
                        {isAr ? 'التميز' : 'OFFICIEL'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {isAr ? 'الإدارة البيداغوجية' : 'Direction Académique'}
                  </div>
                  <div className="font-heading font-black text-slate-800 text-xs">
                    Smart Kids Lab
                  </div>
                  <div className="font-serif italic text-[11px] text-blue-600">
                    Visa Officiel 2026
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Hover Zoom Action Pill */}
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setIsPreviewOpen(true);
            }}
            className="absolute top-4 right-4 py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-extrabold text-xs shadow-md backdrop-blur-md flex items-center gap-1.5 cursor-pointer opacity-80 hover:opacity-100 transition-all hover:scale-105"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'معاينة كاملة' : 'Aperçu Plein Écran'}</span>
          </button>
        </div>

        {/* Feedback Message */}
        {certNotice && (
          <div className="p-3.5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{certNotice}</span>
          </div>
        )}

        {/* Action Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          
          {/* Primary: Download HD PNG */}
          <button
            type="button"
            onClick={handleDownloadCertificate}
            disabled={isGeneratingCert}
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isGeneratingCert ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isAr ? 'جاري تجهيز الشهادة...' : 'Génération en cours...'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الشهادة فائقة الجودة (HD PNG)' : 'Télécharger le Diplôme HD (1600x1130)'}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Secondary: Print A4 */}
            <button
              type="button"
              onClick={handlePrintCertificate}
              disabled={isGeneratingCert}
              className="flex-1 sm:flex-initial py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-extrabold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>{isAr ? 'طباعة مباشرة' : 'Imprimer Format A4'}</span>
            </button>

            {/* Share WhatsApp */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="py-3.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-extrabold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              title="Partager sur WhatsApp"
            >
              <Share2 className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{isCopiedShare ? 'Lien prêt !' : 'Partager'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 🔍 FULLSCREEN ZOOM PREVIEW MODAL                             */}
      {/* ============================================================ */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-amber-400 p-6 sm:p-8 space-y-4 my-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-800">
                <Award className="w-5 h-5 text-amber-500" />
                <span>{isAr ? 'معاينة الشهادة الرسمية بدقة عالية' : 'Aperçu Officiel Haute Résolution'}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Mockup Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50 border-4 border-amber-300 text-center space-y-4 shadow-inner">
              <Logo size="md" />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {isAr ? 'شـهـادة الـتـخـرج والابـتـكـار' : 'DIPLÔME DE L’EXPLORATEUR'}
              </h3>
              <p className="text-base sm:text-xl font-black text-blue-900">
                {selectedChild.name}
              </p>
              <div className="py-2 inline-flex items-center gap-4 text-xs font-bold text-slate-600 bg-white px-4 rounded-xl border border-amber-200">
                <span>Niveau {selectedChild.level}</span>
                <span>•</span>
                <span>{currentRank.icon} {currentRank.name}</span>
                <span>•</span>
                <span>{selectedChild.xp} XP</span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {certNumber} · Smart Kids Lab Académie 2026
              </p>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsPreviewOpen(false);
                  handleDownloadCertificate();
                }}
                className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل الآن' : 'Télécharger'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Fermer'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
