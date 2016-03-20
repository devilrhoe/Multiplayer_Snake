var nickname;
var playerInitialLenght =4;
var body=[ ];
var timer;
var index;
var minSpeed=500;
var currentSpeed;
var currentDirection;
var Events = require('events');
var EvEmitter = Events.EventEmitter;
var eventEmitter = new EvEmitter();

// Constructor
function Player(nickname, coords,index) {
	// always initialize all instance properties
	this.nickname = nickname;
	body.push(coords);
	this.body = body;
	this.index=index;
	this.eventEmitter = eventEmitter;
	
	var self = this;


	this.update = function (data) {
		currentDirection=data;
		if(this.timer==undefined){
        	this.timer  = setInterval(step, minSpeed);
        }
    };
    function step(){

    	// TODO:
    	console.log(self.body);
    	switch(currentDirection){

    		case 'up':  
    			var coords = [self.body[0][0],self.body[0][1]-1];
    			self.body.unshift(coords);
    		break;

    		case 'down':
				var coords = [self.body[0][0],self.body[0][1]+1];
    			self.body.unshift(coords);
    		break;

    		case 'left':
				var coords = [self.body[0][0]-1,self.body[0][1]];
    			self.body.unshift(coords);
    		break;

    		case 'right':
				var coords = [self.body[0][0]+1,self.body[0][1]];
    			self.body.unshift(coords);
    		break;

    	}
    	// TODO: delete last position if body.lenght>playerInitialLenght and update body in map
    	
    	if(self.body.length>playerInitialLenght){
    		self.eventEmitter.emit('step', self.index, self.body[0], self.body[self.body.length-1]);
    		self.body.pop();
    		
    	}else{
    		self.eventEmitter.emit('step', self.index, self.body[0]);
    	}
    	
    }

}



// export the class
module.exports = Player;

