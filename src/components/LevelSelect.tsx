import { useGameStore } from '../store/gameStore';
import { audioManager } from '../audio/AudioManager';
import { getTranslation } from '../i18n';

interface Props {
  setCurrentLevel: (level: any) => void;
}

export default function LevelSelect({ setCurrentLevel }: Props) {
  const { setScreen, unlockedLevels, highScores, language } = useGameStore();

  const handleSelect = (level: number | 'sandbox') => {
    audioManager.init();
    audioManager.playUIClick();
    setCurrentLevel(level);
    setScreen('playing');
  };

  const LevelButton = ({ level, title }: { level: number, title: string }) => {
    const isUnlocked = unlockedLevels.includes(level);
    const score = highScores[level];

    return (
      <button 
        className="btn" 
        onClick={() => isUnlocked && handleSelect(level)}
        style={{ 
          padding: '20px', 
          fontSize: '18px', 
          background: isUnlocked ? 'var(--ethiopia-green)' : '#555',
          opacity: isUnlocked ? 1 : 0.6,
          cursor: isUnlocked ? 'pointer' : 'not-allowed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '150px'
        }}
      >
        <span>{title}</span>
        {isUnlocked && score && (
          <div style={{ marginTop: '10px', fontSize: '14px', color: 'var(--ethiopia-yellow)' }}>
            ★ {score.stars}/3
            <br />
            ⏱ {score.time.toFixed(1)}s
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="ui-overlay" style={{ justifyContent: 'center', alignItems: 'center', background: 'rgba(18, 18, 18, 0.95)', zIndex: 50, pointerEvents: 'auto' }}>
      <h1 style={{ fontSize: '36px', color: 'var(--ethiopia-yellow)', marginBottom: '40px' }}>{getTranslation(language, 'selectLevel')}</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(level => (
          <LevelButton key={level} level={level} title={`${level}. ${getTranslation(language, 'levelWord')}`} />
        ))}
        
        <button className="btn" style={{ background: 'var(--ethiopia-red)', padding: '20px' }} onClick={() => handleSelect('sandbox')}>
          {getTranslation(language, 'sandboxMode')}
        </button>
      </div>

      <button className="btn" style={{ marginTop: '50px', background: 'transparent', border: '2px solid white' }} onClick={() => setScreen('menu')}>
        {getTranslation(language, 'backToMenu')}
      </button>
    </div>
  );
}
