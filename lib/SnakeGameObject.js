var events = require("events");
var sys = require("sys");
var type;

// Constructor
function SnakeGameObject(type) {
	if(false === (this instanceof SnakeGameObject)) {
		return new SnakeGameObject();
	}
	this.type = type;
	switch(type){
		case 'empty':

		break;
		case 'food':

		break;
	}
	events.EventEmitter.call(this);
}
sys.inherits(SnakeGameObject,events.EventEmitter);


// class methods
SnakeGameObject.prototype.getType = function() {
	// TODO:
	return this.type;
};
SnakeGameObject.prototype.build = function() {
	// TODO:
};
SnakeGameObject.prototype.message = function(msg) {
	// TODO:
};

// export the class
module.exports = SnakeGameObject;

