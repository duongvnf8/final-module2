import httpsRequest from '../utils/httpsRequest';

export default {
  async login(payload) {
    const res = await httpsRequest.post('/auth/login', payload);
    return res.data;
  },

  async signup(payload) {
    const res = await httpsRequest.post('/auth/register', payload);
    return res.data;
  },

  async getProfile() {
    const res = await httpsRequest.get('/auth/me');
    return res.data;
  },

  async logout() {
    const res = await httpsRequest.delete('/auth/logout');
    return res.data;
  },

  async refreshToken(refreshToken) {
    const res = await httpsRequest.post('/auth/refresh-token', {
      refreshToken,
    });
    return res.data;
  },

  async updateProfile(data) {
    const res = await httpsRequest.patch('/auth/me', data);
    return res.data;
  },

  async changePassword(data) {
    const res = await httpsRequest.patch('/auth/change-password', data);
    return res.data;
  },
};
