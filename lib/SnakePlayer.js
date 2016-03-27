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
    this.minSpeed = 500;
    this.currentSpeed = options.speed;
    this.currentDirection = options.direction;
    this.supportedMovements = ['left','right','up','down'];
    events.EventEmitter.call(this);
};
sys.inherits(SnakePlayer,events.EventEmitter);

SnakePlayer.prototype.move = function(){
    var _self = this;
    if(this.supportedMovements.indexOf(this.currentDirection) === -1){
        this.currentDirection = "down";
    }
    if(this.currentDirection === "up"){
        var coords = [this.body[0][0],this.body[0][1]-1];
        this.body.unshift(coords);
    }else if(this.currentDirection === "down"){
        var coords = [this.body[0][0],this.body[0][1]+1];
        this.body.unshift(coords);
    }else if(this.currentDirection === "left"){
        var coords = [this.body[0][0]-1,this.body[0][1]];
        this.body.unshift(coords);
    }else if(this.currentDirection === "right"){
        var coords = [this.body[0][0]+1,this.body[0][1]];
        this.body.unshift(coords);
    }
    // TODO: delete last position if body.lenght>playerInitialLenght and update body in map 
    if(this.body.length>this.playerInitialLenght){
        this.emit('move', this.userId, this.body[0], this.body[this.body.length-1]);
        this.body.pop();
    }else{
        this.eventEmitter.emit('move', this.userId, this.body[0]);
    }
};
module.exports = SnakePlayer;

