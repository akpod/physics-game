import { useEffect, useRef } from 'react';
import { useTelemetryStore } from '../store/telemetryStore';

export default function TelemetryHUD() {
  const velRef = useRef<HTMLSpanElement>(null);
  const heightRef = useRef<HTMLSpanElement>(null);
  const dirRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Transiently subscribe to avoid React re-render looping at 60 FPS
    const unsub = useTelemetryStore.subscribe((state) => {
      if (velRef.current) velRef.current.innerText = state.velocity.toFixed(2);
      if (heightRef.current) heightRef.current.innerText = state.height.toFixed(2);
      if (dirRef.current) dirRef.current.innerText = state.direction;
    });
    return unsub;
  }, []);

  return (
    <div className="telemetry-hud">
      <div style={{ fontWeight: 'bold', color: '#FFF', marginBottom: '5px', borderBottom: '1px solid #555', paddingBottom: '3px' }}>PLAYER STATS</div>
      <div>VEL : <span ref={velRef}>0.00</span> m/s</div>
      <div>ALT : <span ref={heightRef}>0.00</span> m</div>
      <div>HDG : <span ref={dirRef}>N</span></div>
    </div>
  );
}
