// ===== GSAP SCROLL ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
gsap.utils.toArray('.section').forEach(section => {
  const title = section.querySelector('.section-title');
  if (title) {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }
});

// Animate about stats
gsap.utils.toArray('.about-stat').forEach((stat, i) => {
  gsap.from(stat, {
    scrollTrigger: {
      trigger: stat,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    scale: 0.5,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.15,
    ease: 'back.out(1.7)',
  });
});

// Animate menu items
gsap.utils.toArray('.menu-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    y: 60,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.1,
    ease: 'power3.out',
  });
});

// Animate gallery items
gsap.utils.toArray('.gallery-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    delay: i * 0.1,
    ease: 'power2.out',
  });
});

// Animate reservation form
const resForm = document.querySelector('.reservation-form');
if (resForm) {
  gsap.from(resForm, {
    scrollTrigger: {
      trigger: '.reservation-wrapper',
      start: 'top 80%',
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
}

// Animate contact cards
gsap.utils.toArray('.contact-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    duration: 0.5,
    delay: i * 0.15,
    ease: 'power2.out',
  });
});

// Animate page header
const pageHeader = document.querySelector('.page-header');
if (pageHeader) {
  const headerTitle = pageHeader.querySelector('h1');
  const headerP = pageHeader.querySelector('p');
  gsap.from(headerP, { y: 30, opacity: 0, duration: 0.8, delay: 0.2 });
  gsap.from(headerTitle, { y: 40, opacity: 0, duration: 0.8, delay: 0.4 });
}

// Animate footer
gsap.from('.footer', {
  scrollTrigger: {
    trigger: '.footer',
    start: 'top 90%',
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
});
