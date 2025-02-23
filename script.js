// script.js

// --- Mobile Menu Toggle ---
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle'); // For the animation (if you use the CSS)
});

// Close the mobile menu when a link is clicked (optional but good UX)
const navLinksList = document.querySelectorAll('.nav-links li');
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the target element's ID
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Check if the target element exists
        if (targetElement) {
            // Calculate the target's offset from the top
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;

            // Smooth scroll to the target
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

        // Toggle visibility of the target details
        if (targetDetails) {
            // Check if targetDetails is currently displayed
            const isDisplayed = targetDetails.style.display === 'block';

            // Hide all service details
            document.querySelectorAll('.service-details').forEach(details => {
                details.style.display = 'none';
            });

            // If targetDetails was not displayed, show it
            if (!isDisplayed) {
                targetDetails.style.display = 'block';
            }
        }
        // Optionally, smoothly scroll to the revealed content
        // window.scrollTo({
        //     top: targetDetails.offsetTop - 100, // Adjust offset as needed
        //     behavior: 'smooth'
        // });
    });
});

// --- Testimonial Slider (Tiny Slider) ---
if (document.querySelector('.testimonial-slider')) { // Check if the slider exists
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
    const subjectInput = form.querySelector('input[name="subject"]'); // Get the subject input
    const messageInput = form.querySelector('textarea[name="message"]');

    //Simple name validation
    if (nameInput.value.trim() === '') {
        isValid = false;
        showError(nameInput, 'Name is required');
    } else {
        clearError(nameInput);
    }

    // Simple email validation (using a regular expression)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (!emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        showError(emailInput, 'Enter a valid email address');
    } else {
        clearError(emailInput);
    }

    // Simple subject validation
    if (subjectInput.value.trim() === '') { // Check if subject is empty
        isValid = false;
        showError(subjectInput, 'Subject is required');
    } else {
        clearError(subjectInput);
    }

    // Simple message validation
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
    const formGroup = inputElement.parentElement; // Get parent
    // Remove any old errors message.
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    errorSpan.textContent = message;
    formGroup.appendChild(errorSpan); //Insert new error message
    inputElement.classList.add('error');
}

function clearError(inputElement) {
    const formGroup = inputElement.parentElement;
     const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    inputElement.classList.remove('error');
}

// --- Copyright Year Update ---
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();
