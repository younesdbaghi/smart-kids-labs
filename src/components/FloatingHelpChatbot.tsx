import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { sound } from '../utils/sound.ts';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Loader2,
  HelpCircle,
  MessageCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'coach' | 'user';
  text: string;
  timestamp: Date;
}

export const FloatingHelpChatbot: React.FC = () => {
  const { isHelpChatbotOpen, setIsHelpChatbotOpen, language, setLanguage, selectedChild, setIsMoroccoModalOpen } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAr = language === 'ar';

  // Initial welcome message according to language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'coach',
          text: isAr
            ? `مرحباً بك في المساعد الذكي لسمارت كيدز لاب ! 👋🇲🇦\nأنا هنا لمساعدتك : سواء للاستفسار عن عرض المغرب (150 درهم)، أو لمعرفة تفاصيل الأنشطة وطرق التعلم، أو لأي مساعدة تقنية.\nكيف يمكنني مساعدتك اليوم ؟`
            : `Bonjour et bienvenue sur l’Assistant Smart Kids Lab ! 👋🇲🇦\nJe suis là pour vous aider : que ce soit pour l'Offre Spéciale Maroc à 150 DH, le fonctionnement des 5 modules (Code, IA, Logique...), les diplômes officiels ou le suivi parental.\nComment puis-je vous aider aujourd'hui ?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [isAr]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isHelpChatbotOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isHelpChatbotOpen, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

    sound.playPop();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await api.askCoach({
        childAge: selectedChild?.age || 9,
        activityTitle: 'Support Général & Offre Maroc 150 DH',
        activityCategory: 'general',
        activityDescription: 'Assistance générale sur Smart Kids Lab et l’offre Maroc 150 DH',
        childMessage: textToSend,
        previousAttempts: messages.length,
        chatHistory: messages.slice(-6).map(m => ({
          role: m.sender === 'coach' ? 'model' : 'user',
          text: m.text
        }))
      });

      const coachMsg: ChatMessage = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        text: response.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, coachMsg]);
      sound.playSuccess();
    } catch (err) {
      console.warn('Erreur chatbot, mode sécurisé:', err);
      // Fallback
      let fallbackText = isAr
        ? '🇲🇦 عرض المغرب متاح بـ 150 درهم فقط بدل 499 درهم. يمكنك الدفع بالبطاقة البنكية (CMI)، وفاكاش، أو التحويل البنكي.'
        : '🇲🇦 L’offre spéciale Maroc est disponible à 150 DH au lieu de 499 DH. Vous pouvez régler par Carte bancaire (CMI), Wafacash ou Virement bancaire.';

      if (textToSend.toLowerCase().includes('diplome') || textToSend.toLowerCase().includes('certificat') || textToSend.includes('شهادة')) {
        fallbackText = isAr
          ? '🏆 يحصل الطفل على شهادة تقدير رقمية رسمية عالية الجودة فور إتمام الأنشطة، ويمكنك تحميلها وطباعتها مباشرة من صفحة الملف الشخصي !'
          : '🏆 Votre enfant peut obtenir et télécharger son diplôme officiel haute définition directement depuis son profil dès qu’il accomplit des défis !';
      }

      setMessages(prev => [
        ...prev,
        {
          id: `coach-fallback-${Date.now()}`,
          sender: 'coach',
          text: fallbackText,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickChips = [
    {
      fr: '🇲🇦 Offre 150 DH Maroc & Paiement',
      ar: '🇲🇦 عرض 150 درهم بالمغرب وطرق الدفع',
      action: () => {
        setIsMoroccoModalOpen(true);
        handleSendMessage(isAr ? 'كيف استفيد من عرض المغرب بـ 150 درهم ؟' : 'Comment profiter de l’offre Maroc à 150 DH ?');
      }
    },
    {
      fr: '🚀 Guide des 5 modules (Code, IA...)',
      ar: '🚀 شرح المواد (البرمجة، الذكاء الاصطناعي...)',
      action: () => handleSendMessage(isAr ? 'اشرح لي المواد المتوفرة في المنصة' : 'Peux-tu m’expliquer les 5 modules de la plateforme ?')
    },
    {
      fr: '🏆 Diplômes & Certifications',
      ar: '🏆 كيف أحصل على شهادة التقدير ؟',
      action: () => handleSendMessage(isAr ? 'كيف يتم تحميل وطباعة شهادة التقدير ؟' : 'Comment télécharger et imprimer le diplôme de mon enfant ?')
    },
    {
      fr: '🔐 Changer le mot de passe parent',
      ar: '🔐 تغيير كلمة سر ولي الأمر',
      action: () => handleSendMessage(isAr ? 'كيف يمكنني تغيير كلمة المرور ؟' : 'Comment puis-je modifier mon mot de passe parent ?')
    }
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setIsHelpChatbotOpen(!isHelpChatbotOpen);
          }}
          aria-label="Ouvrir le Chatbot d'aide"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white font-black text-xs shadow-xl shadow-cyan-600/30 hover:shadow-cyan-600/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/40"
        >
          {/* Animated pulsing orb */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
          </span>

          <Bot className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-heading">
            {isAr ? 'المساعد الذكي 🇲🇦' : 'Aide & Support 🇲🇦'}
          </span>
        </button>
      </div>

      {/* Chatbot Window Modal */}
      {isHelpChatbotOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border-2 border-cyan-400 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-800 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner border border-white/25">
                🤖
              </div>
              <div>
                <div className="font-extrabold text-sm flex items-center gap-1.5 font-heading">
                  Smart Kids Assistant
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full uppercase">
                    IA 🇲🇦
                  </span>
                </div>
                <div className="text-[11px] text-cyan-100">
                  {isAr ? 'المساعد التربوي والدعم الفني 7j/7' : 'Conseiller pédagogique & Support Maroc'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language switcher inside chatbot */}
              

              <button
                type="button"
                onClick={() => setIsHelpChatbotOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Message stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/70 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'coach' && (
                  <div className="w-7 h-7 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-xs shrink-0 shadow-xs">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-xs font-medium'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center text-slate-500 text-xs italic">
                <div className="w-7 h-7 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-xs shrink-0">
                  🤖
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-600" />
                  <span>{isAr ? 'جاري تحضير الإجابة...' : 'L’assistant réfléchit...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestion chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={chip.action}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-cyan-50 hover:text-cyan-800 text-slate-700 text-[11px] font-bold whitespace-nowrap transition-colors border border-slate-200 cursor-pointer disabled:opacity-50"
              >
                {isAr ? chip.ar : chip.fr}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isAr ? 'اطرح سؤالك هنا...' : 'Posez votre question...'}
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 text-xs sm:text-sm font-medium"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="p-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white disabled:opacity-50 transition-all cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
