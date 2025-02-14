
function divide() {
    let n = document.getElementById("num").value;
    console.log("Value : ");
    let a = document.getElementById("sel").value;
    document.getElementById("table1").innerHTML = a / n;
}

function calculate() {
    let n = document.getElementById("num").value;

    (n<1 || n>50) ? alert("Should be between 1 to 50"): "";

    let text = "";
    let arr = [];
    let mult;
    for (var i = 1; i < 11; i++) {
        mult = n * i;
        arr.push(mult);
        text += `${n} * ${i} = ${mult}<br>`;
    }
    document.getElementById("table").innerHTML = text;

    let div = document.createElement("select");
    div.setAttribute('id', 'sel');
    div.setAttribute("onchange", "divide()");
    for (var x of arr) {
        div.innerHTML += `<option value="${x}"> ${x} </option>`
    }
    table.after(div);
    // document.body.append(div);
}