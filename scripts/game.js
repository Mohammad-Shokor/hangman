const words = ['react', 'shawarma', 'bread', 'bebsi', 'mhmd', 'breadsticks', 'hangman', 'javascript','mernstack'];
let currentWord = '';
let guessedLetters = [];
let wrongGuesses = 0;

const MAX_WRONG_GUESSES = 6;

const answerSection = document.getElementById('answer-section');
const hangDiv = document.getElementById('hang');
const letterElements = document.querySelectorAll('.letter');

const hangmanParts = ['head', 'body', 'left-hand', 'right-hand', 'left-leg', 'right-leg'];

function drawHangmanPart(step) {
  if (!hangDiv) return;
  hangDiv.querySelectorAll('.head,.body,.left-hand,.right-hand,.left-leg,.right-leg')
    .forEach(el => el.remove());
    
  for (var i = 0; i < step; i++) {
    const part = hangmanParts[i];
    const img = document.createElement('img');
        img.src = `/src/assets/${part}.svg`;
    img.className = part;
    hangDiv.appendChild(img);
  }
}

function updateHangmanDisplay() {
  drawHangmanPart(wrongGuesses);
}
function initGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    
   updateHangmanDisplay();
    
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
    const normalizedLetter = letter.toLowerCase();

    if (wrongGuesses >= MAX_WRONG_GUESSES || guessedLetters.includes(normalizedLetter)) {
        return;
    }
    
    guessedLetters.push(normalizedLetter);
    
    const letterElement = Array.from(letterElements).find(
        el => el.textContent?.toLowerCase() === normalizedLetter
    );
    
    if (letterElement) {
        letterElement.classList.add('used');
        letterElement.style.backgroundColor = '#ccc';
        letterElement.style.cursor = 'not-allowed';
        letterElement.style.opacity = '0.5';
    }
    
    if (!currentWord.includes(normalizedLetter)) {
        wrongGuesses++;
        updateHangmanDisplay();
    }
    
    displayWord();
    
    checkGameStatus();
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    
    if (key.length === 1 && key.match(/[a-z]/) && !event.ctrlKey && !event.metaKey) {
        handleGuess(key);
    }
});

letterElements.forEach(letterElement => {
    letterElement.addEventListener('click', () => {
        const letter = letterElement.textContent?.toLowerCase();
        if (!letter) {
            return;
        }
        handleGuess(letter);
    });
});

initGame();
