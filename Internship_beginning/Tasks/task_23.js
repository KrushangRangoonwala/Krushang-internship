
// const summarizedSales = {
//     '2024-01': {
//         Electronics: 400,
//         Clothing: 150,
//     },
//     '2024-02': {
//         Electronics: 200,
//         Clothing: 250,
//     },
//     '2024-03': {
//         Furniture: 400,
//     },
// };

const salesData = [
    { date: '2024-01-15', amount: 100, category: 'Electronics' },
    { date: '2024-01-20', amount: 150, category: 'Clothing' },
    { date: '2024-02-10', amount: 200, category: 'Electronics' },
    { date: '2024-01-30', amount: 300, category: 'Electronics' },
    { date: '2024-02-25', amount: 250, category: 'Clothing' },
    { date: '2024-03-05', amount: 400, category: 'Furniture' },
];

// let dummySalesData = salesData;
// let month = [];

// for(var x of dummySalesData){
//     let temp = x.date.slice(0,7);
//     if(!month.includes(temp)){
//         month.push(temp);
//     }
// }
// console.log(month);

let summarizedSales = {};


for(var x of salesData){
    let date = x.date.slice(0,7);
    if(!(date in summarizedSales)){
        // Object.defineProperty(summarizedSales,date,{value:{}}); 
        summarizedSales[date] = {};
    }
    let category = x.category;
    if(!(category in summarizedSales[date])){
        // Object.defineProperty(summarizedSales[date],category,{value:0});
        summarizedSales[date][category] = 0;
    }

    let item = summarizedSales[date][category];
    console.log("item : ", item) 
    item += x.amount;
    console.log("After item : ", item) 
    // Object.defineProperty(summarizedSales[date],category,{value:item});
    summarizedSales[date][category] = item;
    console.log(summarizedSales[date][category]);
    // console.log(summarizedSales[date]);
    // console.log("x.amount : ",x.amount ,"item : ", item );

}
console.log(summarizedSales);

// let tempArr = [];
// for(var y of month){
//     let subTempArr = [];
//     for(var x of dummySalesData){
//         if(x.date.includes(y)){
//             subTempArr.push(x);
//         }
//     }
//     tempArr.push(subTempArr);
// }
// console.log(tempArr);


// for(var x of tempArr){
//     for(var y of tempArr[x]){
//         summarizedSales.y = {
            
//         }
//     }
// }