/**
 * GridSense AI — Centralized API Service
 * Connects the React frontend to the FastAPI backend.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || `HTTP ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`[GridSense API] ${path} →`, error.message);
    throw error;
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (username, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
};

// ── Complaints ────────────────────────────────────────────────────────────
export const complaintsAPI = {
  getAll: () => request('/api/complaints'),
  create: (data) =>
    request('/api/complaints', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/api/complaints/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  getStats: () => request('/api/complaints/stats/summary'),
};

// ── Transformers ──────────────────────────────────────────────────────────
export const transformersAPI = {
  getAll: () => request('/api/transformers'),
};

// ── Alerts ────────────────────────────────────────────────────────────────
export const alertsAPI = {
  getAll: (limit = 20) => request(`/api/alerts?limit=${limit}`),
};

// ── AI Analysis ───────────────────────────────────────────────────────────
export const aiAPI = {
  analyze: (data) =>
    request('/api/ai/analyze', { method: 'POST', body: JSON.stringify(data) }),
  getSummary: () => request('/api/ai/grid-summary'),
};

// ── Reports ───────────────────────────────────────────────────────────────
export const reportsAPI = {
  get: () => request('/api/reports'),
};

// ── System Status ─────────────────────────────────────────────────────────
export const statusAPI = {
  get: () => request('/api/status'),
};

export default { authAPI, complaintsAPI, transformersAPI, alertsAPI, aiAPI, reportsAPI, statusAPI };
