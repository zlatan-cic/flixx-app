const global = {
  curentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
};

// show 20 popular movies // //
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
          <small class="text-muted">First Air Date: ${
            show.first_air_date
          }</small>
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

// Display TV-Show Details
async function displayTvShowDetails() {
  // Extracts the value of the 'showID' parameter from the current URL's query string.
  // const showID = window.location.search; // ?id=298618
  const showId = window.location.search.split("=")[1]; // 298618

  const show = await fetchAPIData(`tv/${showId}`);
  console.log(show);

  // Overlay for background image
  displaybackgroundImage("tv", show.backdrop_path);

  // console.log(showId);

  const div = document.createElement("div");

  div.innerHTML = `
  <div class="details-top">
    <div>
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
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">First Air Date: ${show.first_air_date}</p>
      <p>
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episodes to air:</span> ${
        show.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${show.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(", ")}</div>
  </div>`;

  document.querySelector("#show-details").appendChild(div);
}

// Disaplay backdrop on details pages
function displaybackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");

  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Search movie/show

// Search Movies/Shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No results found");
      return;
    }

    displaySearchResults(results);

    document.querySelector("#search-term").value = "";

    console.log(results);
  } else {
    showAlert("Please enter a search term");
  }
}

function displaySearchResults(results) {

  // Clear previous results
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";
  

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <a href="${global.search.type}-details.html?id=${result.id}">
              ${
                result.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                class="card-img-top"
                alt="${
                  global.search.type === "movie" ? result.title : result.name
                }"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
               alt="${
                 global.search.type === "movie" ? result.title : result.name
               }"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${
                global.search.type === "movie" ? result.title : result.name
              }</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${
                  global.search.type === "movie"
                    ? result.release_date
                    : result.first_air_date
                }</small>
              </p>
            </div>
          `;
    /////////
    document.querySelector("#search-results-heading").innerHTML = `
        <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;

    document.querySelector("#search-results").appendChild(div);

    
  });


  displayPagination()

}

// Create and Display paginationn
function displayPagination(){
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
  <div class="pagination">
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  </div>`

  document.querySelector("#pagination").appendChild(div);

  // Disable furst next btn on first page //////
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true
  }

  // Disable last next btn on first page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true
  }

  // Next Page *
  document.querySelector('#next').addEventListener('click', async function(){
    global.search.page++;
    const {results,total_pages} = await searchAPIData();
    displaySearchResults(results)
  })

  // Prev Page *
  document.querySelector('#prev').addEventListener('click', async function(){
    global.search.page--;
    const {results,total_pages} = await searchAPIData();
    displaySearchResults(results)
  })
}

// Display Slider Movies
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;

    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // Register your key at https://www.themoviedb.org/settings {to get api_key for free}
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

// Make Request to Search
async function searchAPIData() {
  // Register your key at https://www.themoviedb.org/settings/api
  const API_KEY = "974d1202c80148fde9e6f7c2b36bc47e";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  try {
    const response = await fetch(
      `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
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

// Show Alert
function showAlert(message, className = "error") {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

// Init App
function init() {
  switch (global.curentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      displayPopularMovies();
      displaySlider();
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
      displayTvShowDetails();
      break;
    case "/search.html":
      console.log("Search");
      search();
      break;
  }

  // functions calling
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
