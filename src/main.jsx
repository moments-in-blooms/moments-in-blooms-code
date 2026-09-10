import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from 'styled-components'
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'
import GlobalStyles from './styles/GlobalStyles.js'
import theme from './styles/theme.js'

registerSW({
  immediate: true,
  onRegistered(registration) {
    // Pick up deploys in long-lived tabs; the controllerchange handler
    // below reloads once the new worker takes control.
    if (registration) {
      setInterval(() => registration.update(), 60 * 60 * 1000)
    }
  },
})

// A freshly deployed service worker activates in the background while the
// open page still renders the previous bundle. Reload once it takes control
// so visitors always see the latest production version without refreshing.
if ('serviceWorker' in navigator) {
  let refreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return
    refreshing = true
    window.location.reload()
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
