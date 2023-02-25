import './main.css'
import './particles.js'

// Handles fade in title for the parallax, works differently from rest of fade-in items
window.onload = function() {
  // Fade in items on open
  const fadeCollection = document.querySelectorAll(".fade-up");
  
  fadeCollection.forEach(element => {
    element.classList.add('visible');
  })
  
  // Add skews to content
  const skews = document.querySelectorAll(".seperator-skew");
  
  skews.forEach(element => {
    element.innerHTML = 
    "<svg x='0' y='0' viewBox='0 0 2560 100' preserveAspectRatio='none' version='1.1' " +
    "xmlns='http://www.w3.org/2000/svg' style='position: absolute;bottom: -1px;'> " +
    "<polygon points='2560 0 2560 100 0 100'></polygon></svg>"
  });
}

// Fades in items as users scroll
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
});

function checkFadeIn() {
  fadeInElements.forEach((element) => {
    let rect = element.getBoundingClientRect();
    if (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 250 
      ) {
        observer.observe(element);
      }
    });
  }
  
  checkFadeIn();
  
  // Debounces to reduce amount of work on scroll event
  const debouncedCheckFadeIn = debounce(checkFadeIn, 100);
  
  window.addEventListener("scroll", debouncedCheckFadeIn);
  
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }
  
  // Navbar sticky when scrolling
  window.addEventListener("scroll", function() {
    var header = this.document.querySelector("nav");
    header.classList.toggle("sticky", window.scrollY > 0);
  })