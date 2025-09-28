// Some common utility functions used across pages
console.log("DEV: common.js script loaded!");

// TO DO: API Configuration
const API_BASE = 'API';

// Show alert messages
function showAlert(containerId, message, type = 'error') 
{
    const container = document.getElementById(containerId);
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        container.innerHTML = '';
    }, 15000);
}

// Clear forms
function clearForm(formId) 
{
    document.getElementById(formId).reset();
}

// Check authentication status
function checkAuth() 
{
    const userData = localStorage.getItem('userData');
    if (!userData) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Redirecion to login if not authenticated
function requireAuth() 
{
    if (!checkAuth()) 
        {
        window.location.href = 'login.html';
    }
}

// Logout
function logout() 
{
    localStorage.removeItem('userData');
    localStorage.removeItem('contacts');
    window.location.href = 'index.html';
}