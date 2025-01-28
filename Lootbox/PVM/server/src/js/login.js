document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    console.log(response)
    if (result.success) {
        fetch('/pvm.html');
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

document.getElementById('registerButton').addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(document.getElementById('email'));

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    console.log(response)
    if (result.success) {
        alert('User Created!');
    } else {
        alert('Account Exists - maybe Reset Password instead?');
    }
});

document.getElementById('resetPasswordLink').addEventListener('click', function (event) {
    event.preventDefault();

    window.parent.document.getElementById('loginModal').style.display = 'none';

    window.open('mailto:boringSupport@longWaitTimes.com?subject=Password Reset Request', '_blank');
});