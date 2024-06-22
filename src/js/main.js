import { createNavbar } from './components/navbar.mjs';
import { createNavSecondLine } from './components/navSecondLine.mjs';
import { updateIconColors, updateCartItemCount, displayCart, setupCartIcon, setupCartEvents, addToCart, updateButtonText } from './components/cart.mjs';
import { fetchTrendingGames, fetchAllGames } from './services/apiHandler.mjs';
import { displayGames, displayTrendingGames, setupNavigationListeners } from './services/gameDisplay.mjs';
import { setupThemeSwitcher } from './utilities/themeSwitcher.mjs';
import { fetchGameData, displaySimilarGames } from './pages/singleGame.mjs';
import { setupFAQ } from './components/faq.mjs';
import { generateGenreButtons, filterProduct } from './utilities/gameFilter.mjs';
import { createLoadingIndicatorWedge, showWedge, hideWedge } from './utilities/loadingIndicatorWedge.mjs';
import { createLoadingIndicatorBeanEater, showBeanEater, hideBeanEater } from './utilities/loadingIndicatorBeanEater.mjs';
import { setupReviewsLink } from './components/reviewsAnchorTag.mjs';
import { plusSlides, currentSlide, showSlides } from './components/gameImageGallery.mjs';
import { createBlogCarousel } from './components/blogCarousel.mjs';
import { setupTabListeners, openTab } from './components/gameInfoTabs.mjs';
import { createReviewCard } from './components/reviewCard.mjs';



document.addEventListener('DOMContentLoaded', () => {
  
  const header = document.querySelector('header');
  if (header) {
    const navbar = createNavbar();
    header.appendChild(navbar);
  }

  const navSecondLinePlaceholder = document.getElementById('nav-second-line-placeholder');
  if (navSecondLinePlaceholder) {
    const navSecondLine = createNavSecondLine();
    navSecondLinePlaceholder.appendChild(navSecondLine);
  }

  const loadingIndicatorWedgePlaceholder = document.getElementById('loading-indicator-wedge-placeholder');
  if (loadingIndicatorWedgePlaceholder) {
    const loadingIndicatorWedge = createLoadingIndicatorWedge();
    loadingIndicatorWedgePlaceholder.appendChild(loadingIndicatorWedge);
  }

  const loadingIndicatorBeanEaterPlaceholder = document.getElementById('loading-indicator-bean-eater-placeholder');
  if (loadingIndicatorBeanEaterPlaceholder) {
    const loadingIndicatorBeanEater = createLoadingIndicatorBeanEater();
    loadingIndicatorBeanEaterPlaceholder.appendChild(loadingIndicatorBeanEater);
  }

  const container = document.getElementById('blog-carousel'); // Replace with your actual container ID
  if (container) {
    container.appendChild(createBlogCarousel()); 
  }

  const defaultTab = document.querySelector('.tab-title[data-tab="defaultTab"]');
  if (defaultTab) {
    openTab(new Event('click'), defaultTab.getAttribute('data-tab')); // Open the default tab if specified
  }

    // Review Cards Initialization
    const reviewCardsContainer = document.querySelector("#review-cards-container");
    const showMoreButton = document.getElementById("show-more-btn");
  
    if (reviewCardsContainer) {
      // Generate some initial review cards
      for (let i = 0; i < 3; i++) {
        createReviewCard(reviewCardsContainer);
      }
  
      // Event listener for the "Show More" button
      if (showMoreButton) {
        showMoreButton.addEventListener("click", function () {
          // Generate 5 more review cards
          for (let i = 0; i < 5; i++) {
            createReviewCard(reviewCardsContainer);
          }
        });
      }
    }

  displayCart();
  updateCartItemCount();

  const isGamesPage = document.body.classList.contains('games-page');
  const isSingleGamePage = document.body.classList.contains('single-game-page');

  if (isGamesPage) {
    setTimeout(() => {
      updateIconColors();
    }, 500);

    showWedge(); // Show wedge while fetching data
    fetchTrendingGames().then(displayTrendingGames).finally(hideWedge); // Hide wedge after fetching
    fetchAllGames().then(games => {
      sessionStorage.setItem("games", JSON.stringify(games));
      displayGames(games);
      generateGenreButtons(games);
    }).finally(hideWedge); // Hide wedge after fetching

    const gameId = new URLSearchParams(window.location.search).get("id");
    if (gameId) {
      showBeanEater(); // Show bean eater while fetching data
      fetchGameData(gameId).finally(hideBeanEater); // Hide bean eater after fetching
      displaySimilarGames(gameId);
    }
  }

  if (isSingleGamePage) {
    const gameId = new URLSearchParams(window.location.search).get("id");
    if (gameId) {
      showBeanEater(); // Show bean eater while fetching data
      fetchGameData(gameId).then(game => {
        console.log('Fetched game data:', game);
        document.querySelector('.game-title').textContent = game.title;
        document.querySelector('.game-price').textContent = game.onSale ? `€${game.discountedPrice.toFixed(2)}` : `€${game.price.toFixed(2)}`;
        document.querySelector('.game-image').src = game.image || "path/to/default-image.jpg";
        const addToCartButton = document.querySelector('.button--add_to_cart');
        addToCartButton.dataset.productId = game.id;
        addToCartButton.addEventListener('click', function() {
          addToCart(game.id, addToCartButton);
          updateButtonText();
        });

        // Initialize the gallery
        showSlides(slideIndex);

        // Add event listeners for the slider
        document.querySelectorAll(".prev").forEach(element => {
          element.addEventListener("click", () => plusSlides(-1));
        });

        document.querySelectorAll(".next").forEach(element => {
          element.addEventListener("click", () => plusSlides(1));
        });

        document.querySelectorAll(".demo").forEach((element, index) => {
          element.addEventListener("click", () => currentSlide(index + 1));
        });
      }).catch(error => console.error('Failed to fetch game data:', error))
        .finally(hideBeanEater); // Hide bean eater after fetching
    }
  }

  setupCartIcon();
  setupCartEvents();
  setupNavigationListeners();
  setupThemeSwitcher();
  setupFAQ();
  setupReviewsLink();
  setupTabListeners();

});
