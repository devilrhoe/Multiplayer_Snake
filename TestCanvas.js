/* CLIENT SIDE TESTING*/
document.addEventListener("DOMContentLoaded", function(event) { 
	//TODO: all stuff
	var ws; // Global webSocket
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
    	console.log("Message is sent...");
    }

    }

    WebSocketTest();

    //on clic bka bka bka
    function showStartPage(){
      // Show start page to user 
      // Send Join event to server
      var self = this;
      document.getElementById("btnJoin").onclick = function join(){
        var jsonObj = new package("join",document.getElementById("txtJoin").value);
        self.send(jsonObj);
      }
    }
    
});