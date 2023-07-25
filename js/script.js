const global = {
  curentPage: window.location.pathname,
};

// show 20 popular movies
async function displayPopularMovies() {
  // "*""Curly braces {results} are used, and then we have a straight array.""*"
  const { results } = await fetchAPIData("/movie/popular");
  // console.log(results);

  results.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("card");
    movieEl.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img
            src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
            : `<img
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

    document.querySelector("#popular-movies").appendChild(movieEl);
  });
}

// Show 20 TV-Shows

async function displayPopularTVShow() {
  // "*""Curly braces {results} are used, and then we have a straight array.""*"
  const { results } = await fetchAPIData("/tv/popular");
  // console.log(results);

  results.forEach((show) => {
    const showEl = document.createElement("div");
    showEl.classList.add("card");
    showEl.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `<img
            src="http://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
            : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${show.first_air_day}</small>
        </p>
      </div>`;

    document.querySelector("#popular-shows").appendChild(showEl);
  });
}

// Display Movie Details
async function displayMovieDetails() {
  // Extracts the value of the 'movieID' parameter from the current URL's query string.
  // const movieID = window.location.search; // ?id=298618
  const movieId = window.location.search.split("=")[1]; // 298618

  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for background image
  displaybackgroundImage("movie", movie.backdrop_path);

  console.log(movieId);

  const div = document.createElement("div");

  div.innerHTML = `
  <div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `<img
        src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
        : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${numberWithCommas(
        movie.budget
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(
        movie.revenue
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} min</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(", ")}</div>
  </div>`;

  document.querySelector("#movie-details").appendChild(div);
}

// Disaplay backdrop on details pages
function displaybackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");

  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  }
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = "974d1202c80148fde9e6f7c2b36bc47e";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  try {
    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );

    // Check if the response has a successful status (2xx)
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();

    hideSpinner();

    return data;
  } catch (error) {
    hideSpinner();
    console.error("Error fetching data:", error);
    // Handle the error gracefully, e.g., display an error message to the user
  }
}

// Spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    // console.log(link);
    if (link.getAttribute("href") === global.curentPage) {
      link.classList.add("active");
    }
  });
}

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Init App
function init() {
  switch (global.curentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      displayPopularMovies();
      break;
    case "/shows.html":
      console.log("Shows");
      displayPopularTVShow();
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      displayMovieDetails();
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }

  // functions calling
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
