let hiddenNumber;
let attempts = 0;
let guesses = '';

function startGame() {
    hiddenNumber = generateHiddenNumber();
    attempts = 0;
    document.getElementById('feedback').innerText = '';
    document.getElementById('attemptCount').innerText = attempts;
    document.getElementById('guessInput').value = '';
    document.getElementById('hint').innerText = sumOfDigits(hiddenNumber)
}

function generateHiddenNumber() {
    const uniqueDigits = Array.from({ length: 10 }, (_, i) => i);
    const shuffledDigits = shuffleArray(uniqueDigits.slice(1)); // Avoid leading zeros
    return shuffledDigits.slice(0, 5).join('');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function makeGuess() {
    const guess = document.getElementById('guessInput').value;
    const guess_string = guess.toString();
    if (!isValidGuess(guess)) {
        alert('Please enter a valid 5-digit guess with no repeated digits.');
        return;
    }

    attempts++;

    guesses += provideFeedback(guess_string) + `<br>`;

    document.getElementById('feedback').innerHTML = `${guesses}`;
    document.getElementById('attemptCount').innerText = attempts;
    

    if (attempts > 5) {
        alert(`Game Over! The correct number was ${hiddenNumber}. Refresh the page to play again.`);
    }
}

function isValidGuess(guess) {
    return /^\d{5}$/.test(guess) && new Set(guess).size === 5;
}

function provideFeedback(guess_string) {
    let coloredString = guess_string.split("").map((digit, index) => {
        // Apply different styles based on the digit
        if (hiddenNumber[index] === guess_string[index]) {
            return `<span class="green-block">${digit}</span>`;
        } else if (hiddenNumber.includes(guess_string[index])) {
            return `<span class="yellow-block">${digit}</span>`;
        } else {
            return `<span class="grey-block">${digit}</span>`;
        }
    }).join("");
   

    //return 'X'.repeat(exactMatches) + 'P'.repeat(partialMatches);
    return coloredString
}

function sumOfDigits(number) {
    // Convert the number to a string to iterate over its digits
    let numberString = Math.abs(number).toString();
    
    // Initialize sum
    let sum = 0;

    // Iterate over each digit and add it to the sum
    for (let i = 0; i < numberString.length; i++) {
        sum += parseInt(numberString[i]);
    }

    return sum;
}

// Initialize the game
startGame();

