/**
 * Authkeep - Main JavaScript
 * Handles navigation, animations, form, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnimations();
  initCounterAnimation();
  initContactForm();
  initSmoothScroll();
});

// ============================================
// Navigation
// ============================================
function initNav() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks?.classList.toggle('active');
    document.body.style.overflow = navLinks?.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click (mobile)
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navLinks?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ============================================
// Scroll-triggered animations (AOS-like)
// ============================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// Counter animation for stats
// ============================================
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(el => observer.observe(el));
}

// ============================================
// Contact form
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // For static site - show success message (no backend)
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    // Simulate send (replace with Formspree, Netlify Forms, etc. for production)
    setTimeout(() => {
      btn.innerHTML = '<span>Message Sent!</span>';
      btn.style.background = 'linear-gradient(135deg, #00a884, #008f6b)';

      // Reset form
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 800);
  });
}

// ============================================
// Smooth scroll for anchor links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
