---
layout: post
title: "Super no ES2015 não funciona bem como você acha que funciona"
date: 2016-07-24 20:05
comments: true
categories: Javascript
---

Muita gente usa Javascript sem entender muito bem como funcionam protótipos.
Programadores que vêm de linguagens orientadas a objetos tentam adaptar o modelo
de programação orientada a protótipos à orientação a Objetos. O resultado era
que cada um reinventava orientação a objeto da sua maneira, causando inconsistências
entre projetos e gerando até mesmo código inconsistente no mesmo projeto.

Para resolver isso, a nova versão do JS, o ES2015, vem equipado com a palavra-chave
`class`. O grande problema é que ela não é implementada do zero, e sim é um açúcar sintático para protótipos. Ou seja, você escreve seu código com
classes, mas por baixo do capô, o código ainda usa protótipos.

Como tudo no JS, se usado de forma conservadora, as classes vão fazer exatamente o que você acha que deveriam fazer. No exemplo a seguir, eu crio uma classe que derivada de outra. Quando o método `calc` do objeto derivado é chamado, ele primeiro chama calc da classe base usando `super` e depois executa o seu próprio trabalho.

{% highlight javascript %}
class Base {
  calc() {
    console.log('base heavy work');
  }
}

class Derived extends Base {
  calc() {
    super.calc();
    console.log('some more work in derived');
  }
}


let b = new Base();
let d = new Derived();

b.calc();
// > base heavy work
d.calc();
// > base heavy work
// > some more work in derived
{% endhighlight %}

Tudo aqui se comporta como o esperado. O problema é que em JS você pode usar um método de uma classe mas trocar o contexto (o `this`) dinamicamente. Nesse caso, o método vai se comportar diferente do que você espera, porque o super é _linkado_ estaticamente. Veja o código a seguir:

{% highlight javascript %}
class OtherBase {
  calc() {
    console.log('other base');
  }
}

class Other extends OtherBase {

}

let o = new Other();

// 1. chama calc de d, mas com o contexto de o
d.calc.call(o);
// > base heavy work
// > some more work in derived
{% endhighlight %}

Em 1, estamos usando o método `calc` de d, mas com o contexto de `o`. O que esperaramos que aconteça é que a base de `o` fosse chamada (o que aconteceria se `super` fosse calculado dinamicamente). No entanto o que temos é que a base de `d` é chamada.

Se você for usar classes no seu código, tenha em vista casos exceção como esse.
