var events = require("events");
var sys = require("sys");
var SnakePlayer = require('./SnakePlayer.js');

// Constructor
function SnakeGameEngine(gameMapEngineInstance,playerInitialLenght) {
	if(false === (this instanceof SnakeGameEngine)) {
		return new SnakeGameEngine();
	}
	this.playerList = {};
	this.playerInitialLenght = playerInitialLenght;
	this.gameMapEngineInstance = gameMapEngineInstance;
	this.updatePlayerCoords();

	events.EventEmitter.call(this);
}
sys.inherits(SnakeGameEngine,events.EventEmitter);

SnakeGameEngine.prototype.updatePlayerCoords = function(){
	var _self = this;
	console.log("Moving players");
	for(player in this.playerList){

	}
	setTimeout(function () {
		_self.updatePlayerCoords();
	},250);
}

SnakeGameEngine.prototype.randomIntInc = function(low,high){
	//returs integer between low-high
	return Math.floor(Math.random() * (high - low + 1) + low);
}

SnakeGameEngine.prototype.addPlayer = function(data){
	data.coords = this.placePlayer();
	data.speed = 500;
	data.direction = null;
	var player = new SnakePlayer(data);
	player.on("move", function(data){
		//Move the player in the map
	});
	this.playerList[data.userId] = player;
	this.gameMapEngineInstance.placeObject(data.coords[0], data.coords[1],data.userId);
}

SnakeGameEngine.prototype.removePlayer = function(data){
	if(this.playerList[data.userId] !== undefined){
		var body = this.playerList[data.userId].body;
		for(var i = 0; i < body.length; i++){
			var coords = body[i];
			this.gameMapEngineInstance.removeObject(coords[0],coords[1]);
		}
	}
}

SnakeGameEngine.prototype.movePlayer = function(data){
	if(this.playerList[data.userId] !== undefined){
		this.playerList[data.userId].currentDirection = data.direction;
		this.playerList[data.userId].emit("update");
	}
}

SnakeGameEngine.prototype.placePlayer = function(){
	var coords=[];
	coords[0] = this.randomIntInc(0,this.gameMapEngineInstance.width);
	coords[1] = this.randomIntInc(0,this.gameMapEngineInstance.height);
	return coords;
}
// // class methods
// SnakeGameEngine.prototype.onEvent = function(index, obj) {
// 	// TODO:
// 	var self = this;
// 	


// 	switch(obj.event){

// 		case 'join':
// 		//TODO: send map to player
// 			var player = new Player(obj.data,placePlayer(),index);
// 			player.eventEmitter.on('step',  function(index,head, tail) {
// 				onStep(index,head, tail);
// 			});
// 			playerList[index] = player;
// 			this.gameMapEngineInstance.placeObject(
// 				playerList[index].body[0][0],
// 				playerList[index].body[0][1], 
// 				index
// 			);

// 			// TO DELETE
// 				var myVar = setInterval(myTimer, 500);
// 				function myTimer() {
// 					self.emit("mapUpdate",self.gameMapEngineInstance.mapGrid);
// 					self.webSocketEngineInstance.send(self.gameMapEngineInstance.mapGrid);   
// 				}

// 			// END TO DELETE
// 			console.log("join", playerList[index].nickname,playerList[index].body);
// 		break;

// 		case 'move':
// 			playerList[index].update(obj.data);
// 		break;

// 		case 'attack':

// 		break;
// 	}
// 	function onStep(index,head, tail){
// 		self.gameMapEngineInstance.placeObject(head[0],head[1],index);
// 		console.log("tail", tail);
// 		if((tail!=undefined))
// 			self.gameMapEngineInstance.placeObject(tail[0],tail[1],'empty');
// 	}

// };


// export the class
module.exports = SnakeGameEngine;

