// Contact management functions

// Load contacts
function loadContacts() 
{
    // TO DO: We need to fetch this from API. I'm using localStorage for the demo.
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // DEMO MODE
    if (userData.token === 'demo_token_12345' || !userData.token) 
        {
        // Use demo data
        const demoContacts = [
            {
                id: 1,
                name: "Alice Johnson",
                email: "alice.johnson@techcorp.com",
                phone: "(555) 123-4567",
                company: "Tech Corporation"
            },
            {
                id: 2,
                name: "Bob Smith",
                email: "bob.smith@gmail.com",
                phone: "(555) 987-6543",
                company: "Design Studio"
            },
            {
                id: 3,
                name: "Carol Williams",
                email: "carol.w@startup.io",
                phone: "(555) 555-0123",
                company: "Startup Inc"
            },
            {
                id: 4,
                name: "David Brown",
                email: "d.brown@consulting.com",
                phone: "(555) 444-7890",
                company: "Brown Consulting"
            },
            {
                id: 5,
                name: "Emma Davis",
                email: "emma.davis@freelance.com",
                phone: "(555) 333-2468",
                company: ""
            }
        ];
        
        // Store demo contacts in localStorage if not already there
        if (!localStorage.getItem('contacts')) {
            localStorage.setItem('contacts', JSON.stringify(demoContacts));
        }
        
        return JSON.parse(localStorage.getItem('contacts') || '[]');
    } 
    else {
        // TO DO: Replace with API call
        return JSON.parse(localStorage.getItem('contacts') || '[]');
    }
}

// Add new contact
async function addContact(contactData) 
{
    // TO DO: Replace with API call
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    try 
    {
        // Get existing contacts
        const contacts = loadContacts();
        
        // TO DO: Algorithm for unique IDs. For the moment, this is a very basic implementation.
        // Generate new ID
        const newId = Math.max(0, ...contacts.map(c => c.id)) + 1;
        
        // Create new contact
        const newContact = 
        {
            id: newId,
            ...contactData
        };
        
        // Add to contacts array
        contacts.push(newContact);
        
        // TO DO: Replace with API call
        // Save back to localStorage
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        // Success message. Return to dashboard.
        showAlert('contact-alert', 'Contact added successfully!', 'success');
        clearForm('contact-form');
        setTimeout(() => 
        {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        showAlert('contact-alert', 'Failed to add contact. Please try again.');
        console.error('Add contact error:', error);
    }
}

/*
// Update existing contact
async function updateContact(contactId, contactData) 
{
    try {
        const contacts = loadContacts();
        const contactIndex = contacts.findIndex(c => c.id === contactId);
        
        if (contactIndex !== -1) 
            {
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

// Delete contact
async function deleteContact(contactId) 
{
    if (!confirm('Are you sure you want to delete this contact? This action can not be undone.')) return;
    
    try 
    {
        const contacts = loadContacts();
        const updatedContacts = contacts.filter(c => c.id !== contactId);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert('Failed to delete contact. Please try again.');
        console.error('Delete contact error:', error);
    }
}
    */