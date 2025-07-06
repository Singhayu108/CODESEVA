// Admin Dashboard JavaScript

// DOM Elements
const projectForm = document.querySelector('#projectForm');
const addProjectBtn = document.querySelector('#addProjectBtn');
const cancelProjectBtn = document.querySelector('#cancelProjectBtn');
const newProjectForm = document.querySelector('#newProjectForm');
const projectsTable = document.querySelector('#projectsTable tbody');
const messagesTable = document.querySelector('#messagesTable tbody');
const settingsForm = document.querySelector('#settingsForm');
const logoutBtn = document.querySelector('#logoutBtn');

// Sample data (replace with actual data from your backend)
const projects = [
    {
        id: 1,
        title: 'E-commerce Website',
        description: 'A modern e-commerce platform with advanced features and responsive design.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        image: 'assets/images/projects/ecommerce.jpg',
        link: '#',
        demoUrl: '#',
        caseStudyUrl: '#'
    },
    {
        id: 2,
        title: 'Mobile Banking App',
        description: 'A secure and user-friendly mobile banking application for iOS and Android.',
        technologies: ['React Native', 'Firebase', 'Redux'],
        image: 'assets/images/projects/banking.jpg',
        link: '#',
        demoUrl: '#',
        caseStudyUrl: '#'
    }
];

const messages = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'I would like to discuss a potential project with your team.',
        date: '2024-02-20'
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        subject: 'Partnership Opportunity',
        message: 'We are interested in exploring a partnership with your company.',
        date: '2024-02-19'
    }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadMessages();
    setupEventListeners();
});

// Load projects into table
function loadProjects() {
    if (!projectsTable) return;

    const projectsHTML = projects.map(project => `
        <tr>
            <td>${project.title}</td>
            <td>${project.technologies.join(', ')}</td>
            <td>
                <button class="btn btn-edit" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-delete" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    projectsTable.innerHTML = projectsHTML;
}

// Load messages into table
function loadMessages() {
    if (!messagesTable) return;

    const messagesHTML = messages.map(message => `
        <tr>
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.subject}</td>
            <td>${message.date}</td>
            <td>
                <button class="btn btn-view" onclick="viewMessage(${message.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-delete" onclick="deleteMessage(${message.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');

    messagesTable.innerHTML = messagesHTML;
}

// Setup event listeners
function setupEventListeners() {
    // Add project button
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => {
            newProjectForm.style.display = 'block';
        });
    }

    // Cancel project button
    if (cancelProjectBtn) {
        cancelProjectBtn.addEventListener('click', () => {
            newProjectForm.style.display = 'none';
            projectForm.reset();
        });
    }

    // Project form submission
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectSubmit);
    }

    // Settings form submission
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettingsSubmit);
    }

    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Sidebar navigation
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            showSection(section);
        });
    });
}

// Handle project form submission
async function handleProjectSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // Here you would typically send the data to your server
        console.log('Project data:', data);
        
        // Show success message
        alert('Project added successfully!');
        e.target.reset();
        newProjectForm.style.display = 'none';
        loadProjects(); // Reload projects table
    } catch (error) {
        console.error('Error adding project:', error);
        alert('There was an error adding the project. Please try again later.');
    }
}

// Handle settings form submission
async function handleSettingsSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // Here you would typically send the data to your server
        console.log('Settings data:', data);
        
        // Show success message
        alert('Settings updated successfully!');
    } catch (error) {
        console.error('Error updating settings:', error);
        alert('There was an error updating settings. Please try again later.');
    }
}

// Edit project
function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    // Populate form with project data
    const form = projectForm;
    form.title.value = project.title;
    form.description.value = project.description;
    form.technologies.value = project.technologies.join(', ');
    form.link.value = project.link;
    form.demoUrl.value = project.demoUrl;
    form.caseStudyUrl.value = project.caseStudyUrl;

    // Show form
    newProjectForm.style.display = 'block';
}

// Delete project
function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        // Here you would typically send a delete request to your server
        console.log('Deleting project:', id);
        
        // Remove project from table
        const row = projectsTable.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            row.remove();
        }
    }
}

// View message
function viewMessage(id) {
    const message = messages.find(m => m.id === id);
    if (!message) return;

    // Show message details in a modal or alert
    alert(`
        From: ${message.name} (${message.email})
        Subject: ${message.subject}
        Date: ${message.date}
        Message: ${message.message}
    `);
}

// Delete message
function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        // Here you would typically send a delete request to your server
        console.log('Deleting message:', id);
        
        // Remove message from table
        const row = messagesTable.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            row.remove();
        }
    }
}

// Show section
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(s => {
        s.style.display = 'none';
    });

    // Show selected section
    const selectedSection = document.querySelector(`#${section}Section`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Update active state in sidebar
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === section) {
            link.classList.add('active');
        }
    });
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Here you would typically clear session data and redirect to login page
        window.location.href = 'login.html';
    }
}

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

document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.dashboard-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            // Update active link
            sidebarLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Show target section
            sections.forEach(section => {
                section.style.display = 'none';
                if (section.id === targetSection + 'Section') {
                    section.style.display = 'block';
                }
            });
        });
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your logout logic here
            window.location.href = 'login.html';
        });
    }

    // Settings form submission
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your settings update logic here
            alert('Settings updated successfully!');
        });
    }

    // Add project button functionality
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            // Add your project creation logic here
            alert('Add project functionality will be implemented here');
        });
    }

    // Initialize any dynamic content
    function initializeDashboard() {
        // Add any initialization logic here
        updateProjectsTable();
        updateMessagesTable();
    }

    // Update projects table
    function updateProjectsTable() {
        const projectsTableBody = document.querySelector('#projectsTable tbody');
        if (projectsTableBody) {
            // Sample data - replace with your actual data
            const projects = [
                { title: 'E-commerce Website', technologies: 'HTML, CSS, JavaScript' },
                { title: 'Mobile Banking App', technologies: 'React Native, Node.js' },
                { title: 'Portfolio Website', technologies: 'React, Next.js' }
            ];

            projectsTableBody.innerHTML = projects.map(project => `
                <tr>
                    <td>${project.title}</td>
                    <td>${project.technologies}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editProject('${project.title}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger" onclick="deleteProject('${project.title}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Update messages table
    function updateMessagesTable() {
        const messagesTableBody = document.querySelector('#messagesTable tbody');
        if (messagesTableBody) {
            // Sample data - replace with your actual data
            const messages = [
                { name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', date: '2024-02-20' },
                { name: 'Jane Smith', email: 'jane@example.com', subject: 'Collaboration Request', date: '2024-02-19' }
            ];

            messagesTableBody.innerHTML = messages.map(message => `
                <tr>
                    <td>${message.name}</td>
                    <td>${message.email}</td>
                    <td>${message.subject}</td>
                    <td>${message.date}</td>
                    <td>
                        <button class="btn btn-primary" onclick="viewMessage('${message.subject}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-danger" onclick="deleteMessage('${message.subject}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Initialize the dashboard
    initializeDashboard();
});

// Project actions
function editProject(title) {
    alert(`Edit project: ${title}`);
}

function deleteProject(title) {
    if (confirm(`Are you sure you want to delete project: ${title}?`)) {
        // Add your delete logic here
        alert(`Project deleted: ${title}`);
    }
}

// Message actions
function viewMessage(subject) {
    alert(`View message: ${subject}`);
}

function deleteMessage(subject) {
    if (confirm(`Are you sure you want to delete message: ${subject}?`)) {
        // Add your delete logic here
        alert(`Message deleted: ${subject}`);
    }
} 