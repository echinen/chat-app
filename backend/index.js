const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../frontend');
const port = process.env.PORT || 3005;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', (message) => {
        console.log('create message', message)

        // Mensagem de Bem Vindo do Admin para o app.
        socket.emit('newMessage', {
            from: 'Admin',
            text: 'Welcome to chat!',
            createdAt: new Date().getTime()
        })

        // Mensagem de novo usuário do Admin
        socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text: 'Entrou um novo usuário.',
            createdAt: new Date().getTime()
        })

        // Enviar mensagem para todos inclusive você mesmo
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        // Enviar mensagem para todos menos você mesmo
        /* socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }) */
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
});

server.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});