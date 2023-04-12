import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
import PixabayApi from "./js/pixabay-service";
import createMarkup from './js/markup';
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

function onSearch(event) {
    
    event.preventDefault();
    
    pixabayApi.form = refs.formRef;
    pixabayApi.loadmore = refs.loadmoreRef;
    pixabayApi.query = event.currentTarget.elements.query.value.trim();

    handleSearch(pixabayApi.query);
}; 

async function handleSearch() {
    try {
    if (pixabayApi.query === "") {
    throw new Error()
    }
    clearPage();
    await appendPhotos()
    await scrollToTop();
    } catch (error) {
        console.log(error);
        return Notify.failure("Sorry, your query is empty. Please try enter something.");
    }
}
async function appendPhotos() {
    try {
        refs.loadmoreRef.style.visibility = "hidden";
        renderPhotos(await pixabayApi.fetchPhotos());  
    } catch (error) {
        console.log(error);    
     }
    gallery.refresh();
}
function renderPhotos(pictures) {
    refs.galleryRef.insertAdjacentHTML('beforeend', createMarkup(pictures));
};
function clearPage() {
    refs.galleryRef.innerHTML = '';
}
function scrollToTop() {
    scrollTo({
        top: 0,
        behavior:"smooth"
    })
}
