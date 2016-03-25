var events = require("events");
var sys = require("sys");
var express = require('express');
var ejsRenderFile = require('ejs').renderFile;
var bodyParser = require('body-parser');
var socketIO = require('socket.io');

var SnakeGameMapEngine = require('./SnakeGameMapEngine.js');
var SnakeGameEngine = require('./SnakeGameEngine.js');


function SnakeServer(options){
	if(false === (this instanceof SnakeServer)) {
		return new SnakeServer();
	}
	if(options === undefined){
		throw "Undefined options.";
	}
	if(options.domain === undefined){
		throw "Undefined domain in options.";
	}
	if(options.path === undefined){
		throw "Undefined path in options.";
	}
	this.options = (options !== undefined) ? options : {};
	this.domain = options.domain;
	this.path = options.path;
	this.port = (this.options.port !== undefined) ? this.options.port : 8889;
	this.www = express();
	this.www.engine('html', ejsRenderFile);
	this.www.use(bodyParser.urlencoded({'extended':false}));
	this.mapWidth = (this.options.mapWidth !== undefined) ? this.options.mapWidth : 50;
	this.mapHeight = (this.options.mapHeight !== undefined) ? this.options.mapHeight : 50;
	this.mapFood = (this.options.mapFood !== undefined) ? this.options.mapFood : 10;
	this.playerInitialLength = (this.options.playerInitialLength !== undefined) ? this.options.playerInitialLength:4;
	this.www.use(function (req, res, next) {
	    res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	    res.setHeader('Access-Control-Allow-Credentials', true);
	    next();
	});
	this.http = this.www.listen(this.port,this.domain);
	this.io = socketIO.listen(this.http);
	this.gameMapEngine = new SnakeGameMapEngine(this.mapWidth, this.mapHeight, this.mapFood);
	this.gameEngine = new SnakeGameEngine(this.gameMapEngine,this.playerInitialLength);
	events.EventEmitter.call(this);
};
sys.inherits(SnakeServer,events.EventEmitter);


SnakeServer.prototype.start = function(callback){
	this.defaultWebEvents();
	this.gameMapEngine.on("objectPlaced", function(data){
		console.log("NEW OBJECT ", data);
	});
	this.gameMapEngine.on("objectRemoved", function(data){
		console.log("REMOVE OBJECT ", data);
	});
	return callback(this);
}

SnakeServer.prototype.defaultWebEvents = function(){
	var _self = this;
	this.www.get("*",function(req,res){
		_self.emit("request", {
			'req':req,
			'res':res,
			'file':_self.path + '/public/'+req.path
		});
		res.sendFile(_self.path + '/public/'+req.path);
	});
}

// export the class
module.exports = SnakeServer;