var app = require('./config/server');

var server = app.listen(3000,()=>{
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

io.on('connection',(socket)=>{
    console.log('Usuário conectou');
    socket.on('disconnect',()=>{
        console.log('Usuário desconectou');
    });
});

