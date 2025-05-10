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

const cvData = await (await fetch('data/data.json')).json();

renderRandomSkills();
renderExperienceItems(cvData.experience);

initEventListeners();

function initEventListeners() {
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (experienceSearch) {
        experienceSearch.addEventListener('input', handleExperienceSearch);
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            
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
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    
    const bars = mobileMenuBtn.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
}

function getRandomSkills(skills, count = 7) {
    const shuffled = [...skills].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function renderRandomSkills() {
    const skillContainer = document.getElementById('skills-tags');
    if (!skillContainer) return;
    const randomSkills = getRandomSkills(cvData.skills, 10);
    skillContainer.innerHTML = randomSkills.map(skill => `<span class="tag blue-tag">${skill}</span>`).join('');
}

function renderExperienceItems(items) {
    experienceList.innerHTML = '';
    
    items.forEach(exp => {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        
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
    
    updateSearchResultsCount(items.length);
}

function handleExperienceSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
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

function clearSearch() {
    experienceSearch.value = '';
    renderExperienceItems(experiences);
    noResults.classList.add('hidden');
}

function updateSearchResultsCount(count) {
    if (!experienceSearch.value.trim()) {
        searchResultsCount.textContent = '';
        return;
    }
    
    searchResultsCount.textContent = `Showing ${count} ${count === 1 ? 'result' : 'results'} ${count !== experiences.length ? `out of ${experiences.length}` : ''}`;
}

function handleFormSubmit(e) {
    e.preventDefault();

    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    formSuccess.classList.add('hidden');
    formError.classList.add('hidden');

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    let isValid = true;

    if (!name.trim()) {
        document.getElementById('name-error').textContent = 'Name is required';
        isValid = false;
    }

    if (!email.trim()) {
        document.getElementById('email-error').textContent = 'Email is required';
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (!message.trim()) {
        document.getElementById('message-error').textContent = 'Message is required';
        isValid = false;
    }

    if (!isValid) return;

    const mailto = `mailto:martisius.z@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
}
