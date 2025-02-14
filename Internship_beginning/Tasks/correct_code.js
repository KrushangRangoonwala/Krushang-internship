var c = 0;

function checkForPreviousTasks() {
    let previousTasks = localStorage.getItem('user_tasks');
    if (previousTasks) {
        document.body.outerHTML = previousTasks;
    }
}

function addTask() {
    // console.log("Entered in addTask()");

    let newTask = document.getElementById('task').value;
    // let ul = document.getElementsByTagName('ul')[0];
    let ul = document.getElementById('taskList');
    let li_element = `
<li id=${c}>
    <input type="checkbox" id=${c}c onclick="completeTask(this.parentElement.id)">
    <p id=${c}L >
        ${newTask}
    </p>
    <button class='btn' onclick="deletTask(this.parentElement.id)">Delete</button>
    <button class='btn' onclick="editTask(this.parentElement.id)">Edit</button>
</li>
    `
    ul.insertAdjacentHTML('beforeend', li_element)

    c++;
    localStorage.setItem('user_tasks', document.body.outerHTML);
}

function completeTask(id) {
    let checkbox_id = document.getElementById(`${id}c`);
    let listItem = document.getElementById(id);
    let completedTasks = document.getElementById('completedTasks');
    let ul = document.getElementById('taskList');

    if (checkbox_id.checked) {  // user marks task as complete
        // listItem.nextElementSibling.remove();
        listItem.remove();
        // after removing <li> tag its child element(checkbox) are also removed, 
        // Now, if we re-insert checkbox with same id in page then it agin need to re-refference in JS DOM. 
        // After that we can update then re-inserted checkbox.  

        completedTasks.insertAdjacentHTML('afterbegin', listItem.outerHTML);
        // let hr = document.createElement('hr');
        // listItem.after(hr);

        checkbox_id = document.getElementById(`${id}c`);
        checkbox_id.checked = true;
        checkbox_id.setAttribute('checked', '');

    } else {  // user marks task as incomplete
        // listItem.nextElementSibling.remove();
        listItem.remove();

        ul.insertAdjacentHTML('afterbegin', listItem.outerHTML);

        // let hr = document.createElement('hr');
        // listItem.after(hr);

        checkbox_id = document.getElementById(`${id}c`);
        checkbox_id.checked = false;
        checkbox_id.removeAttribute('checked');
    }
    localStorage.setItem('user_tasks', document.body.outerHTML);
}

// function completeTask(id){
//     console.log(id);
//     let listItem = document.getElementById(id);
//     let checkbox_id = document.getElementById(`${id}c`);
//     console.log("checkbox_id.checked : ",checkbox_id.checked);

//     if(checkbox_id.checked){

//         listItem.remove();

//         let completedTasks = document.getElementById('completedTasks');
//         completedTasks.insertAdjacentHTML('afterbegin',listItem.outerHTML);

//         let checkbox_id = document.getElementById(`${id}c`);
//         console.log("checkbox_id : ",checkbox_id);
//         checkbox_id.setAttribute('checked','');
//         // console.log("checkbox_id.checked : ",checkbox_id.checked);
//     }


// }

// function completeTask(id){
//     // console.log(id);
//     let listItem = document.getElementById(id);
//     let checkbox_id = document.getElementById(`${id}c`);
//     let completedTasks = document.getElementById('completedTasks');

//     listItem.remove();

//     completedTasks.insertAdjacentHTML('afterbegin',listItem.outerHTML);

//     console.log("checkbox_id : ",checkbox_id);
//     checkbox_id.setAttribute('checked','');
//     // console.log("checkbox_id.checked : ",checkbox_id.checked);
// }

function deletTask(id) {
    console.log("deletTask");
    
    let listItem = document.getElementById(id);
    // listItem.nextElementSibling.remove();
    listItem.remove();
    localStorage.setItem('user_tasks', document.body.outerHTML);
}

function editTask(id) {
    let taskName = document.getElementById(`${id}L`);
    let edittedTask = prompt('Correct your task name', taskName.innerText);
    if (edittedTask) {
        taskName.innerText = edittedTask;
        localStorage.setItem('user_tasks', document.body.outerHTML);
    }
}

function clearAll() {
    localStorage.removeItem('user_tasks');
    location.reload();
}
