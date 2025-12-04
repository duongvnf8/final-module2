import httpsRequest from '../utils/httpsRequest';

const ExploreService = {
  async getAlbums() {
    try {
      const res = await httpsRequest.get('/explore/albums');
      return res.data.items;
    } catch (error) {
      console.error('Lỗi API /explore/albums:', error);
      return [];
    }
  },

  async getMoodsGenres() {
    try {
      const res = await httpsRequest.get('/explore/meta');
      const { categories, lines } = res.data;
      return [...categories, ...lines];
    } catch (error) {
      console.error('Lỗi API /explore/meta:', error);
      return [];
    }
  },

  async getVideos() {
    try {
      const res = await httpsRequest.get('/explore/videos');
      return res.data.items;
    } catch (error) {
      console.error('Lỗi API /explore/videos:', error);
      return [];
    }
  },

  async getNewReleases() {
    try {
      const res = await httpsRequest.get('/explore/new-releases');
      return res.data.items;
    } catch (error) {
      console.error('Lỗi API /explore/new-releases:', error);
      return [];
    }
  },

  async getCountries() {
    try {
      const res = await httpsRequest.get('/charts/countries');
      return res.data.countries;
    } catch (error) {
      console.error('Lỗi API /charts/countries:', error);
      return [];
    }
  },

  async getTopVideos(country) {
    try {
      const res = await httpsRequest.get(`/charts/videos?country=${country}`);
      return res.data.items || [];
    } catch (error) {
      console.error(`Lỗi API /charts/videos?country=${country}:`, error);
      return [];
    }
  },

  async getTopArtists(country) {
    try {
      const res = await httpsRequest.get(
        `/charts/top-artists?country=${country}`
      );
      return res.data.items || [];
    } catch (error) {
      console.error(`Lỗi API /charts/top-artists?country=${country}:`, error);
      return [];
    }
  },

  async getCategories() {
    try {
      const res = await httpsRequest.get('/categories');
      return res.data.items;
    } catch (error) {
      console.error('Lỗi API /categories:', error);
      return [];
    }
  },

  async getCategoryBySlug(slug) {
    try {
      const res = await httpsRequest.get(`/categories/${slug}`);
      return res.data || {};
    } catch (error) {
      console.error(`Lỗi API /categories/${slug}:`, error);
      return {};
    }
  },

  async getLineSongs() {
    try {
      const res = await httpsRequest.get('/lines');
      return res.data.items;
    } catch (error) {
      console.error('Lỗi API /lines:', error);
      return [];
    }
  },

  async getLineSongBySlug(slug) {
    try {
      const res = await httpsRequest.get(`/lines/${slug}/songs`);
      return res.data.items;
    } catch (error) {
      console.error(`Lỗi API /lines/${slug}/songs:`, error);
      return [];
    }
  },

  async getLinePlaylistBySlug(slug) {
    try {
      const res = await httpsRequest.get(`/lines/${slug}/playlists`);
      return res.data.items;
    } catch (error) {
      console.error(`Lỗi API /lines/${slug}/playlists:`, error);
      return [];
    }
  },

  async getLineVideoBySlug(slug) {
    try {
      const res = await httpsRequest.get(`/lines/${slug}/videos`);
      return res.data.items;
    } catch (error) {
      console.error(`Lỗi API /lines/${slug}/videos:`, error);
      return [];
    }
  },

  async getLineAlbumBySlug(slug) {
    try {
      const res = await httpsRequest.get(`/lines/${slug}/albums`);
      return res.data.items;
    } catch (error) {
      console.error(`Lỗi API /lines/${slug}/albums:`, error);
      return [];
    }
  },
};

export default ExploreService;
