import React, { useState } from 'react';
import { usePubgApp } from '../../context/PubgAppContext';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Coins, 
  Users, 
  ShieldAlert, 
  ExternalLink, 
  Key, 
  Gift, 
  MessageCircle, 
  Send,
  Zap
} from 'lucide-react';

export const PubgModals: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    user, 
    ownerSettings, 
    selectedPackageToRedeem, 
    latestClaimedCode,
    triggerAdAndProceed,
    redeemUcPackage
  } = usePubgApp();

  const [copied, setCopied] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  if (activeModal === 'NONE' || activeModal === 'ADMOB_AD') return null;

  const shareText = `🔥 احصل على شدات ببجي موبايل (PUBG UC) مجاناً وبأكواد رسمية عبر تطبيق LootPlay! 🎮
سجل الآن وضع كود الدعوة الخاص بي [ ${user.referralCode} ] لتحصل على هدية ترحيبية فورية! 🎁
رابط التحميل المباشر: https://lootplay-rewards.app/join?ref=${user.referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLatestCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLatestPin = (pin: string) => {
    navigator.clipboard.writeText(pin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const handleWhatsAppShare = () => {
    triggerAdAndProceed('مشاركة كود الدعوة', 'INTERSTITIAL', () => {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    });
  };

  const handleTelegramShare = () => {
    triggerAdAndProceed('مشاركة كود الدعوة', 'INTERSTITIAL', () => {
      const url = `https://t.me/share/url?url=${encodeURIComponent(`https://lootplay-rewards.app/join?ref=${user.referralCode}`)}&text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      
      {/* 1. Share & Invite Friends Modal */}
      {activeModal === 'INVITE_SHARE' && (
        <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl relative">
          <button 
            onClick={() => setActiveModal('NONE')}
            className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">مشاركة كود الدعوة</h3>
            <p className="text-xs text-slate-400">
              احصل على <span className="text-emerald-400 font-bold font-mono">+{ownerSettings.pointsPerInvite} نقطة</span> عن كل صديق ينضم بكودك!
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-dashed border-amber-500/40 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-400 block">كودك الخاص</span>
              <span className="text-2xl font-black font-mono tracking-widest text-amber-300">
                {user.referralCode}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1 active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>مشاركة على واتساب (WhatsApp)</span>
            </button>

            <button
              onClick={handleTelegramShare}
              className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>مشاركة على تيليجرام (Telegram)</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Redeem Confirm / Missing Points Modal */}
      {activeModal === 'REDEEM_CONFIRM' && selectedPackageToRedeem && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl relative">
          <button 
            onClick={() => setActiveModal('NONE')}
            className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Coins className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-white">
              {selectedPackageToRedeem.title}
            </h3>
            <p className="text-xs text-slate-300">
              النقاط المطلوبة: <span className="font-mono text-amber-400 font-bold">{selectedPackageToRedeem.pointsRequired} pt</span>
            </p>
          </div>

          {user.pointsBalance < selectedPackageToRedeem.pointsRequired ? (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>رصيدك الحالي:</span>
                <span className="font-mono text-emerald-400 font-bold">{user.pointsBalance} pt</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>النقاط المتبقية:</span>
                <span className="font-mono text-rose-400 font-bold">
                  {selectedPackageToRedeem.pointsRequired - user.pointsBalance} pt
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400 border-t border-slate-800 pt-2">
                <span>الدعوات المطلوبة لفتح الكود:</span>
                <span className="font-bold text-amber-400">
                  {Math.ceil((selectedPackageToRedeem.pointsRequired - user.pointsBalance) / ownerSettings.pointsPerInvite)} أصدقاء
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <p>هل أنت متأكد من رغبتك في شراء هذا الكود وخصم النقاط من حسابك؟</p>
              <p className="text-emerald-400 font-bold">سيتم تسليمك كود Midasbuy ورقم الـ PIN فوراً بعد المشاهدة.</p>
            </div>
          )}

          <div className="space-y-2">
            {user.pointsBalance < selectedPackageToRedeem.pointsRequired ? (
              <button
                onClick={() => setActiveModal('INVITE_SHARE')}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Users className="w-4 h-4" />
                <span>دعوة أصدقاء لكسب النقاط الآن 🚀</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  triggerAdAndProceed(`شراء ${selectedPackageToRedeem.title}`, 'REWARDED', async () => {
                    const res = await redeemUcPackage(selectedPackageToRedeem);
                    if (res.success) {
                      setActiveModal('CODE_REVEAL');
                    }
                  });
                }}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>تأكيد الشراء واستلام الكود 🎁</span>
              </button>
            )}

            <button
              onClick={() => setActiveModal('NONE')}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* 3. Code Reveal Modal (Celebration) */}
      {activeModal === 'CODE_REVEAL' && latestClaimedCode && (
        <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl w-full max-w-lg p-6 sm:p-7 space-y-5 shadow-2xl relative text-center">
          <button 
            onClick={() => setActiveModal('NONE')}
            className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <Gift className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              🎉 مبروك! استلمت كود {latestClaimedCode.ucAmount + latestClaimedCode.bonusUc} UC
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              تم توليد كود الشحن الرسمي الخاص بك ورقم الـ PIN المعتمد عبر Midasbuy بنجاح!
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-3 text-right">
            
            {/* Redeem Code */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">كود الشحن الرقمي (Redeem Code)</span>
                <span className="font-mono text-sm sm:text-base font-black text-amber-300 select-all tracking-wider">
                  {latestClaimedCode.code}
                </span>
              </div>
              <button
                onClick={() => handleCopyLatestCode(latestClaimedCode.code)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم' : 'نسخ'}</span>
              </button>
            </div>

            {/* PIN Code */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">رقم الـ PIN السري</span>
                <span className="font-mono text-sm sm:text-base font-black text-emerald-400 select-all tracking-widest">
                  {latestClaimedCode.pin}
                </span>
              </div>
              <button
                onClick={() => handleCopyLatestPin(latestClaimedCode.pin)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 active:scale-95"
              >
                {copiedPin ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPin ? 'تم' : 'نسخ'}</span>
              </button>
            </div>

          </div>

          <div className="space-y-2 pt-2">
            <a
              href={latestClaimedCode.midasbuyUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <span>الانتقال لموقع Midasbuy وشحن الشدات الآن</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setActiveModal('NONE')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold"
            >
              تم الحفظ في خزنـتي ✅
            </button>
          </div>
        </div>
      )}

      {/* 4. Anti-VPN Alert Modal */}
      {activeModal === 'VPN_ALERT' && (
        <div className="bg-slate-900 border-2 border-rose-500/50 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl relative text-center">
          <button 
            onClick={() => setActiveModal('NONE')}
            className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-black text-white">تنبيه: تم كشف اتصال VPN!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              لحماية التطبيق ومنع التلاعب بالإحالات والحفاظ على تسليم أكواد الشدات الحقيقية، يُرجى إيقاف برامج الـ VPN والبروكسي تماماً.
            </p>
          </div>

          <button
            onClick={() => setActiveModal('NONE')}
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs"
          >
            حسناً، فهمت
          </button>
        </div>
      )}

    </div>
  );
};
