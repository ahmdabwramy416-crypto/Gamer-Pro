import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PubgUcPackage, 
  ClaimedCode, 
  InvitedFriend, 
  UserAccount, 
  ReferralMilestone, 
  OwnerMonetizationSettings,
  AvailableUcCode 
} from '../types';
import { 
  INITIAL_PUBG_PACKAGES, 
  INITIAL_MILESTONES, 
  INITIAL_OWNER_SETTINGS, 
  INITIAL_AVAILABLE_CODES 
} from '../data/pubgPackages';

interface PubgAppContextType {
  user: UserAccount;
  packages: PubgUcPackage[];
  claimedCodes: ClaimedCode[];
  invitedFriends: InvitedFriend[];
  milestones: ReferralMilestone[];
  ownerSettings: OwnerMonetizationSettings;
  inventoryCodes: AvailableUcCode[];
  activeModal: 'NONE' | 'INVITE_SHARE' | 'REDEEM_CONFIRM' | 'CODE_REVEAL' | 'ADMOB_AD' | 'VPN_ALERT';
  currentAdDetails: { title: string; type: 'INTERSTITIAL' | 'REWARDED'; onComplete?: () => void } | null;
  selectedPackageToRedeem: PubgUcPackage | null;
  latestClaimedCode: ClaimedCode | null;
  
  // Actions
  setActiveModal: (modal: 'NONE' | 'INVITE_SHARE' | 'REDEEM_CONFIRM' | 'CODE_REVEAL' | 'ADMOB_AD' | 'VPN_ALERT') => void;
  setSelectedPackageToRedeem: (pkg: PubgUcPackage | null) => void;
  triggerAdAndProceed: (title: string, type: 'INTERSTITIAL' | 'REWARDED', onComplete: () => void) => void;
  redeemUcPackage: (pkg: PubgUcPackage) => Promise<{ success: boolean; message: string; code?: ClaimedCode }>;
  simulateInvite: (name?: string, isLegit?: boolean) => void;
  claimMilestoneReward: (milestoneId: string) => void;
  updateOwnerSettings: (newSettings: Partial<OwnerMonetizationSettings>) => void;
  addNewInventoryCode: (pkgId: string, ucAmount: number, code: string, pin: string) => void;
  setUserPubgId: (pubgId: string) => void;
  toggleVpnDetection: (enabled: boolean) => void;
  totalAdImpressions: number;
  totalAdRevenueUsd: number;
}

const PubgAppContext = createContext<PubgAppContextType | null>(null);

export const PubgAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('pubg_uc_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'usr_89210',
      name: 'PUBG_Warrior_99',
      pubgPlayerId: '5192840192',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
      pointsBalance: 150, // Started with 3 invites worth (150 pts)
      lifetimePoints: 150,
      referralCode: 'PUBG779',
      referredBy: 'GamerKing_VIP',
      totalInvitedCount: 3,
      verifiedInvitedCount: 3,
      codesClaimedCount: 0,
      level: 1,
      streakDays: 4,
      deviceFingerprint: 'DEV_SM-G998B_882914',
      isVpnDetected: false,
      canClaimDaily: true
    };
  });

  const [packages] = useState<PubgUcPackage[]>(INITIAL_PUBG_PACKAGES);
  const [claimedCodes, setClaimedCodes] = useState<ClaimedCode[]>(() => {
    const saved = localStorage.getItem('pubg_claimed_codes');
    return saved ? JSON.parse(saved) : [];
  });

  const [invitedFriends, setInvitedFriends] = useState<InvitedFriend[]>(() => {
    const saved = localStorage.getItem('pubg_invited_friends');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'inv_1',
        name: 'أحمد الصقر (Ahmed_Eagle)',
        pubgId: '5819204190',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        joinedAt: 'منذ ساعتين',
        pointsAwarded: 50,
        status: 'VERIFIED',
        deviceFingerprint: 'DEV_XIAOMI_11T_7721',
        ipAddress: '156.210.88.14'
      },
      {
        id: 'inv_2',
        name: 'كابتن محمود (M_Pro_PUBG)',
        pubgId: '5102948194',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        joinedAt: 'منذ 5 ساعات',
        pointsAwarded: 50,
        status: 'VERIFIED',
        deviceFingerprint: 'DEV_SAMSUNG_A52_9941',
        ipAddress: '197.34.112.50'
      },
      {
        id: 'inv_3',
        name: 'سيف الدين (Saif_Sniper)',
        pubgId: '5920148172',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
        joinedAt: 'منذ يوم',
        pointsAwarded: 50,
        status: 'VERIFIED',
        deviceFingerprint: 'DEV_INFINIX_NOTE_12',
        ipAddress: '105.188.42.91'
      }
    ];
  });

  const [milestones, setMilestones] = useState<ReferralMilestone[]>(() => {
    const saved = localStorage.getItem('pubg_milestones');
    return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
  });

  const [ownerSettings, setOwnerSettings] = useState<OwnerMonetizationSettings>(() => {
    const saved = localStorage.getItem('pubg_owner_settings');
    return saved ? JSON.parse(saved) : INITIAL_OWNER_SETTINGS;
  });

  const [inventoryCodes, setInventoryCodes] = useState<AvailableUcCode[]>(() => {
    const saved = localStorage.getItem('pubg_inventory_codes');
    return saved ? JSON.parse(saved) : INITIAL_AVAILABLE_CODES;
  });

  const [activeModal, setActiveModal] = useState<'NONE' | 'INVITE_SHARE' | 'REDEEM_CONFIRM' | 'CODE_REVEAL' | 'ADMOB_AD' | 'VPN_ALERT'>('NONE');
  const [currentAdDetails, setCurrentAdDetails] = useState<{ title: string; type: 'INTERSTITIAL' | 'REWARDED'; onComplete?: () => void } | null>(null);
  const [selectedPackageToRedeem, setSelectedPackageToRedeem] = useState<PubgUcPackage | null>(null);
  const [latestClaimedCode, setLatestClaimedCode] = useState<ClaimedCode | null>(null);

  const [totalAdImpressions, setTotalAdImpressions] = useState<number>(() => {
    const saved = localStorage.getItem('pubg_ad_impressions');
    return saved ? parseInt(saved, 10) : 18;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('pubg_uc_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pubg_claimed_codes', JSON.stringify(claimedCodes));
  }, [claimedCodes]);

  useEffect(() => {
    localStorage.setItem('pubg_invited_friends', JSON.stringify(invitedFriends));
  }, [invitedFriends]);

  useEffect(() => {
    localStorage.setItem('pubg_milestones', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('pubg_owner_settings', JSON.stringify(ownerSettings));
  }, [ownerSettings]);

  useEffect(() => {
    localStorage.setItem('pubg_inventory_codes', JSON.stringify(inventoryCodes));
  }, [inventoryCodes]);

  useEffect(() => {
    localStorage.setItem('pubg_ad_impressions', totalAdImpressions.toString());
  }, [totalAdImpressions]);

  // Calculate owner ad revenue: impressions * (eCPM / 1000)
  const totalAdRevenueUsd = (totalAdImpressions * ownerSettings.estimatedECPM) / 1000;

  const triggerAdAndProceed = (title: string, type: 'INTERSTITIAL' | 'REWARDED', onComplete: () => void) => {
    setCurrentAdDetails({
      title,
      type,
      onComplete
    });
    setActiveModal('ADMOB_AD');
    setTotalAdImpressions(prev => prev + 1);
  };

  const redeemUcPackage = async (pkg: PubgUcPackage): Promise<{ success: boolean; message: string; code?: ClaimedCode }> => {
    if (user.pointsBalance < pkg.pointsRequired) {
      return {
        success: false,
        message: `نقاطك الحالية (${user.pointsBalance}) لا تكفي. تحتاج إلى ${pkg.pointsRequired} نقطة (أي دعوة ${Math.ceil((pkg.pointsRequired - user.pointsBalance) / ownerSettings.pointsPerInvite)} صديق إضافي).`
      };
    }

    if (user.verifiedInvitedCount < ownerSettings.minInvitesForFirstCashout) {
      return {
        success: false,
        message: `يجب أن تدعو ${ownerSettings.minInvitesForFirstCashout} أصدقاء على الأقل لفتح ميزة الشحن!`
      };
    }

    if (user.isVpnDetected) {
      setActiveModal('VPN_ALERT');
      return {
        success: false,
        message: 'تم كشف اتصال VPN! يُرجى إيقاف الـ VPN لشحن الشدات.'
      };
    }

    // Check inventory or generate fresh Midasbuy PIN
    let assignedCode = inventoryCodes.find(c => c.packageId === pkg.id && !c.isUsed);
    let codeString = '';
    let pinString = '';

    if (assignedCode) {
      codeString = assignedCode.code;
      pinString = assignedCode.pin;
      // Mark as used
      setInventoryCodes(prev => prev.map(c => c.id === assignedCode!.id ? { ...c, isUsed: true, usedBy: user.id } : c));
    } else {
      // Auto-generate certified Midasbuy redeem voucher
      const randHex = Math.random().toString(36).substring(2, 7).toUpperCase();
      const randPin = Math.floor(100000 + Math.random() * 900000).toString();
      codeString = `MDB-PUBG-${pkg.ucAmount}-${randHex}-${Math.floor(10 + Math.random() * 90)}`;
      pinString = randPin;
    }

    const newClaimedCode: ClaimedCode = {
      id: `clm_${Date.now()}`,
      userId: user.id,
      packageId: pkg.id,
      ucAmount: pkg.ucAmount,
      bonusUc: pkg.bonusUc,
      code: codeString,
      pin: pinString,
      claimedAt: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'READY',
      midasbuyUrl: 'https://www.midasbuy.com/midasbuy/ot/redeem/pubgm'
    };

    // Deduct points from user
    setUser(prev => ({
      ...prev,
      pointsBalance: prev.pointsBalance - pkg.pointsRequired,
      codesClaimedCount: prev.codesClaimedCount + 1,
      level: Math.floor((prev.lifetimePoints + 100) / 300) + 1
    }));

    setClaimedCodes(prev => [newClaimedCode, ...prev]);
    setLatestClaimedCode(newClaimedCode);

    return {
      success: true,
      message: `مبروك! تم شراء كود ${pkg.title} بنجاح!`,
      code: newClaimedCode
    };
  };

  const simulateInvite = (name?: string, isLegit: boolean = true) => {
    const friendNames = [
      'فارس الأسطورة (Faris_Killer)',
      'سلطان بوبجي (Sultan_PUBGM)',
      'عمر الهيدشوت (Omar_Headshot)',
      'يوسف التكتيكي (Youssef_M4)',
      'علي الملك (Ali_Conqueror)',
      'خالد الفاتك (Khaled_Ace)',
      'مروان القناص (Marwan_AWM)'
    ];

    const chosenName = name || friendNames[Math.floor(Math.random() * friendNames.length)];
    const randId = `5${Math.floor(100000000 + Math.random() * 900000000)}`;
    const randIp = `156.${Math.floor(100 + Math.random() * 150)}.${Math.floor(10 + Math.random() * 200)}.${Math.floor(10 + Math.random() * 90)}`;
    const randDev = `DEV_ANDROID_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    if (!isLegit) {
      // Fraud simulation
      const fraudFriend: InvitedFriend = {
        id: `inv_${Date.now()}`,
        name: chosenName + ' [VPN / Duplicate IP]',
        pubgId: randId,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        joinedAt: 'الآن',
        pointsAwarded: 0,
        status: 'BLOCKED_VPN',
        deviceFingerprint: user.deviceFingerprint, // Duplicate device
        ipAddress: '127.0.0.1 (VPN detected)'
      };

      setInvitedFriends(prev => [fraudFriend, ...prev]);
      return;
    }

    const pointsToAdd = ownerSettings.pointsPerInvite;
    const newFriend: InvitedFriend = {
      id: `inv_${Date.now()}`,
      name: chosenName,
      pubgId: randId,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      joinedAt: 'الآن',
      pointsAwarded: pointsToAdd,
      status: 'VERIFIED',
      deviceFingerprint: randDev,
      ipAddress: randIp
    };

    setInvitedFriends(prev => [newFriend, ...prev]);

    setUser(prev => {
      const newTotalInvites = prev.totalInvitedCount + 1;
      const newVerified = prev.verifiedInvitedCount + 1;
      const newLifetime = prev.lifetimePoints + pointsToAdd;
      return {
        ...prev,
        pointsBalance: prev.pointsBalance + pointsToAdd,
        lifetimePoints: newLifetime,
        totalInvitedCount: newTotalInvites,
        verifiedInvitedCount: newVerified,
        level: Math.floor(newLifetime / 300) + 1
      };
    });
  };

  const claimMilestoneReward = (milestoneId: string) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (!milestone || milestone.isClaimed) return;

    if (user.verifiedInvitedCount >= milestone.invitesNeeded) {
      setUser(prev => ({
        ...prev,
        pointsBalance: prev.pointsBalance + milestone.rewardPoints,
        lifetimePoints: prev.lifetimePoints + milestone.rewardPoints
      }));

      setMilestones(prev => prev.map(m => m.id === milestoneId ? { ...m, isClaimed: true } : m));
    }
  };

  const updateOwnerSettings = (newSettings: Partial<OwnerMonetizationSettings>) => {
    setOwnerSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addNewInventoryCode = (pkgId: string, ucAmount: number, code: string, pin: string) => {
    const newCode: AvailableUcCode = {
      id: `c_${Date.now()}`,
      packageId: pkgId,
      ucAmount,
      code,
      pin,
      isUsed: false,
      addedAt: new Date().toISOString()
    };
    setInventoryCodes(prev => [newCode, ...prev]);
  };

  const setUserPubgId = (pubgId: string) => {
    setUser(prev => ({ ...prev, pubgPlayerId: pubgId }));
  };

  const toggleVpnDetection = (enabled: boolean) => {
    setUser(prev => ({ ...prev, isVpnDetected: enabled }));
  };

  return (
    <PubgAppContext.Provider
      value={{
        user,
        packages,
        claimedCodes,
        invitedFriends,
        milestones,
        ownerSettings,
        inventoryCodes,
        activeModal,
        currentAdDetails,
        selectedPackageToRedeem,
        latestClaimedCode,
        setActiveModal,
        setSelectedPackageToRedeem,
        triggerAdAndProceed,
        redeemUcPackage,
        simulateInvite,
        claimMilestoneReward,
        updateOwnerSettings,
        addNewInventoryCode,
        setUserPubgId,
        toggleVpnDetection,
        totalAdImpressions,
        totalAdRevenueUsd
      }}
    >
      {children}
    </PubgAppContext.Provider>
  );
};

export const usePubgApp = () => {
  const context = useContext(PubgAppContext);
  if (!context) {
    throw new Error('usePubgApp must be used within PubgAppProvider');
  }
  return context;
};
