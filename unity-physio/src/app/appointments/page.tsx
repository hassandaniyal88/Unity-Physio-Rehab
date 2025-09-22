"use client";
import { useEffect, useState } from "react";

type Appointment = {
  _id?: string;
  doctorId: string;
  patientId: string;
  date: string;
  status: string;
};

export default function AppointmentsPage() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        // Integrate with your API route or external backend here
        // setItems(await fetchAppointments())
      } catch (e) {
        if (mounted) setError("Failed to load appointments");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-page py-8">
        <h1 className="section-title">Appointments</h1>
        {loading && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#1599de] border-t-transparent" />
            Loading...
          </div>
        )}
        {error && <div className="rounded-md bg-red-50 text-red-700 text-sm p-2 mb-4">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto card">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Doctor</th>
                  <th className="text-left px-4 py-2">Patient</th>
                  <th className="text-left px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-600" colSpan={4}>No appointments yet.</td>
                  </tr>
                ) : (
                  items.map((a) => (
                    <tr key={a._id} className="border-t">
                      <td className="px-4 py-2">{new Date(a.date).toLocaleString()}</td>
                      <td className="px-4 py-2">{a.doctorId}</td>
                      <td className="px-4 py-2">{a.patientId}</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">{a.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


