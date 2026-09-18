import React, { useState } from 'react';
import { usePubgApp } from '../../context/PubgAppContext';
import { 
  Key, 
  Copy, 
  Check, 
  ExternalLink, 
  Coins, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const PubgCodeVault: React.FC = () => {
  const { claimedCodes, user } = usePubgApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-2 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
          <Key className="w-4 h-4" />
          <span>خزنة الأكواد الرقمية الخاصة بك</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          أكواد شدات ببجي المستلمة ({claimedCodes.length})
        </h2>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          جميع أكواد الشحن التي قمت باستبدالها بنقاطك محفوظة هنا دائماً. يمكنك نسخ كود الشحن ورقم الـ PIN والتوجه إلى Midasbuy لشحن الشدات في حسابك فوراً!
        </p>
      </div>

      {claimedCodes.length === 0 ? (
        <div className="bg-slate-900/60 rounded-3xl p-10 border border-slate-800 text-center space-y-4 shadow-inner">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <Key className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">لا توجد أكواد مستلمة بعد</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              لم تقم باستبدال أي باقة شدات حتى الآن. اجمع النقاط من خلال دعوة أصدقائك وستظهر أكوادك هنا فور شرائها!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {claimedCodes.map((item) => {
            const isCodeCopied = copiedId === `code_${item.id}`;
            const isPinCopied = copiedId === `pin_${item.id}`;

            return (
              <div 
                key={item.id}
                className="bg-slate-900/95 rounded-3xl p-5 sm:p-6 border border-emerald-500/30 shadow-xl space-y-4 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black">
                      <Coins className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-white">
                          كود شحن {item.ucAmount + item.bonusUc} UC
                        </h4>
                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          جاهز للاستخدام ✅
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>تاريخ الشراء: {item.claimedAt}</span>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={item.midasbuyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95"
                  >
                    <span>شحن في Midasbuy</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Code & PIN Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* Code Card */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold block">كود الشحن (Redeem Code)</span>
                      <span className="font-mono text-xs sm:text-sm font-black text-amber-300 select-all tracking-wider">
                        {item.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(item.code, `code_${item.id}`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1 active:scale-90"
                    >
                      {isCodeCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* PIN Card */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold block">الرمز السري (PIN / Password)</span>
                      <span className="font-mono text-xs sm:text-sm font-black text-emerald-400 select-all tracking-widest">
                        {item.pin}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(item.pin, `pin_${item.id}`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1 active:scale-90"
                    >
                      {isPinCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ PIN</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* 3 Step Instruction */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    طريقة الشحن: ادخل إلى موقع Midasbuy ⬅ ضع رقم الآيدي الخاص بك في ببجي ({user.pubgPlayerId}) ⬅ الصق كود الشحن والـ PIN واضغط استرداد!
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
