var SnakeGameObject = require('./SnakeGameObject.js');
var events = require("events");
var sys = require("sys");
// Constructor
function SnakeGameMapEngine(width, height,mapFood) {
	if(false === (this instanceof SnakeGameMapEngine)) {
		return new SnakeGameMapEngine();
	}
	this.width = width;
	this.height = height;
	this.mapFood = mapFood;
	this.map = [];
	this.build();
	events.EventEmitter.call(this);
}

sys.inherits(SnakeGameMapEngine,events.EventEmitter);

SnakeGameMapEngine.prototype.randomIntInc = function(low,high){
	//returs integer between low-high
	return Math.floor(Math.random() * (high - low + 1) + low);
}

// class methodç
SnakeGameMapEngine.prototype.build = function() {
	for (var i = 0; i < this.width; i++) {
	  this.map[i] = [];
	  for (var j = 0; j < this.height; j++) {
	  		this.map[i][j] = new SnakeGameObject('empty');
		}
	}
	var i = 0;
	while(i < this.getTotalFoodAmount()){
		var tx, ty;
		tx = this.randomIntInc(0, this.width-1);
		ty = this.randomIntInc(0, this.height-1);
		if(this.map[tx][ty].getType()!='food')
			this.map[tx][ty] = new SnakeGameObject('food');
		i++;
	}	
};

SnakeGameMapEngine.prototype.getTotalFoodAmount = function() {
	// TODO:
	var amount = ((this.height*this.width)*this.mapFood)/100;
	return amount;
};
SnakeGameMapEngine.prototype.placeObject = function(x, y, index) {
	// TODO:
	this.map[x][y] = new SnakeGameObject(index);
	this.emit('objectPlaced',{'x':x,'y':y});
};

SnakeGameMapEngine.prototype.removeObject = function(x,y){
	if(this.map !== undefined && this.map[x] !== undefined && this.map[x][y] !== undefined){
		this.map[x][y] = new SnakeGameObject('empty');
		this.emit('objectRemoved', {'x':x,'y':y});
	}
}


// export the class
module.exports = SnakeGameMapEngine;
