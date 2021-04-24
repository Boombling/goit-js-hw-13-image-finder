import imageCard from '../templates/card-list.hbs';
import getRefs from '../js/get-refs';
import debounce from 'lodash.debounce';
import ImagesApiService from './services/images-service';
// import { showAlert, showError } from '../js/pnotify';
const refs = getRefs();

refs.searchRef.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


const imagesApiService = new ImagesApiService();

// console.log(newImagesApiServer);
function onSearch(e) {
    e.preventDefault();

    clearImageList();
    imagesApiService.query = e.currentTarget.elements.query.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImages().then(renderImageList);

}

function renderImageList(hits) {
    refs.cardContainer.insertAdjacentHTML('beforeend', imageCard(hits));
}

function onLoadMore() {
    imagesApiService.fetchImages().then(renderImageList);
}
function clearImageList() {
    refs.cardContainer.innerHTML = '';
}