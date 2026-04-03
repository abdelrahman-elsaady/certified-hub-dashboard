import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Bearer token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  login: async (data) => {
    const res = await api.post('/auth/login', { ...data, role: 'individual' });
    if (res.data?.token) {
      localStorage.setItem('admin_token', res.data.token);
    }
    return res;
  },
  logout: () => {
    localStorage.removeItem('admin_token');
    return api.post('/auth/logout');
  },
  getMe: () => api.get('/auth/me'),
};

// Admin
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getCompanies: (params) => api.get('/admin/companies', { params }),
  getCertificates: (params) => api.get('/admin/certificates', { params }),
  verifyCertificate: (id, data) => api.put(`/admin/certificates/${id}/verify`, data),
  toggleCertificateActive: (id, data) => api.put(`/admin/certificates/${id}/active`, data),
  deleteCertificate: (id) => api.delete(`/admin/certificates/${id}`),
  getSubscriptions: (params) => api.get('/admin/subscriptions', { params }),
  createPlan: (data) => api.post('/admin/plans', data),
  updatePlan: (id, data) => api.put(`/admin/plans/${id}`, data),
  deletePlan: (id) => api.delete(`/admin/plans/${id}`),
  // Certificate Types
  getCertificateTypes: () => api.get('/admin/certificate-types'),
  createCertificateType: (data) => api.post('/admin/certificate-types', data),
  updateCertificateType: (id, data) => api.put(`/admin/certificate-types/${id}`, data),
  deleteCertificateType: (id) => api.delete(`/admin/certificate-types/${id}`),
  // Contact Messages
  getContactMessages: (params) => api.get('/contact', { params }),
  updateContactMessageStatus: (id, data) => api.put(`/contact/${id}/status`, data),
  deleteContactMessage: (id) => api.delete(`/contact/${id}`),
};

// Plans (public — dashboard needs all plans including trials)
export const plansAPI = {
  getAll: () => api.get('/admin/plans'),
};

// Courses
export const coursesAPI = {
  getAll: (params) => api.get('/admin/courses', { params }),
  create: (data) => api.post('/admin/courses', data),
  update: (id, data) => api.put(`/admin/courses/${id}`, data),
  delete: (id) => api.delete(`/admin/courses/${id}`),
};

// Course Categories
export const courseCategoriesAPI = {
  getAll: () => api.get('/admin/course-categories'),
  create: (data) => api.post('/admin/course-categories', data),
  update: (id, data) => api.put(`/admin/course-categories/${id}`, data),
  delete: (id) => api.delete(`/admin/course-categories/${id}`),
};

// Course Plans
export const coursePlansAPI = {
  getAll: () => api.get('/admin/course-plans'),
  create: (data) => api.post('/admin/course-plans', data),
  update: (id, data) => api.put(`/admin/course-plans/${id}`, data),
  delete: (id) => api.delete(`/admin/course-plans/${id}`),
  getSubscriptions: () => api.get('/admin/course-plan-subscriptions'),
};

// About Page
export const aboutAPI = {
  get: () => api.get('/about'),
  update: (data) => api.put('/about', data),
  uploadHeroMedia: (formData) =>
    api.post('/about/hero-media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadAboutImage: (formData) =>
    api.post('/about/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export default api;
