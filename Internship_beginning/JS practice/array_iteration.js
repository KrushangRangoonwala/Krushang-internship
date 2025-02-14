// Array forEach : update original array
// Array map() : return new aaray
// Array flatMap() : return new aaray that have [original_array_value, manipulated_array_value]

// Array reduce() : use to get single value & iterate from left to right
// Array reduceRight() : use to get single value & iterate from right to left

// Array filter() : return new array that have filter out values 
// Array every() : checks if all item passes the function 
// Array some() : checks if alsome item passes the function 

// Array Spread (...)
// Array with()

// Array entries()
// Array from()
// Array keys()

//----------------------------------------------------------------------
let numbers = [45, 4, 9, 16, 25];

// Array forEach : update original array
numbers.forEach(myFunction);
function myFunction(value, index, array) {
    txt += value + "<br>";
  }
  
// Array map() : return new aaray
const numbers2 = numbers.map(myFunction);
function myFunction(value, index, array) {
  return value * 2;
}

// Array flatMap() : return new aaray that have [original_array_value, manipulated_array_value]
let myArr = [1, 2, 3, 4, 5,6];
let newArr = myArr.flatMap(x => [x, x * 10]);
console.log(newArr);  // 1,10,2,20,3,30,4,40,5,50,6,60

// Array reduce() : use to get single value & iterate from left to right
let sum = numbers.reduce(myFunction);
function myFunction(total, value, index, array) {  // total=initial value 
  return total + value;
}
console.log(sum);  // 99

//>>
sum = numbers.reduce(myFunction, 100); // here 100 is initail value
function myFunction(total, value) {
  return total + value;
}
console.log(sum);  // 199


// Array reduceRight() : use to get single value & iterate from right to left
//same as arr.reduce()

// Array filter() : return new array that have filter out values 
let over18 = numbers.filter(myFunction);
function myFunction(value, index, array) {
  return value > 18;
}
console.log(over18);  // 45,25

// Array every() : checks if all item passes the function 
let allOver18 = numbers.every(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
console.log(allOver18);  // false

// Array some() : checks if alsome item passes the function 
numbers = [45, 4, 9, 16, 25];
let someOver18 = numbers.some(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
console.log(allOver18);  // true

// Array Spread (...)
const q3 = ["Jul", "Aug", "Sep"];
const q4 = ["Oct", "Nov", "May"];

const year = [...q3, ...q4];
console.log(year); // Jul,Aug,Sep,Oct,Nov,May

// Array with() : update elements in an array, return new array
let months = ["Januar", "Februar", "Mar", "April"];
console.log(months.with(2, "March"));  // Januar,Februar,March,April

// Array entries()
let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.entries()); // 0,Banana  1,Orange  2,Apple  3,Mango

// Array from()
console.log(Array.from("ABCDEFG"));  // A,B,C,D,E,F,G

// Array keys()
console.log(fruits.keys());  // 0,1,2,3