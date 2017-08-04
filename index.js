var express    =    require('express');
var socket          =     require('socket.io');


// App setup
var app = express();
var server = app.listen(4040, function() {
    console.log('Server started');
});



//static files
app.use(express.static("public"));



var io = socket(server);


io.on('connection', function(socket) {
    console.log("Made socket connection", socket.id);
    //collecting date from object on 'send' click from chat.js
    socket.on('chat', function(data) {
    //send msg to all other clients connected to server
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        //broadcast that person is typing
        socket.broadcast.emit('typing', data);
    });
});












