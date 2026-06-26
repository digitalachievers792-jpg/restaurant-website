// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== NAV TOGGLE (Mobile) =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
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
if (window.innerWidth <= 768 && themeToggleMobile) {
  themeToggleMobile.style.display = 'block';
}

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

// ===== HERO PARTICLES =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (10 + Math.random() * 20) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
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

// ===== PARALLAX ON HERO =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.scrollY;
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent && scrolled < hero.offsetHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
    }
  }
});

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
