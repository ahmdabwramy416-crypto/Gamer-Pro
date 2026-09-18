export interface PubgUcPackage {
  id: string;
  ucAmount: number;
  bonusUc: number;
  title: string;
  pointsRequired: number;
  invitesRequired: number; // e.g. 50 pts per invite -> pointsRequired / 50
  approxUsdValue: number;
  badge?: string;
  iconColor: string;
  isPopular?: boolean;
  description: string;
}

export interface ClaimedCode {
  id: string;
  userId: string;
  packageId: string;
  ucAmount: number;
  bonusUc: number;
  code: string;
  pin: string;
  claimedAt: string;
  status: 'READY' | 'REDEEMED' | 'EXPIRED';
  midasbuyUrl: string;
}

export interface InvitedFriend {
  id: string;
  name: string;
  pubgId: string;
  avatar: string;
  joinedAt: string;
  pointsAwarded: number;
  status: 'VERIFIED' | 'PENDING' | 'BLOCKED_VPN' | 'BLOCKED_DUPLICATE_DEVICE';
  deviceFingerprint: string;
  ipAddress: string;
}

export interface UserAccount {
  id: string;
  name: string;
  pubgPlayerId: string;
  avatar: string;
  pointsBalance: number;
  lifetimePoints: number;
  referralCode: string;
  referredBy: string | null;
  totalInvitedCount: number;
  verifiedInvitedCount: number;
  codesClaimedCount: number;
  level: number;
  streakDays: number;
  deviceFingerprint: string;
  isVpnDetected: boolean;
  canClaimDaily: boolean;
}

export interface ReferralMilestone {
  id: string;
  invitesNeeded: number;
  rewardPoints: number;
  title: string;
  description: string;
  isClaimed: boolean;
}

export interface OwnerMonetizationSettings {
  pointsPerInvite: number;
  minInvitesForFirstCashout: number;
  admobAppId: string;
  admobBannerId: string;
  admobInterstitialId: string;
  admobRewardedId: string;
  unityGameId: string;
  adsPerInviteCycle: number;
  estimatedECPM: number; // USD per 1000 impressions
  shortlinkLockEnabled: boolean;
  autoApproveCodes: boolean;
  antiVpnEnabled: boolean;
  antiDuplicateDeviceEnabled: boolean;
}

export interface AvailableUcCode {
  id: string;
  packageId: string;
  ucAmount: number;
  code: string;
  pin: string;
  isUsed: boolean;
  usedBy?: string;
  addedAt: string;
}
