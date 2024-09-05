# Criptografia de Substituição com Shift

> Apenas para fins didáticos

Este projeto implementa um simples sistema de criptografia e descriptografia de mensagens usando o conceito de **substituição por shift** (ou cifra de César). O código permite ao usuário criptografar e descriptografar mensagens, aplicando um deslocamento (`shift`) nas letras do alfabeto.

---

### Conceito

A **cifra de César** é uma técnica de criptografia que consiste em substituir cada letra de uma mensagem pela letra que se encontra um certo número de posições à frente (ou atrás) no alfabeto. O número de posições é chamado de **shift**.

Por exemplo, ao criptografar a letra `A` com um `shift` de 3, a letra resultante seria `D`. A mesma técnica pode ser aplicada para descriptografar a mensagem ao usar o **shift inverso**.

### Exemplo de Criptografia

- Mensagem original: `MENSAGEM SECRETA`
- Shift: `3`
- Mensagem criptografada: `PHQVDJHP VHFUHWD`

### Exemplo de Descriptografia

- Mensagem criptografada: `PHQVDJHP VHFUHWD`
- Shift: `3`
- Mensagem descriptografada: `MENSAGEM SECRETA`

### Estrutura do Código

O código está organizado em funções simples que implementam a lógica de criptografia e descriptografia.

#### 1. **`isWhitespace(char: string): boolean`**
Verifica se o caractere é um espaço em branco. Isso é usado para manter os espaços intactos na mensagem criptografada.

#### 2. **`appendToMessage(char: string, message: string): string`**
Adiciona um caractere ao final de uma string de mensagem.

#### 3. **`isInAlphabet(char: string, alphabet: string[]): boolean`**
Verifica se o caractere faz parte do alfabeto fornecido. Isso é importante para garantir que apenas letras válidas sejam criptografadas.

#### 4. **`validateShift(shift: number, alphabet: string[]): void`**
Valida o valor do `shift` para garantir que seja positivo e menor que o tamanho do alfabeto.

#### 5. **`shiftMessage(message: string, shift: number, alphabet: string[]): string`**
Esta função é o coração do código. Ela processa a mensagem e aplica o deslocamento de acordo com o `shift` fornecido. Se o caractere for uma letra, ele será deslocado; se for um espaço em branco, ele será mantido; e se for um caractere inválido, será substituído por `?`.

A função usa o método `reduce` para construir a mensagem final letra por letra.

#### 6. **`crypt(alphabet: string[], shift: number)`**
Essa função retorna um objeto com dois métodos:
- **`encrypt(message: string): string`**: Criptografa a mensagem aplicando o `shift`.
- **`decrypt(message: string): string`**: Descriptografa a mensagem aplicando o shift inverso (calculado como `alphabet.length - shift`).

### Exemplo de Uso

#### Instalação

```sh

npm i cesar-cipher

# OR

yarn add cesar-cipher

```

#### Using

```typescript

import { cipher } from 'cesar-cipher';

// Criar um objeto de criptografia com um shift de 25
const cipher = crypt(25); // 1 a 25

// Criptografar uma mensagem
const encryptedMessage = cipher.encrypt("MENSAGEM SECRETA");
console.log(encryptedMessage); // "LDMRZFDL RDBQDSZ"

// Descriptografar a mensagem criptografada
const decryptedMessage = cipher.decrypt(encryptedMessage);
console.log(decryptedMessage); // "MENSAGEM SECRETA"

```

### Tratamento de Erros

- O valor do `shift` deve ser um número positivo e menor que o tamanho do alfabeto. Caso contrário, o código lançará um erro.
- O alfabeto fornecido não pode estar vazio.
- Se a mensagem contiver caracteres que não fazem parte do alfabeto (como números ou símbolos), esses caracteres serão substituídos por `?` na mensagem criptografada ou descriptografada.

### Como Funciona a Lógica do Shift

Para aplicar o `shift`, o código utiliza a seguinte fórmula:

```typescript
const shiftedIndex = (currentIndex + shift) % totalLetters;
```

Aqui:
- `currentIndex` é o índice atual da letra no alfabeto.
- `shift` é o número de posições que a letra será deslocada.
- `totalLetters` é o tamanho do alfabeto (normalmente 26).

Essa fórmula garante que, ao atingir o final do alfabeto, o deslocamento "dê a volta", começando de novo do início do alfabeto.

### Conclusão

Este sistema de criptografia é uma implementação simples e eficaz do método de cifra de César. Ele permite a manipulação de mensagens utilizando um deslocamento em um alfabeto customizável, aplicando boas práticas de programação em TypeScript, como validação de parâmetros e tratamento de erros.
