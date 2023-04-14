import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
import PixabayApi from "./components/pixabay-service";
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

// const buttonLoadMore = new ButtonLoadMore({
//     selector: ".load-more",
//     isHidden: true,
// });

// buttonLoadMore.button.addEventListener('click', appendPhotos);

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
    intersection()    
    } catch (error) {
        console.log(error);
        buttonLoadMore.hide();
        return Notify.failure("Sorry, your query is empty. Please try enter something.");     
    }
}
async function appendPhotos() {
    try {
        // buttonLoadMore.show();
        // buttonLoadMore.disable();
        await renderPhotos(await pixabayApi.fetchPhotos());

        // buttonLoadMore.enable();
    } catch (error) {
        console.log(error);
        // buttonLoadMore.hide();
     }
    gallery.refresh();
}
// async function appendPhotos() {
//     try {

//         await renderPhotos(await pixabayApi.fetchPhotos()); 

//     } catch (error) {
//         console.log(error); 
//      }
//     gallery.refresh();
// }
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
function intersection() {
    const options = {
        rootMargin: '0px',
        threshold: 0.5,
    }
    let target = refs.galleryRef.lastElementChild;

    console.log("🚀 ~ intersection ~ target:", target)

    async function callback(entries, observer) {
        if (entries[0].isIntersecting) {
            updateTarget();
        }
};
    const observer = new IntersectionObserver(callback, options);
    async function updateTarget() {
            observer.unobserve(target);
            console.log("пересекается");
            await appendPhotos(); 
            target = refs.galleryRef.lastElementChild;
            console.log("new target:", target);
            observer.observe(target); 
    }
    observer.observe(target); 
 }
