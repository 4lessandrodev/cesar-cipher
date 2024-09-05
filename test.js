const { crypt } = require('./dist/index');
const assert = require('assert');
const { test } = require('node:test');

test("cesar-cipher: criptografar e descriptografar", () => {
    const cesar = crypt(3);
    const message = 'OLA MUNDO';

    // Teste de criptografia
    const encryptedMessage = cesar.encrypt(message);
    assert.strictEqual(encryptedMessage, 'ROD PXQGR', 'A mensagem criptografada está incorreta');

    // Teste de descriptografia
    const decryptedMessage = cesar.decrypt(encryptedMessage);
    assert.strictEqual(decryptedMessage, 'OLA MUNDO', 'A mensagem descriptografada está incorreta');
});
