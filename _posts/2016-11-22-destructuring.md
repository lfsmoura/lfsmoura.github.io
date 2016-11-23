---
layout: post
title: Código sagaz
---

Outro dia me deparei com o seguinte código:

``` js
let [suffix] = "Leonardo";
```

Isso é uma maneira **sagaz** de fazer o seguinte:

``` js
let suffix = "Leonardo"[0];
```

Esse código tira proveito da nova construção do *ES6*, *destructuring*. Que em
si pode deixar o código muito mais fácil de entender e mais enxuto, por exemplo:

``` js
let [first, ...rest] = [1,2,3];
```

Esse código, uma vez que você sabe a nova sintaxe, deixa claro em uma olhada
rápida o que faz. Estamos atribuindo o primeiro valor do vetor à variável `first`
e o resto do vetor para a variável `rest`.

É um código bem mais claro e com menos chance de conter erros do que o código
equivalente:

``` js
let array = [1,2,3];
let first = array[0]
let rest = array.slice(1)
```

Comparando o código com a nova sintaxe com esse,
temos uma economia de três linhas e não precisamos chamar o método `slice`.
Mesmo alguns programadores experientes terão que olhar a definição de `slice`
para ver o que significa o primeiro parâmetro.

Já no nosso primeiro código, a nova sintaxe não traz nenhum
benefício para o nosso código. Pelo contrário.
Ela complica.

Eu não estou argumentando que não se deve usar novas construções da linguagem,
mas que devemos escrever de maneira a minimizar o tempo que a próxima
pessoa que ler o código vai demorar para entender a sua intenção.

Portanto não escreva código para tentar ser um menino sagaz, seja claro.
Claridade bate sagacidade.

![Claridade bate a sagacidade](/assets/boxers.jpg)
