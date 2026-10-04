export type Language = 'fr' | 'ar';

export interface Translations {
  [key: string]: {
    fr: string;
    ar: string;
  };
}

export const translations: Translations = {
  // Brand & General
  'app.name': {
    fr: 'SMART KIDS LAB',
    ar: 'سمارت كيدز لاب'
  },
  'app.tagline': {
    fr: 'Apprendre · Créer · Explorer · Préparer demain',
    ar: 'نتعلم · نبتكر · نستكشف · نصنع المستقبل'
  },
  'app.subtagline': {
    fr: 'La plateforme d’éveil aux technologies pour les enfants de 6 à 15 ans',
    ar: 'المنصة التعليمية التفاعلية للأطفال من 6 إلى 15 سنة'
  },

  // Morocco Commercial Offer
  'morocco.badge': {
    fr: '🇲🇦 Offre Spéciale Maroc',
    ar: '🇲🇦 عرض خاص بالمغرب'
  },
  'morocco.price': {
    fr: '150 DH',
    ar: '150 د.م'
  },
  'morocco.oldPrice': {
    fr: '499 DH',
    ar: '499 د.م'
  },
  'morocco.discount': {
    fr: '-50% Offre de Lancement',
    ar: 'خصم 50% لفترة محدودة'
  },
  'morocco.bannerText': {
    fr: 'Profitez de l’accès complet à 150 DH au lieu de 499 DH pour vos enfants au Maroc !',
    ar: 'استفد من الولوج الكامل للمنصة بسعر 150 درهم فقط بدل 499 درهم لأطفالك في المغرب !'
  },
  'morocco.cta': {
    fr: 'Découvrir l’Offre Maroc (150 DH)',
    ar: 'اكتشف عرض المغرب (150 درهم)'
  },
  'morocco.orderNow': {
    fr: 'Activer mon accès à 150 DH',
    ar: 'تفعيل حسابي بـ 150 درهم'
  },

  // Navigation Parent
  'nav.parent': {
    fr: 'Parent',
    ar: 'ولي الأمر'
  },
  'nav.child': {
    fr: 'Enfant',
    ar: 'الطفل'
  },
  'nav.dashboard': {
    fr: 'Tableau de bord',
    ar: 'لوحة التحكم'
  },
  'nav.progression': {
    fr: 'Progression & Stats',
    ar: 'التقدم والإحصائيات'
  },
  'nav.parentTips': {
    fr: 'Conseils Parent',
    ar: 'نصائح الأولياء'
  },
  'nav.settings': {
    fr: 'Gestion Enfants & Réglages',
    ar: 'إدارة الأطفال والإعدادات'
  },

  // Navigation Child
  'nav.myAdventure': {
    fr: 'Mon Aventure',
    ar: 'مغامرتي'
  },
  'nav.logic': {
    fr: 'Logique Challenge',
    ar: 'تحدي المنطق'
  },
  'nav.code': {
    fr: 'Code Kids Studio',
    ar: 'ستوديو البرمجة'
  },
  'nav.ai': {
    fr: 'AI Explorer',
    ar: 'مستكشف الذكاء الاصطناعي'
  },
  'nav.creative': {
    fr: 'Creative Lab',
    ar: 'المختبر الإبداعي'
  },
  'nav.digital': {
    fr: 'Culture Numérique',
    ar: 'الثقافة الرقمية'
  },
  'nav.badges': {
    fr: 'Mes Badges',
    ar: 'أوسمتي'
  },
  'nav.profile': {
    fr: 'Mon Profil & Diplôme',
    ar: 'ملفي الشخصي والشهادة'
  },

  // Login Page
  'login.title': {
    fr: 'Espace Famille Sécurisé',
    ar: 'فضاء العائلة الآمن'
  },
  'login.subtitle': {
    fr: 'Connexion du parent responsable',
    ar: 'تسجيل دخول ولي الأمر'
  },
  'login.username': {
    fr: 'Identifiant',
    ar: 'اسم المستخدم'
  },
  'login.password': {
    fr: 'Mot de passe',
    ar: 'كلمة المرور'
  },
  'login.submit': {
    fr: 'Se connecter à l’espace',
    ar: 'دخول المنصة'
  },
  'login.submitting': {
    fr: 'Connexion en cours...',
    ar: 'جاري تسجيل الدخول...'
  },
  'login.demoToggle': {
    fr: 'Mode Démo / Identifiants de test',
    ar: 'معلومات الدخول للتجربة'
  },
  'login.demoNotice': {
    fr: 'Identifiant initial par défaut configuré :',
    ar: 'بيانات الدخول الافتراضية المجهزة مسبقاً :'
  },
  'login.fillAuto': {
    fr: 'Remplir automatiquement',
    ar: 'ملء تلقائي'
  },
  'login.secureBadge': {
    fr: '100% Sécurisé & Conforme',
    ar: 'آمن ومحمي 100%'
  },

  // Chatbot & Help
  'help.btn': {
    fr: 'Besoin d’aide ?',
    ar: 'هل تحتاج مساعدة ؟'
  },
  'help.title': {
    fr: 'Assistant Smart Kids Lab',
    ar: 'المساعد الذكي لمنصة سمارت كيدز'
  },
  'help.subtitle': {
    fr: 'Conseiller pédagogique & Support Maroc',
    ar: 'المستشار التربوي والدعم الفني بالمغرب'
  },
  'help.placeholder': {
    fr: 'Posez votre question (Français ou العربية)...',
    ar: 'اطرح سؤالك هنا (بالعربية أو بالفرنسية)...'
  },
  'help.send': {
    fr: 'Envoyer',
    ar: 'إرسال'
  },
  'help.quick1': {
    fr: '🇲🇦 Comment payer 150 DH au Maroc ?',
    ar: '🇲🇦 كيف يمكنني دفع 150 درهم بالمغرب ؟'
  },
  'help.quick2': {
    fr: '🚀 Quelles activités pour mon enfant ?',
    ar: '🚀 ما هي الأنشطة المناسبة لطفلي ؟'
  },
  'help.quick3': {
    fr: '🏆 Comment obtenir le diplôme certifié ?',
    ar: '🏆 كيف يحصل طفلي على شهادة التقدير ؟'
  },
  'help.quick4': {
    fr: '🔒 Comment changer le mot de passe parent ?',
    ar: '🔒 كيف أغير كلمة سر ولي الأمر ؟'
  }
};

export function getTranslation(key: string, lang: Language): string {
  if (translations[key] && translations[key][lang]) {
    return translations[key][lang];
  }
  return translations[key]?.fr || key;
}
