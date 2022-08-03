let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
    let res = await fetch('http://127.0.0.1:8080/login', {
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
            window.location.href="./warranty_manager.html"
        }
    } else if (res.status != 200) {
        let err = await res.json();
        console.log(err);
        alert(err.message);
    }
    } catch(err) {
        alert(err) 
    }
}


);