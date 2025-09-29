// Sign up function script
console.log("DEV: signup.js script loaded!");

document.addEventListener('DOMContentLoaded', function () 
{
    document.getElementById('register-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        register(name, username, password);
    });
});