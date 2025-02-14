function checkForPreviousTasks() {
    let previousTasks = localStorage.getItem('user_tasks');

    if (previousTasks) {
        let strgArr = JSON.parse(previousTasks);

        for (let x of strgArr) {
            if (x.complete) {
                let li_elements = `
                <li id=${x.id}>
                <input type="checkbox" id=${x.id}c onclick="completeTask(this.parentElement.id)">
                <p id=${x.id}L >
                ${x.text}
                </p>
                <button class='btn' onclick="deletTask(this.parentElement.id)">Delete</button>
                <button class='btn' onclick="editTask(this.parentElement.id)">Edit</button>
                </li>
                `
                let completedTasks = document.getElementById('completedTasks');
                completedTasks.insertAdjacentHTML('beforeend', li_elements);

                let checkbox_id = document.getElementById(`${x.id}c`);   // re-refferencing checkbox in JS DOM.

                checkbox_id.setAttribute('checked', '');
                checkbox_id.checked = true;

            } else {
                let li_elements = `
                <li id=${x.id}>
                <input type="checkbox" id=${x.id}c onclick="completeTask(this.parentElement.id)">
                <p id=${x.id}L >
                ${x.text}
                </p>
                <button class='btn' onclick="deletTask(this.parentElement.id)">Delete</button>
                <button class='btn' onclick="editTask(this.parentElement.id)">Edit</button>
                </li>
                `
                let ul = document.getElementById('taskList');
                ul.insertAdjacentHTML('beforeend', li_elements);
            }


        }
    } else {
        var c = 0;
        localStorage.setItem('c', c);
    }
}


function updateLocalStorage() {
    let localStorageArray = [];

    let ulFirstElement = document.getElementById('taskList').firstElementChild;

    if (ulFirstElement) {
        let task_id = ulFirstElement.id;
        addDataToLocalStorage(task_id, localStorageArray, false);

        let ulNextElement = ulFirstElement.nextElementSibling;

        while (ulNextElement) {
            let task_id = ulNextElement.id;
            addDataToLocalStorage(task_id, localStorageArray, false);
            ulNextElement = ulNextElement.nextElementSibling;
        }
    }

    let legend01 = document.getElementById('legend01');
    let legendOuterHtml = legend01.outerHTML;
    legend01.remove();

    let fieldset = document.getElementById('completedTasks');
    let fieldsetFirstElement = fieldset.firstElementChild;

    if (fieldsetFirstElement) {
        let task_id = fieldsetFirstElement.id;
        addDataToLocalStorage(task_id, localStorageArray, true);
        var ulNextElement = fieldsetFirstElement.nextElementSibling;

        while (ulNextElement) {
            let task_id = ulNextElement.id;
            addDataToLocalStorage(task_id, localStorageArray, true);
            var ulNextElement = ulNextElement.nextElementSibling;
        }
    }


    fieldset.insertAdjacentHTML('beforeend', legendOuterHtml);

    localStorage.setItem('user_tasks', JSON.stringify(localStorageArray));
}

function addDataToLocalStorage(task_id, localStorageArray, taskDone) {
    let item = {};

    item.id = task_id;
    console.log('task_id tt ', task_id);
    let a = task_id + 'L';
    item.text = document.getElementById(a).innerText;
    (taskDone) ? item.complete = true : item.complete = false;
    localStorageArray.push(item);
}

function addTask() {
    let c = Number(localStorage.getItem('c'));
    let newTask = document.getElementById('task').value;
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
    ul.insertAdjacentHTML('beforeend', li_element);

    c++;
    localStorage.setItem('c', c);

    updateLocalStorage();
}

function completeTask(id) {
    let checkbox_id = document.getElementById(`${id}c`);
    let listItem = document.getElementById(id);
    let completedTasks = document.getElementById('completedTasks');
    let ul = document.getElementById('taskList');

    if (checkbox_id.checked) {  // user marks task as complete
        listItem.remove();
        // after removing <li> tag its child element(checkbox) are also removed, 
        // Now, if we re-insert checkbox with same id in page then it agin need to re-refference in JS DOM. 
        // After that we can update then re-inserted checkbox.  

        completedTasks.insertAdjacentHTML('afterbegin', listItem.outerHTML);

        checkbox_id = document.getElementById(`${id}c`);   // re-refferencing checkbox in JS DOM.
        checkbox_id.checked = true;
        checkbox_id.setAttribute('checked', '');

    } else {  // user marks task as incomplete
        listItem.remove();

        ul.insertAdjacentHTML('afterbegin', listItem.outerHTML);

        checkbox_id = document.getElementById(`${id}c`);   // re-refferencing checkbox in JS DOM.
        checkbox_id.checked = false;
        checkbox_id.removeAttribute('checked');
    }
    updateLocalStorage();

}

function deletTask(id) {
    let listItem = document.getElementById(id);
    listItem.remove();
    updateLocalStorage();
}

function editTask(id) {
    let taskName = document.getElementById(`${id}L`);
    let edittedTask = prompt('Correct your task name', taskName.innerText);
    if (edittedTask) {
        taskName.innerText = edittedTask;
        updateLocalStorage();
    }
}

function clearAll() {
    console.log('aa');

    localStorage.removeItem('user_tasks');
    location.reload();
}

function searchTask() {
    // removeSearch();
    let task = document.getElementById('searchItem').value;

    if (task) {
        let allTasks = JSON.parse(localStorage.getItem('user_tasks'));
        let regExpKey = new RegExp(task, 'i')

        for (let x of allTasks) {
            if ((x.text).search(regExpKey) != -1) {
                let li = document.getElementById(x.id);
                li.style.backgroundColor = 'rgb(107, 183, 255)';
            }
        }
    }
}

function removeSearch() {
    document.getElementById('searchItem').value = '';
    let li = document.getElementsByTagName('li');
    let len = li.length;
    for (let x = 0; x < len; x++) {
        li[x].style.backgroundColor = 'white';
    }
}