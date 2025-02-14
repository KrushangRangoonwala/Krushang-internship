/* 
superset of JavaScript.

Why use TypeScript : https://www.typescripttutorial.net/typescript-tutorial/why-typescript/
two main reasons :
1) TypeScript adds a type system to help you avoid many problems with dynamic types in JavaScript.
2) TypeScript implements the future features of JavaScript a.k.a ES Next that doesn't run by js file but u can use that features in ts file.

TypeScript code compiled in plain JavaScript code using a TypeScript compiler. Know we can run that js file1
All JavaScript programs are TypeScript programs.

Setup:
Node.js is the environment that will run js file
TypeScript compiler – a Node.js module that compiles TypeScript into JavaScript.
vs cofde

Install TypeScript compiler:
npm install -g typescript
tsc --v
Version 5.5.3

Install tsx module : directlt run js file  
npm install -g tsx

TypeScript code compiled in plain JavaScript code using a TypeScript compiler. Know we can run that js file1
1) app.ts file -> cmd : tsc app.ts -> create app.js file -> cmd : node app.js -> got output 
if u change .js file created by tscript compiler, u will lose your changes when u again compile that file

2) app.ts file -> cmd : tsx app.ts -> got output 

ex.,
let box;
console.log(typeof(box)); // undefined
box = "Hello";
console.log(typeof(box)); // string
box = 100;
console.log(typeof(box)); // number

Types in TypeScript
1) Primitive types.
    -string
    -number
    -boolean
    -null
    -undefined
    -symbol : Represent a unique constant value.

2) Object types.
    -functions, arrays, classes, etc.

>> Type Annotation in TypeScript
to specify explicit types for identifiers such as variables, functions, objects, etc.

syntax:
let variableName: type = value;


let counter: number;
counter = 1;
counter = 'Hello'; // compile error : "Type '"Hello"' is not assignable to type 'number'."

let name: string = 'John';
let active: boolean = true;

For array : syntax 
let arrayName: type[];

let names: string[] = ['John', 'Jane', 'Peter', 'David', 'Mary'];

for Object syntax :
let person: {
  name: string;
  age: number;
};

For Function : syntax
let greeting : (name: number) => string;  // argument type: number && function  return type : string

greeting = function (name: string) {
    return `Hi ${name}`;
};      // valid : parameter type string && function return type string

greeting = function () {
    console.log('Hello');
};      // not valid : parameter type is not void && function return type is not void                          
// error : Type '() => void' is not assignable to type '(name: string) => string'. Type 'void' is not assignable to type 'string'.


>> Type Inference : when we don't assign type then compiler dynamically assign typeby our specified value

let price = 9.95;     // compiler allocate price varible type : number 

function increment(counter=10) {
    return counter++;
}
//function argument inferce(adopt) type : number
//similarlly, function return value inferce(adopt) type : number 
//Here we don't need to specify type in our code.

Type annotations : You explicitly tell TypeScript the type
Type inference : TypeScript guesses the type	

>> type :
numbers :
let price: number;
let price = 9.95;

note - avaScript has the Number type (with the letter N in uppercase) that refers to the non-primitive boxed object. You should not use this Number type as much as possible in TypeScript. 

let big: bigint = 9007199254740991n;  // represent the whole numbers larger than 253 – 1
//A Big integer literal has the n character at the end of an integer literal like this:

>> object type

The TypeScript object type represents all values that are not in primitive types.

primitive types in TypeScript:
 -number
 -bigint
 -string
 -boolean
 -null
 -undefined
 -symbol

```
let employee: object;
employee = {
    firstName: 'John',
    age: 25,
};

console.log(employee);
```

If you attempt to access a non_existing property in object, you’ll get an error
in javascript it shows `undefined`

note - `The object type represents all non-primitive values while the Object type describes the functionality of all objects.`


--
empty type {}
The empty type {} describes an object that has no property on its own. If you try to access a property on such an object, TypeScript will issue a compile-time error:
```
let vacant: {};
vacant.firstName = 'John';
Error : error TS2339: Property 'firstName' does not exist on type '{}'.
```

***
But you can access all properties and methods declared on the Object type, which is available on the object via the prototype chain:

let vacant: {} = {};
console.log(vacant.toString());

Output:
[object Object]
***

Summary : 
 -The TypeScript object type represents any value that is not a primitive value.
 -The Object type, however, describes functionality that is available on all objects.
 -The empty type {} refers to an object that has no property on its own.

optional property :
```
const car: { type: string, mileage?: number } = { // no error
type: "Toyota"
};
car.mileage = 2000;
```

Index Signatures :
It can be used for objects that have not defined list of properties.

```
const nameAgeMap: { [index: string]: number } = {};
nameAgeMap.Jack = 25; // no error
nameAgeMap.Mark = "Fifty"; // Error: Type 'string' is not assignable to type 'number'.
```


>> Array Type

let skills: string[] = [];
skills[0] = "Problem Solving";
skills[1] = "Programming";

-> Storing values of mixed types
let scores = ['Programming', 5, 'Software Design', 4]; 

In this case, TypeScript infers the scores array as an array of string | number. It’s equivalent to the following:
let scores : (string | number)[];
scores = ['Programming', 5, 'Software Design', 4]; 

>> unknown type: TypeScript checks the type before performing operations on it.
syntax : let result: unknown;
```
let result: unknown;

result = 1;
result = 'hello';
result = false;
result = Symbol();
result = { name: 'John' };
result = [1, 2, 3];
```

let result: unknown;
result = [1,2,3];

const total = result.reduce((a: number, b:number ) => a + b, 0); //  its type is still unknown. So, we cannot call reduce() method of array on it.

const total = (result as number[]).reduce((a: number, b: number) => a + b, 0);  // will run >> type assertion used
console.log(total);  //6

https://www.typescripttutorial.net/typescript-tutorial/typescript-unknown-type/  "Unknown vs Any" type take ss

>> Tuple :  like an array with some additional charactaristics
no of elements in tuple is fixed.
types of elements are known, and need not be the same.
ex.,

```
// define our tuple
let ourTuple: [number, boolean, string];
// initialize correctly
ourTuple = [5, false, 'Coding God was here'];
// We have no type safety in our tuple for indexes 3+
ourTuple.push('Something new and wrong');  // added succesfully
console.log(ourTuple);
```

Optional Tuple Elements : its specified using the question mark (?) postfix.
```
let bgColor, headerColor: [number, number, number, number?];
bgColor = [0, 255, 255, 0.5];  //valid
headerColor = [0, 255, 255];  //valid
```

Named Tuple : 
```
const graph: [x: number, y: number] = [55.2, 41.3];
```

Destructuring :
```
const graph: [number, number] = [55.2, 41.3];
const [x, y] = graph;
```

>> Enum : https://www.typescripttutorial.net/typescript-tutorial/typescript-enum/
An enum is a group of named constant values.
```
enum name {constant1, constant2, ...};
```

enums will initialize the first value to 0 and add 1 to each additional value:

1) Numeric Enums - Default
```
enum CardinalDirections {
  North,
  East,
  South,
  West
}
let currentDirection = CardinalDirections.North;
console.log(currentDirection);  // logs 0
```

2) Numeric Enums - Initialized
```
enum CardinalDirections {
  North = 2,
  East,
  South,
  West
}
console.log(CardinalDirections.North); // logs 2
console.log(CardinalDirections.West);  // logs 5
```

3)  Fully Initialized
```
enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}
console.log(StatusCodes.NotFound);  // logs 404
console.log(StatusCodes.Success);  // logs 200
```

4) String Enums
```
enum CardinalDirections {
  North = 'North',
  East = "East",
  South = "South",
  West = "West"
};
console.log(CardinalDirections.North);  // logs "North"
console.log(CardinalDirections.West);  // logs "West"
```

>> any : when we don't predict datatype of variable then "any" used 
unpredictable value may come from a third-party API or user input.

```
let result: any;

result = 1;
console.log(result);

result = 'Hello';
console.log(result);

result = [1, 2, 3];
const total = result.reduce((a: number, b: number) => a + b, 0);
console.log(total);
```

> void : it denotes the absence of having any type at all. Typically, you use the void type as the return type of functions that do not return a value.
```
function log(message): void {
    console.log(messsage);
    }
```

note - whose function's return type is "void", that func we cannot assign to varibale

>> union : to store a value of one or several types in a variable  or function.

```
let result: number | string;
result = 10; // OK
result = 'Hi'; // also OK
result = false; // a boolean value, NOT OK
```

```
function add(a: number | string, b: number | string) :  number | string {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
        return a.concat(b);
    }
    throw new Error('Parameters must be numbers or strings');
}
```

>> type aliases : to define new names for existing types.

syntax :
type alias = existingType;

Type alias examples

1) Primitive types
```
type Name: string;

let firstName: Name;
let lastName: Name;
```

2) Object types

```
type Person = {
  name: string;
  age: number;
};

let person: Person = {
  name: 'John',
  age: 25
};
```

3) Union Types 
Creating reusable types that can be used in many places in the codebase.

```
type alphanumeric = string | number;

let input: alphanumeric;
input = 100; // valid
input = 'Hi'; // valid
input = false; // Compiler error
```

4) Intersection Types

```
type Personal = {
  name: string;
  age: number;
};

type Contact = {
  email: string;
  phone: string;
};

type Candidate = Personal & Contact;

let candidate: Candidate = {
  name: "Joe",
  age: 25,
  email: "joe@example.com",
  phone: "(408)-123-4567"
};
```

>> String Literal Types : 
The string literal type is useful to limit a possible string value that a variable can store.

syntax :
```
let click: 'onclick'; 
click = 'onclick'  // valid
click = 'dbclick'  //  compiler error
```
we cannot assign any other string to 'click' varible 
we can only asign 'onclick' to click varible

```
let mouseEvent: 'click' | 'dblclick' | 'mouseup' | 'mousedown';
mouseEvent = 'click'; // valid
mouseEvent = 'dblclick'; // valid
mouseEvent = 'mouseup'; // valid
mouseEvent = 'mousedown'; // valid
mouseEvent = 'mouseover'; // compiler error
```
we can only assign given 4 values to 'click' varible . 
4 values are : 'click' | 'dblclick' | 'mouseup' | 'mousedown';
if we assign any other string to 'mouseEvent' varible, it gives compile time error 

another syntax : 
type Role = 'admin' | 'user';
Role that can be either a string 'admin' or 'user', it cannot contain any other value .

>> never Type : 
never type is a type that holds no value

```
let empty: never = 'hello';  // Type 'string' is not assignable to type 'never'
```


case 2 : 
```
type Alphanumeric = string & number; // never
```
here, 'Alphanumeric' have both types, a string and a number at the same time, which is impossible:
So, TypeScript compiler infers the type of Alphanumeric as never.

case 3 :
Use never type as function return type ,When function doesn't return any thing
```
function raiseError(message: string): never {
    throw new Error(message);
}
```
I don't know differenc between 'viod' and 'never'

Mainly use never type when function throw Error

*/