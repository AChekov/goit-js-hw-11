const axios = require('axios').default;

const API_KEY = '27846250-3afc119c8c7bb9bcb017e0724';
const URL = 'https://pixabay.com/api/';
const options = 'image_type=photo&orientation=horizontal&safesearch=true';
const perPage = 40;

export default class ApiService {
  constructor() {
    // поисковый запрос
    this.searchQuery = '';
    // номер страницы
    this.page = 1;
  }

  // получает и возвращает данные из библиотеки
  async fetchImage() {
    try {
      const url = `${URL}?key=${API_KEY}&q=${this.searchQuery}&${options}&page=${this.page}&per_page=${perPage}`;
      const response = await axios(url);
      const image = await response.data;
      return image;
    } catch (error) {
      console.log(error);
    }
  }

  // добавляет следующую страницу
  incrementPage() {
    this.page += 1;
  }

  // сброс при новом запросе сброс
  resetPage() {
    this.page = 1;
  }

  // получает и перезаписывает данные
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
