// Dashboard page implementation
console.log("DEV: dashboard.js script loaded!");

let allContacts = [];

document.addEventListener('DOMContentLoaded', async function()
{
    // Check authentication
    requireAuth();

    // Load user data
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.name) {
        updateUserInterface(userData);
    }

    document.getElementById('contacts-loading').classList.remove('hidden');

    // Load and display contacts from API
    allContacts = await loadContacts();
    displayContacts(allContacts);

    document.getElementById('contacts-loading').classList.add('hidden');

    // Setup search functionality
    document.getElementById('search-contacts').addEventListener('input', function(e)
    {
        searchContacts(e.target.value);
    });

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
});

function updateUserInterface(userData)
{
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-avatar').textContent = userData.name.charAt(0).toUpperCase();
}

function displayContacts(contacts)
{

    const container = document.getElementById('contacts-container');
    container.innerHTML = '';

    if (!contacts || contacts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No contacts found. Add your first contact!</p>';
        return;
    }

    contacts.forEach(contact => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.addEventListener('click', () => viewContactDetails(contact.id));

        const nameDiv = document.createElement('div');
        nameDiv.className = 'contact-name';
        nameDiv.textContent = `${contact.firstName} ${contact.lastName}`.trim() || 'Unnamed Contact';
        card.appendChild(nameDiv);

        if (contact.email){
            const emailInfo = document.createElement('div');
            emailInfo.className = 'contact-info';
            emailInfo.textContent = `📧 ${contact.email}`;
            card.appendChild(emailInfo);
        }

        if (contact.phone) {
            const phoneInfo = document.createElement('div');
            phoneInfo.className = 'contact-info';
            phoneInfo.textContent = `📞 ${contact.phone}`;
            card.appendChild(phoneInfo);
        }

        container.appendChild(card);
    });
}

function viewContactDetails(contactId)
{
    window.location.href = `contact-detail.html?id=${contactId}`;
}

async function searchContacts(query)
{
    if (!query) {
        displayContacts(allContacts);
        return;
    }

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.id) return;

    const payload = {
        userId: userData.id,
        searchParam: query
    };

    // DEBUG: log the payload
    console.log('Searching contacts with payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(`${API_BASE}/SearchContact.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        // DEBUG: log the response
        console.log('Search API response:', JSON.stringify(data, null, 2));

        if (data.error) {
            displayContacts([]);
        } else {
             const contacts = data.results.map(contact => ({
                id: contact.id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
                phone: contact.phone
            }));
            displayContacts(contacts);
        }
    } catch(error) {
        console.error("Search error", error);
        displayContacts([]);
    }
}