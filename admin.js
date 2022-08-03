let logoutButton = document.getElementById('logout-btn');

logoutButton.addEventListener('click', async (e) => {
    e.preventDefault()
    let res = await fetch('http://127.0.0.1:8080/logout', {
        
        'credentials': 'include',
        'method': 'POST'
    })

    if (res.status == 200) {
        console.log("Logged out!")
        window.location.href="./index.html"
    }
});