// JavaScript for Zelan Family Website

document.addEventListener('DOMContentLoaded', function() {
    // Video carousel controls for Hero Section
    const videos = [
      '/assets/videos/video1.mp4',
      '/assets/videos/video2.mp4',
      '/assets/videos/video3.mp4'
    ];
    let currentVideo = 0;
    const heroVideo = document.getElementById('hero-video');
    document.getElementById('prev-video').addEventListener('click', () => {
      currentVideo = (currentVideo - 1 + videos.length) % videos.length;
      heroVideo.querySelector('source').src = videos[currentVideo];
      heroVideo.load();
      heroVideo.play();
    });
    document.getElementById('next-video').addEventListener('click', () => {
      currentVideo = (currentVideo + 1) % videos.length;
      heroVideo.querySelector('source').src = videos[currentVideo];
      heroVideo.load();
      heroVideo.play();
    });
  
    // About Us section: play video on hover
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
      const vid = card.querySelector('video');
      card.addEventListener('mouseenter', () => {
        vid.play();
      });
      card.addEventListener('mouseleave', () => {
        vid.pause();
        vid.currentTime = 0;
      });
    });
  
    // Work categories: open and close panels on click
    const categoryBlocks = document.querySelectorAll('.category-block');
    categoryBlocks.forEach(block => {
      block.addEventListener('click', () => {
        const targetId = block.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
      });
    });
    const closeButtons = document.querySelectorAll('.close-panel');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.category-panel').classList.remove('active');
      });
    });
  
    // Services: fade in on scroll using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);
    document.querySelectorAll('.animate').forEach(el => {
      observer.observe(el);
    });
  
    // Rotating testimonials every 5 seconds
    const testimonials = document.querySelectorAll('.testimonial');
    let testimonialIndex = 0;
    setInterval(() => {
      testimonials[testimonialIndex].classList.remove('active');
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      testimonials[testimonialIndex].classList.add('active');
    }, 5000);
  });
  