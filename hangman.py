import random

WORDS = [
    "python", "hangman", "programming", "keyboard", "monitor",
    "developer", "algorithm", "function", "variable", "interface",
    "database", "network", "software", "hardware", "browser",
    "elephant", "giraffe", "penguin", "dolphin", "volcano",
    "chocolate", "umbrella", "lantern", "pyramid", "library",
]

HANGMAN_STAGES = [
    # 0 wrong guesses
    """
  +---+
  |   |
      |
      |
      |
      |
=========
""",
    # 1 wrong guess
    """
  +---+
  |   |
  O   |
      |
      |
      |
=========
""",
    # 2 wrong guesses
    """
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
""",
    # 3 wrong guesses
    """
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
""",
    # 4 wrong guesses
    """
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========
""",
    # 5 wrong guesses
    """
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========
""",
    # 6 wrong guesses (game over)
    """
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========
""",
]

MAX_WRONG = len(HANGMAN_STAGES) - 1


def play():
    word = random.choice(WORDS)
    guessed = set()
    wrong_guesses = 0

    print("\nWelcome to Hangman!\n")

    while True:
        print(HANGMAN_STAGES[wrong_guesses])

        # Display current word state
        display = " ".join(c if c in guessed else "_" for c in word)
        print(f"Word: {display}\n")

        if all(c in guessed for c in word):
            print(f"🎉 You won! The word was '{word}'.")
            break

        if wrong_guesses == MAX_WRONG:
            print(f"💀 Game over! The word was '{word}'.")
            break

        wrong_letters = sorted(c for c in guessed if c not in word)
        if wrong_letters:
            print(f"Wrong guesses ({wrong_guesses}/{MAX_WRONG}): {', '.join(wrong_letters)}")

        guess = input("Guess a letter: ").strip().lower()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter.\n")
            continue

        if guess in guessed:
            print(f"You already guessed '{guess}'. Try a different letter.\n")
            continue

        guessed.add(guess)

        if guess in word:
            print(f"Good guess! '{guess}' is in the word.\n")
        else:
            wrong_guesses += 1
            print(f"'{guess}' is not in the word.\n")


if __name__ == "__main__":
    play()
