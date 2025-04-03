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

// Add mouse-over animation for My Skills section cards
function setupSkillsMouseover() {
    const skillCards = document.querySelectorAll('.skill-category'); // Target skill cards

    skillCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)'; // Slightly enlarge the card
            card.style.boxShadow = '0 10px 25px rgba(14, 255, 241, 0.3)'; // Add a glowing shadow
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; // Smooth transition
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)'; // Reset to original size
            card.style.boxShadow = 'none'; // Remove the shadow
        });
    });
}

// Add mouse-over animation for Education Section
function setupEducationMouseover() {
    const educationItems = document.querySelectorAll('.education-item'); // Target education items

    educationItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.05)'; // Slightly enlarge the item
            item.style.boxShadow = '0 10px 25px rgba(14, 255, 241, 0.3)'; // Add a glowing shadow
            item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; // Smooth transition
        });

        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)'; // Reset to original size
            item.style.boxShadow = 'none'; // Remove the shadow
        });
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

    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);

        // Submit to the first action (FormSubmit.co)
        fetch('https://formsubmit.co/db8c9156adcb66c69b276febb23b1b65', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to submit to FormSubmit.co');
                }
                return response.text();
            })
            .then(data => {
                console.log('Submitted to FormSubmit.co:', data);
            })
            .catch(error => {
                console.error('Error submitting to FormSubmit.co:', error);
            });

        // Submit to the second action (form.php)
        fetch('form.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to submit to form.php');
                }
                return response.text();
            })
            .then(data => {
                console.log('Submitted to form.php:', data);
                alert('Your message has been sent successfully!');
            })
            .catch(error => {
                console.error('Error submitting to form.php:', error);
            });

        // Optionally reset the form after submission
        form.reset();
    });
});
