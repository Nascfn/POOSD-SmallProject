// Demo page functionality
// To be deleted later? 
console.log("DEV: demo.js script loaded!");

// Demo login function
function demoLogin() 
{
    // Mock user data
    const demoUser = 
    {
        id: 1,
        name: "User",
        email: "demo@contactmanagerapp.com",
        token: "demo_token_12345"
    };
    
    // Mock contacts data
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
    
    // Store demo user and contacts data
    localStorage.setItem('userData', JSON.stringify(demoUser));
    localStorage.setItem('contacts', JSON.stringify(demoContacts));

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}