import React, { useState } from 'react';
import { usePubgApp } from '../../context/PubgAppContext';
import { ShieldCheck, ShieldAlert, Sparkles, User, Trophy, Coins, Share2, Copy, Check, Gamepad2 } from 'lucide-react';

export const PubgHeader: React.FC = () => {
  const { user, ownerSettings, toggleVpnDetection, setUserPubgId, setActiveModal } = usePubgApp();
  const [isEditingId, setIsEditingId] = useState(false);
  const [tempId, setTempId] = useState(user.pubgPlayerId);
  const [copied, setCopied] = useState(false);

  const handleSaveId = () => {
    if (tempId.trim()) {
      setUserPubgId(tempId.trim());
      setIsEditingId(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-b border-amber-500/20 px-4 py-4 sm:px-6 sticky top-0 z-40 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & User Profile */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full rounded-[14px] object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full border border-slate-950 font-mono">
                LVL {user.level}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-white tracking-wide flex items-center gap-1.5">
                  <span>{user.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    VIP 👑
                  </span>
                </h1>
              </div>

              {/* PUBG Player ID */}
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Player ID:</span>
                {isEditingId ? (
                  <div className="flex items-center gap-1">
                    <input 
                      type="text" 
                      value={tempId}
                      onChange={(e) => setTempId(e.target.value)}
                      className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-xs font-mono border border-slate-700 outline-none w-28"
                      placeholder="e.g. 51928401"
                    />
                    <button 
                      onClick={handleSaveId}
                      className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded hover:bg-amber-400"
                    >
                      حفظ
                    </button>
                  </div>
                ) : (
                  <span 
                    onClick={() => setIsEditingId(true)}
                    className="font-mono text-amber-300 hover:underline cursor-pointer bg-slate-800/60 px-1.5 py-0.2 rounded border border-slate-700/60 text-[11px]"
                    title="اضغط لتعديل الآيدي الخاص بك في ببجي"
                  >
                    {user.pubgPlayerId} ✏️
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Share & Phone Install on Header */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                const installBtn = document.getElementById('tab-btn-install');
                if (installBtn) installBtn.click();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              title="تثبيت التطبيق على الهاتف"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>تثبيت بالهاتف 📲</span>
            </button>

            <button
              onClick={() => setActiveModal('INVITE_SHARE')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة كودي</span>
            </button>
          </div>
        </div>

        {/* User Stats: Points & Referral Code */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 w-full md:w-auto">
          
          {/* Points Balance Pill */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 px-3.5 py-2 rounded-2xl shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-emerald-300/80 font-bold uppercase tracking-wider">رصيد النقاط</div>
              <div className="text-base sm:text-lg font-black text-emerald-400 font-mono leading-none">
                {user.pointsBalance.toLocaleString()} <span className="text-xs font-sans">نقطة</span>
              </div>
            </div>
          </div>

          {/* Invites Count Pill */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/40 px-3.5 py-2 rounded-2xl shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-amber-300/80 font-bold uppercase tracking-wider">الدعوات المؤكدة</div>
              <div className="text-base sm:text-lg font-black text-amber-400 font-mono leading-none">
                {user.verifiedInvitedCount} <span className="text-xs font-sans">أصدقاء</span>
              </div>
            </div>
          </div>

          {/* Referral Code Quick Copy */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-2xl">
            <div className="text-right">
              <div className="text-[9px] text-slate-400 font-bold">كود الدعوة الخاص بك</div>
              <div className="text-xs font-mono font-black text-amber-300 tracking-wider">
                {user.referralCode}
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-all active:scale-90"
              title="نسخ كود الدعوة"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Anti-VPN Status Toggle for testing */}
          <button
            onClick={() => toggleVpnDetection(!user.isVpnDetected)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
              user.isVpnDetected 
                ? 'bg-rose-500/20 border-rose-500 text-rose-300' 
                : 'bg-slate-800/70 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="اختبار كاشف الـ VPN"
          >
            {user.isVpnDetected ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>VPN مُكتشف ⚠️</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>حماية آمنة ✅</span>
              </>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
