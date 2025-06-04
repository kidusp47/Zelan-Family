// Main JavaScript file for Zelan Family website

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
    const categories = document.querySelectorAll('.category');
    const categoryPanels = document.querySelectorAll('.category-panel');
    const closePanelBtns = document.querySelectorAll('.close-panel');
    const categoryDetails = document.querySelector('.category-details');
    
    // Hero Video Array (placeholders - to be replaced with actual videos)
    const heroVideos = [
        'assets/videos/hero-video-1.mp4',
        'assets/videos/hero-video-2.mp4',
        'assets/videos/hero-video-3.mp4',
        'assets/videos/hero-video-4.mp4',
        'assets/videos/hero-video-5.mp4'
    ];
    
    let currentVideoIndex = 0;
    
    // Navigation Functions
    function toggleNav() {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    }
    
    // Scroll Functions
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Add animation to elements when they come into view
        animateOnScroll();
    }
    
    // Smooth scroll to section when clicking nav links
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - navbar.offsetHeight,
            behavior: 'smooth'
        });
        
        // Close mobile nav if open
        if (navLinks.classList.contains('nav-active')) {
            toggleNav();
        }
    }
    
    // Hero Video Functions
    function switchVideo(direction) {
        if (direction === 'next') {
            currentVideoIndex = (currentVideoIndex + 1) % heroVideos.length;
        } else {
            currentVideoIndex = (currentVideoIndex - 1 + heroVideos.length) % heroVideos.length;
        }
        
        // Fade out current video
        heroVideo.style.opacity = 0;
        
        // Change source and fade in after a short delay
        setTimeout(() => {
            heroVideo.src = heroVideos[currentVideoIndex];
            heroVideo.load();
            heroVideo.play();
            heroVideo.style.opacity = 1;
        }, 500);
    }
    
    // Video Card Functions
    function handleVideoCardHover() {
        const video = this.querySelector('video');
        video.play();
    }
    
    function handleVideoCardLeave() {
        const video = this.querySelector('video');
        video.pause();
        video.currentTime = 0;
    }
    
    // Category Panel Functions
    function openCategoryPanel() {
        const categoryId = this.id;
        const panelId = categoryId.replace('category', 'panel');
        const panel = document.getElementById(panelId);
        
        categoryDetails.style.display = 'block';
        
        // Slide in the panel
        setTimeout(() => {
            panel.style.left = '0';
        }, 100);
    }
    
    function closeCategoryPanel() {
        const panel = this.closest('.category-panel');
        
        // Slide out the panel
        panel.style.left = '-100%';
        
        // Hide the details container after animation completes
        setTimeout(() => {
            categoryDetails.style.display = 'none';
        }, 500);
    }
    
    // Animation Functions
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    // Parallax Effect for Hero Section
    function parallaxEffect() {
        const heroSection = document.querySelector('.hero');
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition <= heroSection.offsetHeight) {
            const yValue = scrollPosition * 0.5;
            heroVideo.style.transform = `translateY(${yValue}px)`;
        }
    }
    
    // Add animate-on-scroll class to elements that should animate
    function setupAnimations() {
        // Section headers
        document.querySelectorAll('.section-header').forEach(header => {
            header.classList.add('animate-on-scroll');
        });
        
        // Service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.add('animate-on-scroll');
        });
        
        // About text
        document.querySelector('.about-text').classList.add('animate-on-scroll');
        
        // Video cards
        document.querySelectorAll('.video-card').forEach(card => {
            card.classList.add('animate-on-scroll');
        });
        
        // Categories
        document.querySelectorAll('.category').forEach(category => {
            category.classList.add('animate-on-scroll');
        });
    }
    
    // Form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // In a real implementation, this would send the form data to a server
        // For now, just show an alert
        alert('Thank you for your message! This is a demo form and does not actually send data.');
        
        // Reset the form
        e.target.reset();
    }
    
    // Initialize the website
    function init() {
        // Setup event listeners
        burger.addEventListener('click', toggleNav);
        window.addEventListener('scroll', handleScroll);
        prevVideoBtn.addEventListener('click', () => switchVideo('prev'));
        nextVideoBtn.addEventListener('click', () => switchVideo('next'));
        
        // Smooth scroll for all navigation links
        document.querySelectorAll('.nav-links a, .mobile-nav a, .footer-links a').forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
        
        // Video card hover effects
        videoCards.forEach(card => {
            card.addEventListener('mouseenter', handleVideoCardHover);
            card.addEventListener('mouseleave', handleVideoCardLeave);
        });
        
        // Category panel interactions
        categories.forEach(category => {
            category.addEventListener('click', openCategoryPanel);
        });
        
        closePanelBtns.forEach(btn => {
            btn.addEventListener('click', closeCategoryPanel);
        });
        
        // Form submission
        document.querySelector('.contact-form form').addEventListener('submit', handleFormSubmit);
        
        // Setup animations
        setupAnimations();
        
        // Initial scroll check
        handleScroll();
        
        // Add parallax effect on scroll
        window.addEventListener('scroll', parallaxEffect);
    }
    
    // Initialize the website
    init();
});
document.addEventListener('DOMContentLoaded', function() {
    // Toggle details
    const detailsBtn = document.querySelector('.strategy-section .details-btn');
    const accordion = document.querySelector('.strategy-section .accordion');
    
    detailsBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        accordion.style.display = accordion.style.display === 'none' ? 'block' : 'none';
    });
    
    // Toggle accordion items
    const accordionItems = document.querySelectorAll('.strategy-section .accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            
            // Close all items
            accordionItems.forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            currentItem.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
      });
    }
    
    // Navigation Controls
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    if (prevButton) {
      prevButton.addEventListener('click', function() {
        // Navigate to previous page/slide
        console.log('Navigate to previous page');
        // You can add actual navigation logic here
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', function() {
        // Navigate to next page/slide
        console.log('Navigate to next page');
        // You can add actual navigation logic here
      });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
          }
        }
      });
    });
    
    // Add scroll event for header styling
    const header = document.querySelector('.header');
    
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
    
    // Optional: Add animation for elements when they come into view
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('animated');
        }
      });
    };
    
    // Add animate-on-scroll class to elements you want to animate
    const addAnimationClasses = function() {
      document.querySelectorAll('.hero-title, .hero-subtitle, .services-title, .value-item, .testimonial-item').forEach(element => {
        element.classList.add('animate-on-scroll');
      });
    };
    
    addAnimationClasses();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
  });
  document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation items
    const navItems = document.querySelectorAll('.pill-nav li');
    
    // Add click event listener to each item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Function to toggle between color variants (for demo purposes)
    let currentTheme = 'black'; // Default theme
    
    function toggleTheme() {
        const pillNav = document.querySelector('.pill-nav');
        
        // Remove all theme classes
        pillNav.classList.remove('black', 'blue', 'white');
        
        // Set next theme
        if (currentTheme === 'black') {
            currentTheme = 'blue';
        } else if (currentTheme === 'blue') {
            currentTheme = 'white';
        } else {
            currentTheme = 'black';
        }
        
        // Apply new theme
        pillNav.classList.add(currentTheme);
    }
    
    // Add theme toggle functionality (optional)
    document.querySelector('.content').addEventListener('click', toggleTheme);
});
document.addEventListener('DOMContentLoaded', function() {
  // Get all portfolio filter buttons and items
  const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        // Show/hide items based on filter
        if (filterValue === 'all' || filterValue === itemCategory) {
          item.classList.remove('hidden');
          // Add animation for smooth appearance
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
  
  // Initialize with all items visible
  filterButtons[0].click();
});

// Business Stats Counter Animation
document.addEventListener('DOMContentLoaded', function() {
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to animate counter
  function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target > 100 ? 1 : 0.1;
    const stepTime = Math.abs(Math.floor(duration / (target / increment)));
    
    const timer = setInterval(function() {
      start += increment;
      
      // Handle different formats (with decimals for small numbers)
      if (target > 100) {
        element.textContent = Math.floor(start);
      } else {
        element.textContent = Math.round(start * 10) / 10;
      }
      
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  }
  
  // Get all counter elements
  const counters = document.querySelectorAll('.business-counter-number');
  let hasAnimated = false;
  
  // Function to start animation if counters are in viewport
  function checkCounters() {
    if (hasAnimated) return;
    
    const counterSection = document.querySelector('.business-counter-section');
    
    if (isInViewport(counterSection)) {
      hasAnimated = true;
      
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        animateCounter(counter, target, 2000); // 2 seconds duration
      });
      
      // Remove scroll listener once animation has started
      window.removeEventListener('scroll', checkCounters);
    }
  }
  
  // Check on initial load and scroll
  checkCounters();
  window.addEventListener('scroll', checkCounters);
});
