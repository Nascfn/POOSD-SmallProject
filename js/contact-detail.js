console.log("Contact detail script loaded!");

let currentContactId = null;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const contactId = urlParams.get('id');

    if (contactId) {
        // Use a consistent variable name
        currentContactId = contactId; 
        loadContactDetails(currentContactId);
    } else {
        window.location.href = 'dashboard.html';
    }

    const editButton = document.getElementById('edit-contact-btn');
    if (editButton) {
        editButton.addEventListener('click', editThisContact);
    }

    const deleteButton = document.getElementById('delete-contact-btn');
    if (deleteButton) {
        // Pass the ID to the delete function
        deleteButton.addEventListener('click', () => deleteThisContact(currentContactId));
    }
});

function loadContactDetails(contactId) {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    // Use a loose comparison to handle potential type differences (e.g., "6" vs 6)
    const contact = contacts.find(c => c.id == contactId);

    if (contact) {
        document.getElementById('detail-contact-name').textContent = contact.name;
        document.getElementById('detail-email').textContent = contact.email;
        document.getElementById('detail-phone').textContent = contact.phone;
        document.getElementById('detail-company').textContent = contact.company || 'N/A';
    } else {
        window.location.href = 'dashboard.html';
    }
}

function editThisContact() {
    window.location.href = `add-contact.html?id=${currentContactId}`;
}


function deleteThisContact(contactIdToDelete) {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        const updatedContacts = contacts.filter(c => c.id != contactIdToDelete);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert('Failed to delete contact.');
        console.error('Delete contact error:', error);
    }
}