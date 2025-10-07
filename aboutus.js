// ==================== MOBILE NAVIGATION TOGGLE ====================
const navToggle = document.getElementById('aboutus-nav-toggle');
const navMenu = document.getElementById('aboutus-nav-menu');
const navLinks = document.querySelectorAll('.aboutus-nav-link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ==================== NAVIGATION SCROLL EFFECT ====================
const header = document.getElementById('aboutus-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    }

    lastScroll = currentScroll;
});

// ==================== SMOOTH SCROLL ====================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Check if it's an internal link (starts with #)
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            
            if (section) {
                const offsetTop = section.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==================== BOOK A TABLE BUTTONS ====================
const bookButtons = document.querySelectorAll('[id*="book-btn"]');

bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Add your booking functionality here
        //alert('Booking system will be integrated here. Please call +91 484 123 4567 to book a table.');
        window.location.href = 'contact.html#booking-form';
    });
});

// ==================== EXPLORE MENU BUTTON ====================
const menuButtons = document.querySelectorAll('[id*="menu-btn"]');

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Navigate to menu page
        window.location.href = 'menu.html'; // Update with actual menu page URL
    });
});

// ==================== SCROLL REVEAL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll('.aboutus-value-card, .aboutus-team-card, .aboutus-story-text');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== VALUE CARDS HOVER EFFECT ====================
const valueCards = document.querySelectorAll('.aboutus-value-card');

valueCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle animation on hover
        card.style.transition = 'all 0.3s ease';
    });
});

// ==================== TEAM CARD INTERACTIONS ====================
const teamCards = document.querySelectorAll('.aboutus-team-card');

teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Enhanced hover effect
        const overlay = card.querySelector('.aboutus-team-overlay');
        if (overlay) {
            overlay.style.transition = 'opacity 0.3s ease';
        }
    });
});

// ==================== FOOTER LINK HANDLERS ====================
const footerLinks = document.querySelectorAll('.aboutus-footer-links a');

footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Handle internal links
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            
            if (section) {
                const offsetTop = section.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==================== PARALLAX EFFECT FOR HERO ====================
const hero = document.querySelector('.aboutus-hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (window.innerWidth > 768) {
            hero.style.backgroundPositionY = `${parallax}px`;
        }
    });
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c🍽️ WOW Bites About Us Page Loaded Successfully! ', 'background: #FFA500; color: #0d1117; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cLearn more about our culinary journey 🌟', 'color: #FFA500; font-size: 12px;');

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.aboutus-hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});
