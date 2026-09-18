import React, { useState } from 'react';
import { PubgAppProvider } from './context/PubgAppContext';
import { PubgHeader } from './components/pubg/PubgHeader';
import { PubgReferralCenter } from './components/pubg/PubgReferralCenter';
import { PubgShop } from './components/pubg/PubgShop';
import { PubgCodeVault } from './components/pubg/PubgCodeVault';
import { OwnerProfitSuite } from './components/pubg/OwnerProfitSuite';
import { PubgSketchwareExporter } from './components/pubg/PubgSketchwareExporter';
import { PubgPhoneInstallView } from './components/pubg/PubgPhoneInstallView';
import { PubgModals } from './components/pubg/PubgModals';
import { PubgAdMobModal } from './components/pubg/PubgAdMobModal';
import { 
  Users, 
  ShoppingBag, 
  Key, 
  DollarSign, 
  Smartphone, 
  ShieldCheck, 
  Gamepad2,
  Sparkles,
  Download
} from 'lucide-react';

function PubgMainApp() {
  const [activeTab, setActiveTab] = useState<'install' | 'referrals' | 'shop' | 'vault' | 'owner' | 'sketchware'>('install');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans" dir="rtl">
      
      {/* Header with User Info & Points */}
      <PubgHeader />

      {/* Main Tab Navigation Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 sticky top-[73px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none text-xs sm:text-sm font-bold">
            
            {/* Install on Phone Tab (Prominent First Tab) */}
            <button
              id="tab-btn-install"
              onClick={() => setActiveTab('install')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                activeTab === 'install'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30'
                  : 'text-emerald-400 hover:text-white hover:bg-slate-800/60 border border-emerald-500/30'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>📲 تثبيت التطبيق على الهاتف</span>
            </button>

            <button
              onClick={() => setActiveTab('referrals')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                activeTab === 'referrals'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>👥 مركز الدعوات والأرباح</span>
            </button>

            <button
              onClick={() => setActiveTab('shop')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                activeTab === 'shop'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>🛒 متجر شدات ببجي (UC Shop)</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                activeTab === 'vault'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>🔑 خزنـة الأكواد المستلمة</span>
            </button>

            <button
              onClick={() => setActiveTab('owner')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                activeTab === 'owner'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'text-emerald-400 hover:text-white hover:bg-slate-800/60 border border-emerald-500/30'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>💰 لوحة أرباح المالك وحساب الدخل</span>
            </button>

            <button
              onClick={() => setActiveTab('sketchware')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                activeTab === 'sketchware'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black shadow-lg shadow-purple-500/20'
                  : 'text-purple-400 hover:text-white hover:bg-slate-800/60 border border-purple-500/30'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>📦 ملفات المشروع (SWB / Java)</span>
            </button>

          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'install' && <PubgPhoneInstallView />}
        {activeTab === 'referrals' && <PubgReferralCenter />}
        {activeTab === 'shop' && <PubgShop />}
        {activeTab === 'vault' && <PubgCodeVault />}
        {activeTab === 'owner' && <OwnerProfitSuite />}
        {activeTab === 'sketchware' && <PubgSketchwareExporter />}
      </main>

      {/* Interactive Modals */}
      <PubgModals />
      <PubgAdMobModal />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-300">PUBG Mobile UC Rewards System • Invitations & AdMob Monetization</span>
          </div>
          <p className="text-slate-400">
            تطبيق شدات ببجي بنظام الإحالات الحصري مع إعلانات AdMob البينية والمكافأة وحماية الـ VPN
          </p>
        </div>
      </footer>

    </div>
  );
}

export function App() {
  return (
    <PubgAppProvider>
      <PubgMainApp />
    </PubgAppProvider>
  );
}

export default App;
