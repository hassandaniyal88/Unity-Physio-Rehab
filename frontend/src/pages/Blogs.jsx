import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner.jsx'
import { apiRequest } from '../lib/api'

export default function BlogsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const run = async () => {
      try { setItems(await apiRequest('/api/articles')) } catch (e) { setError('Failed to load') } finally { setLoading(false) }
    }
    run()
  }, [])
  if (loading) return <Spinner />
  if (error) return <div className="container-page py-8 text-red-600">{error}</div>
  return (
    <div className="container-page py-8">
      <h2 className="section-title">Blogs</h2>
      <div className="space-y-3">
        {items.map(a => (
          <article key={a._id} className="card card-body">
            <h3 className="font-semibold" style={{color:'#1599de'}}>{a.title}</h3>
            <p className="text-sm text-gray-600">{a.body?.slice(0, 200)}{a.body?.length > 200 ? '…' : ''}</p>
          </article>
        ))}
      </div>
    </div>
  )
}


