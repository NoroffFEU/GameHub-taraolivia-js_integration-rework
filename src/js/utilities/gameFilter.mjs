import { updateGamesDisplay } from '../services/gameDisplay.mjs'; // Ensure the correct import path

export function generateGenreButtons(games) {
    const genreSet = new Set();
    games.forEach((game) => genreSet.add(game.genre));

    const buttonsContainer = document.getElementById("genre-buttons");
    if (!buttonsContainer) {
        console.error("Element with ID 'genre-buttons' not found.");
        return;
    }
    buttonsContainer.innerHTML = "";

    const allButton = document.createElement("button");
    allButton.className = "genre-button selected";
    allButton.textContent = "All";
    allButton.dataset.genre = "all";
    allButton.addEventListener("click", () => {
        filterProduct("all");
        buttonsContainer.querySelectorAll(".genre-button").forEach((button) => button.classList.remove("selected"));
        allButton.classList.add("selected");
    });
    buttonsContainer.appendChild(allButton);

    genreSet.forEach((genre) => {
        const button = document.createElement("button");
        button.className = "genre-button";
        button.textContent = genre;
        button.dataset.genre = genre;
        button.addEventListener("click", () => {
            filterProduct(genre);
            buttonsContainer.querySelectorAll(".genre-button").forEach((button) => button.classList.remove("selected"));
            button.classList.add("selected");
        });
        buttonsContainer.appendChild(button);
    });

    const onSaleButton = document.createElement("button");
    onSaleButton.className = "genre-button";
    onSaleButton.textContent = "On Sale";
    onSaleButton.dataset.genre = "on-sale";
    onSaleButton.addEventListener("click", () => {
        filterProduct("on-sale");
        buttonsContainer.querySelectorAll(".genre-button").forEach((button) => button.classList.remove("selected"));
        onSaleButton.classList.add("selected");
    });
    buttonsContainer.appendChild(onSaleButton);
}

export function filterProduct(genre) {
    const games = JSON.parse(sessionStorage.getItem("games"));
    if (!games) {
        console.error("No games found in sessionStorage.");
        return;
    }
    let filteredGames;

    if (genre === "all") {
        filteredGames = games;
    } else if (genre === "on-sale") {
        filteredGames = games.filter((game) => game.onSale);
    } else {
        filteredGames = games.filter((game) => game.genre === genre);
    }

    updateGamesDisplay(filteredGames, document.getElementById("all-games-container"));
    document.querySelectorAll(".genre-button").forEach((button) => button.classList.remove("selected"));
    document.querySelector(`.genre-button[data-genre="${genre}"]`).classList.add("selected");
}
