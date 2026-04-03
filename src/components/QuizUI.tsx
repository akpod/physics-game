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
    question: "q1Title",
    options: ["q1O1", "q1O2", "q1O3", "q1O4"],
    answer: 1, // Velocity
    timeToBeat: 12
  },
  2: {
    question: "q2Title",
    options: ["q2O1", "q2O2", "q2O3", "q2O4"],
    answer: 2, // More Force
    timeToBeat: 20
  },
  3: {
    question: "q3Title",
    options: ["q3O1", "q3O2", "q3O3", "q3O4"],
    answer: 0, // Yes, much faster
    timeToBeat: 12
  },
  4: {
    question: "q5Title",
    options: ["q5O1", "q5O2", "q5O3", "q5O4"],
    answer: 2, // lower friction
    timeToBeat: 15
  },
  5: {
    question: "q6Title",
    options: ["q6O1", "q6O2", "q6O3", "q6O4"],
    answer: 0,
    timeToBeat: 25
  },
  6: {
    question: "q7Title",
    options: ["q7O1", "q7O2", "q7O3", "q7O4"],
    answer: 1,
    timeToBeat: 20
  },
  7: {
    question: "q8Title",
    options: ["q8O1", "q8O2", "q8O3", "q8O4"],
    answer: 0,
    timeToBeat: 30
  },
  8: {
    question: "q9Title",
    options: ["q9O1", "q9O2", "q9O3", "q9O4"],
    answer: 1,
    timeToBeat: 30
  },
  9: {
    question: "q10Title",
    options: ["q10O1", "q10O2", "q10O3", "q10O4"],
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
          {getTranslation(language, quizData.question)}
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
                  {getTranslation(language, opt)}
                </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
