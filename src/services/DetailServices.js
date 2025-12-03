import httpsRequest from '../utils/httpsRequest';

const DetailServices = {
  async getPlaylistDetails(slug) {
    try {
      const safeSlug = encodeURIComponent(slug);
      const res = await httpsRequest.get(
        `/playlists/details/${safeSlug}?limit=50`
      );
      return res.data ?? {};
    } catch (error) {
      console.error(`Lỗi API /playlists/details/${slug}:`, error);
      return {};
    }
  },

  async getAlbumDetails(slug) {
    try {
      const safeSlug = encodeURIComponent(slug);
      const res = await httpsRequest.get(`/albums/details/${safeSlug}`);
      return res.data ?? {};
    } catch (error) {
      console.error(`Lỗi API /albums/details/${slug}:`, error);
      return {};
    }
  },

  async getSongDetails(id) {
    try {
      const safeId = encodeURIComponent(id);
      const res = await httpsRequest.get(`/songs/details/${safeId}`);
      return res.data ?? {};
    } catch (error) {
      console.error(`Lỗi API /songs/details/${id}:`, error);
      return {};
    }
  },

  async getVideoDetails(id) {
    try {
      const safeId = encodeURIComponent(id);
      const res = await httpsRequest.get(`/videos/details/${safeId}`);
      return res.data ?? {};
    } catch (error) {
      console.error(`Lỗi API /videos/details/${id}:`, error);
      return {};
    }
  },
};

export default DetailServices;
