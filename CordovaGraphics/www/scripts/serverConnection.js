var socket = null;

function startServer() {
    var socket = io('http://10.5.186.163:3000');
    socket.emit('chat message', 'Connected')
    socket.on('chat message', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });

    socket.connect();
}