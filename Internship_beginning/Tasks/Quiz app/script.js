const quizData = [
    {
        question: "What is the output of `typeof NaN`?",
        options: ["number", "NaN", "undefined", "string"],
        correct: "number",
    },
    {
        question: "Which method is used to add elements to an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: "push()",
    },
    {
        question: "What is the output of `2 + '2'`?",
        options: ["22", "4", "NaN", "undefined"],
        correct: "22",
    },

];

var n = 0;
console.log("n ",n);


function loadFunc() {
    document.getElementById('btn').innerText = 'Start';
}

function next() {
    (n==0)? document.getElementById('btn').innerText = 'Next': '';
    // console.log("next ",n);

    document.getElementById('ques').innerText = quizData[n].question;

    for (let x = 0; x < 4; x++) {
        let id = x + 1;
        document.getElementById(`opt${id}`).value = quizData[n].options[x];
        document.getElementById(`opt${id}L`).value = quizData[n].options[x];
    }

    n++;
}
