const expect = require('expect');
const moment = require('moment');
const { generateMessage, generateLocationMessage } = require('./message');

describe('Gerar mensagem', () => {
    it('Mostrar um objecto de mensagem com sucesso.', () => {
        const from = 'Eric';
        const text = 'Mensagem teste';
        const createdAt = moment().valueOf();
        
        const message = generateMessage(from, text);

        expect(message).toEqual({ from, text, createdAt });
    });
});

describe('Gerar mensagem com localização', () => {
    it('Mostrar a localização do usuário com sucesso.', () => {
        const from = 'User'
        const latitude = 15;
        const longitude = 19;
        const url = 'https://www.google.com/maps?q=15,19';
        const createdAt = moment().valueOf();

        var message = generateLocationMessage(from, latitude, longitude);

        expect(message).toEqual({ from, url, createdAt });
    });
});