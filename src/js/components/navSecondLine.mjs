// navSecondLine.mjs
export function createNavSecondLine() {
    const navSecondLine = document.createElement('nav');
    navSecondLine.classList.add('breadcrumbs');
    navSecondLine.setAttribute('aria-label', 'Breadcrumb');
    navSecondLine.innerHTML = `
        <div class="navbar__content-second-row">
            <ol id="breadcrumb-list" class="breadcrumbs__list">
                <!-- Dynamic breadcrumbs will be inserted here -->
            </ol>
            <div id="theme-display" class="theme-display">
                <img src="/assets/images/icons/theme-icons/day.png" alt="Current Theme" id="current-theme-icon">
                <div id="theme-picker" class="theme-picker">
                    <div class="theme-option" data-theme="light" data-icon="/assets/images/icons/theme-icons/day.png">
                        <img src="/assets/images/icons/theme-icons/day.png" alt="Light theme icon">
                        <span class="theme-details">
                            <span class="theme-name">Day</span>
                            <div class="color-preview-wrapper">
                                <div class="day-primary color-preview"></div>
                                <div class="day-secondary color-preview"></div>
                                <div class="day-accent color-preview"></div>
                            </div>
                        </span>
                    </div>
                    <div class="theme-option" data-theme="dark" data-icon="/assets/images/icons/theme-icons/night.png">
                        <img src="/assets/images/icons/theme-icons/night.png" alt="Dark theme icon">
                        <span class="theme-details">
                            <span class="theme-name">Night</span>
                            <div class="color-preview-wrapper">
                                <div class="night-primary color-preview"></div>
                                <div class="night-secondary color-preview"></div>
                                <div class="night-accent color-preview"></div>
                            </div>
                        </span>
                    </div>
                    <div class="theme-option" data-theme="nature" data-icon="/assets/images/icons/theme-icons/nature.png">
                        <img src="/assets/images/icons/theme-icons/nature.png" alt="Nature theme icon">
                        <span class="theme-details">
                            <span class="theme-name">Nature</span>
                            <div class="color-preview-wrapper">
                                <div class="nature-primary color-preview"></div>
                                <div class="nature-secondary color-preview"></div>
                                <div class="nature-accent color-preview"></div>
                            </div>
                        </span>
                    </div>
                    <div class="theme-option" data-theme="pink" data-icon="/assets/images/icons/theme-icons/pink.png">
                        <img src="/assets/images/icons/theme-icons/pink.png" alt="Pink theme icon">
                        <span class="theme-details">
                            <span class="theme-name">Pink</span>
                            <div class="color-preview-wrapper">
                                <div class="pink-primary color-preview"></div>
                                <div class="pink-secondary color-preview"></div>
                                <div class="pink-accent color-preview"></div>
                            </div>
                        </span>
                    </div>
                    <div class="theme-option" data-theme="pastel" data-icon="/assets/images/icons/theme-icons/pastel.png">
                        <img src="/assets/images/icons/theme-icons/pastel.png" alt="Pastel theme icon">
                        <span class="theme-details">
                            <span class="theme-name">Pastel</span>
                            <div class="color-preview-wrapper">
                                <div class="pastel-primary color-preview"></div>
                                <div class="pastel-secondary color-preview"></div>
                                <div class="pastel-accent color-preview"></div>
                            </div>
                        </span>
                    </div>
                    <div class="theme-option" data-theme="black" data-icon="/assets/images/icons/theme-icons/black.png">
                        <img src="/assets/images/icons/theme-icons/black.png" alt="Black theme icon">
                        <span class="theme-details">
                            <span class="theme-name">Black</span>
                            <div class="color-preview-wrapper">
                                <div class="black-primary color-preview"></div>
                                <div class="black-secondary color-preview"></div>
                                <div class="black-accent color-preview"></div>
                            </div>
                        </span>
                    </div>
                    <div class="theme-option" data-theme="white" data-icon="/assets/images/icons/theme-icons/white.png">
                        <img src="/assets/images/icons/theme-icons/white.png" alt="White theme icon">
                        <span class="theme-details">
                            <span class="theme-name">White</span>
                            <div class="color-preview-wrapper">
                                <div class="white-primary color-preview"></div>
                                <div class="white-secondary color-preview"></div>
                                <div class="white-accent color-preview"></div>
                            </div>
                        </span>
                    </div>
                    <div class="theme-option" data-theme="neon" data-icon="/assets/images/icons/theme-icons/neon.png">
                        <img src="/assets/images/icons/theme-icons/neon.png" alt="Neon theme icon">
                        <span class="theme-details">
                            <span class="theme-name">Neon</span>
                            <div class="color-preview-wrapper">
                                <div class="neon-primary color-preview"></div>
                                <div class="neon-secondary color-preview"></div>
                                <div class="neon-accent color-preview"></div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <button id="cart-icon" class="cart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="35" viewBox="0 0 50 45" fill="">
                    <path d="M2.63455 0.0152132C1.81515 0.174289 1.08138 0.721805 0.59468 1.53731C0.107977 2.35282 -0.0917951 3.36952 0.0393099 4.36374C0.170415 5.35797 0.621658 6.24828 1.29377 6.83882C1.96588 7.42936 2.80381 7.67175 3.62322 7.51268H12.8919L13.4481 9.38704L15.9815 18.7589L18.515 28.1307C18.7621 29.1054 19.8126 30.0051 20.6159 30.0051H42.2429C43.108 30.0051 44.0967 29.1054 44.3438 28.1307L49.3489 9.38704C49.5961 8.41237 49.2254 7.51268 48.3603 7.51268H20.9248L18.5768 2.1145C18.3267 1.49491 17.9405 0.971069 17.4608 0.600672C16.9811 0.230274 16.4264 0.0276854 15.8579 0.0152132L3.49963 0.0152132C3.31464 -0.00507108 3.12851 -0.00507108 2.94351 0.0152132C2.82004 0.00620817 2.69623 0.00620817 2.57276 0.0152132L2.63455 0.0152132ZM22.1607 37.5025C20.4305 37.5025 19.0711 39.152 19.0711 41.2513C19.0711 43.3506 20.4305 45 22.1607 45C23.8908 45 25.2502 43.3506 25.2502 41.2513C25.2502 39.152 23.8908 37.5025 22.1607 37.5025ZM40.6981 37.5025C38.968 37.5025 37.6086 39.152 37.6086 41.2513C37.6086 43.3506 38.968 45 40.6981 45C42.4283 45 43.7877 43.3506 43.7877 41.2513C43.7877 39.152 42.4283 37.5025 40.6981 37.5025Z" fill=""/>
                    <path d="M2.7154 0.508906C2.77933 0.50757 2.84328 0.509231 2.90714 0.513889L2.95265 0.517208L2.99801 0.512235C3.14678 0.495922 3.29636 0.495922 3.44514 0.512235L3.4723 0.515213H3.49963H15.8522C16.3049 0.526295 16.7557 0.687933 17.1552 0.996428C17.5576 1.30712 17.8928 1.75572 18.1131 2.30165L18.1129 2.30172L18.1183 2.31394L20.4663 7.71212L20.5971 8.01268H20.9248H48.3603C48.586 8.01268 48.7295 8.11411 48.8227 8.30438C48.9277 8.51855 48.9664 8.85907 48.865 9.26134C48.8647 9.26227 48.8645 9.26321 48.8643 9.26414L43.8608 28.0017L43.8607 28.0017L43.8592 28.0078C43.7638 28.3839 43.5159 28.7697 43.191 29.0613C42.8608 29.3578 42.5113 29.5051 42.2429 29.5051H20.6159C20.3824 29.5051 20.0322 29.3617 19.6873 29.0581C19.3505 28.7616 19.093 28.3759 18.9996 28.0078L18.9997 28.0078L18.9976 28.0002L16.4642 18.6284L13.9307 9.25656L13.9309 9.25653L13.9274 9.24482L13.3713 7.37046L13.2651 7.01268H12.8919H3.62322H3.57513L3.52793 7.02184C2.87268 7.14905 2.18928 6.96006 1.6238 6.46321C1.05379 5.96238 0.652341 5.18808 0.535019 4.29838C0.417747 3.40906 0.598399 2.50673 1.02403 1.79355C1.44585 1.08676 2.06102 0.640681 2.7154 0.508906ZM19.5711 41.2513C19.5711 39.3333 20.7928 38.0025 22.1607 38.0025C23.5286 38.0025 24.7502 39.3333 24.7502 41.2513C24.7502 43.1692 23.5286 44.5 22.1607 44.5C20.7928 44.5 19.5711 43.1692 19.5711 41.2513ZM38.1086 41.2513C38.1086 39.3333 39.3302 38.0025 40.6981 38.0025C42.066 38.0025 43.2877 39.3333 43.2877 41.2513C43.2877 43.1692 42.066 44.5 40.6981 44.5C39.3302 44.5 38.1086 43.1692 38.1086 41.2513Z" stroke="#F15BF4" stroke-opacity="0.1"/>
                </svg>
                <span id="cartItemCount" class="cart-item-count">0</span>
            </button>
        </div>
    `;
    return navSecondLine;
}
