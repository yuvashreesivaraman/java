// Prevent number input in the username field
document.getElementById('username').addEventListener('input', function (e) {
    // Remove any numbers from the input
    this.value = this.value.replace(/[0-9]/g, '');

    // Show error message if the user tries to enter numbers
    const usernameError = document.getElementById('usernameError');
    if (/[0-9]/.test(e.data)) {
        usernameError.style.display = 'block';
    } else {
        usernameError.style.display = 'none';
    }
});

// Form submission event listener with AJAX submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');
    const role = formData.get('role');
    
    // Regex pattern to match valid usernames
    const usernamePattern = /^[a-zA-Z_]{5,15}$/;

    // Check for empty fields
    if (username === "" || password === "" || role === "") {
        document.getElementById('loginResult').innerHTML = "Please fill out all fields.";
        return;
    }

    // Validate username format
    if (!usernamePattern.test(username)) {
        document.getElementById('loginResult').innerHTML = "Username must be 5-15 characters long and contain only letters or underscores (no numbers).";
        return;
    }

    // Validate password length
    if (password.length < 5) {
        document.getElementById('loginResult').innerHTML = "Password must be at least 5 characters long.";
        return;
    }

    // If validation passes, proceed with form submission via AJAX
    const loginData = { username, password, role };

    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.redirect;
        } else {
            document.getElementById('loginResult').innerHTML = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loginResult').innerHTML = "An error occurred. Please try again later.";
    });
});
