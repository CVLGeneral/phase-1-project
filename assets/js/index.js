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
  fetchPopularMovies();   // Call fetchPopularMovies to open the movies list on page load

  setupGenreClickHandlers();

})


function displayMovies(movies) {
    const moviesGrid = document.querySelector('.movies-grid');
  
  
    movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)); // Sort movies by year by displaying the most recent to the least recent
  
  
    moviesGrid.innerHTML = '';  //clear movie details first 
  
    movies.forEach(movie => {
      const div = document.createElement('div');
      div.classList.add('movie', 'movie-card'); 
  
      
      const img = document.createElement('img');
      img.src = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/148x208.png?text=No+Poster';
      img.alt = `${movie.Title} poster`;
      img.width = '148';
      img.height = '208';
      const title = document.createElement('h3');
      title.textContent = movie.Title;
      const yearEl = document.createElement('p');
      yearEl.textContent = `Year: ${movie.Year}`;
  
        // Create badge for movie type (movie/series)
        const typeBadge = document.createElement('div');
        typeBadge.classList.add('type-badge');
        typeBadge.textContent = movie.Type.toUpperCase();
      
  
       // Create heart icon
       const heart = document.createElement('i');
       heart.classList.add('fa', 'fa-heart-o');
       heart.dataset.movieId = movie.imdbID;
   
       // Add event listener to toggle heart on click
       heart.addEventListener('click', (event) => {
         event.preventDefault();
         const targetHeart = event.target;
         targetHeart.classList.toggle('fa-heart-o');
         targetHeart.classList.toggle('fa-heart');
         targetHeart.classList.toggle('red');
       });
  
      div.appendChild(img);
      div.appendChild(title);
      div.appendChild(yearEl);
      div.appendChild(heart);
      div.appendChild(typeBadge);
  
      
      moviesGrid.appendChild(div);
  
    });
  
  }

  //To display some movies on page load
function fetchPopularMovies() {
    const url = `${API_URL}&s=Avengers`;
    fetch(url)
      .then(response => response.json())
      .then(data => displayMovies(data.Search))
      .catch(error => console.error(error));
  }
  

const form = document.querySelector('form');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetchMovies();
});

//render movies based on search input
function fetchMovies() {
  const searchInput = document.querySelector('input[type="text"]');


  const query = searchInput.value;

  let url = `${API_URL}&s=${query}`;

 
  fetch(url)
    .then(response => response.json())
    .then(data => displayMovies(data.Search || [])) //return movie searched or movies with same keywords
    .catch(error => console.error(error));
}

// Fetch movies by genre
function fetchMoviesByGenre(genre) {
    //To arrange movies starting with the recent one
    let url = `${API_URL}&s=${genre}&type=series&y=&y=2023&y=2022&y=2021&y=2020&y=2019&y=2018&y=2017&y=2016&y=2015&y=2014&y=2013&y=2012&y=2011&y=2010`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => displayMovies(data.Search || []))
      .catch(error => console.error(error));
  }
  
