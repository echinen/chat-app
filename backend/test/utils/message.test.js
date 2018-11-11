const moment = require('moment');
const { generateMessage, generateLocationMessage } = require('../../src/utils/message');

describe('Gerar mensagem', () => {
    test('Mostrar um objecto de mensagem com sucesso.', () => {
        const from = 'Eric';
        const text = 'Mensagem teste';
        
        const message = generateMessage(from, text);

        const createdAt = message.createdAt;

        expect(message).toEqual({ from, text, createdAt });
    });
});

describe('Gerar mensagem com localização', () => {
    test('Mostrar a localização do usuário com sucesso.', () => {
        const from = 'User'
        const latitude = 15;
        const longitude = 19;
        const url = 'https://www.google.com/maps?q=15,19';

        var message = generateLocationMessage(from, latitude, longitude);

        const createdAt = message.createdAt;

        expect(message).toEqual({ from, url, createdAt });
    });
});