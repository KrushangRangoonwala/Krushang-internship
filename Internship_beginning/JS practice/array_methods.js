let courses = ["HTML", "CSS", "JavaScript", "React"];
console.log(courses.length); //4
console.log(courses.toString()); //HTML,CSS,JavaScript,React
console.log(courses.join('|')); //HTML|CSS|JavaScript|React

let numArr = [20, 30, 40, 50];
numArr.push(60); //[20, 30, 40, 50, 60]
numArr.push(70, 80, 90); //[20, 30, 40, 50, 60 ,70,80,90]

let popped = numArr.pop(); // remove last item
console.log(popped); // 90

numArr.unshift(10, 20);  //[10, 20, 20, 30, 40, 50, 60 ,70,80,90]

let shift = numArr.shift(); // remove item from start 
console.log(shift);  // 10 
console.log(numArr);  // [20, 20, 30, 40, 50, 60 ,70,80,90]


// concat
let arr1 = [11, 12, 13];
let arr2 = [14, 15, 16];
let arr3 = [17, 18, 19];

let newArr = arr1.concat(arr2, arr3);
console.log(newArr); //[11, 12, 13, 14, 15,16, 17, 18, 19]

//copyWithin  : overwrites the existing values. -> does not add items to the array. -> does not change the length of the array.
// arr.copywithin(position, start_index, end_index)
let fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.copyWithin(2, 0);  //Banana,Orange,Banana,Orange

 fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi", "Papaya"];
fruits.copyWithin(2, 0, 2);  // Banana,Orange,Banana,Orange,Kiwi,Papaya

//flat()
 myArr = [[1,2],[3,4],[5,6]];
console.log( myArr.flat());  // 1,2,3,4,5,6

//flatMap  ??
 myArr = [1, 2, 3, 4, 5,6];
console.log(myArr.flatMap(x => [x, x * 10]));  //1,10,2,20,3,30,4,40,5,50,6,60

//slice() : remove items from array from start-index to end-index, return removed items  
// does not change original array
// by default end-index is length of array
//slice(start-index , end-index)  
fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruits.slice(1)); // Orange,Lemon,Apple,Mango
console.log(fruits.slice(1,3)); // "Orange", "Lemon"
conaole.log(fruits);  // Banana,Orange,Lemon,Apple,Mango

//splice : use for add and remove items in array -> return removed items
//arr.splice(position, count_of_want_to_remove_element, new_elements, new_elements, ...)
fruits = ["Banana", "Orange", "Apple", "Mango"];
let removed = fruits.splice(2, 2, "Lemon", "Kiwi"); 
console.log(fruits);  //Banana,Orange,Lemon,Kiwi
console.log(removed);  //Apple,Mango

// using splice() remove element
fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.splice(1, 2))  //Banan, Mango

// toSpliced --> Don't update original array, return new array, 
let months = ["Jan", "Feb", "Mar", "Apr"];
let spliced = months.toSpliced(1, 2,"Mar", "Apr");
console.log(months);  //(remain unchanged) "Jan", "Feb", "Mar", "Apr"  
console.log(spliced);  //Jan,Mar,Apr,Apr

//
fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.toString());  //Banana,Orange,Apple,Mango
