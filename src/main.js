import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

 
const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchForm.elements.query.value.trim();

    if (!query) {
        iziToast.error({ title: 'Error', message: 'Please enter a search term.' });
        return;
    }

    loader.style.display = 'block';  

    fetchImages(query)
        .then(images => {
            if (images.length === 0) {
                iziToast.info({ title: 'Info', message: 'Sorry, there are no images matching your search query. Please try again!' });
            } else {
                renderImages(images);
              const lightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250      
});
                lightbox.refresh(); 
            }
        })
        .catch(error => {
            iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again.' });
        })
        .finally(() => {
            loader.style.display = 'none';  
        });
});