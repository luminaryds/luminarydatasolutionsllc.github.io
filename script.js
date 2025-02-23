// script.js
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
// Get the current year for the copyright
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();
