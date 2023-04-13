import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
import PixabayApi from "./js/pixabay-service";
import createMarkup from './js/markup';
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css";
import ButtonLoadMore from './components/BtnLoadMore';

const refs = {
    bodyRef: document.querySelector('body'),
    formRef: document.querySelector('form'),
    inputRef: document.querySelector('input'),
    galleryRef: document.querySelector('.gallery'),
    // listenItemRef: document.querySelector()
}

const buttonLoadMore = new ButtonLoadMore({
    selector: ".load-more",
    isHidden: true,
});

buttonLoadMore.button.addEventListener('click', appendPhotos);

const pixabayApi = new PixabayApi();
const gallery = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

refs.formRef.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    
    pixabayApi.form = refs.formRef;
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
        buttonLoadMore.hide();
        return Notify.failure("Sorry, your query is empty. Please try enter something.");
        
    }
}
async function appendPhotos() {
    try {
        buttonLoadMore.show();
        buttonLoadMore.disable();
        renderPhotos(await pixabayApi.fetchPhotos()); 
        buttonLoadMore.enable();
    } catch (error) {
        console.log(error); 
        buttonLoadMore.hide();
     }
    gallery.refresh();
// --------------------- intersection observer --------------------
// const options = {
//     rootMargin: '0px',
//     threshold: 0.1,
// }
// const callback = function(entries, observer) {
//     appendPhotos;
// };
// const observer = new IntersectionObserver(callback, options);
// const target = document.querySelector(refs.galleryRef.lastElementChild);
// observer.observe(target);
// ----------------------------------------------------------------
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
