import { useGameStore } from '../store/gameStore';
import { audioManager } from '../audio/AudioManager';
import type { LevelType } from '../App';
import { getTranslation } from '../i18n';

interface Props {
  currentLevel: LevelType;
  setCurrentLevel: (level: any) => void;
}

export default function GameScoreUI({ currentLevel }: Props) {
  const { currentLevelTime, setScreen, resetTimer, highScores, language } = useGameStore();

  const handleNextLevel = () => {
    audioManager.init();
    audioManager.playUIClick();
    if (typeof currentLevel === 'number' && currentLevel < 7) {
      setScreen('quiz');
    } else {
      setScreen('levelSelect');
    }
  };

  const handleMenu = () => {
    audioManager.init();
    audioManager.playUIClick();
    resetTimer();
    setScreen('menu');
  };

  // Get score instance
  const bestScore = (typeof currentLevel === 'number') ? highScores[currentLevel] : null;

  return (
    <div className="ui-overlay" style={{ justifyContent: 'center', alignItems: 'center', background: 'rgba(18, 18, 18, 0.9)', zIndex: 100, pointerEvents: 'auto' }}>
      <div style={{ textAlign: 'center', background: '#333', padding: '40px', borderRadius: '20px', borderTop: '10px solid var(--ethiopia-green)' }}>
        <h1 style={{ fontSize: '40px', color: 'white', marginBottom: '20px' }}>{getTranslation(language, 'levelComplete')}</h1>
        
        <div style={{ fontSize: '24px', marginBottom: '10px', color: 'var(--ethiopia-yellow)' }}>
          {getTranslation(language, 'time')}: {currentLevelTime.toFixed(2)}s
        </div>

        {bestScore && (
          <div style={{ fontSize: '18px', marginBottom: '30px', color: '#aaa' }}>
             {getTranslation(language, 'bestTime')}: {bestScore.time.toFixed(2)}s | {getTranslation(language, 'rating')}: {"★".repeat(bestScore.stars)}
          </div>
        )}

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button className="btn" style={{ background: '#555', padding: '15px' }} onClick={handleMenu}>
            {getTranslation(language, 'mainMenu')}
          </button>
          
          <button className="btn" style={{ background: 'var(--ethiopia-green)', padding: '15px' }} onClick={handleNextLevel}>
            {typeof currentLevel === 'number' && currentLevel < 7 ? getTranslation(language, 'nextLevelQuiz') : getTranslation(language, 'finishBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
