var WebSocket = require("ws");

var websocket = new WebSocket(process.argv[2] || "ws://pacific-atoll-9829.herokuapp.com");
websocket.on("open", function(){
    websocket.send("CLIVE");
});
websocket.on("message", function(data, flags){
    console.dir(data);
});
websocket.on("close", function(){
    console.log("CLOSED");
});
