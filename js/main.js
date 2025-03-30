/*
* Ken Johansen - Professional Portfolio
* Python & React Developer | Kubernetes Specialist
* main.js
*/

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            
            // Uncomment and modify this code when you have a real backend
            /*
            fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message
                }),
            })
            .then(response => response.json())
            .then(data => {
                alert('Message sent successfully!');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again later.');
            });
            */
        });
    }
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .project-card, .skill-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .project-card, .skill-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate tech icons on page load
    function animateTechIcons() {
        const techIcons = document.querySelectorAll('.tech-icon-item');
        
        // Hide all icons initially
        techIcons.forEach(icon => {
            icon.style.opacity = '0';
            icon.style.transform = 'translateY(20px)';
        });
        
        // Animate icons with random delay
        techIcons.forEach((icon, index) => {
            const delay = Math.random() * 1.5 + 0.2; // Random delay between 0.2s and 1.7s
            
            setTimeout(() => {
                icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                icon.style.opacity = '1';
                icon.style.transform = 'translateY(0)';
            }, delay * 1000);
        });
    }
    
    // Call the tech icons animation on page load
    animateTechIcons();
    
    // Re-animate tech icons when about section comes into view
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTechIcons();
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutSection);
    }
    
    // Tech Icons Interaction
    const techIcons = document.querySelectorAll('.tech-icon-item');
    
    techIcons.forEach(icon => {
        // Add title as data attribute for tooltip
        const title = icon.getAttribute('title');
        if (title) {
            icon.setAttribute('data-title', title);
        }
        
        // Add event listeners for hover effects
        icon.addEventListener('mouseenter', function() {
            this.classList.add('active');
            
            // Add active class to icons with same title elsewhere on page
            const iconTitle = this.getAttribute('title');
            if (iconTitle) {
                document.querySelectorAll(`.tech-icon-item[title="${iconTitle}"]`).forEach(relatedIcon => {
                    relatedIcon.classList.add('highlight');
                });
                
                // Also highlight related skills in the skills section
                document.querySelectorAll(`.skill-item h4`).forEach(skillTitle => {
                    if (skillTitle.textContent.toLowerCase().includes(iconTitle.toLowerCase())) {
                        skillTitle.closest('.skill-item').classList.add('highlight');
                    }
                });
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            
            // Remove active class from all icons
            document.querySelectorAll('.tech-icon-item.highlight').forEach(icon => {
                icon.classList.remove('highlight');
            });
            
            // Remove highlight from skills
            document.querySelectorAll('.skill-item.highlight').forEach(skill => {
                skill.classList.remove('highlight');
            });
        });
    });
    
    // Enhance tech icons with color-matching for related skills
    function enhanceTechIconsInteractivity() {
        const techIcons = document.querySelectorAll('.tech-icon-item');
        const skillItems = document.querySelectorAll('.skill-item');
        
        // Create a mapping of icon colors
        const colorClasses = [
            '#FF416C', // Red
            '#FF4B2B', // Orange-Red
            '#F76B1C', // Orange
            '#FCAF45', // Yellow-Orange
            '#4776E6', // Blue
            '#6A5ACD', // Slate Blue
            '#8A2387', // Purple
            '#8A4FFF'  // Violet
        ];
        
        // Map skill items to colors based on categories
        const categoryColors = {
            'Programming Languages': colorClasses[0],
            'Frontend Development': colorClasses[1],
            'DevOps & Cloud': colorClasses[2],
            'Databases & Data': colorClasses[3],
            'Operating Systems': colorClasses[4],
            'Mobile Development': colorClasses[5],
            'Data Integration': colorClasses[6],
            'Other Skills': colorClasses[7]
        };
        
        // Apply category colors to skill progress bars
        skillItems.forEach(item => {
            const category = item.closest('.skills-category').querySelector('h3').textContent;
            const progressBar = item.querySelector('.skill-progress');
            
            for (const [key, color] of Object.entries(categoryColors)) {
                if (category.includes(key)) {
                    progressBar.style.backgroundColor = color;
                    break;
                }
            }
        });
        
        // Add shuffle animation button
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const shuffleButton = document.createElement('button');
            shuffleButton.className = 'shuffle-icons-btn';
            shuffleButton.innerHTML = '<i class="fas fa-random"></i> Shuffle Icons';
            shuffleButton.addEventListener('click', () => {
                // Reset and re-animate tech icons
                animateTechIcons();
            });
            
            const techIconsContainer = document.querySelector('.tech-icons');
            if (techIconsContainer && techIconsContainer.parentElement) {
                techIconsContainer.parentElement.appendChild(shuffleButton);
            }
        }
    }
    
    // Call the enhanced interactivity function
    enhanceTechIconsInteractivity();
});
