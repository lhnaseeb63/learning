document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:5000/getAll')
    .then(res => res.json())
    .then(data => loadHTMLTable(data['data']));
    
});

const addBtn = document.getElementById('add-name-btn');

// Not using React or AJS to send the data to the backend so
// we are doing it manually. Would normally use something like 
// ng-model to get the data where it needs to go. 
addBtn.addEventListener('click', ()=>{
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
})

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    // getting an object back, not an array so we use for-in loop
    for (var key in data){
        // if the key has the property of date added
        if(data.hasOwnProperty(key)){
            if(key === 'dateAdded'){
                data[key] = new Date(data[key]).toLocaleString();
            }

            tableHtml += `<td>${data[key]}</td>`
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, name, date_added}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

document.querySelector('table tbody').addEventListener('click', (e)=>{
    if(e.target.className === "delete-row-btn"){
        // create a new function and send the id of the element
        // to the backend to delete the row from the database
        deleteRowById(e.target.dataset.id);
    }
})

function deleteRowById(id){
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
        }
        console.log(data)
    });
}