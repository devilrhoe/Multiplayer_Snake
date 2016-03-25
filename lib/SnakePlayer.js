var events = require("events");
var sys = require("sys");

function SnakePlayer(options){
    if(false === (this instanceof SnakePlayer)) {
        return new SnakePlayer();
    }
    this.username = options.username;
    this.userId = options.userId;
    this.playerInitialLength = options.playerInitialLength;
    this.body = [options.coords];
    this.index = options.index;
    this.minSpeed = 500;
    this.currentSpeed = options.speed;
    this.currentDirection = options.direction;
    events.EventEmitter.call(this);
}
sys.inherits(SnakePlayer,events.EventEmitter);

// function SnakePlayer(nickname, coords,index) {
// 	// always initialize all instance properties
// 	this.nickname = nickname;
// 	body.push(coords);
// 	this.body = body;
// 	this.index=index;
// 	this.eventEmitter = eventEmitter
// 	var self = this;
// 	this.update = function (data) {
// 		currentDirection=data;
// 		if(this.timer==undefined){
//         	this.timer  = setInterval(step, minSpeed);
//         }
//     };
//     function step(){
//     	// TODO:
//     	console.log(self.body);
//     	switch(currentDirection){
//     		case 'up':  
//     			var coords = [self.body[0][0],self.body[0][1]-1];
//     			self.body.unshift(coords);
//     		break;
//     		case 'down':
// 				var coords = [self.body[0][0],self.body[0][1]+1];
//     			self.body.unshift(coords);
//     		break;
//     		case 'left':
// 				var coords = [self.body[0][0]-1,self.body[0][1]];
//     			self.body.unshift(coords);
//     		break;
//     		case 'right':
// 				var coords = [self.body[0][0]+1,self.body[0][1]];
//     			self.body.unshift(coords);
//     		break;
//     	}
//     	// TODO: delete last position if body.lenght>playerInitialLenght and update body in map	
//     	if(self.body.length>playerInitialLenght){
//     		self.eventEmitter.emit('step', self.index, self.body[0], self.body[self.body.length-1]);
//     		self.body.pop();
//     	}else{
//     		self.eventEmitter.emit('step', self.index, self.body[0]);
//     	}
//     }
//     events.EventEmitter.call(this);
// }
// sys.inherits(SnakePlayer,events.EventEmitter);
// export the class
module.exports = SnakePlayer;

