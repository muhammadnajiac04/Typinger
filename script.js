const typeArea = document.getElementById('type-area');
const input = document.getElementById('hidden-input');
const wpmDisplay = document.getElementById('wpm');

let targetText = "";
let currentIndex = 0;
let startTime = null;
let errors = 0;

// 1. Generate random "Keybr-style" pseudo-words
function generateText() {
    const chars = "eaitnslrou"; // Start with common keys
    let text = "";
    for (let i = 0; i < 15; i++) {
        let wordLength = Math.floor(Math.random() * 4) + 3;
        for (let j = 0; j < wordLength; j++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        text += " ";
    }
    return text.trim();
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
