import httpsRequest from '../utils/httpsRequest';

const getAll = async () => {
  try {
    const response = await httpsRequest.get('/charts/videos');
    return response.data.items;
  } catch (error) {
    console.error('Lỗi API /charts/videos', error);
    throw error;
  }
};

export default {
  getAll,
};
