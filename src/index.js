import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
import PixabayApi from "./js/pixabay-service";
import createMarkup from './js/render';
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    bodyRef: document.querySelector('body'),
    formRef: document.querySelector('form'),
    inputRef: document.querySelector('input'),
    loadmoreRef: document.querySelector('.load-more'),
    galleryRef: document.querySelector('.gallery'),

}

const pixabayApi = new PixabayApi();
const gallery = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

refs.formRef.addEventListener('submit', onSearch);
refs.loadmoreRef.addEventListener('click', appendPhotos);

async function onSearch(event) {
    
    event.preventDefault();
    
    pixabayApi.form = refs.formRef;
    pixabayApi.loadmore = refs.loadmoreRef;
    pixabayApi.query = event.currentTarget.elements.query.value.trim();
    if (pixabayApi.query === "") {
        return Notify.failure("Sorry, your query is empty. Please try enter something.");
    }

    clearPage();
    await appendPhotos()
    await scrollTo({
        top: 0,
        behavior:"smooth"
    })
}; 

async function appendPhotos() {
    try {
        refs.loadmoreRef.style.visibility = "hidden";
        renderPhotos(await pixabayApi.fetchPhotos());
        refs.loadmoreRef.style.visibility = "visible";
        
    } catch (error) {
        console.log(error);
        // Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        
     }
    
    gallery.refresh();
    
 }

function renderPhotos(pictures) {
    refs.galleryRef.insertAdjacentHTML('beforeend', createMarkup(pictures));
};

function clearPage() {
    refs.galleryRef.innerHTML = '';
}
 
