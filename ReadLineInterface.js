//Properties
const readline = require('readline');
var colors = require('colors/safe'); 
const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
});

// Constructor
function ReadLineInterface() {
	// always initialize all instance properties
	console.log(colors.yellow('\n\n\nReadLineInterface'),colors.green('is up!'));
}

// class methods
ReadLineInterface.prototype.question = function(quest) {
	// TODO:
	var answer='';
	rl.question(colors.green(quest), (answer) => {
		
	  	rl.close();
	});
	return answer;
};
ReadLineInterface.prototype.message = function(msg) {
	// TODO:
	console.log(colors.green(msg));
};

// export the class
module.exports = ReadLineInterface;





