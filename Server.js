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