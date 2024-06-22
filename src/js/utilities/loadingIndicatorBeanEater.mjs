export function createLoadingIndicatorBeanEater() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'bean-eater-container';
    loadingIndicator.style.display = 'none'; // Initially hidden
    loadingIndicator.innerHTML = `<img src="assets/images/loading-indicator/bean-eater.gif" alt="Loading...">`;
    return loadingIndicator;
}

export function showBeanEater() {
    const beanEater = document.querySelector('.bean-eater-container');
    if (beanEater) {
        beanEater.style.display = 'flex';
    } else {
        console.error('Bean eater container not found.');
    }
}

export function hideBeanEater() {
    const beanEater = document.querySelector('.bean-eater-container');
    if (beanEater) {
        beanEater.style.display = 'none';
        showGameContent();
    } else {
        console.error('Bean eater container not found.');
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
