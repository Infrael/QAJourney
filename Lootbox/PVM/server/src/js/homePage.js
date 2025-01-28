const loginLink = document.getElementById('loginLink');
const modal = document.getElementById('loginModal');
const closeBtn = modal.querySelector('.close');

// Open modal on clicking "Login"
loginLink.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Close modal on clicking the close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
