var POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate", "obsequious", "dissonant", "toady", "idempotent"];
var word = "";
var guesses ="";
var MAX_GUESSES = 6;
var guess_count = MAX_GUESSES;
var startStop = false;
var gameOver = false;

function newGame(){
    var randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    guesses = "";
    guess_count = MAX_GUESSES;
    startStop = true;
    gameOver = false;
    updatePage();
    document.getElementById("guesses").innerHTML = "Guessed Letters: ";
    document.getElementById("clue").innerHTML = "_ ".repeat(word.length);
}
function guessLetter(){
    var input = document.getElementById("guess");
    var letter = input.value;
    if(!startStop || gameOver){
        alert("Start a new game first!");
        return;
    }

    if(guesses.includes(letter)){
        alert("You already guessed that letter!");
        return;
    }
     
    if(word.indexOf(letter)< 0){
        guess_count--;
    } 
    guesses+=letter;
    updatePage();
    checkGameStatus();
    input.value = "";
}

function updatePage(){
    var clueString = "";
    for(var i =0;i<word.length;i++){
        var currentLetter = word.charAt(i);
        if(guesses.indexOf(currentLetter) >= 0){
            clueString += currentLetter +" "

        }
        else
            clueString+="_ ";
        
    }
     var clue = document.getElementById("clue");
    clue.innerHTML = clueString;
    var guessArea = document.getElementById("guesses");
    guessArea.innerHTML = "Guessed Letters: " + guesses;
    var image = document.getElementById("hangmanImage");
    image.src = "images/hangman" + guess_count +".gif";

}
function checkGameStatus(){
    var clue = document.getElementById("clue").innerHTML.replace(/\s+/g,'');
    if(clue === word){
        document.getElementById("guesses").innerHTML = "You win!";
        gameOver = true;
        startStop = false;
    }else if(guess_count <= 0){
        document.getElementById("guesses").innerHTML = "You lose!"
        gameOver = true;
        startStop = false;
    }
}
