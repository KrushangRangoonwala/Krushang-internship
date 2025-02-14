let arr = [ 1,2,3,4,5,2,3,5,6,7,2,21,3,2];

for(var i=0;i<=6;i++){
    if(arr[i]==2){
        arr[i]=9;
    }
}

2==2??console.log("right");

console.log("arr  : ",arr)
var a = arr.slice(2,3);
console.log(arr);
console.log(a);

console.log(arr.splice(2,1,6));
console.log(arr);
console.log("Even Numbers : ")

for( let i of arr){
    // if(i%2==0){
    //   return  console.log("Even : ",i);
    // }
    // else{
    //   return  console.log("Odd : ",i);
    // }
    let n = i%2;
    switch(n){
        case 0 : console.log("even : ",i);
        continue;
        case 1 : console.log("odd : ",i);
        break;
        default : console.log("Invalide");
    }
}

