---
layout: post
title: Chat com Backbone.js e Express.js
comments: true
categories: projetos
---

Para aprender um pouco sobre [Backbone.js](http://backbonejs.org) eu desenvolvi o hello world dos aplicativos cliente-servidor: um chat. Fiquei muito satisfeito como resultado. Abaixo uma captura de tela do resultado:

![Screenshot do chat](/assets/chat.png)

O backend foi feito em node.js usando express.js. As mensagens são gravadas em um arquivo de texto (já que o foco era o frontend, não quis complicar). O frontend foi desenvolvido usando Backbone e Bootsrap para ficar bonito. O modelo é simples, o chat consiste em uma lista de mensagens. Cada mensagem tem um usuário e um texto. Essa lista de mensagens é sincronizada com o servidor a cada cinco segundos. Um botão de auto rolagem facilita a leitura das mensagens.

O resultado pode ser conferido no [Heroku](http://chatsupercool.herokuapp.com/).
