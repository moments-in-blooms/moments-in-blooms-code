import { MotionConfig } from 'framer-motion'
import AuthProvider from './context/AuthProvider.jsx'
import ContentProvider from './context/ContentProvider.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <ContentProvider>
          <AppRoutes />
        </ContentProvider>
      </AuthProvider>
    </MotionConfig>
  )
}

export default App