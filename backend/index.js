const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const publicPath = path.join(__dirname, '../frontend');
const port = process.env.PORT || 3005;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Novo usuário conectado.');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            console.log(params)
            callback('Nome e nome da sala são obrigatórios.')
        }

        socket.join(params.room);

        // Mensagem de Bem Vindo do Admin para o app.
        socket.emit('newMessage', generateMessage('Admin', 'Bem vindo ao chat!'));

        // Mensagem de novo usuário do Admin
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} acabou de entrar.`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('Criando mensagem:', message)

        // Enviar mensagem para todos inclusive você mesmo
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('Usuário foi desconectado com sucesso!')
    })
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});