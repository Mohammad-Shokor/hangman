
const words = ['react', 'shawarma', 'bread', 'bebsi', 'mhmd', 'breadsticks', 'hangman', 'javascript','mernstack'];

let currentWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const MAX_WRONG_GUESSES = 6;

const answerSection = document.getElementById('answer-section');
const letterElements = document.querySelectorAll('.letter');

function initGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    
    if (window.drawHangmanPart) {
        window.drawHangmanPart(0);
    }
    
    letterElements.forEach(letter => {
        letter.classList.remove('used');
        letter.style.backgroundColor = '#4CAF50';
        letter.style.cursor = 'pointer';
        letter.style.opacity = '1';
    });
    
    displayWord();
}

function displayWord() {
    const display = currentWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
    
    answerSection.innerHTML = `<h2>${display}</h2>`;
}

function checkGameStatus() {
    if (wrongGuesses >= MAX_WRONG_GUESSES) {
        setTimeout(() => {
            alert(`Game Over! The word was: ${currentWord}`);
            initGame();
        }, 100);
        return true;
    }
    
    const wordLetters = currentWord.split('');
    const allLettersGuessed = wordLetters.every(letter => 
        guessedLetters.includes(letter)
    );
    
    if (allLettersGuessed) {
        setTimeout(() => {
            alert('Congratulations! You won! 🎉');
            initGame();
        }, 100);
        return true;
    }
    
    return false;
}

function handleGuess(letter) {
    if (wrongGuesses >= MAX_WRONG_GUESSES || guessedLetters.includes(letter)) {
        return;
    }
    
    guessedLetters.push(letter);
    
    const letterElement = Array.from(letterElements).find(
        el => el.textContent === letter
    );
    
    if (letterElement) {
        letterElement.classList.add('used');
        letterElement.style.backgroundColor = '#ccc';
        letterElement.style.cursor = 'not-allowed';
        letterElement.style.opacity = '0.5';
    }
    
    if (!currentWord.includes(letter)) {
        wrongGuesses++;
        if (window.drawHangmanPart) {
            window.drawHangmanPart(wrongGuesses);
        }
    }
    
    displayWord();
    
    checkGameStatus();
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    
    if (key.length === 1 && key.match(/[A-Z]/) && !event.ctrlKey && !event.metaKey) {
        handleGuess(key);
    }
});

letterElements.forEach(letterElement => {
    letterElement.addEventListener('click', () => {
        const letter = letterElement.textContent;
        handleGuess(letter);
    });
});

initGame();