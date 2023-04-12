import axios from 'axios';
// const axios = require('axios/dist/node/axios.cjs');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// export default class PixabayApi {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//         this.form;
//         this.loadmore;
    
//     }
//     fetchPhotos() {
//         const BASE_URL = 'https://pixabay.com/api/?key=';
//         const API_KEY = '35064628-b4315bc92921e9ccef2ae28e5';
//         const IMAGE_TYPE = 'image_type=photo';
//         const ORIENTATION = 'orientation=horizontal';
//         const SAFESEARCH = 'safesearch=true';
//         const PER_PAGE = "per_page=40"
//         const url = `${BASE_URL}${API_KEY}&q=${encodeQuery(this.searchQuery)}&${IMAGE_TYPE}&${ORIENTATION}&${SAFESEARCH}&page=${this.page}&${PER_PAGE}`;

    
//         return axios
//             .get(url)
//             .then(response => {
//                 // console.log(response);
//                 // console.log(this.loadmore);
//                 // console.log(url);
//                 // console.log(this.page);
//                 // if (response.status !== 200) {
//                 // throw new Error(error.response.message);
//                 // };
//                 // if (response.data.hits.length === 0) {
//                 // throw new Error(response)
//                 // };
//                 Notify.info(`Hooray! We found ${response.data.totalHits} images on ${Math.ceil(response.data.totalHits / 40)} pages. Current page: ${this.page}`);
//                 this.page += 1;
//                 return response.data.hits;
//             })
//               .catch((error) => {
//                   this.searchQuery = "";
//                   this.loadmore.style.visibility = "hidden";
//                   console.log(error.response, error.status, error.message);
                  
//             });
//     }
//     get query() {
//         return this.searchQuery;
//     }
//     set query(newQuery) {
//         this.page = 1;
//         this.searchQuery = newQuery;
//         this.loadmore.style.visibility = "hidden";
//      }
// };

export default class PixabayApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.form;
        this.loadmore;
    
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
            
            console.log("totalPages: ", totalPages, "currant page: ", this.page);
            console.log(response);
            if (response.data.hits.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                throw new Error(response)
                };
            if (totalPages === this.page) {
                Notify.warning("We're sorry, but you've reached the end of search results.");
                return
             }
            Notify.info(`Hooray! We found ${response.data.totalHits} images on ${totalPages} pages. Current page: ${this.page}`);
                this.page += 1;            
                return response.data.hits;
        } catch (error) {
            this.searchQuery = "";
            this.loadmore.style.visibility = "hidden";
         }
        // return await axios
        //  .get(url, axiosParams)
            // .then(response => {
                // console.log(response);
                // console.log(this.loadmore);
                // console.log(url);
                // console.log(this.page);
                // if (response.status !== 200) {
                // throw new Error(error.response.message);
                // }; 
                // if (response.data.hits.length === 0) {
                // throw new Error(response)
                // };
            //     Notify.info(`Hooray! We found ${response.data.totalHits} images on ${Math.ceil(response.data.totalHits / 40)} pages. Current page: ${this.page}`);
            //     this.page += 1;            
            //     return response.data.hits;
            // })
            //   .catch((error) => {
            //       this.searchQuery = "";
            //       this.loadmore.style.visibility = "hidden";
            //       console.log(error.response, error.status, error.message); 
                  
            // }); 
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {      
        this.page = 1;
        this.searchQuery = newQuery;
        this.loadmore.style.visibility = "hidden";
     }
};
// function incrementPage() {
// this.page += 1;
// }

function encodeQuery(searchQuery) {
    return encodeURIComponent(searchQuery).replace(/%20/g, "+");
};
