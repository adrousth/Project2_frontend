let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let loginButton = document.getElementById('login-button');
const url = "ec2-18-223-161-66.us-east-2.compute.amazonaws.com";

loginButton.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
    let res = await fetch(`http://${url}:8080/login`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
            'username': usernameInput.value,
            'userPassword': passwordInput.value
        })
    })
    
    if (res.status == 200) {
        let data = await res.json();
        console.log("Logged in!")
        console.log(data);
        sessionStorage.setItem("role", data.positionRole)
        let role = sessionStorage.getItem('role')
        console.log(role)
        sessionStorage.setItem("username", usernameInput.value)
        if (sessionStorage.getItem("role") == 'hospital_admin') {
            
            window.location.href="./admin.html"
        }
        else if (sessionStorage.getItem("role") == ('warranty_manager')) {
            window.location.href="./warranty-manager.html"
        }
    } else if (res.status != 200) {
        alert("Invalid username and/or password");
    }
    } catch(err) {
        alert(err) 
    }
}


);