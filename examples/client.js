var WebSocket = require("ws");

var websocket = new WebSocket(process.argv[2] || "ws://pacific-atoll-9829.herokuapp.com");
websocket.on("open", function(){
    console.log("Connected");
});
websocket.on("message", function(data, flags){
    console.dir(data);
});
websocket.on("close", function(){
    console.log("CLOSED");
    process.stdin.removeListener("readable", stdinReadable);
});

function stdinReadable(){
    var buf = this.read();
    if (buf) websocket.send(buf.toString());
}
process.stdin.on("readable", stdinReadable);
