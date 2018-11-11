const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../frontend');
const port = process.env.PORT || 3005;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Novo usuário conectado.');

    socket.on('join', (params, callback) => {
        const name = params['?name'];
        const room = params['room'];

        if (!isRealString(name) || !isRealString(room)) {
            return callback('Nome e nome da sala são obrigatórios.')
        }

        socket.join(room);
        users.removerUser(socket.id);
        users.addUser(socket.id, name, room);

        io.to(room).emit('updateUserList', users.getUserList(room));

        // Mensagem de Bem Vindo do Admin para o app.
        socket.emit('newMessage', generateMessage('Admin', 'Bem vindo ao chat!'));

        // Mensagem de novo usuário do Admin
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} acabou de entrar.`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        // Enviar mensagem para todos inclusive você mesmo
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));   
        }
    });

    socket.on('disconnect', () => {
        const user = users.removerUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} saiu da sala.`));

            console.log('Usuário foi desconectado com sucesso!');
        }
    })
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});