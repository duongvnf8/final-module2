import httpsRequest from '../utils/httpsRequest';

const AuthService = {
  async login(data) {
    try {
      const res = await httpsRequest.post('/auth/login', data);
      return res.data;
    } catch (error) {
      console.error('Lỗi API /auth/login:', error);
      return null;
    }
  },

  async signup(data) {
    try {
      const res = await httpsRequest.post('/auth/register', data);
      return res.data;
    } catch (error) {
      console.error('Lỗi API /auth/register:', error);
      return null;
    }
  },

  async getProfile() {
    try {
      const res = await httpsRequest.get('/auth/me');
      return res.data;
    } catch (error) {
      console.error('Lỗi API /auth/me:', error);
      return null;
    }
  },

  async logout() {
    try {
      const res = await httpsRequest.delete('/auth/logout');
      return res.data;
    } catch (error) {
      console.error('Lỗi API /auth/logout:', error);
      return null;
    }
  },

  async refreshToken(refreshToken) {
    try {
      const res = await httpsRequest.post('/auth/refresh-token', {
        refreshToken,
      });
      return res.data;
    } catch (error) {
      console.error('Lỗi API /auth/refresh-token:', error);
      return null;
    }
  },

  async updateProfile(data) {
    try {
      const res = await httpsRequest.patch('/auth/me', data);
      return res.data;
    } catch (error) {
      console.error('Lỗi API /auth/me (update profile):', error);
      return null;
    }
  },

  async changePassword(data) {
    try {
      const res = await httpsRequest.patch('/auth/change-password', data);
      return res.data;
    } catch (error) {
      console.error('Lỗi API /auth/change-password:', error);
      return null;
    }
  },
};

export default AuthService;
