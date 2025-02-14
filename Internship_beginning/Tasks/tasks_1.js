// Array : [ 48, 0, 6, 65, 34, 78, 2, 7, 4, 550]
// 1) Find max valur from array
// 2) Sum of value 
// 3) filter and find second max and second min value
// 4) find odd and evevn number from array

let arr = [ 48, 0, 6, 65, 34, 78, 2, 7, 4, 550];

// 1) Find max valur from array
console.log(Math.max.apply(null,arr));

// 2) Sum of value 
console.log(arr.reduce((total,value) => total += value));

// 3) filter and find second max and second min value
let newArr = arr.toSorted(function(a, b){return a - b});
console.log("Sceond maximum : ",newArr.at(-2));
console.log("Sceond minimum : ",newArr[1]);

// console.log(arr.filter((value,index,array) => ))

// 4) find odd and evevn number from array
console.log(arr);
console.log("Odd : ");
for(var x of arr){
    x%2!=0?console.log(x):"";
}
console.log("Even : ");
for(var x of arr){
    (x%2==0)?console.log(x):"";
}

//1.Count Vowels in a String
// originalSentence = "JavaScript is awesome";
// Output: Number of vowels: 8
let c = 0;
let str = "JavaScript is awesome";
for(var x of str){
    (x=='a' || x=='e' || x=='i' || x=='o' || x=='u' || x=='A' || x=='E' || x=='I' || x=='O' || x=='U')?c++:"";
}
console.log("Number of Vowels : ",c);

// 2. Find the Longest Word
// sampleSentence = "JavaScript is a powerful programming language";
// Output: The longest word is: programming
let str2 = "JavaScript is a powerful programming language";
let strArr = str2.split(" ");
let max=0;
let word;
for(let x of strArr){
    let len = x.length;
    if(len>max){
        max=len;
        word=x;
    }
}
console.log("The longest word is : ",word);

// 3.Concatenate Arrays of Strings
// stringArrays = [['Hello', 'world'], ['JavaScript', 'is', 'fun']];
// Output: "Hello world JavaScript is fun"
let stringArrays = [['Hello', 'world'], ['JavaScript', 'is', 'fun']];
let newStringArrays = stringArrays.flat()
let resultStr = newStringArrays.join(" ");
console.log("3.Concatenate Arrays of Strings");
console.log(resultStr);

// 4.Capitalize the First Letter of Each Word
// const originalSentence = "javascript is fun and logical";
// Output: "Javascript Is Fun And Logical"
const originalSentence = "javascript is fun and logical";
let strUpArr = [];
for(var x in originalSentence){
    (x==0 || originalSentence[(x-1)]==" ")?strUpArr[x] = originalSentence[x].toUpperCase():
    strUpArr[x] = originalSentence[x];
}
let strUpCase = strUpArr.join("");
// console.log(strUpArr);
console.log("4.Capitalize the First Letter of Each Word");
console.log(strUpCase);
console.log();
console.log();
// 5.Replace Spaces with Underscores
// also first latter capital
// originalTextWithSpaces = "Rep lace sp aces with underscores";
// Output: "Replace_spaces_with_underscores"
let originalTextWithSpaces = "Rep lace sp aces with underscores";
console.log("5.Replace Spaces with Underscores");
console.log(originalTextWithSpaces.split(" ").join("_"));

console.log();
console.log();
// 6.Find the Average Word Length
// also particulare world 
// const exampleSentence = "Calculate the average length of words in this sentence.";
// Output: Average Word Length: 4.153846153846154
const exampleSentence = "Calculate the average length of words in this sentence.";
let strLenArr = [];
console.log("6.Find the Average Word Length");
let tempArr = exampleSentence.split(" ").map((value,inde,array) => value.length);
console.log("tempArr : ",tempArr);
let sum = tempArr.reduce((total,value) => total + value);
console.log("Average is : ",(sum/tempArr.length));


console.log();
console.log();
// 7.Remove Duplicates from a String
// const stringWithDuplicates = "javascript";
// Output: "javscript"
const stringWithDuplicates = "javascript";
let arrayWithoutDuplicate = [];
for(var x of stringWithDuplicates){
    (!arrayWithoutDuplicate.includes(x))?arrayWithoutDuplicate.push(x):"";
}
console.log("7.Remove Duplicates from a String : ");
// console.log(arrayWithoutDuplicate);
console.log(arrayWithoutDuplicate.join(""));

console.log();
// 8. find age
console.log("8. find age ");
console.log();
let DOB = new Date("2003-10-16");
let today = new Date();
console.log(((today - DOB)/(365*24*60*60*1000)).toFixed(0)," years old ");
console.log();

console.log();
// 9. Reverse Words in a Sentence
// const inputSentence = "JavaScript is amazing";
// Output: "amazing is JavaScript"
console.log("9. Reverse Words in a Sentence : ");
const inputSentence = "JavaScript is amazing";
console.log(inputSentence.split(" ").reverse().join(" "));

console.log();
// 10.Extract Domain from URL
// const sampleURL = "https://www.example.com/path/to/page";
// Output: Domain: www.example.com
const sampleURL = "https://www.example.com/path/to/page";
console.log("10.Extract Domain from URL ");
let start_index, end_index;
let len = sampleURL.length;
for(var i=0;i<len;i++){
    if(sampleURL[i]=='/' && sampleURL[i+1]=='/'){
        start_index = i+2;
        i+=2;
        break;
    }
}
while(sampleURL[i]!='/'){
    i++;
}
end_index = i;
console.log(sampleURL.slice(start_index,end_index));


console.log();
// 11.Extract File Extension
// const exampleFilename = "script.js";
// Output: File Extension: js
const exampleFilename = "script.js";
console.log("11.Extract File Extension ");
let index = exampleFilename.lastIndexOf(".") + 1;
console.log(exampleFilename.slice(index));

console.log();
console.log();

// 12.Extract Length of Words
// const inputWords = ["apple", "banana", "orange", "grape"];
// Output: Lengths of Words: [5, 6, 6, 5]
const inputWords = ["apple", "banana", "orange", "grape"];
console.log("12.Extract Length of Words ");
console.log(inputWords.map((value,index,array) => value.length));

// 13.Format Names
// - Create dynamic array
// const peopleArray = [
//     { firstName: "John", lastName: "Doe" },
//     { firstName: "Alice", lastName: "Smith" },
//     { firstName: "Bob", lastName: "Johnson" }
// ];
// Output: Formatted Names: ["John Doe", "Alice Smith", "Bob Johnson"]
const peopleArray = [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Alice", lastName: "Smith" },
    { firstName: "Bob", lastName: "Johnson" }
];
let namedArray = [];

function fullName(){
    return this.firstName + " " + this.lastName;
}
for(var i in peopleArray){
    namedArray[i] = fullName.call(peopleArray[i]);
}
console.log("13.Format Names ");
console.log(namedArray);
console.log();

// 14.Convert Fahrenheit to Celsius
// const fahrenheitTemperatures = [32, 68, 86, 104, 122];
// Output: Temperatures in Celsius: [0, 20, 30, 40, 50]
const fahrenheitTemperatures = [32, 68, 86, 104, 122];
console.log("14.Convert Fahrenheit to Celsius ");
const celsiusTemperatures = [];
for(var i in fahrenheitTemperatures){
    celsiusTemperatures[i] = ((fahrenheitTemperatures[i] - 32)/1.8);
}
console.log(celsiusTemperatures);
console.log();

// 15. Find the second largest number in an array:
// findSecondLargest([10, 20, 5, 40]);
// Output: 20
console.log("15. Find the second largest number in an array : ");

console.log(findSecondLargest([10, 20, 5, 40]));
function findSecondLargest(arr){
    arr.sort(function(a, b){return a - b});
    return arr.at(-2)
}
console.log('gg');

// 17.  Group consecutive elements of an array into subarrays of specified length:
// array - [1, 2, 3, 4, 5, 6, 7]
// length - 3; 
// Output: [[1, 2, 3], [4, 5, 6], [7]]
let array = [1, 2, 3, 4, 5, 6, 7];
let resultArray = [];
let length = 3;
let indax;
let arrLen = array.length;

for(var x=-1; x<arrLen;x+=length){
    if((x%length)==(length-1)){
        indax = x;
        // console.log("x : ",x,"(x-length-1) : ",(x-length+1)," x : ",x," (x+1) : ",((++x)) );
        let start = x-length+1;
        let end = x+1 ;
        resultArray.push(array.slice((start),(end)));
        console.log(x);
    }
}
resultArray.push(array.slice(indax+1));
console.log("17.  Group consecutive elements of an array into subarrays of specified length : ");
console.log(resultArray);


console.log();
// 18. Sort words in a sentence by their length
// text - "The quick brown fox jumps over the lazy dog"
// Output: "The fox the dog over lazy quick brown jumps"
let text = "The quick brown fox jumps over the lazy dog";
let textArr = text.split(" ");
let textLenArr = [];
let resultArr = [];
for(var x of textArr){
    textLenArr.push(x.length);
}
let textLenArrSorted = textLenArr.toSorted(function(a, b){return a - b});
console.log(textLenArr);
console.log(textLenArrSorted);

for(var x of textLenArrSorted){

    for(var y in textLenArr){
        if(x==textLenArr[y]){
            textLenArr[y]=0;
            resultArr.push(textArr[y]);
            break;
        }
    }
}
console.log("18. Sort words in a sentence by their length ");
console.log(resultArr);  


// 20. abcd task rotate 
//  a b c d e f
let rArr = ['a','b','c','d','e','f']; 
let swift = 3;
let l = rArr.length;
let LHS = rArr.slice(l-swift);
console.log(l);
let RHS = rArr.slice(0,swift);
console.log([...LHS,...RHS]);

// 21 .pelindrom
console.log("21 .pelindrom : ");

function pelindrom(pelindromStr) {
    let pelindromStrArr = pelindromStr.split("");
    let reversedPelindromStrArr = pelindromStrArr.toReversed();

    console.log("pelindromStrArr : ", pelindromStrArr);
    console.log("pelindromStrArr : ", reversedPelindromStrArr);

    if (pelindromStrArr.join() === reversedPelindromStrArr.join()) {
        console.log(true);
    } else {
        console.log(false);
    }
}
pelindrom("abcdef");
pelindrom("abcba");

// 22 .prime number
console.log("22 .prime number : ");

function primeNumber(n){
    let half = n/2;
    let flag = false;
    for(var x=0; x<half ; x++){
        if( n%x == 0){
            flag = true;
            break;
        }
    }
    (flag) ? console.log(n," is non prime.") : console.log(n," is prime.")
}
primeNumber(2);
primeNumber(22);



