import { GoogleGenAI } from '@google/genai';
import type { AICoachRequest, AICoachResponse } from '../../shared/types.ts';

const SYSTEM_PROMPT = `Tu es Smart Kids Coach & Conseiller SMART KIDS LAB, l'assistant d'aide officiel et bienveillant de la plateforme éducative SMART KIDS LAB.
Tu aides à la fois les enfants (de 6 à 15 ans) pour leurs apprentissages et les parents pour l'utilisation de la plateforme.

Spécificités et Offre Spéciale Maroc :
- Au Maroc, l'accès complet à la plateforme est proposé au tarif de 150 DH (Dirhams marocains) au lieu de 499 DH (-50% offre de lancement).
- L'offre 150 DH inclut : profils illimités pour tous les enfants de la famille, accès aux 5 modules (Logique, Code Kids, AI Explorer, Creative Lab, Culture Numérique), plus de 100 activités, diplômes officiels téléchargeables et imprimables avec sceau d'excellence, et suivi parental analytique.
- Modes de règlement au Maroc : Carte bancaire marocaine (CMI, Visa, Mastercard), Wafacash, Cash Plus, Barid Bank, et Virement bancaire marocain (CIH, Attijariwafa, BMCE, BCP).
- Support client Maroc disponible 7j/7.

Règles pédagogiques pour les enfants :
1. Si l'enfant répond à une question que tu lui as posée (par exemple s'il répond "addition" suite à ta question "est-ce une addition ou une multiplication ?") :
   - FÉLICITE-LE IMMÉDIATEMENT : confirme que sa réponse est bonne !
   - Enchaîne directement avec l'étape suivante (ex: "Bravo ! C'est bien une addition. Maintenant, regarde de 2 à 4 : combien ajoute-t-on exactement ?").
   - Ne répète JAMAIS la même question s'il vient d'y répondre !
2. Ne donne JAMAIS la solution finale brute d'un coup, mais guide-le pas à pas (méthode socratique).
3. Si un parent ou un utilisateur pose une question d'aide générale (fonctionnement, paiement 150 DH, diplômes, changement de mot de passe, navigation) : réponds de manière claire, chaleureuse, précise et rassurante.
4. Si la question est posée en arabe (العربية ou الدارجة المغربية), réponds impérativement en arabe clair et chaleureux avec des émojis adaptés.
5. Reste toujours positif, encourageant et concis (3 à 4 phrases maximum).`;

export async function askAICoach(req: AICoachRequest): Promise<AICoachResponse> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

  // Check if query is in Arabic
  const rawInput = `${req.childMessage || ''} ${req.currentQuestion || ''}`;
  const isArabic = /[\u0600-\u06FF]/.test(rawInput);

  if (!apiKey || apiKey.trim() === '') {
    return generateFallbackCoachResponse(req, isArabic);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const historySection = req.chatHistory && req.chatHistory.length > 0
      ? `\nHistorique récent de l'échange :\n${req.chatHistory.slice(-4).map(h => `${h.role === 'model' ? 'Toi (Coach)' : 'Enfant'} : "${h.text}"`).join('\n')}\n`
      : '';

    const userPrompt = `
Contexte utilisateur :
- Rôle / Public : ${req.childAge ? `Enfant (${req.childAge} ans)` : 'Parent / Utilisateur'}
- Activité ou Module : "${req.activityTitle || 'Support Général'}" (Catégorie : ${req.activityCategory || 'general'})
- Description du contexte : ${req.activityDescription || 'Assistance générale sur Smart Kids Lab'}
- Défi ou sujet : ${req.currentQuestion || 'Question en cours'}
${req.userAnswer ? `- Réponse / tentative : "${req.userAnswer}"` : ''}
${req.errorContext ? `- Contexte d'erreur : "${req.errorContext}"` : ''}
${historySection}
- Dernier message de l'enfant/utilisateur : "${req.childMessage || 'Bonjour, peux-tu m’aider ?'}"
- Nombre d'échanges précédents : ${req.previousAttempts || 0}
- Langue demandée : ${isArabic ? 'Arabe (العربية)' : 'Français'}

Réponds avec bienveillance, enthousiasme et précision. Prends bien en compte sa dernière réponse pour avancer et ne pas répéter la question précédente.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7
      }
    });

    const replyText = response.text || (isArabic
      ? 'مرحباً بك في سمارت كيدز لاب ! نحن هنا لمساعدتك في كل خطوة.'
      : 'Bonjour et bienvenue sur Smart Kids Lab ! Je suis à tes côtés pour t’accompagner.');

    return {
      message: replyText.trim(),
      hintLevel: (req.previousAttempts || 0) + 1,
      encouragement: isArabic ? 'أنت رائع، واصل التعلم والاستكشاف ! 🌟' : getEncouragementPhrase(req.childAge || 9)
    };
  } catch (error) {
    console.warn('Appel Gemini non disponible ou erreur, utilisation du mode intelligent:', error);
    return generateFallbackCoachResponse(req, isArabic);
  }
}

function getEncouragementPhrase(age: number): string {
  const phrases = [
    'Tu es sur la bonne voie ! 🚀',
    'Chaque curiosité fait grandir tes neurones ! 🧠',
    'Prends ton temps, tu as toutes les capacités pour réussir ! ⭐',
    'La persévérance est le super-pouvoir des grands inventeurs ! 💡'
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

function generateFallbackCoachResponse(req: AICoachRequest, isArabic: boolean): AICoachResponse {
  const age = req.childAge || 9;
  const rawMsg = (req.childMessage || '').trim().toLowerCase();

  // 1. Morocco 150 DH specific queries
  if (rawMsg.includes('150') || rawMsg.includes('maroc') || rawMsg.includes('prix') || rawMsg.includes('payer') || rawMsg.includes('achat') || rawMsg.includes('شراء') || rawMsg.includes('المغرب') || rawMsg.includes('درهم')) {
    if (isArabic) {
      return {
        message: `🇲🇦 مرحباً بك ! عرض المغرب الخاص متاح بسعر 150 درهم فقط بدل 499 درهم (خصم 50%).
يشمل العرض :
• حسابات غير محدودة لكل أطفال العائلة.
• ولوج كامل للمواد الخمس (البرمجة، الذكاء الاصطناعي، المنطق، الإبداع الرقمي).
• شهادات تقدير رسمية معتمدة قابلة للتحميل والطباعة بجودة HD.
طرق الدفع في المغرب : البطاقة البنكية (CMI)، وفاكاش (Wafacash)، كاش بلوس (Cash Plus)، أو تحويل بنكي مغربي (CIH / التجاري وفا بنك / بريد بنك).`,
        hintLevel: 1,
        encouragement: 'عرض مميز للعائلات المغربية ! 🇲🇦'
      };
    }
    return {
      message: `🇲🇦 L'offre spéciale pour le Maroc est à 150 DH seulement au lieu de 499 DH (-50% offre de lancement) !
Elle donne un accès illimité à toute la plateforme pour tous vos enfants :
• Les 5 modules complets : Logique, Code Kids, AI Explorer, Creative Lab et Culture Numérique.
• Diplômes officiels haute définition téléchargeables et imprimables avec sceau royal.
• Modes de paiement disponibles au Maroc : Carte bancaire marocaine (CMI), Wafacash, Cash Plus, et Virement bancaire (CIH, Attijariwafa, BCP).`,
      hintLevel: 1,
      encouragement: 'Préparez l’avenir numérique de vos enfants au Maroc dès aujourd’hui ! 🌟'
    };
  }

  // 2. Arabic Responses
  if (isArabic) {
    if (rawMsg.includes('جمع') || rawMsg.includes('زائد') || rawMsg.includes('اضافة')) {
      return {
        message: `أحسنت يا بطل ! 👏 الجمع هو المفتاح الصحيح تماماً !
الآن انظر كم نضيف بين كل عدد والعدد الذي يليه :
من 2 إلى 4، ثم من 4 إلى 6... كم نضيف في كل خطوة ؟ 🦘✨`,
        hintLevel: 2,
        encouragement: 'أنت ذكي جداً، اقتربت من الحل ! 🌟'
      };
    }
    return {
      message: `أهلاً بك يا بطل في سمارت كيدز لاب ! 👋
أنا مدربك الذكي لمرافقتك في رحلة التعلم الممتعة.
تذكر دائماً : كل تحدٍ هو فرصة لتطوير مهاراتك والتفكير خطوة بخطوة ! ما رأيك أن تتأمل نمط الأعداد بهدوء ؟ 🔍`,
      hintLevel: 1,
      encouragement: 'أنت قادر على ابتكار أشياء مذهلة ! 🚀'
    };
  }

  // 3. Dynamic Pedagogical Responses to specific child answers
  // If child answered "addition" / "ajoute" / "+"
  if (rawMsg.includes('addition') || rawMsg.includes('ajoute') || rawMsg.includes('+') || rawMsg.includes('plus')) {
    return {
      message: `Bravo champion ! 👏 C'est exactement ça : c'est bien une **addition** !
Regarde maintenant attentivement :
- De 2 à 4, combien a-t-on ajouté ? (+...)
- De 4 à 6, combien a-t-on ajouté ? (+...)
Quel est ce nombre magique qu'on ajoute à chaque saut ? 🦘✨`,
      hintLevel: 2,
      encouragement: 'Excellente déduction ! Tu as trouvé la règle ! 🧠',
      suggestedAction: 'Regarde le saut entre chaque nombre pour trouver le manquant.'
    };
  }

  // If child answered "multiplication" / "fois" / "*"
  if (rawMsg.includes('multipli') || rawMsg.includes('fois') || rawMsg.includes('*')) {
    return {
      message: `Bonne idée d'y penser ! 💡 Mais observe bien : si c'était une multiplication, les nombres grandiraient beaucoup plus vite (ex: 2 × 2 = 4, mais 4 × 2 = 8, alors qu'ici on a 6).
C'est donc un petit pas régulier qu'on additionne à chaque fois. Combien ajoute-t-on pour passer de 2 à 4 ? 🔍`,
      hintLevel: 2,
      encouragement: 'Très bon esprit d’analyse ! Continue ! 🌟'
    };
  }

  // If child answered "2"
  if (rawMsg === '2' || rawMsg.includes('deux') || rawMsg.includes('+2') || rawMsg.includes('ajoute 2')) {
    return {
      message: `Exactement, tu as trouvé le secret ! 🎉 On ajoute **+2** à chaque étape (2, 4, 6, 8, 10...) !
Maintenant, regarde où se trouve le point d'interrogation sur ta grille et ajoute 2 au nombre précédent pour choisir la bonne réponse ! 🚀`,
      hintLevel: 3,
      encouragement: 'Tu as résolu l’énigme comme un vrai mathématicien ! ⭐'
    };
  }

  // Category specific fallbacks
  let hint = 'Observe bien ce qui se répète ou change entre chaque étape.';
  if (req.activityCategory === 'logic') {
    hint = age <= 8
      ? 'Fais le calcul pas à pas dans ta tête : regarde de combien le premier nombre a grandi pour devenir le second ! 🔍'
      : 'Calcule l’écart entre les termes consécutifs. Est-ce une addition constante, une multiplication ou une alternance ? 🧠';
  } else if (req.activityCategory === 'code') {
    hint = age <= 8
      ? 'Tu peux utiliser les blocs directs « Monter » ou « Descendre » pour te diriger facilement vers les étoiles ! 🤖'
      : 'Pense à la direction actuelle du robot avant de faire avancer. Une rotation change la direction sans changer la case ! 💻';
  } else if (req.activityCategory === 'ai') {
    hint = 'Une IA regarde les détails répétés (les motifs). Quels indices te permettent à toi d’être certain du résultat ? 🤖';
  } else if (req.activityCategory === 'digital') {
    hint = 'Pense à la sécurité et à ce qui protège le mieux tes données dans ce cas précis ! 🛡️';
  }

  return {
    message: hint,
    hintLevel: (req.previousAttempts || 0) + 1,
    encouragement: getEncouragementPhrase(age),
    suggestedAction: 'Regarde à nouveau la consigne et teste ton hypothèse !'
  };
}
