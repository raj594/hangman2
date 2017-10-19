var Letter = function(character) {
	this.char = "_";
	this.secret = character;
	this.isGuessed = false;
	this.check = function(guess, callback){
		if(guess.toLowerCase() === this.secret){
			this.char = guess.toLowerCase();
			this.isGuessed = true;
			callback(true);
		}
	}
};


module.exports = Letter;