// ==================== MOBILE NAVIGATION TOGGLE ====================
const navToggle = document.getElementById('menu-nav-toggle');
const navMenu = document.getElementById('menu-nav-menu');
const navLinks = document.querySelectorAll('.menu-nav-link');

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
const header = document.getElementById('menu-header');
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

// ==================== MENU FILTER FUNCTIONALITY ====================
const filterButtons = document.querySelectorAll('.menu-filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
const sectionHeading = document.getElementById('menu-section-heading');

// Filter button click handler
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Update section heading
        updateSectionHeading(filterValue);
        
        // Filter menu cards
        filterMenuCards(filterValue);
    });
});

// Function to filter menu cards
function filterMenuCards(category) {
    menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all') {
            // Show all cards
            card.classList.remove('hidden');
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // Show only matching category
            if (cardCategory === category) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        }
    });
}

// Function to update section heading based on filter
function updateSectionHeading(category) {
    const headings = {
        'all': 'All Dishes',
        'veg': 'Vegetarian Dishes',
        'non-veg': 'Non-Vegetarian Dishes',
        'sweets': 'Sweet Treats',
        'beverages': 'Cold Beverages'
    };
    
    sectionHeading.textContent = headings[category] || 'All Dishes';
}

// ==================== BOOK A TABLE BUTTON ====================
const bookButtons = document.querySelectorAll('[id*="book-btn"]');

bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Add your booking functionality here
        //alert('Booking system will be integrated here. Please call +91 484 123 4567 to book a table.');
        window.location.href = 'contact.html#booking-form';
    });
});

// ==================== ADD TO ORDER BUTTONS (ALLOW DUPLICATES) ====================
const orderButtons = document.querySelectorAll('.menu-card-btn');

orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const card = button.closest('.menu-card');
        const itemTitle = card.querySelector('.menu-card-title').textContent;
        
        // Get existing dishes or create new array
        let dishes = JSON.parse(localStorage.getItem('selectedDishes') || '[]');
        
        // ALWAYS ADD - ALLOW DUPLICATES
        dishes.push(itemTitle);
        localStorage.setItem('selectedDishes', JSON.stringify(dishes));
        
        // Visual feedback - Green with total count
        const originalText = button.textContent;
        button.textContent = `Added (${dishes.length})`;
        button.style.backgroundColor = '#4caf50';
        
        // Update cart button count
        updateCartButton();
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    });
});

// ==================== CART BUTTON FUNCTIONALITY ====================
// Create and add cart button to page
function createCartButton() {
    // Check if cart button already exists
    if (document.getElementById('menu-cart-btn')) return;
    
    const cartButton = document.createElement('button');
    cartButton.id = 'menu-cart-btn';
    cartButton.className = 'menu-cart-button';
    cartButton.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <span class="menu-cart-count">0</span>
        <span class="menu-cart-text">View Order</span>
    `;
    cartButton.style.display = 'none'; // Hidden initially
    
    document.body.appendChild(cartButton);
    
    // Click handler
    cartButton.addEventListener('click', () => {
        window.location.href = 'contact.html#booking-form';
    });
}

// Update cart button count
function updateCartButton() {
    let cartButton = document.getElementById('menu-cart-btn');
    
    if (!cartButton) {
        createCartButton();
        cartButton = document.getElementById('menu-cart-btn');
    }
    
    const dishes = JSON.parse(localStorage.getItem('selectedDishes') || '[]');
    const count = dishes.length;
    
    if (count > 0) {
        cartButton.style.display = 'flex';
        cartButton.querySelector('.menu-cart-count').textContent = count;
    } else {
        cartButton.style.display = 'none';
    }
}

// Initialize cart button on page load
window.addEventListener('load', () => {
    createCartButton();
    updateCartButton();
});

// ==================== CART BUTTON FUNCTIONALITY ====================
// Create and add cart button to page
function createCartButton() {
    // Check if cart button already exists
    if (document.getElementById('menu-cart-btn')) return;
    
    const cartButton = document.createElement('button');
    cartButton.id = 'menu-cart-btn';
    cartButton.className = 'menu-cart-button';
    cartButton.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <span class="menu-cart-count">0</span>
        <span class="menu-cart-text">View Order</span>
    `;
    cartButton.style.display = 'none'; // Hidden initially
    
    document.body.appendChild(cartButton);
    
    // Click handler
    cartButton.addEventListener('click', () => {
        window.location.href = 'contact.html#booking-form';
    });
}

// Update cart button count
function updateCartButton() {
    let cartButton = document.getElementById('menu-cart-btn');
    
    if (!cartButton) {
        createCartButton();
        cartButton = document.getElementById('menu-cart-btn');
    }
    
    const dishes = JSON.parse(localStorage.getItem('selectedDishes') || '[]');
    const count = dishes.length;
    
    if (count > 0) {
        cartButton.style.display = 'flex';
        cartButton.querySelector('.menu-cart-count').textContent = count;
    } else {
        cartButton.style.display = 'none';
    }
}

// Initialize cart button on page load
window.addEventListener('load', () => {
    createCartButton();
    updateCartButton();
});



// ==================== SCROLL REVEAL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'  // Changed from -100px to -50px (triggers earlier)
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Set initial state and observe cards
menuCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    // Reduced delay from 0.1s to 0.05s per card
    card.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
    observer.observe(card);
});

// ==================== FOOTER LINK HANDLERS ====================
const footerLinks = document.querySelectorAll('.menu-footer-links a');

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
console.log('%c🍽️ WOW Bites Menu Page Loaded Successfully! ', 'background: #FFA500; color: #0d1117; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cTotal Menu Items: 32 | Veg: 8 | Non-Veg: 8 | Sweets: 8 | Beverages: 8', 'color: #FFA500; font-size: 12px;');

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    // Fade in filter buttons
    const filterContainer = document.querySelector('.menu-filter-container');
    if (filterContainer) {
        filterContainer.style.opacity = '0';
        filterContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            filterContainer.style.transition = 'all 0.8s ease';
            filterContainer.style.opacity = '1';
            filterContainer.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ==================== INSTRUCTIONS FOR ADDING NEW ITEMS ====================
/*
HOW TO ADD A NEW MENU ITEM:

1. Find the category section you want to add to (VEG, NON-VEG, SWEETS, or BEVERAGES)
2. Copy one complete menu-card div from that section
3. Paste it at the end of that category section
4. Update the following:
   - data-cms attribute (increment the number)
   - Image src and alt text
   - Badge text (keep the same category)
   - Title
   - Description
   - Price
   - All data-cms attributes with new incremented numbers

EXAMPLE - Adding a new VEG item:

<div class="menu-card" data-category="veg" data-cms="menu-item-33">
    <div class="menu-card-image">
        <img src="YOUR_IMAGE_URL" alt="New Veg Dish" data-cms="menu-item-33-image">
    </div>
    <div class="menu-card-content">
        <span class="menu-card-badge menu-badge-veg" data-cms="menu-item-33-badge">Veg</span>
        <h4 class="menu-card-title" data-cms="menu-item-33-title">New Veg Dish Name</h4>
        <p class="menu-card-desc" data-cms="menu-item-33-desc">Description of the dish</p>
        <div class="menu-card-footer">
            <span class="menu-card-price" data-cms="menu-item-33-price">₹XXX</span>
            <button class="btn-global menu-card-btn" data-cms="menu-item-33-btn">Add to Order</button>
        </div>
    </div>
</div>

CATEGORY VALUES:
- For Vegetarian: data-category="veg" and class="menu-badge-veg"
- For Non-Vegetarian: data-category="non-veg" and class="menu-badge-nonveg"
- For Sweets: data-category="sweets" and class="menu-badge-sweets"
- For Cold Beverages: data-category="beverages" and class="menu-badge-beverages"

The JavaScript will automatically handle the filtering!
*/
