var WebSocketServer = require("ws").Server;

var server = new WebSocketServer({ port: process.env.PORT || 5000 });
server.on("connection", function(ws){
    this.clients.forEach(function(client){
        console.dir(client.upgradeReq.headers);
    });
    ws.on("message", function(msg){
        console.dir(msg);
        ws.send("CLIVE");
    });
});
