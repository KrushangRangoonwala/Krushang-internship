function clearFunc() {
    let strInput = document.getElementById("strInput");
    strInput.value = '';
}

function removeInputFeilds() {
    let param1, param2, param3;
    param1 = document.getElementById("param1");

    if (param1) {
        param1.remove();
        param2 = document.getElementById("param2");
        if (param2) {
            param2.remove();
            param3 = document.getElementById("param3");
        } if (param3) {
            param3.remove();
        }
    }
}

function concateStringNumber() {
    let processBtn = document.getElementById('process');
    let nstr = processBtn.value;
    processBtn.remove();

    for (let x = 0; x <= nstr; x++) {
        let textarea = document.createElement('textarea');
        textarea.setAttribute('id', `str${x}`);
        textarea.setAttribute('name', `str${x}`);
        textarea.setAttribute('cols', '30');
        document.body.app
    }
}

function calculate(tag) {
    let title = document.getElementById("funcName");
    let strFunc = tag.innerText;
    // let br = document.getElementById("br");
    let outputBtn = document.getElementById("outputBtn");

    title.innerText = strFunc;

    let param1 = document.getElementById("param1");
    let param2 = document.getElementById("param2");
    let param3 = document.getElementById("param3");

    switch (strFunc) {
        case 'length':
            outputBtn.setAttribute('onclick', 'output("length")')
            break;

        case 'at()':
        case '[]':
        case 'charCodeAt()':
            // removeInputFeilds();
            console.log(param1.getAttribute('style'));
            param1.removeAttribute('style');
            document.getElementById("param1").style.display = "block";
            document.getElementById("param1").style.visibility = "visible";
            // param1.setAttribute('style', ' display: block,visibility: visible;');
            // param1.setAttribute('style', ' visibility: visible;');
            console.log(param1.getAttribute('style'));
            param1.setAttribute('placeholder', 'Enter index');
            param1.after(document.createElement('br'));
            param1.after(document.createElement('br'));


            switch (strFunc) {
                case 'at()': outputBtn.setAttribute('onclick', 'output("at()")');
                    break;
                case '[]': outputBtn.setAttribute('onclick', 'output("[]")');
                    break;
                case 'charCodeAt()': outputBtn.setAttribute('onclick', 'output("charCodeAt()")');
                    break;
            }
            break;

        case 'substring()':
        case 'slice()':
        case 'substr()':
            removeInputFeilds();
            param1.removeAttribute('display');
            param2.removeAttribute('display');
            param1.setAttribute('placeholder', 'Start Index');
            param2.setAttribute('placeholder', 'End Index');

            param1.after(document.createElement('br'));
            param1.after(document.createElement('br'));
            param2.after(document.createElement('br'));
            param2.after(document.createElement('br'));

            br.after(param2);
            br.after(param1);

            switch (strFunc) {
                case 'substring()': outputBtn.setAttribute('onclick', 'output("substring()")');
                    break;
                case 'slice()': outputBtn.setAttribute('onclick', 'output("slice()")');
                    break;
                case 'substr()':
                    outputBtn.setAttribute('onclick', 'output("substr()")');
                    param2.setAttribute('placeholder', 'Enter length');
                    break;
            }
            break;

        case 'concat()':
            removeInputFeilds();
            param1.setAttribute('placeholder', 'Enter no. of string');
            br.after(param1);

            let btn = document.createElement('button');
            btn.setAttribute('id', 'process');
            btn.setAttribute('onclick', 'concateStringNumber()');
            btn.innerText = 'process';
            break;

        case 'trim()':
            break;
        case 'trimStart()':
            break;
        case 'trimEnd()':
            break;
        case 'repeat()':
            break;
        case 'padStart()':
            break;
        case 'padEnd()':
            break;
        case 'toUpperCase()':
            break;
        case 'toLowerCase()':
            break;
        case 'replace()':
            break;
        case 'replaceAll()':
            break;
        case 'split()':
            break;
        case 'includes()':
            break;
        case 'indexOf()':
            break;
        case 'lastIndexOf()':
            break;
        case 'startsWith()	':
            break;
        case 'endsWith()':
            break;
    }
}

function output(strFunc) {
    let strInput = document.getElementById("strInput");
    let strOutput = document.getElementById("strOutput");
    strOutput.innerHTML = '<code>Output : </code>';

    let param1, param2, param3;
    param1 = document.getElementById("param1");
    if (param1) {
        param2 = document.getElementById("param2");
        if (param2) {
            param3 = document.getElementById("param3");
        }
    }

    switch (strFunc) {
        case 'length':
            strOutput.innerText += " " + strInput.value.length;
            break;

        case 'at()':
            strOutput.innerText += " " + strInput.value.at(param1.value);
            break;

        case '[]':
            strOutput.innerText += " " + strInput.value[param1.value];
            break;
        case 'charCodeAt()':
            strOutput.innerText += " " + strInput.value.charCodeAt(param1.value);
            break;

        //-----------------------------------------------------------------------------------
        case 'substring()':
            strOutput.innerText += " " + strInput.value.substring(param1.value, param2.value);
            break;
        case 'slice()':
            // (param2.value)? strOutput.innerText += " " + strInput.value.slice(param1.value,param2.value): strInput.value.slice(param1.value);
            if (param2.value) {
                strOutput.innerText += " " + strInput.value.slice(param1.value, param2.value);
            } else {
                strOutput.innerText += " " + strInput.value.slice(param1.value)
            }
            break;
        case 'substr()':
            strOutput.innerText += " " + (param2.value) ? strInput.value.substr(param1.value, param2.value) : strInput.value.substr(param1.value);
            break;
        case 'concat()':
            break;

        //-----------------------------------------------------------------------------------
        case 'trim()':
            break;
        case 'trimStart()':
            break;
        case 'trimEnd()':
            break;
        case 'repeat()':
            break;
        case 'padStart()':
            break;
        case 'padEnd()':
            break;
        case 'toUpperCase()':
            break;
        case 'toLowerCase()':
            break;
        case 'replace()':
            break;
        case 'replaceAll()':
            break;
        case 'split()':
            break;
        case 'includes()':
            break;
        case 'indexOf()':
            break;
        case 'lastIndexOf()':
            break;
        case 'startsWith()	':
            break;
        case 'endsWith()':
            break;
    }
}

