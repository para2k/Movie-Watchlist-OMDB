import { getMovieDetails, renderMovies, saveToWatchlist, removeFromWatchlist, switchToRemoveButton, switchToAddButton } from "./common.js";

const watchList = document.getElementById("watchlist-movies-sect");
const watchListIds = JSON.parse(localStorage.getItem("watchList")) || [];

watchList.addEventListener('click', (e) => {
    const button = e.target.closest(".icon-button");
    if(!button) return;
    if (button.id === "add-to-watchlist-btn") {
        saveToWatchlist(button.dataset.movieId);
        switchToRemoveButton(button);
    }
    else if (button.id === "remove-from-watchlist-btn") {
        removeFromWatchlist(button.dataset.movieId);
        switchToAddButton(button);
    }
})

async function renderWatchlist() {
    const movies = await Promise.all(watchListIds.map(id => getMovieDetails(id)));
    return movies;
}

async function initWatchlist() {
    const watchListMovies = await renderWatchlist();
    if (watchListMovies.length === 0) {
        watchList.innerHTML = `
        <div class="empty-list-container">
            <h3>Your watchlist is looking a little empty...</h3>
            <a href="index.html" class="icon-button">
            <img src="images/icon-plus.png" alt="Add to Watchlist" class="icon">
            Let's add some movies!
            </a>
        </div>
        `
    }
    else {
        watchList.innerHTML = renderMovies(watchListMovies, watchList, true);
    }
    
}

initWatchlist();