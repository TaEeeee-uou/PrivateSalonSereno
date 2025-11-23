document.addEventListener("DOMContentLoaded", function () {
    // Hero Slider
    const heroBgs = document.querySelectorAll(".hero-bg");
    if (heroBgs.length > 1) {
        let current = 0;
        setInterval(() => {
            heroBgs[current].classList.remove("is-active");
            current = (current + 1) % heroBgs.length;
            heroBgs[current].classList.add("is-active");
        }, 5000);
    }

    // Scroll Animation for Section Titles
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        // Ideally we would animate specific elements, but for now let's just ensure
        // the CSS handles the animation classes if we add them.
        // In the CSS provided, I didn't add specific animation classes yet, 
        // but let's add a simple fade-in effect for sections.
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        observer.observe(section);
    });

    // Modify observer callback to handle the inline styles I just added
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => fadeObserver.observe(section));

    // Mobile Menu Toggle
    const navToggle = document.querySelector(".nav-toggle");
    const globalNav = document.querySelector(".global-nav");

    if (navToggle && globalNav) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("is-active");
            globalNav.classList.toggle("is-active");
        });

        // Close menu when a link is clicked
        const navLinks = globalNav.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("is-active");
                globalNav.classList.remove("is-active");
            });
        });
    }
});
