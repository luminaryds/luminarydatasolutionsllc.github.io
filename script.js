// script.js

// --- Mobile Menu Toggle ---
const burgerBtn = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Toggle the nav and the burger animation
burgerBtn.addEventListener('click', () => {
    // Show/hide the menu
    navLinks.classList.toggle('nav-active'); // Changed 'active' to 'nav-active' to match the CSS

    // Toggle the burger icon animation class
    burgerBtn.classList.toggle('toggle');

    // Toggle aria-expanded for accessibility
    const expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    burgerBtn.setAttribute('aria-expanded', !expanded);

    //Animation for links
    if(navLinks.classList.contains('nav-active')){
        navLinks.querySelectorAll('li').forEach((link,index) => {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .3}s`;
        });
    }
});

// Close the mobile menu when a nav link is clicked (optional but good UX)
// Use event delegation for efficiency
navLinks.addEventListener('click', (event) => {
    if (event.target.closest('li')) { // Check if a list item or its child was clicked
        navLinks.classList.remove('nav-active');
        burgerBtn.classList.remove('toggle');
        burgerBtn.setAttribute('aria-expanded', false);
        navLinks.querySelectorAll('li').forEach(link => { //Resets animation
            link.style.animation = '';
        });
    }
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // No need to calculate offset manually, use scrollIntoView
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- Service Details Toggle ---
const serviceButtons = document.querySelectorAll('.service-button');  //This is fine.

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
// Check if Tiny Slider is actually included before trying to initialize it!
if (typeof tns === 'function' && document.querySelector('.testimonial-slider')) {
    const slider = tns({
        container: '.testimonial-slider',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        autoplayButtonOutput: false,
        controls: false, // Consider adding custom controls for better UX
        nav: false,     // Consider adding nav dots for better UX
        mouseDrag: true,
        autoplayTimeout: 6000,
    });
} else if (document.querySelector('.testimonial-slider')){
    console.warn("Tiny Slider (tns) is not loaded.  Make sure the library is included in your HTML.");
}

// --- Basic Form Validation ---
const form = document.querySelector('.contact-form');

// Check if the form exists before adding the event listener
if (form) {
    form.addEventListener('submit', (event) => {
        let isValid = true;
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const subjectInput = form.querySelector('input[name="subject"]');
        const messageInput = form.querySelector('textarea[name="message"]');

        // Simple validations (using functions for better organization)
        isValid = validateRequired(nameInput, 'Name is required') && isValid;
        isValid = validateEmail(emailInput, 'Enter a valid email address') && isValid;
        isValid = validateRequired(subjectInput, 'Subject is required') && isValid;
        isValid = validateRequired(messageInput, 'Message is required') && isValid;

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if invalid
        } else {
            // IMPORTANT:  You *must* handle form submission here!
            // Since this is GitHub Pages (static site), you can't use server-side
            // processing.  You *must* use a third-party service like Formspree,
            // Netlify Forms, or a similar service.  This code will *not* send the
            // form data anywhere without that.
            console.log("Form is valid, but submission is not implemented yet.");
            // Add your form submission logic here (using a third-party service).
        }
    });

    function validateRequired(inputElement, message) {
        if (inputElement.value.trim() === '') {
            showError(inputElement, message);
            return false;
        } else {
            clearError(inputElement);
            return true;
        }
    }

    function validateEmail(inputElement, message) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputElement.value.trim())) {
            showError(inputElement, message);
            return false;
        } else {
            clearError(inputElement);
            return true;
        }
    }

    function showError(inputElement, message) {
        const formGroup = inputElement.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
		}
        const errorSpan = document.createElement('span');
        errorSpan.classList.add('error-message');
        errorSpan.textContent = message;
        errorSpan.style.color = 'red';  //Make the error message red.
        errorSpan.style.fontSize = '.8rem'; //Smaller font size.
        formGroup.appendChild(errorSpan);
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
} else {
    console.warn("Contact form (.contact-form) not found.");
}

// --- Copyright ---
// Use textContent instead of innerHTML for simple text updates
document.getElementById("copyright-year").textContent = new Date().getFullYear();
