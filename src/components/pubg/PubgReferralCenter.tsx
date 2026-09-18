import React, { useState } from 'react';
import { usePubgApp } from '../../context/PubgAppContext';
import { 
  Users, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  UserPlus, 
  Gift, 
  Award, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Zap, 
  Smartphone,
  MessageCircle,
  Send,
  AlertTriangle
} from 'lucide-react';

export const PubgReferralCenter: React.FC = () => {
  const { 
    user, 
    ownerSettings, 
    invitedFriends, 
    milestones, 
    simulateInvite, 
    claimMilestoneReward, 
    triggerAdAndProceed,
    setActiveModal 
  } = usePubgApp();

  const [copied, setCopied] = useState(false);
  const [friendNameInput, setFriendNameInput] = useState('');

  const shareText = `🔥 احصل على شدات ببجي موبايل (PUBG UC) مجاناً وبأكواد رسمية عبر تطبيق LootPlay! 🎮
سجل الآن وضع كود الدعوة الخاص بي [ ${user.referralCode} ] لتحصل على هدية ترحيبية فورية! 🎁
رابط التحميل المباشر: https://lootplay-rewards.app/join?ref=${user.referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(`https://lootplay-rewards.app/join?ref=${user.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    triggerAdAndProceed('إعلان مكافأة المشاركة', 'INTERSTITIAL', () => {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    });
  };

  const handleTelegramShare = () => {
    triggerAdAndProceed('إعلان مكافأة المشاركة', 'INTERSTITIAL', () => {
      const url = `https://t.me/share/url?url=${encodeURIComponent(`https://lootplay-rewards.app/join?ref=${user.referralCode}`)}&text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    });
  };

  const handleSimulateInvite = (isLegit: boolean = true) => {
    // Simulated AdMob trigger when new referral activity occurs
    triggerAdAndProceed('التحقق من إحالة جديدة (AdMob)', 'INTERSTITIAL', () => {
      simulateInvite(friendNameInput.trim() || undefined, isLegit);
      setFriendNameInput('');
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Mega Hero Invitation Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-amber-950/90 via-slate-900 to-slate-950 border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left / Top description */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>نظام النقاط بالدعوات فقط (Invitations Only)</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              ادعُ أصدقاءك واكسب <span className="text-amber-400 underline decoration-amber-500/50">شدات ببجي مجاناً</span>!
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              كل صديق يقوم بتحميل التطبيق وإدخال كودك الخاص، ستحصل أنت فوراً على <strong className="text-emerald-400 font-mono text-base">+{ownerSettings.pointsPerInvite} نقطة</strong> مؤكدة! اجمع النقاط واستبدلها فوراً بأكواد شحن ببجي الرسمية عبر Midasbuy.
            </p>

            {/* Quick Share Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppShare}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>مشاركة واتساب</span>
              </button>

              <button
                onClick={handleTelegramShare}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-sky-600/30 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>مشاركة تيليجرام</span>
              </button>

              <button
                onClick={handleCopyShareLink}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs sm:text-sm transition-all border border-slate-700 active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
              </button>
            </div>
          </div>

          {/* Right / Bottom Code Box */}
          <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-3xl border border-amber-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold">كود الدعوة الحصري بك</span>
              <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                +{ownerSettings.pointsPerInvite} نقطة / دعوة
              </span>
            </div>

            {/* Big Code Display */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-dashed border-amber-500/50 p-4 rounded-2xl flex items-center justify-between gap-3">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-amber-300 select-all">
                {user.referralCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-md active:scale-90"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ الكود</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Stats Summary */}
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">إجمالي الأصدقاء</div>
                <div className="text-lg font-black text-white font-mono mt-0.5">{user.verifiedInvitedCount}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">أرباحك من الدعوات</div>
                <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">
                  {(user.verifiedInvitedCount * ownerSettings.pointsPerInvite).toLocaleString()} pt
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Referral Milestones & Extra Bonuses */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white">
              مكافآت وتحديات الدعوات الإضافية (Milestones)
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-bold">
            كلما دعوت أكثر زادت نقاطك! 🚀
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {milestones.map((m) => {
            const isUnlocked = user.verifiedInvitedCount >= m.invitesNeeded;
            const progress = Math.min(100, Math.round((user.verifiedInvitedCount / m.invitesNeeded) * 100));

            return (
              <div 
                key={m.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  m.isClaimed 
                    ? 'bg-slate-950/60 border-slate-800 opacity-80' 
                    : isUnlocked 
                      ? 'bg-gradient-to-b from-amber-500/20 to-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10' 
                      : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-white">{m.title}</span>
                    <span className="text-amber-400 font-mono">+{m.rewardPoints} pt</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>التقدم: {user.verifiedInvitedCount} / {m.invitesNeeded}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${isUnlocked ? 'bg-amber-400' : 'bg-slate-600'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Claim Button */}
                <button
                  onClick={() => claimMilestoneReward(m.id)}
                  disabled={!isUnlocked || m.isClaimed}
                  className={`w-full py-2 rounded-xl text-xs font-black transition-all ${
                    m.isClaimed
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : isUnlocked
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md active:scale-95'
                        : 'bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  {m.isClaimed ? '✅ تم الاستلام' : isUnlocked ? '🎁 استلم الهدية الآن' : `متبقي ${Math.max(0, m.invitesNeeded - user.verifiedInvitedCount)} دعوات`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Invited Friends Table & Testing Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Friends List */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-black text-white">
                سجل الأصدقاء المدعوين ({invitedFriends.length})
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>فحص الحماية نشط</span>
            </div>
          </div>

          {invitedFriends.length === 0 ? (
            <div className="text-center py-10 space-y-2 bg-slate-950 rounded-2xl border border-slate-800">
              <UserPlus className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">لم تقم بدعوة أي صديق بعد. شارك كودك الآن لتبدأ كسب النقاط!</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {invitedFriends.map((friend) => (
                <div 
                  key={friend.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={friend.avatar} 
                      alt={friend.name} 
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{friend.name}</span>
                        {friend.status === 'VERIFIED' && (
                          <span className="text-[10px] text-emerald-400 font-normal">مؤكد ✅</span>
                        )}
                        {friend.status === 'BLOCKED_VPN' && (
                          <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20">محظور (VPN) ⚠️</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>PUBG: {friend.pubgId}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {friend.joinedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-mono text-xs sm:text-sm font-black ${
                      friend.pointsAwarded > 0 ? 'text-emerald-400' : 'text-slate-500 line-through'
                    }`}>
                      +{friend.pointsAwarded} pt
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      IP: {friend.ipAddress.split('.').slice(0, 2).join('.')}.*.*
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Invitation Testing Simulator (For User & Owner testing) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-6 border border-amber-500/30 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
              <Sparkles className="w-4 h-4" />
              <span>محاكي تجربة الدعوات (Live Test)</span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              جرّب محاكاة انضمام صديق جديد بكودك لرؤية كيفية احتساب النقاط، تشغيل إعلانات AdMob، وتحديث رصيد شداتك فوراً!
            </p>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 font-bold">اسم الصديق (اختياري)</label>
              <input 
                type="text"
                value={friendNameInput}
                onChange={(e) => setFriendNameInput(e.target.value)}
                placeholder="مثلاً: يزن القناص (Yazan_Pro)"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2 pt-3">
            {/* Legit Friend simulation button */}
            <button
              onClick={() => handleSimulateInvite(true)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>محاكاة صديق حقيقي (+{ownerSettings.pointsPerInvite} نقطة)</span>
            </button>

            {/* Fake / VPN simulation button */}
            <button
              onClick={() => handleSimulateInvite(false)}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs transition-all border border-rose-500/20 flex items-center justify-center gap-1.5 active:scale-95"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>محاكاة إحالة وهمية (كشف VPN وغش)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
