import ApiService from './js/api';
import getRefs from './js/refs';
import { Notify } from 'notiflix';

const refs = getRefs();
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', fetchImage);

refs.loadMoreBtn.classList.add('is-hidden');

function onSearchForm(evt) {
  evt.preventDefault();

  apiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  clearImagesGallery();
  apiService.resetPage();
  fetchImage();
}

function fetchImage() {
  apiService.fetchImage().then(({ totalHits, hits }) => {
    if (totalHits === 0) {
      clearImagesGallery();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (hits.length > 0) {
      refs.loadMoreBtn.classList.remove('is-hidden');
      renderMarkupImages(hits);
      apiService.incrementPage();
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    console.log(totalHits);
    console.log(hits.length);
    console.log(hits);
  });
}

// function onLoadMoreClick() {
//   fetchImage();
// }

function renderMarkupImages(images) {
  const imageCard = images
    .map(image => {
      return `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="300" height="200"/>
        <div class="info">
          <p class="info-item">
            <b>Likes:</b>
            ${image.likes}
          </p>
          <p class="info-item">
            <b>Views:</b>
            ${image.views}
          </p>
          <p class="info-item">
            <b>Comments:</b>
            ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads:</b>
            ${image.downloads}
          </p>
        </div>
    </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', imageCard);
}

function clearImagesGallery() {
  refs.gallery.innerHTML = '';
}
