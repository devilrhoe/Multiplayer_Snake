var type;
// Constructor
function GameObject(type) {
	// always initialize all instance properties
	this.type=type;
	switch(type){
		case 'empty':

		break;
		case 'food':

		break;
	}
}


// class methods
GameObject.prototype.getType = function() {
	// TODO:
	return this.type;
};
GameObject.prototype.build = function() {
	// TODO:
};
GameObject.prototype.message = function(msg) {
	// TODO:
};


// export the class
module.exports = GameObject;

