let addButton = document.getElementById("submit-btn");
let amount = document.getElementById('amount');
let issDate = document.getElementById('war-issue-date');
let deviceType = document.getElementById('device-select');
let username = sessionStorage.getItem('username');
let expDate = document.getElementById('war-exp-date');
// let receiptConfirmButton = document.getElementById('receipt-confirm-button');

// receiptConfirmButton.addEventListener('click', () =. {

// })

// JSON.stringify({
//     "reimbursement_amount": amount.value,
//     "type": selectedTypeButton.value,
//     "description": description.value,
//     "author": username,
//     "receipt": ("receipt", receipt.files[0])


addButton.addEventListener('click', async (e) => {
    let selectedDeviceType = deviceType.options[deviceType.selectedIndex].value;
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("warrantyAmount", amount.value)
    // formData.append("warrantyIssueDate", issDate.value)
    // formData.append("warrantyExpirationdate", expDate.value)
    // formData.append("deviceID", selectedDeviceType)
    // formData.append("author", username)
    // console.log(...formData);
    try {
        let res = await fetch(`http://127.0.0.1:8080/warranty`, {
            'credentials': 'include',
            'method': 'POST',
            
                'body':  JSON.stringify({
                    "warrantyAmount": amount.value,
                    "warrantyIssueDate": issDate.value,
                    "warrantyExpirationDate": expDate.value,
                    "deviceType": selectedDeviceType
                })
                })
            console.log(res)
        if (res.status == 201) {
            window.location.href="./admin.html"
        } else {
            let err = await res.json();
            console.log("Not 201");
            alert(err.message);
        }
        
        // let data = await res.json();

        // addReimbursement(data);
        
    } catch(err) {
        console.log(err);
        alert(err.message);
    }}
);

// function addReimbursement(reimb) {
    
    
// };