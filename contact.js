// ==================== MOBILE NAVIGATION TOGGLE ====================
const navToggle = document.getElementById('contact-nav-toggle');
const navMenu = document.getElementById('contact-nav-menu');
const navLinks = document.querySelectorAll('.contact-nav-link');

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
const header = document.getElementById('contact-header');
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

// ==================== FORM VALIDATION ====================
const reservationForm = document.getElementById('contact-reservation-form');
const nameInput = document.getElementById('contact-name');
const emailInput = document.getElementById('contact-email');
const phoneInput = document.getElementById('contact-phone');
const dateInput = document.getElementById('contact-date');
const timeInput = document.getElementById('contact-time');
const guestsInput = document.getElementById('contact-guests');
const dishesInput = document.getElementById('contact-dishes');
const requestsInput = document.getElementById('contact-requests');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validateDate(date) {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
}

function validateTime(time) {
    return time.trim().length > 0;
}

function validateGuests(guests) {
    return guests >= 1 && guests <= 20;
}

// Show/hide error for a field
function showError(input, show = true) {
    const formGroup = input.closest('.contact-form-group');
    if (show) {
        formGroup.classList.add('error');
    } else {
        formGroup.classList.remove('error');
    }
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    showError(nameInput, !validateName(nameInput.value));
});

emailInput.addEventListener('blur', () => {
    showError(emailInput, !validateEmail(emailInput.value));
});

phoneInput.addEventListener('blur', () => {
    showError(phoneInput, !validatePhone(phoneInput.value));
});

dateInput.addEventListener('change', () => {
    showError(dateInput, !validateDate(dateInput.value));
});

timeInput.addEventListener('change', () => {
    showError(timeInput, !validateTime(timeInput.value));
});

guestsInput.addEventListener('blur', () => {
    showError(guestsInput, !validateGuests(guestsInput.value));
});

// ==================== AUTO-FILL MULTIPLE DISHES FROM MENU ====================
// This should be at the very top of contact.js, before any other window.load handlers
(function() {
    // Check if there are selected dishes from menu page
    const dishes = JSON.parse(localStorage.getItem('selectedDishes') || '[]');
    const dishesInput = document.getElementById('contact-dishes');
    
    console.log('Selected dishes from localStorage:', dishes); // Debug log
    
    if (dishes.length > 0 && dishesInput) {
        // Count duplicates and format
        const dishCount = {};
        dishes.forEach(dish => {
            dishCount[dish] = (dishCount[dish] || 0) + 1;
        });
        
        // Format: "Gourmet Steak (2), Truffle Pasta, Chocolate Cake (3)"
        const formattedDishes = Object.keys(dishCount).map(dish => {
            return dishCount[dish] > 1 ? `${dish} (${dishCount[dish]})` : dish;
        }).join(', ');
        
        console.log('Formatted dishes:', formattedDishes); // Debug log
        
        // Auto-fill the dishes field
        dishesInput.value = formattedDishes;
        
        // Add a highlight effect
        dishesInput.style.borderColor = 'var(--color-primary)';
        dishesInput.style.backgroundColor = 'rgba(255, 165, 0, 0.1)';
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            dishesInput.style.borderColor = '';
            dishesInput.style.backgroundColor = '';
        }, 2000);
        
        // Clear localStorage after use
        localStorage.removeItem('selectedDishes');
    } else {
        console.log('No dishes found or input not found'); // Debug log
    }
})();

// ==================== HANDLE HASH NAVIGATION ====================
window.addEventListener('load', () => {
    // Check if URL has #booking-form hash
    if (window.location.hash === '#booking-form') {
        setTimeout(() => {
            const bookingForm = document.getElementById('contact-booking-form');
            if (bookingForm) {
                bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Focus on name input
                setTimeout(() => {
                    const nameInput = document.getElementById('contact-name');
                    if (nameInput) {
                        nameInput.focus();
                    }
                }, 500);
            }
        }, 100);
    }
});



// ==================== FORM SUBMISSION & WHATSAPP INTEGRATION ====================
reservationForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Validate all fields
    const isNameValid = validateName(nameInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isPhoneValid = validatePhone(phoneInput.value);
    const isDateValid = validateDate(dateInput.value);
    const isTimeValid = validateTime(timeInput.value);
    const isGuestsValid = validateGuests(guestsInput.value);

    // Show errors for invalid fields
    showError(nameInput, !isNameValid);
    showError(emailInput, !isEmailValid);
    showError(phoneInput, !isPhoneValid);
    showError(dateInput, !isDateValid);
    showError(timeInput, !isTimeValid);
    showError(guestsInput, !isGuestsValid);

    // Check if all validations pass
    if (isNameValid && isEmailValid && isPhoneValid && isDateValid && isTimeValid && isGuestsValid) {
        // Get form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const date = dateInput.value;
        const time = timeInput.value;
        const guests = guestsInput.value;
        const dishes = dishesInput.value.trim();
        const requests = requestsInput.value.trim();

        // Format date for display
        const formattedDate = new Date(date).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Format time for display
        const formattedTime = new Date('1970-01-01T' + time).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // Restaurant's WhatsApp number (replace with actual number)
        const phoneNumber = "919037657289"; // Replace with your actual WhatsApp number

        // Create WhatsApp message
        let message = `🍽️ *Table Reservation Request*%0A%0A`;
        message += `👤 *Name:* ${name}%0A`;
        message += `📧 *Email:* ${email}%0A`;
        message += `📱 *Phone:* ${phone}%0A`;
        message += `📅 *Date:* ${formattedDate}%0A`;
        message += `🕐 *Time:* ${formattedTime}%0A`;
        message += `👥 *Number of Guests:* ${guests}%0A`;
        
        
        if (dishes) {
            message += `🍴 *Preferred Dishes:* ${dishes}%0A`;
        }
        
        if (requests) {
            message += `📝 *Special Requests:* ${requests}%0A`;
        }
        
        message += `%0A✨ Please confirm my reservation. Thank you!`;

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, "_blank");

        // Optional: Show success message
        alert('Redirecting to WhatsApp... Please send the message to confirm your reservation!');

        // Optional: Reset form after submission
        // reservationForm.reset();
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.contact-form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// ==================== SET MINIMUM DATE (TODAY) ====================
// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ==================== BOOK A TABLE BUTTON (NAV) ====================
const bookButtons = document.querySelectorAll('[id*="book-btn"]');

bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Scroll to booking form
        const bookingForm = document.getElementById('contact-booking-form');
        if (bookingForm) {
            bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Focus on name input
            setTimeout(() => {
                nameInput.focus();
            }, 500);
        }
    });
});

// ==================== FOOTER LINK HANDLERS ====================
const footerLinks = document.querySelectorAll('.contact-footer-links a');

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

// ==================== SCROLL ANIMATIONS ====================
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

// Animate contact info cards
const infoCards = document.querySelectorAll('.contact-info-card');

infoCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🍽️ WOW Bites Contact Page Loaded Successfully! ', 'background: #FFA500; color: #0d1117; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cBook your table via WhatsApp 📱', 'color: #FFA500; font-size: 12px;');

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.contact-hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // Fade in booking form
    const bookingForm = document.querySelector('.contact-booking-form');
    if (bookingForm) {
        bookingForm.style.opacity = '0';
        bookingForm.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            bookingForm.style.transition = 'all 0.8s ease';
            bookingForm.style.opacity = '1';
            bookingForm.style.transform = 'translateX(0)';
        }, 200);
    }
});

// ==================== PHONE NUMBER FORMATTING ====================
phoneInput.addEventListener('input', (e) => {
    // Allow only numbers, spaces, +, -, (, )
    e.target.value = e.target.value.replace(/[^\d\s\+\-\(\)]/g, '');
});

// ==================== GUESTS INPUT VALIDATION ====================
guestsInput.addEventListener('input', (e) => {
    // Ensure value is between 1 and 20
    if (e.target.value < 1) e.target.value = 1;
    if (e.target.value > 20) e.target.value = 20;
});
