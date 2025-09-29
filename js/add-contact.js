// Add contact function script
console.log("DEV: add-contact.js script loaded!");

let currentContactId = null;

// Pass ID
const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', function ()
{
    // Load contact
    if (editId) {
        loadContactForEdit(parseInt(editId));
    }

    // Form
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const contactData = {
            firstName: document.getElementById('contact-firstname').value,
            lastName: document.getElementById('contact-lastname').value,
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value
        };

        if (currentContactId) {
            updateContact(currentContactId, contactData);
        } else {
            addContact(contactData);
        }
    });
});

function loadContactForEdit(contactId)
{
    currentContactId = contactId;
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contact = contacts.find(c => c.id === contactId);

    if (contact) {
        document.getElementById('contact-form-title').innerHTML = 'Edit Contact';
        document.getElementById('contact-submit-btn').value = 'Update Contact';
        document.getElementById('contact-firstname').value = contact.firstName;
        document.getElementById('contact-lastname').value = contact.lastName;
        document.getElementById('contact-email').value = contact.email;
        document.getElementById('contact-phone').value = contact.phone || '';
    }
}


async function updateContact(contactId, contactData) {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.id) {
        alert('You must be logged in to update a contact.');
        return;
    }

    const payload = {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        phone: contactData.phone,
        email: contactData.email,
        contactId: contactId,
        userId: userData.id
    };

    // DEBUG: log the payload
    console.log('Updating contact with payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(`${API_BASE}/EditContact.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // DEBUG: log the response
        console.log('Update contact API response:', JSON.stringify(data, null, 2));

        if (data.error) {
            alert('Failed to update contact: ' + data.error);
        } else {
            alert('Contact updated successfully!');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        }
    } catch (error) {
        alert('Failed to update contact. Please try again.');
        console.error('Update contact error:', error);
    }
}