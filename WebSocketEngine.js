var webSocketsServerPort = 80;
var WebSocket = require('ws');
var Events = require('events');
var EvEmitter = Events.EventEmitter;
var eventEmitter = new EvEmitter();
var webSocketServer = require('websocket').server;
var http = require('http');
var clients = [ ];
var server;

var connection;
var self;

// Constructor
function WebSocketEngine(server) {
	// always initialize all instance properties

	var self =this;
	this.self = self;
	this.server = server;
	this.eventEmitter = eventEmitter;
	var wsServer = new webSocketServer({
	    httpServer: this.server
	});
	wsServer.on('request', function(request) {	// New connection

    	connection = request.accept(null, request.origin); 
    	// client index to remove them on 'close' event
    	var index = clients.push(connection) - 1;
    	//TODO: Implement bi-directional connection
	    connection.on('message', function(data) {	// Receive some user data
			self.onMessage(data,index);
	    });
	    connection.on('close', function(data) {
        	// close user connection
    	});

	}); 

}


// class methods
WebSocketEngine.prototype.onMessage = function(data,index) {
	// TODO:
	var obj;
	if ((data!=null)&&(data.type=="utf8")){
		obj = JSON.parse(data.utf8Data);
	}
	
	eventEmitter.emit('event', index, obj);
};

WebSocketEngine.prototype.send = function(object) {
	// TODO:
	var obj = JSON.stringify(object);
	connection.send(obj);

};

WebSocketEngine.prototype.start = function(object) {
	// TODO:

};

// export the class
module.exports = WebSocketEngine;

