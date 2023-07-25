const global = {
  curentPage: window.location.pathname,
};

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
