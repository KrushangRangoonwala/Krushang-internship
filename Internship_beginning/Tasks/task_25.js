// 25.
// nested group
// first year then month

// output :
// {
//   "2024"= {
//     "01": [
//       { "date": "2024-01-15", "amount": 100, "category": "Electronics" },
//       { "date": "2024-01-20", "amount": 150, "category": "Clothing" },
//       { "date": "2024-01-30", "amount": 200, "category": "Electronics" }
//     ],
//     "02": [
//       { "date": "2024-02-05", "amount": 250, "category": "Clothing" },
//       { "date": "2024-02-15", "amount": 300, "category": "Electronics" }
//     ],
//     "03": [
//       { "date": "2024-03-10", "amount": 400, "category": "Furniture" },
//       { "date": "2024-03-15", "amount": 150, "category": "Electronics" }
//     ]
//   }
// }

const sales = [
    { date: '2024-01-15', amount: 100, category: 'Electronics' },
    { date: '2024-01-20', amount: 150, category: 'Clothing' },
    { date: '2024-01-30', amount: 200, category: 'Electronics' },
    { date: '2024-02-05', amount: 250, category: 'Clothing' },
    { date: '2024-02-15', amount: 300, category: 'Electronics' },
    { date: '2024-03-10', amount: 400, category: 'Furniture' },
    { date: '2024-03-15', amount: 150, category: 'Electronics' },
];

let summarizedSales = {};

for(var x of sales){
    let year = x.date.slice(0,4);
    let month = x.date.slice(5,7);
    if(!(year in summarizedSales)){
        summarizedSales[year] = {};
    }
    if(!(month in summarizedSales[year])){
        summarizedSales[year][month] = [];
    }
    summarizedSales[year][month].push(x); 
}

console.log(JSON.stringify(summarizedSales, null, 4));
// console.log(summarizedSales);
