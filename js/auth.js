// Authentication functions
console.log("DEV: auth.js script loaded!");

// Register
async function register(name, email, password) 
{
    // Get name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    const payload = {
        firstName: firstName,
        lastName: lastName,
        login: email,
        password: password
    };

    // DEBUG: testing the API call
    console.log('Attempting to register with payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(`${API_BASE}/SignUp.php`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // DEBUG: log response
        console.log('Registration API response:', JSON.stringify(data, null, 2));

        if (data.error) {
            showAlert('register-alert', data.error);
        } else {
            showAlert('register-alert', 'Account created successfully! Please log in.', 'success');
            setTimeout(() => window.location.href = 'login.html', 2000);
        }
    } catch (error) {
        showAlert('register-alert', 'Registration failed. Please try again.');
        console.error('Registration error:', error);
    }
}

// Login
async function login(email, password)
{
    const payload = {
        login: email,
        password: password
    };

    // DEBUG: testing the API call
    console.log('Attempting to log in with payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(`${API_BASE}/Login.php`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // DEBUG: log response
        console.log('Login API response:', JSON.stringify(data, null, 2));

        if (data.error) {
            showAlert('login-alert', data.error);
        } else {
            const userData = {
                id: data.id,
                name: `${data.firstName} ${data.lastName}`.trim(),
                firstName: data.firstName,
                lastName: data.lastName,
                email: email
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        showAlert('login-alert', 'Login failed. Please try again.');
        console.error('Login error:', error);
    }
}

// Update user information
async function updateUserProfile(profileData) 
{
    // TO DO: Replace with actual API call
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    try {
        // TO DO
        // DEMO: Simulate API call
        const response = await fetch(`${API_BASE}/updateProfile.php`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${userData.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });

        const data = await response.json();
        
        if (data.status === 'success') 
            {
            const updatedUser = { ...userData, name: profileData.name, email: profileData.email };
            localStorage.setItem('userData', JSON.stringify(updatedUser));
            showAlert('settings-alert', 'Profile updated successfully!', 'success');
        } else {
            showAlert('settings-alert', data.message || 'Failed to update profile');
        }
    } catch (error) {
        // TO DO: Remove this later
        // For demo purposes, simulate success
        const updatedUser = { ...userData, name: profileData.name, email: profileData.email };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        showAlert('settings-alert', 'Profile updated successfully!', 'success');
        console.log('Update profile error:', error);
    }
}