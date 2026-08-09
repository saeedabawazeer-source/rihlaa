// Gamification & Rewards Engine for Rahlaa (رحلاء)

const STORAGE_KEY = 'rahlaa_gamification_state';

const DEFAULT_STATE = {
  xp: 150,
  level: 2,
  streak: 3,
  searchesCount: 2,
  savedCount: 1,
  clicksCount: 0,
  unlockedPerks: ['perk_bronze'],
  completedQuests: ['quest_search_1'],
  lastActiveDate: new Date().toISOString().split('T')[0]
};

export const DAILY_QUESTS = [
  {
    id: 'quest_search_1',
    titleEn: 'Destination Explorer',
    titleAr: 'مستكشف الوجهات',
    descEn: 'Perform 3 travel destination searches',
    descAr: 'قم بإجراء ٣ عمليات بحث عن وجهات',
    xpReward: 50,
    targetCount: 3,
    type: 'search'
  },
  {
    id: 'quest_save_1',
    titleEn: 'Deal Collector',
    titleAr: 'جامع الصفقات',
    descEn: 'Save 2 luxury stays or car rentals to favorites',
    descAr: 'احفظ عرضين فاخرين في قائمة المفضلة',
    xpReward: 75,
    targetCount: 2,
    type: 'save'
  },
  {
    id: 'quest_click_1',
    titleEn: 'Referral Voyager',
    titleAr: 'رحالة الإحالة',
    descEn: 'Check 1 referral deal outbound link',
    descAr: 'انقر على رابط صفقة إحالة واحدة',
    xpReward: 100,
    targetCount: 1,
    type: 'click'
  }
];

export const UNLOCKABLE_PERKS = [
  {
    id: 'perk_bronze',
    titleEn: '$15 OFF Stay Coupon',
    titleAr: 'قسيمة خصم ١٥$ للإقامة',
    descEn: 'Applied automatically to all hotel & rental quotes',
    descAr: 'تطبق تلقائياً على أسعار الفنادق والإقامات',
    code: 'RAHLAABRONZE15',
    discountAmount: 15,
    requiredLevel: 1,
    badgeColor: 'var(--color-teal)'
  },
  {
    id: 'perk_silver',
    titleEn: '$35 OFF Vacation Rental Voucher',
    titleAr: 'قسيمة خصم ٣٥$ لبيوت العطلات',
    descEn: 'Exclusive discount for VRBO & Airbnb alternative bookings',
    descAr: 'خصم حصري لحجوزات بيوت العطلات والفيلات',
    code: 'RAHLAASILVER35',
    discountAmount: 35,
    requiredLevel: 2,
    badgeColor: 'var(--color-accent)'
  },
  {
    id: 'perk_gold',
    titleEn: 'Free Car Insurance & Upgrade',
    titleAr: 'ترقية مجانية وتأمين للسيارات',
    descEn: '$50 value voucher on DiscoverCars & Hertz rentals',
    descAr: 'قسيمة بقيمة ٥٠$ لتأجير السيارات',
    code: 'RAHLAAGOLD50',
    discountAmount: 50,
    requiredLevel: 3,
    badgeColor: 'var(--color-emerald)'
  }
];

export const getGamificationState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_STATE;
  } catch (e) {
    return DEFAULT_STATE;
  }
};

export const saveGamificationState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save gamification state:', e);
  }
};

export const addXP = (amount, reason = '') => {
  const currentState = getGamificationState();
  const newXP = currentState.xp + amount;
  // Calculate level: level up every 200 XP
  const newLevel = Math.floor(newXP / 200) + 1;
  const isLevelUp = newLevel > currentState.level;

  const newState = {
    ...currentState,
    xp: newXP,
    level: newLevel
  };

  // Check unlocked perks based on new level
  UNLOCKABLE_PERKS.forEach(perk => {
    if (newLevel >= perk.requiredLevel && !newState.unlockedPerks.includes(perk.id)) {
      newState.unlockedPerks.push(perk.id);
    }
  });

  saveGamificationState(newState);
  return { newState, isLevelUp, addedXP: amount, reason };
};

export const incrementCounter = (type) => {
  const currentState = getGamificationState();
  let updatedSearches = currentState.searchesCount;
  let updatedSaved = currentState.savedCount;
  let updatedClicks = currentState.clicksCount;

  if (type === 'search') updatedSearches += 1;
  if (type === 'save') updatedSaved += 1;
  if (type === 'click') updatedClicks += 1;

  const newState = {
    ...currentState,
    searchesCount: updatedSearches,
    savedCount: updatedSaved,
    clicksCount: updatedClicks
  };

  // Auto-complete quests if thresholds met
  DAILY_QUESTS.forEach(quest => {
    if (!newState.completedQuests.includes(quest.id)) {
      if (quest.type === 'search' && updatedSearches >= quest.targetCount) {
        newState.completedQuests.push(quest.id);
        newState.xp += quest.xpReward;
      }
      if (quest.type === 'save' && updatedSaved >= quest.targetCount) {
        newState.completedQuests.push(quest.id);
        newState.xp += quest.xpReward;
      }
      if (quest.type === 'click' && updatedClicks >= quest.targetCount) {
        newState.completedQuests.push(quest.id);
        newState.xp += quest.xpReward;
      }
    }
  });

  // Re-calculate level
  newState.level = Math.floor(newState.xp / 200) + 1;
  saveGamificationState(newState);
  return newState;
};
