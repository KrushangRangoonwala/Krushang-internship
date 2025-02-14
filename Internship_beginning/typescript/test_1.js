
// Question 1: Understanding Closures  
  
// What will be logged to the console and why?  
console.log("Question 1: ");  
function createCounter() {  
    let count = 0;  
  
    return {  
        increment() {  
            count++;  
        },  
        decrement() {  
            count--;  
        },  
        getCount() {  
            return count;  
        },  
    };  
}  
  
const counterA = createCounter();  
const counterB = createCounter();  
  
counterA.increment();  
counterA.increment();  
console.log(counterA.getCount()); // ?  
  
counterB.increment();  
console.log(counterB.getCount()); // ?  
  
counterA.decrement();  
console.log(counterA.getCount()); // ?  
  
console.log(counterB.getCount()); // ?  
  
// Options:  
// a) 2, 1, 1, 1  
// b) 2, 2, 1, 1  
// c) 2, 2, 1, 2  
// d) 2, 1, 2, 1  
  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
console.log("Question 2: ");
// Question 2: Hoisting and Variable Scope  
// What will the following code output to the console and why?  
  
console.log(a); // Line 1  
var a = 10;  
  
function example() {  
    console.log(a); // Line 2  
    var a = 20;  
    console.log(a); // Line 3  
}  
  
example();  
console.log(a); // Line 4  
  
  
// Options:  
// a) undefined, undefined, 20, 10  
// b) undefined, 20, 20, 10  
// c) undefined, undefined, 20, undefined  
// d) undefined, undefined, 20, 10  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
// Question 3: this Keyword in Different Contexts  
  
// What will the following code output and why?  
console.log("Question 3: ");
const obj = {  
    name: "Alice",  
    getNameArrow: () => {  
        return this.name;  
    },  
    getNameFunction: function () {  
        return this.name;  
    },  
};  
  
console.log(obj.getNameArrow()); // Line 1  
console.log(obj.getNameFunction()); // Line 2  
  
const getNameFunction = obj.getNameFunction;  
console.log(getNameFunction()); // Line 3  
  
// Options:  
// a) undefined, "Alice", undefined  
// b) "Alice", "Alice", "Alice"  
// c) undefined, "Alice", undefined  
// d) undefined, "Alice", "Alice"  
  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
console.log("Question 4: ");
// Question 4: Event Loop and Async Execution  
// What will the following code output and why?  
  
  
console.log("Start");  
  
setTimeout(() => {  
    console.log("Timeout");  
}, 0);  
  
Promise.resolve().then(() => {  
    console.log("Promise");  
});  
  
console.log("End");  
  
// Options:  
// a) Start, Timeout, Promise, End  
// b) Start, End, Promise, Timeout  
// c) Start, Promise, End, Timeout  
// d) Start, Promise, Timeout, End  
  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
console.log("Question 5: ");
// Question 5: Object Destructuring and Default Values  
  
// What will the following code output and why?  
  
const obj2 = {  
    aa: 1,  
    b: undefined,  
    c: 3,  
};  
  
const { aa = 10, b3 = 20, d4 = 30 } = obj2;  
  
console.log(aa); // Line 1  
console.log(b3); // Line 2  
console.log(d4); // Line 3  
  
  
// Options:  
// a) 1, 20, 30  
// b) 1, undefined, 30  
// c) 10, 20, 30  
// d) 10, undefined, 30  
  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
console.log("Question 6: ");
// Question 6: Scope and Closures  
  
// What will the following code output and why?  
  
function createIncrementor(start) {  
    return function () {  
        console.log(start++);  
    };  
}  
  
const increment1 = createIncrementor(5);  
const increment2 = createIncrementor(10);  
  
increment1(); // Line 1  
increment1(); // Line 2  
increment2(); // Line 3  
increment1(); // Line 4  
increment2(); // Line 5  
  
// Options:  
// a) 5, 6, 10, 7, 11  
// b) 5, 6, 11, 7, 12  
// c) 5, 6, 10, 6, 10  
// d) 5, 5, 10, 5, 10  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
console.log("Question 7: ");
// Question 7: Array Methods and this Context  
// What will the following code output and why?  
  
const multiplier = {  
    factor: 2,  
    multiply(array) {  
        return array.map(function (num) {  
            return num * this.factor;  
        });  
    },  
};  
  
const numbers = [1, 2, 3];  
console.log(multiplier.multiply(numbers));  
  
// Options:  
// a) [2, 4, 6]  
// b) [NaN, NaN, NaN]  
// c) TypeError  
// d) [undefined, undefined, undefined]  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
console.log("Question 8: ");
// Question 8: setInterval and Timing Behavior  
// What will the following code output and why?  
  
let count = 0;  
  
const intervalId = setInterval(() => {  
    count++;  
    console.log(count);  
    if (count === 3) {  
        clearInterval(intervalId);  
    }  
}, 1000);  
  
console.log("Start");  
  
// Options:  
// a) Start, 1, 2, 3  
// b) Start, 1, 2, 3, undefined  
// c) Start, 1, 2, 3, Start  
// d) Start, 1, 2, 3, 1  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
  console.log("Question 9: ");
  
// Question 9: Promise Chaining and Error Handling  
  
// What will the following code output and why?  
  
console.log("Start");  
  
Promise.resolve(1)  
    .then((value) => {  
        console.log(value);  
        return value + 1;  
    })  
    .then((value) => {  
        console.log(value);  
        throw new Error("Something went wrong");  
    })  
    .then((value) => {  
        console.log(value);  
    })  
    .catch((error) => {  
        console.log(error.message);  
    });  
  
console.log("End");  
  
// Options:  
// a) Start, 1, 2, Something went wrong, End  
// b) Start, 1, 2, undefined, Something went wrong, End  
// c) Start, 1, 2, 3, Something went wrong, End  
// d) Start, 1, Something went wrong, End  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
console.log("Question 10: ");
  
// Question 10: Array find() Method and Callback  
  
// What will the following code output and why?  
  
const numbers0 = [5, 10, 15, 20, 25];  
  
const result = numbers0.find(function (num) {  
    console.log(num);  
    return num > 15;  
});  
  
console.log(result);  
  
// Options:  
// a) 5, 10, 15, 20, 25, 20  
// b) 5, 10, 15, 20, 25, undefined  
// c) 5, 10, 15, 20, 25, 25  
// d) 5, 10, 15, 20, 25, 15  
  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
// Question 11 : bind() Method and this  
// What will the following code output and why?  
console.log("Question 11 :");
  
const person = {  
    name: "John",  
    greet: function () {  
        console.log('Hello, ${this.name}');  
    },  
};  
  
const greetPerson = person.greet;  
const boundGreet = person.greet.bind(person);  
  
greetPerson(); // Line 1  
boundGreet(); // Line 2  
  
// Options:  
// a) Hello, undefined, Hello, John  
// b) Hello, John, Hello, John  
// c) Hello, John, Hello, undefined  
// d) Hello, undefined, Hello, undefined  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
  console.log("Question 12: ");
  
// Question 12: Array.reduce() Method and Accumulator  
// What will the following code output and why?  
  
  
const numbersss = [1, 2, 3, 4, 5];  
  
const resulttt = numbersss.reduce((acc, num) => {  
    return acc + num;  
}, 10);  
  
console.log(resulttt);  
  
// Options:  
// a) 25  
// b) 30  
// c) 35  
// d) 15  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
console.log("Question 13:");
  
// Question 13: setTimeout and Closure Behavior  
// What will the following code output and why?  
  
  
for (var i = 0; i < 3; i++) {  
    setTimeout(function () {  
        console.log(i);  
    }, 1000);  
}  
  
// Options:  
// a) 0, 1, 2  
// b) 3, 3, 3  
// c) 0, 0, 0  
// d) 1, 2, 3  
  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
// Question 14 : Array.sort() and Sorting Behavior  
// What will the following code output and why?  
console.log(" Question 14 :");

  
  
const numberss = [10, 1, 21, 2];  
  
numberss.sort();  
  
console.log(numberss);  
  
// Options:  
// a) [1, 2, 10, 21]  
// b) [10, 1, 21, 2]  
// c) [1, 10, 2, 21]  
// d) [1, 2, 21, 10]  
  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
  
console.log("Question 15 : this in Arrow Functions vs Regular Functions  What will the following code output and why?  ");
  
  
const objjj = {  
    name: 'Alice',  
    regularFunction: function() {  
        console.log(this.name);  
    },  
    arrowFunction: () => {  
        console.log(this.name);  
    }  
};  
  
objjj.regularFunction();  
objjj.arrowFunction();  
  
// Options:  
// a) Alice, undefined  
// b) undefined, Alice  
// c) Alice, Alice  
// d) undefined, undefined  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
  
  
// console.log("Question 16 : Hoisting with var and let  What will the following code output and why?  ");

   
// console.log(aw); // Line 1  
// var aw = 10;  
  
// console.log(bb); // Line 2  
// let bb = 20;  
  
// Options:  
// a) undefined, 20  
// b) ReferenceError, 20  
// c) undefined, undefined  
// d) 10, 20  
//   undefined,refEror
  
// ---------------------------------------------------------------------------------------------------------------------------------  
  
console.log("Question 17: Array.concat() and Mutation  What will the following code output and why?  ");
  
  
const arr1 = [1, 2];  
const arr2 = [3, 4];  
  
const resultt = arr1.concat(arr2);  
arr1.push(5);  
  
console.log(resultt);  
console.log(arr1);  
  
// Options:  
// a) [1, 2, 3, 4], [1, 2, 5]  
// b) [1, 2, 3, 4], [1, 2]  
// c) [1, 2, 3, 4, 5], [1, 2, 5]  
// d) [1, 2, 3, 4, 5], [1, 2]  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
  
console.log("Question 18 : setInterval and Variable Scope  What will the following code output and why?  ");

  
  
for (var i = 0; i < 3; i++) {  
    setInterval(function () {  
        console.log(i);  
    }, 1000);  
}  
  
// Options:  
// a) 0, 1, 2  
// b) 3, 3, 3  
// c) 0, 0, 0  
// d) 1, 2, 3  
  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
  console.log('Question 19: Object.freeze() and Mutability  What will the following code output and why?  ');
  
  
  
const objj = Object.freeze({ name: "Alice" });  
  
objj.name = "Bob";  
  
console.log(objj.name);  
  
// Options:  
// a) "Alice"  
// b) "Bob"  
// c) undefined  
// d) TypeError  
  
  
  
  
// ---------------------------------------------------------------------------------------------------------------------------------  
console.log("estion 20: Promise.all() Behavior  What will the following code output and why?  ");
  
  
const promise1 = Promise.resolve(1);  
const promise2 = Promise.resolve(2);  
const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 100, 3));  
  
Promise.all([promise1, promise2, promise3]).then((values) => {  
    console.log(values);  
});  
  
// Options:  
// a) [1, 2, 3]  
// b) [1, 2]  
// c) Promise { <pending> }  
// d) [1, 2, undefined]  
  