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
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value,
            company: document.getElementById('contact-company').value
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
        document.getElementById('contact-form-title').textContent = 'Edit Contact';
        document.getElementById('contact-submit-btn').textContent = 'Update Contact';
        document.getElementById('contact-name').value = contact.name;
        document.getElementById('contact-email').value = contact.email;
        document.getElementById('contact-phone').value = contact.phone;
        document.getElementById('contact-company').value = contact.company || '';
    }
}


async function updateContact(contactId, contactData) {
    try {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        const contactIndex = contacts.findIndex(c => c.id == contactId);

        if (contactIndex !== -1) {
            contacts[contactIndex] = { ...contacts[contactIndex], ...contactData };
            localStorage.setItem('contacts', JSON.stringify(contacts));

            showAlert('contact-alert', 'Contact updated successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showAlert('contact-alert', 'Contact not found.');
        }
    } catch (error) {
        showAlert('contact-alert', 'Failed to update contact. Please try again.');
        console.error('Update contact error:', error);
    }
}