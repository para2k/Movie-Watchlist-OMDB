import { apiKey, getMovieDetails, renderMovies, saveToWatchlist, removeFromWatchlist, switchToRemoveButton, switchToAddButton } from "./common.js";

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const movieList = document.getElementById("movie-list");
const moviesSect = document.getElementById("movies-sect");

movieList.addEventListener('click', (e) => {
    const button = e.target.closest(".icon-button");
    if(!button) return;
    if (button.id === "add-to-watchlist-btn" ) {
        saveToWatchlist(button.dataset.movieId);
        switchToRemoveButton(button);
    }
    else if (button.id === "remove-from-watchlist-btn") {
        removeFromWatchlist(button.dataset.movieId);
        switchToAddButton(button);
    }
})

searchBtn.addEventListener("click", () => {
    getMoviesBySearch(searchInput.value)
})

async function getMoviesBySearch(searchTerm) {
    if (searchTerm.trim().length < 2) return;
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
    const data = await response.json();
    if (data.Response === "False") {
        movieList.innerHTML = `
        <div class="empty-list-container">
            <h3>Unable to find what you're looking for. Please try another search.</h3>
        </div>
        `
    }
    else {
        const moviesDataArray = await Promise.all(data.Search.map(movie => getMovieDetails(movie.imdbID)));
        movieList.innerHTML = renderMovies(moviesDataArray, movieList, false);
        moviesSect.style.backgroundImage = "none";
    }

}