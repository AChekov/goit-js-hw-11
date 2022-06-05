import ApiService from './js/api';
import getRefs from './js/refs';

const refs = getRefs();
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

function onSearchForm(evt) {
  evt.preventDefault();

  apiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  return console.log(query);
}

function onLoadMoreClick() {}
