---
layout: post
title: "Design Patterns em Javascript - Decorator"
date: 2016-08-28 22:00
comments: true
categories: Software Engineering
---

![](/assets/decorators.jpg)

Essa é a primeira de uma série de artigos sobre Design Patterns e como implmentá-los em Javascript.

_Decorator_ é um padrão de projeto usado quando queremos adicionar comportamento a um objeto sem modificar objetos do mesmo tipo. Principalmente quando queremos empilhar vários novos métodos dinamicamente a um objeto.

Imagine que estamos implementando um carro. Um carro tem uma série de funcionalidades opcionais, como por exemplos ar condicionado ou teto solar. Se fossemos implementar cada tipo de carro como um objeto teríamos centenas de construtores: um para _CarroNormal_, outro para _CarroComArCondicionado_, outro para _CarroComFreiosAbs_.

Pior ainda, teríamos que fazer também todas as combinações das funcionalidades: _CarroComArCondicionadoEFreiosAbs_, etc.

## Implementação

Implementar decorators em linguagens tipadas dá um pouco de trabalho já é preciso recriar todos os métodos da classe base (mesmo os que não são alterados) para que eles possam ser usados nas classes derivadas. Já em JS só precisamos sobreescrever os métodos que queremos modificar.

Para implementar o decorator, vamos simplesmente usar o `prototype` para reutilizar o código dos objetos bases sem modificá-los.

Começando com nosso carro:

{% highlight javascript %}
function Car() {
  this.price = () => 100;
}
{% endhighlight %}

Agora criamos duas funcionalidades: Ar Condicionado e Radio. Primeiro usamos o `Object.create` para que herdemos todas as propriedades to tipo que está sendo passado para o decorator. Depois adicionamos as novas funcionalidades e modificamos o método `price` para que seja somado o preço da funcionalidade ao do carro.

{% highlight javascript %}
function AirConditioner(c) {
  let that = Object.create(c);
  that.price = () => c.price() + 20;
  that.changeTemperature = t => console.log('change temperature to', t);
  return that;
}

function Radio(c) {
  let that = Object.create(c);
  that.price = () => c.price() + 10;
  that.turnRadioOn = () => console.log('playing Wesley Safadão');
  return that;
}
{% endhighlight %}

Uma das vantagens de retornar o that nos construtores é que se o usuário esquecer de usar o `new` na hora de criar os decorators, o código vai funcionar corretamente.

Agora podemos modificar dinamicamente um carro, adicionando novas funcionalidades até obtermos o objeto que quisermos:

{% highlight javascript %}
var car = new Car();
var carWithAirConditioner = new AirConditioner(car);
var carWithAirConditionerAndRadio = new Radio(carWithAirConditioner);

console.log('price:', carWithAirConditioner.price());  // > 120
console.log('price', carWithAirConditionerAndRadio.price()); // > 130

carWithAirConditionerAndRadio.changeTemperature(20); // change temperature to 20
carWithAirConditionerAndRadio.turnRadioOn();  // playing Wesley Safadão
{% endhighlight %}

*1* [image by Paul Sableman](https://www.flickr.com/photos/pasa/)
