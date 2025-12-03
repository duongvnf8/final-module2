// src/utils/httpsRequest.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || '';

const httpsRequest = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

// Request interceptor: tự gắn access_token
httpsRequest.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers)
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  err => Promise.reject(err)
);

// Response interceptor: khi 401 -> thử refresh token 1 lần rồi retry
httpsRequest.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    // nếu response 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // queue requests chờ refresh hoàn thành
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return httpsRequest(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // gọi thẳng axios để tránh vòng import
        const { data } = await axios.post(
          `${baseURL}/auth/refresh-token`,
          {
            refreshToken,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const newAccess = data.access_token;
        const newRefresh = data.refresh_token;

        if (newAccess) localStorage.setItem('access_token', newAccess);
        if (newRefresh) localStorage.setItem('refresh_token', newRefresh);

        httpsRequest.defaults.headers.common['Authorization'] =
          'Bearer ' + newAccess;
        processQueue(null, newAccess);

        originalRequest.headers.Authorization = 'Bearer ' + newAccess;
        return httpsRequest(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default httpsRequest;
