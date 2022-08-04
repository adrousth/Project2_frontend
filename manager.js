let logoutButton = document.getElementById('logout-button');
let warrantyTbodyElement = document.getElementById('request-table-body');
let addWarrantyButton = document.getElementById('add-warranty-btn');
let username = sessionStorage.getItem('username');
// let dropdownButton = document.getElementById('dropdown-btn');
// let selectedStatus = document.querySelector('#status-select');
let refreshButton = document.getElementById('refresh-table-btn');
let changeStatusButton = document.getElementById('update-warranty-btn');
// console.log(selectedStatus)
// console.log(dropdownButton)

// var userID = '<%=session.getAttribute("user_info")%>';
// alert(userID);

// console.log(userID)



document.addEventListener('DOMContentLoaded', async (e) => {

    console.log("Hello There")
    try {
        let res = await fetch(`http://127.0.0.1:8080/warranties`, {
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
    let res = await fetch('http://127.0.0.1:8080/logout', {
        
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
        let deviceID = document.createElement('td');
        deviceID.innerHTML = war.deviceType
        let warIssDate = document.createElement('td');
        warIssDate.innerHTML = new Date(war.warrantyIssueDate).toDateString();
        let warExpDate = document.createElement('td');
        warExpDate.innerHTML = new Date(war.warrantyExpirationDate).toDateString();
        let warAmnt = document.createElement('td');
        warAmnt.innerHTML = war.warrantyAmount;
        let reqIssDate = document.createElement('td');
        reqIssDate.innerHTML = new Date(war.requestIssueDate).toDateString();
        let recallStatus = document.createElement('td');
        let requestStatus = document.createElement('td');
        if (war.recallStatus == 'pending') {
            
            let statusSelect = document.createElement('select')
            statusSelect.name = 'status'
            statusSelect.class = 'status'
            statusSelect.id = war.warrantyId
            
            let statusOptionPending = document.createElement('option')
            statusOptionPending.innerHTML = 'pending'
            statusOptionPending.value = 'pending'
            
            statusSelect.appendChild(statusOptionPending)
            let statusOptionApproved = document.createElement('option')
            statusOptionApproved.innerHTML = 'approved'
            statusOptionApproved.value = 'approved'
            
            statusSelect.appendChild(statusOptionApproved)
            let statusOptionDenied = document.createElement('option')
            statusOptionDenied.innerHTML = 'denied'
            statusOptionDenied.value = 'denied'
            
            statusSelect.appendChild(statusOptionDenied)
            recallStatus.appendChild(statusSelect.cloneNode(true));
        } else if (war.recallStatus == 'approved') {
            recallStatus.innerHTML = war.recallStatus;
            recallStatus.style.color = "green"
        } else if (war.recallStatus == 'denied') {
            recallStatus.innerHTML = war.recallStatus;
            recallStatus.style.color = "red"
        } 
        
        let confStatus = document.createElement('td');
        confStatus.innerHTML = war.confirmation;
        let warReq = document.createElement('td');
        warReq.innerHTML = war.warrantyRequester;
        let warRes = document.createElement('td');
        warRes.innerHTML = war.warrantyResolver;

        row.appendChild(warID);
        row.appendChild(deviceID);
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

changeStatusButton.addEventListener('click', () => {
    let selectElements = document.getElementsByName('status')
    let requestsToChange = {}
    for (element of selectElements) {   
      if (element.options[element.selectedIndex].value != "pending") {
        requestsToChange[element.id] = element.options[element.selectedIndex].value
      }
    }
    console.log(requestsToChange)
    fetch('http://127.0.0.1:8080/warranty', {
        'method': 'put',
        'credentials': 'include',
        'headers': {
            'Content-Type': 'application/json' 
        },
        'body': JSON.stringify(requestsToChange)
      }).then((res) => {
        console.log(res)
        if (res.status == 201) {
          res.json().then((data) => {
            requests = data.requests
            console.log(requests)
            displayRequests(requests, 'all')
          })
      }
        
  })})

