import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class PixabayApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.form;
    
    }
    fetchPhotos() {
        const BASE_URL = 'https://pixabay.com/api/?key=';
        const API_KEY = '35064628-b4315bc92921e9ccef2ae28e5';
        const IMAGE_TYPE = 'image_type=photo';
        const ORIENTATION = 'orientation=horizontal';
        const SAFESEARCH = 'safesearch=true';
        const PER_PAGE = "per_page=40"  
        const url = `${BASE_URL}${API_KEY}&q=${encodeQuery(this.searchQuery)}&${IMAGE_TYPE}&${ORIENTATION}&${SAFESEARCH}&page=${this.page}&${PER_PAGE}`; 

    
      return fetch(url)
            .then(data => {
                if (!data.ok) {
                throw new Error(data.status);
                }
                return data.json()
            })
            .then(data => {
                if (data.hits.length === 0) {
                throw new Error(data.status)
                };
                incrementPage();
                Notify.info(`Hooray! We found ${data.totalHits} images.`);
                return data.hits;
            })
            .catch(err => {
                this.searchQuery = "";
                this.form.reset();
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }); 
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {      
        this.page = 1;
        this.searchQuery = newQuery;
     }
};
function incrementPage() {
this.page += 1;
}

function encodeQuery(searchQuery) {
    return encodeURIComponent(searchQuery).replace(/%20/g, "+");
};
