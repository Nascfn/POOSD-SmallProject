// Dashboard page implementation

let allContacts = [];

document.addEventListener('DOMContentLoaded', function() 
{
    // Check authentication
    requireAuth();
    
    // Load user data
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.name) {
        updateUserInterface(userData);
    }
    
    // Load and display contacts
    allContacts = loadContacts();
    displayContacts(allContacts);
    
    // Setup search functionality
    document.getElementById('search-contacts').addEventListener('input', function(e) 
    {
        searchContacts(e.target.value);
    });
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', logout);

    // DEMO MODE
    // I assume we're deleting this for the final version?
    if (userData.token && userData.token.includes('demo_token')) 
        {
        showAlert('dashboard-alert', 'Welcome to the demo mode! All features should be working.', 'success');
    }
});

function updateUserInterface(userData) 
{
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-avatar').textContent = userData.name.charAt(0).toUpperCase();
}

function displayContacts(contacts)
{

    const container = document.getElementById('contacts-container');

    // Clear the container before adding new cards
    container.innerHTML = ''; 

    if (contacts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No contacts found. Add your first contact!</p>';
        return;
    }

    // Loop through each contact and create its card element
    contacts.forEach(contact => {
        // Main card container
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.addEventListener('click', () => viewContactDetails(contact.id));

        // Contact name
        const nameDiv = document.createElement('div');
        nameDiv.className = 'contact-name';
        nameDiv.textContent = contact.name;
        card.appendChild(nameDiv);
        
        // Email
        if (contact.email){
        const emailInfo = document.createElement('div');
        emailInfo.className = 'contact-info';
        emailInfo.textContent = `📧 ${contact.email}`;
        card.appendChild(emailInfo);
        }

        // Phone
        if (contact.phone) {
        const phoneInfo = document.createElement('div');
        phoneInfo.className = 'contact-info';
        phoneInfo.textContent = `📞 ${contact.phone}`;
        card.appendChild(phoneInfo);
        }

        // Company
        if (contact.company) {
            const companyInfo = document.createElement('div');
            companyInfo.className = 'contact-info';
            companyInfo.textContent = `🏢 ${contact.company}`;
            card.appendChild(companyInfo);
        }
        
        /* 
        // Container for the quick actions buttons (Edit/Delete)
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'contact-actions';
        
        // Edit button 
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-small';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the card's click event from firing
            editContact(contact.id);
        });
        actionsDiv.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-small';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (event) =>{
            event.stopPropagation();
            confirmDeleteContact(contact.id);
        });
        actionsDiv.appendChild(deleteButton);

        card.appendChild(actionsDiv);
        */

        // Append card to dashboard
        container.appendChild(card);
    });
}

function viewContactDetails(contactId) 
{
    window.location.href = `contact-detail.html?id=${contactId}`;
}

/*function editContact(contactId) 
{
    window.location.href = `add-contact.html?id=${contactId}`;
}

function confirmDeleteContact(contactId) 
{
    if (confirm('Are you sure you want to delete this contact? This action can not be undone.')) {
        const contacts = loadContacts();
        const updatedContacts = contacts.filter(c => c.id !== contactId);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        
        // Reload contacts display
        allContacts = loadContacts();
        displayContacts(allContacts);
    }
}*/

function searchContacts(query) 
{
    if (!query) {
        displayContacts(allContacts);
        return;
    }
    
    const filteredContacts = allContacts.filter(contact => 
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase()) ||
        contact.phone.includes(query) ||
        (contact.company && contact.company.toLowerCase().includes(query.toLowerCase()))
    );
    
    displayContacts(filteredContacts);
}

// Helper function
function escapeHtml(text) 
{
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}