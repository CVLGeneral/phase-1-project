const API_KEY = 'f6b895c5';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const options = {
	method: 'GET',
	headers: {
        	'Content-Type': 'application/json',

	}
};

document.addEventListener("DOMContentLoaded",(event)=>{
  event.preventDefault();
  fetchPopularMovies();
  setupGenreClickHandlers();



})
