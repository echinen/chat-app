const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');
const { generateMessage, generateLocationMessage } = require('./src/utils/message');
const { isRealString } = require('./src/utils/validation');
const { chatTalkTime } = require('./src/utils/helper');
const { UsersService } = require('./src/service/users');

const port = process.env.PORT || 3005;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

global.USERS_DATA = [];

io.on('connection', (socket) => {
    console.log(`Novo usuário conectado. ID: ${socket.id}`);

    const usersService = new UsersService();

    socket.on('join', (params, callback) => {
        const name = params['?name'];
        const room = params['room'];

        if (!isRealString(name)) {
            return callback('Nome do usuário é obrigatório.')
        }

        if (!isRealString(room)) {
            return callback('Nome da sala é obrigatório.')
        }

        socket.join(room);
        usersService.removerUser(socket.id);
        usersService.addUser(socket.id, name, room);

        io.to(room).emit('updateUserList', usersService.getUserList(room));

        // Mensagem de Bem Vindo do Admin para o app.
        socket.emit('newMessage', generateMessage('Admin', 'Bem vindo ao chat!'));

        // Mensagem de novo usuário do Admin
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} acabou de entrar.`));

        return callback();
    });

    socket.on('createMessage', (message, callback) => {
        const user = usersService.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        const user = usersService.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));   
        }
    });

    socket.on('disconnect', () => {
        const user = usersService.removerUser(socket.id);
        const talkTime = chatTalkTime(user.createdAt);

        if (user) {
            io.to(user.room).emit('updateUserList', usersService.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} saiu da sala. Tempo online no chat: ${talkTime}`));

            console.log(`Usuário(a) ${user.name} foi desconectado(a) com sucesso!`);
        }
    })
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});