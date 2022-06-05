const axios = require('axios').default;

const API_KEY = '27846250-3afc119c8c7bb9bcb017e0724';
const URL = 'https://pixabay.com/api/';
const options = 'image_type=photo&orientation=horizontal&safesearch=true';
const perPage = 40;

export default class ApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async fetchImage() {
    try {
      const url = `${URL}?key=${API_KEY}&q=${this.searchQuery}&${options}&page=${this.page}&per_page=${perPage}`;
      const response = await axios(url);
      const image = await response(data);
      return image;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
