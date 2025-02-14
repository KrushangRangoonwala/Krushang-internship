// var obj = {
//     category : {
//         Electronics: 400,
//         Clothing: 150,
//     },
// }
// let dynamic = "Electronics";
// let dyCat = "category";
// console.log(obj[dyCat][dynamic]);
// let val = 111;
// obj[dyCat][dynamic] = val;
// console.log(obj[dyCat][dynamic]);
// console.log(obj);

// let date = '2022';
// let date2 = '2222-02';
// Object.defineProperty(obj[date],date2,{value:{}});
// // obj.date = {
// //     Clothing: 150,
// // };
// obj[date2] = 1111;
// console.log('2022' in obj);
// console.log(obj);
// console.log(date2 in obj[date]);
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
// let arr1 = [1,2,3,4,5];
// let arr2 = [1,2,3,4,5];
// (arr1==arr2)? console.log(true) : console.log(false); 
// console.log(pelindromStrArr);
// console.log(pelindromStrArr.toReversed());

// console.log(pelindromStr.());
