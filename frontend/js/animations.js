// ===== GSAP SCROLL ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Skip heavy animations on mobile for performance
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        once: true,
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  gsap.utils.toArray('.about-stat').forEach((stat, i) => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 85%',
        once: true,
      },
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.1,
      ease: 'back.out(1.4)',
    });
  });

  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true,
      },
      y: 40,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.1,
      ease: 'power2.out',
    });
  });

  gsap.utils.toArray('.event-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true,
      },
      y: 40,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.1,
      ease: 'power2.out',
    });
  });

  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        once: true,
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.4,
      delay: i * 0.08,
      ease: 'power2.out',
    });
  });

  gsap.utils.toArray('.contact-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true,
      },
      y: 30,
      opacity: 0,
      duration: 0.4,
      delay: i * 0.1,
      ease: 'power2.out',
    });
  });

  const aboutContent = document.querySelector('.about-content');
  if (aboutContent) {
    gsap.from(aboutContent, {
      scrollTrigger: {
        trigger: aboutContent,
        start: 'top 80%',
        once: true,
      },
      x: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }

  const aboutImage = document.querySelector('.about-image');
  if (aboutImage) {
    gsap.from(aboutImage, {
      scrollTrigger: {
        trigger: aboutImage,
        start: 'top 80%',
        once: true,
      },
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }

  const resForm = document.querySelector('.reservation-form');
  if (resForm) {
    gsap.from(resForm, {
      scrollTrigger: {
        trigger: '.reservation-wrapper',
        start: 'top 80%',
        once: true,
      },
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }

  const resInfo = document.querySelector('.reservation-info');
  if (resInfo) {
    gsap.from(resInfo, {
      scrollTrigger: {
        trigger: '.reservation-wrapper',
        start: 'top 80%',
        once: true,
      },
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }

  const tableLayout = document.querySelector('.table-layout');
  if (tableLayout) {
    gsap.from(tableLayout, {
      scrollTrigger: {
        trigger: tableLayout,
        start: 'top 85%',
        once: true,
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  }

  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    const headerTitle = pageHeader.querySelector('h1');
    const headerP = pageHeader.querySelector('p');
    if (headerP) gsap.from(headerP, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' });
    if (headerTitle) gsap.from(headerTitle, { y: 30, opacity: 0, duration: 0.6, delay: 0.15, ease: 'power2.out' });
  }

  gsap.from('.footer', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 95%',
      once: true,
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  });

  const contactGrid = document.querySelector('.contact-grid');
  if (contactGrid) {
    gsap.utils.toArray('.contact-grid > div').forEach((col, i) => {
      gsap.from(col, {
        scrollTrigger: {
          trigger: col,
          start: 'top 80%',
          once: true,
        },
        x: i === 0 ? -40 : 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    });
  }
} else {
  // On mobile, just do simple fade-in without scroll triggers
  gsap.utils.toArray('.section-title, .about-stat, .feature-card, .event-card, .gallery-item, .contact-card').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
