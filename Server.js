<<<<<<< HEAD

var fs = require('fs');
var colors = require('colors');
var events = require('events');
var gameMapEngine = require('./GameMapEngine.js');
var httpServer = require('./HTTPServer.js');
var webSocketEngine = require('./WebSocketEngine.js');
var gameEngine = require('./GameEngine.js');
var MAP_HEIGHT = 2000;					//Map height size in px 
var MAP_WIDTH = 2000;					//Map width size in px
var MAP_FOOD = 20;						//0-100% value of food in map
var httpPort = 8889;
var PLAYER_INITIAL_LENGHT = 4;


var httpServerInstance = new httpServer(httpPort);
var webSocketEngineInstance = new webSocketEngine(httpServerInstance.getServer());
var gameMapEngineInstance = new gameMapEngine(MAP_WIDTH,MAP_HEIGHT,MAP_FOOD);
var gameEngineInstance = new gameEngine(gameMapEngineInstance,webSocketEngineInstance, PLAYER_INITIAL_LENGHT);


//console.log(JSON.stringify(gameEngineInstance.mapGrid));



=======
var SnakeClassServer = require('./lib/SnakeServer.js');
var server = new SnakeClassServer({
	'path':__dirname,
	'domain':'localhost',
	'port':8889,
	'mapWidth':1000,
	'mapHeight':1000
});

server.start(function(self){
	var clients = [];
	/*
	Se puede habilitar el evento
	self.on("request", function(data){
		console.log("REQUEST", data);
	});
	*/
	self.io.on("connection",function(socket){

		clients[socket.id] = socket;

		socket.on('playerUpdate', function(data){
			data.userId = socket.id;
			self.gameEngine.movePlayer(data);
		});															

		socket.on('join', function(data){
			data.userId = socket.id;
			self.gameEngine.addPlayer(data);
			socket.emit('mapUpdate',{'map':self.gameMapEngine.map});
		});

		socket.on('disconnect',function(){
			if(clients[socket.id] !== undefined){
				delete clients[socket.id];
			}
			self.gameEngine.removePlayer({'userId':socket.id});
		});

	});



});
>>>>>>> Canvas-testing
