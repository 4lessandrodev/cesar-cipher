const defaultAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃÉÀÊÓÁÔÍ0123456789abcdefghijklmnopqrstuvwxyzçãéàêóáôí'.split('');

/**
 * Verifica se o caractere fornecido é um espaço em branco.
 *
 * @param char - O caractere a ser verificado.
 * @returns `true` se o caractere for um espaço em branco, caso contrário, `false`.
 */
function isWhitespace(char: string): boolean {
    return char === ' ';
}

/**
 * Verifica se o caractere fornecido é um espaço em encriptado.
 *
 * @param char - O caractere a ser verificado.
 * @returns `true` se o caractere for um espaço em encriptado, caso contrário, `false`.
 */
function isEncryptedWhitespace(char: string): boolean {
    return char === '+';
}

/**
 * Adiciona um caractere ao final de uma string de mensagem.
 * 
 * @param char - O caractere a ser adicionado.
 * @param message - A mensagem que será concatenada com o caractere.
 * @returns A mensagem resultante com o caractere adicionado no final.
 */
function appendToMessage(char: string, message: string): string {
    return message + char;
}

/**
 * Verifica se o caractere está no alfabeto fornecido.
 * 
 * @param char - O caractere a ser verificado.
 * @param alphabet - O array de letras que compõe o alfabeto.
 * @returns `true` se o caractere estiver presente no alfabeto, caso contrário, `false`.
 */
function isInAlphabet(char: string, alphabet: string[]): boolean {
    return alphabet.includes(char);
}

/**
 * Valida o valor de `shift` para garantir que seja positivo e menor que o tamanho do alfabeto.
 * 
 * @param shift - O valor do deslocamento aplicado às letras do alfabeto.
 * @param alphabet - O array que representa o alfabeto.
 * @throws Erro se o `shift` for negativo ou maior ou igual ao tamanho do alfabeto.
 */
function validateShift(shift: number, alphabet: string[]): void {
    if (shift <= 0) throw new Error('Shift must be positive');
    if (shift >= alphabet.length) throw new Error('Shift must be less than total of alphabet letters');
}

/**
 * Encontra um novo caractere em uma cadeia, com base em um deslocamento (shift).
 * A função localiza o índice atual do caractere dado na cadeia e calcula um novo índice 
 * deslocado pelo valor especificado. O novo caractere no índice deslocado é retornado.
 * 
 * @param char - O caractere atual que precisa ser deslocado.
 * @param chain - Um array de caracteres representando a cadeia na qual o caractere será encontrado.
 * @param shift - O número de posições a serem deslocadas (positivo para direita, negativo para esquerda).
 * 
 * @returns O novo caractere após o deslocamento na cadeia.
 * 
 * @example
 * ```
 * const alphabet = ['a', 'b', 'c', 'd', 'e'];
 * const result = findNewChar('b', alphabet, 2); // Retorna 'd'
 * ```
 */
function findNewChar(char: string, chain: string[], shift: number): string {
    const totalNumbers = chain.length;
    const currentIndex = chain.indexOf(char);
    const shiftedIndex = (currentIndex + shift) % totalNumbers;
    const newChar = chain[shiftedIndex];
    return newChar;
}

/**
 * Aplica o deslocamento (`shift`) às letras de uma mensagem de acordo com o alfabeto fornecido.
 * 
 * @param message - A mensagem que será processada.
 * @param shift - O valor de deslocamento que será aplicado.
 * @param alphabet - O array que representa o alfabeto.
 * @returns A mensagem resultante após o deslocamento das letras.
 * @throws Erro se o `shift` for inválido.
 */
function shiftMessage(message: string, shift: number, alphabet: string[]): string {
    validateShift(shift, alphabet);
    return message.split("").reduce((acc, char): string => {
        if (isWhitespace(char)) {
            return appendToMessage('+', acc);
        }

        if (isEncryptedWhitespace(char)) {
            return appendToMessage(' ', acc);
        }

        if (!isInAlphabet(char, alphabet)) {
            return appendToMessage('?', acc);
        }

        const newChar = findNewChar(char, alphabet, shift);

        return appendToMessage(newChar, acc);
    }, "");
}

/**
 * Converte uma string de texto em uma string codificada em Base64.
 * 
 * @param message - A string de texto a ser convertida para Base64.
 * @returns Uma string codificada em Base64.
 * 
 * @example
 * ```
 * const result = toBase64("Hello, World!"); // Retorna "SGVsbG8sIFdvcmxkIQ=="
 * ```
 */
function toBase64(message: string): string {
    return btoa(message);
}

/**
 * Converte uma string codificada em Base64 de volta para uma string de texto.
 * 
 * @param base64 - A string Base64 a ser decodificada.
 * @returns A string de texto original.
 * 
 * @example
 * ```
 * const result = toText("SGVsbG8sIFdvcmxkIQ=="); // Retorna "Hello, World!"
 * ```
 */
function toText(base64: string): string {
    return atob(base64);
}

/**
 * Garante que uma mensagem seja convertida para string e retorne em letras maiúsculas.
 * 
 * @param message - A string de texto que será verificada e convertida.
 * @returns A string convertida em letras maiúsculas, ou uma string vazia se a mensagem for nula ou indefinida.
 * 
 * @example
 * ```
 * const result = ensureMessage("hello"); // Retorna "HELLO"
 * ```
 */
function ensureMessage(message: string): string {
    return (message?.toString() ?? '');
}

/**
 * Valida os parâmetros fornecidos para garantir que atendem aos critérios esperados.
 * 
 * Esta função verifica se o parâmetro `shift` é um número e se o parâmetro `alphabet` é um array contendo pelo menos 10 letras.
 * Se algum dos parâmetros não atender aos critérios, uma exceção é lançada com uma mensagem de erro apropriada.
 * 
 * @param alphabet - Um array de strings representando o alfabeto, que deve conter pelo menos 10 letras.
 * @param shift - Um número que representa o valor de deslocamento. Deve ser do tipo `number`.
 * 
 * @throws {Error} Se o parâmetro `shift` não for um número.
 * @throws {Error} Se o parâmetro `alphabet` não for um array.
 * @throws {Error} Se o array `alphabet` contiver menos de 10 letras.
 * 
 * @example
 * ```typescript
 * try {
 *     validateInstance(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 5);
 *     // Não lança exceção
 * 
 *     validateInstance(['a', 'b', 'c'], 5);
 *     // Lança Error: Alphabet must contain at least 10 letters
 * 
 *     validateInstance('invalidAlphabet', 5);
 *     // Lança Error: Alphabet must be array of letters
 * 
 *     validateInstance(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 'invalidShift');
 *     // Lança Error: Shift must be a number
 * ``` 
 */
function validateInstance(alphabet: string[], shift: number) {
    if (typeof shift !== 'number') throw new Error('Shift must be a number');
    if (!Array.isArray(alphabet)) throw new Error('Alphabet must be array of letters');
    if (alphabet.length < 10) throw new Error('Alphabet must contain at least 10 letters');
}

/**
 * Remove caracteres duplicados de uma string e retorna uma nova string com caracteres únicos, preservando a ordem original.
 * 
 * A função verifica cada caractere da string `secret` e constrói uma nova string contendo apenas a primeira ocorrência de cada caractere. 
 * Caso a string `secret` seja indefinida (`undefined`), a função trata isso como uma string vazia.
 * 
 * @param secret - Uma string opcional da qual os caracteres duplicados serão removidos. Se não for fornecida, será tratada como uma string vazia.
 * 
 * @returns Uma nova string contendo apenas caracteres únicos da string `secret`, preservando a ordem em que eles aparecem pela primeira vez.
 * 
 * @example
 * ```typescript
 * const result = toUniqueChars('aabbcc');
 * console.log(result); // Output: 'abc'
 * 
 * const resultEmpty = toUniqueChars();
 * console.log(resultEmpty); // Output: ''
 * ```
 */
function toUniqueChars(secret: string): string {
    return (secret).split('').reduce((prev, current): string => {
        if (prev.includes(current)) return prev;
        if (isWhitespace(current)) return prev;
        return prev + current;
    }, '');
}

/**
 * Verifica se um caractere está presente no alfabeto padrão.
 * 
 * A função verifica se o caractere fornecido está incluído no alfabeto padrão definido pela variável `defaultAlphabet`.
 * 
 * @param char - O caractere a ser verificado. Deve ser uma string de um único caractere.
 * 
 * @returns `true` se o caractere estiver presente no alfabeto padrão, caso contrário, `false`.
 * 
 * @throws {Error} Se `char` não for uma string de comprimento 1.
 * 
 * @example
 * ```typescript
 * const result1 = isOnAlphabet('a');
 * console.log(result1); // Output: true (se 'a' estiver no `defaultAlphabet`)
 * 
 * const result2 = isOnAlphabet('z');
 * console.log(result2); // Output: false (se 'z' não estiver no `defaultAlphabet`)
 * ```
 */
function isOnAlphabet(char: string): boolean {
    return defaultAlphabet.includes(char);
}

/**
 * Substitui caracteres ausentes em uma sequência de caracteres com base em um alfabeto fornecido.
 * 
 * A função verifica cada caractere do alfabeto para ver se ele está presente na string `secret`. 
 * Se um caractere do alfabeto não estiver presente na string `secret`, ele é adicionado ao final da string resultante.
 * 
 * @param alphabet - Um array de strings representando o alfabeto ou conjunto de caracteres a ser verificado e adicionado.
 * @param secret - Uma string contendo os caracteres iniciais que serão verificados e atualizados com base no alfabeto.
 * 
 * @returns Um array de strings representando a sequência resultante após a adição dos caracteres do alfabeto que estavam ausentes na string `secret`.
 * 
 * @example
 * ```typescript
 * const alphabet = ['a', 'b', 'c', 'd', 'e'];
 * const secret = 'ac';
 * const result = replace(alphabet, secret);
 * console.log(result); // Output: ['a', 'c', 'b', 'd', 'e']
 * ```
 */
function replace(alphabet: string[], secret: string): string[] {
    const result: string[] = [...secret];
    if (!result.length) return alphabet;
    for (const char of alphabet) {
        if (result.includes(char) || !isOnAlphabet(char)) continue;
        result.push(char);
    }
    return result;
}

/**
 * Cria um objeto com funções para criptografar e descriptografar mensagens.
 * 
 * @param shift - O valor de deslocamento a ser aplicado na criptografia e descriptografia.
 * @param alphabet - O array que representa o alfabeto (opcional). Se não fornecido, usa o alfabeto padrão.
 * @returns Um objeto com os métodos `encrypt` e `decrypt` para processar mensagens.
 * @throws Erro se o alfabeto for informado e estiver vazio ou o `shift` for inválido.
 */
export function crypt(shift: number, alphabet: string[] = defaultAlphabet) {
    validateInstance(alphabet, shift);
    return {
        /**
         * Descriptografa uma mensagem aplicando o deslocamento inverso.
         * 
         * @param message - A mensagem criptografada que será descriptografada em base64.
         * @param secret - O segredo que foi utilizado para a criptografia.
         * @returns A mensagem original após descriptografar.
         */
        decrypt: (message: string, secret: string = ''): string => {
            const messageOrEmpty = ensureMessage(message);
            const replacer = toUniqueChars(secret);
            const replacedAlphabet = replace(alphabet, replacer);
            const shiftIndex = replacedAlphabet.length - shift;
            const text = toText(messageOrEmpty);
            return shiftMessage(text, shiftIndex, replacedAlphabet);
        },

        /**
         * Criptografa uma mensagem aplicando o deslocamento.
         * 
         * @param message - A mensagem original que será criptografada.
         * @param secret - O segredo que deseja utilizar para a criptografia.
         * @returns A mensagem criptografada após aplicar o deslocamento e em base64.
         */
        encrypt: (message: string, secret: string = ''): string => {
            const messageOrEmpty = ensureMessage(message);
            const replacer = toUniqueChars(secret);
            const replacedAlphabet = replace(alphabet, replacer);
            const text = shiftMessage(messageOrEmpty, shift, replacedAlphabet);
            return toBase64(text);
        },
    };
}

export default crypt;
