console.log("Entered...");
let array = [];
function addToArray() {
    let arr_element = document.getElementById("arr-element-id");
    array.push(arr_element.value);
    arr_element.value = '';
    document.getElementById("org-arr").innerHTML = "Your Array : " + array;
}

// let array = [1, 2, 3, 4, 5];

function createArray() {
    let num = document.getElementById("num-id").value;
    let arr = document.getElementById("arr");
    let arr2 = document.getElementById("arr2");
    let arr3 = document.getElementById("arr3");
    let tempArr = array.slice(-num);
    let tempArr2 = array.slice(0, (array.length - num));
    arr.innerHTML = " Array part-1 : " + tempArr;
    arr2.innerHTML = " Array part-2 : " + tempArr2;
    arr3.innerHTML = "Rotated Array : " + tempArr.concat(tempArr2);
}