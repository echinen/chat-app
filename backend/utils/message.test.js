const expect = require('expect');
const { generateMessage } = require('./message');

describe('Gerar mensagem', () => {
    it('Mostrar um objecto de mensagem com sucesso.', () => {
        const from = 'Eric';
        const text = 'Mensagem teste';
        const message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    })
})