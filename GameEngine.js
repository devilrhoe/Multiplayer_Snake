var mapGrid;
var gameMapEngineInstance;
var webSocketEngineInstance;
var Events = require('events');
var Player = require('./Player.js');
var EvEmitter = Events.EventEmitter;
var eventEmmiter = new EvEmitter();
var playerList = [ ];
var playerInitialLenght;
// Constructor
function GameEngine(gameMapEngineInstance,webSocketEngineInstance, playerInitialLenght) {
	// always initialize all instance properties
	var self = this;
	this.playerInitialLenght = playerInitialLenght;
	this.gameMapEngineInstance = gameMapEngineInstance;
	this.webSocketEngineInstance = webSocketEngineInstance;
	this.webSocketEngineInstance.eventEmitter.on('event',  function(index, obj) {
		self.onEvent(index, obj);
	});
};

// class methods
GameEngine.prototype.onEvent = function(index, obj) {
	// TODO:
	var self = this;
	function placePlayer(){
		function randomIntInc (low, high) {//returs integer between low-high
    		return Math.floor(Math.random() * (high - low + 1) + low);
		}
		var coords=[];
		coords[0] = randomIntInc(0,self.gameMapEngineInstance.width);
		coords[1] = randomIntInc(0,self.gameMapEngineInstance.height);
		
		return coords;
	}


	switch(obj.event){

		case 'join':
		//TODO: send map to player
			var player = new Player(obj.data,placePlayer());
			playerList[index] = player;

			this.gameMapEngineInstance.placeObject(
				playerList[index].body[0][0],
				playerList[index].body[0][1], 
				index
			);
			console.log("join", playerList[index].nickname,playerList[index].body);
		break;

		case 'move':
			playerList[index].update();
		break;

		case 'attack':

		break;
	}
};


// export the class
module.exports = GameEngine;

