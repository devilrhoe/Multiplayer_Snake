var nickname;
var playerInitialLenght;
var body=[ ];
var timer;




// Constructor
function Player(nickname, coords) {
	// always initialize all instance properties
	this.nickname = nickname;
	this.playerInitialLenght = playerInitialLenght;
	body.push(coords);
	this.body = body;

	this.update = function () {
        //this.timer  = setInterval(myTimer, 1000); por desarrollar aún
    };

}



// export the class
module.exports = Player;

