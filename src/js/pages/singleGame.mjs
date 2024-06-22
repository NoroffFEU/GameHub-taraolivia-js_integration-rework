import { showWedge as showSpinner, hideWedge as hideSpinner } from '../utilities/loadingIndicatorWedge.mjs';
import { addToCart, updateButtonText } from '../components/cart.mjs';

document.addEventListener("DOMContentLoaded", function () {
  const gameId = new URLSearchParams(window.location.search).get("id");
  if (!gameId) {
    console.error("Game ID is missing from the URL.");
    document.getElementById("game-title").textContent = "Game ID is not provided!";
    return;
  }

  fetchGameData(gameId);
  displaySimilarGames(gameId);
});

export async function fetchGameData(gameId) {
  showSpinner();
  const gameURL = `https://api.noroff.dev/api/v1/gamehub/${gameId}`;
  
  try {
    const response = await fetch(gameURL);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    
    const game = await response.json();
    populateGameDetails(game);
    hideSpinner();
  } catch (error) {
    console.error("Failed to fetch game details:", error);
    document.getElementById("game-title").textContent = "Game details cannot be loaded at this time.";
    hideSpinner();
  }
}

function populateGameDetails(game) {
  const gameTitleElement = document.getElementById("game-title");
  const gameImageElement = document.getElementById("game-image");
  const thumbnailImageElement = document.getElementById("api-thumbnail");
  const addToCartButton = document.querySelector('.button--add_to_cart');

  if (!gameTitleElement || !gameImageElement || !thumbnailImageElement || !addToCartButton) {
    console.error("One or more required elements not found.");
    return; // Early exit if essential elements are missing
  }

  // Populate game details
  gameTitleElement.textContent = game.title || "Title not available";
  gameImageElement.src = game.image;
  gameImageElement.alt = `${game.title} cover`;
  thumbnailImageElement.src = game.image;
  thumbnailImageElement.alt = `${game.title} thumbnail`;

  // Set data-product-id for the add to cart button
  addToCartButton.setAttribute('data-product-id', game.id);
  updateButtonText();

  // Add event listener for adding to cart
  addToCartButton.addEventListener('click', function() {
    addToCart(game.id, addToCartButton);
    updateButtonText();
  });

  // Continue setting other game details
  displayGamePrice(game);
  updateDetails("game-subtitle", game.subtitle || "An exciting game experience.", false, game);
  updateDetails("game-description", game.description, false, game);
  updateDetails("game-age-rating", game.ageRating || "Age rating not available", false, game);
  updateDetails("game-genre", game.genre || "Genre not available", false, game);
  updateDetails("game-released", game.released || "Release date not available", false, game);
  updateBreadcrumbsForGame(game.title, game.genre);
}

function displayGamePrice(game) {
  const gamePriceElement = document.getElementById("game-price");
  if (game.onSale) {
    gamePriceElement.innerHTML = `
      <span class="original-price">Original Price: €${game.price.toFixed(2)}</span>
      <span class="discounted-price">Discounted Price: €${game.discountedPrice.toFixed(2)}</span>
    `;
  } else {
    gamePriceElement.textContent = `Price: €${game.price.toFixed(2)}`;
  }
}

function updateDetails(id, value, isImage = false, game) {
  const element = document.getElementById(id);
  if (element) {
    if (isImage) {
      element.src = value;
      element.alt = `${game.title} main image`;
    } else {
      element.textContent = value;
    }
  } else {
    console.error(`${id} element not found.`);
  }
}

function updateBreadcrumbsForGame(title, genre) {
  const breadcrumbList = document.getElementById("breadcrumb-list");
  if (breadcrumbList) {
    const baseCrumbs = ["Home", "Games"];
    const fullCrumbs = [...baseCrumbs, genre, title];
    breadcrumbList.innerHTML = fullCrumbs.map((crumb, index) => {
      const isActive = index === fullCrumbs.length - 1;
      return `<li>${isActive ? `<span class="breadcrumbs__item active">${crumb}</span>` : `<a href="#" class="breadcrumbs__item">${crumb}</a>`}</li>`;
    }).join("");
  } else {
    console.error("Breadcrumb list element not found.");
  }
}

export async function displaySimilarGames(gameId) {
  try {
    const response = await fetch(`https://api.noroff.dev/api/v1/gamehub/${gameId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch game: ${response.statusText}`);
    }
    const game = await response.json();
    await displaySimilarGamesByGenre(gameId, game.genre);
  } catch (error) {
    console.error("Failed to fetch game details:", error);
  }
}

async function displaySimilarGamesByGenre(currentGameId, currentGameGenre) {
  try {
    const games = JSON.parse(sessionStorage.getItem("games"));
    if (games && Array.isArray(games) && games.length > 0) {
      const similarGames = games.filter((game) => game.genre === currentGameGenre && game.id !== currentGameId);
      const similarGamesContainer = document.getElementById("similar-games-container");
      similarGamesContainer.innerHTML = "";
      similarGames.forEach((game) => {
        const gameElement = document.createElement("div");
        const singleGameUrl = `single-game.html?id=${game.id}`;
        gameElement.className = "small-game-card";
        gameElement.innerHTML = `
          <div class="small-game-card-left">
            <img src="${game.image}" alt="${game.title}" />
          </div>
          <div class="small-game-card-middle">
            <p>${game.title}</p>
          </div>
          <div class="small-game-card-right">
            <p>${displayGamePriceSmaller(game)}</p>
            <a href="${singleGameUrl}" class="button button--small"><p>View now</p></a>
          </div>
        `;
        similarGamesContainer.appendChild(gameElement);
      });
    } else {
      console.error("No valid games data found:", games);
    }
  } catch (error) {
    console.error("Error displaying similar games:", error);
  }
}

function displayGamePriceSmaller(game) {
  if (game.onSale) {
    return `
      <span class="original-price-smaller">€ ${game.price.toFixed(2)}</span>
      <span class="discounted-price-smaller">€ ${game.discountedPrice.toFixed(2)}</span>
    `;
  } else {
    return `€${game.price.toFixed(2)}`;
  }
}
