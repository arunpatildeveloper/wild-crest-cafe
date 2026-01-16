// Wild Crest Premium Café - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE NAVIGATION ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        }
    });
    
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========== MENU PAGE TAB FUNCTIONALITY ==========
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab with animation
                menuTabs.forEach(t => {
                    t.classList.remove('active');
                    t.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        t.style.transform = 'scale(1)';
                    }, 50);
                });
                
                this.classList.add('active');
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Show active menu section with fade effect
                menuSections.forEach(section => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    section.classList.remove('active');
                    
                    setTimeout(() => {
                        if (section.id === tabId + '-menu') {
                            section.classList.add('active');
                            setTimeout(() => {
                                section.style.opacity = '1';
                                section.style.transform = 'translateY(0)';
                            }, 50);
                        }
                    }, 200);
                });
                
                // Scroll to menu section on mobile
                if (window.innerWidth < 768) {
                    const menuNavSection = document.querySelector('.menu-nav-section');
                    const offset = menuNavSection.offsetTop - 80;
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========== HERO GALLERY INTERACTIONS ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    // ========== LAZY LOAD IMAGES ==========
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    images.forEach(img => {
        if (!img.classList.contains('loaded')) {
            imageObserver.observe(img);
        }
    });
    
    // ========== PARALLAX EFFECT FOR HERO ==========
    const hero = document.querySelector('.hero');
    const pageHero = document.querySelector('.page-hero');
    
    function updateParallax() {
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        if (pageHero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            pageHero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    }
    
    if (hero || pageHero) {
        window.addEventListener('scroll', updateParallax);
    }
    
    // ========== ANIMATE ELEMENTS ON SCROLL ==========
    const animateElements = document.querySelectorAll('.feature-card, .coffee-card, .menu-item, .location-card, .philosophy-card');
    
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        elementObserver.observe(element);
    });
    
    // ========== UPDATE COPYRIGHT YEAR ==========
    const currentYearElements = document.querySelectorAll('#current-year');
    
    if (currentYearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        currentYearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    // ========== FORM VALIDATION (if forms added later) ==========
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    
                    // Remove error style after 2 seconds
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (isValid) {
                // Form submission logic would go here
                console.log('Form submitted successfully!');
                this.reset();
            }
        });
    });
    
    // ========== PRELOADER (Optional) ==========
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500);
    });
});