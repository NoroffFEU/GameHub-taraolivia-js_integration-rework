import { addToCart } from '../components/cart.mjs';

export function displayGames(games) {
    const container = document.getElementById("all-games-container");
    if (container) {
        updateGamesDisplay(games, container);
        container.parentElement.style.display = "block";
    }
}

export function displayTrendingGames(games) {
    const container = document.getElementById("trending-games-container");
    if (container) {
        updateGamesDisplay(games, container);
    }
}

export function setupNavigationListeners() {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
        link.addEventListener("click", function () {
            const loadingIndicator = document.getElementById("loading-indicator");
            if (loadingIndicator) loadingIndicator.style.display = "flex";
        });
    });

    window.addEventListener("load", function () {
        const loadingIndicator = document.getElementById("loading-indicator");
        if (loadingIndicator) loadingIndicator.style.display = "none";
    });
}

function updateGamesDisplay(games, container) {
    container.innerHTML = "";
    games.forEach((game) => {
        container.appendChild(createElementForGame(game));
    });
}

function createElementForGame(game) {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";
    const imageUrl = game.image || "assets/images/default-image.png";
    const imageAlt = `${game.title} cover`;
    const singleGameUrl = `single-game.html?id=${game.id}`;

    gameCard.innerHTML = `
        <a href="${singleGameUrl}" class="game-link">
            <img class="game-image" src="${imageUrl}" alt="${imageAlt}" />
            <div class="game-card-text-flex">
                <h3 class="game-card-title">${game.title}</h3>
                <p class="game-card-price">
                    ${game.onSale ? 
                        `<span class="original-price">€${game.price.toFixed(2)}</span>
                        <span class="discounted-price">€${game.discountedPrice.toFixed(2)}</span>` : 
                        `€${game.price.toFixed(2)}`
                    }
                </p>
            </div>
        </a>
        <div class="button action-buttons">
            <a href="${singleGameUrl}" class="view-details">View now</a>
            <button class="add-to-cart-button" data-game-id="${game.id}">
                <svg class="cart-icon-in-button" data-game-id="${game.id}" width="50" height="45" viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- SVG Content -->
                    <path fill="#" d="M2.63455 0.0152132C1.81515 0.174289 1.08138 0.721805 0.59468 1.53731C0.107977 2.35282 -0.0917951 3.36952 0.0393099 4.36374C0.170415 5.35797 0.621658 6.24828 1.29377 6.83882C1.96588 7.42936 2.80381 7.67175 3.62322 7.51268H12.8919L13.4481 9.38704L15.9815 18.7589L18.515 28.1307C18.7621 29.1054 19.8126 30.0051 20.6159 30.0051H42.2429C43.108 30.0051 44.0967 29.1054 44.3438 28.1307L49.3489 9.38704C49.5961 8.41237 49.2254 7.51268 48.3603 7.51268H20.9248L18.5768 2.1145C18.3267 1.49491 17.9405 0.971069 17.4608 0.600672C16.9811 0.230274 16.4264 0.0276854 15.8579 0.0152132L3.49963 0.0152132C3.31464 -0.00507108 3.12851 -0.00507108 2.94351 0.0152132C2.82004 0.00620817 2.69623 0.00620817 2.57276 0.0152132L2.63455 0.0152132ZM22.1607 37.5025C20.4305 37.5025 19.0711 39.152 19.0711 41.2513C19.0711 43.3506 20.4305 45 22.1607 45C23.8908 45 25.2502 43.3506 25.2502 41.2513C25.2502 39.152 23.8908 37.5025 22.1607 37.5025ZM40.6981 37.5025C38.968 37.5025 37.6086 39.152 37.6086 41.2513C37.6086 43.3506 38.968 45 40.6981 45C42.4283 45 43.7877 43.3506 43.7877 41.2513C43.7877 39.152 42.4283 37.5025 40.6981 37.5025Z"/>
                </svg>
            </button>
        </div>
    `;

    const addToCartButton = gameCard.querySelector('.add-to-cart-button');
    addToCartButton.addEventListener('click', () => addToCart(game.id, addToCartButton));

    return gameCard;
}
