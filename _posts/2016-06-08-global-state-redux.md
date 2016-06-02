---
layout: post
title: "Projeto Open-Source: global-state"
date: 2016-06-02 9:30
comments: true
categories: Javascript Bibliotecas
---

Mês passado eu comecei a fazer um jogo para jogar com várias pessoas em um ambiente. Tudo pela Web pelo celular ou notebook. Para fazer a sincronização eu comecei a usar o `socket.io`. Para o front-end eu usei `react` e `redux`.

Eu não queria armazenar o estado em um banco de dados, queria que os dados fossem sincronizados pelos próprios clientes através de envio de mensagens. Em pouco tempo o código estava uma bagunça: as vezes quando um cliente atualizava a página, alguns dados eram perdidos, entre outros problemas ainda mais difíceis de explicar.

Então me surgiu a ideia de ao invés de ficar sincronizando o estado dos clientes, enviar as `actions` sempre através de mensagens usando o `socket.io`.

O resultado ficou tão bacana que eu resolvi compartilhar. Você pode [ver como funciona e contribuir no github](https://github.com/lfsmoura/global-state) ou [ver ele funcionando](http://globalstate.herokuapp.com).
