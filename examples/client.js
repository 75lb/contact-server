var WebSocket = require("ws"),
    name = process.argv[2],
    url = process.argv[3] || "ws://pacific-atoll-9829.herokuapp.com";

var websocket = new WebSocket(url);
websocket.on("open", function(){
    console.log("Connected");
});
websocket.on("message", function(data, flags){
    var evt = JSON.parse(data);
    console.log(evt.data.name + ": " + evt.data.msg);
});
websocket.on("close", function(){
    console.log("CLOSED");
    process.stdin.removeListener("readable", stdinReadable);
});

function stdinReadable(){
    var buf = this.read();
    if (buf && websocket.readyState === WebSocket.OPEN) {
        var evt = { type: "message", data: { name: name, msg: buf.toString().trim() }};
        websocket.send(JSON.stringify(evt), function(err){
            if (err) console.error("Error: " + err.message);
        });
    }
}
process.stdin.on("readable", stdinReadable);
