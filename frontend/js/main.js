// ===== LOADER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }
});

// ===== CONSOLIDATED SCROLL HANDLER =====
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      // Header scroll effect
      const header = document.getElementById('header');
      if (header) {
        header.classList.toggle('scrolled', scrollY > 100);
      }

      // Hero parallax (only on desktop, disabled on mobile for performance)
      if (window.innerWidth > 768) {
        const hero = document.querySelector('.hero');
        if (hero) {
          const heroContent = hero.querySelector('.hero-content');
          if (heroContent && scrollY < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollY / hero.offsetHeight) * 0.5;
          }
        }
      }

      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ===== NAV TOGGLE (Mobile) =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Create mobile nav overlay
let navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function openNav() {
  navToggle.classList.add('active');
  navLinks.classList.add('open');
  navOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navToggle.classList.remove('active');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });
}

navOverlay.addEventListener('click', closeNav);

if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

// Close nav on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
    closeNav();
  }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const html = document.documentElement;

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  const icon = next === 'dark' ? 'fa-moon' : 'fa-sun';
  document.querySelectorAll('.theme-toggle i').forEach(i => {
    i.className = `fas ${icon}`;
  });
  localStorage.setItem('theme', next);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
const savedIcon = savedTheme === 'dark' ? 'fa-moon' : 'fa-sun';
document.querySelectorAll('.theme-toggle i').forEach(i => {
  i.className = `fas ${savedIcon}`;
});

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

// ===== TESTIMONIALS SLIDER =====
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.testimonial-dot');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

if (dots.length) {
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.index));
    });
  });
  setInterval(() => {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }, 5000);
}

// ===== HERO PARTICLES (reduced on mobile) =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  const particleCount = window.innerWidth > 768 ? 12 : 4;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (15 + Math.random() * 20) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    particlesContainer.appendChild(particle);
  }
}

// ===== MENU TABS =====
const menuTabs = document.getElementById('menuTabs');
if (menuTabs) {
  menuTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.menu-tab');
    if (!tab) return;
    menuTabs.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    filterMenuItems(tab.dataset.category);
  });
}

function filterMenuItems(category) {
  const items = document.querySelectorAll('.menu-item');
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
      item.style.animation = 'fadeInUp 0.5s ease forwards';
    } else {
      item.style.display = 'none';
    }
  });
}

// ===== BOOK A TABLE - SUGGEST TABLE =====
document.querySelectorAll('.book-table-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const suggestedTables = [5, 6, 10, 14];
    const randomTable = suggestedTables[Math.floor(Math.random() * suggestedTables.length)];
    this.href = `reservation.html?table=${randomTable}`;
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
