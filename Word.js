var Letter = require('./Letter.js')
var fs = require('fs')

var Word = function() {
	this.letters = [];

	this.getWord = function(callback){
		fs.readFile('./words.txt', 'utf8', function(error, data) {
			if(error){
				console.log("couldnt get the word bro")
			} else {
				var wordArray = data.split(',');
				var num = Math.floor(Math.random() * wordArray.length);
				var randomWord = wordArray[num];
				var test = [];
				for (var i = 0; i < randomWord.length; i++) {
					var newLetter = new Letter(randomWord[i]);

					test.push(newLetter)
					
				}
				this.letters = test;
				
				callback(this.letters)
			}
		});
	};

	this.checkGuess = function(guess, callback){
		var goodGuess = false;
		for (var i = 0; i < this.letters.length; i++) {
			this.letters[i].check(guess, function(correct){
				if(correct === true){
					goodGuess = true
				}
			});
		}
		callback(this.letters, goodGuess)
	};

	this.checkWinner = function() {
		var test = 0;
		for (var i = 0; i < this.letters.length; i++) {

			if(this.letters[i].isGuessed === false) {
				test++;
			}
		}
		return test;
	};

};

module.exports = Word;