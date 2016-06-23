---
layout: post
title: "Jogo com múltiplas salas com global-state"
date: 2016-06-22 9:30
comments: true
categories: Javascript Bibliotecas
---

No [último post]({% post_url 2016-06-15-exemplo-global-state %}), vimos como usar a `global-state` para sincronizar clientes. Porém nossa aplicação tinha dois problemas:

1. Havia somente um jogo, todos os usuários que entravam jogavam o mesmo jogo;
2. Os dois usuários podiam jogar sempre. Não havia um turno definido.

Para que múltiplos usuários possam jogar vamos usar múltiplas salas. Sala é um conceito do `socket.io` que permite que a comunicação seja dividida.

O que nós queremos fazer é que um usuário possa entrar na aplicação, criar uma sala e compartilhar um link com outro usuário que queira jogar. Para isso vamos mudar a criação da `store` em `src/js/store.js`:

{% highlight javascript %}
const hash = window.location.hash.substr(1);
export const room = hash || Math.trunc(Math.random() * 90000000);

export const store = createGlobalStore({ reducer, room });
export const player = hash ? -1 : 1;
{% endhighlight %}

A primeira linha vai pegar a string que vem depois de "#" na url. Por exemplo se estamos no endereço  http://globalstate.herokuapp.com/#123, teremos a variável `hash` como `123`.

Depois disso vamos fazer o seguinte: se o usuário não está em uma sala vamos gerar um número aleatório, que será o `id` da nossa sala.

Agora na terceira linha, vamos adicionar mais um parametro para a função `createGlobalStore`: `room`. Esse parâmetro define em qual sala vamos entrar. Assim se o usuário acessou a url `/`, ele vai criar uma nova sala com um `id` aleatório. Se o usuário entrar em `/#123`, ele vai entrar na sala 123.

Finalmente na quarta linha, definimos uma variável `player`. Essa variável define qual jogador é o cliente. Se ele foi o criador da sala (sua url não continha `#`), ele terá o valor `1`, caso contrário ele terá o valor `-1`. Note que nós não armazenaremos essa variável na nossa `store`. Tudo que é armazenado na `store` é global, logo irá ser sincronizado com os outros clientes.

Com essas modificações já temos a criação de múltiplas salas. Agora temos que modificar a interface para fazer a diferenciação dos jogadores.

No arquivo `src/js/components/Game.js`, vamos adicionar o `player` na nossa `action`. Assim, se um jogador jogar fora do seu turno, não haverá efeito no jogo.

{% highlight javascript %}
import { store, player, room } from '../store.js';

export default class Game extends React.Component {
  play(i, j) {
    store.dispatch({ type: 'PLAY', i, j, player });
  }
  //...
}
{% endhighlight %}

Além disso, se o jogador for o criador da sala (entrou em `/`), vamos mostrar um link para que ele compartilhe com um amigo para jogar:

{% highlight javascript %}
const shareLink = player === 1 ?
  <div className="game-link">{location.toString()}#{room}</div> : '';
{% endhighlight %}

E assim resolvemos todos os nossos problemas. [Veja o resultado](http://globalstate.herokuapp.com/) e [Veja o código final](https://github.com/lfsmoura/global-state-examples/tree/master/src/js).
