import axios from 'axios';

const API_KEY = '29837319-52dd2bde37e487871542beaa5';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: `${query}`,
      per_page: 12,
      orientation: 'horizontal',
      page: `${page}`,
    },
  });
  return response.data;
};
