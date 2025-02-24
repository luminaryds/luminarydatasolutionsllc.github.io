// script.js

// --- Mobile Menu Toggle ---
const burgerBtn = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Toggle the nav and the burger animation
burgerBtn.addEventListener('click', () => {
    // Show/hide the menu
    navLinks.classList.toggle('nav-active');

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

// Close the mobile menu when a nav link is clicked
navLinks.addEventListener('click', (event) => {
    if (event.target.closest('li')) {
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
            targetElement.scrollIntoView({
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
// Check if Tiny Slider is actually included before trying to initialize it!
if (typeof tns === 'function' && document.querySelector('.testimonial-slider')) {
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
            // IMPORTANT: Handle form submission here (using a third-party service)!
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
document.getElementById("copyright-year").textContent = new Date().getFullYear();
</script>
