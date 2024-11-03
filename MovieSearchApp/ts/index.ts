interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons?: string;
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

// Function to create the modal
const createMovieModal = (movie: Movie): HTMLDivElement => {
  console.log("Function called:creating modal");
  // Create modal container element
  const modal: HTMLDivElement = document.createElement("div");
  modal.classList.add("modal");

  // Modal content template
  const modalContent: string = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <div class="modal-header">
        <div class="modal-poster-container">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : DEFAULT_POSTER}" 
               alt="${movie.Title} Poster" 
               class="modal-poster">
        </div>
        <div class="modal-title-section">
          <h2>${movie.Title}</h2>
          <div class="modal-meta">
            <span class="badge">${movie.Year}</span>
            <span class="badge">${movie.Runtime}</span>
            <span class="badge">${movie.Rated}</span>
          </div>
          <div class="modal-ratings">
            <div class="rating-item">
              <span class="rating-label">IMDb</span>
              <span class="rating-value">⭐ ${movie.imdbRating}/10</span>
            </div>
            ${
              movie.Metascore !== "N/A"
                ? `
              <div class="rating-item">
                <span class="rating-label">Metascore</span>
                <span class="rating-value">${movie.Metascore}/100</span>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="plot-section">
          <h3>Plot</h3>
          <p>${movie.Plot}</p>
        </div>
        <div class="details-grid">
          <div class="detail-item">
            <h4>Genre</h4>
            <p>${movie.Genre.split(", ")
              .map((genre) => `<span class="genre-tag">${genre}</span>`)
              .join("")}</p>
          </div>
          <div class="detail-item">
            <h4>Cast</h4>
            <p>${movie.Actors}</p>
          </div>
          <div class="detail-item">
            <h4>Director</h4>
            <p>${
              movie.Director !== "N/A" ? movie.Director : "Not Available"
            }</p>
          </div>
          <div class="detail-item">
            <h4>Writer</h4>
            <p>${movie.Writer !== "N/A" ? movie.Writer : "Not Available"}</p>
          </div>
          <div class="detail-item">
            <h4>Awards</h4>
            <p>${movie.Awards !== "N/A" ? movie.Awards : "No awards yet"}</p>
          </div>
          <div class="detail-item">
            <h4>Release Date</h4>
            <p>${movie.Released}</p>
          </div>
          ${
            movie.totalSeasons
              ? `
            <div class="detail-item">
              <h4>Seasons</h4>
              <p>${movie.totalSeasons}</p>
            </div>
          `
              : ""
          }
          <div class="detail-item">
            <h4>Language</h4>
            <p>${movie.Language}</p>
          </div>
          <div class="detail-item">
            <h4>Country</h4>
            <p>${movie.Country}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Insert content into modal
  modal.innerHTML = modalContent;

  // Type-safe access to close button
  const closeButton = modal.querySelector(
    ".close-button"
  ) as HTMLSpanElement | null;
  closeButton?.addEventListener("click", () => closeMovieModal(modal));

  // Close modal when clicking outside of it
  modal.addEventListener("click", (e: MouseEvent) => {
    if (e.target === modal) closeMovieModal(modal);
  });

  // Append modal to the document body
  document.body.appendChild(modal);

  // Force a reflow before adding the show-modal class
  modal.offsetHeight; // This triggers a reflow

  // Show modal with animation
  requestAnimationFrame(() => {
    modal.classList.add("show-modal");
  });

  return modal; // Return for further use if necessary
};

const closeMovieModal = (modal: HTMLDivElement): void => {
  modal.classList.remove("show-modal");
  modal.addEventListener(
    "transitionend",
    () => {
      modal.remove();
    },
    { once: true }
  );
};

const fetchMoviesDetails = async (title: string) => {
  try {
    // Show loading state
    const loadingModal = createMovieModal({
      Title: "Loading...",
      Year: "",
      Rated: "",
      Released: "",
      Runtime: "",
      Genre: "",
      Director: "",
      Writer: "",
      Actors: "",
      Plot: "Loading movie details...",
      Language: "",
      Country: "",
      Awards: "",
      Poster: DEFAULT_POSTER,
      Ratings: [],
      Metascore: "",
      imdbRating: "",
      imdbVotes: "",
      imdbID: "",
      Type: "",
    });

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
    // Remove loading modal
    closeMovieModal(loadingModal);
    console.log("Movie Details:", data);
    createMovieModal(data);
  } catch (error) {
    console.error("Error fetching movie details", error);
    // Show error message in modal
    createMovieModal({
      Title: "Error",
      Plot: `Failed to load movie details: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      // Fill in other required fields with empty strings
      Year: "",
      Rated: "",
      Released: "",
      Runtime: "",
      Genre: "",
      Director: "",
      Writer: "",
      Actors: "",
      Language: "",
      Country: "",
      Awards: "",
      Poster: DEFAULT_POSTER,
      Ratings: [],
      Metascore: "",
      imdbRating: "",
      imdbVotes: "",
      imdbID: "",
      Type: "",
    });
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
  movieTitle.classList.add("movie-title");
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
