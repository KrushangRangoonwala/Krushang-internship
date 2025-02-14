let arrEle = [];
let p_id = 20;
console.log("Started..");

function myFunction(){
    let num = document.getElementById("num").value;
    let seq_type = document.getElementById("seq_type").value;
    let arr1 = [1,2,3,4,5,6,7,8,9,10];
    let arr2 = ['a','b','c','d','e','f','g','h','i','j','k'];
    let arr3 = ['A','B','C','D','E','F','G','H','I','J','K'];
    let arr4 = ['one','two','three','four','five','six','seven','eight','nine','ten'];
    let p = document.createElement("p");
    var c = 0;

    function printArr(arr){
        for(var x of arr){
            if(c<num){
                arrEle.push(`<button id="${c}" onclick="rotate(${c})"> ${x} </button>`);  
                ++c;
            }else{
                break;
            }
        }
    }

    switch(seq_type){
        case '1' : printArr(arr1);
        break;
        case 'a' : printArr(arr2);
        break;
        case 'A' : printArr(arr3);
        break;
        case "One" : printArr(arr4);
        break;
    }
    console.log(seq_type);    
    p.innerHTML = arrEle.join(" ");
    p.innerHTML += " ";
    document.body.append(p);
    
    p.setAttribute("id",`${p_id}`);
    p_id++;
}


function rotate(i){
    let num = document.getElementById("num").value;
    for(var x in arrEle){
        document.getElementById(`${x}`).removeAttribute("onclick");
        document.getElementById(`${x}`).removeAttribute("id");
    }
   
    let p_content = document.getElementById(`${(--p_id)}`).innerHTML;
    document.getElementById(`${p_id}`).removeAttribute("id");
    console.log("p_content : ",p_content);

    let newArrEle = [];
    var m = 0;
    for(var x=0; x<num ; x++){
        m += 21;
        newArrEle.push(p_content.slice(m-21,m))
    }

    arrEle = newArrEle;
    console.log("arrEle : ",arrEle)
    
    let subArr1 = arrEle.slice(i);
    let subArr2 = arrEle.slice(0,i);
    arrEle = [...subArr1,...subArr2];
    
    // console.log("arrEle : ",arrEle)
    let p = document.createElement("p");
    p.innerHTML = arrEle.join("");
    // p.innerHTML += " ";
    document.body.append(p);
    p.setAttribute("id",`${p_id}`);
    p_id++;

    // console.log(p.children);
    let g = 0;
    let child_btn = p.firstElementChild;
    child_btn.setAttribute("id",`${g}`);
    child_btn.setAttribute("onclick",`rotate(${g})`);
    g++;
    for(g=1;g<num;g++){
        child_btn = child_btn.nextElementSibling;
        child_btn.setAttribute("id",`${g}`);
        child_btn.setAttribute("onclick",`rotate(${g})`);
 }
}
    // for(var x of p.children){
    //     x.setAttribute("id",`${x}`);
    // }

    // for(var x in arrEle){
    //     document.getElementById(`${x}`).setAttribute("id",`${x}`);
    //     document.getElementById(`${x}`).setAttribute("onclick",`rotate(${x})`);
    // }


//<button> 2 </button>
//p_content :  <button> 1 </button> <button> 2 </button> <button> 3 </button> <button> 4 </button> <button> 5 </button>
