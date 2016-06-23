---
layout: post
title: "Como funciona e como usar o global-state"
date: 2016-06-15 9:30
comments: true
categories: Javascript Bibliotecas
---

Você já tentou fazer um jogo multiplayer no browser? em pouco tempo sincronizar o estado pode ser tornar o pesadelo. Tirando proveito do modelo do `redux` de fluxo único de dados, eu escrevi uma [biblioteca para sincronizar o estado de vários clientes de maneira simples](https://github.com/lfsmoura/global-state). Você escreve o código como escreveria normalmente usando `redux`. Apenas adiciona uma linha de código e terá o estado sincronizado entre vários clientes.

Na hora de criar a sua store, ao invés de escrever:

{% highlight javascript %}
let store = createStore(reducer);
{% endhighlight %}

Você escreve:

{% highlight javascript %}
// frontend
let store = createGlobalStore({ reducer })

// backend
var io = require('socket.io')(server);
require('global-state')(io);
{% endhighlight %}

E pronto. Todos os clientes vão sincronizar automaticamente.

## Como funciona

Abaixo temos um diagrama mostrando como funciona. Imagine que o cliente 1 já estivesse conectado. O cliente 2 então entre na sala. Ele recebe o estado atual. Quando o cliente 1 dá o "dispatch" de uma ação, essa ação passa pelo servidor (para garantir a ordem) e depois é enviada para todos os clientes. A mesma coisa acontece quando o cliente 2 dá "dispatch" de uma ação.

![Exemplo](/assets/globald.png)

# Exemplo

Vamos botar a mão na massa. Vamos fazer um jogo da velha multiplayer.

A interface não tem muito mistério. Temos um botão de limpar o jogo e quando se clica em um bloco a jogada é feita. [Veja o código](https://github.com/lfsmoura/global-state-examples/tree/simple-game/src/js).

![Exemplo](/assets/tictactoe.png)

Para deixá-lo multiplayer, basta adicionar a seguinte linha ao criar a store (arquivo `src/js/store.js`):

{% highlight javascript %}
// frontend
let store = createGlobalStore({ reducer })
{% endhighlight %}

E no nosso servidor express (`web.js`):

{% highlight javascript %}
var express = require('express');
var app = express();

app.set('port', (+process.env.PORT || 8000));

var server = require('http').Server(app);
var io = require('socket.io')(server);
require('global-state')(io);
{% endhighlight %}

Pronto!

No próximo post vamos ver [como diferenciar os clientes e como criar múltiplas salas]({% post_url 2016-06-22-exemplo-global-state-2 %}).
