// Project Data
const projectData = [
    {
        id: 1,
        title: "E-Commerce Platform Redesign",
        description: "A complete redesign of an e-commerce platform with focus on user experience and conversion optimization.",
        imageBgColor: "#4158D0",
        imageGradient: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        tags: ["UX Design", "Web Development", "Conversion Optimization"],
        category: "web",
        featured: true,
        link: "#"
    },
    {
        id: 2,
        title: "Finance Management Mobile App",
        description: "An intuitive finance management app that helps users track expenses and manage budgets efficiently.",
        imageBgColor: "#0093E9",
        imageGradient: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        tags: ["Mobile Development", "UI Design", "FinTech"],
        category: "mobile",
        featured: true,
        link: "#"
    },
    {
        id: 3,
        title: "Healthcare Patient Portal",
        description: "A secure patient portal for healthcare providers, enabling seamless communication and record access.",
        imageBgColor: "#8EC5FC",
        imageGradient: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
        tags: ["Web Development", "Security", "Healthcare"],
        category: "web",
        featured: false,
        link: "#"
    },
    {
        id: 4,
        title: "Restaurant Ordering System",
        description: "A digital ordering system for restaurants with real-time order tracking and inventory management.",
        imageBgColor: "#FF9A8B",
        imageGradient: "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
        tags: ["Web App", "Mobile App", "UI/UX Design"],
        category: "ui",
        featured: true,
        link: "#"
    },
    {
        id: 5,
        title: "Fitness Tracking Application",
        description: "A comprehensive fitness tracking app with workout plans, nutrition tracking, and progress analytics.",
        imageBgColor: "#85FFBD",
        imageGradient: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
        tags: ["Mobile Development", "Health & Fitness", "Data Analytics"],
        category: "mobile",
        featured: false,
        link: "#"
    },
    {
        id: 6,
        title: "Corporate Branding Redesign",
        description: "A complete corporate identity redesign including logo, brand guidelines, and marketing materials.",
        imageBgColor: "#FA8BFF",
        imageGradient: "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
        tags: ["Branding", "Graphic Design", "UI Design"],
        category: "ui",
        featured: false,
        link: "#"
    },
    {
        id: 7,
        title: "Cybersecurity Assessment Platform",
        description: "Enterprise-grade security assessment tool for identifying vulnerabilities and providing remediation strategies.",
        imageBgColor: "#FF3CAC",
        imageGradient: "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
        tags: ["Security", "Enterprise", "Web Development"],
        category: "web",
        featured: true,
        link: "#"
    },
    {
        id: 8,
        title: "Smart Home Automation App",
        description: "IoT control system allowing users to manage all smart home devices from a single intuitive interface.",
        imageBgColor: "#08AEEA",
        imageGradient: "linear-gradient(45deg, #08AEEA 0%, #2AF598 100%)",
        tags: ["IoT", "Mobile Development", "UI Design"],
        category: "mobile",
        featured: true,
        link: "#"
    }
];

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const featuredProjectsGrid = document.getElementById('featuredProjects');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('projectSearch');
const loadMoreBtn = document.querySelector('.load-more-btn');
const contactForm = document.querySelector('.contact-form');

// State
let visibleProjects = 3; // Initially show 3 projects
let currentCategory = 'all';
let searchQuery = '';

// Create a project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image">
            <div style="background: ${project.imageGradient || project.imageBgColor}; width: 100%; height: 100%;"></div>
            <div class="project-overlay">
                <a href="${project.link}" class="project-link" aria-label="View project">
                    <i class="fas fa-link"></i>
                </a>
            </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
            <p>${project.description}</p>
                <div class="project-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Load featured projects on the home page
function loadFeaturedProjects() {
    if (featuredProjectsGrid) {
        const featuredProjects = projectData.filter(project => project.featured);
        
        // Clear the grid
        featuredProjectsGrid.innerHTML = '';
        
        // Add featured projects
        featuredProjects.forEach((project, index) => {
            const card = createProjectCard(project);
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
            featuredProjectsGrid.appendChild(card);
        });
    }
}

// Initialize projects
function initProjects() {
    // Filter projects based on current category and search query
    const filteredProjects = projectData.filter(project => {
        const matchesCategory = currentCategory === 'all' || project.category === currentCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesSearch;
    });
    
    // Clear projects grid
    if (projectsGrid) {
        projectsGrid.innerHTML = '';
        
        // Add filtered projects up to the visible limit
        const projectsToShow = filteredProjects.slice(0, visibleProjects);
        projectsToShow.forEach(project => {
            projectsGrid.appendChild(createProjectCard(project));
        });
        
        // Toggle load more button visibility
        if (loadMoreBtn) {
            if (projectsToShow.length < filteredProjects.length) {
                loadMoreBtn.style.display = 'inline-flex';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        // Show "no projects found" message if needed
        if (filteredProjects.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
                <h3>No projects found</h3>
                <p>Try adjusting your search or filter criteria</p>
            `;
            projectsGrid.appendChild(noResults);
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        }
    }
}

// Event Listeners
if (filterButtons) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update category and reset visible projects
            currentCategory = button.getAttribute('data-category');
            visibleProjects = 3;
            
            // Reinitialize projects
            initProjects();
        });
    });
}

if (searchInput) {
    searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value;
        visibleProjects = 3;
        initProjects();
    });
}

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        visibleProjects += 3;
        initProjects();
    });
}

// Initialize projects on page load
window.addEventListener('DOMContentLoaded', () => {
    initProjects();
    loadFeaturedProjects();
});

// Handle contact form submission with Formspree
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add event listener for form submission
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default, let the form submit to Formspree
            
            // Show a loading state on the button
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // We'll handle the success and error states when the form redirects back
            // Formspree will handle the actual form submission
        });
        
        // Check if there's a URL parameter indicating form submission status
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('success')) {
            if (urlParams.get('success') === 'true') {
                // Show success message
                showNotification('Your message has been sent successfully! We\'ll get back to you soon.', 'success');
            } else {
                // Show error message
                showNotification('There was an error sending your message. Please try again.', 'error');
            }
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
});

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles to the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.background = type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3';
    notification.style.color = 'white';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Animate notification entrance
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto remove notification
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Setup event listeners
if (filterButtons) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.category);
        });
    });
}

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProjects(e.target.value);
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            loadProjects();
            updateLoadMoreButton();
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

// Handle navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar background opacity based on scroll
    const scrollProgress = Math.min(currentScroll / 500, 1);
    navbar.style.backgroundColor = `rgba(255, 255, 255, ${0.95 + (scrollProgress * 0.05)})`;
    
    // Add shadow when scrolled
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Handle scroll direction
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } else {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Enhanced Mobile Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileNavToggle && navLinks) {
    // Add mobile nav toggle button if it doesn't exist
    if (!document.querySelector('.mobile-nav-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'mobile-nav-toggle';
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        navbar.querySelector('.container').appendChild(toggle);
    }

    // Toggle mobile navigation
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileNavToggle.querySelector('i');
        if (icon) {
            icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileNavToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileNavToggle.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    });

    // Close mobile nav when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileNavToggle.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Image preview for project form
const projectImageInput = document.querySelector('#projectImage');
const imagePreview = document.querySelector('#imagePreview');

if (projectImageInput && imagePreview) {
    projectImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}

// Add intersection observer for smooth animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe elements with animations
    const animatedElements = document.querySelectorAll('.services-grid, .projects-grid, .footer-grid, .hero-content, h1, h2, h3, p');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Ensure text visibility after fonts are loaded
    document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
    });
});

// Login Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const passwordToggle = document.querySelector('.password-toggle');

    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const toggleIcon = this.querySelector('i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.querySelector('input[name="remember"]').checked;

            // Add your authentication logic here
            // For demo purposes, we'll just redirect to a dashboard
            console.log('Login attempt:', { username, password, rememberMe });
            
            // Simulate loading state
            const submitBtn = this.querySelector('.login-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Redirect to dashboard (replace with actual authentication)
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
});

// Enhanced Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation active states and section visibility
    const navItems = document.querySelectorAll('.dashboard-nav-item[data-section]');
    const sections = document.querySelectorAll('.dashboard-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            // Update navigation states
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Update section visibility
            sections.forEach(section => {
                if (section.id === targetSection) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // Load projects dynamically with enhanced data
    const projectsGrid = document.querySelector('#recentProjects');
    if (projectsGrid) {
        const projects = [
            {
                title: 'E-commerce Website',
                description: 'Modern online shopping platform with real-time inventory',
                status: 'In Progress',
                progress: 60,
                team: ['John D.', 'Sarah M.'],
                deadline: '2024-03-30',
                priority: 'High'
            },
            {
                title: 'Mobile Banking App',
                description: 'Secure financial transactions application',
                status: 'Review',
                progress: 85,
                team: ['Mike R.', 'Anna K.'],
                deadline: '2024-04-15',
                priority: 'Medium'
            },
            {
                title: 'Portfolio Website',
                description: 'Creative showcase platform for artists',
                status: 'Planning',
                progress: 30,
                team: ['Tom B.'],
                deadline: '2024-05-01',
                priority: 'Low'
            }
        ];

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <span class="priority-badge ${project.priority.toLowerCase()}">${project.priority}</span>
                </div>
                <p>${project.description}</p>
                <div class="project-meta">
                    <div class="team-avatars">
                        ${project.team.map(member => `
                            <div class="team-member" title="${member}">
                                ${member.charAt(0)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="deadline">
                        <i class="fas fa-calendar"></i>
                        <span>${new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="project-status">
                    <span class="status-badge ${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                    <span class="progress-text">${project.progress}%</span>
                </div>
                <div class="project-actions">
                    <button class="project-btn" title="Edit Project">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="project-btn" title="Project Settings">
                        <i class="fas fa-cog"></i>
                    </button>
                    <button class="project-btn" title="Delete Project">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    }

    // Handle export functionality with enhanced feedback
    const exportBtn = document.querySelector('.dashboard-btn-secondary');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Report...';
            this.disabled = true;

            // Simulate export process with multiple steps
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Compiling Data...';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Formatting...';
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-check"></i> Report Ready!';
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.disabled = false;
                            // Trigger download simulation
                            const link = document.createElement('a');
                            link.download = 'dashboard-report.pdf';
                            link.href = '#';
                            link.click();
                        }, 1000);
                    }, 800);
                }, 800);
            }, 800);
        });
    }

    // Handle new project button with modal
    const newProjectBtn = document.querySelector('.dashboard-btn-primary');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', function() {
            // Here you would typically show a modal
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Create New Project</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <form id="newProjectForm">
                        <div class="form-group">
                            <label for="projectTitle">Project Title</label>
                            <input type="text" id="projectTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="projectDescription">Description</label>
                            <textarea id="projectDescription" required></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-secondary">Cancel</button>
                            <button type="submit" class="btn-primary">Create Project</button>
                        </div>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            // Handle modal close
            const closeBtn = modal.querySelector('.close-modal');
            const cancelBtn = modal.querySelector('.btn-secondary');
            const closeModal = () => {
                modal.classList.add('fade-out');
                setTimeout(() => modal.remove(), 300);
            };

            closeBtn.addEventListener('click', closeModal);
            cancelBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', e => {
                if (e.target === modal) closeModal();
            });

            // Handle form submission
            const form = modal.querySelector('#newProjectForm');
            form.addEventListener('submit', e => {
                e.preventDefault();
                // Here you would typically handle the form data
                closeModal();
                showNotification('Project created successfully!', 'success');
            });

            // Animate modal entrance
            setTimeout(() => modal.classList.add('show'), 10);
        });
    }

    // Handle message actions with enhanced animations
    const messageButtons = document.querySelectorAll('.message-btn');
    messageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').classList.contains('fa-reply') ? 'reply' : 'delete';
            const messageCard = this.closest('.message-card');
            
            if (action === 'reply') {
                // Show reply form
                const replyForm = document.createElement('div');
                replyForm.className = 'reply-form';
                replyForm.innerHTML = `
                    <textarea placeholder="Type your reply..."></textarea>
                    <div class="form-actions">
                        <button class="btn-secondary">Cancel</button>
                        <button class="btn-primary">Send Reply</button>
                    </div>
                `;
                
                messageCard.appendChild(replyForm);
                const textarea = replyForm.querySelector('textarea');
                textarea.focus();

                // Handle reply form actions
                const cancelBtn = replyForm.querySelector('.btn-secondary');
                const sendBtn = replyForm.querySelector('.btn-primary');

                cancelBtn.addEventListener('click', () => {
                    replyForm.classList.add('fade-out');
                    setTimeout(() => replyForm.remove(), 300);
                });

                sendBtn.addEventListener('click', () => {
                    const replyText = textarea.value.trim();
                    if (replyText) {
                        showNotification('Reply sent successfully!', 'success');
                        replyForm.remove();
                    }
                });
            } else {
                // Enhanced delete animation
                messageCard.style.height = messageCard.offsetHeight + 'px';
                messageCard.classList.add('deleting');
                
                setTimeout(() => {
                    messageCard.style.height = '0';
                    messageCard.style.opacity = '0';
                    messageCard.style.margin = '0';
                    messageCard.style.padding = '0';
                    
                    setTimeout(() => {
                        messageCard.remove();
                        showNotification('Message deleted successfully!', 'success');
                    }, 300);
                }, 100);
            }
        });
    });
});

// Navbar Scroll Animation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Load project items with AOS animations for scroll effects
function loadProjects(projects) {
    const projectsGrid = document.getElementById('featuredProjects') || document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.setAttribute('data-aos-delay', (index * 100).toString());
        
        // Project card HTML structure
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <a href="${project.link}" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Add page transition element to the DOM
document.addEventListener('DOMContentLoaded', function() {
    // Create page transition element
    const pageTransition = document.createElement('div');
    pageTransition.classList.add('page-transition');
    document.body.appendChild(pageTransition);
    
    // Handle internal link transitions
    document.querySelectorAll('a[href^="index"], a[href^="projects"], a[href^="contact"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) {
                e.preventDefault();
                pageTransition.classList.add('active');
                
    setTimeout(() => {
                    window.location.href = href;
                }, 600);
} 
        });
    });
});

// Mouse Circle + Dot Effect with dynamic color
(function() {
  if (window.innerWidth < 900) return;
  const circle = document.createElement('div');
  circle.className = 'mouse-circle';
  const dot = document.createElement('div');
  dot.className = 'mouse-dot';
  document.body.appendChild(circle);
  document.body.appendChild(dot);
  let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
  let circleX = mouseX, circleY = mouseY;
  let dotX = mouseX, dotY = mouseY;
  let isOnDark = false;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Detect if over dark background
    const el = document.elementFromPoint(e.clientX, e.clientY);
    let dark = false;
    if (el) {
      let bg = window.getComputedStyle(el).backgroundColor;
      if (bg && (bg.includes('rgb(17, 17, 17)') || bg.includes('rgb(0, 0, 0)') || bg.includes('#111') || bg.includes('#000'))) {
        dark = true;
      }
      // Also check parent if transparent
      if (!dark && bg && (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && el.parentElement) {
        let parentBg = window.getComputedStyle(el.parentElement).backgroundColor;
        if (parentBg && (parentBg.includes('rgb(17, 17, 17)') || parentBg.includes('rgb(0, 0, 0)') || parentBg.includes('#111') || parentBg.includes('#000'))) {
          dark = true;
        }
      }
    }
    if (dark !== isOnDark) {
      isOnDark = dark;
      if (isOnDark) {
        circle.style.borderColor = '#fff';
        circle.style.background = 'rgba(255,255,255,0.12)';
        dot.style.background = '#fff';
      } else {
        circle.style.borderColor = '#111';
        circle.style.background = 'rgba(0,0,0,0.08)';
        dot.style.background = '#111';
      }
    }
  });
  function animate() {
    // Smooth follow for circle
    circleX += (mouseX - circleX) * 0.18;
    circleY += (mouseY - circleY) * 0.18;
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;
    circle.style.left = circleX + 'px';
    circle.style.top = circleY + 'px';
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

// About Section Image Scroll
document.addEventListener('DOMContentLoaded', () => {
    const imageTrack = document.querySelector('.image-cards-track');
    const imageContainer = document.querySelector('.image-cards-container');
    
    if (imageTrack && imageContainer) {
        // Pause animation on hover
        imageContainer.addEventListener('mouseenter', () => {
            imageTrack.style.animationPlayState = 'paused';
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            imageTrack.style.animationPlayState = 'running';
        });
        
        // Handle touch devices
        if ('ontouchstart' in window) {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            imageContainer.addEventListener('touchstart', (e) => {
                isDown = true;
                imageContainer.style.cursor = 'grabbing';
                startX = e.touches[0].pageX - imageContainer.offsetLeft;
                scrollLeft = imageContainer.scrollLeft;
            });
            
            imageContainer.addEventListener('touchend', () => {
                isDown = false;
                imageContainer.style.cursor = 'grab';
            });
            
            imageContainer.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.touches[0].pageX - imageContainer.offsetLeft;
                const walk = (x - startX) * 2;
                imageContainer.scrollLeft = scrollLeft - walk;
            });
        }
    }
}); 