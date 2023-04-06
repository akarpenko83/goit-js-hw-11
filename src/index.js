const refs = {
    formRef: document.querySelector('form'),
}


refs.formRef.addEventListener('submit', onSearch);

// ======================== pixabay ==================================
let searchQuery = '';
const API_KEY = '35064628-b4315bc92921e9ccef2ae28e5';
const IMAGE_TYPE = 'image_type=photo';
const ORIENTATION = 'orientation=horizontal';
const SAFESEARCH = 'safesearch=true';


function onSearch(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value;
    let url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeQuery(searchQuery)}&${IMAGE_TYPE}&${ORIENTATION}&${SAFESEARCH}`;
    console.log(url);
    fetch(url)
        .then(data => {
        console.log(data);
        return data.json()
        
    })
        .then(data => console.dir(data))
        .catch(err => console.error(err));

 }

function encodeQuery(searchQuery) {
    return encodeURIComponent(searchQuery).replace(/%20/g, "+");
 }









