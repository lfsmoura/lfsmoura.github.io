---
layout: post
title: Automatize a criação de mocks com cachemock
---

Há alguns meses eu estava em um encontro de _node.js_. Durante uma palestra
sobre como usar _mocks_ em testes de unidade, o apresentador
estava simulando uma chamada de uma REST API. Ele fazia essa chamada no browser, depois
copiava e colava o resultado no código. Isso funciona para criar mocks, porém existem
alguns problemas com essa abordagem:

1. O processo é manual. Além de cansativo, é passível de erros;
2. Código e dados ficam misturados nos testes;
3. Se a API mudar, não há como os testes detectarem sem termos que escrever
outro teste só para isso.

Para resolver esses problemas eu criei a biblioteca [cachemock](https://www.npmjs.com/package/cachemock).
O que ela faz é guardar em um arquivo de texto as chamadas assíncronas da primeira vez que elas são feitas,
assim nas próximas vezes, ao invés de fazer as requisições de novo, a chamada vai ser _mockada_.

Para usá-la, você escreve seus testes normalmente, apenas fazendo um _patch_ da biblioteca
que vocês está usando para fazer chamadas assíncronas ([request](https://www.npmjs.com/package/request), por exemplo).

Vamos ver um exemplo:

``` js
  function getPost(get, cb) {
    return get('https://jsonplaceholder.typicode.com/posts/1', cb);
  }
```

Supondo que queremos testar a função acima `getPost`. Usando _cachemock_ com
_mocha_, podemos escrever um teste de unidade da seguinte maneira:

``` js
const { cachemockfile } = require('cachemock');

const getCached = cachemockfile(require('request').get);

it('Should get the first post', (done) => {
  getPost(getCached, (post)=>{
    // assertions
    return done();
  });
});
```

Da primeira vez que os testes forem rodados, a chamada será feita. Em testes
subsequentes, o resultado será extraído de um arquivo, então o mock é criado automaticamente.

Agora vejamos como a _cachemock_ resolve os três problemas que eu identifiquei:

1. O processo não é manual, então o que as chamadas vão receber é sempre o retorno
que algum dia foi válido.
2. O código não fica poluído com os retornos das chamadas, e é possível até mesmo
nem versionar o cache.
2. É possível deletar periodicamente o cache, obrigado as chamadas a serem feitas
novamente para que os testes identifiquem também se as API externas foram modificadas.

Fiquei muito satisfeito com o resultado dessa biblioteca e já até usei em projetos
profissionais. Se você usá-la eu agradeço feedbacks e _issues_ no [Github](https://github.com/lfsmoura/cachemock/issues).
