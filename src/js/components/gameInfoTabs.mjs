// tabs.js

export function setupTabListeners() {
  document.querySelectorAll(".tab-title").forEach((tabButton) => {
    tabButton.addEventListener("click", (event) => {
      openTab(event, tabButton.getAttribute("data-tab"));
    });
  });
}

// Function to handle opening a tab and showing its content
export function openTab(evt, tabName) {
  const tabContent = document.getElementById(tabName);
  if (!tabContent) {
    console.error(`Tab with id ${tabName} not found.`);
    return;
  }

  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((tabContent) => {
    tabContent.style.display = "none";
  });

  // Remove 'active' class from all tab buttons
  document.querySelectorAll(".tab-title").forEach((tabButton) => {
    tabButton.classList.remove("active");
  });

  // Show the clicked tab's content and add 'active' class to the clicked tab button
  tabContent.style.display = "block";
  evt.currentTarget.classList.add("active");
}

// Attach openTab to the global window object to make it accessible globally
window.openTab = openTab;
