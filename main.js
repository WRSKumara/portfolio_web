document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('#navbar');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    hamburger.addEventListener('click', function() {
        navbar.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after click
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Active link state on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Typing animation for home section
    const typingElement = document.querySelector('.typing');
    const professions = ['Web Developer', 'UI Designer', 'Freelancer', 'Frontend Expert'];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    
    function typeEffect() {
        const currentProfession = professions[professionIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 100;
        } else {
            typingElement.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }
        
        if (!isDeleting && charIndex === currentProfession.length) {
            isDeleting = true;
            typingDelay = 1000; // Delay before deleting starts
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingDelay = 500; // Delay before typing next profession
        }
        
        setTimeout(typeEffect, typingDelay);
    }
    
    // Start typing animation
    setTimeout(typeEffect, 1000);
    
    // Animate skill bars on scroll
    const skillSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-per');
    
    let skillsAnimated = false;
    
    function animateSkills() {
        if (window.scrollY > skillSection.offsetTop - 500 && !skillsAnimated) {
            skillBars.forEach(skill => {
                const width = skill.style.width;
                skill.style.width = "0";
                setTimeout(() => {
                    skill.style.width = width;
                    skill.style.transition = "width 1.5s ease";
                }, 200);
            });
            skillsAnimated = true;
        }
    }
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.skill-box, .project-card, .contact-item');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
            }
        });
        
        animateSkills();
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check in case elements are already in view
    revealOnScroll();
    
    // Add shadow to header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});