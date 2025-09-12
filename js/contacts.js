// Contact management functions
console.log("DEV: contacts.js script loaded!");

// Load contacts
async function loadContacts()
{
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.id) {
        return [];
    }

    const payload = {
        userId: userData.id,
        searchParam: ""
    };

    // DEBUG: log the payload
    console.log('Loading all contacts with payload:', JSON.stringify(payload, null, 2));


    try {
        const response = await fetch(`${API_BASE}/SearchContact.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        // DEBUG: log the response
        console.log('Load contacts API response:', JSON.stringify(data, null, 2));


        if (data.error) {
            console.error('Error loading contacts:', data.error);
            return [];
        }
        const contacts = data.results.map(contact => ({
            id: contact.id,
            name: `${contact.firstName} ${contact.lastName}`.trim(),
            email: contact.email,
            phone: contact.phone,
            company: '' // The SearchContact API doesn't return 'company'
        }));
        localStorage.setItem('contacts', JSON.stringify(contacts));
        return contacts;
    } catch (error) {
        console.error('Failed to fetch contacts from API:', error);
        return JSON.parse(localStorage.getItem('contacts') || '[]');
    }
}

// Add new contact
async function addContact(contactData)
{
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.id) {
        showAlert('contact-alert', 'You must be logged in to add a contact.');
        return;
    }

    const nameParts = contactData.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    const payload = {
        firstName: firstName,
        lastName: lastName,
        phone: contactData.phone,
        email: contactData.email,
        userId: userData.id
    };

    // DEBUG: log the payload
    console.log('Adding new contact with payload:', JSON.stringify(payload, null, 2));

    try
    {
        const response = await fetch(`${API_BASE}/AddContact.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // DEBUG: log the response
        console.log('Add contact API response:', JSON.stringify(data, null, 2));

        if (data.error) {
            showAlert('contact-alert', `Failed to add contact: ${data.error}`);
        } else {
            showAlert('contact-alert', 'Contact added successfully!', 'success');
            clearForm('contact-form');
            setTimeout(() =>
            {
                window.location.href = 'dashboard.html';
            }, 1500);
        }

    } catch (error) {
        showAlert('contact-alert', 'Failed to add contact. Please try again.');
        console.error('Add contact error:', error);
    }
}