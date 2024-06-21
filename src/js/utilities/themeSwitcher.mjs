export function applyTheme(theme, iconSrc) {
    document.documentElement.setAttribute('data-theme', theme);

    const currentThemeIcon = document.getElementById('current-theme-icon');
    if (currentThemeIcon) {
        currentThemeIcon.src = iconSrc;
        currentThemeIcon.alt = `${theme} theme icon`;
    }
}

export function setupThemeSwitcher() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedIcon = localStorage.getItem('themeIcon') || 'default-icon.png';
    applyTheme(savedTheme, savedIcon);

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            const iconSrc = this.getAttribute('data-icon');
            applyTheme(theme, iconSrc);
            localStorage.setItem('theme', theme);
            localStorage.setItem('themeIcon', iconSrc);
        });

        option.addEventListener('mouseenter', function() {
            const currentTheme = document.documentElement.dataset.theme;
            if (this.dataset.theme === currentTheme) return;
            document.querySelectorAll('.theme-option').forEach(otherOption => {
                if (otherOption !== this) {
                    otherOption.style.opacity = '0.5';
                }
            });
            this.style.transform = 'scale(1.2)';
        });

        option.addEventListener('mouseleave', function() {
            document.querySelectorAll('.theme-option').forEach(otherOption => {
                otherOption.style.opacity = '1';
                otherOption.style.transform = 'scale(1)';
            });
        });
    });

    const themeDisplay = document.querySelector('.theme-display');
    const themePicker = document.querySelector('.theme-picker');

    if (themeDisplay && themePicker) {
        themeDisplay.addEventListener('click', function() {
            themePicker.classList.toggle('open');
        });
    }
}

