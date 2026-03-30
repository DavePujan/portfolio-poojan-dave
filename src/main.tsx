import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { SceneProvider } from './context/SceneContext'
import './styles/globals.css'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <BrowserRouter>
      <SceneProvider>
        <App />
      </SceneProvider>
    </BrowserRouter>
  </StrictMode>,
)
