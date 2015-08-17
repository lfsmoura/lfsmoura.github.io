---

layout: post
title: Chat em Angular
comments: true
categories: projetos

---

Alguns meses atrás eu [desenvolvi um chat em Backbone e node.js]({% post_url 2015-04-20-chat-backbone-node-express %}).
Foi uma ótima experiência para aprender sobre aquelas tecnologias. Foi tão bom que eu resolvi expandir o projeto e 
englobar outras tecnologias. O repositório agora está disponível publicamente no [Github](https://github.com/lfsmoura/chat) e
fiz o deply no [Heroku](chatsupercool.herokuapp.com).

Então fica ligado que nos próximos meses vou utilizar outras tecnologias e colocar aqui a experiência que eu tive com 
cada uma.

O primeiro framework que decidi experimentar foi o [Angular](https://angularjs.org/). Atualmente ele é um dos frameworks
frontend mais populares e é mantido pelo Google. A sua abordagem é diferente do Backbone, que tenta ser leve e tenta 
encapsular o DOM em views. O angular expande o html para criar views dinâmicas e utiliza *two-way data binding*: 
mudanças nos modelos são propagadas diretamente para o DOM e mundaças no DOM são propagadas para o model.

No chat, há um input de texto que é ligado com o campo `username` do controller.

{% highlight html %}
<input id="user" class="form-control" maxlength="15" ng-model="chat.username">
{% endhighlight %}

Assim, quando o valor do input é modificado, a variável também é modificada.

Para obter as mensagens do servidor (comunicando-se com a mesma *API REST* usada na versão Backbone), eu utilizo o módulo
`$resource` para trazer as informações e colocá-las no campo `msgs` do controller

{% highlight javascript %}
    
var Message = $resource('/messages/:msgId');
chat.msgs = Message.query();
    
{% endhighlight %}    

Que por sua vez está ligado ao html:

{% highlight html %}
<div ng-repeat="msg in chat.msgs">
    <span class="user">{{"{{msg.username"}}}}:</span> {{"{{msg.message"}}}}
</div>
{% endhighlight %}    

Isso é o básico do básico do que o Angular é capaz. [Confira a implementação completa](https://github.com/lfsmoura/chat/tree/master/public/angular).