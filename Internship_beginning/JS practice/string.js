let str = 'hello guys.. it\'s me..  '
console.log(str);

// Template litarels : use to right multiline string, inside this we can use "" and '' easily 
str = `hello
guys..!!
its me
...
`
console.log(str);

let numStr = "0123456789";

console.log(numStr);    // 0123456789
console.log(numStr.length);    // 10

console.log(numStr.charAt(0));  // 0
console.log(numStr.at(-1));  // 9
console.log(numStr[-1]);  // undefined
console.log(numStr.charCodeAt(1));  // 49 

console.log();
console.log("numStr.substring(1,5)",numStr.substring(1,5));
console.log("numStr.slice(1,5)",numStr.slice(1,5));
console.log("numStr.slice(-1,-5)",numStr.slice(-1,-5));
console.log("numStr.substrg(1,5)",numStr.substr(1,5));
console.log("str.toUpperCase() ",str.toUpperCase() );
console.log("str.toLowerCase() ",str.toLowerCase() );

let str2 = "Booomm..!";
console.log('str.concat(" ",str2) ',str.concat(" ",str2));

let trimStr = "         hi ..heloo..    ";

console.log("trimStr.trim() : ",trimStr.trim());
console.log("trimStr.trimStart() : ",trimStr.trimStart());
console.log("trimStr.trimEnd() : ",trimStr.trimEnd());

console.log('str2.padStart(4," GM ") : ',str2.padStart(4," GM "));
console.log('str2.padEnd(4," GN ") : ',str2.padEnd(4," GN "));

console.log("str2.repeat(4) : ",str2.repeat(4));

console.log();
let str3 = "Boom... Boom... Boom..."
console.log(str3);
console.log('str3.replace("Boom","Dhoom") : ',str3.replace("Boom","Dhoom"));
console.log('str3.replaceAll("Boom","Dhoom") : ',str3.replaceAll("Boom","Dhoom"));
console.log('str3.replace(/Boom/g,"Dhoom") : ',str3.replace(/Boom/g,"Dhoom"));
console.log('str3.replace(/bOOM/,"Dhoom") : ',str3.replace(/bOOM/,"Dhoom"));
console.log('str3.replace(/bOOM/i,"Dhoom") : ',str3.replace(/bOOM/i,"Dhoom"));

let strArr = str3.split(" ");   // string can be converted to an array
console.log("lenght : ",strArr.length);
console.log("strArr : ",strArr);

console.log();
let locate = "Please locate where 'locate' occurs!";
console.log("locate : ",locate);
console.log('locate.indexOf("locate") : ',locate.indexOf("locate"));
console.log('locate.lastIndexOf("locate") : ',locate.lastIndexOf("locate"));
console.log('locate.indexOf("locate",8) : ',locate.indexOf("locate",8));
console.log('locate.lastIndexOf("locate",20) : ',locate.lastIndexOf("locate",20));

console.log(locate.search(/locate/));  // in search() we can use regExp

console.log();
console.log("match() method returns an array containing the results of matching string");
let text = "The rain in SPAIN stays mainly in the plain"; 
console.log("text : ",text);
let myArr1 = text.match(/ain/);
console.log("Array len : ",myArr1.length, `\n Array : `,myArr1);
let myArr_1 = text.matchAll('ain');
console.log("Array len : ",myArr_1.length, `\n Array : `,myArr_1);
let myArr2 = text.match(/ain/g);
console.log("Array len : ",myArr2.length, `\n Array : `,myArr2);
let myArr3 = text.match(/ain/gi);
console.log("Array len : ",myArr3.length, `\n Array : `,myArr3);

console.log();
console.log("locate : ",locate);
console.log('locate.includes("locate") : ',locate.includes("locate"));  // case sensitive.
console.log('locate.includes("locate",10) : ',locate.includes("locate",10));

console.log();
console.log("locate : ",locate);
console.log('locate.startsWith("locate") : ',locate.startsWith("locate"));
console.log('locate.startsWith("locate",7) : ',locate.startsWith("locate",7));
console.log('locate.endsWith("locate") : ',locate.endsWith("locate"));
console.log('locate.endsWith("locate",-9) : ',locate.endsWith("locate",-9));

console.log();
