let words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let finishMessageSpan = document.querySelector(".finish span");
let selectLevel = document.querySelector(".selecting-levels .selector");

const lvls = {
    "Easy": 5,
    "Medium": 3,
    "Hard": 2
};



let defaultLvl = "Normal";
let defaultLvlSecond = lvls[defaultLvl];

scoreTotal.innerHTML = words.length;
lvlNameSpan.innerHTML = selectLevel.value;
secondsSpan.innerHTML = lvls[selectLevel.value];

selectLevel.addEventListener("click", () => {
    lvlNameSpan.innerHTML = selectLevel.value;
    secondsSpan.innerHTML = lvls[selectLevel.value];
});


startButton.addEventListener("click", () => {
    timeLeftSpan.innerHTML = lvls[selectLevel.value];
    input.removeAttribute("disabled", "");
    playGame();
    randomGen();
});

input.onpaste = () => {
    return false;
};

function randomGen() {
    let random = words[Math.floor(Math.random() * words.length)];
    upcomingWords.innerHTML = "";
    let wordIndex = words.indexOf(random);
    words.splice(wordIndex, 1);
    theWord.innerHTML = random;
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(words[i]));
        upcomingWords.appendChild(div);
    }
}

function playGame() {
    startButton.style.display = "none";
    input.focus();
    finishMessage.innerHTML = "";
    selectLevel.setAttribute("disabled", "");
    let counter = setInterval(function () {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            startButton.style.display = "block";
            selectLevel.removeAttribute("disabled", "");
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                timeLeftSpan.innerHTML = lvls[selectLevel.value];
                scoreGot.innerHTML++;
                input.value = "";
                if (words.length > 0) {
                    randomGen();
                }
                else {
                    let span = document.createElement("span");
                    span.appendChild(document.createTextNode("Great Work!"));
                    span.className = "good";
                    finishMessage.appendChild(span);
                    clearInterval(counter);
                }
            }
            else {
                let span = document.createElement("span");
                span.appendChild(document.createTextNode("Game Over"));
                span.className = "bad";
                finishMessage.appendChild(span);
                input.setAttribute("disabled", "");
                clearInterval(counter);
            }
        }
    }, 1000);
}