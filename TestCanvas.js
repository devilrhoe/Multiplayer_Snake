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
    }
    else if (e.keyCode == '37') {
       // left arrow
       console.log("left");
    }
    else if (e.keyCode == '39') {
       // right arrow
       console.log("right");
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
       ws = new WebSocket("ws://127.0.0.1:80");

       ws.onopen = function() {
          // Web Socket is connected, send data using this.send()
            showStartPage();          
       };
  
       ws.onmessage = function (evt) { 
          var received_msg = evt.data;
          console.log(evt.data);
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