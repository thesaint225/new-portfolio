interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

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
    if (data.Search && Array.isArray(data.Search)) {
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

const createPosterElement = (
  posterUrl: string,
  altText: string
): HTMLImageElement => {
  const posterImg = document.createElement("img");
  posterImg.src =
    posterUrl !== "N/A" ? posterUrl : "/MovieSearchApp/assets/cinema-.jpg";
  posterImg.alt = altText;
  posterImg.classList.add("movie-poster");
  return posterImg;
};

const createTitle = (title: string): HTMLHeadingElement => {
  const movieTitle = document.createElement("h3");
  movieTitle.classList.add("movie-details");
  movieTitle.textContent = title;
  return movieTitle;
};

const createDetailsElement = (year: string): HTMLParagraphElement => {
  const movieDetails = document.createElement("p");
  movieDetails.classList.add("movie-details");
  movieDetails.textContent = year;

  return movieDetails;
};

// combine the element to create a full movie card

const createMovieCard = (movie: Movie): HTMLDivElement => {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  // create and append each part of the card

  const posterImg = createPosterElement(movie.Poster, `${movie.Title} poster`);
  const movieTitle = createTitle(movie.Title);
  const movieDetails = createDetailsElement(movie.Year);

  // Container for movie information

  const movieInfo = document.createElement("div");
  movieInfo.classList.add("movie-info");
  movieInfo.appendChild(movieTitle);
  movieInfo.appendChild(movieDetails);

  // Append all element to main movie Card
  movieCard.appendChild(posterImg);
  movieCard.appendChild(movieInfo);

  return movieCard;
};

// render the movie in the UI

const renderMovies = (movies: Movie[]): void => {
  const moviesGrid = document.querySelector(".movies-grid");
  if (!moviesGrid) {
    console.error("movie grid does not  exist ");
    return;
  }

  // clear any previous content

  moviesGrid.innerHTML = "";

  // create a card for each movie and append grid
  const movieCards = movies.map(createMovieCard);
  movieCards.forEach((card) => moviesGrid.appendChild(card));
};
