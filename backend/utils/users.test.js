const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'User Test 1',
                room: 'Chat Test 1'
            },
            {
                id: '2',
                name: 'User Test 2',
                room: 'Chat Test 2'
            },
            {
                id: '3',
                name: 'User Test 3',
                room: 'Chat Test 1'
            }
        ]
    });

    it('criar novo usuário', () => {
        const user = {
            id: '321',
            name: 'Eric Teste',
            room: 'Chat Teste'
        };

        const resultUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('remover um usuário', () => {
        const userId = '1';
        const user = users.removerUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('não remover um usuário', () => {
        const userId = 'y';
        const user = users.removerUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('retornar um usuário específico', () => {
        const userId = '2';
        const user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('não retornar um usuário específico', () => {
        const userId = 'x';
        const user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('Retornar os nomes da sala Chat Test 1', () => {
        const roomName = 'Chat Test 1';
        const userList = users.getUserList(roomName);

        expect(userList).toEqual(['User Test 1', 'User Test 3']);
    });

    it('Retornar os nomes da sala Chat Test 2', () => {
        const roomName = 'Chat Test 2';
        const userList = users.getUserList(roomName);

        expect(userList).toEqual(['User Test 2']);
    });
})