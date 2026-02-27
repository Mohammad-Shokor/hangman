import { useCallback, useEffect, useState } from 'react'
import './hang.css'
import './App.css'

import hangStand from './assets/hang.svg'
import head from './assets/head.svg'
import body from './assets/body.svg'
import leftHand from './assets/left-hand.svg'
import rightHand from './assets/right-hand.svg'
import leftLeg from './assets/left-leg.svg'
import rightLeg from './assets/right-leg.svg'

const WORDS = ['react', 'shawarma', 'bread', 'bebsi', 'mhmd', 'breadsticks', 'hangman', 'javascript', 'mernstack']
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const PARTS = [head, body, leftHand, rightHand, leftLeg, rightLeg]
const PART_CLASSES = ['head', 'body', 'left-hand', 'right-hand', 'left-leg', 'right-leg']

function App() {
  const maxWrongGuesses = PARTS.length

  const [currentWord, setCurrentWord] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongGuesses, setWrongGuesses] = useState(0)

  const initializeGame = useCallback(() => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)]
    setCurrentWord(word)
    setGuessedLetters([])
    setWrongGuesses(0)
  }, [])

  const displayedWord = currentWord
    ? currentWord
        .split('')
        .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ')
    : ''

  const hasWon = currentWord
    ? currentWord.split('').every((letter) => guessedLetters.includes(letter))
    : false

  const hasLost = wrongGuesses >= maxWrongGuesses

  useEffect(() => {
    if (!currentWord) {
      return
    }

    if (hasLost) {
      setTimeout(() => {
        alert(`Game Over! The word was: ${currentWord}`)
        initializeGame()
      }, 100)
      return
    }

    if (hasWon) {
      setTimeout(() => {
        alert('Congratulations! You won! 🎉')
        initializeGame()
      }, 100)
    }
  }, [hasLost, hasWon, currentWord, initializeGame])

  const handleGuess = useCallback((rawLetter) => {
    if (!currentWord || hasLost || hasWon) {
      return
    }

    const letter = rawLetter.toLowerCase()
    if (guessedLetters.includes(letter)) {
      return
    }

    setGuessedLetters((previous) => [...previous, letter])
    if (!currentWord.includes(letter)) {
      setWrongGuesses((previous) => previous + 1)
    }
  }, [currentWord, hasLost, hasWon, guessedLetters])

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase()
      if (key.length === 1 && /[a-z]/.test(key) && !event.ctrlKey && !event.metaKey) {
        handleGuess(key)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [handleGuess])

  return (
    <>
      <div className="game">
      <div className="hangman">
        <div className="hang" id="hang">
          <img src={hangStand} className="stand" alt="Hangman stand" />
          {PARTS.slice(0, wrongGuesses).map((part, index) => (
            <img
              key={`${part}-${index}`}
              src={part}
              className={PART_CLASSES[index]}
              alt="hangman part"
            />
          ))}
        </div>
      </div>
      <div className="inputs-container">
        <div className="answer-section" id="answer-section">
          <h2>{displayedWord}</h2>
        </div>
        <div className="letters">
          {LETTERS.map((letter) => {
            const lower = letter.toLowerCase()
            const isUsed = guessedLetters.includes(lower)

            return (
              <div
                key={letter}
                className="letter"
                onClick={() => handleGuess(lower)}
                style={{
                  backgroundColor: isUsed ? '#ccc' : '#4CAF50',
                  cursor: isUsed ? 'not-allowed' : 'pointer',
                  opacity: isUsed ? 0.5 : 1,
                }}
              >
                {letter}
              </div>
            )
          })}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
