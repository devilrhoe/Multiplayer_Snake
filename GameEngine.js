var mapGrid;
var gameMapEngineInstance;
var webSocketEngineInstance;
var Events = require('events');
var EvEmitter = Events.EventEmitter;
var eventEmmiter = new EvEmitter();
// Constructor
function GameEngine(gameMapEngineInstance,webSocketEngineInstance) {
	// always initialize all instance properties
	var self = this;
	this.gameMapEngineInstance = gameMapEngineInstance;
	this.webSocketEngineInstance = webSocketEngineInstance;
	this.webSocketEngineInstance.eventEmitter.on('event',  function(index) {
		self.onEvent(index);
	});
};

// class methods
GameEngine.prototype.onEvent = function(index) {
	// TODO:
	console.log("onEvent", index); 
};


// export the class
module.exports = GameEngine;

