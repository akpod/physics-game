import { audioManager } from '../audio/AudioManager';
import { useGameStore } from '../store/gameStore';
import { useEffect } from 'react';
import { getTranslation } from '../i18n';
import type { Language } from '../i18n';

export default function MainMenu() {
  const setScreen = useGameStore(s => s.setScreen);
  const language = useGameStore(s => s.language);
  const setLanguage = useGameStore(s => s.setLanguage);

  useEffect(() => {
    audioManager.init();
    audioManager.playMainMenuMusic();
    return () => {
      audioManager.stopMainMenuMusic();
    };
  }, []);

  const handlePlay = () => {
    audioManager.init();
    audioManager.playUIClick();
    setScreen('playing');
  };

  const handleLevelSelect = () => {
    audioManager.init();
    audioManager.playUIClick();
    setScreen('levelSelect');
  };

  const handleLeaderboard = () => {
    audioManager.init();
    audioManager.playUIClick();
    setScreen('leaderboard');
  };

  return (
    <div className="ui-overlay" style={{ justifyContent: 'center', alignItems: 'center', background: 'rgba(18, 18, 18, 0.85)', zIndex: 50, pointerEvents: 'auto' }}>
      
      {/* Language Switcher */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
        {(['en', 'am', 'om', 'ti'] as Language[]).map(lang => (
            <button key={lang} className="btn" 
              style={{
                 padding: '5px 10px', 
                 fontSize: '14px', 
                 opacity: language === lang ? 1 : 0.5,
                 background: language === lang ? 'var(--ethiopia-green)' : '#333'
              }}
              onClick={() => {
                 audioManager.init();
                 audioManager.playUIClick();
                 setLanguage(lang);
              }}>
               {lang === 'en' ? 'EN' : lang === 'am' ? 'አማ' : lang === 'om' ? 'OM' : 'ትግ'}
            </button>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', color: 'var(--ethiopia-green)', textShadow: '2px 2px 4px #000', marginBottom: '10px' }}>
          {getTranslation(language, 'title')}
        </h1>
        <p style={{ color: 'var(--ethiopia-yellow)', fontSize: '20px', marginBottom: '40px' }}>
          {getTranslation(language, 'subtitle')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '250px', margin: '0 auto' }}>
          <button className="btn" style={{ padding: '15px', fontSize: '20px' }} onClick={handlePlay}>
            {getTranslation(language, 'playGame')}
          </button>
          
          <button className="btn" style={{ background: 'var(--ethiopia-yellow)', color: 'black', padding: '15px', fontSize: '20px' }} onClick={handleLevelSelect}>
            {getTranslation(language, 'levelSelect')}
          </button>

          <button className="btn" style={{ background: 'var(--ethiopia-red)', color: 'white', padding: '15px', fontSize: '20px' }} onClick={handleLeaderboard}>
            {getTranslation(language, 'leaderboard')}
          </button>
        </div>
      </div>
    </div>
  );
}
