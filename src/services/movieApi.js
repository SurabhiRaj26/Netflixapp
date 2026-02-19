import axios from 'axios';

const BASE_URL = 'https://imdb.iamidiotareyoutoo.com';

export const fetchMovies = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return { description: [] };
    }
};

export const fetchCategory = async (genre) => {
    // Since the API is search-based, we'll search for the genre name as a proxy for category
    return await fetchMovies(genre);
};
