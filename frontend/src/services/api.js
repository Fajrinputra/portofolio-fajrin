import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// --- Profile ---
export const getProfile = () => api.get('/profile').then(r => r.data);
export const updateProfile = (data) => api.put('/profile', data).then(r => r.data);

// --- Journeys ---
export const getJourneys = () => api.get('/journeys').then(r => r.data);
export const createJourney = (data) => api.post('/journeys', data).then(r => r.data);
export const updateJourney = (id, data) => api.put(`/journeys/${id}`, data).then(r => r.data);
export const deleteJourney = (id) => api.delete(`/journeys/${id}`).then(r => r.data);

// --- Organizations ---
export const getOrganizations = () => api.get('/organizations').then(r => r.data);
export const getOrganizationBySlug = (identifier) => api.get(`/organizations/${identifier}`).then(r => r.data);
export const createOrganization = (data) => api.post('/organizations', data).then(r => r.data);
export const updateOrganization = (id, data) => api.put(`/organizations/${id}`, data).then(r => r.data);
export const deleteOrganization = (id) => api.delete(`/organizations/${id}`).then(r => r.data);

// --- Projects ---
export const getProjects = (category) => {
  const params = category && category !== 'Semua' ? { category } : {};
  return api.get('/projects', { params }).then(r => r.data);
};
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}`).then(r => r.data);
export const createProject = (data) => api.post('/projects', data).then(r => r.data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data).then(r => r.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`).then(r => r.data);

// --- Designs ---
export const getDesigns = (category) => {
  const params = category && category !== 'Semua' ? { category } : {};
  return api.get('/designs', { params }).then(r => r.data);
};
export const getDesignBySlug = (slug) => api.get(`/designs/${slug}`).then(r => r.data);
export const createDesign = (data) => api.post('/designs', data).then(r => r.data);
export const updateDesign = (id, data) => api.put(`/designs/${id}`, data).then(r => r.data);
export const deleteDesign = (id) => api.delete(`/designs/${id}`).then(r => r.data);

// --- Photos ---
export const getPhotos = (category) => {
  const params = category && category !== 'Semua' ? { category } : {};
  return api.get('/photos', { params }).then(r => r.data);
};
export const createPhoto = (data) => api.post('/photos', data).then(r => r.data);
export const updatePhoto = (id, data) => api.put(`/photos/${id}`, data).then(r => r.data);
export const deletePhoto = (id) => api.delete(`/photos/${id}`).then(r => r.data);

// --- Certificates ---
export const getCertificates = () => api.get('/certificates').then(r => r.data);
export const createCertificate = (data) => api.post('/certificates', data).then(r => r.data);
export const updateCertificate = (id, data) => api.put(`/certificates/${id}`, data).then(r => r.data);
export const deleteCertificate = (id) => api.delete(`/certificates/${id}`).then(r => r.data);

export default api;
