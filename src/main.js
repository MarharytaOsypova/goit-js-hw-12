import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

 
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchSubmit(event) {
    event.preventDefault();
    currentQuery = searchForm.elements.query.value.trim();
    if (!currentQuery) {
        iziToast.error({ title: 'Error', message: 'Please enter a search term.' });
        return;
    }
    currentPage = 1;
    loadMoreBtn.style.display = 'none';
    loader.style.display = 'block';

    try {
        const { images, totalHits: hits } = await fetchImages(currentQuery, currentPage);
        totalHits = hits;

        gallery.innerHTML = '';
        if (images.length === 0) {
            
            iziToast.info({ title: 'Info', message: 'No images matching your search query. Try again!' });
            return;
        }

        renderImages(images);
        lightbox.refresh();
        loader.style.display = 'none';

        if (currentPage * 15 < totalHits) {
            loadMoreBtn.style.display = 'block';
        } else {
            iziToast.info({ title: 'Info', message: "You've reached the end of the results." });
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again.' });
    } finally {
        loader.style.display = 'none';
    }
}

async function onLoadMore() {
    loader.style.display = 'block';
    currentPage += 1;

    try {
        const { images } = await fetchImages(currentQuery, currentPage);

        if (images.length === 0) {
            iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
            loadMoreBtn.style.display = 'none';
            return;
        }

        renderImages(images);
        lightbox.refresh();
        setTimeout(smoothScroll, 100);

        if (currentPage * 15 >= totalHits) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again.' });
    } finally {
        loader.style.display = 'none';
    }
}



function smoothScroll() {
    const firstCard = document.querySelector('.gallery .photo-card');
    if (firstCard) {
        const cardHeight = firstCard.getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
}