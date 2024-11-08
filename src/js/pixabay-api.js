 import axios from 'axios';

const API_KEY = "46831660-d1aa08367accf9e9e1755dc5b";
 
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page,
                per_page: PER_PAGE,
            },
        });

        if (response.data.hits.length === 0) {
            return { images: [], totalHits: 0 };
        }

        return { images: response.data.hits, totalHits: response.data.totalHits };
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}

     