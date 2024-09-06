# Criptografia de Substituição com Shift

> Apenas para fins didáticos. Não é aconselhável o uso dessa biblioteca em ambiente produtivo!

Este projeto implementa um simples sistema de criptografia e descriptografia de mensagens usando o conceito de **substituição por shift** (ou cifra de César). O código permite ao usuário criptografar e descriptografar mensagens, aplicando um deslocamento (`shift`) nas letras do alfabeto.

---

### Conceito

A **cifra de César** é uma técnica de criptografia que consiste em substituir cada letra de uma mensagem pela letra que se encontra um certo número de posições à frente (ou atrás) no alfabeto. O número de posições é chamado de **shift**.

Por exemplo, ao criptografar a letra `A` com um `shift` de 3, a letra resultante seria `D`. A mesma técnica pode ser aplicada para descriptografar a mensagem ao usar o **shift inverso**.

### Exemplo de Criptografia

- Mensagem original: `MENSAGEM SECRETA`
- Shift: `3`
- Mensagem criptografada: `PHQVDJHP+VHFUHWD`

### Exemplo de Descriptografia

- Mensagem criptografada: `PHQVDJHP+VHFUHWD`
- Shift: `3`
- Mensagem descriptografada: `MENSAGEM SECRETA`

### Exemplo de Uso

Instalação

```sh

npm i cesar-cipher

# OR

yarn add cesar-cipher

```

#### Usando a lib

```typescript

import { crypt } from 'cesar-cipher';


// Criar um objeto de criptografia com um shift de 25
const cipher = crypt(3); // 1 a 25


// Criptografar uma mensagem
const encryptedMessage = cipher.encrypt("OLA MUNDO");
console.log(encryptedMessage); // "ROD+PXQGR"


// Descriptografar a mensagem criptografada
const decryptedMessage = cipher.decrypt(encryptedMessage);
console.log(decryptedMessage); // "OLA MUNDO"


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

Essa fórmula garante que, ao atingir o final do alfabeto, o deslocamento "dê a volta", começando de novo do início do alfabeto.

### Conclusão

Este sistema de criptografia é uma implementação simples e eficaz do método de cifra de César. Ele permite a manipulação de mensagens utilizando um deslocamento em um alfabeto customizável, aplicando boas práticas de programação em TypeScript, como validação de parâmetros e tratamento de erros.
