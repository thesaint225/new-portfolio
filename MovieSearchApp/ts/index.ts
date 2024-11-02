interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

const SELECTORS = {
  SEARCH_INPUT: ".search-input",
  SEARCH_BUTTON: ".search-button",
  MOVIES_GRID: ".movies-grid",
  MESSAGE_CONTAINER: ".message-container",
} as const;

const DEFAULT_POSTER = "/MovieSearchApp/assets/cinema-.jpg";

// Use the constants in your code

const searchInputElement: HTMLInputElement | null = document.querySelector(
  SELECTORS.SEARCH_INPUT
);

const searchButtonElement: HTMLButtonElement | null = document.querySelector(
  SELECTORS.SEARCH_BUTTON
);

const messageContainer: HTMLDivElement | null = document.querySelector(
  SELECTORS.MESSAGE_CONTAINER
);

const debounce = <T extends (...args: any[]) => void>(
  // type T is any function  that takes any arguments and returns void
  func: T,
  // delay should be number
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// display a message in the ui

const displayMessage = (message: string) => {
  if (messageContainer) {
    messageContainer.textContent = message;
    messageContainer.style.display = "block";
  }
};

//  clear message from ui

const clearMessage = () => {
  if (messageContainer) {
    messageContainer.textContent = "";
    messageContainer.style.display = "none";
  }

  // clear the search  input
  if (searchInputElement) {
    searchInputElement.value = "";
  }
};

const clearInput = () => {
  if (searchInputElement) {
    searchInputElement.value = "";
  }
};

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
    clearMessage();
    if (data.Search && Array.isArray(data.Search)) {
      renderMovies(data.Search); // Pass the array of movies to renderMovies
    } else {
      displayMessage("no movies found .Please try another search term.");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    displayMessage("An error occurred.please try again later");
    clearInput();
  }
};

const fetchMoviesDetails = async (title: string) => {
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?t=${encodeURIComponent(
        title
      )}&plot=full&apiKey=b9a4d057`
    );

    // ensure response is ok before proceeding

    if (!res.ok) {
      throw new Error(`HTTP error! Status:${res.status}`);
    }

    // parse json response
    const data = await res.json();
    console.log("Movie Details:", data);
  } catch (error) {
    console.error("Error fetching movie details", error);
  }
};

// wrap fetchMovies in debounce

const debouncedFetchMovies = debounce(fetchMovies, 2000);

// Use debouncedFetchMovies in your event listener
if (searchInputElement) {
  searchInputElement.addEventListener("input", () => {
    const searchTerm: string = searchInputElement.value.trim();
    if (searchTerm) {
      debouncedFetchMovies(searchTerm);
    }
  });
}

// Function to render movie data in html

const moviesGrid: HTMLDivElement | null = document.querySelector(
  SELECTORS.MOVIES_GRID
);

const createPosterElement = (
  posterUrl: string,
  altText: string
): HTMLImageElement => {
  const posterImg = document.createElement("img");
  posterImg.src = posterUrl !== "N/A" ? posterUrl : DEFAULT_POSTER;
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

  // Add event listener to movie title
  movieTitle.addEventListener("click", () => {
    // fetch and display additional details when title is clicked
    fetchMoviesDetails(movie.Title);
  });

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
  const fragment = document.createDocumentFragment();
  const movieCards = movies.map(createMovieCard);
  movieCards.forEach((card) => fragment.appendChild(card));

  moviesGrid.appendChild(fragment);
};
