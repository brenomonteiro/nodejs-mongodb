var app = require('./config/server');

var server = app.listen(3000,()=>{
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);
app.set('io',io);

io.on('connection',(socket)=>{
    console.log('Usuário conectou');

    socket.on('disconnect',()=>{
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor',(data)=>{
        socket.emit('msgParaCliente',
        {apelido:data.apelido,
            mensagem: data.mensagem})

    socket.broadcast.emit('msgParaCliente',
        {apelido:data.apelido,
            mensagem: data.mensagem})
    });
});

