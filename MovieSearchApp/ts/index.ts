const searchInputElement: HTMLInputElement | null =
  document.querySelector(".search-input");

const searchButtonElement: HTMLButtonElement | null =
  document.querySelector(".search-button");

//   Define function that will take movie data

const fetchMovies = async (searchTerm: string) => {
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=b9a4d057&s=${encodeURIComponent(
        searchTerm
      )}`
    );

    // Ensure response is ok
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    // parse JSON response
    const data = await res.json();
    console.log("movie Data:", data);
    if (data.Search) {
      renderMovies(data.Search); // Pass the array of movies to renderMovies
    } else {
      alert("No movies found. Please try another search term.");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

//  checks that  Elements exist and add  event listener

if (searchInputElement && searchButtonElement) {
  searchButtonElement.addEventListener("click", () => {
    // Capture and trim input value
    const searchTerm: string = searchInputElement.value.trim();

    // Check if input is not empty
    if (searchTerm) {
      console.log(`Searching for:${searchTerm} `);

      // Call fetchMovies functions with searchTerm
      fetchMovies(searchTerm);
    } else {
      alert("Please enter a movie name to search.");
    }
  });
}

// Function to render movie data in html

const moviesGrid: HTMLDivElement | null =
  document.querySelector(".movies-grid");

const renderMovies = (movies: Array<any>) => {
  // Map over movies to create an array of movie card elements
  const movieCards = movies.map((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    // Add poster
    const posterImg = document.createElement("img");
    posterImg.src =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "/MovieSearchApp/assets/cinema-.jpg";
    posterImg.alt = `${movie.Title} Poster`;
    posterImg.classList.add("movie-poster");

    // Add movie info container
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");

    // Add title
    const movieTitle = document.createElement("h3");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = movie.Title;

    // Add details (release year and rating)
    const movieDetails = document.createElement("p");
    movieDetails.classList.add("movie-details");
    movieDetails.textContent = `${movie.Year}`;

    // Append elements to their parents
    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieDetails);
    movieCard.appendChild(posterImg);
    movieCard.appendChild(movieInfo);

    return movieCard; // Return the completed movie card
  });

  // Clear any previous movie cards
  if (moviesGrid) {
    moviesGrid.innerHTML = "";
  }

  // Append all movie cards to the movies grid container
  movieCards.forEach((card) => {
    moviesGrid?.appendChild(card);
  });
};
