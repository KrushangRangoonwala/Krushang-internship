// toString()	Returns a number as a string
// toExponential()	Returns a number written in exponential notation
// toFixed()	Returns a number written with a number of decimals
// toPrecision()	Returns a number written with a specified length
// valueOf()	Returns a number as a number

// toString()	Returns a number as a string
let x = 123;  // 123
x.toString();  // 123
(123).toString();  // 123
(100 + 23).toString();  // 123

// toExponential()	Returns a number written in exponential notation
x = 9.656;
x.toExponential();  // 9.656e+0
x.toExponential(2);  // 9.66e+0
x.toExponential(4);  // 9.6560e+0
x.toExponential(6);  // 9.656000e+0

// toFixed()	Returns a number written with a number of decimals
x = 9.656;
x.toFixed(0);  // 10
x.toFixed(2);  // 9.66
x.toFixed(4);  // 9.6560
x.toFixed(6);  // 9.656000

// toPrecision()	Returns a number written with a specified length
x = 9.656; // 
x.toPrecision();  // 9.656
x.toPrecision(2);  // 9.7
x.toPrecision(4);  // 9.656
x.toPrecision(6);  // 9.65600

// valueOf()	Returns a number as a number
x = 123;
x.valueOf();  // 123
(123).valueOf();  // 123 
(100 + 23).valueOf();  // 123

