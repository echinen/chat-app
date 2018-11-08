const expect = require('expect');

const { isRealString } = require('./validation');

describr('isRealString', () => {
    it('deve rejeitar um valor "não" string.', () => {
        const res = isRealString(98);
        expect(res).toBe(false);
    });

    it('deve rejeitar um valor somente com espaços em branco.', () => {
        const res = isRealString("      ");
        expect(res).toBe(false);
    });

    it('deve permitir um valor de string com espaços.', () => {
        const res = isRealString("      Teste    ");
        expect(res).toBe(true);
    });
});