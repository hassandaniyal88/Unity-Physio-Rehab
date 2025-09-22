const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function apiRequest(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}

export const AuthAPI = {
  login: (email, password) => apiRequest('/api/auth/login', { method: 'POST', body: { email, password } }),
  register: (payload) => apiRequest('/api/auth/register', { method: 'POST', body: payload }),
  profile: (token) => apiRequest('/api/auth/profile', { token }),
};

export const DoctorAPI = {
  list: () => apiRequest('/api/doctors'),
  get: (id) => apiRequest(`/api/doctors/${id}`),
};

export const AppointmentAPI = {
  create: ({ token, doctorId, type, date, time, notes }) =>
    apiRequest('/api/appointments', { method: 'POST', token, body: { doctorId, type, date, time, notes } }),
};


