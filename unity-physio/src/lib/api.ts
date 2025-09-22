const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function apiRequest<T = any>(path: string, options: { method?: string; body?: any; token?: string } = {}): Promise<T> {
  const { method = 'GET', body, token } = options;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  const contentType = res.headers.get('content-type') || '';
  return (contentType.includes('application/json') ? res.json() : (res.text() as any)) as T;
}

export const AuthAPI = {
  register: (payload: { name: string; email: string; password: string; role?: string; doctorCode?: string; adminCode?: string; }) =>
    apiRequest('/api/auth/register', { method: 'POST', body: payload }),
  login: (email: string, password: string) =>
    apiRequest('/api/auth/login', { method: 'POST', body: { email, password } }),
};

export const AppointmentAPI = {
  listMy: (token: string) => apiRequest('/api/appointments', { token }),
};


