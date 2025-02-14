function create() {
    let cols = document.getElementById("n1").value;
    let raw = document.getElementById("n2").value;
    let txt = "";
    let table = document.createElement("TABLE");
    console.log(cols)
    console.log(raw)
    for (var i = 0; i < raw; i++) {
        txt += "<tr>";
        for (var j = 0; j < cols; j++) {
            txt += `<td onclick="style='border-color:red;'" ondblclick="style='border-color:black;'"> # </td>`;
        }
        txt += "</tr>";
    }
    
    table.innerHTML = txt;
    console.log(table.innerHTML);
    document.body.append(table);
}