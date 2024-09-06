const { crypt } = require('./dist/index');
const assert = require('assert');
const { test } = require('node:test');

test("cesar-cipher: criptografar e descriptografar", () => {
    const cesar = crypt(3);

    const encryptedMessage1 = cesar.encrypt('OLA MUNDO');
    assert.strictEqual(encryptedMessage1, 'ROD+PXQGR', 'A mensagem 1 criptografada está incorreta');

    const decryptedMessage1 = cesar.decrypt(encryptedMessage1);
    assert.strictEqual(decryptedMessage1, 'OLA MUNDO', 'A mensagem 1 descriptografada está incorreta');

    const encryptedMessage2 = cesar.encrypt('OLÁ CORAÇÃO');
    assert.strictEqual(encryptedMessage2, 'ROA+FRUDÀÊR', 'A mensagem 2 criptografada está incorreta');

    const decryptedMessage2 = cesar.decrypt(encryptedMessage2);
    assert.strictEqual(decryptedMessage2, 'OLÁ CORAÇÃO', 'A mensagem 2 descriptografada está incorreta');

    const encryptedMessage3 = cesar.encrypt('FILME 007');
    assert.strictEqual(encryptedMessage3, 'ILOPH+33Ç', 'A mensagem 3 criptografada está incorreta');

    const decryptedMessage3 = cesar.decrypt(encryptedMessage3);
    assert.strictEqual(decryptedMessage3, 'FILME 007', 'A mensagem 3 descriptografada está incorreta');
});
