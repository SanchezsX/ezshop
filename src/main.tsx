import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/global.scss'
import { RootProvider } from './app/Provider'
import { Router } from './app/Router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootProvider>
      <Router />
    </RootProvider>
  </StrictMode>,
)
