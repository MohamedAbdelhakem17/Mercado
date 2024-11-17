import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import './assets/css/index.css'
import './i18n/config';
import App from './Component/App/App'
import LocalizationProvider from './Context/Localization/LocalizationProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalizationProvider>
      <App />
    </LocalizationProvider>
  </StrictMode>,
)
