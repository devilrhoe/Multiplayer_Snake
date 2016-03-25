(function($) {
    "use strict";
    $.SnakeClient = function(options) {
        var _self = this;
        if (options === undefined) {
            throw "Undefined options";
        }
        if (options.domain === undefined) {
            throw "Undefined domain";
        }
        if (options.port === undefined) {
            throw "Undefined port";
        }
        this.document = document;
        this.domain = options.domain;
        this.port = options.port;
        this.socket = io.connect("http://" + this.domain + ":" + this.port);
        this.element = this.document.getElementById("snakeCanvas");
        this.ctx = this.element.getContext("2d");
        this.socket.on("mapUpdate", function(data) {
        	console.log("Received map update.");
            _self.paint(data);
        });
        this.document.getElementById("btnJoin").addEventListener("click", function(e){
            var username = _self.document.getElementById('txtJoin').value;
            _self.socket.emit('join', {
                'username':(username.length > 0) ? username : "guest"
            });
        });
        this.element.height = 5000;
        this.element.width = 5000;
        this.document.addEventListener("keydown", function(e) {
            if (e.keyCode == '38') {
                // up arrow
                console.log("up");
                _self.socket.emit("playerUpdate", {'direction':'up'});
               
            } else if (e.keyCode == '40') {
                // down arrow
                console.log("down");
                _self.socket.emit("playerUpdate", {'direction':'down'});
                
            } else if (e.keyCode == '37') {
                // left arrow
                console.log("left");
                _self.socket.emit("playerUpdate", {'direction':'left'});
                
            } else if (e.keyCode == '39') {
                // right arrow
                console.log("right");
                _self.socket.emit("playerUpdate", {'direction':'right'});
                
            }
        });
    }
    $.SnakeClient.prototype.paint = function(data) {
        var jsonObj = data.map;
        var cell = 5;
        for (var i = 0; i < jsonObj.length; i++) {
            for (var j = 0; j < jsonObj.length; j++) {
                if (jsonObj[i][j].type == 'food') {
                    this.ctx.fillStyle = "rgba(100,100,100,1)";
                    this.ctx.fillRect(i * cell, j * cell, cell, cell);
                } else if (jsonObj[i][j].type == 'empty') {
                    this.ctx.fillStyle = "rgba(255,100,100,1)";
                    this.ctx.fillRect(i * cell, j * cell, cell, cell);
                } else if (typeof jsonObj[i][j].type == 'number') {
                    this.ctx.fillStyle = "rgba(0,255,0,1)";
                    this.ctx.fillRect(i * cell, j * cell, cell, cell);
                }
            }
        }
    };

    $.SnakePackage = function(event, direction) {
        this.event = event;
        this.direction = direction;
    };

    $.SnakePackage.prototype.getData = function(){
        return this.data;
    };

    $.SnakePackage.prototype.getEvent = function(){
        return this.event;
    };
}(this));