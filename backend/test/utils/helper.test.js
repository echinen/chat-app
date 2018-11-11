const moment = require('moment');
const { chatTalkTime } = require('../../src/utils/helper');

describe('Tempo do chat', () => {
    test('Mostrar o tempo de duração de uma conversa em 1 hora com sucesso.', () => {
        const createdAt = moment().add('-1', 'h');

        const resultTalkTime = chatTalkTime(createdAt);
        const expectedTalkTime = '01:00:00';

        expect(resultTalkTime).toEqual(expectedTalkTime);
    });

    test('Mostrar o tempo de duração de uma conversa em 30 minutos com sucesso.', () => {
        const createdAt = moment().add('-30', 'm');

        const resultTalkTime = chatTalkTime(createdAt);
        const expectedTalkTime = '00:30:00';

        expect(resultTalkTime).toEqual(expectedTalkTime);
    });

    test('Mostrar o tempo de duração de uma conversa em 1 minuto e 30 segundos com sucesso.', () => {
        const createdAt = moment().add('-90', 's');

        const resultTalkTime = chatTalkTime(createdAt);
        const expectedTalkTime = '00:01:30';

        expect(resultTalkTime).toEqual(expectedTalkTime);
    });
});