import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppointmentAPI, DoctorAPI } from '../lib/api'
import { useAuth } from '../context/AuthContext.jsx'
import Spinner from '../components/Spinner.jsx'

export default function DoctorDetailPage() {
  const { id } = useParams()
  const { token, user } = useAuth()
  const [doc, setDoc] = useState(null)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const run = async () => {
      try { setDoc(await DoctorAPI.get(id)) } finally { setLoading(false) }
    }
    run()
  }, [id])

  const onBook = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const type = form.get('type')
    const date = form.get('date')
    const time = form.get('time')
    try {
      await AppointmentAPI.create({ token, doctorId: doc.user?._id, type, date, time, notes: form.get('notes') })
      setMsg('Appointment requested')
    } catch (e) {
      setMsg('Booking failed')
    }
  }

  if (loading) return <Spinner />
  if (!doc) return <div className="p-6">Doctor not found</div>

  return (
    <div className="container-page py-8 space-y-6">
      <div className="card card-body">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-100" />
          <div>
            <h2 className="text-2xl font-semibold" style={{color:'#1599de'}}>{doc.user?.name}</h2>
            <div className="text-gray-600">{doc.specialization} • {doc.yearsOfExperience} years</div>
            <div className="text-gray-600">{doc.location?.city}, {doc.location?.country}</div>
            <div className="text-sm text-gray-700 mt-2">{doc.bio}</div>
            <div className="mt-3 flex gap-3 text-sm">
              <span className="px-3 py-1 bg-gray-100 rounded">Home: ${doc.fees?.home}</span>
              <span className="px-3 py-1 bg-gray-100 rounded">Clinic: ${doc.fees?.clinic}</span>
              <span className="px-3 py-1 bg-gray-100 rounded">Online: ${doc.fees?.online}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-body">
        <h3 className="text-xl font-semibold mb-3">Book Appointment</h3>
        {!user ? (
          <div className="text-sm text-red-600">Please login to book.</div>
        ) : user.role !== 'patient' ? (
          <div className="text-sm text-gray-600">Only patients can book.</div>
        ) : (
          <form className="grid gap-3 md:grid-cols-2" onSubmit={onBook}>
            <select name="type" className="input" required>
              <option value="home">Home-based</option>
              <option value="clinic">Clinic-based</option>
              <option value="online">Online consultation</option>
            </select>
            <input type="date" name="date" className="input" required />
            <input type="time" name="time" className="input" required />
            <input name="notes" placeholder="Notes (optional)" className="md:col-span-2 input" />
            <button className="md:col-span-2 btn btn-accent text-white" type="submit">Book</button>
          </form>
        )}
        {msg && <div className="mt-3 text-sm">{msg}</div>}
      </div>
    </div>
  )
}


