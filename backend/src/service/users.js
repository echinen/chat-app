/* global USERS_DATA */

const moment = require('moment');

class UsersService {
    constructor() {}

    addUser(id, name, room) {
        let user = { id, name, room };
        user.createdAt = moment().valueOf();
        USERS_DATA.push(user);
        return user;
    }

    removerUser(id) {
        const user = this.getUser(id);

        if (user) {
            USERS_DATA = USERS_DATA.filter(user => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return USERS_DATA.filter(user => user.id === id)[0];
    }

    getUserList(room) {
        const users = USERS_DATA
                        .filter(user => user.room === room)
                        .map(user => user);

        return users;
    }
}

module.exports = {
    UsersService
}