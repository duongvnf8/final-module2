import httpsRequest from '../utils/httpsRequest';

const getAll = async () => {
  try {
    const response = await httpsRequest.get('/explore/videos');
    return response.data.items;
  } catch (error) {
    console.error('Lỗi API /explore/videos', error);
    throw error;
  }
};

export default {
  getAll,
};
