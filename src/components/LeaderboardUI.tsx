import { useGameStore } from '../store/gameStore';
import { audioManager } from '../audio/AudioManager';
import { useState, useEffect, useMemo } from 'react';
import { getTranslation } from '../i18n';

// Game leaderboard UI

export default function LeaderboardUI() {
  const { setScreen, username, highScores, language } = useGameStore();
  const [globalScores, setGlobalScores] = useState<any[]>([]);

  useEffect(() => {
     fetch('/api/leaderboard')
       .then(res => res.json())
       .then(data => {
          if (Array.isArray(data)) setGlobalScores(data);
       })
       .catch(err => console.error(err));
  }, []);

  const handleBack = () => {
    audioManager.init();
    audioManager.playUIClick();
    setScreen('menu');
  };

  // Calculate local user's total score
  const localTotalScore = useMemo(() => {
    let totalTime = 0;
    let totalStars = 0;
    Object.values(highScores).forEach(score => {
       totalTime += score.time;
       totalStars += score.stars;
    });
    return { name: username || 'You', time: totalTime, stars: totalStars, isUser: true };
  }, [highScores, username]);

  // Merge and sort
  const leaderboard = useMemo(() => {
     const list = [...globalScores];
     
     // Remove local user from global list to prevent duplicates if they just updated
     const filteredList = list.filter(p => p.name !== localTotalScore.name);

     if (localTotalScore.stars > 0) {
         filteredList.push(localTotalScore);
     }
     
     // Sort primarily by stars (descending), then by time (ascending)
     return filteredList.sort((a, b) => {
         if (b.stars !== a.stars) return b.stars - a.stars;
         return a.time - b.time;
     }).slice(0, 10);
  }, [localTotalScore, globalScores]);

  return (
    <div className="ui-overlay" style={{ justifyContent: 'center', alignItems: 'center', background: 'rgba(18, 18, 18, 0.98)', zIndex: 100, pointerEvents: 'auto' }}>
      <div style={{ background: '#222', padding: '30px', borderRadius: '15px', width: '90%', maxWidth: '600px', borderTop: '10px solid var(--ethiopia-red)' }}>
        <h2 style={{ fontSize: '36px', color: 'white', marginBottom: '30px', textAlign: 'center' }}>{getTranslation(language, 'globalLeaderboards')}</h2>
        
        <div style={{ display: 'flex', borderBottom: '2px solid #555', paddingBottom: '10px', marginBottom: '20px', color: '#aaa', fontWeight: 'bold' }}>
           <span style={{ width: '50px', textAlign: 'center' }}>{getTranslation(language, 'rank')}</span>
           <span style={{ flex: 1 }}>{getTranslation(language, 'usernameWord')}</span>
           <span style={{ width: '100px', textAlign: 'center' }}>{getTranslation(language, 'stars')}</span>
           <span style={{ width: '100px', textAlign: 'center' }}>{getTranslation(language, 'totalTime')}</span>
        </div>

        {leaderboard.map((player, index) => (
            <div key={index} style={{ 
                display: 'flex', 
                padding: '15px 0', 
                borderBottom: '1px solid #333',
                background: (player as any).isUser ? 'rgba(0, 154, 68, 0.2)' : 'transparent',
                color: (player as any).isUser ? 'var(--ethiopia-yellow)' : 'white'
             }}>
               <span style={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }}>#{index + 1}</span>
               <span style={{ flex: 1 }}>{player.name} {(player as any).isUser ? getTranslation(language, 'youWord') : ""}</span>
               <span style={{ width: '100px', textAlign: 'center' }}>★ {player.stars}</span>
               <span style={{ width: '100px', textAlign: 'center' }}>{player.time > 0 ? player.time.toFixed(1) + 's' : 'N/A'}</span>
            </div>
        ))}

        <button className="btn" style={{ marginTop: '30px', width: '100%', background: '#444' }} onClick={handleBack}>
          {getTranslation(language, 'backToMenu')}
        </button>
      </div>
    </div>
  );
}
