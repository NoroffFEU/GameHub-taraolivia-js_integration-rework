// loadingIndicatorWedge.mjs
export function createLoadingIndicatorWedge() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.id = 'loading-indicator-wedge';
  loadingIndicator.style.display = 'none'; // Initially hidden
  loadingIndicator.innerHTML = `<img src="/assets/images/loading-indicator/wedge.gif" alt="Loading...">`;
  return loadingIndicator;
}

export function showWedge() {
  const loadingIndicator = document.getElementById('loading-indicator-wedge');
  if (loadingIndicator) {
      loadingIndicator.style.display = 'block';
  } else {
      console.error('Wedge loading indicator not found.');
  }
}

export function hideWedge() {
  const loadingIndicator = document.getElementById('loading-indicator-wedge');
  if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
  } else {
      console.error('Wedge loading indicator not found.');
  }
}