import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
import PixabayApi from "./js/pixabay-service";
import renderPictures from './js/render';

const refs = {
    formRef: document.querySelector('form'),
    inputRef: document.querySelector('input'),
    loadmoreRef: document.querySelector('.load-more'),
    galleryRef: document.querySelector('.gallery'),
}

const pixabayApi = new PixabayApi();

refs.formRef.addEventListener('submit', onSearch);
refs.loadmoreRef.addEventListener('click', onLoadMore);

function onSearch(event) {
    event.preventDefault();
   
    pixabayApi.form = refs.formRef;
    pixabayApi.query = event.currentTarget.elements.query.value.trim();

    if (pixabayApi.query === "") {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    clearPage();
    pixabayApi.fetchPhotos().then(appendPicturesToPage);
   
}; 

function onLoadMore() { 
    pixabayApi.fetchPhotos().then(appendPicturesToPage); 
}

function appendPicturesToPage(pictures) {
refs.galleryRef.insertAdjacentHTML('beforeend', renderPictures(pictures));
};

function clearPage() {
    refs.galleryRef.innerHTML = '';
}
 
