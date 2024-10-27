4. Movie Search App
   Description: Create an app where users can search for movies and view details like rating, summary, and cast. Integrate it with a public movie API (like OMDb).
   Key Concepts:
   Fetch API for asynchronous data fetching
   Functions for organizing and displaying movie information
   Control flow and conditions to handle empty results or errors
   DOM manipulation for updating search results in real time
   Loops to render a list of movies in the DOM

---

3-day roadmap for building the Movie Search App:

Day 1: Setup and Basic Functionality
Project Setup

Set up your project folder, initialize HTML, CSS, and JavaScript files.
Add a basic HTML structure, including an input field for the search, a search button, and a container to display the movie results.
Build the Search Functionality

Implement a basic function that captures the search input when the search button is clicked.
Use the Fetch API with async/await to request data from a movie API (such as OMDb API, where you can register for a free API key).
Display Movie Data

Process and display the API’s JSON response in the console to understand its structure.
Extract key data points (e.g., title, release date, poster, rating) and render them in the HTML.
Add basic styling to make the movie information readable.

---

Day 2: Advanced Display and Error Handling
Create Movie Cards

Design individual “movie cards” to display each movie’s information.
Style the cards with CSS for a cleaner look and layout (e.g., grid or flexbox for displaying multiple cards in rows).
Add Error Handling

Handle scenarios where no results are found by displaying an appropriate message.
Add error handling for network issues or invalid inputs.
Optimize for Empty Inputs

Implement validation to ensure users can’t submit empty search queries.
Display a helpful message if the input field is empty when the user clicks search.

---

Day 3: Interactivity, Clean-Up, and Final Touches
Add Additional Movie Details

Update the app to show additional information such as genre, director, or a brief summary if available in the API response.
Use control flow to handle missing data fields, so only available details display in each movie card.
Implement a Loading Indicator

Add a loading spinner or message that appears while the data is being fetched and disappears once the response is received.
Polish and Finalize

Refactor your code to improve readability (split functionality into separate functions where possible).
Test edge cases: try searches with no results, incorrect spellings, and special characters.
Add any final styling tweaks for an improved user experience.
