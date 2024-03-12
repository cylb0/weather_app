import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TemperatureScaleProvider } from './assets/context/TemperatureScaleContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TemperatureScaleProvider>
      <App />
    </TemperatureScaleProvider>
  </React.StrictMode>,
)
