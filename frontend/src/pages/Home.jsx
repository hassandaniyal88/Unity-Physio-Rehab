import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <section className="bg-white">
        <div className="container-page py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color:'#1599de'}}>Recover Stronger with Expert Physiotherapy</h1>
            <p className="text-gray-600 mb-6">Home-based, clinic, and online sessions tailored to your recovery goals.</p>
            <div className="flex gap-3">
              <Link to="/therapists" className="btn btn-primary">Book Appointment</Link>
              <Link to="/articles" className="btn btn-outline-primary">Explore Articles</Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded-xl h-64 md:h-80" />
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-2xl font-semibold mb-6">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {["Home Visits","Clinic Sessions","Online Consultation"].map((title, idx) => (
            <div key={idx} className="card card-body hover:shadow">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600">Professional care with flexible scheduling and transparent pricing.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


