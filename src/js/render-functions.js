
export function renderImages(images) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';  

    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="photo-card">
            <a href="${largeImageURL}" data-lightbox="image" data-title="${tags}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p><b>Likes:</b> ${likes}</p>
                <p><b>Views:</b> ${views}</p>
                <p><b>Comments:</b> ${comments}</p>
                <p><b>Downloads:</b> ${downloads}</p>
            </div>
        </div>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup);  
}