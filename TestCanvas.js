/* CLIENT SIDE TESTING*/

// TODO: 
  //calculate window aspect ratio
var ws; // Global webSocket
var has_joined = false;
document.addEventListener("DOMContentLoaded", function(event) { 
	//TODO: all stuff
  WebSocketTest();
    
});

document.addEventListener("keydown", function(event) { 
  //TODO: all stuff
  keyPress(event);
    
});
function keyPress(e){
  var self = this;
  console.log(e.keyCode);

    if (e.keyCode == '38') {
        // up arrow
        console.log("up");
        var jsonObj = new package("move","up");
        self.send(jsonObj);
    }
    else if (e.keyCode == '40') {
        // down arrow
        console.log("down");
        var jsonObj = new package("move","down");
        self.send(jsonObj);
    }
    else if (e.keyCode == '37') {
       // left arrow
       console.log("left");
       var jsonObj = new package("move","left");
       self.send(jsonObj);
    }
    else if (e.keyCode == '39') {
       // right arrow
       console.log("right");
       var jsonObj = new package("move","right");
       self.send(jsonObj);
    }


    //testing events
    if (e.keyCode == '49') {
        // '1' key
        
    }
}

function WebSocketTest() {
    if ("WebSocket" in window) {
        console.log("WebSocket is supported by your Browser!");
           
       // Let us open a web socket
       ws = new WebSocket("ws://localhost:80");

       ws.onopen = function() {
          // Web Socket is connected, send data using this.send()
            showStartPage();          
       };
  
       ws.onmessage = function (evt) { 
          var received_msg = evt.data;
         
          self.paint(evt.data);

       };
  
       ws.onclose = function() { 
          // websocket is closed.
          console.log("Connection is closed..."); 
       };
           
    } else {
        // The browser doesn't support WebSocket
        console.log("WebSocket NOT supported by your Browser!");
    }
    this.send = function(object){
        ws.send(JSON.stringify(object));
        console.log("Message is sent...", object);
    }
    // TESTING PAINT FUNCTION
    this.paint = function(object){
        var jsonObj = JSON.parse(object);
        console.log(jsonObj.length);
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        var cell = 20;
        
        for( var i = 0; i< jsonObj.length; i++ ) {
          for( var j = 0; j< jsonObj.length; j++ ) {
            if(jsonObj[i][j].type=='food'){
              ctx.fillStyle = "rgba(100,100,100,1)";
              ctx.fillRect(i*cell,j*cell,cell,cell);
            }else if(jsonObj[i][j].type=='empty'){
              ctx.fillStyle = "rgba(255,100,100,1)";
              ctx.fillRect(i*cell,j*cell,cell,cell);
            }else if(typeof jsonObj[i][j].type =='number'){
              ctx.fillStyle = "rgba(0,255,0,1)";
              ctx.fillRect(i*cell,j*cell,cell,cell);
            }
          } 
        }
        
    }

}

//on clic bka bka bka
function showStartPage(){
  // Show start page to user 
  // Send Join event to server
  var self = this;
  document.getElementById("btnJoin").onclick = function join(){
    if(has_joined == false){
       var jsonObj = new package("join",document.getElementById("txtJoin").value);
      self.send(jsonObj);
      has_joined = true;
    }
   
  }
}