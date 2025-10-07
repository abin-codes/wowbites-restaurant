// ==================== MOBILE NAVIGATION TOGGLE ====================
const navToggle = document.getElementById('blog-nav-toggle');
const navMenu = document.getElementById('blog-nav-menu');
const navLinks = document.querySelectorAll('.blog-nav-link');

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
const header = document.getElementById('blog-header');
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

// ==================== BOOK A TABLE BUTTON ====================
const bookButtons = document.querySelectorAll('[id*="book-btn"]');

bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Add your booking functionality here
        window.location.href = 'contact.html#booking-form';
    });
});

// ==================== NEWSLETTER FORM SUBMISSION ====================
const newsletterForm = document.getElementById('blog-newsletter-form');
const newsletterEmail = document.getElementById('blog-newsletter-email');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterEmail.value;
        
        if (email) {
            // Show success message (you can customize this)
            alert(`Thank you for subscribing! We'll send culinary insights to ${email}`);
            newsletterEmail.value = '';
        }
    });
}

// ==================== READ MORE BUTTONS ====================
const readMoreButtons = document.querySelectorAll('.blog-card-btn');

readMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const card = button.closest('.blog-card');
        const title = card.querySelector('.blog-card-title').textContent;
        
        // Add your navigation to full blog post here
        alert(`Opening blog post: ${title}`);
        // Example: window.location.href = 'blog-post.html?id=1';
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

// Set initial state and observe blog cards
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ==================== FOOTER LINK HANDLERS ====================
const footerLinks = document.querySelectorAll('.blog-footer-links a');

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

// ==================== BLOG CARD HOVER EFFECTS ====================
blogCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Enhanced hover effect
        const image = card.querySelector('.blog-card-image img');
        if (image) {
            image.style.transition = 'transform 0.5s ease';
        }
    });
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🍽️ WOW Bites Blog Page Loaded Successfully! ', 'background: #FFA500; color: #0d1117; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cTotal Blog Posts: 6 | Latest culinary stories and recipes 📖', 'color: #FFA500; font-size: 12px;');

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.blog-hero-content');
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

// ==================== INSTRUCTIONS FOR ADDING NEW BLOG POSTS ====================
/*
HOW TO ADD A NEW BLOG POST:

1. Find the blog-posts-grid section in the HTML
2. Copy one complete <article class="blog-card"> div
3. Paste it at the end of the grid (before the closing </div> of blog-posts-grid)
4. Update the following fields:

   Required Changes:
   - data-cms="blog-post-X" (increment the number)
   - Image src and alt text
   - Date
   - Author name
   - Blog title
   - Blog excerpt/description
   - All data-cms attributes with new incremented numbers

EXAMPLE - Adding Blog Post 7:

<article class="blog-card" data-cms="blog-post-7">
    <div class="blog-card-image">
        <img src="YOUR_IMAGE_URL" alt="Your Blog Title" data-cms="blog-post-7-image">
    </div>
    <div class="blog-card-content">
        <div class="blog-card-meta">
            <span class="blog-card-date" data-cms="blog-post-7-date">
                <i class="fas fa-calendar"></i> Oct 15, 2025
            </span>
            <span class="blog-card-author" data-cms="blog-post-7-author">
                <i class="fas fa-user"></i> Author Name
            </span>
        </div>
        <h3 class="blog-card-title" data-cms="blog-post-7-title">Your Blog Post Title Here</h3>
        <p class="blog-card-excerpt" data-cms="blog-post-7-excerpt">
            Write a compelling excerpt or introduction for your blog post here. Keep it between 2-3 sentences...
        </p>
        <a href="#" class="blog-card-btn" data-cms="blog-post-7-btn">Read More</a>
    </div>
</article>

TIPS:
- Keep excerpt to 2-3 sentences for consistency
- Use high-quality images (recommended: 800px width)
- Date format: MMM DD, YYYY (e.g., Oct 15, 2025)
- Author should match one of your team members
- The grid will automatically adjust to accommodate new posts
- Cards will automatically animate on scroll

The JavaScript will automatically handle all interactions!
*/
