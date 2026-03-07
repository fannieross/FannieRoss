/* ===================================
   FANNIE ROSS - BOOK MARKETING EXPERT
   Complete JavaScript File
   =================================== */

'use strict';

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initPreloader();
    initNavigation();
    initSmoothScroll();
    initHeaderScroll();
    initCounterAnimation();
    initFAQAccordion();
    initBackToTop();
    initFormHandling();
    initAOS();
    initTypingEffect();
    initParallaxEffects();
    initImageLazyLoad();
    
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Minimum display time for preloader (for branding effect)
    const minDisplayTime = 2500;
    const startTime = Date.now();
    
    window.addEventListener('load', function() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
        
        setTimeout(function() {
            preloader.classList.add('loaded');
            
            // Remove preloader from DOM after animation
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 800);
            
            // Trigger entrance animations
            triggerEntranceAnimations();
            
        }, remainingTime);
    });
    
    // Fallback: Hide preloader after 5 seconds regardless
    setTimeout(function() {
        if (!preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 5000);
}

// ===== ENTRANCE ANIMATIONS =====
function triggerEntranceAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    animatedElements.forEach(function(element, index) {
        setTimeout(function() {
            element.classList.add('aos-animate');
        }, index * 100);
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('nav-open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
            body.style.overflow = '';
            
            // Update active link
            navLinks.forEach(function(navLink) {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('nav-open');
                body.style.overflow = '';
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
            body.style.overflow = '';
        }
    });
    
    // Update active link on scroll
    updateActiveNavOnScroll();
}

// ===== UPDATE ACTIVE NAV ON SCROLL =====
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                event.preventDefault();
                
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        // Uncomment below for hide on scroll down, show on scroll up
        /*
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
        */
    });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();
    
    // Determine if it's a decimal number
    const isDecimal = target % 1 !== 0;
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (ease out)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const currentValue = start + (target - start) * easeOutQuart;
        
        if (isDecimal) {
            element.textContent = currentValue.toFixed(1);
        } else if (target >= 1000) {
            element.textContent = Math.floor(currentValue).toLocaleString();
        } else {
            element.textContent = Math.floor(currentValue);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is exact
            if (isDecimal) {
                element.textContent = target.toFixed(1);
            } else if (target >= 1000) {
                element.textContent = target.toLocaleString();
            } else {
                element.textContent = target;
            }
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== FAQ ACCORDION =====
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items (accordion behavior)
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Scroll into view if opening
            if (!isActive) {
                setTimeout(function() {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const itemTop = item.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: itemTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                question.click();
            }
        });
        
        // Add tabindex for accessibility
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded on toggle
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isExpanded = item.classList.contains('active');
                    question.setAttribute('aria-expanded', isExpanded.toString());
                }
            });
        });
        
        observer.observe(item, { attributes: true });
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    const scrollThreshold = 500;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > scrollThreshold) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Form validation and submission
    contactForm.addEventListener('submit', function(event) {
        // Basic validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                showFieldError(field, 'This field is required');
            } else {
                clearFieldError(field);
            }
            
            // Email validation
            if (field.type === 'email' && field.value.trim()) {
                if (!isValidEmail(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid email address');
                }
            }
        });
        
        if (!isValid) {
            event.preventDefault();
            
            // Scroll to first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const errorTop = firstError.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: errorTop,
                    behavior: 'smooth'
                });
            }
            
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Form will submit naturally to Formspree
        // The success/error handling is managed by Formspree redirect
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.parentElement.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Focus effects
    inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    // Clear previous error
    clearFieldError(field);
    
    // Required validation
    if (field.required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        if (!isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // URL validation
    if (field.type === 'url' && value) {
        if (!isValidURL(value)) {
            showFieldError(field, 'Please enter a valid URL');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #e53e3e; font-size: 0.85rem; margin-top: 5px; display: block;';
    
    formGroup.appendChild(errorElement);
    
    // Add error styles to input
    field.style.borderColor = '#e53e3e';
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    
    // Reset input styles
    field.style.borderColor = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// ===== INITIALIZE AOS (Animate On Scroll) =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            mirror: false,
            anchorPlacement: 'top-bottom'
        });
        
        // Refresh AOS on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                AOS.refresh();
            }, 250);
        });
    }
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(function(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--secondary-color)';
        
        let index = 0;
        const typingSpeed = 100;
        
        function typeCharacter() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(function() {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeCharacter, 1500);
    });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-book');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(function(element, index) {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            element.style.transform = 'translateY(' + yPos + 'px) rotate(' + (scrolled * 0.02) + 'deg)';
        });
    });
    
    // Mouse parallax for hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(event) {
            const mouseX = event.clientX / window.innerWidth - 0.5;
            const mouseY = event.clientY / window.innerHeight - 0.5;
            
            parallaxElements.forEach(function(element, index) {
                const depth = 20 + (index * 10);
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                
                element.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
            });
        });
    }
}

// ===== IMAGE LAZY LOADING =====
function initImageLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    images.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) return;
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.15
    });
    
    revealElements.forEach(function(element) {
        revealObserver.observe(element);
    });
}

// ===== TESTIMONIAL SLIDER (Optional Enhancement) =====
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dots = slider.querySelectorAll('.slider-dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Wrap around
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;
        
        currentSlide = index;
        
        slides.forEach(function(slide, i) {
            slide.style.transform = 'translateX(' + (100 * (i - currentSlide)) + '%)';
            slide.classList.toggle('active', i === currentSlide);
        });
        
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            showSlide(currentSlide + 1);
        });
    }
    
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-play
    let autoplayInterval = setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoplayInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        autoplayInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000);
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (diff > swipeThreshold) {
            showSlide(currentSlide + 1);
        } else if (diff < -swipeThreshold) {
            showSlide(currentSlide - 1);
        }
    }
    
    // Initialize
    showSlide(0);
}

// ===== SMOOTH SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, #c9a227 0%, #d4b13d 100%);
        z-index: 9999;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== CURSOR EFFECTS (Optional) =====
function initCustomCursor() {
    // Check if it's a touch device
    if ('ontouchstart' in window) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #c9a227;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s, background 0.2s;
        z-index: 99999;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: #c9a227;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 99999;
    `;
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', function(event) {
        cursor.style.left = event.clientX + 'px';
        cursor.style.top = event.clientY + 'px';
        cursorDot.style.left = event.clientX + 'px';
        cursorDot.style.top = event.clientY + 'px';
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .faq-question');
    
    hoverElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'rgba(201, 162, 39, 0.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'transparent';
        });
    });
}

// ===== MAGNETIC BUTTON EFFECT =====
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-glow');
    
    buttons.forEach(function(button) {
        button.addEventListener('mousemove', function(event) {
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            
            button.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== RIPPLE EFFECT FOR BUTTONS =====
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 200px;
                height: 200px;
                margin-left: -100px;
                margin-top: -100px;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== TEXT SCRAMBLE EFFECT =====
class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(function(resolve) {
            this.resolve = resolve;
        }.bind(this));
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from: from, to: to, start: start, end: end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let item = this.queue[i];
            let char = item.from;
            
            if (this.frame >= item.end) {
                complete++;
                char = item.to;
            } else if (this.frame >= item.start) {
                if (!item.char || Math.random() < 0.28) {
                    item.char = this.randomChar();
                }
                char = item.char;
            }
            
            output += char;
        }
        
        this.element.innerText = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ===== TILT EFFECT FOR CARDS =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .why-card, .author-type-card, .stat-card');
    
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(event) {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===== INITIALIZE OPTIONAL ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment below to enable optional features
    
    // initScrollProgress();
    // initCustomCursor();
    // initMagneticButtons();
    initRippleEffect();
    initTiltEffect();
    initScrollReveal();
});

// ===== WINDOW LOAD EVENTS =====
window.addEventListener('load', function() {
    // Refresh AOS after all content is loaded
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ===== WINDOW RESIZE EVENTS =====
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Refresh AOS
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 992) {
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                document.body.style.overflow = '';
            }
        }
    }, 250);
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c Fannie Ross | Book Marketing Expert ', 'background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: #c9a227; font-size: 16px; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
console.log('%c Website developed with passion for authors everywhere! ', 'color: #4a5568; font-size: 12px;');
console.log('%c Contact: fannieross535@gmail.com ', 'color: #1a365d; font-size: 12px;');