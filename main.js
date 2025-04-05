// Animate skill bars on scroll
function setupSkillBars() {
    const skillSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-per');
    
    // Set initial width to 0
    skillBars.forEach(skill => {
        const finalWidth = skill.className.includes('html') ? '90%' : 
                          skill.className.includes('css') ? '85%' : 
                          skill.className.includes('javascript') ? '75%' : 
                          skill.className.includes('php') ? '70%' : '0%';
        
        // Store the final width as a data attribute
        skill.setAttribute('data-width', finalWidth);
        skill.style.width = '0%';
    });
    
    let skillsAnimated = false;
    
    function animateSkills() {
        const sectionPosition = skillSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition && !skillsAnimated) {
            skillBars.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.width = skill.getAttribute('data-width');
                    skill.style.transition = "width 1.5s ease";
                }, index * 200); // Staggered animation
            });
            skillsAnimated = true;
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateSkills);
    
    // Initial check
    animateSkills();
}

// Reveal elements on scroll with staggered animation
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.skill-box, .project-card, .contact-item');
    
    revealElements.forEach(element => {
        // Set initial state
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    
    function revealOnScroll() {
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                setTimeout(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }, index * 100); // Staggered animation
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check
    revealOnScroll();
}

// Typing Animation using Typed.js
function setupTypingAnimation() {
    new Typed('.typing', {
        strings: ['Web Developer','Mobile App Developer', 'UI/UX Designer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        backDelay: 1500
    });
}






// Minimize Header on Scroll
document.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('minimized');
    } else {
        header.classList.remove('minimized');
    }
});

// Hamburger Menu Toggle for Mobile
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('nav');

    hamburger.addEventListener('click', function () {
        navbar.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add our new functions
    setupSkillBars();
    setupScrollReveal();
    setupTypingAnimation();
    setupSkillsMouseover(); // Add mouse-over animation for skills
    setupEducationMouseover(); // Add mouse-over animation for education section
    //setupEducationCardMouseover(); // Initialize the animation for education cards
});

// Add mouse-over animation for education cards
document.addEventListener("DOMContentLoaded", () => {
    const educationCards = document.querySelectorAll(".education-card");

    educationCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.052)";
            card.style.boxShadow = "0 10px 25px rgba(14, 255, 241, 0.5)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
            card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
        });
    });
});

// Adjust section sizes to viewport height
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    function adjustSectionSizes() {
        const viewportHeight = window.innerHeight;

        sections.forEach(section => {
            section.style.minHeight = `${viewportHeight}px`; // Set each section to the viewport height
        });
    }

    // Adjust sizes on page load
    adjustSectionSizes();

    // Adjust sizes on window resize
    window.addEventListener("resize", adjustSectionSizes);
});


document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillCategories = document.querySelectorAll('.skill-category');
                skillCategories.forEach((category, index) => {
                    setTimeout(() => {
                        category.classList.add('animate-in');
                        const progressBars = category.querySelectorAll('.skill-progress');
                        progressBars.forEach(bar => {
                            // Get the class name that contains progress info
                            const progressClass = bar.classList[1];
                            
                            // Set width based on class name
                            if (progressClass.includes('javascript')) bar.style.width = '85%';
                            else if (progressClass.includes('java-progress')) bar.style.width = '80%';
                            else if (progressClass.includes('php')) bar.style.width = '90%';
                            else if (progressClass.includes('python')) bar.style.width = '80%';
                            // Frameworks
                            else if (progressClass.includes('reactjs')) bar.style.width = '85%';
                            else if (progressClass.includes('nodejs')) bar.style.width = '80%';
                            else if (progressClass.includes('laravel')) bar.style.width = '70%';
                            else if (progressClass.includes('bootstrap')) bar.style.width = '60%';
                            else if (progressClass.includes('expressjs')) bar.style.width = '75%';
                            // Professional Skills
                            else if (progressClass.includes('problem-solving')) bar.style.width = '60%';
                            else if (progressClass.includes('communication')) bar.style.width = '65%';
                            else if (progressClass.includes('leadership')) bar.style.width = '60%';
                            else if (progressClass.includes('project-management')) bar.style.width = '70%';
                            else if (progressClass.includes('time-management')) bar.style.width = '85%';
                            else bar.style.width = '0%';
                        });
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(document.querySelector('#skills'));
});


// Read More button functionality
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.getElementById('read-more-btn');
    const moreContent = document.getElementById('more-content');
    
    readMoreBtn.addEventListener('click', function() {
        if (moreContent.style.display === 'block') {
            moreContent.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
        } else {
            moreContent.style.display = 'block';
            readMoreBtn.textContent = 'Read Less';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove 'active' class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });
});