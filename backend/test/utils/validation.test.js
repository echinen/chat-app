const { isRealString } = require('../../src/utils/validation');

describe('isRealString', () => {
    test('deve rejeitar um valor "não" string.', () => {
        const res = isRealString(98);
        expect(res).toBe(false);
    });

    test('deve rejeitar um valor somente com espaços em branco.', () => {
        const res = isRealString("      ");
        expect(res).toBe(false);
    });

    test('deve permitir um valor de string com espaços.', () => {
        const res = isRealString("      Teste    ");
        expect(res).toBe(true);
    });
});