
function Game () {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess-this.winningNumber);
};

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
} 

Game.prototype.playersGuessSubmission = function(guess) {
    console.log('Hi');
    if(typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    } else {
        if(this.pastGuesses.indexOf(val) > -1 ){
            return "You have already guessed that number."
            }else{
             this.playersGuess=val;
             this.pastGuesses.push(val);
          $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
             return this.checkGuess();
              } 
         }
     };

function generateWinningNumber() {
    return Math.ceil(Math.random()*100);
}


Game.prototype.checkGuess=function(){
    if(this.playersGuess === this.winningNumber){
          $('#hint, #submit').prop("disabled",true);
            $('#subtitle').text("Press the Reset button to play again!")
            return 'You Win!'
    }
    
    if(this.pastGuesses.length >= 5){
            $('#hint, #submit').prop("disabled",true);
            $('#subtitle').text("Press the Reset button to play again!")
                    return 'You Lose.';
     
    }else {
      
    }
    if(this.difference() < 10){
        return "You're burning up!";
    }
    if(this.difference() < 25){
        return "You're lukewarm.";
    }
    if(this.difference() < 50){
        return "You're a bit chilly.";
    }
    if(this.difference() < 100){
        return "You're ice cold!";
    }
    };

    function newGame() {
        return new Game(); //check that old game !== new game
    }

Game.prototype.provideHint = function() {
    var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
}

function shuffle(arr) { 
   for(var i = arr.length-1; i > 0; i--) {
       var randomIndex = Math.floor(Math.random() * (i + 1));
       var temp = arr[i];
       arr[i] = arr[randomIndex];
       arr[randomIndex] = temp;
    }
    return arr;
}


function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}


$(document).ready(function() {

    var game= newGame();
    $('#submit').click(function(e) {
        makeAGuess(game);
    });

    $('#player-input').keypress(function(event){
        if(event.which==='13') {
            makeAGuess(game);
        }
    });

    $('#hint').click(function(){
        console.log('hint clicked');
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
    });
    
    $("#reset").click(function(){
        game=newGame();
        $('#title').text('Play the guessing game!');
        $('#subtitle').text('Guess a number between 1-100!');
        $('#guess').text('-');
        $('#hint, #submit').prop("disabled",false);
    });
    
});


