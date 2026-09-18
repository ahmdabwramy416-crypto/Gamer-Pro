import { PubgUcPackage, ReferralMilestone, AvailableUcCode, OwnerMonetizationSettings } from '../types';

export const INITIAL_PUBG_PACKAGES: PubgUcPackage[] = [
  {
    id: 'uc_60',
    ucAmount: 60,
    bonusUc: 0,
    title: '60 شدة ببجي (60 UC)',
    pointsRequired: 300,
    invitesRequired: 6, // 6 invites * 50 pts
    approxUsdValue: 0.99,
    badge: 'الأكثر طلباً',
    iconColor: '#10B981',
    isPopular: true,
    description: 'كود شحن رسمي وفوري لـ 60 شدة في ببجي موبايل عبر Midasbuy.'
  },
  {
    id: 'uc_325',
    ucAmount: 300,
    bonusUc: 25,
    title: '325 شدة (300 + 25 مجاناً)',
    pointsRequired: 1500,
    invitesRequired: 30, // 30 invites * 50 pts
    approxUsdValue: 4.99,
    badge: 'قيمة ممتازة',
    iconColor: '#3B82F6',
    isPopular: false,
    description: 'كود رقمي لشحن 325 UC، يكفي لفتح الصناديق وعجلات الحظ المميزة.'
  },
  {
    id: 'uc_660',
    ucAmount: 600,
    bonusUc: 60,
    title: '660 شدة (بطاقة الرويال باس Royale Pass)',
    pointsRequired: 3000,
    invitesRequired: 60, // 60 invites * 50 pts
    approxUsdValue: 9.99,
    badge: '👑 بطاقة رويال باس',
    iconColor: '#F59E0B',
    isPopular: true,
    description: 'كود لشحن 660 UC يكفي لتفعيل الرويال باس (Elite Pass) الحالي فوراً!'
  },
  {
    id: 'uc_1800',
    ucAmount: 1500,
    bonusUc: 300,
    title: '1,800 شدة (1500 + 300 مجاناً)',
    pointsRequired: 7500,
    invitesRequired: 150,
    approxUsdValue: 24.99,
    badge: 'حزمة الصقور',
    iconColor: '#8B5CF6',
    isPopular: false,
    description: 'حزمة كبرى للمحترفين لتطوير أسلحة الميثك (M416 الجليدي) وعجلات الرويال.'
  },
  {
    id: 'uc_3850',
    ucAmount: 3000,
    bonusUc: 850,
    title: '3,850 شدة (حزمة كبار الشخصيات VIP)',
    pointsRequired: 15000,
    invitesRequired: 300,
    approxUsdValue: 49.99,
    badge: '💎 VIP Pack',
    iconColor: '#EC4899',
    isPopular: false,
    description: 'أضخم حزمة مكافآت مع كود تفعيل فوري معتمد من Midasbuy.'
  }
];

export const INITIAL_MILESTONES: ReferralMilestone[] = [
  {
    id: 'm_1',
    invitesNeeded: 3,
    rewardPoints: 50,
    title: 'بداية المحارب 🥉',
    description: 'ادعُ 3 من أصدقائك واحصل على 50 نقطة إضافية كهدية فورية!',
    isClaimed: false
  },
  {
    id: 'm_2',
    invitesNeeded: 10,
    rewardPoints: 200,
    title: 'قائد الفريق 🥈',
    description: 'ادعُ 10 أصدقاء واحصل على 200 نقطة بونص لتقترب من شداتك!',
    isClaimed: false
  },
  {
    id: 'm_3',
    invitesNeeded: 25,
    rewardPoints: 600,
    title: 'بطل الرويال باس 🥇',
    description: 'ادعُ 25 صديقاً واحصل على 600 نقطة إضافية فوراً!',
    isClaimed: false
  },
  {
    id: 'm_4',
    invitesNeeded: 50,
    rewardPoints: 1500,
    title: 'ملك الشدات الأسطوري 👑',
    description: 'ادعُ 50 صديقاً واحصل على 1500 نقطة مجانية تكفي لـ 300 شدة إضافية!',
    isClaimed: false
  }
];

export const INITIAL_OWNER_SETTINGS: OwnerMonetizationSettings = {
  pointsPerInvite: 50,
  minInvitesForFirstCashout: 3,
  admobAppId: 'ca-app-pub-3940256099942544~3347511713',
  admobBannerId: 'ca-app-pub-3940256099942544/6300978111',
  admobInterstitialId: 'ca-app-pub-3940256099942544/1033173712',
  admobRewardedId: 'ca-app-pub-3940256099942544/5224354917',
  unityGameId: '5482910',
  adsPerInviteCycle: 4, // 4 ads shown per user activity (open, invite, claim, view code)
  estimatedECPM: 8.50, // $8.50 per 1000 ad impressions
  shortlinkLockEnabled: true,
  autoApproveCodes: true,
  antiVpnEnabled: true,
  antiDuplicateDeviceEnabled: true
};

export const INITIAL_AVAILABLE_CODES: AvailableUcCode[] = [
  {
    id: 'c_1',
    packageId: 'uc_60',
    ucAmount: 60,
    code: 'MDB-PUBG-60-XY892-KL41',
    pin: '782914',
    isUsed: false,
    addedAt: new Date().toISOString()
  },
  {
    id: 'c_2',
    packageId: 'uc_60',
    ucAmount: 60,
    code: 'MDB-PUBG-60-AQ715-MN90',
    pin: '349102',
    isUsed: false,
    addedAt: new Date().toISOString()
  },
  {
    id: 'c_3',
    packageId: 'uc_325',
    ucAmount: 325,
    code: 'MDB-PUBG-325-TR662-VV88',
    pin: '901248',
    isUsed: false,
    addedAt: new Date().toISOString()
  },
  {
    id: 'c_4',
    packageId: 'uc_660',
    ucAmount: 660,
    code: 'MDB-PUBG-660-RP994-ELITE',
    pin: '615290',
    isUsed: false,
    addedAt: new Date().toISOString()
  }
];
