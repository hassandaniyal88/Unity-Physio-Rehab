import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DoctorAPI } from '../lib/api'
import Spinner from '../components/Spinner.jsx'

export default function TherapistsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const run = async () => {
      try { setItems(await DoctorAPI.list()) } catch (e) { setError('Failed to load') } finally { setLoading(false) }
    }
    run()
  }, [])

  if (loading) return <Spinner />
  if (error) return <div className="p-6 text-red-600">{error}</div>

  return (
    <div className="container-page py-8">
      <h2 className="section-title">Therapists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((d) => (
          <div key={d._id} className="card overflow-hidden hover:shadow">
            <div className="h-36 bg-gray-100" />
            <div className="card-body">
              <div className="text-lg font-semibold">{d.user?.name}</div>
              <div className="text-sm text-gray-600">{d.specialization}</div>
              <div className="text-sm text-gray-600">{d.yearsOfExperience} years • {d.location?.city}</div>
              <div className="text-sm text-gray-600 mb-3">Rating: {(d.averageRating?.toFixed?.(1) ?? 0)} ⭐ ({d.numReviews ?? 0})</div>
              <div className="flex gap-2">
                <Link to={`/therapists/${d._id}`} className="btn btn-primary">View Profile</Link>
                <Link to={`/therapists/${d._id}`} className="btn btn-accent">Book Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


