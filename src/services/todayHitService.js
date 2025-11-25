import httpsRequest from '../utils/httpsRequest';

const getAll = async ({ country = 'GLOBAL', limit = 12 } = {}) => {
  try {
    const response = await httpsRequest.get('/home/todays-hits', {
      params: { country, limit },
    });
    return response.data.items;
  } catch (error) {
    console.error('Lỗi API /home/todays-hits', error);
    throw error;
  }
};

export default {
  getAll,
};
