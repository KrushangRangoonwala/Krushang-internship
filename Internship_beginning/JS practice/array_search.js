let fruits = ["Apple", "Orange", "Apple", "Mango"];
console.log(fruits.indexOf("Apple") + 1);
console.log(fruits.lastIndexOf("Apple") + 1);
console.log(fruits.includes("Mango"));

//find() method returns value of the first array element that passes a test function.
let numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction); // 25

function myFunction(value, index, array) {
  return value > 18;
}

//findIndex() same as find() but it returns index
console.log(numbers.findIndex(myFunction));
// similarly we have below
numbers.findLast(x => x > 40);  // will start from the end of an array
numbers.findLastIndex(x => x > 40);

// sort()  & reverse() : update original array
fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort()
console.log(fruits);  // Apple,Banana,Mango, Oranage

fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.reverse()
console.log(fruits);  // Apple,Banana,Mango, Oranage

//toSorted() & toReversed() : return new array

//sort() don't use for numeric, we have to use below code:
//numeric sort using sort()
let points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){return a - b});

//Math.max
var arr = [10,20,60,50];
function myArrayMax(arr) {
  return Math.max.apply(null, arr);
}
console.log(myArrayMin(points)); // 60



