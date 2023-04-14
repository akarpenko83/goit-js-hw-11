import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ButtonLoadMore from './BtnLoadMore';
export default class PixabayApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.form;
    }
    async fetchPhotos() {
        const url = 'https://pixabay.com/api/'; 
        const axiosParams = {
            params: {
            key: "35064628-b4315bc92921e9ccef2ae28e5",
            q: encodeQuery(this.searchQuery),
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page: this.page,
            per_page: "40"
            }
        };
        try {
            const response = await axios.get(url, axiosParams);
            const totalPages = Math.ceil(response.data.totalHits / axiosParams.params.per_page);      
            console.log("totalPages: ", totalPages, "current page: ", this.page);
            if (response.data.hits.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                throw new Error(response)
                };
            if (totalPages === this.page) {
                Notify.warning("We're sorry, but you've reached the end of search results.");
               ButtonLoadMore.disable();
            }
            Notify.info(`Hooray! We found ${response.data.totalHits} images on ${totalPages} pages. Current page: ${this.page}`);
                this.page += 1;            
                return response.data.hits;
        } catch (error) {
            this.searchQuery = "";
         }
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {      
        this.page = 1;
        this.searchQuery = newQuery;
     }
};
function encodeQuery(searchQuery) {
    return encodeURIComponent(searchQuery).replace(/%20/g, "+");
};
