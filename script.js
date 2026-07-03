const typeArea = document.getElementById('type-area');
const input = document.getElementById('hidden-input');
const wpmDisplay = document.getElementById('wpm');

let targetText = "";
let currentIndex = 0;
let startTime = null;
let errors = 0;

// 1. Generate random "Keybr-style" pseudo-words
//function generateText() {
    //const chars = "eaitnslrou"; // Start with common keys
    //let text = "";
    //for (let i = 0; i < 15; i++) {
       // let wordLength = Math.floor(Math.random() * 4) + 3;
        //for (let j = 0; j < wordLength; j++) {
       //     text += chars.charAt(Math.floor(Math.random() * chars.length));
        //}
       // text += " ";
   // }
   // return text.trim();
//}

const beginnerWords = [
    "the","and","cat","dog","car","run","sun","tree",
    "book","pen","cup","box","red","blue","green",
    "good","bad","big","small","home","food","bird",
    "milk","fish","play","work","read","jump","walk","love"
];

const intermediateWords = [
    "people","system","country","school","friend",
    "family","future","project","computer","language",
    "network","website","typing","keyboard","internet",
    "important","beautiful","different","develop","company"
];

const advancedWords = [
    "responsibility","communication","implementation",
    "extraordinary","configuration","professional",
    "administration","entrepreneur","architecture",
    "authentication","optimization","documentation",
    "understanding","transportation","identification"
];

const programmingWords = [
    "function","const","let","return","class",
    "object","array","boolean","string","number",
    "while","for","switch","import","export",
    "async","await","console","document",
    "querySelector","addEventListener",
    "python","javascript","html","css",
    "react","node","django","mysql"
];

let currentLevel = "beginner";

function generateText() {

    let list;

    switch(currentLevel){

        case "beginner":
            list = beginnerWords;
            break;

        case "intermediate":
            list = intermediateWords;
            break;

        case "advanced":
            list = advancedWords;
            break;

        case "programming":
            list = programmingWords;
            break;

        default:
            list = beginnerWords;
    }

    let text = [];

    for(let i=0;i<40;i++){
        text.push(list[Math.floor(Math.random()*list.length)]);
    }

    return text.join(" ");
}

function setLevel(level){

    currentLevel = level;

    resetGame();

}















function renderText() {
    targetText = generateText();
    typeArea.innerHTML = targetText.split('').map(char => 
        `<span class="char">${char}</span>`
    ).join('');
    updateCursor();
}

function updateCursor() {
    const spans = typeArea.querySelectorAll('span');
    spans.forEach(s => s.classList.remove('current'));
    if (spans[currentIndex]) spans[currentIndex].classList.add('current');
}

// 2. Handle Typing
input.addEventListener('input', () => {
    if (!startTime) startTime = new Date();
    
    const val = input.value;
    const lastChar = val[val.length - 1];
    const spans = typeArea.querySelectorAll('span');

    if (lastChar === targetText[currentIndex]) {
        spans[currentIndex].classList.add('correct');
        spans[currentIndex].classList.remove('incorrect');
        currentIndex++;
    } else {
        spans[currentIndex].classList.add('incorrect');
        errors++;
    }

    input.value = ""; // Clear input for next char
    
    if (currentIndex === targetText.length) {
        finishGame();
    } else {
        updateCursor();
        calculateStats();
    }
});

function calculateStats() {
    const timeElapsed = (new Date() - startTime) / 60000; // in minutes
    const wpm = Math.round((currentIndex / 5) / timeElapsed);
    wpmDisplay.innerText = wpm > 0 ? wpm : 0;
}

function resetGame() {
    currentIndex = 0;
    startTime = null;
    errors = 0;
    renderText();
}

renderText();
