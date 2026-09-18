const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function buildPubgReferralRemodSwb() {
  console.log('Building PUBG UC Invitation Rewards .swb for Sketchware Pro v6.4.0-rc05-minApi26 (com.sketchware.remod)...');

  const zip = new JSZip();

  // 1. PROJECT config
  const project = {
    sc_id: "601",
    my_ws_name: "PubgUcRewards",
    my_app_name: "شدات ببجي مجاناً - PUBG UC",
    my_pkg_name: "com.pubguc.rewards",
    sc_ver_code: "1",
    sc_ver_name: "1.0",
    color_primary: "-16744320",
    color_primary_dark: "-16755648",
    color_accent: "-16711936",
    color_control_normal: "-570425344",
    color_control_highlight: "536870912",
    min_sdk: "26",
    target_sdk: "34",
    sketchware_ver: "v6.4.0-rc05-minApi26",
    sketchware_remod: true,
    custom_icon: false,
    app_pkg_name: "com.sketchware.remod"
  };

  // 2. FILE list (Activities)
  const file = [
    {
      fileName: "main",
      activityName: "MainActivity",
      fileType: 0,
      keyboardSetting: 0,
      orientation: 1,
      title: "PUBG UC Splash & Anti-VPN",
      statusBar: true,
      toolbar: false,
      drawer: false,
      fab: false
    },
    {
      fileName: "referral",
      activityName: "ReferralActivity",
      fileType: 0,
      keyboardSetting: 0,
      orientation: 1,
      title: "دعوة الأصدقاء وجمع النقاط",
      statusBar: true,
      toolbar: false,
      drawer: false,
      fab: false
    },
    {
      fileName: "pubg_shop",
      activityName: "PubgShopActivity",
      fileType: 0,
      keyboardSetting: 0,
      orientation: 1,
      title: "متجر شحن شدات ببجي",
      statusBar: true,
      toolbar: false,
      drawer: false,
      fab: false
    }
  ];

  // 3. LIBRARY config
  const library = {
    firebase: {
      useFirebase: true,
      apiKey: "AIzaSyFakeKeyForPubgUcRewards12345",
      appId: "1:643150272430:android:pubguc",
      projectId: "pubg-uc-rewards",
      storageBucket: "pubg-uc-rewards.appspot.com"
    },
    admob: {
      useAdmob: true,
      unitId: "ca-app-pub-3940256099942544/5224354917",
      appId: "ca-app-pub-3940256099942544~3347511713"
    },
    appcompat: {
      useAppcompat: true
    },
    material: {
      useMaterial: true
    }
  };

  // 4. VIEW layouts description
  const view = {
    main: [
      { id: "linear_splash", type: "LinearLayout", orientation: 1, width: -1, height: -1, background: "#090D16" },
      { id: "tv_logo", type: "TextView", text: "PUBG UC Rewards", textSize: 28, textColor: "#10B981" }
    ],
    referral: [
      { id: "linear_ref", type: "LinearLayout", orientation: 1, width: -1, height: -1, background: "#090D16" },
      { id: "tv_points", type: "TextView", text: "150 pt", textSize: 32, textColor: "#10B981" },
      { id: "tv_referral_code", type: "TextView", text: "PUBG779", textSize: 24, textColor: "#F59E0B" },
      { id: "btn_copy_code", type: "Button", text: "نسخ كود الدعوة" },
      { id: "btn_share_whatsapp", type: "Button", text: "مشاركة على واتساب" },
      { id: "btn_open_shop", type: "Button", text: "فتح متجر الشدات" }
    ],
    pubg_shop: [
      { id: "linear_shop", type: "LinearLayout", orientation: 1, width: -1, height: -1, background: "#090D16" },
      { id: "btn_buy_60_uc", type: "Button", text: "شحن 60 شدة (300 نقطة)" },
      { id: "btn_buy_325_uc", type: "Button", text: "شحن 325 شدة (1500 نقطة)" },
      { id: "btn_buy_660_uc", type: "Button", text: "شحن 660 شدة رويال باس (3000 نقطة)" }
    ]
  };

  // Add files to root
  zip.file("project", JSON.stringify(project, null, 2));
  zip.file("file", JSON.stringify(file, null, 2));
  zip.file("library", JSON.stringify(library, null, 2));
  zip.file("view", JSON.stringify(view, null, 2));

  // Add files to data/
  const data = zip.folder("data");
  data.file("project", JSON.stringify(project, null, 2));
  data.file("file", JSON.stringify(file, null, 2));
  data.file("library", JSON.stringify(library, null, 2));
  data.file("view", JSON.stringify(view, null, 2));

  // Java Sources
  const src = zip.folder("src/com/lootplay/rewards");
  
  src.file("MainActivity.java", `package com.lootplay.rewards;

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

        if (isVpnConnected()) {
            Toast.makeText(this, "⚠️ لا يُسمح بتشغيل الـ VPN في التطبيق لمنع الغش!", Toast.LENGTH_LONG).show();
            finishAffinity();
            return;
        }

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
}`);

  src.file("ReferralActivity.java", `package com.lootplay.rewards;

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
    private final String INTERSTITIAL_ID = "ca-app-pub-3940256099942544/1033173712";

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
            loadAdMobInterstitial();
        }
    }
}`);

  src.file("PubgShopActivity.java", `package com.lootplay.rewards;

import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.FirebaseDatabase;
import java.util.HashMap;

public class PubgShopActivity extends AppCompatActivity {
    private RewardedAd rewardedAd;
    private String uid;
    private final String REWARDED_AD_ID = "ca-app-pub-3940256099942544/5224354917";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pubg_shop);

        uid = FirebaseAuth.getInstance().getCurrentUser().getUid();
        loadRewardedAd();

        findViewById(R.id.btn_buy_60_uc).setOnClickListener(v -> handleBuyCode(60, 300));
        findViewById(R.id.btn_buy_325_uc).setOnClickListener(v -> handleBuyCode(325, 1500));
        findViewById(R.id.btn_buy_660_uc).setOnClickListener(v -> handleBuyCode(660, 3000));
    }

    private void handleBuyCode(int ucAmount, int requiredPoints) {
        if (rewardedAd != null) {
            rewardedAd.show(this, item -> {
                String code = "MDB-PUBG-" + ucAmount + "-" + (int)(1000 + Math.random() * 9000);
                String pin = "" + (100000 + (int)(Math.random() * 900000));

                HashMap<String, Object> map = new HashMap<>();
                map.put("ucAmount", ucAmount);
                map.put("code", code);
                map.put("pin", pin);
                map.put("timestamp", System.currentTimeMillis());

                FirebaseDatabase.getInstance().getReference("claimed_codes").child(uid).push().setValue(map);

                Toast.makeText(this, "🎉 تم تسليم كود " + ucAmount + " UC بنجاح! كودك: " + code, Toast.LENGTH_LONG).show();
                loadRewardedAd();
            });
        } else {
            Toast.makeText(this, "⏳ جاري تحميل إعلان الشدات، انتظر ثوانٍ...", Toast.LENGTH_SHORT).show();
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
}`);

  zip.file("AndroidManifest.xml", `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.lootplay.rewards">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="شدات ببجي مجاناً"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar">

        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-3940256099942544~3347511713"/>

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
</manifest>`);

  if (!fs.existsSync("public")) {
    fs.mkdirSync("public", { recursive: true });
  }

  const content = await zip.generateAsync({ type: "nodebuffer" });
  fs.writeFileSync("public/LootPlay_v6.4.0_rc05_minApi26.swb", content);
  fs.writeFileSync("public/LootPlay_v6.4.0_rc05.swb", content);
  fs.writeFileSync("public/LootPlay_Rewards.swb", content);
  fs.writeFileSync("public/601_LootPlay_Data.zip", content);

  console.log("✅ New PUBG UC Referral .swb generated for Sketchware Pro v6.4.0-rc05-minApi26!");
}

buildPubgReferralRemodSwb().catch(console.error);
