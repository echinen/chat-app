const moment = require('moment');
const { UsersService } = require('../../src/service/users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new UsersService();

        global.USERS_DATA =
            [
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
            ];
    });

    test('criar novo usuário', () => {
        const user = {
            id: '321',
            name: 'Eric Teste',
            room: 'Chat Teste'
        };

        const resultUser = users.addUser(user.id, user.name, user.room);
        user.createdAt = resultUser.createdAt;

        expect(resultUser).toEqual(user);
    });

    it('remover um usuário', () => {
        const userId = '1';
        const user = users.removerUser(userId);

        expect(user.id).toBe(userId);
        expect(USERS_DATA.length).toBe(2);
    });

    test('não remover um usuário', () => {
        const userId = 'y';
        const user = users.removerUser(userId);

        expect(user).toEqual(undefined);
        expect(USERS_DATA.length).toBe(3);
    });

    test('retornar um usuário específico', () => {
        const userId = '2';
        const user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    test('não retornar um usuário específico', () => {
        const userId = 'x';
        const user = users.getUser(userId);

        expect(user).toEqual(undefined);
    });

    test('Retornar os nomes da sala Chat Test 1', () => {
        const roomName = 'Chat Test 1';
        const userList = users.getUserList(roomName);

        expect(userList.length).toEqual(2);
        expect(userList[0].name).toEqual('User Test 1');
        expect(userList[1].name).toEqual('User Test 3');
    });

    test('Retornar os nomes da sala Chat Test 2', () => {
        const roomName = 'Chat Test 2';
        const userList = users.getUserList(roomName);

        expect(userList.length).toEqual(1);
        expect(userList[0].name).toEqual('User Test 2');
    });
})