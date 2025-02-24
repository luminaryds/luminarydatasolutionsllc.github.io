// script.js

// --- Mobile Menu Toggle ---
const burgerBtn = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Toggle the nav and the burger animation
burgerBtn.addEventListener('click', () => {
  // Show/hide the menu
  navLinks.classList.toggle('active');
  
  // Toggle the burger icon animation class
  burgerBtn.classList.toggle('toggle');
  
  // Toggle aria-expanded for accessibility
  const expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
  burgerBtn.setAttribute('aria-expanded', !expanded);
});

// Close the mobile menu when a nav link is clicked (optional but good UX)
document.querySelectorAll('.nav-links li').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    burgerBtn.classList.remove('toggle');
    burgerBtn.setAttribute('aria-expanded', false);
  });
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// --- Service Details Toggle ---
const serviceButtons = document.querySelectorAll('.service-button');
serviceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    const targetDetails = document.getElementById(targetId);
    if (targetDetails) {
      // Hide all service details
      document.querySelectorAll('.service-details').forEach(details => {
        details.style.display = 'none';
      });
      // Show the clicked one
      targetDetails.style.display = 'block';
    }
  });
});

// --- Testimonial Slider (Tiny Slider) ---
if (document.querySelector('.testimonial-slider')) {
  const slider = tns({
    container: '.testimonial-slider',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    autoplayButtonOutput: false,
    controls: false,
    nav: false,
    mouseDrag: true,
    autoplayTimeout: 6000,
  });
}

// --- Basic Form Validation ---
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (event) => {
  let isValid = true;
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const subjectInput = form.querySelector('input[name="subject"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  // Simple validations
  if (nameInput.value.trim() === '') {
    isValid = false;
    showError(nameInput, 'Name is required');
  } else {
    clearError(nameInput);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    isValid = false;
    showError(emailInput, 'Enter a valid email address');
  } else {
    clearError(emailInput);
  }

  if (subjectInput.value.trim() === '') {
    isValid = false;
    showError(subjectInput, 'Subject is required');
  } else {
    clearError(subjectInput);
  }

  if (messageInput.value.trim() === '') {
    isValid = false;
    showError(messageInput, 'Message is required');
  } else {
    clearError(messageInput);
  }

  if (!isValid) {
    event.preventDefault(); // Prevent form submission if invalid
  }
});

function showError(inputElement, message) {
  const formGroup = inputElement.parentElement;
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) existingError.remove();

  const errorSpan = document.createElement('span');
  errorSpan.classList.add('error-message');
  errorSpan.textContent = message;
  formGroup.appendChild(errorSpan);
  inputElement.classList.add('error');
}

function clearError(inputElement) {
  const formGroup = inputElement.parentElement;
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) existingError.remove();
  inputElement.classList.remove('error');
}

// --- Copyright ---
document.getElementById("copyright-year")
        .innerHTML = new Date().getFullYear();
