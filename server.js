var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var config = {
  port: 8080
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket) {

  console.log("a user connected");

  socket.on('disconnect', function() {
    console.log("user disconnected");
  });

  socket.on('chat message', function(msg) {
    console.log("msg: " + msg);
    io.emit('chat message', msg);
  });
})

http.listen(config.port, function(){
  console.log('listening on *:' + config.port);
});
