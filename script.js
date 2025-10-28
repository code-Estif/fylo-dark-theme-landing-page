// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Form validation and submission
  const earlyAccessForm = document.querySelector('.early-access__form');
  const emailInput = document.querySelector('.form-input');
  const submitButton = document.querySelector('.early-access__form .btn');

  if (earlyAccessForm) {
    earlyAccessForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      // Remove existing error messages
      const existingError = document.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Remove error styling
      emailInput.classList.remove('error');
      
      if (!email) {
        showError('Please enter your email address');
        return;
      }
      
      if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return;
      }
      
      // Simulate form submission
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        showSuccess('Thank you! We\'ll be in touch soon.');
        emailInput.value = '';
        submitButton.textContent = 'Get Started For Free';
        submitButton.disabled = false;
      }, 2000);
    });
  }

  function showError(message) {
    emailInput.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--red-500)';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.style.textAlign = 'left';
    
    const formGroup = document.querySelector('.form-group');
    formGroup.appendChild(errorDiv);
  }

  function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.color = 'var(--teal-200)';
    successDiv.style.fontSize = '1rem';
    successDiv.style.marginTop = '1rem';
    successDiv.style.textAlign = 'center';
    successDiv.style.fontWeight = '700';
    
    const form = document.querySelector('.early-access__form');
    form.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  // Add scroll effect to header
  let lastScrollTop = 0;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Add transition to header
  header.style.transition = 'transform 0.3s ease-in-out';

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.feature, .testimonial, .productive__content');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .feature, .testimonial, .productive__content {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .form-input.error {
      border: 2px solid var(--red-500);
    }
    
    .error-message {
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // Mobile menu toggle (for future enhancement)
  function createMobileMenu() {
    const nav = document.querySelector('.nav__container');
    const menu = document.querySelector('.nav__menu');
    
    if (window.innerWidth <= 768) {
      // Create mobile menu button
      const menuButton = document.createElement('button');
      menuButton.className = 'mobile-menu-toggle';
      menuButton.innerHTML = '☰';
      menuButton.style.cssText = `
        display: block;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
      `;
      
      // Insert button before menu
      nav.insertBefore(menuButton, menu);
      
      // Toggle menu visibility
      menuButton.addEventListener('click', function() {
        menu.classList.toggle('mobile-open');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
          menu.classList.remove('mobile-open');
        }
      });
    }
  }

  // Initialize mobile menu
  createMobileMenu();
  
  // Recreate mobile menu on resize
  window.addEventListener('resize', function() {
    const existingToggle = document.querySelector('.mobile-menu-toggle');
    if (existingToggle) {
      existingToggle.remove();
    }
    document.querySelector('.nav__menu').classList.remove('mobile-open');
    createMobileMenu();
  });

  // Add mobile menu styles
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = `
    @media (max-width: 768px) {
      .nav__menu {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
        background-color: var(--navy-850);
        flex-direction: column;
        padding: 1rem 2rem;
        border-radius: 8px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        min-width: 200px;
        text-align: center;
      }
      
      .nav__menu.mobile-open {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
        visibility: visible;
      }
      
      .nav__container {
        position: relative;
      }
      
      .mobile-menu-toggle {
        display: block !important;
      }
    }
    
    @media (min-width: 769px) {
      .mobile-menu-toggle {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(mobileStyle);

  // Add loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      console.log('Image loaded:', this.src);
    });
    
    img.addEventListener('error', function() {
      console.error('Image failed to load:', this.src);
      // Add a fallback for feature icons
      if (this.classList.contains('feature__icon')) {
        this.style.display = 'none';
        // Create a fallback icon
        const fallback = document.createElement('div');
        fallback.className = 'feature__icon-fallback';
        fallback.style.cssText = `
          width: 80px;
          height: 80px;
          background-color: var(--teal-200);
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: var(--navy-900);
        `;
        fallback.textContent = '📁';
        this.parentNode.insertBefore(fallback, this);
      }
    });
    
    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';

    // If image is already cached/complete, trigger load handler immediately
    if (img.complete) {
      img.dispatchEvent(new Event('load'));
    }
  });

  // Removed undefined criticalImages preloading block

  console.log('Fylo landing page loaded successfully! 🚀');
});
