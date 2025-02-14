// function completeTask(id) {
//     let checkbox_id = document.getElementById(`${id}c`);
//     let listItem = document.getElementById(id);
//     let completedTasks = document.getElementById('completedTasks');
//     let ul = document.getElementById('taskList');


//     console.log("checkbox_id.checked : ", checkbox_id.checked);

//     if (!checkbox_id.checked) {
//         listItem.remove();

//         completedTasks.insertAdjacentHTML('afterbegin', listItem.outerHTML);
//         checkbox_id.checked = true;
//         // checkbox_id.setAttribute('checked', '');
//     } else {
//         listItem.remove();

//         ul.insertAdjacentHTML('afterbegin', listItem.outerHTML);

//         checkbox_id.checked = false;
//     }


// }

// localStorage.setItem('try1',JSON.stringify([
//     {
//       "color": "purple",
//       "type": "minivan",
//       "registration": new Date('2017-01-03'),
//       "capacity": 7
//     },
//     {
//       "color": "red",
//       "type": "station wagon",
//       "registration": new Date('2018-03-03'),
//       "capacity": 5
//     }]));

// [
//     {
//       "color": "purple",
//       "type": "minivan",
//       "registration": new Date('2017-01-03'),
//       "capacity": 7
//     },
//     {
//       "color": "red",
//       "type": "station wagon",
//       "registration": new Date('2018-03-03'),
//       "capacity": 5
//     },

//   ]

// // -------------
// //worked code :

// function completeTask(id){
//     // console.log(id);
//     let listItem = document.getElementById(id);
//     listItem.remove();

//     let completedTasks = document.getElementById('completedTasks');
//     completedTasks.insertAdjacentHTML('afterbegin',listItem.outerHTML);

//     let checkbox_id = document.getElementById(`${id}c`);
//     console.log("checkbox_id : ",checkbox_id);
//     checkbox_id.setAttribute('checked','');
//     // console.log("checkbox_id.checked : ",checkbox_id.checked);


// }

// let ul = document.getElementById('taskList');
// let completedTasks = document.getElementById('completedTasks');

// let localStorageArray = [];
// let ulFirstElement = document.getElementById('taskList').firstElementChild;
// let completedTasksFirstElement = document.getElementById('completedTasks').firstElementChild;

// if (ulFirstElement) {
//     let task_id = ulFirstElement.id;
//     addDataToLocalStorage(task_id, localStorageArray);

//     let ulNextElement = ulFirstElement.nextElementSibling;

//     while (ulNextElement) {
//         let task_id = ulNextElement.id;
//         addDataToLocalStorage(task_id, localStorageArray);
//         ulNextElement = ulNextElement.nextElementSibling;
//     }
// }

// if (completedTasksFirstElement) {
//     let task_id = completedTasksFirstElement.id;
//     addDataToLocalStorage(task_id, localStorageArray);

//     let ulNextElement = completedTasksFirstElement.nextElementSibling;

//     while (ulNextElement) {
//         let task_id = ulNextElement.id;
//         addDataToLocalStorage(task_id, localStorageArray);
//         ulNextElement = ulNextElement.nextElementSibling;
//     }
// }

// function addDataToLocalStorage(task_id, localStorageArray) {
//     let item = {};
//     item.id = task_id;
//     item.complete = false;
//     item.text = document.getElementById(`${task_id}L`).innerText;
//     localStorageArray.push(item);
// }
let c = 0
console.log(c);

while(null){
    console.log(c);
}

completedTasks
completedTasks