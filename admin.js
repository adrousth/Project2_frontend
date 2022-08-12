let logoutButton = document.getElementById('logout-button');
let warrantyTbodyElement = document.getElementById('request-table-body');
let addWarrantyButton = document.getElementById('add-warranty-btn');
let username = sessionStorage.getItem('username');
// let dropdownButton = document.getElementById('dropdown-btn');
// let selectedStatus = document.querySelector('#status-select');
let refreshButton = document.getElementById('refresh-table-btn');
let welcome = document.getElementById('welcome');
const url = "ec2-18-223-161-66.us-east-2.compute.amazonaws.com";
// console.log(selectedStatus)
// console.log(dropdownButton)

// var userID = '<%=session.getAttribute("user_info")%>';
// alert(userID);

// console.log(userID)



document.addEventListener('DOMContentLoaded', async (e) => {
    welcome.innerHTML= `Welcome ${username}`

    console.log("Hello There")
    try {
        let res = await fetch(`http://${url}:8080/warranties`, {
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'}});
        
        let data = await res.json();
        console.log(data)

        addWarrantiesToTable(data)
        localStorage.setItem('table_data', data);
    } catch(err) {
        console.log(err);
    }
}
);

logoutButton.addEventListener('click', async (e) => {
    e.preventDefault()
    let res = await fetch(`http://${url}:8080/logout`, {
        
        'credentials': 'include',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
    })

    if (res.status == 200) {
        console.log("Logged out!")
        window.location.href="./index.html"
    }
});

// var q_status;

// selectedStatus.addEventListener('change', (e) => {
//     //e.preventDefault();
//     q_status = e.target.value;
// } )

// dropdownButton.addEventListener('click', async (e) => {
//     e.preventDefault()
//     let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements?status=${q_status}`, {
//         'credentials': 'include',
//         'method': 'GET',
//         'headers': {
//             'Content-Type': 'application/json'}});
    
//     let data = await res.json();
//     console.log(q_status)

//     reimbursementTbodyElement.innerHTML = ""

//     addReimbursementsToTable(data.reimbursements);
// })

// refreshButton.addEventListener('click', async (e) => {
//     //e.preventDefault()
//     let res = await fetch(`http://127.0.0.1:8080/users/${username}/reimbursements`, {
//         'credentials': 'include',
//         'method': 'GET',
//         'headers': {
//             'Content-Type': 'application/json'}});
    
//     let data = await res.json();
//     console.log(q_status)

//     reimbursementTbodyElement.innerHTML = ""

//     addReimbursementsToTable(data.reimbursements);
// })

function addWarrantiesToTable(war_obj) {
    console.log(typeof(war_obj))
      for (war of war_obj) {  
        let row = document.createElement('tr');

        let warID = document.createElement('td');
        warID.innerHTML = war.warrantyId
        let deviceType = document.createElement('td');
        deviceType.innerHTML = war.deviceType
        let warIssDate = document.createElement('td');
        warIssDate.innerHTML = new Date(war.warrantyIssueDate).toDateString();
        let warExpDate = document.createElement('td');
        warExpDate.innerHTML = new Date(war.warrantyExpirationDate).toDateString();
        let warAmnt = document.createElement('td');
        warAmnt.innerHTML = war.warrantyAmount;
        let reqIssDate = document.createElement('td');
        reqIssDate.innerHTML = new Date(war.requestIssueDate).toDateString();
        let recallStatus = document.createElement('td');
        recallStatus.innerHTML = war.recallStatus;
        let confStatus = document.createElement('td');
        confStatus.innerHTML = war.confirmation;
        let warReq = document.createElement('td');
        warReq.innerHTML = war.warrantyRequester;
        let warRes = document.createElement('td');
        warRes.innerHTML = war.warrantyResolver;

        row.appendChild(warID);
        row.appendChild(deviceType);
        row.appendChild(warIssDate);
        row.appendChild(warExpDate);
        row.appendChild(warAmnt);
        row.appendChild(reqIssDate);
        row.appendChild(recallStatus);
        row.appendChild(confStatus);
        row.appendChild(warReq);
        row.appendChild(warRes);

        warrantyTbodyElement.appendChild(row);
    }
};

addWarrantyButton.addEventListener('click', async (e) => {
    e.preventDefault();


    window.location.href="./add-request.html"});