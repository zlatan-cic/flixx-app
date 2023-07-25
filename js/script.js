const global = {
  curentPage: window.location.pathname,
};

async function displayPopularMovies(){
  // "*""Curly braces {results} are used, and then we have a straight array.""*"
  const {results} = await fetchAPIData('/movie/popular');
  // console.log(results);

  results.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add("card");
    movieEl.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img
            src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />` : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>`;

      document.querySelector('#popular-movies').appendChild(movieEl)
  })

}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = "974d1202c80148fde9e6f7c2b36bc47e";
  const API_URL = "https://api.themoviedb.org/3";

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await response.json();

  return data;
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link")
  links.forEach((link) => {
    // console.log(link);
    if (link.getAttribute('href') === global.curentPage) {
      link.classList.add("active");
    }
  })
}

// Init App
function init() {
  switch (global.curentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      displayPopularMovies()
      break;
    case "/shows.html":
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
    
  }

  // functions calling
  highlightActiveLink()
  
}

document.addEventListener("DOMContentLoaded", init);
