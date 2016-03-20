
var fs = require('fs');
var colors = require('colors');
var events = require('events');
var gameMapEngine = require('./GameMapEngine.js');
var httpServer = require('./HTTPServer.js');
var webSocketEngine = require('./WebSocketEngine.js');
var gameEngine = require('./GameEngine.js');
var MAP_HEIGHT = 50;					//Map height size in px 
var MAP_WIDTH = 50;					//Map width size in px
var MAP_FOOD = 10;						//0-100% value of food in map
var httpPort = 80;
var PLAYER_INITIAL_LENGHT = 4;


var httpServerInstance = new httpServer(httpPort);
var webSocketEngineInstance = new webSocketEngine(httpServerInstance.getServer());
var gameMapEngineInstance = new gameMapEngine(MAP_WIDTH,MAP_HEIGHT,MAP_FOOD);
var gameEngineInstance = new gameEngine(gameMapEngineInstance,webSocketEngineInstance, PLAYER_INITIAL_LENGHT);


//console.log(JSON.stringify(gameEngineInstance.mapGrid));



