import { create } from 'zustand';

interface TelemetryState {
  velocity: number;
  height: number;
  direction: string;
}

export const useTelemetryStore = create<TelemetryState>(() => ({
  velocity: 0,
  height: 0,
  direction: 'N',
}));
