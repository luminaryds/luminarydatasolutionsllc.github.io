// script.js
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle'); // Optional: for burger animation
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            navLinks.classList.remove('nav-active'); // Close nav on click (mobile)
            burger.classList.remove('toggle');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
