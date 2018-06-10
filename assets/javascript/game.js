var selectableWords = ["MONOPOLY", "CLUE","SORRY","CANDYLAND","MOUSETRAP","SCRABBLE","YAHTZEE","OPERATION","TROUBLE","BOGGLE","TWISTER","JUMANJI"];

var guessedLetters = [];  //letters user has guessed
var currentWordIndex;  //index of the current word in the array
var guessingWord = [];  // word actually getting built
const maxTries = 10;  //starting number of lives
var remainingGuesses = 0;  //lives  player has left
var hasFinished = false;       
var wins = 0;

// resets the game
function resetGame() {
   remainingGuesses = maxTries;
   currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
   guessedLetters = [];
   guessingWord = [];
   for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
      guessingWord.push("_ ");
   }   
   document.getElementById("youLoseImage").style.cssText = "display: none";
   document.getElementById("youWinImage").style.cssText = "display: none";
};

//updates the visible content
function updateDisplay() {
   document.getElementById("counterWins").innerText = wins;
   var guessingWordText = "";
   for (var i = 0; i < guessingWord.length; i++) {
      guessingWordText += guessingWord[i];
   }
   document.getElementById("currentWord").innerText = guessingWordText;
   document.getElementById("counterLives").innerText = remainingGuesses;
   document.getElementById("counterGuessed").innerText = guessedLetters;
};

//looks for the letter(s) in the word
function evaluateGuess(letter) {
   // Array to store positions of letters in string
   var positions = [];
   for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
      if(selectableWords[currentWordIndex][i] === letter) {
         positions.push(i);
      }
   }
   if (positions.length <= 0) {
      remainingGuesses--;
   } else {
      for(var i = 0; i < positions.length; i++) {
         guessingWord[positions[i]] = letter;
      }
   }
};

//if no remaining underscores, player wins
function checkWin() {
   if(guessingWord.indexOf("_ ") === -1) {
      document.getElementById("youWinImage").style.cssText = "display: block";
      wins++;
      hasFinished = true;
   }
};

//if out of guesses, player loses
function checkLoss(){
   if(remainingGuesses <= 0) {
      document.getElementById("youLoseImage").style.cssText = "display: block";
      hasFinished = true;
   }
}

//makkng a guess
function makeGuess(letter) {
   if (remainingGuesses > 0) {
   if (guessedLetters.indexOf(letter) === -1) {
         guessedLetters.push(letter);
         evaluateGuess(letter);
      }
   }
};


//event listener
document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
   if(hasFinished) {
      resetGame();
      hasFinished = false;
   } else {
      // Check to make sure a-z was pressed.
      if(event.keyCode >= 65 && event.keyCode <= 90) {
         makeGuess(event.key.toUpperCase());
         updateDisplay();
         checkWin();
         checkLoss();
      }
   }
};