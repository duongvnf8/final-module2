import httpsRequest from '../utils/httpsRequest';

const HomeService = {
  async getQuickPicks() {
    try {
      const res = await httpsRequest.get('/quick-picks');
      return res.data;
    } catch (error) {
      console.error('Lỗi API /quick-picks:', error);
      return [];
    }
  },

  async getAlbumsForYou() {
    try {
      const res = await httpsRequest.get('/home/albums-for-you');
      return res.data;
    } catch (error) {
      console.error('Lỗi API /home/albums-for-you:', error);
      return [];
    }
  },

  async getTodaysHits() {
    try {
      const res = await httpsRequest.get('/home/todays-hits');
      return res.data;
    } catch (error) {
      console.error('Lỗi API /home/todays-hits:', error);
      return [];
    }
  },

  async getPlaylistsByCountry(country) {
    try {
      const res = await httpsRequest.get(
        `/playlists/by-country?country=${country}`
      );
      return res.data;
    } catch (error) {
      console.error(`Lỗi API /playlists/by-country (${country}):`, error);
      return [];
    }
  },

  async getMoods() {
    try {
      const res = await httpsRequest.get('/moods');
      return res.data?.items || [];
    } catch (error) {
      console.error('Lỗi API /moods:', error);
      return [];
    }
  },

  async getMoodDetails(slug) {
    try {
      const res = await httpsRequest.get(`/moods/${slug}`);
      return res.data || {};
    } catch (error) {
      console.error(`Lỗi API /moods/${slug}:`, error);
      return {};
    }
  },
};

export default HomeService;
