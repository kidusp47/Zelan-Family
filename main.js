// Enhanced JavaScript for Zelan Family website with smooth animations

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const heroVideo = document.getElementById('hero-video');
    const prevVideoBtn = document.getElementById('prev-video');
    const nextVideoBtn = document.getElementById('next-video');
    const videoCards = document.querySelectorAll('.video-card');
    
    // Hero Video Array
    const heroVideos = [
        'assets/videos/hero-video-1.mp4',
        'assets/videos/hero-video-2.mp4',
        'assets/videos/hero-video-3.mp4',
        'assets/videos/hero-video-4.mp4',
        'assets/videos/hero-video-5.mp4'
    ];
    
    let currentVideoIndex = 0;
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Navigation Functions
    function toggleNav() {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        // Add body scroll lock when menu is open
        if (navLinks.classList.contains('nav-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Enhanced scroll handling with throttling
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                // Navbar background change
                if (scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Parallax effect for hero video
                if (heroVideo && scrollY <= window.innerHeight) {
                    const yValue = scrollY * 0.5;
                    heroVideo.style.transform = `translateY(${yValue}px)`;
                }
                
                // Update active navigation item based on scroll position
                updateActiveNavItem();
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Update active navigation item
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.pill-nav li');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Smooth scroll with easing
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        
        const targetPosition = targetSection.offsetTop - navbar.offsetHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
        
        // Close mobile nav if open
        if (navLinks && navLinks.classList.contains('nav-active')) {
            toggleNav();
        }
    }
    
    // Enhanced video switching with smooth transitions
    function switchVideo(direction) {
        if (!heroVideo) return;
        
        const videoContainer = heroVideo.parentElement;
        videoContainer.style.transition = 'opacity 0.5s ease';
        videoContainer.style.opacity = '0.7';
        
        if (direction === 'next') {
            currentVideoIndex = (currentVideoIndex + 1) % heroVideos.length;
        } else {
            currentVideoIndex = (currentVideoIndex - 1 + heroVideos.length) % heroVideos.length;
        }
        
        setTimeout(() => {
            heroVideo.src = heroVideos[currentVideoIndex];
            heroVideo.load();
            heroVideo.play().catch(e => console.log('Video play failed:', e));
            videoContainer.style.opacity = '1';
        }, 250);
    }
    
    // Enhanced video card interactions
    function handleVideoCardHover() {
        const video = this.querySelector('video');
        if (video) {
            video.play().catch(e => console.log('Video play failed:', e));
            this.style.transform = 'scale(1.05) translateY(-10px)';
        }
    }
    
    function handleVideoCardLeave() {
        const video = this.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
            this.style.transform = '';
        }
    }
    
    // Form submission with animation
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Animate button
        submitBtn.textContent = 'Sending...';
        submitBtn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#4CAF50';
            submitBtn.style.transform = 'scale(1)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                e.target.reset();
            }, 2000);
        }, 1000);
    }
    
    // Setup scroll animations
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(`
            .section-header,
            .hero-content,
            .about-text,
            .video-card,
            .strategy-title,
            .strategy-description,
            .portfolio-heading,
            .portfolio-filter-btn,
            .portfolio-item,
            .testimonial-item,
            .contact-info,
            .contact-form,
            .service-card,
            .accordion-item,
            .hero-title,
            .hero-subtitle,
            .services-title,
            .services-subtitle,
            .image-item,
            .left-content h1,
            .left-content p,
            .contact-btn
        `);
        
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    }
    
    // Enhanced accordion functionality
    function setupAccordions() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (header && content) {
                header.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    // Close all items with smooth animation
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherContent = otherItem.querySelector('.accordion-content');
                            if (otherContent) {
                                otherContent.style.maxHeight = '0';
                                otherContent.style.opacity = '0';
                            }
                        }
                    });
                    
                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                        content.style.display = 'block';
                        content.style.maxHeight = content.scrollHeight + 'px';
                        content.style.opacity = '1';
                    } else {
                        item.classList.remove('active');
                        content.style.maxHeight = '0';
                        content.style.opacity = '0';
                        setTimeout(() => {
                            content.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    }
    
    // Details button functionality
    function setupDetailsButtons() {
        const detailsBtns = document.querySelectorAll('.details-btn');
        
        detailsBtns.forEach(btn => {
            const accordion = btn.parentElement.querySelector('.accordion');
            
            if (accordion) {
                // Initially hide accordion
                accordion.style.display = 'none';
                
                btn.addEventListener('click', function() {
                    this.classList.toggle('active');
                    
                    if (this.classList.contains('active')) {
                        accordion.style.display = 'block';
                        accordion.style.opacity = '0';
                        accordion.style.transform = 'translateY(-10px)';
                        
                        setTimeout(() => {
                            accordion.style.opacity = '1';
                            accordion.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        accordion.style.opacity = '0';
                        accordion.style.transform = 'translateY(-10px)';
                        
                        setTimeout(() => {
                            accordion.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    }
    
    // Mobile navigation functionality
    function setupMobileNav() {
        const navItems = document.querySelectorAll('.pill-nav li');
        
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Portfolio filter functionality
    function setupPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items with animation
                portfolioItems.forEach((item, index) => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Initialize with all items visible
        if (filterButtons.length > 0) {
            filterButtons[0].click();
        }
    }
    
    // Enhanced hover effects
    function setupHoverEffects() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.portfolio-card, .video-card, .service-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Add hover effects to buttons
        const buttons = document.querySelectorAll('button, .cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Preload images for better performance
    function preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
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
    
    // Initialize everything
    function init() {
        // Setup event listeners
        if (burger) burger.addEventListener('click', toggleNav);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        if (prevVideoBtn) prevVideoBtn.addEventListener('click', () => switchVideo('prev'));
        if (nextVideoBtn) nextVideoBtn.addEventListener('click', () => switchVideo('next'));
        
        // Smooth scroll for all navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
        
        // Video card hover effects
        videoCards.forEach(card => {
            card.addEventListener('mouseenter', handleVideoCardHover);
            card.addEventListener('mouseleave', handleVideoCardLeave);
        });
        
        // Form submission
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Setup all functionality
        setupScrollAnimations();
        setupAccordions();
        setupDetailsButtons();
        setupMobileNav();
        setupPortfolioFilter();
        setupHoverEffects();
        preloadImages();
        
        // Initial calls
        handleScroll();
        updateActiveNavItem();
        
        // Add loading animation
        document.body.classList.add('loaded');
    }
    
    // Initialize when DOM is ready
    init();
    
    // Add smooth page transitions
    window.addEventListener('beforeunload', function() {
        document.body.style.opacity = '0';
    });
    
    // Performance optimization: Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate positions after resize
            updateActiveNavItem();
        }, 250);
    });
});

// Additional utility functions for enhanced animations
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .portfolio-filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
});

// CSS for ripple effect (add to styles)
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add ripple CSS to document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);


  // When the page is loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Select all video cards
    const videoCards = document.querySelectorAll(".portfolio-card");

    videoCards.forEach(card => {
      const video = card.querySelector(".portfolio-video");
      const playBtn = card.querySelector(".play-btn i");
      const muteBtn = card.querySelector(".mute-btn i");

      // Skip if there's no video in the card
      if (!video) return;

      // Play/Pause toggle
      card.querySelector(".play-btn").addEventListener("click", () => {
        if (video.paused) {
          video.play();
          playBtn.classList.remove("fa-play");
          playBtn.classList.add("fa-pause");
        } else {
          video.pause();
          playBtn.classList.remove("fa-pause");
          playBtn.classList.add("fa-play");
        }
      });

      // Mute/Unmute Button
      card.querySelector('.mute-btn').addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
          muteBtn.classList.remove('fa-volume-up');
          muteBtn.classList.add('fa-volume-mute');
        } else {
          muteBtn.classList.remove('fa-volume-mute');
          muteBtn.classList.add("fa-volume-up");
        }
      });
    });
  });

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const heroVideo = document.getElementById('hero-video');

    const heroVideos = [
        'assets/videos/hero-video-1.mp4',
        'assets/videos/hero-video-2.mp4',
        'assets/videos/hero-video-3.mp4',
        'assets/videos/hero-video-4.mp4',
        'assets/videos/hero-video-5.mp4'
    ];

    let currentVideoIndex = 0;

    // Auto-switch hero video every 10 seconds with fade effect
    setInterval(() => {
        heroVideo.classList.add('fade-out');

        setTimeout(() => {
            currentVideoIndex = (currentVideoIndex + 1) % heroVideos.length;

            const newSource = document.createElement('source');
            newSource.src = heroVideos[currentVideoIndex];
            newSource.type = 'video/mp4';

            heroVideo.innerHTML = '';
            heroVideo.appendChild(newSource);
            heroVideo.load();
            heroVideo.play();
            
            updateDots(currentVideoIndex);
            heroVideo.classList.remove('fade-out');
        }, 1000); // Wait for fade-out to finish
    }, 8000); // Every 10 seconds

    // Navigation burger menu toggle
    function toggleNav() {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        document.body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : '';
    }
    burger?.addEventListener('click', toggleNav);

    const dotsContainer = document.getElementById('video-dots');

// Create dots dynamically based on video count
    heroVideos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('video-dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });

    const updateDots = (index) => {
        const allDots = document.querySelectorAll('.video-dot');
        allDots.forEach(dot => dot.classList.remove('active'));
        allDots[index].classList.add('active');
    };

    // Scroll & parallax logic
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                if (scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                if (heroVideo && scrollY <= window.innerHeight) {
                    const yValue = scrollY * 0.5;
                    heroVideo.style.transform = `translateY(${yValue}px)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', handleScroll);

    // Scroll animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all elements with the .animate class
    document.querySelectorAll('.animate').forEach(el => observer.observe(el));

    
class OptimizedCircuitAnimation {
    constructor() {
        this.paths = [];
        this.isActive = true;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimation());
        } else {
            this.setupAnimation();
        }
    }

    setupAnimation() {
        this.paths = document.querySelectorAll('.path');
        this.optimizeForPerformance();
        this.setupMinimalControls();
    }

    optimizeForPerformance() {
        // Enable hardware acceleration for all paths
        this.paths.forEach(path => {
            path.style.transform = 'translateZ(0)';
            path.style.backfaceVisibility = 'hidden';
            path.style.willChange = 'stroke-dashoffset';
        });

        // Pause animation when page is not visible (battery saving)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });
    }

    setupMinimalControls() {
        // Minimal setup - no complex glow variations that cause lag
        // Animation is handled purely by CSS for maximum performance
    }

    pauseAnimation() {
        this.isActive = false;
        this.paths.forEach(path => {
            path.style.animationPlayState = 'paused';
        });
    }

    resumeAnimation() {
        this.isActive = true;
        this.paths.forEach(path => {
            path.style.animationPlayState = 'running';
        });
    }

    // Simplified public controls
    toggle() {
        if (this.isActive) {
            this.pauseAnimation();
        } else {
            this.resumeAnimation();
        }
    }

    setSpeed(speed) {
        const baseDuration = 8; // seconds
        const newDuration = baseDuration / speed;
        
        this.paths.forEach(path => {
            path.style.animationDuration = `${newDuration}s, 3s`; // flow, glow
        });
    }

    destroy() {
        this.pauseAnimation();
        const svg = document.querySelector('.circuit-path');
        if (svg) {
            svg.remove();
        }
    }
}

// Auto-initialize with minimal overhead
let optimizedCircuitAnimation;

function initOptimizedCircuitAnimation() {
    optimizedCircuitAnimation = new OptimizedCircuitAnimation();
    
    // Make globally accessible
    window.optimizedCircuitAnimation = optimizedCircuitAnimation;
}

// Initialize immediately for smooth startup
initOptimizedCircuitAnimation();

// Simplified keyboard shortcut
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyN') { // Ctrl+Shift+N for Neon
        if (window.optimizedCircuitAnimation) {
            window.optimizedCircuitAnimation.toggle();
        }
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptimizedCircuitAnimation;
}

// Anti-Flicker Circuit Animation JavaScript - Minimal interference

class AntiFlickerCircuitAnimation {
    constructor() {
        this.paths = [];
        this.isActive = true;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimation());
        } else {
            this.setupAnimation();
        }
    }

    setupAnimation() {
        this.paths = document.querySelectorAll('.path');
        this.applyAntiFlickerOptimizations();
        this.setupMinimalControls();
    }

    applyAntiFlickerOptimizations() {
        // Apply critical anti-flicker properties
        this.paths.forEach(path => {
            // Force hardware acceleration
            path.style.transform = 'translateZ(0)';
            path.style.backfaceVisibility = 'hidden';
            path.style.webkitBackfaceVisibility = 'hidden';
            path.style.webkitTransform = 'translateZ(0)';
            
            // Optimize for animation
            path.style.willChange = 'stroke-dashoffset';
            
            // Prevent subpixel issues
            path.style.shapeRendering = 'geometricPrecision';
            path.style.vectorEffect = 'non-scaling-stroke';
        });
    }

    setupMinimalControls() {
        // Only pause when page is hidden to save battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });
    }

    pauseAnimation() {
        this.isActive = false;
        this.paths.forEach(path => {
            path.style.animationPlayState = 'paused';
        });
    }

    resumeAnimation() {
        this.isActive = true;
        this.paths.forEach(path => {
            path.style.animationPlayState = 'running';
        });
    }

    // Minimal public controls
    toggle() {
        if (this.isActive) {
            this.pauseAnimation();
        } else {
            this.resumeAnimation();
        }
    }

    setSpeed(speed) {
        const baseDuration = 15; // seconds
        const newDuration = baseDuration / speed;
        
        this.paths.forEach(path => {
            path.style.animationDuration = `${newDuration}s`;
        });
    }

    destroy() {
        this.pauseAnimation();
        const svg = document.querySelector('.circuit-path');
        if (svg) {
            svg.remove();
        }
    }
}

// Initialize with minimal overhead
let antiFlickerCircuitAnimation;

function initAntiFlickerCircuitAnimation() {
    antiFlickerCircuitAnimation = new AntiFlickerCircuitAnimation();
    window.antiFlickerCircuitAnimation = antiFlickerCircuitAnimation;
}

// Initialize immediately
initAntiFlickerCircuitAnimation();

// Keyboard shortcut
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyF') { // Ctrl+Shift+F for Flicker-free
        if (window.antiFlickerCircuitAnimation) {
            window.antiFlickerCircuitAnimation.toggle();
        }
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AntiFlickerCircuitAnimation;
}


});


