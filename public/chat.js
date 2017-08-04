// Make connection

const socket = io.connect("http://localhost:4040");

// Storing elements in variables

var message = document.getElementById('message'),
    handle  =   document.getElementById('handle'),
    btn     =   document.getElementById('send'),
    output  =   document.getElementById('output'),
    feedback =  document.getElementById('feedback');

// Event when someone clicks send

btn.addEventListener('click', function() {
    //sends information from input to server
    socket.emit('chat', {

        message: message.value,
        handle: handle.value
    });

});

message.addEventListener('keypress', function() {

    socket.emit('typing', handle.value);

});

//Listen for events

socket.on('chat', function(data) {
    //display msg on DOM using 'output' ID
    feedback.innerHTML ="";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' +
    data.message + '</p>';
});

socket.on('typing', function(data) {
    feedback.innerHTML += '<p><em>' + data + ' is typing a message...</em></p>';
});

