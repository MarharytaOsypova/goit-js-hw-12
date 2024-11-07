const API_KEY = "46831660-d1aa08367accf9e9e1755dc5b";
 
const BASE_URL = "https://pixabay.com/api/";

export function fetchImages(query, page = 1) {
    return fetch(
        `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
    )
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => data.hits)   
    .catch(error => {
        console.error("Error fetching images:", error);
        throw error;  
    });
}

     