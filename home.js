// ==================== MOBILE NAVIGATION TOGGLE ====================
const navToggle = document.getElementById('home-nav-toggle');
const navMenu = document.getElementById('home-nav-menu');
const navLinks = document.querySelectorAll('.home-nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ==================== NAVIGATION SCROLL EFFECT ====================
const header = document.getElementById('home-header');
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

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.home-nav-link[href="#${sectionId}"]`);

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ==================== SMOOTH SCROLL ====================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Check if it's an internal link
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

// ==================== NEWSLETTER FORM SUBMISSION ====================
const newsletterForm = document.getElementById('home-newsletter-form');
const newsletterEmail = document.getElementById('home-newsletter-email');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterEmail.value;
    
    if (email) {
        // Show success message (you can customize this)
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        newsletterEmail.value = '';
    }
});

// ==================== BOOK A TABLE BUTTONS ====================
const bookButtons = document.querySelectorAll('[id$="-book-btn"]');

bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Add your booking functionality here
        //alert('Booking system will be integrated here. Please call +91 484 123 4567 to book a table.');
        window.location.href = 'contact.html#booking-form';
    });
});

// ==================== ADD TO ORDER BUTTONS ====================
const orderButtons = document.querySelectorAll('.home-dish-btn');

orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click
        
        // Visual feedback
        button.textContent = 'Redirecting...';
        button.style.backgroundColor = '#4caf50';
        
        // Redirect to menu page after short delay
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 500);
    });
});


// ==================== VIEW FULL MENU BUTTON ====================
const viewMenuBtn = document.getElementById('home-view-menu-btn');

if (viewMenuBtn) {
    viewMenuBtn.addEventListener('click', () => {
        // Navigate to menu page or show menu modal
        window.location.href = 'menu.html'; // Update with actual menu page URL
    });
}

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
const animateElements = document.querySelectorAll('.home-dish-card, .home-testimonial-card');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== PREVENT CARD CLICK ON BUTTON CLICK ====================
const dishCards = document.querySelectorAll('.home-dish-card');

dishCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Only trigger if not clicking on button
        if (!e.target.closest('.home-dish-btn')) {
            // Card is not clickable as per requirements
            // You can add functionality here if needed
        }
    });
});

// ==================== FOOTER LINK HANDLERS ====================
const footerLinks = document.querySelectorAll('.home-footer-links a');

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

// ==================== CONSOLE MESSAGE ====================
console.log('%c🍽️ WOW Bites Website Loaded Successfully! ', 'background: #FFA500; color: #0d1117; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cDeveloped with ❤️ for premium dining experience', 'color: #FFA500; font-size: 12px;');
