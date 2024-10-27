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
