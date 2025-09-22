import { Route, Routes, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Articles from './pages/Articles.jsx'
import Blogs from './pages/Blogs.jsx'
import Therapists from './pages/Therapists.jsx'
import DoctorDetail from './pages/DoctorDetail.jsx'
import Dashboard from './pages/Dashboard.jsx'

 

function Login() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email')
    const password = form.get('password')
    try { const data = await login(email, password); navigate('/dashboard') } catch (e) { alert('Login failed') }
  }
  const handleRegister = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name')
    const email = form.get('email')
    const password = form.get('password')
    try { await register({ name, email, password }); navigate('/dashboard') } catch (e) { alert('Register failed') }
  }
  return (
    <div className="container-page py-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form className="space-y-3 max-w-md" onSubmit={handleSubmit}>
        <input name="email" className="input" placeholder="Email" />
        <input name="password" className="input" placeholder="Password" type="password" />
        <button className="btn btn-primary w-full" type="submit">Sign In</button>
      </form>
      <div className="my-6 h-px bg-gray-200" />
      <h3 className="text-lg font-semibold mb-2">Or Register</h3>
      <form className="space-y-3 max-w-md" onSubmit={handleRegister}>
        <input name="name" className="input" placeholder="Full name" />
        <input name="email" className="input" placeholder="Email" />
        <input name="password" className="input" placeholder="Password" type="password" />
        <button className="btn btn-accent w-full text-white" type="submit">Register</button>
      </form>
    </div>
  )
}

function InnerApp() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/therapists" element={<Therapists />} />
        <Route path="/therapists/:id" element={<DoctorDetail />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute roles={["patient","doctor","admin"]} /> }>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}
