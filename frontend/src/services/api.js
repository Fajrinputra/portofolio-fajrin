import axios from 'axios';

// MODE: 'static' = baca /data/*.json | 'api' = panggil backend
const DATA_SOURCE =
  import.meta.env.VITE_DATA_SOURCE ||
  (import.meta.env.DEV ? 'api' : 'static');

// ── Static mode helpers ──────────────────────────────────────────────
const cache = new Map();
async function loadJson(name) {
  if (cache.has(name)) return cache.get(name);
  const promise = fetch(`/data/${name}.json`).then((res) => {
    if (!res.ok) throw new Error(`Gagal memuat data ${name} (${res.status})`);
    return res.json();
  });
  cache.set(name, promise);
  try {
    return await promise;
  } catch (err) {
    cache.delete(name);
    throw err;
  }
}

// ── API mode helpers ─────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || '/api';
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
const apiGet = (path, params) => apiClient.get(path, { params }).then((r) => r.data);

// ── Read functions (kedua mode) ──────────────────────────────────────
export const getProfile = () =>
  DATA_SOURCE === 'static' ? loadJson('profile') : apiGet('/profile');

export const getJourneys = () =>
  DATA_SOURCE === 'static' ? loadJson('journeys') : apiGet('/journeys');

export const getOrganizations = () =>
  DATA_SOURCE === 'static' ? loadJson('organizations') : apiGet('/organizations');

export const getOrganizationBySlug = (identifier) => {
  if (DATA_SOURCE === 'static') {
    return loadJson('organizations').then((list) => {
      const found = list.find(
        (o) => o.id === Number(identifier) || o.slug === identifier || String(o.id) === String(identifier)
      );
      if (!found) throw new Error('NOT_FOUND');
      return found;
    });
  }
  return apiGet(`/organizations/${identifier}`);
};

export const getProjects = (category) => {
  if (DATA_SOURCE === 'static') {
    return loadJson('projects').then((list) =>
      category && category !== 'Semua'
        ? list.filter((p) => p.category === category)
        : list
    );
  }
  const params = category && category !== 'Semua' ? { category } : {};
  return apiGet('/projects', params);
};

export const getProjectBySlug = (slug) => {
  if (DATA_SOURCE === 'static') {
    return loadJson('projects').then((list) => {
      const found = list.find((p) => p.slug === slug);
      if (!found) throw new Error('NOT_FOUND');
      return found;
    });
  }
  return apiGet(`/projects/${slug}`);
};

export const getDesigns = (category) => {
  if (DATA_SOURCE === 'static') {
    return loadJson('designs').then((list) =>
      category && category !== 'Semua'
        ? list.filter((d) => d.category === category)
        : list
    );
  }
  const params = category && category !== 'Semua' ? { category } : {};
  return apiGet('/designs', params);
};

export const getDesignBySlug = (slug) => {
  if (DATA_SOURCE === 'static') {
    return loadJson('designs').then((list) => {
      const found = list.find((d) => d.slug === slug);
      if (!found) throw new Error('NOT_FOUND');
      return found;
    });
  }
  return apiGet(`/designs/${slug}`);
};

export const getCertificates = () =>
  DATA_SOURCE === 'static' ? loadJson('certificates') : apiGet('/certificates');

// ── Write functions (hanya mode api) ─────────────────────────────────
const WRITE_ONLY_API = () =>
  Promise.reject(new Error('Operasi tulis hanya tersedia di mode development.'));

export const updateProfile = (data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.put('/profile', data).then((r) => r.data);

export const createJourney = (data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.post('/journeys', data).then((r) => r.data);
export const updateJourney = (id, data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.put(`/journeys/${id}`, data).then((r) => r.data);
export const deleteJourney = (id) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.delete(`/journeys/${id}`).then((r) => r.data);

export const createOrganization = (data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.post('/organizations', data).then((r) => r.data);
export const updateOrganization = (id, data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.put(`/organizations/${id}`, data).then((r) => r.data);
export const deleteOrganization = (id) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.delete(`/organizations/${id}`).then((r) => r.data);

export const createProject = (data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.post('/projects', data).then((r) => r.data);
export const updateProject = (id, data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.put(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.delete(`/projects/${id}`).then((r) => r.data);

export const createDesign = (data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.post('/designs', data).then((r) => r.data);
export const updateDesign = (id, data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.put(`/designs/${id}`, data).then((r) => r.data);
export const deleteDesign = (id) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.delete(`/designs/${id}`).then((r) => r.data);

export const createCertificate = (data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.post('/certificates', data).then((r) => r.data);
export const updateCertificate = (id, data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.put(`/certificates/${id}`, data).then((r) => r.data);
export const deleteCertificate = (id) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.delete(`/certificates/${id}`).then((r) => r.data);

export const getMessages = () =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiGet('/messages');
export const sendMessage = (data) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.post('/messages', data).then((r) => r.data);
export const markMessageRead = (id) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.patch(`/messages/${id}/read`).then((r) => r.data);
export const deleteMessage = (id) =>
  DATA_SOURCE === 'static' ? WRITE_ONLY_API() : apiClient.delete(`/messages/${id}`).then((r) => r.data);
export const getUnreadCount = () =>
  DATA_SOURCE === 'static' ? Promise.resolve({ count: 0 }) : apiGet('/messages/unread-count');

export default apiClient;
