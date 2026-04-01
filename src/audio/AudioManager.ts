class AudioManager {
  private ctx: AudioContext | null = null;
  private bgmOscillators: OscillatorNode[] = [];
  private isBgmPlaying = false;
  private masterGain: GainNode | null = null;
  private mainMenuAudio: HTMLAudioElement | null = null;
  
  // Ethiopian Pentatonic Scale base frequencies (e.g., C, D, F, G, A)
  private scale = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25];

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);
    }
    if (!this.mainMenuAudio) {
      this.mainMenuAudio = new Audio('/audio/main_menu_theme.webm');
      this.mainMenuAudio.loop = true;
      this.mainMenuAudio.volume = 0.5;
    }
  }

  playJumpSound() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playWinLevel() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const masterGain = this.masterGain;

    const notes = [this.scale[0], this.scale[2], this.scale[3], this.scale[5]];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.5);
      
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.5);
    });
  }

  playUIClick() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  toggleBGM() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const masterGain = this.masterGain;

    if (this.isBgmPlaying) {
      this.bgmOscillators.forEach(osc => {
         try { osc.stop(); } catch(e) {}
      });
      this.bgmOscillators = [];
      this.isBgmPlaying = false;
      return;
    }

    [this.scale[0] / 2, this.scale[3] / 2, this.scale[0]].forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.05; 
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      this.bgmOscillators.push(osc);
    });
    this.isBgmPlaying = true;
  }

  playMainMenuMusic() {
    if (this.mainMenuAudio) {
      // Browsers might block autoplay if no user interaction has occurred
      this.mainMenuAudio.play().catch(e => console.log('Audio autoplay prevented:', e));
    }
  }

  stopMainMenuMusic() {
    if (this.mainMenuAudio) {
      this.mainMenuAudio.pause();
      this.mainMenuAudio.currentTime = 0;
    }
  }
}

export const audioManager = new AudioManager();
