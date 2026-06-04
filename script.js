// --- Elegant Typewriter Effect ---
const typeWriterElement = document.getElementById('typewriter');
const texts = ["Mobile Application Developer.", "Coder & Designer.", "React Native Specialist."];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000); 
});

const body = document.body;

// --- Scroll Animation (Intersection Observer) ---
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// --- Mobile Hamburger Menu Logic ---
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-item'); 

function openMenu() {
    navLinks.classList.add('active');
    body.classList.add('menu-open');
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
}

function closeMenu() {
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
}

menuBtn.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

navItems.forEach(item => {
    item.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        themeIcon.textContent = '🌙'; 
        localStorage.setItem('portfolio-theme', 'light'); 
    } else {
        themeIcon.textContent = '☀️'; 
        localStorage.setItem('portfolio-theme', 'dark'); 
    }
});

// --- Contact Form Success Message Handler ---
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        // Show success message
        formSuccess.classList.add('show-msg');
        
        // Clear input fields
        this.reset(); 
        
        // Hide message after 4 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show-msg');
        }, 4000);
    });
}

// Project download links are provided in the HTML; no automatic button creation.

// Run on DOMContentLoaded so elements exist
document.addEventListener('DOMContentLoaded', () => {
    attachDownloadHandlers();
});

// Attach handlers to `.download-link` anchors.
// Only anchors with a real `href` (not '#' or empty) will perform their default download/navigation.
function attachDownloadHandlers() {
    const links = document.querySelectorAll('#projects .download-link');
    links.forEach(link => {
        if (link.dataset.attached === 'true') return; // avoid duplicate

        const href = link.getAttribute('href');
        if (!href || href === '#' || href.trim() === '') {
            // disable placeholder links to avoid unexpected behavior
            link.addEventListener('click', (e) => e.preventDefault());
            link.classList.add('disabled-link');
            link.setAttribute('aria-disabled', 'true');
        } else {
            // For real links, ensure they open in a new tab so downloads work consistently
            if (!link.hasAttribute('target')) link.setAttribute('target', '_blank');
        }

        link.dataset.attached = 'true';
    });
}