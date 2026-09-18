import React, { useState } from 'react';
import { usePubgApp } from '../../context/PubgAppContext';
import { PubgUcPackage } from '../../types';
import { 
  ShoppingBag, 
  Sparkles, 
  Coins, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  Key, 
  Zap, 
  Flame, 
  HelpCircle,
  Clock
} from 'lucide-react';

export const PubgShop: React.FC = () => {
  const { 
    user, 
    packages, 
    ownerSettings, 
    setSelectedPackageToRedeem, 
    setActiveModal, 
    triggerAdAndProceed, 
    redeemUcPackage 
  } = usePubgApp();

  const [loadingPkgId, setLoadingPkgId] = useState<string | null>(null);

  const handleRedeemClick = (pkg: PubgUcPackage) => {
    setSelectedPackageToRedeem(pkg);

    if (user.pointsBalance < pkg.pointsRequired) {
      setActiveModal('REDEEM_CONFIRM');
      return;
    }

    if (user.verifiedInvitedCount < ownerSettings.minInvitesForFirstCashout) {
      setActiveModal('REDEEM_CONFIRM');
      return;
    }

    // Trigger AdMob interstitial ad before unmasking the PUBG UC redeem voucher
    setLoadingPkgId(pkg.id);
    triggerAdAndProceed(`جاري توليد كود ${pkg.title}`, 'REWARDED', async () => {
      setLoadingPkgId(null);
      const res = await redeemUcPackage(pkg);
      if (res.success) {
        setActiveModal('CODE_REVEAL');
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/80 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>أكواد رقمية معتمدة ورسمية 100% عبر Midasbuy</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white">
              متجر استبدال شدات ببجي موبايل (PUBG UC Shop)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              اختر باقة الشدات التي تناسبك واستبدل نقاطك التي جمعتها من دعوة أصدقائك بكود فوري، واشحن حسابك برقم الآيدي عبر موقع Midasbuy الرسمي في ثوانٍ!
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center min-w-[160px] shadow-lg">
            <div className="text-[11px] text-slate-400 font-bold">رصيدك المتاح حالياً</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">
              {user.pointsBalance.toLocaleString()} <span className="text-xs">pt</span>
            </div>
            <div className="text-[10px] text-amber-400 mt-1 font-bold">
              يساوي تقريباً {Math.floor(user.pointsBalance / 5)} شدة
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {packages.map((pkg) => {
          const hasEnoughPoints = user.pointsBalance >= pkg.pointsRequired;
          const missingPoints = Math.max(0, pkg.pointsRequired - user.pointsBalance);
          const invitesNeeded = Math.ceil(missingPoints / ownerSettings.pointsPerInvite);
          const isEligible = hasEnoughPoints && user.verifiedInvitedCount >= ownerSettings.minInvitesForFirstCashout;

          return (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between relative overflow-hidden ${
                pkg.isPopular 
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/40 border-amber-500/60 shadow-xl shadow-amber-500/10' 
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Badge if exists */}
              {pkg.badge && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-4">
                {/* UC Card Top Icon */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg"
                    style={{ backgroundColor: `${pkg.iconColor}25`, color: pkg.iconColor, border: `1px solid ${pkg.iconColor}50` }}
                  >
                    <Coins className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                      <span className="text-emerald-400 font-bold">{pkg.ucAmount + pkg.bonusUc} UC</span>
                      <span>•</span>
                      <span>قيمة ${pkg.approxUsdValue} USD</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                  {pkg.description}
                </p>

                {/* Requirements details */}
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>النقاط المطلوبة:</span>
                    </span>
                    <span className="font-mono font-black text-amber-400 text-sm">
                      {pkg.pointsRequired.toLocaleString()} pt
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      <span>تساوي دعوة:</span>
                    </span>
                    <span className="font-bold text-slate-200">
                      {pkg.invitesRequired} أصدقاء
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 space-y-2">
                <button
                  onClick={() => handleRedeemClick(pkg)}
                  disabled={loadingPkgId === pkg.id}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                    isEligible
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                  }`}
                >
                  {loadingPkgId === pkg.id ? (
                    <span>⏳ جاري توليد كود الشدات...</span>
                  ) : isEligible ? (
                    <>
                      <Zap className="w-4 h-4 text-slate-950" />
                      <span>استبدال وشراء الكود فوراً 🚀</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span>تحتاج {missingPoints} نقطة ({invitesNeeded} دعوات)</span>
                    </>
                  )}
                </button>

                {!hasEnoughPoints && (
                  <p className="text-[10px] text-center text-slate-500">
                    ادعُ {invitesNeeded} من أصدقائك لفتح هذا الكود مجاناً!
                  </p>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            جميع الأكواد تُسلم مع رقم PIN رسمي ويمكن شحنها في أي دولة دون حظر أو مشاكل عبر Midasbuy.
          </span>
        </div>
        <a 
          href="https://www.midasbuy.com/midasbuy/ot/redeem/pubgm" 
          target="_blank" 
          rel="noreferrer"
          className="text-amber-400 hover:underline flex items-center gap-1 font-bold whitespace-nowrap"
        >
          <span>موقع الشحن الرسمي (Midasbuy)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
