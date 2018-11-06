const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('Gerar mensagem', () => {
    it('Mostrar um objecto de mensagem com sucesso.', () => {
        const from = 'Eric';
        const text = 'Mensagem teste';
        const message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });
});

describe('Gerar mensagem com localização', () => {
    it('Mostrar a localização do usuário com sucesso.', () => {
        var from = 'User'
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, url });
    });
});