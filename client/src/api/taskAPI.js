import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Task API calls
export const taskAPI = {
  getAllTasks: (params = {}) => apiClient.get('/tasks', { params }),
  getTaskById: (id) => apiClient.get(`/tasks/${id}`),
  createTask: (taskData) => apiClient.post('/tasks', taskData),
  updateTask: (id, updates) => apiClient.patch(`/tasks/${id}`, updates),
  deleteTask: (id) => apiClient.delete(`/tasks/${id}`),
  bulkUpdateTasks: (ids, updates) => apiClient.patch('/tasks/bulk/update', { ids, updates }),
  deleteCompletedTasks: () => apiClient.delete('/tasks/completed/cleanup'),
  getStats: () => apiClient.get('/stats'),
};

export default apiClient;
