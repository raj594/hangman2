var inquirer = require('inquirer')
var Word = require('./Word')



var Game = function () {

	this.guessesLeft = null;

	this.gameLogic = function (game, word) {

		inquirer
			.prompt([
				{
					type: "input",
			        message: "Guess a letter",
			        name: "userGuess"
				},
				])
			.then(function(inquirerResponse){
				word.checkGuess(inquirerResponse.userGuess, function(array, correct){
				var wordPrint = "";
					for (var i = 0; i < array.length; i++) {
						wordPrint += " " + array[i].char

					}
					if(correct === true){
						console.log("Correct!")
					} else {
						console.log("False!")
						console.log(this.guessesLeft-- + " guesses left!")
						console.log("You Lose!");
						if (this.guessesLeft < 0) {
							game.newGameLogic(game);
						}
					}
					console.log(wordPrint)
					if(word.checkWinner()){
						game.gameLogic(game, word);
					} else {
						console.log("You Win!");
						game.newGameLogic(game);
					}
				});
			});
	};

	this.newGameLogic = function (game) {
		guessesLeft = 10;
		inquirer
		.prompt([
			{
				type: "list",
	        	message: "Would you like to play?",
	        	choices: ["Yes", "No"],
	        	name: "replay"
			},
			])
		.then(function(inquirerResponse){
			if (inquirerResponse.replay === "Yes") {
				this.guessesLeft = 10;
				var word = new Word();

				word.getWord(function(array){
				word.letters = array;
				var wordPrint = "";
					for (var i = 0; i < array.length; i++) {
						wordPrint += " " + array[i].char

					}
					console.log(wordPrint)
					game.gameLogic(game, word);
				});



			} else if (inquirerResponse.replay === "No") {
				console.log("Later")
			}
		});
	}
};

var game = new Game();

game.newGameLogic(game);

