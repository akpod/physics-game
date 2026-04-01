import { useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Sky } from '@react-three/drei';

import PhysicsWorld from './components/PhysicsWorld';
import UIOverlay from './components/UIOverlay';
import MobileControls from './components/MobileControls';
import MainMenu from './components/MainMenu';
import LevelSelect from './components/LevelSelect';
import GameScoreUI from './components/GameScoreUI';
import QuizUI from './components/QuizUI';
import RegistrationUI from './components/RegistrationUI';
import LeaderboardUI from './components/LeaderboardUI';
import { useGameStore } from './store/gameStore';

// Levels
import Level1Motion from './levels/Level1Motion';
import Level2Forces from './levels/Level2Forces';
import Level3Gravity from './levels/Level3Gravity';
import Level4Projectile from './levels/Level4Projectile';
import Level5Friction from './levels/Level5Friction';
import Level6Kinematics from './levels/Level6Kinematics';
import Level7Wind from './levels/Level7Wind';
import Level8Puzzles from './levels/Level8Puzzles';
import Level9Pendulum from './levels/Level9Pendulum';
import Level10Gauntlet from './levels/Level10Gauntlet';
import Level11Seesaw from './levels/Level11Seesaw';
import Level12Magnets from './levels/Level12Magnets';
import SandboxMode from './levels/SandboxMode';

export type LevelType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'sandbox';

// A small component to hook into R3F useFrame for global timer logic
const TimerTicker = () => {
    const tickTimer = useGameStore(s => s.tickTimer);
    useFrame((_state: any, delta: number) => {
       tickTimer(delta);
    });
    return null;
}

function App() {
  const [currentLevel, setCurrentLevel] = useState<LevelType>(1);
  const [isSlowMo, setIsSlowMo] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { currentScreen, startTimer, resetTimer } = useGameStore();

  useEffect(() => {
     if (currentScreen === 'playing') {
        resetTimer();
        startTimer();
     }
  }, [currentScreen, currentLevel]);

  const renderLevel = () => {
    switch (currentLevel) {
      case 1: return <Level1Motion />;
      case 2: return <Level2Forces />;
      case 3: return <Level3Gravity />;
      case 4: return <Level4Projectile />;
      case 5: return <Level5Friction />;
      case 6: return <Level6Kinematics />;
      case 7: return <Level7Wind />;
      case 8: return <Level8Puzzles />;
      case 9: return <Level9Pendulum />;
      case 10: return <Level10Gauntlet />;
      case 11: return <Level11Seesaw />;
      case 12: return <Level12Magnets />;
      case 'sandbox': return <SandboxMode />;
      default: return <Level1Motion />;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#121212', overflow: 'hidden' }}>
      
      {/* Menus */}
      {currentScreen === 'register' && <RegistrationUI />}
      {currentScreen === 'menu' && <MainMenu />}
      {currentScreen === 'levelSelect' && <LevelSelect setCurrentLevel={setCurrentLevel} />}
      {currentScreen === 'leaderboard' && <LeaderboardUI />}
      {currentScreen === 'levelComplete' && <GameScoreUI currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />}
      {currentScreen === 'quiz' && <QuizUI currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />}
      
      {/* Game View */}
      {(currentScreen === 'playing' || currentScreen === 'levelComplete' || currentScreen === 'quiz') && (
        <>
          <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
            <Suspense fallback={null}>
              <color attach="background" args={['#87CEEB']} />
              <ambientLight intensity={0.5} />
              <directionalLight castShadow position={[10, 20, 10]} intensity={1.5} />
              
              <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
              
              {/* Ticker inside canvas context */}
              <TimerTicker />

              {/* Rapier Physics World */}
              <Physics timeStep={isSlowMo ? "vary" : undefined} updatePriority={isSlowMo ? -1 : 0} gravity={[0, -9.81, 0]}>
                 <PhysicsWorld />
                 {renderLevel()}
              </Physics>
            </Suspense>
          </Canvas>

          {currentScreen === 'playing' && (
            <UIOverlay 
              currentLevel={currentLevel} 
              setCurrentLevel={setCurrentLevel} 
              isSlowMo={isSlowMo} 
              setIsSlowMo={setIsSlowMo}
              showHint={showHint}
              setShowHint={setShowHint}
            />
          )}
          {currentScreen === 'playing' && <MobileControls />}
        </>
      )}
    </div>
  );
}

export default App;
