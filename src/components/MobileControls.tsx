import { useEffect, useState, useRef } from 'react';
import { useMobileControls } from '../store/mobileControlsStore';
import { ArrowUpCircle, Hand, FastForward } from 'lucide-react';

export default function MobileControls() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const setControl = useMobileControls(s => s.setControl);
  
  // Joystick logic
  const joystickCenter = useRef({ x: 0, y: 0 });
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Check if the device has a coarse pointer (mobile touch screen)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!isTouchDevice) return null;

  const handleJoystickStart = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    joystickCenter.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    setIsDragging(true);
    updateJoystick(e.clientX, e.clientY);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleJoystickMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateJoystick(e.clientX, e.clientY);
  };

  const handleJoystickEnd = (e: React.PointerEvent) => {
    setIsDragging(false);
    setJoystickPos({ x: 0, y: 0 });
    setControl('forward', false);
    setControl('backward', false);
    setControl('left', false);
    setControl('right', false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const updateJoystick = (clientX: number, clientY: number) => {
    const dx = clientX - joystickCenter.current.x;
    const dy = clientY - joystickCenter.current.y;
    
    const maxRadius = 40;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    let nx = dx;
    let ny = dy;
    
    // Clamp inner knob to max visible radius
    if (distance > maxRadius) {
      nx = (dx / distance) * maxRadius;
      ny = (dy / distance) * maxRadius;
    }
    
    setJoystickPos({ x: nx, y: ny });

    // 15 pixel threshold for registering movement
    const threshold = 15;
    
    setControl('forward', ny < -threshold);
    setControl('backward', ny > threshold);
    setControl('left', nx < -threshold);
    setControl('right', nx > threshold);
  };

  const btnStyle = {
    width: '60px', height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    userSelect: 'none' as const,
    touchAction: 'none' as const,
    border: '2px solid rgba(255, 255, 255, 0.3)'
  };

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 9999, overflow: 'hidden'
    }}>
      {/* Left Virtual Joystick */}
      <div style={{ position: 'absolute', bottom: '40px', left: '40px', pointerEvents: 'auto' }}>
        <div 
          style={{
            width: '120px', height: '120px',
            borderRadius: '50%',
            backgroundColor: 'rgba(128, 128, 128, 0.2)',
            border: '2px solid rgba(128, 128, 128, 0.5)',
            position: 'relative',
            touchAction: 'none'
          }}
          onPointerDown={handleJoystickStart}
          onPointerMove={handleJoystickMove}
          onPointerUp={handleJoystickEnd}
          onPointerCancel={handleJoystickEnd}
        >
          {/* Thumb Knob */}
          <div style={{
            width: '60px', height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(128, 128, 128, 0.6)',
            position: 'absolute',
            top: '30px', left: '30px',
            transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)`,
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }} />
        </div>
      </div>

      {/* Right Action Buttons */}
      <div style={{ 
        position: 'absolute', bottom: '40px', right: '40px', 
        pointerEvents: 'auto', display: 'flex', gap: '20px'
      }}>
        {/* Run Button */}
        <div
          style={btnStyle}
          onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setControl('run', true); }}
          onPointerUp={(e) => { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); setControl('run', false); }}
          onPointerCancel={() => setControl('run', false)}
        >
          <FastForward size={30} />
        </div>
        
        {/* Interact Button */}
        <div
          style={btnStyle}
          onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setControl('interact', true); }}
          onPointerUp={(e) => { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); setControl('interact', false); }}
          onPointerCancel={() => setControl('interact', false)}
        >
          <Hand size={30} />
        </div>

        {/* Jump Button - higher aligned */}
        <div
          style={{...btnStyle, 
            position: 'absolute', 
            top: '-80px', right: '10px'
          }}
          onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setControl('jump', true); }}
          onPointerUp={(e) => { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); setControl('jump', false); }}
          onPointerCancel={() => setControl('jump', false)}
        >
          <ArrowUpCircle size={36} />
        </div>
      </div>
    </div>
  );
}
