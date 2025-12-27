
// Wait for DOM content to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ===== Smooth Scrolling for Navigation Links =====
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Get the target section id
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to target section
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Header Scroll Effect =====
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== Theme Toggle (Dark/Light Mode) =====
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use preference from OS
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        htmlElement.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        htmlElement.classList.toggle('dark-mode');
        
        const icon = themeToggle.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // ===== Project Filtering =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    // Add animation class
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 100);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('show');
                }
            });
        });
    });

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(
                    contactForm.action,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );

                if (response.ok) {
                    showNotification('Your message has been sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Failed to send message. Try again.', 'error');
                }

            } catch (error) {
            showNotification('Network error. Please try later.', 'error');
            }
        });
    }

    
    // Newsletter signup form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('.newsletter-input').value;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please fill in all the fields.', 'error');
                return;
            }
            
            // Display success message
            showNotification('Successfully signed up for the newsletter!', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // ===== Scroll to Top Button =====
    // Create the button element
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Resume Download Function =====
    const resumeBtn = document.querySelector('a[href="#"].btn');
    
    if (resumeBtn && resumeBtn.textContent.includes('Download Resume')) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create alert for demo purposes (in real site, this would download a file)
            showNotification('Resume download is starting...', 'info');
            
            // In a real implementation, you would trigger a file download
            // Example: window.location.href = 'path-to-resume.pdf';
        });
    }

    // ===== Notification System =====
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <p>${message}</p>
            </div>
            <span class="notification-close">&times;</span>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Add active class after a small delay (for animation)
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300); // Wait for fade out animation
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Helper function for notification icons
    function getNotificationIcon(type) {
        switch(type) {
            case 'success':
                return 'fa-check-circle';
            case 'error':
                return 'fa-exclamation-circle';
            case 'warning':
                return 'fa-exclamation-triangle';
            case 'info':
            default:
                return 'fa-info-circle';
        }
    }

    // ===== Add CSS for dynamic elements =====
    addDynamicStyles();
    
    function addDynamicStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Notification Styles */
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                max-width: 350px;
                padding: 15px;
                border-radius: 5px;
                background-color: #fff;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 9999;
                transform: translateY(100%);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .notification.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
            }
            
            .notification-content i {
                margin-right: 10px;
                font-size: 20px;
            }
            
            .notification.success {
                border-left: 4px solid #28a745;
            }
            
            .notification.success i {
                color: #28a745;
            }
            
            .notification.error {
                border-left: 4px solid #dc3545;
            }
            
            .notification.error i {
                color: #dc3545;
            }
            
            .notification.warning {
                border-left: 4px solid #ffc107;
            }
            
            .notification.warning i {
                color: #ffc107;
            }
            
            .notification.info {
                border-left: 4px solid #17a2b8;
            }
            
            .notification.info i {
                color: #17a2b8;
            }
            
            .notification-close {
                cursor: pointer;
                font-size: 20px;
                margin-left: 10px;
                opacity: 0.5;
                transition: opacity 0.2s;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            /* Scroll To Top Button */
            #scroll-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--primary-color, #4361ee);
                color: #fff;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 99;
            }
            
            #scroll-top-btn.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            #scroll-top-btn:hover {
                background-color: var(--primary-dark, #3a56d4);
            }
            
            /* Enhanced Dark Mode Styles */
            .dark-mode {
    /* Base Colors - Increased contrast between elements */
    --bg-color: #121212;
    --text-color: #f0f0f0;
    --muted-text: #a0a0a0;
    --border-color: #444444;
    --card-bg: #1e1e1e;
    --secondary-bg: #2a2a2a;
    --shadow-color: rgba(0, 0, 0, 0.5);
    --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    
    /* Accent Colors - More vibrant for better visibility */
    --primary-color: #5d7aee;  /* Slightly lighter */
    --primary-hover: #7891f1;  /* Even lighter for hover states */
    --success-color: #2ebd4e;
    --error-color: #e54c5c;
    --warning-color: #ffd54f;
    --info-color: #29b4cc;
    
    /* Element-specific colors */
    --input-bg: #2a2a2a;
    --input-border: #444444;
    --button-bg: #1e1e1e;
    --button-border: #444444;
}

/* Apply dark mode base styles */
.dark-mode body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Container elements in dark mode */
.dark-mode header, 
.dark-mode main,
.dark-mode footer,
.dark-mode section,
.dark-mode nav {
    background-color: var(--bg-color);
    color: var(--text-color);
}

/* Card elements in dark mode */
.dark-mode .service-card, 
.dark-mode .project-card,
.dark-mode .skill-item,
.dark-mode .contact-form,
.dark-mode .contact-info,
.dark-mode .card,
.dark-mode .blog-post,
.dark-mode .testimonial {
    background-color: var(--card-bg);
    border-color: var(--border-color);
    box-shadow: var(--card-shadow);
}

/* Form controls in dark mode */
.dark-mode .form-control,
.dark-mode input,
.dark-mode textarea,
.dark-mode select {
    background-color: var(--input-bg);
    border-color: var(--input-border);
    color: var(--text-color);
}

.dark-mode input::placeholder,
.dark-mode textarea::placeholder {
    color: var(--muted-text);
}

/* Buttons in dark mode */
.dark-mode .btn,
.dark-mode button:not(#scroll-top-btn) {
    background-color: var(--button-bg);
    border-color: var(--button-border);
    color: var(--text-color);
}

.dark-mode .btn-primary,
.dark-mode .button-primary {
    background-color: var(--primary-color);
    color: white;
}

.dark-mode .btn-primary:hover,
.dark-mode .button-primary:hover {
    background-color: var(--primary-hover);
}

/* Text elements in dark mode */
.dark-mode h1, 
.dark-mode h2, 
.dark-mode h3, 
.dark-mode h4, 
.dark-mode h5, 
.dark-mode h6 {
    color: var(--text-color);
}

.dark-mode .text-muted,
.dark-mode .small {
    color: var(--muted-text);
}

.dark-mode .section-title,
.dark-mode .hero-title {
    color: var(--text-color);
}

.dark-mode .section-subtitle,
.dark-mode .hero-subtitle {
    color: var(--primary-color);
}

/* Links in dark mode */
.dark-mode a {
    color: var(--primary-color);
}

.dark-mode a:hover {
    color: var(--primary-hover);
}

/* Notification styling in dark mode */
.dark-mode .notification {
    background-color: var(--card-bg);
    color: var(--text-color);
    box-shadow: var(--card-shadow);
    border-left-width: 4px;
}

.dark-mode .notification-close {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text-color);
}

.dark-mode .notification-close:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

/* Type-specific notification styling */
.dark-mode .notification.success {
    background-color: rgba(46, 189, 78, 0.15);
    border-left-color: var(--success-color);
}

.dark-mode .notification.success .notification-icon {
    background-color: rgba(46, 189, 78, 0.2);
    color: var(--success-color);
}

.dark-mode .notification.error {
    background-color: rgba(229, 76, 92, 0.15);
    border-left-color: var(--error-color);
}

.dark-mode .notification.error .notification-icon {
    background-color: rgba(229, 76, 92, 0.2);
    color: var(--error-color);
}

.dark-mode .notification.warning {
    background-color: rgba(255, 213, 79, 0.15);
    border-left-color: var(--warning-color);
}

.dark-mode .notification.warning .notification-icon {
    background-color: rgba(255, 213, 79, 0.2);
    color: var(--warning-color);
}

.dark-mode .notification.info {
    background-color: rgba(41, 180, 204, 0.15);
    border-left-color: var(--info-color);
}

.dark-mode .notification.info .notification-icon {
    background-color: rgba(41, 180, 204, 0.2);
    color: var(--info-color);
}

/* Scroll to top button in dark mode */
.dark-mode #scroll-top-btn {
    background-color: var(--primary-color);
    box-shadow: 0 4px 12px rgba(93, 122, 238, 0.4);
}

.dark-mode #scroll-top-btn:hover {
    background-color: var(--primary-hover);
}

/* Navigation in dark mode */
.dark-mode nav ul li a {
    color: var(--text-color);
}

.dark-mode nav ul li a:hover {
    color: var(--primary-color);
}

.dark-mode .navbar-toggler {
    border-color: var(--border-color);
    color: var(--text-color);
}

/* Table styling in dark mode */
.dark-mode table {
    color: var(--text-color);
    border-color: var(--border-color);
}

.dark-mode th {
    background-color: var(--secondary-bg);
}

.dark-mode td {
    border-color: var(--border-color);
}

.dark-mode tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.03);
}

/* Code blocks and pre in dark mode */
.dark-mode code, 
.dark-mode pre {
    background-color: #2d2d2d;
    color: #e6e6e6;
    border-color: #444;
}

/* Modal styling in dark mode */
.dark-mode .modal-content {
    background-color: var(--card-bg);
    border-color: var(--border-color);
}

.dark-mode .modal-header,
.dark-mode .modal-footer {
    border-color: var(--border-color);
}

/* Dark mode toggle switch enhancement */
.dark-mode .dark-mode-toggle {
    border-color: var(--border-color);
}

/* Applying dark mode transition effects */
.dark-mode *,
.dark-mode *::before,
.dark-mode *::after {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}


            /* Animation for project cards */
            .project-card {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.4s ease, transform 0.4s ease;
            }
            
            .project-card.show {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styleElement);
    }

    // ===== Animations on Scroll =====
    // Apply animations to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .skill-item, .service-card, .project-card, .about-img, .about-text, .hero-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // ===== Initialize Projects Filter =====
    // Trigger click on "All" filter button to initialize projects
    const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if(allFilterBtn) {
        allFilterBtn.click();
    }

    // ===== Stats Counter Animation =====
    // Animate the stats counters in hero section
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            start += increment;
            if(start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };
        
        updateCount();
    }
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize counters when they come into view
    let countersAnimated = false;
    function initCounters() {
        const stats = document.querySelector('.hero-stats');
        
        if(stats && !countersAnimated && isInViewport(stats)) {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                stat.textContent = '0';
                animateCounter(stat, target, 1500);
            });
            
            countersAnimated = true;
        }
    }
    
    // Check counters on scroll and on page load
    window.addEventListener('scroll', initCounters);
    window.addEventListener('load', initCounters);
});