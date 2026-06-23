/* 
   Professional Developer Portfolio - Garapati Meghana
   Interactive Logics & Theme Controller
*/

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypewriter();
    init3DTilt();
    initScrollReveal();
});

/* ==========================================
   1. DYNAMIC DARK & LIGHT THEME CONTROLLER
   ========================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, iconElement) {
    if (theme === 'dark') {
        iconElement.className = 'fa-solid fa-sun';
    } else {
        iconElement.className = 'fa-solid fa-moon';
    }
}

/* ==========================================
   2. VANILLA TYPEWRITER ANIMATION
   ========================================== */
function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;

    const words = JSON.parse(typewriterEl.getAttribute('data-words') || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before starting next word
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

/* ==========================================
   3. 3D HOVER TILT & DEPTH EFFECTS
   ========================================== */
function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element
            const y = e.clientY - rect.top;  // y position within element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotations based on cursor offset from center
            // Limit max rotation to 8 degrees for a subtle, premium look
            const rotateX = -((y - centerY) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

/* ==========================================
   4. INTERSECTION OBSERVER FOR SCROLL REVEAL
   ========================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, observerOptions);
    
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}
