// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize preloader
  const preloader = document.getElementById('preloader');
  
  // Check if required libraries are loaded
  if (typeof LocomotiveScroll === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('Required libraries not loaded properly');
    // Hide preloader if libraries failed to load
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 1000);
    }
    return;
  }
  
  // Initialize Locomotive Scroll
  let locoScroll;
  try {
    locoScroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      lerp: 0.08, // Linear interpolation factor (between 0 and 1) for smooth scrolling
      multiplier: 1.2, // Multiplier for scroll speed
      class: 'is-inview', // Class added to elements in viewport
      scrollbarClass: 'c-scrollbar', // Class for scrollbar element
      firefoxMultiplier: 50, // Firefox scroll multiplier
      touchMultiplier: 2, // Touch device scroll multiplier
      smartphone: {
        smooth: true,
        multiplier: 1.5
      },
      tablet: {
        smooth: true,
        breakpoint: 1024
      }
    });

    // Expose locomotive scroll to global scope for debugging
    window.locoScroll = locoScroll;

    // Set up GSAP ScrollTrigger to work with Locomotive Scroll
    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    // Refresh ScrollTrigger when Locomotive Scroll updates
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

    // Update Locomotive Scroll on window resize
    window.addEventListener('resize', () => locoScroll.update());
  } catch (error) {
    console.error('Error initializing Locomotive Scroll:', error);
  }

  // GSAP Core Defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8
  });

  // Hide preloader when everything is loaded
  window.addEventListener('load', function() {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('hidden');
      }
      
      // Initialize animations after preloader is hidden
      initAnimations(locoScroll);
    }, 500);
  });

  // Initialize all animations
  function initAnimations(locoScroll) {
    // Hero section animation
    initHeroAnimation();
    
    // Service cards animation
    initServiceCardsAnimation();
    
    // Skills badges animation
    initSkillsAnimation();
    
    // Timeline animation
    initTimelineAnimation(locoScroll);
  }

  // Hero Section Animation
  function initHeroAnimation() {
    if (prefersReducedMotion) return;
    
    const heroTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power3.out'
      }
    });
    
    // Photo card animation
    heroTl.from('.photo-card', {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 1.2
    }, 0);
    
    // Content animations with stagger
    heroTl.from('.hero-title', {
      x: 50,
      opacity: 0
    }, 0.2);
    
    heroTl.from('.hero-tagline', {
      x: 50,
      opacity: 0
    }, 0.3);
    
    heroTl.from('.hero-description', {
      x: 50,
      opacity: 0
    }, 0.4);
    
    heroTl.from('.hero-ctas .btn', {
      y: 30,
      opacity: 0,
      stagger: 0.1
    }, 0.5);
  }

  // Service Cards Animation
  function initServiceCardsAnimation() {
    if (prefersReducedMotion) {
      // Show cards without animation for reduced motion
      gsap.set('[data-service-card]', { opacity: 1, y: 0 });
      return;
    }
    
    // Create scroll-triggered animation for service cards
    gsap.utils.toArray('[data-service-card]').forEach((card, i) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        rotationX: -15,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          scroller: '[data-scroll-container]',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // Skills Badges Animation
  function initSkillsAnimation() {
    if (prefersReducedMotion) {
      // Show badges without animation for reduced motion
      gsap.set('[data-badge]', { opacity: 1, y: 0 });
      return;
    }
    
    // Create scroll-triggered animation for skill badges
    gsap.utils.toArray('[data-skill-badges]').forEach(badgeContainer => {
      const badges = badgeContainer.querySelectorAll('[data-badge]');
      
      gsap.from(badges, {
        y: 30,
        opacity: 0,
        scale: 0.8,
        rotation: 10,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: badgeContainer,
          scroller: '[data-scroll-container]',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // Timeline Animation - Simplified approach
  function initTimelineAnimation(locoScroll) {
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    if (!timelineWrapper) return;
    
    if (prefersReducedMotion) {
      // Show all timeline items without animation for reduced motion
      gsap.set('[data-timeline-item]', { opacity: 1, position: 'relative' });
      return;
    }
    
    // Get timeline items
    const timelineItems = gsap.utils.toArray('[data-timeline-item]');
    const progressBar = document.querySelector('.timeline-progress-bar');
    
    // Simple fade-in animations for timeline items as they enter viewport
    timelineItems.forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          scroller: '[data-scroll-container]',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
    
    // Animate progress bar
    if (progressBar) {
      gsap.from(progressBar, {
        height: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.journey-timeline',
          scroller: '[data-scroll-container]',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5
        }
      });
    }
  }

  // Add 3D tilt effect to service cards (only if not preferring reduced motion)
  if (!prefersReducedMotion) {
    initCardTilt();
  }

  function initCardTilt() {
    const cards = document.querySelectorAll('[data-service-card]');
    
    cards.forEach(card => {
      // Mouse move handler
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation values (-15 to 15 degrees)
        const rotateY = ((x - rect.width / 2) / rect.width) * 30;
        const rotateX = ((y - rect.height / 2) / rect.height) * -30;
        
        // Apply transformation
        gsap.to(card, {
          rotationY: rotateY,
          rotationX: rotateX,
          duration: 0.3
        });
      });
      
      // Mouse leave handler
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }

  // Update locomotive scroll on page load
  setTimeout(() => {
    if (locoScroll) {
      locoScroll.update();
    }
  }, 1000);
});

// Handle browser back/forward buttons
window.addEventListener('beforeunload', () => {
  // Destroy locomotive scroll to prevent memory leaks
  if (window.locoScroll) {
    window.locoScroll.destroy();
  }
});