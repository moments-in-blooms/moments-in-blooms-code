import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'

function RequireAuth({ children }) {
  const { session } = useAuth()
  const location = useLocation()

  if (!session) {
    const from = location.pathname + location.search
    return <Navigate to="/admin/login" replace state={{ from }} />
  }

  return children
}

export default RequireAuth