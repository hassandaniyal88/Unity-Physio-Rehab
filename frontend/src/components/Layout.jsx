import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function Navbar() {
  const { user, logout } = useAuth()
  const linkClass = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#1599de] text-white' : 'text-gray-700 hover:bg-gray-200'}`
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container-page">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="text-xl font-semibold" style={{color:'#1599de'}}>Unity Physio Rehab</Link>
          <div className="hidden md:flex gap-2">
            <NavLink to="/" className={linkClass} end>Home</NavLink>
            <NavLink to="/therapists" className={linkClass}>Therapists</NavLink>
            <NavLink to="/articles" className={linkClass}>Articles</NavLink>
            <NavLink to="/blogs" className={linkClass}>Blogs</NavLink>
            {user ? (
              <>
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                <button onClick={logout} className="btn btn-accent text-white">Logout</button>
              </>
            ) : (
              <NavLink to="/login" className={linkClass}>Login</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="container-page py-6 text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>© {new Date().getFullYear()} Unity Physio Rehab</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}


