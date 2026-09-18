import React, { useState, useEffect } from 'react';
import { usePubgApp } from '../../context/PubgAppContext';
import { X, Play, Volume2, VolumeX, Sparkles, DollarSign, ShieldCheck, Zap } from 'lucide-react';

export const PubgAdMobModal: React.FC = () => {
  const { activeModal, currentAdDetails, setActiveModal, ownerSettings } = usePubgApp();
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (activeModal === 'ADMOB_AD') {
      setSecondsRemaining(5);
      setCanSkip(false);

      const timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activeModal]);

  if (activeModal !== 'ADMOB_AD' || !currentAdDetails) return null;

  const handleCloseAd = () => {
    if (canSkip) {
      setActiveModal('NONE');
      if (currentAdDetails.onComplete) {
        currentAdDetails.onComplete();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col justify-between min-h-[460px]">
        
        {/* AdMob Simulation Top Bar */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-mono font-black text-[10px]">
              AdMob Ad
            </div>
            <span className="text-xs text-slate-300 font-bold">
              {currentAdDetails.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {canSkip ? (
              <button
                onClick={handleCloseAd}
                className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1 shadow-md active:scale-95"
              >
                <span>تخطي الإعلان</span>
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="px-3 py-1 rounded-xl bg-slate-800 text-amber-300 font-mono text-xs font-bold border border-slate-700">
                تخطي بعد {secondsRemaining} ثوانٍ...
              </div>
            )}
          </div>
        </div>

        {/* Ad Video / Creative Content */}
        <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-4 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
          
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-1 shadow-xl shadow-amber-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[20px] flex items-center justify-center text-amber-400">
                <Sparkles className="w-12 h-12 animate-bounce" />
              </div>
            </div>
            <span className="absolute -bottom-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-950">
              راعٍ معتمد
            </span>
          </div>

          <div className="space-y-1 max-w-sm">
            <h3 className="text-lg sm:text-xl font-black text-white">
              PUBG Mobile Royale Pass Elite Season
            </h3>
            <p className="text-xs text-slate-400">
              حمّل أفضل العروض والبطاقات الرسمية واستمتع بخصومات حصرية تصل إلى 40% على شحن الشدات.
            </p>
          </div>

          {/* Call to Action Button inside ad */}
          <button 
            onClick={handleCloseAd}
            disabled={!canSkip}
            className="px-6 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            تثبيت التطبيق الآن مجاناً 📲
          </button>

        </div>

        {/* Owner Monetization Footnote (Explains how the owner gets money from this) */}
        <div className="bg-slate-950/90 p-3.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>أرباحك كصاحب تطبيق: تم تسجيل ظهور إعلان بنجاح</span>
          </div>
          <span className="font-mono text-slate-500">
            eCPM: ${ownerSettings.estimatedECPM.toFixed(2)}
          </span>
        </div>

      </div>
    </div>
  );
};
