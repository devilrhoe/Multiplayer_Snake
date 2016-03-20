var webSocketsServerPort = 8889;
var WebSocket = require('ws')
var webSocketServer = require('websocket').server;
var http = require('http');
var clients = [ ];
var server;

var events = require('events');
var eventEmitter = new events.EventEmitter();

var ringBell = function ringBell()
{
  console.log('ring ring ring');
}
eventEmitter.on('doorOpen', ringBell);



// Constructor
function gameEngine(server) {
	// always initialize all instance properties
	this.server = server;
	var wsServer = new webSocketServer({
	    httpServer: this.server
	});
	wsServer.on('request', function(request) {	// New connection

    	var connection = request.accept(null, request.origin); 

    	// client index to remove them on 'close' event
    	var index = clients.push(connection) - 1;

	    connection.on('message', function(connection) {	// Receive some user data
			eventEmitter.emit('doorOpen');
	    });
	}); 
	
}

// class methods
gameEngine.prototype.message = function(msg) {
	// TODO:

};

// export the class
module.exports = gameEngine;

