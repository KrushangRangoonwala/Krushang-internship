console.log("entered");

let display = document.getElementById("display");
// let textarea = document.getElementById("textarea");

display.addEventListener("keyup", (e) => {
    appendToDisplay(e.key);
    console.log(e.key);
});


function btnPress(tag) {
    // console.log("entered");
    let dis = document.getElementById('display').innerText;
    let val = tag.innerText;
    console.log("val ", val);
    appendToDisplay(val);

}
function appendToDisplay(val) {

    switch (val) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case '(':
        case ')':
        case '00':
            let dis = document.getElementById('display').innerText;
            dis += val;
            document.getElementById('display').innerText = dis;
            break;

        case 'x^x':
        case '^':
            console.log('x^x');
            let strx = document.getElementById('display').innerText;
            let strxArr = strx.split("");
            strxArr.unshift('(');
            strxArr.push(')**');
            let strRe = strxArr.join("");
            console.log(strRe);
            document.getElementById('display').innerText = strRe;
            break;  

        case 'CE':
        case 'c':
        case 'C':
            document.getElementById('display').innerText = '';
            break;

        case 'DEL':
        case 'Backspace':
            let str = document.getElementById('display').innerText;
            document.getElementById('display').innerText = str.slice(0, (str.length - 1));
            break;

        case '=':
        case 'Enter':
            document.getElementById('display').innerText = eval(document.getElementById('display').innerText);
            break;

        case '+/-':
            console.log('+/-');
            let strm = document.getElementById('display').innerText;
            let strmArr = strm.split("");
            strmArr.unshift('-(');
            strmArr.push(')');
            document.getElementById('display').innerText = strmArr.join("");
            break;

        default: console.log("default case");
            // alert("Enter Numbers only.");
            break;
    }
}
