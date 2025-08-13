window.HELP_IMPROVE_VIDEOJS = false;

// Custom Carousel Implementation
function CustomCarousel(element) {
    this.carousel = element;
    this.slides = element.querySelectorAll('.carousel-slide');
    this.indicators = element.querySelectorAll('.carousel-indicator');
    this.currentSlide = 0;
    this.autoplayInterval = null;
    
    this.init();
}

CustomCarousel.prototype = {
    init: function() {
        // Add click listeners to indicators
        var self = this;
        this.indicators.forEach(function(indicator, index) {
            indicator.addEventListener('click', function() {
                self.goToSlide(index);
            });
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', function() {
            self.stopAutoplay();
        });
        
        this.carousel.addEventListener('mouseleave', function() {
            self.startAutoplay();
        });
    },
    
    goToSlide: function(slideIndex) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Set new current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    },
    
    nextSlide: function() {
        var nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    },
    
    startAutoplay: function() {
        var self = this;
        this.autoplayInterval = setInterval(function() {
            self.nextSlide();
        }, 5000); // 5 seconds
    },
    
    stopAutoplay: function() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
};

// Initialize all custom carousels
function initializeCustomCarousels() {
    try {
        var carouselElements = document.querySelectorAll('.custom-carousel');
        
        if (carouselElements.length === 0) {
            console.warn('No custom carousel elements found');
            return;
        }
        
        carouselElements.forEach(function(element) {
            new CustomCarousel(element);
        });
        
        console.log('Successfully initialized ' + carouselElements.length + ' custom carousel(s)');
        
    } catch (error) {
        console.error('Error initializing custom carousels:', error);
    }
}

// Initialize sliders function (keeping original bulma sliders)
function initializeSliders() {
    try {
        if (typeof bulmaSlider !== 'undefined') {
            bulmaSlider.attach();
            console.log('Sliders initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing sliders:', error);
    }
}

// Main initialization
$(document).ready(function() {
    console.log('DOM ready, initializing custom carousels...');
    initializeCustomCarousels();
    initializeSliders();
});

// Fallback initialization
$(window).on('load', function() {
    console.log('Window loaded, ensuring carousels are initialized...');
    setTimeout(initializeCustomCarousels, 100);
});

// Expose initialization function globally for manual triggering
window.reinitializeCarousels = initializeCustomCarousels;
