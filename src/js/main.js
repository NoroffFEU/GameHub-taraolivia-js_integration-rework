import { createNavbar } from './components/navbar.mjs';
import { updateIconColors, updateCartItemCount, displayCart, setupCartIcon, setupCartEvents, addToCart, updateButtonText } from './components/cart.mjs';
import { showSpinner, hideSpinner, setupLoadingIndicators } from './utilities/loading-indicator.mjs';
import { fetchTrendingGames, fetchAllGames } from './services/apiHandler.mjs';
import { displayGames, displayTrendingGames, setupNavigationListeners } from './services/gameDisplay.mjs';
import { setupThemeSwitcher } from './utilities/themeSwitcher.mjs';
import { fetchGameData, displaySimilarGames } from './pages/single-game.mjs';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Debugging statement
    const header = document.querySelector('header');
    if (header) {
        const navbar = createNavbar();
        header.appendChild(navbar);
    }

    displayCart();
    updateCartItemCount();

    const isGamesPage = document.body.classList.contains('games-page');
    const isSingleGamePage = document.body.classList.contains('single-game-page');

    if (isGamesPage) {
        setTimeout(() => {
            updateIconColors();
        }, 500);

        fetchTrendingGames().then(displayTrendingGames);
        fetchAllGames().then(displayGames);

        const gameId = new URLSearchParams(window.location.search).get("id");
        if (gameId) {
            fetchGameData(gameId);
            displaySimilarGames(gameId);
        }
    }

    if (isSingleGamePage) {
        const gameId = new URLSearchParams(window.location.search).get("id");
        if (gameId) {
            fetchGameData(gameId).then(game => {
                console.log('Fetched game data:', game); // Debugging statement
                // Ensure single game details are populated
                document.querySelector('.game-title').textContent = game.title;
                document.querySelector('.game-price').textContent = game.onSale ? `€${game.discountedPrice.toFixed(2)}` : `€${game.price.toFixed(2)}`;
                document.querySelector('.game-image').src = game.image || "path/to/default-image.jpg";
                const addToCartButton = document.querySelector('.button--add_to_cart');
                addToCartButton.dataset.productId = game.id;
                addToCartButton.addEventListener('click', function() {
                    addToCart(game.id, addToCartButton);
                    updateButtonText();
                });
            }).catch(error => console.error('Failed to fetch game data:', error));
        }
    }

    setupCartIcon();
    setupCartEvents();
    setupLoadingIndicators();
    setupNavigationListeners();
    setupThemeSwitcher();
});
