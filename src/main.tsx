import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/errors/ErrorBoundary'
import { SceneProvider } from './context/SceneContext'
import './styles/globals.pcss'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <SceneProvider>
          <App />
        </SceneProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
