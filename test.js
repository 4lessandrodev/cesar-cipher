const { crypt } = require('./dist/index');
const assert = require('assert');
const { test } = require('node:test');

test("cesar-cipher: criptografar e descriptografar", () => {
    const cesar = crypt(3);

    const encryptedMessage1 = cesar.encrypt('OLA MUNDO');
    assert.strictEqual(encryptedMessage1, 'Uk9EK1BYUUdS', 'A mensagem 1 criptografada está incorreta');

    const decryptedMessage1 = cesar.decrypt(encryptedMessage1);
    assert.strictEqual(decryptedMessage1, 'OLA MUNDO', 'A mensagem 1 descriptografada está incorreta');

    const encryptedMessage2 = cesar.encrypt('OLÁ CORAÇÃO');
    assert.strictEqual(encryptedMessage2, 'Uk8wK0ZSVUTAylI=', 'A mensagem 2 criptografada está incorreta');

    const decryptedMessage2 = cesar.decrypt(encryptedMessage2);
    assert.strictEqual(decryptedMessage2, 'OLÁ CORAÇÃO', 'A mensagem 2 descriptografada está incorreta');

    const encryptedMessage3 = cesar.encrypt('FILME 007');
    assert.strictEqual(encryptedMessage3, 'SUxPUEgrMzNh', 'A mensagem 3 criptografada está incorreta');

    const decryptedMessage3 = cesar.decrypt(encryptedMessage3);
    assert.strictEqual(decryptedMessage3, 'FILME 007', 'A mensagem 3 descriptografada está incorreta');

    const encryptedMessage4 = cesar.encrypt('Hacker White Hat');
    assert.strictEqual(encryptedMessage4, 'S2Rmbmh1K1prbHdoK0tkdw==', 'A mensagem 4 criptografada está incorreta');

    const decryptedMessage4 = cesar.decrypt(encryptedMessage4);
    assert.strictEqual(decryptedMessage4, 'Hacker White Hat', 'A mensagem 4 descriptografada está incorreta');
});

test("cesar-cipher: criptografar e descriptografar com segredo", () => {
    const cesar = crypt(3);

    const encryptedMessage1 = cesar.encrypt('OLA MUNDO', 'segredo forte');
    assert.strictEqual(encryptedMessage1, 'Uk9EK1BYUUdS', 'A mensagem 1 criptografada está incorreta');

    const decryptedMessage1 = cesar.decrypt(encryptedMessage1, 'segredo forte');
    assert.strictEqual(decryptedMessage1, 'OLA MUNDO', 'A mensagem 1 descriptografada está incorreta');

    const encryptedMessage2 = cesar.encrypt('olá mundo', 's3gr3do f0rt3');
    assert.strictEqual(encryptedMessage2, 'dHBzK3F4dTB0', 'A mensagem 2 criptografada está incorreta');

    const decryptedMessage2 = cesar.decrypt(encryptedMessage2, 's3gr3do f0rt3');
    assert.strictEqual(decryptedMessage2, 'olá mundo', 'A mensagem 2 descriptografada está incorreta');

    const decryptedMessage3 = cesar.decrypt(encryptedMessage2, 'invalid secret');
    assert.strictEqual(decryptedMessage3, 'eka mqoÁe', 'A mensagem 3 descriptografada está incorreta');

});
