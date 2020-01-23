var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    console.log('user connected to site');
    res.sendFile(__dirname + '/index.html');
})
io.on('connection', function (socket) {
    console.log('user connected id:' + socket.id);
    io.emit('sm', "new user connected:" + socket.id.toString());
    socket.on('message', function (msg) {
        console.log(socket.id + ":" + msg);
        io.emit('sm', socket.id.toString() + ':' + msg);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('sm', 'user disconnected' + ':' + socket.id.toString());
    });
})


http.listen(3000, function () {
    console.log('server listening at port 3000');
})