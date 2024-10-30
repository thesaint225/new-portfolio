var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var SELECTORS = {
    SEARCH_INPUT: ".search-input",
    // SEARCH_BUTTON: ".search-button",
    MOVIES_GRID: ".movies-grid",
};
var DEFAULT_POSTER = "/MovieSearchApp/assets/cinema-.jpg";
// Use the constants in your code
var searchInputElement = document.querySelector(SELECTORS.SEARCH_INPUT);
var searchButtonElement = document.querySelector(SELECTORS.SEARCH_BUTTON);
// const debounce = (func, delay) => {
//   let timeoutId;
//   return (...arg) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(()=>func.apply(this,args),delay)
//   };
// };
var debounce = function (
// type T is any function  that takes any arguments and returns void
func, 
// delay should be number
delay) {
    var timeoutId;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () { return func.apply(void 0, args); }, delay);
    };
};
//   Define function that will take movie data
var fetchMovies = function (searchTerm) { return __awaiter(_this, void 0, void 0, function () {
    var res, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://www.omdbapi.com/?apikey=b9a4d057&s=".concat(encodeURIComponent(searchTerm)))];
            case 1:
                res = _a.sent();
                // Ensure response is ok
                if (!res.ok) {
                    throw new Error("HTTP error! Status: ".concat(res.status));
                }
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                console.log("movie Data:", data);
                if (data.Search && Array.isArray(data.Search)) {
                    renderMovies(data.Search); // Pass the array of movies to renderMovies
                }
                else {
                    alert("No movies found. Please try another search term.");
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching movies:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// wrap fetchMovies in debounce
var debouncedFetchMovies = debounce(fetchMovies, 2000);
// Use debouncedFetchMovies in your event listener
if (searchInputElement) {
    searchInputElement.addEventListener("input", function () {
        var searchTerm = searchInputElement.value.trim();
        if (searchTerm) {
            debouncedFetchMovies(searchTerm);
        }
    });
}
// Function to render movie data in html
var moviesGrid = document.querySelector(SELECTORS.MOVIES_GRID);
var createPosterElement = function (posterUrl, altText) {
    var posterImg = document.createElement("img");
    posterImg.src = posterUrl !== "N/A" ? posterUrl : DEFAULT_POSTER;
    posterImg.alt = altText;
    posterImg.classList.add("movie-poster");
    return posterImg;
};
var createTitle = function (title) {
    var movieTitle = document.createElement("h3");
    movieTitle.classList.add("movie-details");
    movieTitle.textContent = title;
    return movieTitle;
};
var createDetailsElement = function (year) {
    var movieDetails = document.createElement("p");
    movieDetails.classList.add("movie-details");
    movieDetails.textContent = year;
    return movieDetails;
};
// combine the element to create a full movie card
var createMovieCard = function (movie) {
    var movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    // create and append each part of the card
    var posterImg = createPosterElement(movie.Poster, "".concat(movie.Title, " poster"));
    var movieTitle = createTitle(movie.Title);
    var movieDetails = createDetailsElement(movie.Year);
    // Container for movie information
    var movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");
    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieDetails);
    // Append all element to main movie Card
    movieCard.appendChild(posterImg);
    movieCard.appendChild(movieInfo);
    return movieCard;
};
// render the movie in the UI
var renderMovies = function (movies) {
    var moviesGrid = document.querySelector(".movies-grid");
    if (!moviesGrid) {
        console.error("movie grid does not  exist ");
        return;
    }
    // clear any previous content
    moviesGrid.innerHTML = "";
    // create a card for each movie and append grid
    var movieCards = movies.map(createMovieCard);
    movieCards.forEach(function (card) { return moviesGrid.appendChild(card); });
};
