// loading-indicator.mjs
export function showSpinner() {
  const spinner = document.querySelector(".spinner-container");
  if (spinner) {
    spinner.style.display = "flex";
  } else {
    console.error("Spinner container not found.");
  }
}

export function hideSpinner() {
  const spinner = document.querySelector(".spinner-container");
  if (spinner) {
    spinner.style.display = "none";
    showGameContent();
  } else {
    console.error("Spinner container not found.");
  }
}

export function showGameContent() {
  const gameContent = document.querySelector(".hidden-until-loaded");
  if (gameContent) {
    gameContent.style.display = "block";
  } else {
    console.error("Game content container not found.");
  }
}

export function setupLoadingIndicators() {
  window.addEventListener("load", function () {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    } else {
      console.error("Loading indicator not found.");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", function (event) {
        if (!link.href.includes("#") && !link.href.endsWith(".html")) {
          showSpinner();
        }
      });
    });
  });
}
