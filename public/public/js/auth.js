// Authorized users (10 users)
const authorizedUsers = {
    "user1": "password1",
    "user2": "password2",
    "user3": "password3",
    "user4": "password4",
    "user5": "password5",
    "user6": "password6",
    "user7": "password7",
    "user8": "password8",
    "user9": "password9",
    "user10": "password10"
};

// Check if user is already logged in
function checkAuth() {
    const authToken = localStorage.getItem('nextgen_auth');
    if (authToken) {
        const { username, expires } = JSON.parse(authToken);
        if (new Date(expires) > new Date()) {
            window.location.href = '/auth/game.html';
        }
    }
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('error');

    if (!username || !password) {
        errorElement.textContent = 'Please enter both username and password';
        return;
    }

    if (authorizedUsers[username] === password) {
        // Create auth token valid for 30 days
        const expires = new Date();
        expires.setDate(expires.getDate() + 30);
        
        const authToken = {
            username,
            expires: expires.toISOString()
        };

        localStorage.setItem('nextgen_auth', JSON.stringify(authToken));
        window.location.href = '/auth/game.html';
    } else {
        errorElement.textContent = 'Invalid credentials';
    }
}

// Check auth on page load
checkAuth();
