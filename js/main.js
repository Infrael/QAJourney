/**
 * Main JavaScript for Žilvinas Martišius Portfolio
 * Author: Manus AI
 * Date: April 2025
 */

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const header = document.getElementById('header');
const experienceSearch = document.getElementById('experience-search');
const experienceList = document.getElementById('experience-list');
const searchResultsCount = document.getElementById('search-results-count');
const noResults = document.getElementById('no-results');
const clearSearchBtn = document.getElementById('clear-search');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');
const submitButton = document.getElementById('submit-button');
const currentYearSpan = document.getElementById('current-year');

// Get CV data from the embedded JSON
const cvData = JSON.parse(document.getElementById('cv-data').textContent);
const experiences = cvData.experience;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Render experience items
    renderExperienceItems(experiences);
    
    // Initialize event listeners
    initEventListeners();
});

// Initialize all event listeners
function initEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Experience search
    if (experienceSearch) {
        experienceSearch.addEventListener('input', handleExperienceSearch);
    }
    
    // Clear search button
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    
    // Toggle hamburger to X animation
    const bars = mobileMenuBtn.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
}

// Render experience items
function renderExperienceItems(items) {
    experienceList.innerHTML = '';
    
    items.forEach(exp => {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        
        // Create tags HTML
        let tagsHtml = '';
        if (exp.tags && exp.tags.length > 0) {
            tagsHtml = `
                <div class="tags">
                    ${exp.tags.map(tag => `<span class="tag blue-tag">${tag}</span>`).join('')}
                </div>
            `;
        }
        
        experienceItem.innerHTML = `
            <h3>${exp.title}</h3>
            <div class="experience-meta">
                <span class="experience-company">${exp.company}</span>
                <span class="experience-date">${exp.date}</span>
            </div>
            <p class="experience-description">${exp.description}</p>
            ${tagsHtml}
        `;
        
        experienceList.appendChild(experienceItem);
    });
    
    // Update search results count
    updateSearchResultsCount(items.length);
}

// Handle experience search
function handleExperienceSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderExperienceItems(experiences);
        noResults.classList.add('hidden');
        return;
    }
    
    const filteredExperiences = experiences.filter(exp => 
        exp.title.toLowerCase().includes(searchTerm) ||
        exp.company.toLowerCase().includes(searchTerm) ||
        exp.description.toLowerCase().includes(searchTerm) ||
        (exp.tags && exp.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
    
    if (filteredExperiences.length > 0) {
        renderExperienceItems(filteredExperiences);
        noResults.classList.add('hidden');
    } else {
        experienceList.innerHTML = '';
        noResults.classList.remove('hidden');
    }
}

// Clear search
function clearSearch() {
    experienceSearch.value = '';
    renderExperienceItems(experiences);
    noResults.classList.add('hidden');
}

// Update search results count
function updateSearchResultsCount(count) {
    if (!experienceSearch.value.trim()) {
        searchResultsCount.textContent = '';
        return;
    }
    
    searchResultsCount.textContent = `Showing ${count} ${count === 1 ? 'result' : 'results'} ${count !== experiences.length ? `out of ${experiences.length}` : ''}`;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    formSuccess.classList.add('hidden');
    formError.classList.add('hidden');
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validate form
    let isValid = true;
    
    if (!name || name.trim() === '') {
        document.getElementById('name-error').textContent = 'Name is required';
        isValid = false;
    }
    
    if (!email || email.trim() === '') {
        document.getElementById('email-error').textContent = 'Email is required';
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    if (!message || message.trim() === '') {
        document.getElementById('message-error').textContent = 'Message is required';
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Simulate form submission
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Show success message
        formSuccess.classList.remove('hidden');
        contactForm.reset();
        
        // Reset button
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 5000);
    }, 1500);
}
