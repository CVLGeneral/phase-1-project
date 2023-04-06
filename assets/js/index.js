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
  addMovie();
  renderMovies()


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
    

    // Create heart icon and make it persist
    const heart = document.createElement('i');
    heart.classList.add('fa', 'fa-heart-o');
    heart.dataset.movieId = movie.imdbID;

    // Check if movie is already in favorites
    if (localStorage.getItem(movie.imdbID)) {
    heart.classList.remove('fa-heart-o');
    heart.classList.add('fa-heart', 'red');
    }

    // Add event listener to toggle heart on click
    heart.addEventListener('click', (event) => {
    event.preventDefault();
    const targetHeart = event.target;
    const movieId = targetHeart.dataset.movieId;
    const isFavorite = targetHeart.classList.contains('fa-heart');

    if (isFavorite) {
        targetHeart.classList.remove('fa-heart', 'red');
        targetHeart.classList.add('fa-heart-o');
        localStorage.removeItem(movieId);
    } else {
        targetHeart.classList.remove('fa-heart-o');
        targetHeart.classList.add('fa-heart', 'red');
        localStorage.setItem(movieId, 'true');
    }
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

function fetchMovies() {
  const searchInput = document.querySelector('input[type="text"]');


  const query = searchInput.value;

  let url = `${API_URL}&s=${query}`;

 
  fetch(url)
    .then(response => response.json())
    .then(data => displayMovies(data.Search || []))
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

// Setup click handlers for genres
function setupGenreClickHandlers() {
  const genreSelect = document.getElementById('genreSelect');

  genreSelect.addEventListener('change', (event) => {
    const genre = event.target.value;
    fetchMoviesByGenre(genre);
  });
}


function renderMovies(){

  fetch ("http://localhost:3000/movies",options)
  .then(response => response.json()) // Convert response to JSON
        .then(data => {
          const movies = data; // Get movies array from data
          const moviesContainer = document.getElementById('movies-container'); // Get movies container element
          
          // Loop through each movie and create a movie card element
          movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movies', 'movies-card'); 

            movieCard.innerHTML = `
              <img src="${movie.image}" alt="${movie.name}">
              <h3>${movie.name}</h3>
              <p> Year:${movie.year}</p>

            `;

 

       





        moviesContainer.appendChild(movieCard); // Append movie card to movies container
          });


        })
        .catch(error => console.error('Error fetching movies:', error));
  
  
  }
  










function addMovie(){
  const addMovieForm = document.querySelector('.add-movie-form form');

  addMovieForm.addEventListener('submit', event => {
    event.preventDefault();
  
    // Get form data. this is the animal name and image url input by the user
    const name = addMovieForm.elements.name.value;
    const image = addMovieForm.elements.image.value;
    const year = addMovieForm.elements.year.value;

  
    // Add movie to server ,this is by using the POST method
    fetch('http://localhost:3000/movies', {
      method: 'POST', 
      headers: {
        // 'application/json' indicates that the content being sent or received is in JSON (JavaScript Object Notation) format
        'Content-Type': 'application/json'
      },
    
      body: JSON.stringify({ 
        //JSON.stringify converts Javascript value to JSON string
        name,
        image,
        year,
      })
    })
  
  })
}