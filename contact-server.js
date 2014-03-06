var WebSocketServer = require("ws").Server;

var server = new WebSocketServer({ port: process.env.PORT || 5000 });
server.on("connection", function(ws){
    ws.on("message", function(data){
        server.clients.forEach(function(client, index){
            if (client !== ws){
                client.send(data, function(err){
                    if (err) console.error(err.message);
                });
            } else {
                client.send(JSON.stringify({ type: "ok" }), function(err){
                    if (err) console.error(err.message);
                });
            }
        });
    });
});
server.on("error", function(err){
    console.error("ERROR");
    console.dir(err);
});
process.on("EXIT", function(){
    console.log("EXITING");
});
