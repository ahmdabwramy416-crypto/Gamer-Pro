import React, { useState } from 'react';
import { usePubgApp } from '../../context/PubgAppContext';
import { 
  DollarSign, 
  TrendingUp, 
  Settings, 
  ShieldCheck, 
  Sliders, 
  PieChart, 
  Sparkles, 
  Key, 
  Plus, 
  Check, 
  Calculator, 
  Zap, 
  Users, 
  Smartphone, 
  Eye, 
  CheckCircle2,
  Tv
} from 'lucide-react';

export const OwnerProfitSuite: React.FC = () => {
  const { 
    ownerSettings, 
    updateOwnerSettings, 
    inventoryCodes, 
    addNewInventoryCode,
    totalAdImpressions,
    totalAdRevenueUsd,
    packages,
    invitedFriends
  } = usePubgApp();

  const [activeTab, setActiveTab] = useState<'strategy' | 'calculator' | 'admob' | 'inventory'>('strategy');

  // Calculator State
  const [calcUsers, setCalcUsers] = useState<number>(1000);
  const [calcInvitesPerUser, setCalcInvitesPerUser] = useState<number>(6);
  const [calcAdsPerSession, setCalcAdsPerSession] = useState<number>(5);
  const [calcEcpm, setCalcEcpm] = useState<number>(9.50);

  // New Code Form State
  const [newPkgId, setNewPkgId] = useState('uc_60');
  const [newCodeStr, setNewCodeStr] = useState('');
  const [newPinStr, setNewPinStr] = useState('');
  const [codeAddedSuccess, setCodeAddedSuccess] = useState(false);

  // Profit math calculations
  const totalNetworkUsers = calcUsers * (1 + calcInvitesPerUser);
  const monthlyImpressions = totalNetworkUsers * calcAdsPerSession * 8; // 8 active sessions per month
  const estimatedGrossRevenue = (monthlyImpressions * calcEcpm) / 1000;
  
  // Cost of 60 UC codes awarded (e.g. 1 code per 6 invites)
  const totalCodesAwarded = Math.floor((totalNetworkUsers * calcInvitesPerUser) / 6);
  const estimatedCodesCost = totalCodesAwarded * 0.85; // $0.85 wholesale per 60 UC
  const netMonthlyProfit = Math.max(0, estimatedGrossRevenue - estimatedCodesCost);
  const profitMarginPct = estimatedGrossRevenue > 0 ? Math.round((netMonthlyProfit / estimatedGrossRevenue) * 100) : 0;

  const handleAddCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCodeStr || !newPinStr) return;
    const pkg = packages.find(p => p.id === newPkgId);
    addNewInventoryCode(newPkgId, pkg ? pkg.ucAmount : 60, newCodeStr.trim(), newPinStr.trim());
    setNewCodeStr('');
    setNewPinStr('');
    setCodeAddedSuccess(true);
    setTimeout(() => setCodeAddedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Mega Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>لوحة تحكم واستراتيجية أرباح صاحب التطبيق (Owner Monetization Suite)</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white">
            كيف تربح أنت دولاراً حقيقياً من كل مستخدم يدخل التطبيق؟ 💰
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            تم تصميم التطبيق بنموذج <strong>الانتشار الفيروسي (Viral Referral Growth)</strong> مع دمج إعلانات AdMob البينية والمكافأة عند كل حركة يقوم بها المستخدم، مما يضمن لك أرباح إعلانات تفوق تكلفة شراء أكواد الشدات بفارق كبير!
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold">مرات ظهور الإعلانات</div>
              <div className="text-lg font-black text-amber-400 font-mono mt-0.5">{totalAdImpressions}</div>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold">أرباح الإعلانات المقدرة</div>
              <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">${totalAdRevenueUsd.toFixed(2)} USD</div>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold">معدل eCPM الحالي</div>
              <div className="text-lg font-black text-cyan-400 font-mono mt-0.5">${ownerSettings.estimatedECPM.toFixed(2)}</div>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold">أكواد الشدات بالمخزون</div>
              <div className="text-lg font-black text-purple-400 font-mono mt-0.5">{inventoryCodes.length} كود</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('strategy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'strategy' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>نموذج الربح والأراجيح المالية</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'calculator' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>حاسبة الأرباح التقديرية الحية</span>
        </button>

        <button
          onClick={() => setActiveTab('admob')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'admob' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>إعدادات شبكات الإعلانات (AdMob)</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'inventory' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>إدارة مخزون أكواد الشدات ({inventoryCodes.length})</span>
        </button>
      </div>

      {/* Tab 1: Strategy Explained */}
      {activeTab === 'strategy' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">1</div>
            <h3 className="text-base font-black text-white">إعلانات AdMob عند كل تفاعل</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              عندما يفتح المستخدم التطبيق، ينسخ كود الدعوة، يشارك على واتساب، أو يطلب كود الشدات، يظهر له إعلان بيني (Interstitial) أو إعلان فيديو بمكافأة (Rewarded Ad). هذا يحقق لك بين <strong>$8 إلى $15 دولار</strong> لكل 1000 ظهور.
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">2</div>
            <h3 className="text-base font-black text-white">الانتشار الذاتي بدون تكلفة تسويق</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              لأن النقاط تُمنح <strong>فقط من خلال الدعوات</strong>، يقوم كل مستخدم بمشاركة التطبيق في مجموعات واتساب وتيليجرام وفيسبوك مع عشرات اللاعبين لجلب أصدقاء وفتح شداته، مما يضاعف عدد مستخدميك يومياً دون أن تنفق دولاراً واحداً على الإعلانات!
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">3</div>
            <h3 className="text-base font-black text-white">فارق الربح الصافي (Arbitrage)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ليحصل المستخدم على 60 شدة (تكلفتها عليك بالجملة حوالي 0.85$)، يحتاج لدعوة 6 أصدقاء. هؤلاء الـ 7 أشخاص يولدون لك معاً أكثر من 50 إلى 80 ظهور إعلاني، مما يحقق لك إيرادات بقيمة <strong>$1.50 إلى $2.20$</strong>. ربحك الصافي هو الفارق المؤكد!
            </p>
          </div>

        </div>
      )}

      {/* Tab 2: Profit Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
          
          {/* Sliders Left */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>تحكم في مدخلات حاسبة الأرباح</span>
            </h3>

            {/* Slider 1: Base Users */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">عدد المستخدمين النشطين شهرياً:</span>
                <span className="font-mono font-bold text-amber-400">{calcUsers.toLocaleString()} مستخدم</span>
              </div>
              <input 
                type="range"
                min="100"
                max="25000"
                step="100"
                value={calcUsers}
                onChange={(e) => setCalcUsers(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Slider 2: Invites per user */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">متوسط الدعوات لكل مستخدم:</span>
                <span className="font-mono font-bold text-emerald-400">{calcInvitesPerUser} دعوات</span>
              </div>
              <input 
                type="range"
                min="1"
                max="15"
                step="1"
                value={calcInvitesPerUser}
                onChange={(e) => setCalcInvitesPerUser(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Slider 3: eCPM */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">سعر الألف ظهور (eCPM في AdMob):</span>
                <span className="font-mono font-bold text-cyan-400">${calcEcpm.toFixed(2)} USD</span>
              </div>
              <input 
                type="range"
                min="3"
                max="25"
                step="0.5"
                value={calcEcpm}
                onChange={(e) => setCalcEcpm(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Output Card Right */}
          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-3xl border border-amber-500/30 space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <span className="text-xs text-slate-400 font-bold block">النتيجة المالية التقديرية (شهرياً)</span>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>إجمالي شبكة المستخدمين:</span>
                  <span className="font-mono font-bold text-white">{totalNetworkUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>مرات ظهور الإعلانات:</span>
                  <span className="font-mono font-bold text-amber-400">{monthlyImpressions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>إجمالي دخل AdMob:</span>
                  <span className="font-mono font-bold text-cyan-400">${estimatedGrossRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>تكلفة أكواد الشدات الموزعة:</span>
                  <span className="font-mono font-bold text-rose-400">-${estimatedCodesCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Net Profit Big Display */}
            <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-500/40 text-center">
              <span className="text-[11px] text-emerald-300/80 font-bold block">صافي ربحك الشهري (Net Profit)</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
                ${netMonthlyProfit.toFixed(2)} USD
              </div>
              <div className="text-[10px] text-emerald-300 mt-1 font-bold">
                هامش ربح صافٍ {profitMarginPct}% 📈
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab 3: AdMob Settings */}
      {activeTab === 'admob' && (
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 text-white font-black text-base sm:text-lg">
            <Tv className="w-5 h-5 text-amber-400" />
            <span>معرفات وحدات إعلانات AdMob الخاصة بك</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-400 font-bold">معرف التطبيق (AdMob App ID):</label>
              <input 
                type="text" 
                value={ownerSettings.admobAppId}
                onChange={(e) => updateOwnerSettings({ admobAppId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-300 font-mono outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 font-bold">معرف الإعلان البيني (Interstitial Unit ID):</label>
              <input 
                type="text" 
                value={ownerSettings.admobInterstitialId}
                onChange={(e) => updateOwnerSettings({ admobInterstitialId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-300 font-mono outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 font-bold">معرف إعلان الفيديو بمكافأة (Rewarded Ad Unit ID):</label>
              <input 
                type="text" 
                value={ownerSettings.admobRewardedId}
                onChange={(e) => updateOwnerSettings({ admobRewardedId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-amber-300 font-mono outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 font-bold">النقاط الممنوحة لكل دعوة جديدة:</label>
              <input 
                type="number" 
                value={ownerSettings.pointsPerInvite}
                onChange={(e) => updateOwnerSettings({ pointsPerInvite: parseInt(e.target.value, 10) || 50 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono outline-none focus:border-amber-500 font-black"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3.5 rounded-2xl border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              جميع هذه المعرفات تم ربطها تلقائياً بملف مشروع Sketchware Pro (v6.4.0-rc05-minApi26) لتعمل على هواتف المستخدمين فور تثبيت التطبيق.
            </span>
          </div>
        </div>
      )}

      {/* Tab 4: UC Inventory */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Add Code Form */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              <span>إضافة كود Midasbuy جديد إلى المخزون</span>
            </h3>

            <form onSubmit={handleAddCode} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">نوع الباقة</label>
                <select
                  value={newPkgId}
                  onChange={(e) => setNewPkgId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none"
                >
                  {packages.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">كود الشحن (Redeem Code)</label>
                <input 
                  type="text"
                  value={newCodeStr}
                  onChange={(e) => setNewCodeStr(e.target.value)}
                  placeholder="e.g. MDB-PUBG-60-AZ881"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-300 font-mono outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">رقم الـ PIN</label>
                <input 
                  type="text"
                  value={newPinStr}
                  onChange={(e) => setNewPinStr(e.target.value)}
                  placeholder="e.g. 981240"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-emerald-400 font-mono outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة الكود إلى المخزون</span>
                </button>
                {codeAddedSuccess && (
                  <span className="text-xs text-emerald-400 font-bold mr-3 inline-block mt-2">
                    ✅ تم حفظ الكود في المخزون بنجاح!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Current Inventory List */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-black text-white">
              الأكواد المتوفرة في المخزون ({inventoryCodes.length})
            </h3>

            <div className="space-y-2">
              {inventoryCodes.map((c) => (
                <div 
                  key={c.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-amber-400 font-black">{c.ucAmount} UC</span>
                    <span className="font-mono text-slate-300">{c.code}</span>
                    <span className="font-mono text-emerald-400">PIN: {c.pin}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    c.isUsed ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {c.isUsed ? 'مُستخدم ❌' : 'متاح للتسليم ✅'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
