// ===== GALLERY FUNCTIONALITY =====

class ArtistGallery {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 10;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000; // 5 seconds
        
        this.init();
    }

    init() {
        this.setupCarousel();
        this.setupThumbnails();
        this.setupModal();
        this.startAutoSlide();
        this.setupEventListeners();
    }

    setupCarousel() {
        const carouselTrack = document.getElementById('carouselTrack');
        const dotsContainer = document.getElementById('carouselDots');
        
        // Create dots for navigation
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        // Setup navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
    }

    setupThumbnails() {
        const thumbnailItems = document.querySelectorAll('.thumbnail-item');
        
        thumbnailItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }

    setupModal() {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalClose = document.getElementById('modalClose');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        const galleryImages = document.querySelectorAll('.gallery-image');

        // Open modal when clicking on carousel images
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                this.openModal(index);
            });
        });

        // Close modal
        modalClose.addEventListener('click', () => this.closeModal());
        
        // Close modal when clicking outside image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Modal navigation
        modalPrev.addEventListener('click', () => this.modalPreviousImage());
        modalNext.addEventListener('click', () => this.modalNextImage());

        // Keyboard navigation for modal
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                switch (e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.modalPreviousImage();
                        break;
                    case 'ArrowRight':
                        this.modalNextImage();
                        break;
                }
            }
        });
    }

    setupEventListeners() {
        const carouselContainer = document.querySelector('.carousel-container');
        
        // Pause auto-slide on hover
        carouselContainer.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
        this.updateDots();
        this.updateThumbnails();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        this.updateDots();
        this.updateThumbnails();
    }

    previousSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateCarousel();
        this.updateDots();
        this.updateThumbnails();
    }

    updateCarousel() {
        const carouselTrack = document.getElementById('carouselTrack');
        const translateX = -this.currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
    }

    updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    updateThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail-item');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoSlide() {
        this.stopAutoSlide(); // Clear any existing interval
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }

    openModal(imageIndex) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const slides = document.querySelectorAll('.carousel-slide img');
        
        this.currentModalImage = imageIndex;
        modalImage.src = slides[imageIndex].src;
        modalImage.alt = slides[imageIndex].alt;
        modal.style.display = 'block';
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    closeModal() {
        const modal = document.getElementById('imageModal');
        
        // Add fade-out animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    modalNextImage() {
        this.currentModalImage = (this.currentModalImage + 1) % this.totalSlides;
        this.updateModalImage();
    }

    modalPreviousImage() {
        this.currentModalImage = this.currentModalImage === 0 ? this.totalSlides - 1 : this.currentModalImage - 1;
        this.updateModalImage();
    }

    updateModalImage() {
        const modalImage = document.getElementById('modalImage');
        const slides = document.querySelectorAll('.carousel-slide img');
        
        // Add transition effect
        modalImage.style.opacity = '0.3';
        setTimeout(() => {
            modalImage.src = slides[this.currentModalImage].src;
            modalImage.alt = slides[this.currentModalImage].alt;
            modalImage.style.opacity = '1';
        }, 150);
    }
}

// ===== SMOOTH SCROLLING =====
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// ===== PERFORMANCE OPTIMIZATIONS =====
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

// ===== LAZY LOADING FOR IMAGES =====
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery
    const gallery = new ArtistGallery();
    
    // Setup lazy loading
    setupLazyLoading();
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.song-card, .thumbnail-item');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add loading states
    const images = document.querySelectorAll('.gallery-image, .song-image');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW0gbsOjbyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
        });
    });
    
    // Add smooth scroll to gallery section
    const galleryLink = document.querySelector('a[href="#gallery"]');
    if (galleryLink) {
        galleryLink.addEventListener('click', (e) => {
            e.preventDefault();
            const gallerySection = document.querySelector('.gallery-section');
            smoothScrollTo(gallerySection);
        });
    }
    
    console.log('🎵 Studio Bragi - Página do Artista carregada com sucesso!');
});