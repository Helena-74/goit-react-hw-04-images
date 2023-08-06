import axios from 'axios';

const API_KEY = '37685879-75fb45f515a39c48fce6291c7';
const BASE_URL = 'https://pixabay.com/api/';
const ITEMS_PER_PAGE = 12;

export const fetchImages = (query, page) => {
  return axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${ITEMS_PER_PAGE}`
  );
};