import { create } from 'zustand';
import type { Language } from '../i18n';

interface GameState {
  currentScreen: 'register' | 'menu' | 'levelSelect' | 'leaderboard' | 'playing' | 'quiz' | 'levelComplete';
  username: string | null;
  language: Language;
  levelGoalReached: boolean;
  unlockedLevels: number[];
  highScores: Record<number, { time: number; stars: number }>;
  currentLevelTime: number;
  timerActive: boolean;
  gravityScale: number;
  
  setUsername: (name: string) => void;
  setLanguage: (lang: Language) => void;
  setScreen: (screen: 'register' | 'menu' | 'levelSelect' | 'leaderboard' | 'playing' | 'quiz' | 'levelComplete') => void;
  unlockLevel: (levelIndex: number) => void;
  saveScore: (levelIndex: number, time: number, stars: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  tickTimer: (delta: number) => void;
  resetTimer: () => void;
  syncLeaderboard: () => Promise<void>;
  reachGoal: () => void;
  finishLevelPhase1: () => void;
  submitQuizAndComplete: (levelIndex: number, timeToBeat: number, quizCorrect: boolean) => void;
  setGravityScale: (scale: number) => void;
}

// Load default from local storage
const loadUsername = () => {
   return localStorage.getItem('physics_game_username');
};

const loadScores = () => {
  const data = localStorage.getItem('physics_game_scores');
  if (data) return JSON.parse(data);
  return {};
};

const saveScores = (scores: any) => {
  localStorage.setItem('physics_game_scores', JSON.stringify(scores));
};

const loadUnlocked = () => {
  if (typeof window !== 'undefined' && (window.location.search.includes('unlockAll') || window.location.pathname === '/fullaccess')) {
     const allLevels = [1, 2, 3, 4, 5, 6, 7, 8];
     localStorage.setItem('physics_game_unlocked', JSON.stringify(allLevels));
     return allLevels;
  }
  const data = localStorage.getItem('physics_game_unlocked');
  if (data) return JSON.parse(data);
  return [1]; // Level 1 is always unlocked
};

const loadLanguage = (): Language => {
  const data = localStorage.getItem('physics_game_lang');
  if (data && ['en', 'am', 'om', 'ti'].includes(data)) {
    return data as Language;
  }
  return 'en';
};

const initialUsername = loadUsername();

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: 'register',
  username: initialUsername,
  language: loadLanguage(),
  levelGoalReached: false,
  gravityScale: 1.0,
  unlockedLevels: loadUnlocked(),
  highScores: loadScores(),
  currentLevelTime: 0,
  timerActive: false,

  setUsername: (name) => {
     localStorage.setItem('physics_game_username', name);
     set({ username: name, currentScreen: 'menu' });
  },

  setLanguage: (lang) => {
    localStorage.setItem('physics_game_lang', lang);
    set({ language: lang });
  },

  setScreen: (screen) => set({ currentScreen: screen, levelGoalReached: false }),
  
  unlockLevel: (levelIndex) => set((state) => {
    const newUnlocked = [...new Set([...state.unlockedLevels, levelIndex])];
    localStorage.setItem('physics_game_unlocked', JSON.stringify(newUnlocked));
    return { unlockedLevels: newUnlocked };
  }),

  saveScore: (levelIndex, time, stars) => {
    set((state) => {
      const existing = state.highScores[levelIndex];
      if (!existing || time < existing.time) {
        const newScores = { ...state.highScores, [levelIndex]: { time, stars } };
        saveScores(newScores);
        return { highScores: newScores };
      }
      return {};
    });
    // Sync to global DB
    get().syncLeaderboard();
  },

  syncLeaderboard: async () => {
    const state = get();
    if (!state.username) return;
    
    let totalTime = 0;
    let totalStars = 0;
    Object.values(state.highScores).forEach((score: any) => {
       totalTime += score.time;
       totalStars += score.stars;
    });

    if (totalStars === 0) return;

    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: state.username, time: totalTime, stars: totalStars })
      });
    } catch(e) {
      console.error('Failed to sync leaderboard:', e);
    }
  },

  startTimer: () => set({ timerActive: true }),
  stopTimer: () => set({ timerActive: false }),
  tickTimer: (delta) => set((state) => ({ currentLevelTime: state.timerActive ? state.currentLevelTime + delta : state.currentLevelTime })),
  resetTimer: () => set({ currentLevelTime: 0, timerActive: false, levelGoalReached: false }),

  // Goal Trigger
  reachGoal: () => set((state) => {
    if (!state.levelGoalReached) {
      state.stopTimer();
      import('../audio/AudioManager').then(m => m.audioManager.playWinLevel());
      return { levelGoalReached: true };
    }
    return {};
  }),

  // Phase 1: Click Finish Button -> Show score screen
  finishLevelPhase1: () => set(() => {
    return { currentScreen: 'levelComplete', levelGoalReached: false, timerActive: false };
  }),

  // Phase 2: Complete the quiz -> Give stars and save score
  submitQuizAndComplete: (levelIndex, timeToBeat, quizCorrect) => set((state) => {
    const time = state.currentLevelTime;
    
    // Base stars on time and quiz
    let stars = 1;
    if (quizCorrect) {
       if (time < timeToBeat) stars = 3;
       else if (time < timeToBeat * 1.5) stars = 2;
       else stars = 2; // Passed quiz but slow
    } else {
       stars = 1; // Failed quiz (pity star for making it to the end)
    }

    state.saveScore(levelIndex, time, stars);
    
    // Only unlock next level if quiz was correct
    if (quizCorrect && levelIndex < 8) state.unlockLevel(levelIndex + 1);
    
    import('../audio/AudioManager').then(m => m.audioManager.playWinLevel());
    
    return { currentScreen: 'levelComplete' };
  }),

  setGravityScale: (scale: number) => set({ gravityScale: scale }),
}));
