import React from 'react'
import ReactDOM from 'react-dom/client'
import { KeyboardControls } from '@react-three/drei';
import App from './App.tsx'
import './index.css'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['ShiftLeft', 'ShiftRight'] },
  { name: 'interact', keys: ['KeyE'] },
  { name: 'wave', keys: ['KeyQ'] },
  { name: 'point', keys: ['KeyF'] },
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KeyboardControls map={keyboardMap}>
      <App />
    </KeyboardControls>
  </React.StrictMode>,
)
