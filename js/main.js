/* ===================================
   ROBOTICS CLUB - FILTERING SYSTEM
   Project filtering, event sorting
   =================================== */

// ===================================
// PROJECT FILTERING
// ===================================
document.addEventListener('DOMContentLoaded', function () {

    const filterButtons = document.querySelectorAll('.filter-btn');

    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===================================
    // EVENT SORTING
    // ===================================
    const sortSelect = document.getElementById('eventSort');
    const eventCards = document.querySelectorAll('.event-card');

    if (sortSelect && eventCards.length > 0) {
        sortSelect.addEventListener('change', function () {
            const sortValue = this.value;
            const eventsContainer = document.querySelector('.events-grid');
            const eventsArray = Array.from(eventCards);

            // Sort events based on selection
            eventsArray.sort((a, b) => {
                if (sortValue === 'date') {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateA - dateB;
                } else if (sortValue === 'name') {
                    const nameA = a.getAttribute('data-name').toLowerCase();
                    const nameB = b.getAttribute('data-name').toLowerCase();
                    return nameA.localeCompare(nameB);
                }
                return 0;
            });

            // Re-append sorted events
            eventsArray.forEach(event => {
                eventsContainer.appendChild(event);
            });
        });
    }

    // ===================================
    // NEWS CATEGORY FILTERING
    // ===================================
    const newsFilterButtons = document.querySelectorAll('.news-filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    if (newsFilterButtons.length > 0 && newsCards.length > 0) {
        newsFilterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                newsFilterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter news items
                newsCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===================================
    // SEARCH FUNCTIONALITY
    // ===================================
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const searchableCards = document.querySelectorAll('.searchable-card');

            searchableCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();

                if (cardText.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ===================================
    // TEAM MEMBER FILTERING BY SPECIALIZATION
    // ===================================
    const teamFilterButtons = document.querySelectorAll('.team-filter-btn');
    const teamMembers = document.querySelectorAll('.team-member');

    if (teamFilterButtons.length > 0 && teamMembers.length > 0) {
        teamFilterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                teamFilterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter team members
                teamMembers.forEach(member => {
                    const memberSpecialization = member.getAttribute('data-specialization');

                    if (filterValue === 'all' || memberSpecialization === filterValue) {
                        member.style.display = 'block';
                        member.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        member.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===================================
    // STATS COUNTER ANIMATION
    // ===================================
    const statsSection = document.querySelector('.stats-container');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false; // Function Started ? No

    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    statNumbers.forEach(num => startCount(num));
                    started = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    function startCount(el) {
        const goal = parseInt(el.dataset.count);
        const count = setInterval(() => {
            const current = parseInt(el.textContent);
            if (isNaN(current)) {
                el.textContent = '0+';
                return;
            }

            // Increment logic
            let increment = Math.ceil(goal / 50); // Speed
            let next = parseInt(el.innerText) + increment;

            if (next >= goal) {
                el.innerText = goal + "+";
                clearInterval(count);
            } else {
                el.innerText = next + "+";
            }
        }, 30); // Interval time
    }
});

// ===================================
// UTILITY FUNCTION: Reset all filters
// ===================================
function resetFilters() {
    const allFilterButtons = document.querySelectorAll('.filter-btn, .news-filter-btn, .team-filter-btn');
    const allCards = document.querySelectorAll('.project-card, .event-card, .news-card, .team-member');

    allFilterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    allCards.forEach(card => {
        card.style.display = 'block';
    });
}

// ===================================
// FUTURE API INTEGRATION NOTES
// ===================================
/*
 * When backend is integrated, replace static filtering with:
 * 
 * 1. API endpoint for filtered projects:
 *    GET /api/projects?category={category}&year={year}
 * 
 * 2. API endpoint for sorted events:
 *    GET /api/events?sort={date|name}&order={asc|desc}
 * 
 * 3. API endpoint for news by category:
 *    GET /api/news?category={category}&limit={number}
 * 
 * 4. Search API endpoint:
 *    GET /api/search?q={query}&type={projects|events|news}
 */