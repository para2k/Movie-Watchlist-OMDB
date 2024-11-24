import { getMovieDetails, renderMovies, saveToWatchlist, removeFromWatchlist, switchToRemoveButton, switchToAddButton } from "./common.js";

const watchList = document.getElementById("watchlist-movies-sect");
const watchListIds = JSON.parse(localStorage.getItem("watchList")) || [];

watchList.addEventListener('click', (e) => {
    if (e.target.id === "add-to-watchlist-btn" || e.target.closest("#add-to-watchlist-btn")) {
        saveToWatchlist(e.target.dataset.movieId);
        switchToRemoveButton(e.target);
    }
    else if (e.target.id === "remove-from-watchlist-btn" || e.target.closest("#remove-from-watchlist-btn")) {
        removeFromWatchlist(e.target.dataset.movieId);
        switchToAddButton(e.target);
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