import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { apiRequest } from '../lib/api'

function PatientDashboard() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const run = async () => {
      try { setItems(await apiRequest('/api/appointments', { token })) } finally { setLoading(false) }
    }
    run()
  }, [token])
  if (loading) return <div className="p-6">Loading...</div>
  return (
    <div className="space-y-3">
      {items.map(a => (
        <div key={a._id} className="bg-white border rounded p-3">
          <div className="font-medium">{a.type} • {new Date(a.date).toLocaleDateString()} {a.time}</div>
          <div className="text-sm text-gray-600">Doctor: {a.doctor?.name} • Fee: ${a.fee} • Status: {a.status}</div>
        </div>
      ))}
    </div>
  )
}

function DoctorDashboard() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const run = async () => {
      try { setItems(await apiRequest('/api/appointments', { token })) } finally { setLoading(false) }
    }
    run()
  }, [token])
  if (loading) return <div className="p-6">Loading...</div>
  return (
    <div className="space-y-3">
      {items.map(a => (
        <div key={a._id} className="bg-white border rounded p-3">
          <div className="font-medium">{a.type} • {new Date(a.date).toLocaleDateString()} {a.time}</div>
          <div className="text-sm text-gray-600">Patient: {a.user?.name} • Fee: ${a.fee} • Status: {a.status}</div>
        </div>
      ))}
    </div>
  )
}

function AdminDashboard() {
  return (
    <div className="text-gray-600">Use backend admin endpoints to manage users, doctors, and appointments.</div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  return (
    <div className="mx-auto max-w-6xl p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      {user?.role === 'patient' && <PatientDashboard />}
      {user?.role === 'doctor' && <DoctorDashboard />}
      {user?.role === 'admin' && <AdminDashboard />}
    </div>
  )
}


