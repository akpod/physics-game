import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { audioManager } from '../audio/AudioManager';
import { getTranslation } from '../i18n';

export default function RegistrationUI() {
  const { setUsername, username, language } = useGameStore();
  const [inputName, setInputName] = useState(username || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim().length < 3) return;
    audioManager.init();
    audioManager.playUIClick();
    setUsername(inputName.trim());
  };

  return (
    <div className="ui-overlay" style={{ justifyContent: 'center', alignItems: 'center', background: 'rgba(18, 18, 18, 0.95)', zIndex: 100, pointerEvents: 'auto' }}>
      <div style={{ textAlign: 'center', background: '#333', padding: '50px', borderRadius: '20px', borderTop: '10px solid var(--ethiopia-green)', maxWidth: '400px', width: '90%' }}>
        <h2 style={{ fontSize: '32px', color: 'white', marginBottom: '20px' }}>{getTranslation(language, 'welcomePlayer')}</h2>
        <p style={{ fontSize: '16px', color: '#ccc', marginBottom: '30px' }}>
           {getTranslation(language, 'enterUsernameDesc')}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="text" 
            value={inputName} 
            onChange={(e) => setInputName(e.target.value)} 
            placeholder={getTranslation(language, 'usernamePlaceholder')} 
            style={{ 
              padding: '15px', 
              fontSize: '18px', 
              borderRadius: '8px', 
              border: 'none', 
              background: '#222', 
              color: 'white',
              textAlign: 'center'
            }} 
            maxLength={16}
            required
          />
          <button 
            type="submit" 
            className="btn" 
            style={{ background: 'var(--ethiopia-yellow)', color: 'black', padding: '15px', fontSize: '20px' }}
            disabled={inputName.trim().length < 3}
          >
            {getTranslation(language, 'register')}
          </button>
        </form>
      </div>
    </div>
  );
}
