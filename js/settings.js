document.addEventListener('DOMContentLoaded', function() 
{
    loadUserSettings();

    document.getElementById('settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const profileData = {
            name: document.getElementById('settings-name').value,
            email: document.getElementById('settings-email').value,
            currentPassword: document.getElementById('settings-current-password').value,
            newPassword: document.getElementById('settings-new-password').value
        };

        updateUserProfile(profileData);
    });
});

function loadUserSettings() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.name) {
        document.getElementById('settings-name').value = userData.name;
        document.getElementById('settings-email').value = userData.email;
    }
}