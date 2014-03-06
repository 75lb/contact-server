var WebSocketServer = require("ws").Server;

var server = new WebSocketServer({ port: process.env.PORT || 5000 });
server.on("connection", function(ws){
    ws.on("message", function(data){
        server.clients.forEach(function(client, index){
            if (client !== ws){
                client.send(data);
            } else {
                console.log("not " + index)
            }
        });
    });
});
