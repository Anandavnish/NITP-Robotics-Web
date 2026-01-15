document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const hasVisited = sessionStorage.getItem('roboticsClubVisited');

    if (hasVisited) {
        // If already visited, hide immediately
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
        document.body.classList.remove('no-scroll');
    } else {
        // First visit logic
        const loadingTime = 4000; // Reduced to 4 seconds for better UX

        // Add a class to prevent scrolling during splash
        document.body.classList.add('no-scroll');

        setTimeout(() => {
            if (splashScreen) {
                splashScreen.classList.add('fade-out');
            }
            document.body.classList.remove('no-scroll');

            // Remove from DOM after fade animation
            setTimeout(() => {
                if (splashScreen) {
                    splashScreen.style.display = 'none';
                }
                // Set visited flag after successful splash
                sessionStorage.setItem('roboticsClubVisited', 'true');
            }, 800);
        }, loadingTime);
    }
});
