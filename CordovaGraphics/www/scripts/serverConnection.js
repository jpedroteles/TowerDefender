var socket = null;

function startServer() {
    var socket = io('http://10.5.186.163:3000');

    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });

    socket.connect();
}