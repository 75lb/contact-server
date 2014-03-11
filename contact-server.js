var WebSocketServer = require("ws").Server;

function errHandler(err){
    if (err) console.error("Error: " + err.message);
}

var server = new WebSocketServer({ port: process.env.PORT || 5000 });
server.on("connection", function(ws){
    ws.on("message", function(data){
        server.clients.forEach(function(client, index){
            if (client === ws){
                data = JSON.parse(data);
                data.received = true;
                client.send(JSON.stringify(data), errHandler);
            } else {
                client.send(data, errHandler);
            }
        });
    });
});
server.on("error", errHandler);
