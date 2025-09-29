// Log in function script
// console.log("DEV: login.js script loaded!");

// document.addEventListener('DOMContentLoaded', function() 
// {
//     document.getElementById('login-form').addEventListener('submit', function(e) {
//         e.preventDefault();
//         const email = document.getElementById('login-email').value;
//         const password = document.getElementById('login-password').value;
//         login(email, password);
//     });
// });

const urlBase = "/LAMPAPI";

function doLogin(event)
{
    event.preventDefault();

	const username = document.getElementById("login-username").value;
	const password = document.getElementById("login-password").value;

    login(username, password);
    
    /*
    let userId = 0;
	let firstName = "";
	let lastName = "";
	document.getElementById("loginResult").innerHTML = "";

	const jsonPayload = JSON.stringify({login:login,password:password});	
	const url = urlBase + '/Login.php';

    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonPayload
        });
        const jsonObject = await result.json();
        userId = jsonObject.id;
        if( userId < 1 ) {		
            document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
            return;
        }
        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;
        saveCookie();
        window.location.href = "dashboard.html";
    }
    catch(err) {
        document.getElementById("loginResult").innerHTML = err.message;
    }

    
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "dashboard.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
    */
}