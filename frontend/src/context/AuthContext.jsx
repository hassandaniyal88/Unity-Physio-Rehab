import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { AuthAPI } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('upr_token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('upr_user')
    return raw ? JSON.parse(raw) : null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) localStorage.setItem('upr_token', token); else localStorage.removeItem('upr_token')
  }, [token])
  useEffect(() => {
    if (user) localStorage.setItem('upr_user', JSON.stringify(user)); else localStorage.removeItem('upr_user')
  }, [user])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const data = await AuthAPI.login(email, password)
      setToken(data.token)
      setUser({ id: data._id, name: data.name, email: data.email, role: data.role })
      return data
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload) => {
    setLoading(true)
    try {
      const data = await AuthAPI.register(payload)
      setToken(data.token)
      setUser({ id: data._id, name: data.name, email: data.email, role: data.role })
      return data
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken('')
    setUser(null)
  }

  const value = useMemo(() => ({ token, user, loading, login, register, logout }), [token, user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


