/**
 * Yash Facilities - Website JavaScript Logic
 * Contains interactive components for header, nav menu, testimonials, services modals, and contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. Sticky Header & Active Link Navigation
  // ==========================================================================
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  // Add scrolled class to header when page is scrolled
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Track active section to update navbar active state
    let currentSectionId = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 2. Mobile Menu Toggle
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside of menu
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 3. Testimonial Slider / Carousel
  // ==========================================================================
  const track = document.getElementById('testimonial-track');
  const dots = document.querySelectorAll('.slider-dot');
  let currentIndex = 0;
  let autoPlayInterval;

  function updateSlider(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots active status
    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Dots click handler
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      updateSlider(targetIndex);
      resetAutoPlay();
    });
  });

  // Autoplay function
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % dots.length;
      updateSlider(nextIndex);
    }, 6000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  startAutoPlay();

  // ==========================================================================
  // 4. Services Database & Interactive Modals
  // ==========================================================================
  const servicesData = {
    'elder-care': {
      title: 'Old Age Care',
      desc: 'Compassionate care for your beloved senior citizens in the comfort and privacy of their own home.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 6v6l4 2"></path></svg>`,
      features: [
        'Assistance with daily activities (bathing, grooming)',
        'Timely medication management and monitoring',
        'Healthy meal planning & nutritional support',
        'Physical exercise and mobility assistance',
        'Companionship, mental exercises, and reading',
        'Regular vitals checks (BP, temperature, pulse)'
      ],
      price: 'Starting from ₹18,000 / month'
    },
    'baby-care': {
      title: 'Baby Care / Nanny',
      desc: 'Trusted and loving caregivers trained specifically in child development, infant hygiene, and baby safety.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
      features: [
        'Newborn care & diaper changing management',
        'Sterilizing bottles and cooking infant meals',
        'Establishing healthy nap and sleep schedules',
        'Age-appropriate developmental playtime activities',
        'Baby clothes washing & nursery organizing',
        'First-aid trained safe supervision'
      ],
      price: 'Starting from ₹16,000 / month'
    },
    'patient-care': {
      title: 'Patient Care Attendant',
      desc: 'Dedicated caregivers for post-operative patients, individuals recovering from illnesses, or disabled family members.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
      features: [
        'Support during recovery from surgery or trauma',
        'Safe mobility transitions (bed to wheelchair)',
        'Bedridden care (preventing bedsores, basic hygiene)',
        'Assistance with physical therapy exercises',
        'Feeding and drinking tracking support',
        'Accompaniment to clinical checkups'
      ],
      price: 'Starting from ₹20,000 / month'
    },
    'home-nurse': {
      title: 'Home Nurses',
      desc: 'Qualified general nursing (GNM/B.Sc Nursing) specialists providing clinical support and complex medical care.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
      features: [
        'Intravenous (IV) infusions and injections',
        'Wound dressing, suture removals, and bandage care',
        'Catheterization, tube feeding (Ryles Tube) support',
        'Tracheostomy care and oxygen therapy checks',
        'Critical care and ventilator support at home',
        'Detailed medical documentation and doctor updates'
      ],
      price: 'Starting from ₹25,000 / month'
    },
    'private-maid': {
      title: 'Private Maid Services',
      desc: 'Diligent domestic maids assisting with standard home cleanliness, laundry, dishwashing, and organizational upkeep.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 6v12M6 12h12"></path></svg>`,
      features: [
        'Daily sweeping, floor mopping, and vacuuming',
        'Kitchen cleaning and washing utensils',
        'Washing, folding, and ironing clothes',
        'Tidying bedrooms and maintaining washrooms',
        'Window, cabinet, and appliance surface dusting',
        'Flexible hours (part-time or 24h live-in options)'
      ],
      price: 'Starting from ₹8,000 / month'
    },
    'cooks': {
      title: 'Professional Cooks',
      desc: 'Experienced home cooks specializing in North/South Indian dishes, and custom healthy culinary preparation.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
      features: [
        'Customizing healthy daily meal plans',
        'South Indian, North Indian, and Chinese cuisines',
        'Hygienic kitchen organization and post-cook cleaning',
        'Dietary custom modifications (Low salt, diabetic friendly)',
        'Preparation of snacks, tea, and main meals',
        'Grocery planning and validation of freshness'
      ],
      price: 'Starting from ₹10,000 / month'
    },
    'housekeeping': {
      title: 'Housekeeping Services',
      desc: 'Deep cleaning and systematic maintenance programs for apartments, villas, and commercial facilities.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><line x1="9" y1="22" x2="9" y2="16"></line><line x1="15" y1="22" x2="15" y2="16"></line></svg>`,
      features: [
        'Complete bathroom descaling and deep cleaning',
        'Floor scrub washing, sanitization, and marble polish checks',
        'Window glass, balcony panels, and mesh cleaning',
        'Upholstery vacuuming (sofa, mattresses, curtains)',
        'Chimney, cooktop, and kitchen cabinet grease removal',
        'Equipped with premium eco-friendly cleaning liquids'
      ],
      price: 'Starting from ₹6,000 / service'
    }
  };

  const serviceModal = document.getElementById('service-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBodyContent = document.getElementById('modal-body-content');
  const learnBtns = document.querySelectorAll('.learn-more-btn');

  function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    const featuresHtml = data.features.map(feat => `
      <li>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        ${feat}
      </li>
    `).join('');

    modalBodyContent.innerHTML = `
      <div class="modal-service-header">
        <div class="modal-service-icon">${data.icon}</div>
        <div class="modal-service-title">
          <h3>${data.title}</h3>
        </div>
      </div>
      <p class="modal-service-desc">${data.desc}</p>
      <div class="modal-service-features">
        <h4>Key Inclusions:</h4>
        <ul>${featuresHtml}</ul>
      </div>
      <div class="modal-cta-box">
        <div class="modal-price-tag">${data.price}</div>
        <button class="btn btn-primary modal-book-cta" data-service="${serviceKey}">Book Service</button>
      </div>
    `;

    serviceModal.classList.add('active');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Stop background scrolling

    // Add event listener to modal Book CTA button
    const bookCta = modalBodyContent.querySelector('.modal-book-cta');
    bookCta.addEventListener('click', (e) => {
      const targetService = e.target.getAttribute('data-service');
      closeModal();
      
      // Auto-select the option in the form
      const selectEl = document.getElementById('service-select');
      if (selectEl) {
        selectEl.value = targetService;
      }
      
      // Smooth scroll to form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  function closeModal() {
    serviceModal.classList.remove('active');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  learnBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceKey = btn.getAttribute('data-service');
      openModal(serviceKey);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal on outside click
  serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
      closeModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================================================
  // 5. Booking Form Submission & Success Simulation
  // ==========================================================================
  const bookingForm = document.getElementById('booking-form');
  const successModal = document.getElementById('success-modal');
  const successCloseBtn = document.getElementById('success-close-btn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('full-name').value.trim();
      const phone = document.getElementById('phone-number').value.trim();
      const service = document.getElementById('service-select').value;
      const location = document.getElementById('location').value.trim();
      const startDate = document.getElementById('start-date').value;
      const message = document.getElementById('message').value.trim();

      // Simple Validation checks
      if (!name || !phone || !service || !location) {
        alert('Please fill out all required fields marked with *');
        return;
      }

      // Phone Validation pattern (must be digits/spaces/plus, minimum 8 characters)
      const phoneRegex = /^[+]?[0-9\s-]{8,20}$/;
      if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number (digits only, e.g. +91 99008 88258)');
        return;
      }

      // Show submitting state on button
      const submitBtn = document.getElementById('btn-submit-booking');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting Request...';
      submitBtn.disabled = true;

      // Prepare submission object to store locally
      const submission = {
        name,
        phone,
        service,
        location,
        startDate,
        message,
        timestamp: new Date().toISOString()
      };

      // Simulate API latency of 1.5 seconds
      setTimeout(() => {
        // Save submission to local storage for testability
        let existingSubmissions = JSON.parse(localStorage.getItem('yash_bookings') || '[]');
        existingSubmissions.push(submission);
        localStorage.setItem('yash_bookings', JSON.stringify(existingSubmissions));

        // Reset submit button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        // Reset Form
        bookingForm.reset();

        // Open Success Modal
        successModal.classList.add('active');
        successModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }, 1500);
    });
  }

  function closeSuccessModal() {
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', closeSuccessModal);
  }

  // Close success modal on background click
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      closeSuccessModal();
    }
  });

  // ==========================================================================
  // 6. Unified Premium Scroll Reveal Observer (Pop-Up Animations)
  // ==========================================================================
  
  // Skip animations if user prefers reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    
    // Selectors to auto-reveal (all headings, paragraphs, lists, cards, buttons)
    const AUTO_REVEAL_SELECTORS = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'li',
      '.badge',
      '.btn',
      '.service-card',
      '.why-card',
      '.step-item',
      '.testimonial-slide',
      '.gallery-item',
      '.contact-info-item',
      '.stat-item',
      '.footer-brand',
      '.footer-links',
      '.footer-contact',
      '.footer-quick',
      'img:not(.logo-icon)',
      'form',
      '.highlight-box',
      '.tab-link'
    ].join(', ');

    // Helper to determine the directional entrance animation based on screen position
    function getRevealDirection(el) {
      if (el.classList.contains('badge') || el.classList.contains('btn')) {
        return 'pop-scale';
      }
      
      const tag = el.tagName.toLowerCase();
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
        return ''; // Headings slide straight up
      }

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const vw = window.innerWidth;

      if (centerX < vw * 0.35) return 'from-left';
      if (centerX > vw * 0.65) return 'from-right';
      return ''; // Default slide up
    }

    // Auto-tag matched text/UI elements with .reveal class
    const candidateElements = document.querySelectorAll(AUTO_REVEAL_SELECTORS);
    candidateElements.forEach(el => {
      // Don't animate site header, footer navigation itself, or policies modal elements
      if (el.closest('.site-header') || el.closest('#policy-modal-overlay')) return;
      
      // Add .reveal class if not already present
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
      
      // Determine and assign directional animations
      const direction = getRevealDirection(el);
      if (direction && !el.classList.contains('from-left') && !el.classList.contains('from-right') && !el.classList.contains('pop-scale')) {
        el.classList.add(direction);
      }
    });

    // Create a single Intersection Observer for all .reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, {
      threshold: 0.08, // Trigger when 8% of the element is visible
      rootMargin: '0px 0px -30px 0px' // Offset slightly before viewport bottom
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

});

