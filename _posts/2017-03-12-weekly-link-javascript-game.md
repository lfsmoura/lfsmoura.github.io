---
layout: post
title: Links semanais - Untrusted, ES6 e Migrações
---

A partir dessa semana vou começar a postar alguns artigos/coisas interessantes
que descobri durante a semana. Fica atento!

[Untrusted](https://alexnisnevich.github.io/untrusted/) - Jogo de quebra-cabeça
em que você tem que modificar o código das fases em Javascript para passar de fase.
Altamente viciante.

[Sumário de novas features do ES6](http://adrianmejia.com/blog/2016/10/19/Overview-of-JavaScript-ES6-features-a-k-a-ECMAScript-6-and-ES2015) -
Já falei de várias features do ES6 aqui no blog, inclusive [sobre os perigos de usar classes](/javascript/2016/07/24/class-es6-perigos.html). Esse artigo faz um breve sumário para quem nunca viu nada
sobre as novas features. Para quem já viu um pouco e quer se aprofundar eu recomendo o excelente
[Practical ES6](https://ponyfoo.com/books/practical-es6).

[Online Migrations at Scale](https://stripe.com/blog/online-migrations) - Como fazer migração
da estrutura de banco de dados em um serviço como o **Stripe** que não pode ficar fora do ar
nunca? esse post explica como uma migração foi feita em vários passos para que eles tivessem
tempo de queda de serviço zero. Basicamente eles criaram uma duplicação dos dados e quando
tinha certeza de que os dados estavam sincronizados, a estrutura antiga foi removida.
