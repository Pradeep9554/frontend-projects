// script.js

// Fade-in animation on scroll for product cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

const cards = document.querySelectorAll('.product-card');
cards.forEach(card => {
  observer.observe(card);
});

// Change navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = '#000';
  } else {
    navbar.style.backgroundColor = '#111';
  }
});
