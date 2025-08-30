import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppHookContainer from './AppHookContainer.tsx'
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppHookContainer />
    </BrowserRouter>
  </StrictMode>,
)
