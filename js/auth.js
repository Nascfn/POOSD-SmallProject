// Authentication functions

// Register
async function register(name, email, password) {
    try {
        // TO DO: Replace with an actual API call
        // Simulating API call for demo...
        const response = await fetch(`${API_BASE}/register.php`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            showAlert('register-alert', 'Account created successfully! Please log in.', 'success');
            setTimeout(() => window.location.href = 'login.html', 2000);
        } else {
            showAlert('register-alert', data.message || 'Registration failed');
        }
    } catch (error) {
        // TO DO: Remove this later
        // DEMO: Simulate registration success
        showAlert('register-alert', 'Account created successfully! Please log in.', 'success');
        setTimeout(() => window.location.href = 'login.html', 2000);
        console.log('Registration error:', error);
    }
}

// Login
async function login(email, password) 
{
    try {
        // TO DO: Replace with an actual API call
        // Simulating API call for demo
        const response = await fetch(`${API_BASE}/login.php`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                email: email,
                password: password
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') 
        {
            localStorage.setItem('userData', JSON.stringify(data.userData));
            window.location.href = 'dashboard.html';
        } else {
            showAlert('login-alert', data.message || 'Login failed');
        }
    } catch (error) {
        // TO DO: Remove this later
        // DEMO: simulate successful login
        const userData = {
            id: 1,
            name: email.split('@')[0],
            email: email,
            token: 'demo_token_' + Date.now()
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = 'dashboard.html';
        console.log('Login error:', error);
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