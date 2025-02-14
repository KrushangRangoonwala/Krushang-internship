// function call() : by this one object can access method of another Object 
const person = {
    firstName:"John",
    lastName:"Doe",
    fullname: function(city,state){
        return this.firstName + " " + this.lastName + " " + city + " " + state;
    }
}

const person2 = {
    firstName: "Ajay",
    lastName:"Nagar",
}

const person3 = {
    firstName: "harry",
    lastName:"petter",
}

console.log(person.fullname.call(person2,"haidrabad","channai"));  // Ajay Nagar haidrabad channai

console.log(person.fullname.apply(person3,["London","USA"]));  // harry petter London USA

console.log(person.fullname("London","USA"));  // John Doe London USA

//---------------- Bind -----------------------------------------------
const person4 = {
    firstName:"Jane",
    lastName:"Due",
    fullname: function(){
         console.log(this.firstName + " " + this.lastName);
    }
}

setTimeout(person4.fullname,1000)  // undefined undefined
// here "this" keyword loose its control from person4 object 

// So we use "Bind" 
// Bind : it binds "this" keywords control on given object 

setTimeout(person4.fullname.bind(person4),1000)  // Jane Due

//----------------- Clouser ----------------------------------------------

const add = (function () {
    let counter = 0;
    return function () {counter += 1; return counter;}
  })();

add();  // 1
add();  // 2
let c = add();  // 3
console.log("Counter ", c);

//This is called a JavaScript closure. It makes it possible for a function to have "private" variables.
// The counter is protected by the scope of the anonymous function, and can only be changed using the add function.