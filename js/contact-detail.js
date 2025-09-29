// Contact detailed view page script
console.log("DEV: contact-detail.js script loaded!");

let currentContactId = null;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const contactId = urlParams.get('id');

    if (contactId) {
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
        deleteButton.addEventListener('click', () => deleteThisContact(currentContactId));
    }
});


function loadContactDetails(contactId) {
    let contact = null;

    // First, try to find the contact in the localStorage cache from the dashboard
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contact = contacts.find(c => c.id == contactId);
    
    // Now, populate the page if we found a contact
    if (contact) {
        // This is the corrected line
        document.getElementById('contact-name').textContent = `${contact.firstName} ${contact.lastName}`.trim() || 'Unnamed Contact';         
        document.getElementById('detail-email').textContent = contact.email;
        document.getElementById('detail-phone').textContent = contact.phone || 'N/A';
    } else {
        // If contact is not found, it might be an outdated cache or direct navigation
        alert("Contact not found. Returning to the dashboard to refresh.");
        window.location.href = 'dashboard.html';
    }
}


function editThisContact() {
    window.location.href = `add-contact.html?id=${currentContactId}`;
}


async function deleteThisContact(contactIdToDelete) {
    if (!confirm('Are you sure you want to delete this contact? This action cannot be undone.')) return;
    
    // Prevent deletion of hardcoded demo contacts
    if (['1', '2', '3', '4', '5'].includes(contactIdToDelete)) {
        alert("This is a demo contact and cannot be deleted from the server.");
        return;
    }

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.id) {
        alert('Authentication error. Please log in again.');
        return;
    }

    const payload = {
        contactId: parseInt(contactIdToDelete),
        userId: userData.id
    };

    console.log('Attempting to delete contact with payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(`${API_BASE}/DeleteContact.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Delete contact API response:', data);

        if (data.error && data.error !== "") {
            alert(`Failed to delete contact: ${data.error}`);
        } else {
            // Also remove from the local cache to update the UI
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            const updatedContacts = contacts.filter(c => c.id != contactIdToDelete);
            localStorage.setItem('contacts', JSON.stringify(updatedContacts));
            
            alert("Contact deleted successfully.");
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        alert('Failed to delete contact due to a network or server error.');
        console.error('Delete contact error:', error);
    }
}