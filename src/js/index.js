import imageCard from '../templates/card-list.hbs';
import getRefs from '../js/get-refs';
import ImagesApiService from './services/images-service';
import { showAlert, showError } from '../js/pnotify';

const refs = getRefs();

refs.searchRef.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


const imagesApiService = new ImagesApiService();

async function onSearch(e) {
    e.preventDefault();

    clearImageList();
    imagesApiService.query = e.currentTarget.elements.query.value;
    try {
        imagesApiService.resetPage();
        const response = await imagesApiService.fetchImages();
        const render = await renderImageList(response);
        return render;
    }
    catch {
        onShowError();
    }
    finally {
        refs.searchRef.query.value = '';
    }

}

function renderImageList(hits) {
     if (imagesApiService.query === '') {
         return showAlert('Invalid request. Please try again')
     }
     
    else{
         refs.cardContainer.insertAdjacentHTML('beforeend', imageCard(hits));
    }
    
}

function onLoadMore() {
    imagesApiService.fetchImages().then(renderImageList);
}
function clearImageList() {
    refs.cardContainer.innerHTML = '';
}
function onShowError(error) {
        showError('The request is incorrect. Please try again.');
}