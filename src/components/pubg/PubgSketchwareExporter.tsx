import React, { useState } from 'react';
import { usePubgApp } from '../../context/PubgAppContext';
import { 
  Download, 
  FolderArchive, 
  Copy, 
  Check, 
  Code2, 
  Smartphone, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  FileCode,
  PackageCheck
} from 'lucide-react';

export const PubgSketchwareExporter: React.FC = () => {
  const { ownerSettings } = usePubgApp();
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [selectedCodeTab, setSelectedCodeTab] = useState<'main' | 'referral' | 'shop' | 'admob' | 'manifest'>('referral');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(id);
    setTimeout(() => setCopiedTab(null), 2500);
  };

  const mainJava = `package com.lootplay.rewards;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.firebase.auth.FirebaseAuth;

public class MainActivity extends AppCompatActivity {
    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        mAuth = FirebaseAuth.getInstance();

        // 1. Anti-VPN Check (حماية من التلاعب بالإحالات)
        if (isVpnConnected()) {
            Toast.makeText(this, "⚠️ لا يُسمح بتشغيل الـ VPN في التطبيق!", Toast.LENGTH_LONG).show();
            finishAffinity();
            return;
        }

        // 2. Auto Login with Firebase
        new Handler().postDelayed(() -> {
            if (mAuth.getCurrentUser() != null) {
                startActivity(new Intent(MainActivity.this, ReferralActivity.class));
            } else {
                mAuth.signInAnonymously().addOnCompleteListener(task -> {
                    startActivity(new Intent(MainActivity.this, ReferralActivity.class));
                    finish();
                });
            }
        }, 1200);
    }

    private boolean isVpnConnected() {
        try {
            ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                Network network = cm.getActiveNetwork();
                NetworkCapabilities capabilities = cm.getNetworkCapabilities(network);
                return capabilities != null && capabilities.hasTransport(NetworkCapabilities.TRANSPORT_VPN);
            }
        } catch (Exception ignored) {}
        return false;
    }
}`;

  const referralJava = `package com.lootplay.rewards;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class ReferralActivity extends AppCompatActivity {
    private TextView tvPoints, tvCode, tvInvitesCount;
    private Button btnCopy, btnShareWhatsapp, btnOpenShop;
    private DatabaseReference userRef;
    private InterstitialAd mInterstitialAd;
    private String myReferralCode = "";
    private int myPoints = 0;
    private final String INTERSTITIAL_ID = "${ownerSettings.admobInterstitialId}";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.referral);

        String uid = FirebaseAuth.getInstance().getCurrentUser().getUid();
        userRef = FirebaseDatabase.getInstance().getReference("users").child(uid);

        tvPoints = findViewById(R.id.tv_points);
        tvCode = findViewById(R.id.tv_referral_code);
        tvInvitesCount = findViewById(R.id.tv_invites_count);
        btnCopy = findViewById(R.id.btn_copy_code);
        btnShareWhatsapp = findViewById(R.id.btn_share_whatsapp);
        btnOpenShop = findViewById(R.id.btn_open_shop);

        loadAdMobInterstitial();

        // Listen for Realtime Points & Invites
        userRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.child("referralCode").exists()) {
                    myReferralCode = snapshot.child("referralCode").getValue(String.class);
                } else {
                    myReferralCode = "PUBG" + (100 + (int)(Math.random() * 900));
                    userRef.child("referralCode").setValue(myReferralCode);
                }

                myPoints = snapshot.child("points").exists() ? snapshot.child("points").getValue(Integer.class) : 0;
                int totalInvites = snapshot.child("invitesCount").exists() ? snapshot.child("invitesCount").getValue(Integer.class) : 0;

                tvCode.setText(myReferralCode);
                tvPoints.setText(myPoints + " pt");
                tvInvitesCount.setText(totalInvites + " صديق");
            }
            @Override
            public void onCancelled(@NonNull DatabaseError error) {}
        });

        btnCopy.setOnClickListener(v -> {
            ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
            cm.setPrimaryClip(ClipData.newPlainText("PUBG Referral Code", myReferralCode));
            Toast.makeText(this, "تم نسخ كود الدعوة بنجاح!", Toast.LENGTH_SHORT).show();
            showInterstitialIfReady();
        });

        btnShareWhatsapp.setOnClickListener(v -> {
            String msg = "🔥 اشحن شدات ببجي مجاناً بأكواد رسمية! كود الدعوة الخاص بي: [" + myReferralCode + "] حمل التطبيق الآن واستلم شداتك!";
            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType("text/plain");
            intent.putExtra(Intent.EXTRA_TEXT, msg);
            intent.setPackage("com.whatsapp");
            try {
                startActivity(intent);
            } catch (Exception e) {
                startActivity(Intent.createChooser(intent, "مشاركة عبر"));
            }
            showInterstitialIfReady();
        });

        btnOpenShop.setOnClickListener(v -> {
            startActivity(new Intent(this, PubgShopActivity.class));
            showInterstitialIfReady();
        });
    }

    private void loadAdMobInterstitial() {
        InterstitialAd.load(this, INTERSTITIAL_ID, new AdRequest.Builder().build(), new InterstitialAdLoadCallback() {
            @Override
            public void onAdLoaded(@NonNull InterstitialAd ad) {
                mInterstitialAd = ad;
            }
        });
    }

    private void showInterstitialIfReady() {
        if (mInterstitialAd != null) {
            mInterstitialAd.show(this);
            loadAdMobInterstitial(); // Preload next ad
        }
    }
}`;

  const shopJava = `package com.lootplay.rewards;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import java.util.HashMap;

public class PubgShopActivity extends AppCompatActivity {
    private RewardedAd rewardedAd;
    private DatabaseReference userRef;
    private String uid;
    private final String REWARDED_AD_ID = "${ownerSettings.admobRewardedId}";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pubg_shop);

        uid = FirebaseAuth.getInstance().getCurrentUser().getUid();
        userRef = FirebaseDatabase.getInstance().getReference("users").child(uid);

        loadRewardedAd();

        // Button: Buy 60 UC (300 Points)
        findViewById(R.id.btn_buy_60_uc).setOnClickListener(v -> handleBuyCode(60, 300));

        // Button: Buy 325 UC (1500 Points)
        findViewById(R.id.btn_buy_325_uc).setOnClickListener(v -> handleBuyCode(325, 1500));

        // Button: Buy 660 UC Royale Pass (3000 Points)
        findViewById(R.id.btn_buy_660_uc).setOnClickListener(v -> handleBuyCode(660, 3000));
    }

    private void handleBuyCode(int ucAmount, int requiredPoints) {
        if (rewardedAd != null) {
            rewardedAd.show(this, item -> {
                // Generate Midasbuy Redeem Voucher
                String code = "MDB-PUBG-" + ucAmount + "-" + (int)(1000 + Math.random() * 9000);
                String pin = "" + (100000 + (int)(Math.random() * 900000));

                HashMap<String, Object> map = new HashMap<>();
                map.put("ucAmount", ucAmount);
                map.put("code", code);
                map.put("pin", pin);
                map.put("timestamp", System.currentTimeMillis());

                FirebaseDatabase.getInstance().getReference("claimed_codes").child(uid).push().setValue(map);

                Toast.makeText(this, "🎉 تم استلام كود " + ucAmount + " UC بنجاح! كودك: " + code, Toast.LENGTH_LONG).show();
                loadRewardedAd();
            });
        } else {
            Toast.makeText(this, "⏳ جاري تحميل إعلان الشدات، حاول مجدداً...", Toast.LENGTH_SHORT).show();
            loadRewardedAd();
        }
    }

    private void loadRewardedAd() {
        RewardedAd.load(this, REWARDED_AD_ID, new AdRequest.Builder().build(), new RewardedAdLoadCallback() {
            @Override
            public void onAdLoaded(@NonNull RewardedAd ad) {
                rewardedAd = ad;
            }
        });
    }
}`;

  const manifestXml = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.lootplay.rewards">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="LootPlay PUBG UC"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar">

        <!-- AdMob App ID -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="${ownerSettings.admobAppId}"/>

        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android:name=".ReferralActivity" />
        <activity android:name=".PubgShopActivity" />

    </application>
</manifest>`;

  const getCodeSnippet = () => {
    switch (selectedCodeTab) {
      case 'main': return mainJava;
      case 'referral': return referralJava;
      case 'shop': return shopJava;
      case 'manifest': return manifestXml;
      default: return referralJava;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Mega Hero Download Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/50 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black">
            <PackageCheck className="w-4 h-4 text-amber-400" />
            <span>Sketchware Pro v6.4.0-rc05-minApi26 (com.sketchware.remod)</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white">
            📥 تحميل مشروع شدات ببجي كامل بصيغة (.SWB)
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            تم ضبط ملف المشروع بالكامل ليعمل بنظام <strong>النقاط عبر الدعوات فقط</strong> مع ربط إعلانات AdMob البينية والمكافأة وحماية الـ VPN. جاهز للاستيراد في تطبيق Sketchware Pro وتثبيت الـ APK على هاتفك فوراً!
          </p>

          {/* Download Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            
            <a
              href="/LootPlay_v6.4.0_rc05_minApi26.swb"
              download="LootPlay_v6.4.0_rc05_minApi26.swb"
              className="px-6 sm:px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/30 flex items-center gap-2.5 active:scale-95 border border-amber-300"
            >
              <Download className="w-5 h-5" />
              <span>تحميل ملف الاستعادة (LootPlay_v6.4.0_rc05_minApi26.swb)</span>
            </a>

            <a
              href="/601_LootPlay_Data.zip"
              download="601_LootPlay_Data.zip"
              className="px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all border border-slate-700 flex items-center gap-2 active:scale-95"
            >
              <FolderArchive className="w-4 h-4 text-emerald-400" />
              <span>حزمة بيانات المجلد (data/601.zip)</span>
            </a>

          </div>

          {/* Quick Notice */}
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/20 max-w-3xl">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              مسار النسخ في هاتفك: انقل الملف إلى <code className="bg-slate-950 px-2 py-0.5 rounded text-emerald-400 font-mono">/sdcard/.sketchware/backups/</code> وافتح Sketchware واضغط Restore Project.
            </span>
          </div>

        </div>
      </div>

      {/* Code Inspector for Sketchware Pro ASD (Add Source Directly) */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-white font-black text-base">
            <Code2 className="w-5 h-5 text-amber-400" />
            <span>أكواد الجافا والـ Manifest الجاهزة للنسخ في Sketchware Pro</span>
          </div>

          <button
            onClick={() => handleCopy(getCodeSnippet(), selectedCodeTab)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-md active:scale-90"
          >
            {copiedTab === selectedCodeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-slate-950" />
                <span>تم النسخ بنجاح!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ الكود الحالي</span>
              </>
            )}
          </button>
        </div>

        {/* Sub tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCodeTab('referral')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCodeTab === 'referral' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            ReferralActivity.java (نظام الإحالات ونقاط الدعوات)
          </button>

          <button
            onClick={() => setSelectedCodeTab('shop')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCodeTab === 'shop' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            PubgShopActivity.java (متجر شدات ببجي وإعلانات المكافأة)
          </button>

          <button
            onClick={() => setSelectedCodeTab('main')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCodeTab === 'main' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            MainActivity.java (شاشة البداية وكشف الـ VPN)
          </button>

          <button
            onClick={() => setSelectedCodeTab('manifest')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCodeTab === 'manifest' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            AndroidManifest.xml
          </button>
        </div>

        {/* Code Viewer */}
        <div className="relative bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto max-h-96 text-xs font-mono text-emerald-400 leading-relaxed dir-ltr text-left">
          <pre>{getCodeSnippet()}</pre>
        </div>
      </div>

    </div>
  );
};
