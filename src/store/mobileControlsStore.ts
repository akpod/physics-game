import { create } from 'zustand';

export interface MobileControlsState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  run: boolean;
  interact: boolean;
  setControl: (key: keyof MobileControlsState, value: boolean) => void;
  resetAll: () => void;
}

export const useMobileControls = create<MobileControlsState>((set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  run: false,
  interact: false,
  setControl: (key, value) => set((state) => {
    // Only update state if value actually changes to prevent tight loop renders
    if (state[key] === value) return {};
    return { [key]: value };
  }),
  resetAll: () => set({
    forward: false, backward: false, left: false, right: false,
    jump: false, run: false, interact: false,
  })
}));
