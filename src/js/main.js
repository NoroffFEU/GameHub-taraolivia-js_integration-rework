import { createNavbar } from './components/navbar.mjs';
import { updateIconColors, updateCartItemCount, displayCart, setupCartIcon, setupCartEvents } from './components/cart.mjs';
import { showSpinner, hideSpinner, showGameContent, setupLoadingIndicators } from './utilities/loading-indicator.mjs';
import { fetchTrendingGames, fetchAllGames } from './services/apiHandler.mjs';
import { displayGames, displayTrendingGames, setupNavigationListeners } from './services/gameDisplay.mjs';
import { applyTheme, setupThemeSwitcher } from './utilities/themeSwitcher.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header'); 
    if (header) {
        const navbar = createNavbar();
        header.appendChild(navbar);
    }

    displayCart();
    updateCartItemCount();

    if (document.body.classList.contains('games-page')) {
        setTimeout(() => {
            updateIconColors();
        }, 500);

        fetchTrendingGames().then(displayTrendingGames);
        fetchAllGames().then(displayGames);
    }

    setupCartIcon();
    setupCartEvents();
    setupLoadingIndicators(); 
    setupThemeSwitcher(); 
    setupNavigationListeners();
});



