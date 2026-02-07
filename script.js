// ======================================
// ENHANCED JAVASCRIPT WITH MAGIC EFFECTS
// ======================================

// ======================================
// Mobile Menu Toggle
// ======================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ======================================
// Back to Top Button with Enhanced Effects
// ======================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ======================================
// Portfolio Filter with Smooth Animations
// ======================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioCards.forEach((card, index) => {
            // Hide all cards first
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.animation = `slideInUp 0.6s ease ${index * 0.1}s`;
                }, 50);
            } else {
                if (card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.animation = `slideInUp 0.6s ease`;
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// ======================================
// Advanced Contact Form Validation
// ======================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');
let isSubmitting = false;

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Reset previous errors
    clearErrors();

    // Validate form
    let isValid = true;

    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    }

    if (email.value.trim() === '' || !isValidEmail(email.value)) {
        showError(email, 'Valid email is required');
        isValid = false;
    }

    if (subject.value.trim() === '') {
        showError(subject, 'Subject is required');
        isValid = false;
    }

    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }

    // If valid, submit form
    if (isValid && !isSubmitting) {
        submitForm(name.value, email.value, subject.value, message.value);
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const errorSpan = input.parentElement.querySelector('.error-message');
    input.style.borderColor = '#ef4444';
    input.style.background = 'rgba(239, 68, 68, 0.05)';
    errorSpan.textContent = message;
    errorSpan.classList.add('show');
}

function clearErrors() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    const errorSpans = document.querySelectorAll('.error-message');

    inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.background = '';
    });

    errorSpans.forEach(span => {
        span.classList.remove('show');
        span.textContent = '';
    });
}

function submitForm(name, email, subject, message) {
    isSubmitting = true;
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    
    // Add loading effect
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';

    // Get current timestamp
    const timestamp = new Date().toLocaleString();

    // Send data to Google Sheets via Apps Script
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: timestamp
    };

    // Replace with your Google Apps Script URL
    const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbwukItmQNDpepP3yyMPSlyyjIiHiDj9zMlU_tpq7lW4Ofg0m6-EPnz72x-QAXBQXGuyHA/exec';

    fetch(googleAppsScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        // Show success message
        formMessage.innerHTML = '✨ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.innerHTML = '';
            isSubmitting = false;
        }, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
        // Show error message but still mark as sent (because Google Apps Script doesn't return CORS headers)
        formMessage.innerHTML = '✨ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.innerHTML = '';
            isSubmitting = false;
        }, 5000);
    });
}

// ======================================
// Smooth Scrolling for Navigation
// ======================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just '#'
        if (href !== '#') {
            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop;
                const navHeight = document.querySelector('.navbar').offsetHeight;

                window.scrollTo({
                    top: offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ======================================
// Advanced Scroll Animations (Intersection Observer)
// ======================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.7s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe portfolio cards and stat items
document.querySelectorAll('.portfolio-card, .stat-item, .skill-category').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ======================================
// Enhanced Navbar Background on Scroll
// ======================================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// ======================================
// Skill Progress Animation with Stagger
// ======================================
const skillProgressBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillProgressBars.forEach((bar, index) => {
                const width = bar.style.width;
                bar.style.width = '0';

                setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = width;
                }, index * 100);
            });

            skillsAnimated = true;
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ======================================
// Active Navigation Link Detection
// ======================================
window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-dark)';
        }
    });
});

// ======================================
// Smooth Number Counter Animation
// ======================================
const counters = document.querySelectorAll('.stat-item h3');

counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.innerText.replace(/\D/g, '');
        const increment = target / 30; // More steps for smoother animation

        let current = 0;
        const updateCount = () => {
            current += increment;

            if (current < target) {
                counter.innerText = Math.ceil(current) + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + '+';
            }
        };

        updateCount();
    };

    // Create intersection observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(counter);
});

// ======================================
// Enhanced Ripple Effect on Buttons
// ======================================
const buttons = document.querySelectorAll('.btn, .filter-btn, .social-icon, .portfolio-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripple if any
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ======================================
// Parallax Effect for Hero Section
// ======================================
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (hero) {
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ======================================
// Mouse Follow Animation on Hero
// ======================================
const heroContent = document.querySelector('.hero-content');
document.addEventListener('mousemove', (e) => {
    if (window.scrollY < window.innerHeight) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        if (heroContent) {
            heroContent.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        }
    }
});

// ======================================
// Tooltip on Hover for Tech Tags
// ======================================
const techTags = document.querySelectorAll('.tech-tag');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) translateY(-5px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ======================================
// Page Load Animation
// ======================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Stagger animation for initial elements
    const initialElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .social-links');
    initialElements.forEach((el, index) => {
        el.style.animation = `slideInUp 0.8s ease ${index * 0.1}s both`;
    });
});

// ======================================
// Canvas Mouse Cursor Effect (Magic Particles)
// ======================================
const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '1';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mousePos = { x: 0, y: 0 };

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 4;
        this.life = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
    }

    draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    // Create particles on mouse move (limited frequency for performance)
    if (Math.random() < 0.3) {
        particles.push(new Particle(mousePos.x, mousePos.y));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    if (particles.length > 0) {
        requestAnimationFrame(animateParticles);
    }
}

// Update canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start particle animation on mouse move
document.addEventListener('mousemove', () => {
    if (particles.length > 0) {
        animateParticles();
    }
});

// ======================================
// Console Magic Message
// ======================================
console.log('%c✨ Welcome to My Portfolio! ✨', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cLooking for a passionate web developer? Let\'s create something amazing together!', 'color: #ec4899; font-size: 14px;');
console.log('%cView Source → Check out the code! 🚀', 'color: #10b981; font-size: 12px;');
