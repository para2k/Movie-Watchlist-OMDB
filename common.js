export const apiKey = import.meta.env.OMDB_API_KEY;

export async function getMovieDetails(movieId) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
    const data = await response.json();
    return data;
}

export function saveToWatchlist(movieId) {
    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    if (!watchList.includes(movieId)) {
        watchList.push(movieId);
        localStorage.setItem("watchList", JSON.stringify(watchList));
    }
}

export function removeFromWatchlist(movieId) {
    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    if (!watchList.includes(movieId)) {
        alert("Movie not found in watchlist");
        return;
    }
    watchList = watchList.filter(id => id !== movieId);
    localStorage.setItem("watchList", JSON.stringify(watchList));
}

export function switchToRemoveButton(button) {
    button.id = "remove-from-watchlist-btn";
    button.innerHTML = `<img src="images/icon-minus.png" alt="Remove from Watchlist" class="icon"> Remove`;
}

export function switchToAddButton(button) {
    button.id = "add-to-watchlist-btn";
    button.innerHTML = `<img src="images/icon-plus.png" alt="Add to Watchlist" class="icon"> Add to Watchlist`;
}

export function renderMovies(moviesArray, section, isWatchlistPage) {
    section.style.backgroundImage = "none";
    let htmlString = "";
    moviesArray.forEach(movie => {
        htmlString += `
        <div class="movie-card">
                <img src="${movie.Poster}" alt="${movie.Title} Poster" class="poster">
                <div class="movie-data-container">
                    <div class="movie-title-rating">
                        <h3>${movie.Title}</h3>
                        <p><span style="color:rgb(211, 211, 0);">&starf;</span> ${movie.imdbRating}</p>
                    </div>
                    <div class="movie-info">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        ${isWatchlistPage
                ? `<button data-movie-id="${movie.imdbID}" id="remove-from-watchlist-btn" class="icon-button">
                                 <img src="images/icon-minus.png" alt="Remove" class="icon">
                                 Remove from Watchlist
                               </button>`
                : `<button data-movie-id="${movie.imdbID}" id="add-to-watchlist-btn" class="icon-button">
                                 <img src="images/icon-plus.png" alt="Add to Watchlist" class="icon">
                                 Add to Watchlist
                               </button>`}
                    </div>
                    <p>${movie.Plot}
                    </p>
                </div>
            </div>
        `
    });

    return htmlString;
}