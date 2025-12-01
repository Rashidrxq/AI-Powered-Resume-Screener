// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Set initial state
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all fade-in elements
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add floating animation to image container
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        // The floating animation is handled by CSS
        // But we can add additional interactive effects
        imageContainer.addEventListener('mouseenter', () => {
            imageContainer.style.animationPlayState = 'paused';
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            imageContainer.style.animationPlayState = 'running';
        });
    }
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-5px)';
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
        });
    });
    
    // Add click events to buttons
    const primaryBtn = document.querySelector('.btn.primary');
    const secondaryBtn = document.querySelector('.btn.secondary');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your hire me functionality here
            alert('Thank you for your interest! Please contact me through my professional channels.');
        });
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your download CV functionality here
            alert('CV download functionality would be implemented here.');
        });
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});