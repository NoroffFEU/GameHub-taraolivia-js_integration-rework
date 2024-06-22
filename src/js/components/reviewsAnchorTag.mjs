export function openTab(event, tabName) {
  // Hide all tab contents
  const tabContents = document.getElementsByClassName("tab-content");
  for (const content of tabContents) {
    content.style.display = "none";
  }

  // Remove the 'active' class from all tab titles
  const tabTitles = document.getElementsByClassName("tab-title");
  for (const title of tabTitles) {
    title.classList.remove("active");
  }

  // Show the selected tab content
  const selectedTabContent = document.getElementById(tabName);
  if (selectedTabContent) {
    selectedTabContent.style.display = "block";
  }

  // Add the 'active' class to the clicked tab title
  event.currentTarget.classList.add("active");

  // If the selected tab is "Reviews", show the review cards container
  if (tabName === "Reviews") {
    const reviewCardsContainer = document.getElementById("review-cards-container");
    if (reviewCardsContainer) {
      reviewCardsContainer.style.display = "block";
    }
  }
}

export function smoothScroll(target, offset = 0) {
  const element = document.getElementById(target);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition - offset;
    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth"
    });
    return false; // Prevent default anchor behavior
  }
}

export function setupReviewsLink() {
  const reviewsLink = document.getElementById("reviews-link");
  if (reviewsLink) {
    reviewsLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag
      const reviewsTab = document.getElementById("Reviews");
      if (reviewsTab) {
        openTab(event, "Reviews"); // Open the Reviews tab
        smoothScroll("Reviews", 100); // Scroll to the reviews section smoothly, adjust 100 to your navbar height
      }
    });
  }
}
