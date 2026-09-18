import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Smartphone, 
  Download, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  Share2,
  Tv,
  Zap,
  Play
} from 'lucide-react';
import { usePubgApp } from '../../context/PubgAppContext';

export const PubgPhoneInstallView: React.FC = () => {
  const { user } = usePubgApp();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeInstallTab, setActiveInstallTab] = useState<'pwa' | 'sketchware' | 'apkbuilder' | 'androidstudio'>('pwa');

  // Phone App URL (current live URL or window origin)
  const appUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('localhost') 
        ? 'https://ais-pre-53dhh6eflkirezgzhhxvud-643150272430.europe-west2.run.app' 
        : window.location.href)
    : 'https://ais-pre-53dhh6eflkirezgzhhxvud-643150272430.europe-west2.run.app';

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('📱 لتثبيت التطبيق على هاتفك الآن:\n1. افتح الرابط في متصفح Chrome على هاتفك.\n2. اضغط على القائمة (ثلاث نقاط ⋮ في الأعلى).\n3. اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية (Add to Home Screen)".');
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Install Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/50 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-3 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>تطبيق هاتف حقيقي (Real Mobile App) • Android & iOS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              📲 تثبيت التطبيق على هاتفك واستخدامه كتطبيق حقيقي!
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              يمكنك الآن تشغيل وتثبيت تطبيق <strong>شدات ببجي مجاناً</strong> على هاتفك المحمول كـ تطبيق كامل الشاشة (Standalone App) مع أيقونة على الشاشة الرئيسية وسرعة فائقة أو تجميع ملف <strong>APK</strong> رسمي وتثبيته.
            </p>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleInstallClick}
                className="px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{isInstalled ? '✅ التطبيق مثبت بالفعل' : '📲 تثبيت التطبيق على الهاتف فوراً'}</span>
              </button>

              <button
                onClick={handleCopyUrl}
                className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all border border-slate-700 flex items-center gap-2 active:scale-95"
              >
                {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedUrl ? 'تم نسخ رابط التطبيق' : 'نسخ رابط الهاتف'}</span>
              </button>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="bg-slate-950 p-5 rounded-3xl border border-amber-500/40 shadow-2xl flex flex-col items-center text-center space-y-3 shrink-0">
            <div className="bg-white p-3 rounded-2xl shadow-md">
              <QRCodeSVG 
                value={appUrl} 
                size={140}
                level="H"
                includeMargin={false}
              />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-black text-amber-400 block">امسح الكود بكاميرا هاتفك</span>
              <span className="text-[10px] text-slate-400">ليفتح التطبيق على هاتفك فوراً 📱</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs for Installation Methods */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveInstallTab('pwa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeInstallTab === 'pwa' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>1. التثبيت الفوري المباشر (PWA WebAPK)</span>
        </button>

        <button
          onClick={() => setActiveInstallTab('sketchware')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeInstallTab === 'sketchware' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. تثبيت ملف APK عبر Sketchware Pro (.swb)</span>
        </button>

        <button
          onClick={() => setActiveInstallTab('apkbuilder')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeInstallTab === 'apkbuilder' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>3. تحويل التطبيق لـ APK مجاناً (PWA Builder)</span>
        </button>
      </div>

      {/* TAB 1: PWA Instant Install (Most Reliable & Instant) */}
      {activeInstallTab === 'pwa' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>خطوات تثبيت التطبيق على هاتف أندرويد (Android) بثوانٍ:</span>
              </h3>
              <p className="text-xs text-slate-400">
                هذه الطريقة تحول التطبيق إلى تطبيق حقيقي مثبت على شاشة هاتفك بأيقونة خاصة وواجهة كاملة بدون شريط متصفح.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Step 1 */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/90 space-y-3 text-right">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm">
                  1
                </div>
                <h4 className="text-sm font-bold text-white">افتح الرابط في متصفح كروم (Chrome)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  امسح رمز الـ QR أعلاه أو انسخ الرابط وافتحه مباشرة في متصفح Google Chrome على هاتفك الأندرويد.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/90 space-y-3 text-right">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm">
                  2
                </div>
                <h4 className="text-sm font-bold text-white">اضغط على القائمة (ثلاث نقاط ⋮)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  في الزاوية العلوية أو السفلية للمتصفح اضغط على أيقونة الخيارات (⋮) بجانب شريط العنوان.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/90 space-y-3 text-right">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm">
                  3
                </div>
                <h4 className="text-sm font-bold text-white">اختر "تثبيت التطبيق" أو "إضافة للشاشة الرئيسية"</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  اضغط على زر <strong>"تثبيت التطبيق (Install App)"</strong> أو <strong>"إضافة إلى الشاشة الرئيسية"</strong> وسينزل التطبيق فوراً كأيقونة على هاتفك!
                </p>
              </div>

            </div>

            {/* Apple iPhone notice */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                <strong>لمستخدمي الآيفون (iOS Safari):</strong> افتح الرابط في متصفح Safari، ثم اضغط زر المشاركة (Share ⬆) في الأسفل، ثم اختر <strong>"إضافة إلى الصفحة الرئيسية (Add to Home Screen)"</strong>.
              </span>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: Sketchware Pro APK Guide */}
      {activeInstallTab === 'sketchware' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>كيفية استخراج وتثبيت ملف APK حقيقي عبر تطبيق Sketchware Pro:</span>
              </h3>
              <p className="text-xs text-slate-400">
                إذا كنت تريد ملف APK خالص قابل للإرسال والمشاركة على تيليجرام وميديا فاير:
              </p>
            </div>

            <div className="space-y-4">
              
              <div className="flex items-start gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white">حمّل ملف المشروع (.swb)</h4>
                  <p className="text-xs text-slate-400">
                    حمّل ملف <code className="text-amber-400 bg-slate-900 px-2 py-0.5 rounded">LootPlay_v6.4.0_rc05_minApi26.swb</code> من زر التحميل أدناه.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white">انقل الملف لمجلد النسخ الاحتياطية في الهاتف</h4>
                  <p className="text-xs text-slate-400">
                    باستخدام مدير الملفات، انقل الملف الذي حملته إلى المسار: <code className="text-emerald-400 bg-slate-900 px-2 py-0.5 rounded">/sdcard/.sketchware/backups/</code>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white">افتح Sketchware Pro واضغط Restore Project</h4>
                  <p className="text-xs text-slate-400">
                    افتح تطبيق Sketchware Pro v6.4.0-rc05 في هاتفك واضغط على القائمة ثم Restore Project واختر الملف.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  4
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white">اضغط زر تشغيل (RUN) لتوليد وتثبيت الـ APK</h4>
                  <p className="text-xs text-slate-400">
                    افتح المشروع واضغط على زر <strong>RUN</strong> في الأسفل ليقوم Sketchware ببناء وتجميع ملف الـ APK وتثبيته مباشرة على هاتفك!
                  </p>
                </div>
              </div>

            </div>

            {/* Direct SWB & Direct Zip Download buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/PubgRewards_v1.0.swb"
                download="PubgRewards_v1.0.swb"
                className="py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>تحميل ملف (PubgRewards_v1.0.swb)</span>
              </a>

              <a
                href="/Sketchware_Data_Direct_Copy.zip"
                download="Sketchware_Data_Direct_Copy.zip"
                className="py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>تحميل مجلد البيانات المباشر (Direct Zip)</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: Free Online PWA Builder to APK */}
      {activeInstallTab === 'apkbuilder' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>توليد ملف APK موقّع وجاهز مجاناً بنقرة واحدة (PWABuilder من Microsoft):</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                أداة <strong>PWABuilder</strong> التابعة لشركة مايكروسوفت تقوم بتحويل أي تطبيق ويب إلى ملف <strong>APK / AAB</strong> أصلي لنشره على متجر Google Play أو تثبيته على هاتفك مباشرة!
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="text-slate-300 font-bold">1. انسخ رابط تطبيقك المباشر:</div>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={appUrl} 
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-300 font-mono outline-none"
                  />
                  <button 
                    onClick={handleCopyUrl}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                  >
                    {copiedUrl ? 'تم النسخ' : 'نسخ'}
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <div className="font-bold">2. افتح موقع PWABuilder واضغط Start:</div>
                <p className="text-slate-400">
                  الصق الرابط واضغط "Package for Stores" ثم اختر "Android" واضغط <strong>Download Package (APK)</strong>!
                </p>
              </div>

              <a
                href={`https://www.pwabuilder.com/?site=${encodeURIComponent(appUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>فتح أداة PWABuilder وتنزيل الـ APK 🚀</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
