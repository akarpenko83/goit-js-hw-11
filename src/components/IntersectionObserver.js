// --------------------- intersection observer --------------------

    const options = {
    rootMargin: '200px',
    threshold: 0.1,
}
 function callback(entries, observer) {
   entries(appendPhotos());
};
const observer = new IntersectionObserver(callback, options);
const target = document.querySelector(refs.galleryRef.lastElementChild);
observer.observe(target);

// ----------------------------------------------------------------