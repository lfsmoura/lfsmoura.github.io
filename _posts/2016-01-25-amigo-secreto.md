---
layout: post
title: "Algoritmos em Javascript: Força Bruta"
date: 2016-01-25 20:00
comments: true
categories: Javascript Algoritmos
---

Final do ano sempre tem amigo secreto. Uma das partes mais divertidas da brincadeira é adivinhar quem vai ser o próximo. Algo que estraga a brincadeira para mim são os ciclos. Quando quem começou é o próximo amigo secreto, temos um ciclo, e agora uma nova pessoa tem que recomeçar. Assim perdemos uma adivinhação. A cada ciclo perdemos uma adivinhação. Por isso, quando eu e alguns amigos decidimos fazer um amigo secreto no final do ano passado, eu decidi escrever um programa que minimiza os ciclos. 

O ideal seria ter um único ciclo. Escrever um algoritmo para resolver o problema é bem fácil. É só permutar aleatoriamente a lista de amigos. Mas ainda há uma outra coisa que me incomoda no amigo secreto: as panelinhas, ou seja, casais ou familiares próximos que tiram um ao outro.

Eu queria um algoritmo que sorteie os amigos secretos, minimizando os ciclos e eliminando as panelinhas.

Metade da dificuldade de resolver um problema é definí-lo. Se pensarmos no conjunto de amigos como um grafo completo, queremos achar um ciclo nesse grafo que passa uma única vez em cada amigo e que não passe por alguns arcos específicas. Veja o exemplo a seguir:

![Exemplo](/assets/santa.png)

Temos aqui quatro amigos: Carlos, Abel, Ana e Maria. Carlos e Maria são namorados e por isso seriam panelinha, então os arcos entre os dois são proibidos. Um caminho possível (e portanto uma atribuição de amigos secretos) é dada pelos arcos azuis.

Olhando assim o problema parece fácil, e muita gente vai tentar quebrar a cabeça para resolvê-lo de forma eficiente. Se você conseguir por favor me envie o algoritmo, porque esse é problema está entre os mais difíceis dos problemas computacionais e existe um prêmio de um milhão de dólares para quem resolvê-lo.

Esse problema é conhecido como *Ciclo Hamiltoniano*. É o de encontrar um ciclo que passa por todos os vértices de um grafo simples uma única vez.

Parece muita complicação para um simples amigo secreto não? mas nem tudo está perdido. Apesar do problema ser difícil na teoria, ela pode ser resolvido facilmente para instâncias pequenas.

Como o natal estava chegando e o número de amigos era pequeno, resolvi escrever um algoritmo de [força bruta](https://pt.wikipedia.org/wiki/For%C3%A7a_bruta). Basicamente vamos tentar todas as possibilidades. 

{% highlight javascript %}
var secretSanta = function(friends, restrictions) {
  friends = _.shuffle(friends);
  return (function get_order(friends, rest) {
    // base case
    if (rest.length == 0) {
      return friends;
    }
    for (var i = 0; i < rest.length; i++) {
      // if there is any restriction, ignore friend
      var lastFriend = friends[friends.length-1];
      var firstFriend = rest[0];
      if (restrictions[lastFriend] && restrictions[lastFriend][firstFriend]) {
        continue;
      }
      // add first friend to the order
      friends.push(rest.shift()); 
      var order = get_order(friends, rest);
      if (order) {
        return order;
      }
      // put failed friend to the end of the list
      rest.push(friends.pop());
    }
  })([friends.pop()], friends);
};
{% endhighlight %}

Algoritmos de força bruta em geral tem essa cara, percorremos todas as possibilidades fazendo uma busca por profundidade até chegar em sucesso ou até esgotar todas as possibilidades.

No caso desse nosso programa, começamos embaralhando os amigos. Isso é feito para que não tenhamos sempre a mesma ordem como solução. Depois disso, chamando a função recursiva com uma lista contendo apenas o primeiro amigo. Para cada amigo em `rest` (os amigos restantes), verificamos se existe alguma restrição em relação ao amigo que está no fim da lista. Caso não haja restrições, colocamos o amigo no fim da lista e tentamos continuar a fazer a ordem. Se a recursão falha, desfazemos a mudança e tentamos um novo amigo.

Esse algoritmo tem custo exponencial. Isso significa que se a quantidade de amigos chegar a algumas dezenas, provavelmente o programa nunca vai conseguir chegar no fim. Porém para casos pequenos ele funciona bem. Então enquanto você tiver poucos amigos você pode usar esse algoritmo. Se você de repente se tornar popular, é hora de aprender alguma técnica mais avançada como *Branch and Bound* ou tentar ir atrás daquele prêmio de um milhão.
