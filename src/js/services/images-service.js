const BASE_URL = 'https://pixabay.com';
const API_KEY = '21270738-7f7a1d93c56d2e649f64c176e';

export default class ImagesApiService {
    construct(){
        this.searchQuery = '';
        this.page = 1;
    }
    
    // async fetchImages() {
    //     const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        
    //     const fetch = await fetch(url);
    //     const response = await fetch.json();
    //     const hitss = ({ hits }) => {
    //         this.incrementPage(hits);
    //         return hitss;
    //     }

    // }

    fetchImages() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        
        return fetch(url)
            .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                console.log(this);
                return hits;
            })
            .catch(error => console.error(error));
    }
    
    incrementPage(){
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    
    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery = newQuery;
    }
}