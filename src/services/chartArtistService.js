import httpsRequest from '../utils/httpsRequest';

const getAll = async () => {
  try {
    const response = await httpsRequest.get('/charts/top-artists');
    return response.data.items;
  } catch (error) {
    console.error('Lỗi API /charts/top-artists', error);
    throw error;
  }
};

export default {
  getAll,
};
