// 24.
// search and filter by employee and get it's record
// search and filter by age gap and find out employee list which age is satisfied with given age
// search and filter basedon department 
const employees = [
    { name: 'Alice Johnson', department: 'Engineering', age: 30, salary: 85000 },
    { name: 'Bob Smith', department: 'Marketing', age: 45, salary: 65000 },
    { name: 'Carol Davis', department: 'Engineering', age: 28, salary: 72000 },
    { name: 'David Wilson', department: 'Engineering', age: 35, salary: 90000 },
    { name: 'Eva Adams', department: 'Marketing', age: 32, salary: 72000 },
    { name: 'Frank Brown', department: 'Sales', age: 50, salary: 80000 },
];

function searchByName(name){
    let flag = false;
    for(var x of employees){
        if(x.name.includes(name)){
            console.log("Your searched employee : ");
            console.log(x);
            flag = true;
        }
    }
    (!flag) ? console.log("Not found..") : "";
}
function searchByAge(start_age,end_age){
    let flag = false;
    console.log("Employees between age gap : ",start_age," to ",end_age," are below :");
    for(var x of employees){
        let a = x.age;
        if((a>=start_age) && (a<=end_age)){
            console.log(x);
            flag = true;
        }
    }
    (!flag) ? console.log("No one between age gap : ",start_age," to ",end_age," are below :") : "";
}

function searchByDepartment(dept){
    let flag = false;
    console.log("Your searched employees for ",dept," department are : ");
    for(var x of employees){
        if(x.department.includes(dept)){
            console.log(x);
            flag = true;
        }
    }
    (!flag) ? console.log("Not found..") : "";
}

searchByName('Alice');
searchByDepartment('Engineer');
searchByAge(30,45);