var WebSocketServer = require("ws").Server;

function errHandler(err){
    if (err) console.error("Error: " + err.message);
}

var server = new WebSocketServer({ port: process.env.PORT || 5000 });
server.on("connection", function(ws){
    ws.on("message", function(data){
        server.clients.forEach(function(client, index){
            if (client === ws){
                client.send(JSON.stringify({ user: "server", sys: "recvd", sent: Date.now() }), errHandler);
            } else {
                client.send(data, errHandler);
            }
        });
    });
});
server.on("error", errHandler);
