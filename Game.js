var inquirer = require('inquirer')
var Word = require('./Word')

var Game = function () {

	var self = this;

	this.guessesLeft = null;

	this.gameLogic = function (word) {

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
						console.log(self.guessesLeft-- + " guesses left!")
					}
					console.log(wordPrint)
					if (self.guessesLeft <= 0) {
						console.log("You Lose!");
						self.newGameLogic();
					} else if(word.checkWinner()){
						self.gameLogic(word);
					} else {
						console.log("You Win!");
						self.newGameLogic();
					}
				});
			});
	};

	this.newGameLogic = function () {
		this.guessesLeft = 10;
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
				
				var word = new Word();

				word.getWord(function(array){
				word.letters = array;
				var wordPrint = "";
					for (var i = 0; i < array.length; i++) {
						wordPrint += " " + array[i].char

					}
					console.log(wordPrint)
					self.gameLogic(word);
				});



			} else if (inquirerResponse.replay === "No") {
				console.log("Later")
			}
		});
	};
};



var game = new Game();
game.newGameLogic();

