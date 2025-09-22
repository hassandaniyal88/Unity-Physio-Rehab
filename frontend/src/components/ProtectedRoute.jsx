import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && roles.length > 0 && !roles.includes(user.role)) return <Navigate to="/" replace />
  return <Outlet />
}


