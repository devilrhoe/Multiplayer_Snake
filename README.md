# Multiplayer_Snake 11-03-2016
Multiplayer Snake game based on webSockets

Project Files:

  -Server side: 
    HttpServer.js
    GameMapEngine.js
    GameEngine.js
    GameObject.js
    Server.js
    WebSocketEngine.js
  
  -Client side:
    index.html
    TestObject.js
    TestCanvas.js
    
    
    
    
File description:
Server side:

-HttpServer.js: This class creates a http server modified to serve most common types of webfiles(js, css, html, php...). These files must be located on the root path of the project. This HttpServer will listen to port declared on server.js

-WebSocketEngine.js: This class creates a webSocketServer modified to manage incoming connections and client-side events and send some related-game data to clients. This WebSocketEngine needs an HttpServer to manage requests made by clients.

-GameMapEngine.js: This class creates an empty object-based ( GameObject type='Empty' )  grid map with the size declared on server.js and is partially randomly filled with food ( GameObject type='Food' ). The total amount of food in map is defined on server.js as a percentage.

-GameEngine.js: This class receives a WebsocketServer and a GameMapEngine and contains all game-related data, functions, events and the game logic.

-GameObject.js: GameObjects are placed in each cell of the grid map, these objects can be Empty, Food, and Body (a part of snake body).

-Server.js: Is the main class of the project, it creates an instance of all classes defined above and contains certain server-side parameters (http port to listen, map dimensions, and percentage of food)




Client side:

  -Index.html: contains a full-window sized canvas where show the game.
  
  -TestCanvas.js: Client-side game functions, incomplete
  -TestObjects.js: Client-side game objects, incomplete
