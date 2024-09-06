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

function validateInstance(alphabet: string[], shift: number) {
    if (typeof shift !== 'number') throw new Error('Shift must be a number');
    if (!Array.isArray(alphabet)) throw new Error('Alphabet must be array of letters');
    if (alphabet.length < 10) throw new Error('Alphabet must contain at least 10 letters');
}

/**
 * Cria um objeto com funções para criptografar e descriptografar mensagens.
 * 
 * @param shift - O valor de deslocamento a ser aplicado na criptografia e descriptografia.
 * @param alphabet - O array que representa o alfabeto (opcional). Se não fornecido, usa o alfabeto padrão.
 * @returns Um objeto com os métodos `encrypt` e `decrypt` para processar mensagens.
 * @throws Erro se o alfabeto estiver vazio ou o `shift` for inválido.
 */
export function crypt(shift: number, alphabet: string[] = defaultAlphabet) {
    validateInstance(alphabet, shift);
    return {
        /**
         * Descriptografa uma mensagem aplicando o deslocamento inverso.
         * 
         * @param message - A mensagem criptografada que será descriptografada em base64.
         * @returns A mensagem original após descriptografar.
         */
        decrypt: (message: string): string => {
            const shiftIndex = alphabet.length - shift;
            const text = toText(message);
            const messageOrEmpty = ensureMessage(text);
            return shiftMessage(messageOrEmpty, shiftIndex, alphabet);
        },

        /**
         * Criptografa uma mensagem aplicando o deslocamento.
         * 
         * @param message - A mensagem original que será criptografada.
         * @returns A mensagem criptografada após aplicar o deslocamento e em base64.
         */
        encrypt: (message: string): string => {
            const messageOrEmpty = ensureMessage(message);
            const text = shiftMessage(messageOrEmpty, shift, alphabet);
            return toBase64(text);
        },
    };
}

export default crypt;
