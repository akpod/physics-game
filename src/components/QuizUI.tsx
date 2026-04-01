import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { audioManager } from '../audio/AudioManager';
import type { LevelType } from '../App';
import { getTranslation } from '../i18n';

interface Props {
  currentLevel: LevelType;
  setCurrentLevel: (level: any) => void;
}

const levelQuizzes: Record<number, { question: string, options: string[], answer: number, timeToBeat: number }> = {
  1: {
    question: "What physical property are you increasing when holding sprint?",
    options: ["Mass", "Velocity", "Gravity", "Volume"],
    answer: 1, // Velocity
    timeToBeat: 12
  },
  2: {
    question: "According to Newton's Second Law (F=ma), pushing the heavier box required:",
    options: ["Less Force", "The Same Force", "More Force", "Zero Force"],
    answer: 2, // More Force
    timeToBeat: 20
  },
  3: {
    question: "Did the heavier gravity pull you down faster than the normal gravity?",
    options: ["Yes, much faster", "No, mass does not affect gravity", "No, it pulled slower", "Yes, because I'm heavy"],
    answer: 0, // In this game level (the platform was small, but normally g affects acceleration = 9.8 vs 1.6 on moon). Let's be accurate about the level mechanics: The High Gravity pulled them down faster.
    timeToBeat: 12
  },
  4: {
    question: "What trajectory angle typically yields the maximum forward distance?",
    options: ["90 degrees", "45 degrees", "10 degrees", "60 degrees"],
    answer: 1, // 45 degrees
    timeToBeat: 15
  },
  5: {
    question: "Why did you slide further on the white surface?",
    options: ["It had higher friction", "It was magnetic", "It had lower friction (Ice)", "It was pushed by wind"],
    answer: 2, // lower friction
    timeToBeat: 15
  },
  6: {
    question: "Why do you move along with the moving platform without sliding off?",
    options: ["Friction locks your relative velocity", "Magic", "Magnets", "You don't"],
    answer: 0,
    timeToBeat: 25
  },
  7: {
    question: "What physical property characterizes a bouncy trampoline collision?",
    options: ["Inelastic", "Elastic", "Plastic", "Frictional"],
    answer: 1,
    timeToBeat: 20
  },
  8: {
    question: "According to Newton, pushing a heavy box requires a massive:",
    options: ["Applied Force", "Normal Force", "Tension", "Buoyancy"],
    answer: 0,
    timeToBeat: 30
  },
  9: {
    question: "In a swinging pendulum, where is the kinetic energy at its maximum?",
    options: ["At the highest point", "At the lowest point", "In the string", "Never"],
    answer: 1,
    timeToBeat: 30
  },
  10: {
    question: "What force ultimately pulls falling blocks back down to the ground?",
    options: ["Friction", "Tension", "Gravity", "Normal Force"],
    answer: 2,
    timeToBeat: 40
  }
};

export default function QuizUI({ currentLevel, setCurrentLevel }: Props) {
  const { submitQuizAndComplete, setScreen, resetTimer, language } = useGameStore();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (currentLevel === 'sandbox') return null;

  const quizData = levelQuizzes[currentLevel];
  if (!quizData) return null;

  const handleSubmit = (index: number) => {
    audioManager.init();
    audioManager.playUIClick();
    setSelectedOption(index);
    
    // Slight delay so they can see if they were right/wrong
    setTimeout(() => {
        const isCorrect = index === quizData.answer;
        submitQuizAndComplete(currentLevel, quizData.timeToBeat, isCorrect);
        
        if (isCorrect && typeof currentLevel === 'number' && currentLevel < 10) {
            setCurrentLevel((currentLevel + 1) as any);
            resetTimer();
            setScreen('playing');
        } else {
            setScreen('levelSelect');
        }
    }, 1500);
  };

  return (
    <div className="ui-overlay" style={{ justifyContent: 'center', alignItems: 'center', background: 'rgba(18, 18, 18, 0.95)', zIndex: 100, pointerEvents: 'auto' }}>
      <div style={{ textAlign: 'center', background: '#2B2B2B', padding: '40px', borderRadius: '20px', borderTop: '10px solid var(--ethiopia-yellow)', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '32px', color: 'white', marginBottom: '10px' }}>{getTranslation(language, 'quizTitle')}</h2>
        <p style={{ fontSize: '18px', color: '#ccc', marginBottom: '30px' }}>
           {getTranslation(language, 'quizDesc')}
        </p>

        <h3 style={{ fontSize: '24px', color: 'var(--ethiopia-green)', marginBottom: '30px' }}>
          {quizData.question}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {quizData.options.map((opt, i) => {
            
            // Determine button color based on selection state
            let bg = '#444';
            if (selectedOption !== null) {
               if (i === quizData.answer) bg = 'var(--ethiopia-green)'; // Always reveal correct answer
               else if (i === selectedOption) bg = 'var(--ethiopia-red)'; // Red if they picked the wrong one
            }

            return (
                <button 
                  key={i} 
                  className="btn" 
                  style={{ background: bg, padding: '20px', fontSize: '18px' }}
                  onClick={() => selectedOption === null && handleSubmit(i)}
                  disabled={selectedOption !== null}
                >
                  {opt}
                </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
