document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-nav .dot');
    let currentSlide = 0;
    let isAnimating = false;

    // Preload images
    function preloadImages() {
        slides.forEach(slide => {
            const bgImg = slide.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)[1];
            const img = new Image();
            img.src = bgImg;
        });
    }

    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update current slide index
        currentSlide = index;

        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Reset animating flag after transition completes
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Preload images before starting slideshow
    preloadImages();

    // Show first slide immediately
    slides[0].classList.add('active');
    dots[0].classList.add('active');

    // Start slideshow after a short delay to ensure images are loaded
    setTimeout(() => {
        setInterval(nextSlide, 4000);
    }, 1000);

    // Handle dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentSlide === index || isAnimating) return;
            showSlide(index);
        });
    });

    // Language Selection
    const languageBtn = document.querySelector('.language-btn');
    const languageOptions = document.querySelector('.language-options');
    const currentLang = document.querySelector('.current-lang');
    const languageLinks = document.querySelectorAll('.language-options a');

    // Toggle language dropdown
    languageBtn.addEventListener('click', function() {
        languageOptions.classList.toggle('show');
    });

    // Handle language selection
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            currentLang.textContent = lang.toUpperCase();
            
            // Remove active class from all links
            languageLinks.forEach(l => l.classList.remove('active'));
            // Add active class to selected language
            this.classList.add('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-dropdown')) {
            languageOptions.classList.remove('show');
        }
    });

    // Scroll Animation
    const animatedElements = document.querySelectorAll('.animate-fade');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
    
    // Stats Counter Animation
    const stats = document.querySelectorAll('.number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        function updateCount() {
            if (count < target) {
                count += increment;
                stat.textContent = Math.round(count) + (target > 1000 ? 'k+' : '+');
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + (target > 1000 ? 'k+' : '+');
            }
        }
        
        updateCount();
    });
});