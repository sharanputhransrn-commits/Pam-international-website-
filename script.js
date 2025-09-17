// Loading screen
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    setTimeout(() => {
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
    }, 1500);
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');
if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(148, 163, 184, 0.2)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(148, 163, 184, 0.1)';
    }
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        // ignore plain "#" anchors
        if (!targetId || targetId === "#") return;
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            e.preventDefault();
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            // Close mobile menu if open
            if (navMenu) navMenu.classList.remove('active');
            if (mobileMenu) {
                const icon = mobileMenu.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-slide-up');
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('section');
sections.forEach(section => observer.observe(section));

// Service card animations
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('animate-slide-up'), index * 100);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => serviceObserver.observe(card));

// Industry card hover effects (progressive transform)
const industryCards = document.querySelectorAll('.industry-card');
industryCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-12px) scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(-8px) scale(1)');
});

// Form submission (simulated)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            const successMessage = document.createElement('div');
            successMessage.innerHTML = `
                <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 1rem; border-radius: 10px; margin: 1rem 0; text-align: center;">
                    <i class="fas fa-check-circle"></i> Thank you! We'll get back to you within 24 hours.
                </div>
            `;
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

            setTimeout(() => {
                contactForm.reset();
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
                submitButton.style.background = 'rgba(255, 255, 255, 0.95)';
                successMessage.remove();
            }, 3000);
        }, 2000);
    });
}

// Dashboard hover transform tweens
const dashboard = document.querySelector('.hero-dashboard');
if (dashboard) {
    dashboard.addEventListener('mouseenter', () => {
        dashboard.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg) scale(1.02)';
    });
    dashboard.addEventListener('mouseleave', () => {
        dashboard.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(10deg) scale(1)';
    });
}

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isTime = target.includes('/');
        const isPlus = target.includes('+');

        if (!isTime) {
            let numTarget = parseFloat(target.replace(/[^\d.]/g, ''));
            let current = 0;
            const increment = numTarget / 50;

            const updateCounter = () => {
                if (current < numTarget) {
                    current += increment;
                    let displayValue = Math.ceil(current);
                    if (isPercentage) counter.textContent = displayValue + '%';
                    else if (isPlus) counter.textContent = displayValue + '+';
                    else counter.textContent = displayValue;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        }
    });
};

// Observe hero to start counters once
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateCounters, 1000);
            heroObserver.unobserve(entry.target);
        }
    });
});
const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPositionY = rate + 'px';
    }
});

// Floating animation for hero dashboard (subtle)
if (dashboard) {
    setInterval(() => {
        dashboard.style.transform += ' translateY(-5px)';
        setTimeout(() => {
            dashboard.style.transform = dashboard.style.transform.replace(' translateY(-5px)', '');
        }, 2000);
    }, 4000);
}

// Process & testimonial reveal animations (staggered)
const processSteps = document.querySelectorAll('.process-step');
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

processSteps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(50px)';
    step.style.transition = 'all 0.6s ease-out';
    processObserver.observe(step);
});

const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

testimonialCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    testimonialObserver.observe(card);
});

// Feature icon hover transform
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) icon.style.transform = 'scale(1.1) rotate(10deg)';
    });
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Reveal animations for section headers
const revealSections = document.querySelectorAll('.section-header');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(section);
});