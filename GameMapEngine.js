var gameObject = require('./GameObject.js');
var width;
var height;
var mapGrid;
var mapFood;
var map=[];


// Constructor
function GameMapEngine(width, height,mapFood) {
	
	this.width = width;
	this.height = height;
	this.mapFood = mapFood;
	this.mapGrid=this.build();


}


// class methodç
GameMapEngine.prototype.build = function() {
	// TODO:

	function randomIntInc (low, high) {//returs integer between low-high
    	return Math.floor(Math.random() * (high - low + 1) + low);
	}

	for (var i = 0; i < this.width; i++) {
	  map[i] = [];
	  for (var j = 0; j < this.height; j++) {
	  		map[i][j] = new gameObject('empty');
		}
	}

	var i = 0;
	while(i < this.getTotalFoodAmount()){

		var tx, ty;
		tx = randomIntInc(0, this.width-1);
		ty = randomIntInc(0, this.height-1);
		if(map[tx][ty].getType()!='food')
			map[tx][ty] = new gameObject('food');
		i++;
	}	
	return map;
};

GameMapEngine.prototype.getTotalFoodAmount = function() {
	// TODO:
	var amount = ((this.height*this.width)*20)/100;
	return amount;
};


// export the class
module.exports = GameMapEngine;
