document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const loadingTime = 5000; // 5 seconds

    // Add a class to prevent scrolling during splash
    document.body.classList.add('no-scroll');

    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        document.body.classList.remove('no-scroll');

        // Remove from DOM after fade animation to prevent interaction issues
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    }, loadingTime);
});
