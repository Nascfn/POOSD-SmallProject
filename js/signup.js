// Sign up script

document.addEventListener('DOMContentLoaded', function () 
{
    document.getElementById('register-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (password !== confirmPassword) {
            showAlert('register-alert', 'Passwords do not match');
            return;
        }

        register(name, email, password);
    });
});