var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var config = {
  port: 8080
};

io.on('connection',function(socket) {

  console.log("a user connected");

  socket.on('disconnect', function() {
    console.log("user disconnected");
  });

  socket.on('chat message', function(msg) {
    console.log("msg: " + msg);
    io.to(msg.room).emit('receive message', msg);
  });

  socket.on('join room', function(room){
    socket.join(room);
    console.log("a user joined room " + room);
  });
})

http.listen(config.port, function(){
  console.log('listening on *:' + config.port);
});
