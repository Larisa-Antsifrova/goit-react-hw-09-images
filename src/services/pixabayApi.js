// Axios library imports
import axios from 'axios';
// Configuring Axios
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = process.env.REACT_APP_API_KEY;

// Function to fetch images with query. Returns an array of result objects
async function fetchImages({ query = '', page = 1, perPage = 12 }) {
  const { data } = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
  );
  return data.hits;
}

export { fetchImages };
