import httpsRequest from '../utils/httpsRequest';

const getAll = async () => {
  try {
    const response = await httpsRequest.get('/categories');
    return response.data.items;
  } catch (error) {
    console.error('Lỗi API /categories', error);
    throw error;
  }
};

export default {
  getAll,
};
