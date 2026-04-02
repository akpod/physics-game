import React from 'react';
import { Play, Pause, HelpCircle, RefreshCw } from 'lucide-react';
import type { LevelType } from '../App';

interface Props {
  currentLevel: LevelType;
  setCurrentLevel: React.Dispatch<React.SetStateAction<LevelType>>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  showHint: boolean;
  setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
}

import { audioManager } from '../audio/AudioManager';
import { useGameStore } from '../store/gameStore';
import { getTranslation } from '../i18n';
import TelemetryHUD from './TelemetryHUD';

export default function UIOverlay({ currentLevel, setCurrentLevel, isPaused, setIsPaused, showHint, setShowHint }: Props) {
  const { finishLevelPhase1, language } = useGameStore();

  const titleKey = currentLevel === 'sandbox' ? 'sandboxMode' : `level${currentLevel}Title`;
  const descKey = currentLevel === 'sandbox' ? 'sandboxDesc' : `level${currentLevel}Desc`;
  const hintKey = currentLevel === 'sandbox' ? 'sandboxHint' : `level${currentLevel}Hint`;

  const playClick = () => {
    audioManager.init();
    audioManager.playUIClick();
  };

  return (
    <div className="ui-overlay">
      <div className="hud-top-right">
        <button className="btn" style={{ padding: '8px' }} onClick={() => { playClick(); setIsPaused(!isPaused); }}>
          {isPaused ? <Play size={24} /> : <Pause size={24} />}
        </button>
        <button className="btn" style={{ padding: '8px' }} onClick={() => { playClick(); setShowHint(!showHint); }}>
          <HelpCircle size={24} />
        </button>
        <button className="btn" style={{ padding: '8px' }} onClick={() => { playClick(); window.location.reload(); }}>
          <RefreshCw size={24} />
        </button>
      </div>

      <div className="level-info">
        <h1>{getTranslation(language, titleKey)}</h1>
        <p>{getTranslation(language, descKey)}</p>
        
        {showHint && (
          <div style={{ marginTop: '10px', color: '#FEDD00', fontSize: '14px', fontStyle: 'italic' }}>
            💡 {getTranslation(language, 'hint')}: {getTranslation(language, hintKey)}
          </div>
        )}

        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          {currentLevel !== 1 && (
            <button className="btn" style={{ fontSize: '14px', padding: '8px 12px' }} 
              onClick={() => {
                playClick();
                if(currentLevel === 'sandbox') setCurrentLevel(5);
                else setCurrentLevel((currentLevel - 1) as LevelType);
              }}>
              {getTranslation(language, 'back')}
            </button>
          )}
          {currentLevel !== 'sandbox' && (
             <button className="btn" style={{ fontSize: '14px', padding: '8px 12px' }} onClick={() => { playClick(); finishLevelPhase1(); }}>
               {getTranslation(language, 'nextLevel')}
             </button>
          )}
        </div>
      </div>
      
      <TelemetryHUD />
    </div>
  );
}
