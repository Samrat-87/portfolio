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

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if(navLinks.classList.contains('active')){
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
});

// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

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