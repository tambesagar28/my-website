// ==================== MOBILE MENU TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// ==================== SCROLL TO SECTION ====================
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== ANIMATED STATS ====================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                setTimeout(updateCount, 30);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate stats when they come into view
            if (entry.target.classList.contains('hero-stats')) {
                animateStats();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ==================== SCROLL ANIMATIONS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Observe all cards and sections for fade-in animation
    const cards = document.querySelectorAll('.card, .glass-card, .lab-card, .project-card, .career-card, .tech-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe sections
    const sections = document.querySelectorAll('.why-section, .tech-section, .labs-section, .projects-section, .career-section, .trainer-section, .faq-section, .contact-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// ==================== FAQ TOGGLE ====================
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ==================== CURRICULUM PHASE TOGGLE ====================
function togglePhase(button) {
    const phase = button.closest('.curriculum-phase');
    const isActive = phase.classList.contains('active');
    
    // Toggle current phase
    if (isActive) {
        phase.classList.remove('active');
    } else {
        phase.classList.add('active');
    }
}

// ==================== SMOOTH SCROLL FOR NAVIGATION ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 20, 25, 0.98)';
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 20, 25, 0.95)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    }
});

// ==================== PARALLAX EFFECT ====================
document.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Apply parallax to hero section
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ==================== INITIALIZE CURRICULUM PHASES ====================
document.addEventListener('DOMContentLoaded', function() {
    const phases = document.querySelectorAll('.curriculum-phase');
    
    // Open first phase by default
    if (phases.length > 0) {
        phases[0].classList.add('active');
    }
    
    // Add click handlers
    phases.forEach(phase => {
        const header = phase.querySelector('.phase-header');
        if (header) {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                // Close all others
                phases.forEach(p => p.classList.remove('active'));
                // Open this one
                phase.classList.add('active');
            });
        }
    });
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', function() {
    document.body.style.animation = 'fadeIn 0.5s ease-in';
});

// Add fade-in animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.btn-cta)');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==================== FORM SUBMISSION (Optional) ====================
// This is a placeholder for form handling if forms are added later
document.addEventListener('DOMContentLoaded', function() {
    // Handle any future forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form handling logic here
            console.log('Form submitted');
        });
    });
});

// ==================== UTILITY: DEBOUNCE ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== PERFORMANCE: LAZY LOADING ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== ACCESSIBILITY: KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', function(event) {
    // Skip navigation with Tab key
    if (event.key === 'Tab') {
        return;
    }
    
    // Escape key to close mobile menu
    if (event.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// ==================== SCROLL TO TOP BUTTON (Optional) ====================
let scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.id = 'scrollToTopBtn';
            scrollToTopBtn.innerHTML = '↑';
            scrollToTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #ff9900, #ff8c00);
                color: white;
                border: none;
                cursor: pointer;
                font-size: 1.5rem;
                z-index: 999;
                opacity: 0;
                transition: opacity 0.3s ease;
                box-shadow: 0 8px 24px rgba(255, 153, 0, 0.4);
            `;
            document.body.appendChild(scrollToTopBtn);
            
            scrollToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
});

// ==================== THEME DETECTION ====================
function detectTheme() {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }
}

detectTheme();

// Listen for theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);
}

// ==================== PERFORMANCE METRICS ====================
if ('PerformanceObserver' in window) {
    try {
        // Measure page load performance
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`[Performance] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
            }
        });
        
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        // Performance API not available
    }
}

// Log page load time
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('[Performance] Total page load time: ' + pageLoadTime + 'ms');
    }
});
